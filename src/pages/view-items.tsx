import { Box, Input, Stack } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import Header from "components/Header";
import Item, { ItemProps } from "components/Item";
import { GetServerSideProps } from "next";
import { useState } from "react";

type PageProps = {
  items: ItemProps[];
};
type StateProps = {
  query: string;
  list: ItemProps[];
};

const Items: React.FC<PageProps> = (props) => {
  const [state, setState] = useState<StateProps>({
    query: "",
    list: props.items,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = props.items.filter((item) => {
      if (e.target.value === "") return props.items;
      return item.name.toLowerCase().includes(e.target.value.toLowerCase());
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
          {state.list.map((item) => (
            <Item item={item} key={item.id} />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async () => {
  const items = await prisma.item.findMany();
  return {
    props: { items },
  };
};

export default Items;
