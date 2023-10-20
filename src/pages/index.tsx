import Head from "next/head";
import { SimpleGrid, Stack } from "@chakra-ui/react";
import { RouteButton } from "components/RouteButton";
import Header from "components/Header";
import Layout from "components/Layout";

export default function Home() {
  return (
    <Layout>
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
