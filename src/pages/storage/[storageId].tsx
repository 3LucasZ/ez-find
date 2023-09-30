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
import { GetServerSideProps } from "next";
import Header from "components/Header";
import { StorageProps } from "components/Storage";
import { useQRCode } from "next-qrcode";
import Router, { useRouter } from "next/router";
import ItemWidget from "components/Item";
import ConfirmDeleteModal from "components/ConfirmDeleteModal";
import { genXML } from "services/genXML";
type Props = {
  storage: StorageProps;
  link: string;
  dymo: any;
  labelXML: string;
  labelPreview: string;
};
const StoragePage: React.FC<Props> = (props) => {
  const storage = props.storage;
  console.log("Storage", storage);
  console.log("Link", props.link);
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
              text={props.link}
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
            <img src={"data:image/png;base64," + props.labelPreview} />
          </Center>
          <Center>
            <Button
              onClick={() => {
                props.dymo.print("DYMO LabelWriter 450", props.labelXML);
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
  const link: string = "http://github.com";
  const labelXML: string = genXML(link);
  const Dymo = require("dymojs"),
    dymo = new Dymo();
  const labelPreview: string = await dymo.renderLabel(labelXML);
  return {
    props: {
      storage: storage,
      link: link,
      labelXML: labelXML,
      dymo: dymo,
      labelPreview: labelPreview,
    },
  };
};

export default StoragePage;
