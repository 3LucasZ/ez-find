import { DeleteIcon } from "@chakra-ui/icons";
import { Box, HStack, IconButton } from "@chakra-ui/react";

export type AdminProps = {
  id: number;
  email: string;
};

const AdminWidget: React.FC<{ admin: AdminProps }> = ({ admin }) => {
  let hoverState = {
    bg: "teal.400",
  };
  return (
    <HStack>
      <Box
        borderRadius="md"
        bg="teal.300"
        color="white"
        px={4}
        h={8}
        _hover={hoverState}
      >
        {admin.email}
      </Box>
      <IconButton
        onClick={() => console.log("HAHA")}
        colorScheme="red"
        aria-label="delete"
        icon={<DeleteIcon />}
      />
    </HStack>
  );
};

export default AdminWidget;
