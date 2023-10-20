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

export default function Header() {
  const { data: session } = useSession();
  const admin = session ? (
    <Link href={"manage-admin"}>Admin Dashboard</Link>
  ) : (
    ""
  );
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
    </Stack>
  );
  return (
    <Stack margin={0}>
      <Box h="1vh"></Box>
      <Center margin={0}>
        <SimpleGrid columns={3} spacing={10} margin={0}>
          <Box>{admin}</Box>
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
      <Box h="1vh"></Box>
      <Divider />
      <Box h="5vh"></Box>
    </Stack>
  );
}
