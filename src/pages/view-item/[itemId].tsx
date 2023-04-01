import { Center, Heading, Stack } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import Item, { ItemProps } from "components/Item";
import { GetServerSideProps } from "next";

const prisma = new PrismaClient();
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const item = await prisma.item.findUnique({
    where: {
      name: String(params?.itemName),
    },
  });
  return {
    props: item,
  };
};

const ItemPage: React.FC<ItemProps> = (props) => {
  return (
    <div>
      <Stack>
        <Center>
          <Heading as="h1" size="4xl">
            {props.name}
          </Heading>
        </Center>
        {props.storagesOnItems.map((connection) => (
          <div>{connection.storage.name}</div>
        ))}
      </Stack>
    </div>
  );
};
export default ItemPage;
