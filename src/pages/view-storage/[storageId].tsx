import {
  Center,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import Header from "components/Header";
import { StorageProps } from "components/Storage";
import { useQRCode } from "next-qrcode";
import { useRouter } from "next/router";
import ItemWidget from "components/Item";

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
  return {
    props: {
      storage: storage,
      host: context.req.headers.host,
    },
  };
};
type Props = {
  storage: StorageProps;
  host: String;
};
const StoragePage: React.FC<Props> = (props) => {
  const storage = props.storage;
  console.log(storage);
  const link = "http://" + props.host + useRouter().asPath;
  console.log(link);
  const { Image } = useQRCode();

  let itemsUI = <Text>No items are attached to this storage</Text>;
  if (storage.items.length > 0) {
    itemsUI = (
      <Stack>
        <Text>Location contains the items:</Text>
        <List spacing={3}>
          {storage.items.map((item) => (
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
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
        <Heading>{storage.name}</Heading>
      </Center>
      <Center>{itemsUI}</Center>
      <Center>
        <Heading>Printable QR Code:</Heading>
      </Center>
      <Center>
        <Image
          text={link}
          options={{
            type: "image/jpeg",
            quality: 0.3,
            level: "M",
            margin: 3,
            scale: 4,
            width: 200,
            color: {
              dark: "#000000FF",
              light: "#FFFFFFFF",
            },
          }}
        />
      </Center>
      <Center>
        <Text>Link: {link}</Text>
      </Center>
    </Stack>
  );
};

export default StoragePage;
