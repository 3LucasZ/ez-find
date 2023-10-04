import {
  Text,
  Button,
  Center,
  Heading,
  SimpleGrid,
  Stack,
  Link,
  Image as ChImage,
} from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import Header from "components/Header";
import { useQRCode } from "next-qrcode";
import { genXML } from "services/genXML";
import Router from "next/router";
import { useEffect, useState } from "react";
type Props = {
  url: string;
  xml: string;
  id: number;
  name: string;
};
const StoragePage: React.FC<Props> = (props) => {
  const [img, setImg] = useState("");
  const [status, setStatus] = useState("");
  const [printers, setPrinters] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const Dymo = require("dymojs"),
        dymo = new Dymo();
      await dymo
        .renderLabel(props.xml)
        .then((imageData: string) => {
          setImg(imageData.slice(1, -1));
        })
        .catch((err: any) => {
          setImg("");
        });
      await dymo
        .getStatus()
        .then((dymoStatus: string) => {
          setStatus(dymoStatus);
        })
        .catch((err: any) => {
          setStatus("");
        });
      await dymo
        .getPrinters()
        .then((dymoPrinters: string) => {
          setPrinters(dymoPrinters);
        })
        .catch((err: any) => {
          setPrinters("");
        });
    };
    fetchData().catch((e) => {
      console.error("An error occured while fetching the data: ", e);
    });
  }, []);
  const { Image } = useQRCode();

  // console.log("url", props.url);
  // console.log("id", props.id);
  // console.log("xml", props.xml);

  var parseString = require("xml2js").parseString;
  // var res;
  // parseString(props.xml, function (err, result) {
  //   res = result;
  // });
  const dymoPrintUI =
    img == "" ? (
      <Stack spacing={3}>
        <Center>
          <Heading>Dymo</Heading>
        </Center>
        <Text fontSize="2xl">
          {
            "Sorry, you can not use the DYMO print feature. We could not detect the DYMO Connect service on your device. Please checkout our instructions "
          }
          <Link
            color="teal.500"
            href="https://github.com/3LucasZ/ez-find/blob/main/README.md"
          >
            {" our instructions "}
          </Link>
          on how to enable the service. Thank you!
        </Text>
      </Stack>
    ) : (
      <Stack spacing={3}>
        <Center>
          <Heading>Dymo</Heading>
        </Center>
        <Center>
          <Button
            colorScheme="teal"
            onClick={() => {
              console.log("Print");
              const Dymo = require("dymojs"),
                dymo = new Dymo();

              //dymo.hostname = "host.docker.internal";
              dymo
                .print("DYMO LabelWriter 450", props.xml)
                .then((response: any, result: any) => {
                  console.log("Response: ", response, "result: ", result);
                })
                .catch(() => {
                  Router.push({ pathname: "/print/" + props.id });
                });
            }}
          >
            Print
          </Button>
        </Center>
        <Center>
          <ChImage
            padding="4"
            bgColor="teal.100"
            borderRadius="3vmin"
            src={"data:image/png;base64, " + img}
            alt="label"
          />
        </Center>
        <Text>Connected to service: {status}</Text>
        <Text>{printers}</Text>
      </Stack>
    );
  return (
    <Stack>
      <Header />
      <SimpleGrid columns={2} spacing={10}>
        <div>
          <Center>
            <Heading>Manual Printing</Heading>
          </Center>
          <Center> Take a screenshot of the image below:</Center>
          <Center>
            <Image
              text={props.url}
              options={{
                type: "image/jpeg",
                quality: 0.3,
                level: "M",
                margin: 3,
                scale: 4,
                width: 200,
                color: {
                  dark: "#4FD1C5FF",
                  light: "#FFFFFFFF",
                },
              }}
            />
          </Center>
          <Center>
            <Text fontSize="2xl">{props.name}</Text>
          </Center>
        </div>
        <div>{dymoPrintUI}</div>
      </SimpleGrid>
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const storage = await prisma.storage.findUnique({
    where: {
      id: Number(context.params?.storageId),
    },
    include: {
      items: true,
    },
  });
  // .then(() => {
  //   console.log("PRISMA SUCCESS");
  // })
  // .catch((err: any) => {
  //   console.log("PRISMA BROKEN");
  // });
  const domain = context.req.headers.host;
  //const domain = "host.docker.internal";
  const path = "/item/" + storage?.id;
  const url = "http://" + domain + path;
  const xml: string = genXML(url, "" + storage?.name);

  return {
    props: {
      url: url,
      xml: xml,
      id: storage?.id,
      name: storage?.name,
    },
  };
};

export default StoragePage;
