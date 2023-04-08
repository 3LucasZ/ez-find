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

const prisma = new PrismaClient();
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const item = await prisma.item.findUnique({
    where: {
      id: Number(params?.itemId),
    },
    include: {
      storages: true,
    },
  });
  return {
    props: item,
  };
};

const ItemPage: React.FC<ItemProps> = (props) => {
  var storagesUI = <Text>No storages are attached to this item</Text>;
  console.log(props);
  if (props.storages.length > 0) {
    storagesUI = (
      <Stack>
        <Text>You can find this item at:</Text>
        <List spacing={3}>
          {props.storages.map((storage) => (
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              {storage.name}
            </ListItem>
          ))}
        </List>
      </Stack>
    );
  } else {
    console.log("Storages are null");
  }
  return (
    <Stack>
      <Header />
      <Center>
        <Heading>{props.name}</Heading>
      </Center>
      <Center>{storagesUI}</Center>
    </Stack>
  );
};

export default ItemPage;
