import { useToast } from "@chakra-ui/toast";

export function successToast(toaster: any, desc: string) {
  return toaster({
    title: "Success",
    description: desc,
    status: "success",
    duration: 2000,
    isClosable: true,
  });
}

export function errorToast(toaster: any, desc: string) {
  return toaster({
    title: "Error",
    description: desc,
    status: "error",
    duration: 2000,
    isClosable: true,
  });
}
