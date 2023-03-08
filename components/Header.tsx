import { Box, Center, Divider, Heading, Stack } from "@chakra-ui/react";

export default function Header() {
  return (
    <Stack>
        <Box h="2vh"></Box>
          <Center>
            <Heading as="h1" size="4xl">
              EZ-Find
            </Heading>
          </Center>
          <Box h="5vh"></Box>
          <Divider />
          <Box h="5vh"></Box>
        </Stack>
  );
}