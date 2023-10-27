import {
  Text,
  Button,
  Center,
  Heading,
  SimpleGrid,
  Stack,
  Link,
  Image as ChImage,
  Box,
} from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useQRCode } from "next-qrcode";
import { fixate, genXML } from "services/genXML";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Select } from "chakra-react-select";
import Layout from "components/Layout";

type Props = {
  url: string;
  xml: string;
  id: number;
  name: string;
  admins: string[];
};

type LabelWriterPrinter = {
  id: number;
  name: string;
  modelName: string;
  isConnected: boolean;
  isLocal: boolean;
  isTwinTurbo: boolean;
};

const StoragePage: React.FC<Props> = (props) => {
  const [img, setImg] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [printers, setPrinters] = useState<LabelWriterPrinter[]>([]);
  const [options, setOptions] = useState<{ value: number; label: string }[]>(
    []
  );
  const [value, setValue] = useState<{ value: number; label: string }>();

  useEffect(() => {
    const fetchData = async () => {
      const Dymo = require("dymojs"),
        dymo = new Dymo();
      //dymo.
      await dymo //get sticker preview as h265 string
        .renderLabel(props.xml)
        .then((imageData: string) => {
          setImg(imageData.slice(1, -1));
        })
        .catch((err: any) => {
          setImg("");
        });
      await dymo //get service connection status
        .getStatus()
        .then((dymoStatus: string) => {
          setStatus(dymoStatus);
        })
        .catch((err: any) => {
          setStatus("");
        });
      await dymo //get connected printers
        .getPrinters()
        .then((dymoPrintersXML: string) => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(dymoPrintersXML, "text/xml");
          const printers: LabelWriterPrinter[] = [];
          Array.from(
            {
              length: xmlDoc.getElementsByTagName("LabelWriterPrinter").length,
            },
            (x, i) => {
              const name =
                xmlDoc.getElementsByTagName("LabelWriterPrinter")[i]
                  .childNodes[0].childNodes[0].nodeValue;
              const modelName =
                xmlDoc.getElementsByTagName("LabelWriterPrinter")[i]
                  .childNodes[1].childNodes[0].nodeValue;
              const isConnected =
                xmlDoc.getElementsByTagName("LabelWriterPrinter")[i]
                  .childNodes[2].childNodes[0].nodeValue == "True";
              const isLocal =
                xmlDoc.getElementsByTagName("LabelWriterPrinter")[i]
                  .childNodes[3].childNodes[0].nodeValue == "True";
              const isTwinTurbo =
                xmlDoc.getElementsByTagName("LabelWriterPrinter")[i]
                  .childNodes[4].childNodes[0].nodeValue == "True";
              printers.push({
                id: i,
                name: name!,
                modelName: modelName!,
                isConnected: isConnected,
                isLocal: isLocal,
                isTwinTurbo: isTwinTurbo,
              });
            }
          );
          setPrinters(printers);
          const options = printers.map((printer) => ({
            value: printer.id,
            label: printer.name,
          }));
          setOptions(options);
          setValue(options[0]);
          console.log(options[0]);
        })
        .catch((err: any) => {
          console.log(err);
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

  return (
    <Layout admins={props.admins}>
      <SimpleGrid columns={2} spacing={10}>
        {/* Manual Printing */}
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
            <Text fontSize="2xl" whiteSpace="pre-line">
              {fixate(props.name)}
            </Text>
          </Center>
        </div>
        {/* DYMO Printing */}
        <div>
          {img == "" ? (
            <Stack spacing={3}>
              <Center>
                <Heading>Dymo</Heading>
              </Center>
              <Text fontSize="2xl">
                {
                  "Sorry, you can not use the DYMO print feature. We could not detect the DYMO Connect service on your device. Please checkout "
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
            <Stack spacing={3} marginRight={10}>
              <Center>
                <Heading>Dymo</Heading>
              </Center>
              <Select value={value} options={options} />
              <Center>
                <Button
                  colorScheme="teal"
                  onClick={() => {
                    console.log("Print");
                    const Dymo = require("dymojs"),
                      dymo = new Dymo();
                    dymo
                      .print(value?.label, props.xml)
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
              <Box
                bg={status ? "green.400" : "tomato"}
                p={4}
                color="white"
                borderRadius="10"
              >
                {status
                  ? "Connected to DYMO service"
                  : "Not connected to DYMO service"}
              </Box>
              <Box
                bg={
                  value != null && printers[value.value].isConnected
                    ? "green.400"
                    : "tomato"
                }
                p={4}
                color="white"
                borderRadius="10"
              >
                {value != null && printers[value.value].isConnected
                  ? "Connected to printer"
                  : "Not connected to printer"}
              </Box>
            </Stack>
          )}
        </div>
      </SimpleGrid>
    </Layout>
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
  const admins = await prisma.admin.findMany();

  const domain = context.req.headers.host;
  const path = "/item/" + storage?.id;
  const url = "http://" + domain + path;
  const xml: string = genXML(url, "" + storage?.name);

  return {
    props: {
      url: url,
      xml: xml,
      id: storage?.id,
      name: storage?.name,
      admins: admins.map((admin) => admin.email),
    },
  };
};

export default StoragePage;
