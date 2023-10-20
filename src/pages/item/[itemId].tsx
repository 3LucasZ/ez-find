import {
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { PrismaClient } from "@prisma/client";
import { ItemProps } from "components/Item";
import { GetServerSideProps } from "next";
import StorageWidget from "components/Storage";
import ConfirmDeleteModal from "components/ConfirmDeleteModal";
import Router from "next/router";
import Layout from "components/Layout";
import SearchView from "components/SearchView";

type Props = {
  item: ItemProps;
};

const ItemPage: React.FC<Props> = (props) => {
  // delete modal
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

  return (
    <Layout>
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
      <Box h={1}></Box>
      <SearchView
        set={props.item.storages.map((storage) => ({
          name: storage.name,
          widget: <StorageWidget storage={storage} key={storage.id} />,
        }))}
      />
    </Layout>
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
