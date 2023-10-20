import {
  Center,
  Flex,
  Heading,
  IconButton,
  List,
  ListItem,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { PrismaClient } from "@prisma/client";
import { ItemProps } from "components/Item";
import { GetServerSideProps } from "next";
import Header from "components/Header";
import StorageWidget from "components/Storage";
import ConfirmDeleteModal from "components/ConfirmDeleteModal";
import Router from "next/router";

type Props = {
  item: ItemProps;
};

const ItemPage: React.FC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDelete = async () => {
    try {
      const body = { id: props.item.id };
      console.log(body);
      const res = await fetch("/api/delete-item", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push({ pathname: "/view-items" });
    } catch (error) {
      console.error(error);
    }
  };
  let storagesUI = <Text>No storages are attached to this item</Text>;
  console.log(props);
  if (props.item.storages.length > 0) {
    storagesUI = (
      <Stack>
        <Text>You can find this item at:</Text>

        <List spacing={3}>
          {props.item.storages.map((storage) => (
            <ListItem key={storage.id}>
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
          <Heading>{props.item.name}</Heading>
          <IconButton
            ml={2}
            mr={2}
            colorScheme="teal"
            aria-label="edit"
            icon={<EditIcon />}
            onClick={() =>
              Router.push({
                pathname: "/upsert-item",
                query: { id: props.item.id },
              })
            }
          />
          <IconButton
            onClick={onOpen}
            colorScheme="red"
            aria-label="delete"
            icon={<DeleteIcon />}
          />
          <ConfirmDeleteModal
            isOpen={isOpen}
            onClose={onClose}
            name={" the item: " + props.item.name}
            handleDelete={handleDelete}
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
