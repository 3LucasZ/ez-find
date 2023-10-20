import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Router from "next/router";

export default function Header() {
  const { data: session } = useSession();

  const auth = (
    <Stack>
      <Text>
        {session
          ? "Signed in as " + session.user!.email
          : "You are not signed in"}
      </Text>
      <Button
        onClick={(e) => {
          e.preventDefault();
          session ? signOut() : signIn("google");
        }}
      >
        {session ? "Sign out" : "Google sign in"}
      </Button>
      {session ? (
        <Button
          onClick={() => {
            Router.push("/manage-admin");
          }}
        >
          Admin Dashboard
        </Button>
      ) : (
        ""
      )}
    </Stack>
  );
  return (
    <Stack>
      <Box h="1"></Box>
      <Center>
        <SimpleGrid columns={3} spacing={10}>
          <Box></Box>
          <Box>
            <Link href={"/"} style={{ textDecoration: "none" }}>
              <Heading as="h1" size="4xl" color="teal.500">
                EZ-Find
              </Heading>
            </Link>
          </Box>
          <Box>{auth}</Box>
        </SimpleGrid>
      </Center>
      <Divider />
      <Box h="1"></Box>
    </Stack>
  );
}
