import { Stack } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import Item, { ItemProps } from "components/Item";
import { GetServerSideProps } from "next";

type Props = {
  items: ItemProps[];
};

const Items: React.FC<Props> = (props) => {
  return (
    <Stack>
      {props.items.map((item) => (
        <Item item={item} />
      ))}
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
