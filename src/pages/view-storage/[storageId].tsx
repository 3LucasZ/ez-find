import {
  Center,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { PrismaClient } from "@prisma/client";
import Item, { ItemProps } from "components/Item";
import { GetServerSideProps } from "next";
import Header from "components/Header";
import { StorageProps } from "components/Storage";
import { useQRCode } from "next-qrcode";
import { useRouter } from "next/router";

const prisma = new PrismaClient();
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const storage = await prisma.storage.findUnique({
    where: {
      id: Number(params?.storageId),
    },
    include: {
      items: true,
    },
  });
  return {
    props: storage,
  };
};

const StoragePage: React.FC<StorageProps> = (props) => {
  const { Canvas } = useQRCode();
  var itemsUI = <Text>No items are attached to this storage</Text>;
  console.log(props);
  const router = useRouter();
  console.log(router.pathname);
  if (props.items.length > 0) {
    itemsUI = (
      <Stack>
        <Text>Location contains the items:</Text>
        <List spacing={3}>
          {props.items.map((item) => (
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              {item.name}
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
        <Heading>{props.name}</Heading>
      </Center>
      <Center>{itemsUI}</Center>
      <Center>
        <Heading>Printable QR Code:</Heading>
      </Center>
      <Center>
        <Canvas
          text={"http://localhost:3000/view-storage/" + props.id}
          options={{
            level: "M",
            margin: 3,
            scale: 4,
            width: 200,
            color: {
              dark: "#000000",
              light: "#FFFFFF",
            },
          }}
        />
      </Center>
    </Stack>
  );
};

export default StoragePage;
