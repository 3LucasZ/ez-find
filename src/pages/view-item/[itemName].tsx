import { Stack } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import Item, { ItemProps } from "components/Item";
import { GetServerSideProps } from "next";

type Props = {
  items: ItemProps[];
};

const Items: React.FC<Props> = (props) => {
  return (
    <div>props.items.name</div>
  );
};

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const item = await prisma.item.findUnique({
    where: {
        name: params.itemName
    }
  });
  return {
    props: { item },
  };
};

export default Items;
