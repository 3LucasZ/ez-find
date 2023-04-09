import {
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Link,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  DeleteIcon,
  EditIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { PrismaClient } from "@prisma/client";
import Item, { ItemProps } from "components/Item";
import { GetServerSideProps } from "next";
import Header from "components/Header";
import StorageWidget from "components/Storage";

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
        <Flex>
          <Heading>{item.name}</Heading>
          <Link href={"/upsert-item?id=" + item.id}>
            <IconButton
              ml={2}
              mr={2}
              colorScheme="teal"
              aria-label="edit"
              icon={<EditIcon />}
            />
          </Link>
          <IconButton
            colorScheme="red"
            aria-label="delete"
            icon={<DeleteIcon />}
          />
        </Flex>
      </Center>
      <Center>{storagesUI}</Center>
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();
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

export default ItemPage;
