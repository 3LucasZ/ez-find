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
import StorageWidget from "components/Storage";

const prisma = new PrismaClient();
export const getServerSideProps: GetServerSideProps = async (context) => {
  const item = await prisma.item.findUnique({
    where: {
      id: Number(context.params?.itemId),
    },
    include: {
      storages: true,
    },
  });
  return {
    props: {
      item: item,
    },
  };
};
type Props = {
  item: ItemProps;
};
const ItemPage: React.FC<Props> = (props) => {
  const item = props.item;
  let storagesUI = <Text>No storages are attached to this item</Text>;
  console.log(props);
  if (item.storages.length > 0) {
    storagesUI = (
      <Stack>
        <Text>You can find this item at:</Text>
        <List spacing={3}>
          {item.storages.map((storage) => (
            <ListItem>
              <StorageWidget storage={storage} />
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
        <Heading>{item.name}</Heading>
      </Center>
      <Center>{storagesUI}</Center>
    </Stack>
  );
};

export default ItemPage;
