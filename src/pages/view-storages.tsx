import { Box, Input, Stack } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import Header from "components/Header";
import StorageWidget, { StorageProps } from "components/Storage";
import { GetServerSideProps } from "next";
import { useState } from "react";

type PageProps = {
  storages: StorageProps[];
};
type StateProps = {
  query: string;
  list: StorageProps[];
};

const Storages: React.FC<PageProps> = (props) => {
  const [state, setState] = useState<StateProps>({
    query: "",
    list: props.storages,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = props.storages.filter((storage) => {
      if (e.target.value === "") return Storages;
      return storage.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setState({
      query: e.target.value,
      list: res,
    });
  };

  return (
    <Stack>
      <Header></Header>
      <Box pl="25vw" pr="25vw">
        <Input
          variant="filled"
          placeholder="Search"
          type="search"
          value={state.query}
          onChange={handleChange}
        />
      </Box>
      <Box h="4vh"></Box>
      <Box overflowY="auto" height="50vh">
        <Stack ml="33vw" mr="33vw">
          {state.list.map((storage) => (
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
