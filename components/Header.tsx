import { Box, Center, Divider, Heading, Link, Stack } from "@chakra-ui/react";

export default function Header() {
  return (
    <Stack>
      <Box h="2vh"></Box>
      <Center>
        <Link href={"/"} style={{ textDecoration: "none" }}>
          <Heading as="h1" size="4xl" color="teal.500">
            EZ-Find
          </Heading>
        </Link>
      </Center>
      <Box h="5vh"></Box>
      <Divider />
      <Box h="5vh"></Box>
    </Stack>
  );
}
