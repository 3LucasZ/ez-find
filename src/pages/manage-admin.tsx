import { Box, Button, HStack, Input, Stack } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import Header from "components/Header";
import Admin, { AdminProps } from "components/Admin";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { cursorTo } from "readline";
import Router from "next/router";

type PageProps = {
  admins: AdminProps[];
};

type StateProps = {
  query: string;
  list: AdminProps[];
};

const Admins: React.FC<PageProps> = (props) => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<StateProps>({
    query: "",
    list: props.admins,
  });
  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = props.admins.filter((admin) => {
      if (e.target.value === "") return props.admins;
      return admin.email.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setState({
      query: e.target.value,
      list: res,
    });
  };
  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { email };
      const res = await fetch("/api/add-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status == 500) {
        alert("Error: a user with the same email already exists.");
      } else {
        await Router.push("manage-admin");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Stack>
      <Header></Header>
      <HStack pl="25vw" pr="25vw">
        <Input
          variant="filled"
          placeholder="Admin email"
          value={email}
          onChange={handleCreateChange}
        />
        <Button onClick={submitData}>Create Admin</Button>
      </HStack>
      <Box pl="25vw" pr="25vw">
        <Input
          variant="filled"
          placeholder="Search"
          type="search"
          value={state.query}
          onChange={handleSearchQueryChange}
        />
      </Box>
      <Box h="4vh"></Box>
      <Box overflowY="auto" height="50vh">
        <Stack ml="33vw" mr="33vw">
          {state.list.map((admin) => (
            <Admin admin={admin} key={admin.id} />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async () => {
  const admins = await prisma.admin.findMany();
  return {
    props: { admins },
  };
};

export default Admins;
