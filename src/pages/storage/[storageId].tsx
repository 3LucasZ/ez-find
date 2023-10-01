import {
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CheckCircleIcon, EditIcon } from "@chakra-ui/icons";
import { PrismaClient } from "@prisma/client";
import { GetServerSideProps, GetStaticProps } from "next";
import Header from "components/Header";
import { StorageProps } from "components/Storage";
import { useQRCode } from "next-qrcode";
import Router, { useRouter } from "next/router";
import ItemWidget from "components/Item";
import ConfirmDeleteModal from "components/ConfirmDeleteModal";
import { genXML } from "services/genXML";
type Props = {
  storage: StorageProps;
  url: string;
  img: string;
  xml: string;
};
const StoragePage: React.FC<Props> = (props) => {
  const storage = props.storage;
  const { Image } = useQRCode();
  const handleDelete = async () => {
    try {
      const body = { id: storage.id };
      console.log(body);
      const res = await fetch("/api/delete-storage", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push({ pathname: "/view-storages" });
    } catch (error) {
      console.error(error);
    }
  };
  let itemsUI = <Text>No items are attached to this storage.</Text>;
  if (storage.items.length > 0) {
    itemsUI = (
      <Stack>
        <Text>Location contains the items:</Text>
        <List spacing={3}>
          {storage.items.map((item) => (
            <ListItem>
              <ItemWidget item={item} />
            </ListItem>
          ))}
        </List>
      </Stack>
    );
  }

  console.log("url", props.url);
  console.log("storage", storage);
  console.log("img", props.img);

  return (
    <Stack>
      <Header />
      <Center>
        <Flex>
          <Heading>{storage.name}</Heading>
          <IconButton
            ml={2}
            mr={2}
            colorScheme="teal"
            aria-label="edit"
            icon={<EditIcon />}
            onClick={() =>
              Router.push({
                pathname: "/upsert-storage",
                query: { id: storage.id },
              })
            }
          />
          <ConfirmDeleteModal
            name={" the storage: " + storage.name}
            handleDelete={handleDelete}
          />
        </Flex>
      </Center>
      <Center>{itemsUI}</Center>
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
                dymo.print("DYMO LabelWriter 450", props.xml);
              }}
            >
              Print
            </Button>
          </Center>
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

  const domain = context.req.headers.host;
  const path = context.resolvedUrl;
  const url = "http://" + domain + path;
  const xml: string = genXML(url);
  const Dymo = require("dymojs"),
    dymo = new Dymo();
  var img: string = "AemptyA";
  await dymo.renderLabel(xml).then((imageData: any) => {
    img = imageData.slice(1, -1);
    console.log("img" + " " + img);
  });

  return {
    props: {
      storage: storage,
      url: url,
      img: img,
      xml: xml,
    },
  };
};

export default StoragePage;
