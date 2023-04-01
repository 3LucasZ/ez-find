import { Center, Heading, Stack } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import Item, { ItemProps } from "components/Item";
import { GetServerSideProps } from "next";

const prisma = new PrismaClient();
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const item = await prisma.item.findUnique({
    where: {
      id: String(params?.itemId),
    },
  });
  return {
    props: item,
  };
};

const ItemPage: React.FC<ItemProps> = (props) => {
  var storagesUI = <div>No storages were attached to this item</div>;
  if (props.storages != null) {
    <Stack>
      storagesUI ={" "}
      {props.storages.map((storage) => (
        <div>{storage.name}</div>
      ))}
    </Stack>;
  }
  return (
    <Stack>
      <Center>
        <Heading as="h1" size="4xl">
          {props.name}
        </Heading>
      </Center>
      <Center>{storagesUI}</Center>
    </Stack>
  );
};
export default ItemPage;
