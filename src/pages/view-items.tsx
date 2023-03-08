import { Box, Stack } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import Header from "components/Header";
import Item, { ItemProps } from "components/Item";
import { GetServerSideProps } from "next";

type Props = {
  items: ItemProps[];
};

const Items: React.FC<Props> = (props) => {
  return (
    <Stack>
      <Header></Header>
      <Box overflowY="auto" height="300px" bg={"red.200"}>
        <Stack>
          {props.items.map((item) => (
            <Item item={item} />
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
