import { Box } from "@chakra-ui/react";

export type AdminProps = {
  id: number;
  email: string;
};

const AdminWidget: React.FC<{ admin: AdminProps }> = ({ admin }) => {
  let hoverState = {
    bg: "teal.400",
  };
  return (
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
  );
};

export default AdminWidget;
