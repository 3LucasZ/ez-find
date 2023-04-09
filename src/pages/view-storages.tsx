import { Box, Stack } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import Header from "components/Header";
import Item, { ItemProps } from "components/Item";
import StorageWidget, { StorageProps } from "components/Storage";
import { GetServerSideProps } from "next";

type Props = {
  storages: StorageProps[];
};

const Storages: React.FC<Props> = (props) => {
  return (
    <Stack>
      <Header></Header>
      <Box overflowY="auto" height="50vh" bg={"red.200"}>
        <Stack>
          {props.storages.map((storage) => (
            <StorageWidget storage={storage} />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async () => {
  const storages = await prisma.storage.findMany();
  return {
    props: { storages },
  };
};

export default Storages;
