import { SimpleGrid } from "@chakra-ui/react";
import { RouteButton } from "components/RouteButton";
import Layout from "components/Layout";
import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";

type Props = {
  admins: string[];
};
export default function Home({ admins }: Props) {
  return (
    <Layout admins={admins}>
      <SimpleGrid columns={2} spacing={10}>
        <RouteButton
          route={"upsert-item"}
          text={"Add item"}
          imageUrl={"images/add-item.png"}
          color={"red.200"}
        ></RouteButton>
        <RouteButton
          route={"view-items"}
          text={"Find item"}
          imageUrl={"images/find-item.png"}
          color={"teal.200"}
        ></RouteButton>
        <RouteButton
          route={"upsert-storage"}
          text={"Add storage"}
          imageUrl={"images/add-item.png"}
          color={"orange.200"}
        ></RouteButton>
        <RouteButton
          route={"view-storages"}
          text={"View storages"}
          imageUrl={"images/find-item.png"}
          color={"blue.200"}
        ></RouteButton>
      </SimpleGrid>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const admins = await prisma.admin.findMany();
  return {
    props: {
      admins: admins.map((admin) => admin.email),
    },
  };
};
