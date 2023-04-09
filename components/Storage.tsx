import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { ItemProps } from "./Item";

export type StorageProps = {
  id: number;
  name: string;
  items: ItemProps[];
};

const StorageWidget: React.FC<{ storage: StorageProps }> = ({ storage }) => {
  return (
    <Link href={"/view-storage/" + storage.id}>
      <Box borderRadius="md" bg="blue.300" color="white" px={4} h={8}>
        {storage.name}
      </Box>
    </Link>
  );
};

export default StorageWidget;
