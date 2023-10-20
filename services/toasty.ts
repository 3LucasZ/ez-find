import { useToast } from "@chakra-ui/toast";

export function successToast() {
  const toast = useToast();
  return toast({
    title: "Account created.",
    description: "We've created your account for you.",
    status: "success",
    duration: 3000,
    isClosable: true,
  });
}
