import {
  Text,
  Button,
  Center,
  Heading,
  SimpleGrid,
  Stack,
  Link,
} from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import Header from "components/Header";
import { useQRCode } from "next-qrcode";
import { genXML } from "services/genXML";
import Router from "next/router";
type Props = {
  url: string;
  img: string;
  xml: string;
  id: number;
};
const StoragePage: React.FC<Props> = (props) => {
  const { Image } = useQRCode();

  console.log("url", props.url);
  console.log("id", props.id);
  console.log("xml", props.xml);

  const dymoPrintUI =
    props.img == "" ? (
      <Stack>
        <Text fontSize="xl">
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
      <>
        <Center>
          <img
            style={{ backgroundColor: "red", padding: "50px" }}
            src={"data:image/png;base64, " + props.img}
          />
        </Center>
        <Center>
          <Button
            onClick={() => {
              console.log("Print");
              const Dymo = require("dymojs"),
                dymo = new Dymo();
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
      </>
    );
  return (
    <Stack>
      <Header />
      <SimpleGrid columns={2} spacing={10}>
        <div>
          <Center>
            <Heading>Manual Print:</Heading>
          </Center>
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
        </div>
        <div>
          <Center>
            <Heading>Dymo Print:</Heading>
          </Center>
          {dymoPrintUI}
        </div>
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
  const path = "/item/" + storage?.id;
  const url = "http://" + domain + path;
  const xml: string = genXML(url, "" + storage?.name);
  const Dymo = require("dymojs"),
    dymo = new Dymo();
  var img: string = "AemptyA";
  await dymo
    .renderLabel(xml)
    .then((imageData: any) => {
      img = imageData.slice(1, -1);
    })
    .catch((err: any) => {
      img = "";
    });

  return {
    props: {
      url: url,
      img: img,
      xml: xml,
      id: storage?.id,
    },
  };
};

export default StoragePage;
