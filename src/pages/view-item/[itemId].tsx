import { Center, Heading, Stack } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import Item, { ItemProps } from "components/Item";
import { GetServerSideProps } from "next";

const prisma = new PrismaClient();
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const item = await prisma.item.findUnique({
    where: {
      id: params?.itemId,
    },
  });
  return {
    props: item,
  };
};

const ItemPage: React.FC<ItemProps> = (props) => {
  var storagesUI = <div>No storages were attached to this item</div>;
  console.log(props);
  console.log("Storages:"+props.storages);
  if (props.storages != null) {
    console.log("Storages are NOT null");
    storagesUI = <Stack>
      {props.storages.map((storage) => (
        <div>{storage.name}</div>
      ))}
    </Stack>;
  } else {
    console.log("Storages are null")
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
