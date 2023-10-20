import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
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
      <Flex>
        <Button
          onClick={(e) => {
            e.preventDefault();
            session ? signOut() : signIn("google");
          }}
        >
          {session ? "Sign out" : "Sign in"}
        </Button>
        {session && (
          <>
            <Box w="2"></Box>
            <Button
              onClick={() => {
                Router.push("/manage-admin");
              }}
            >
              Admin Dashboard
            </Button>
          </>
        )}
      </Flex>
    </Stack>
  );
  return (
    <div>
      <Box h="1"></Box>

      <SimpleGrid columns={3} spacing={10}>
        <Box></Box>
        <Box>
          <Center>
            <Link href={"/"} style={{ textDecoration: "none" }}>
              <Heading as="h1" size="4xl" color="teal.500">
                EZ-Find
              </Heading>
            </Link>
          </Center>
        </Box>
        <Box>{auth}</Box>
      </SimpleGrid>
      <Box h="5"></Box>
    </div>
  );
}
