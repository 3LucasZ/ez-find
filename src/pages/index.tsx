import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import {
  Box,
  Center,
  Divider,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { RouteButton } from "components/RouteButton";
import Header from "components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>EZ-Find</title>
        <meta name="description" content="Inventory Tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Stack>
          <Header />
          <SimpleGrid columns={2} spacing={10}>
            <RouteButton
              route={"add-item"}
              text={"add item"}
              imageUrl={"images/add-item.png"}
              color={"red.200"}
            ></RouteButton>
            <RouteButton
              route={"view-items"}
              text={"find item"}
              imageUrl={"images/find-item.png"}
              color={"teal.200"}
            ></RouteButton>
            <RouteButton
              route={"add-storage"}
              text={"add storage"}
              imageUrl={"images/add-item.png"}
              color={"orange.200"}
            ></RouteButton>
            <RouteButton
              route={"view-storages"}
              text={"view storages"}
              imageUrl={"images/find-item.png"}
              color={"blue.200"}
            ></RouteButton>
          </SimpleGrid>
        </Stack>
      </main>
    </>
  );
}
