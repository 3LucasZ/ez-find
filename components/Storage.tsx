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
    <Link href={"view-storage/" + storage.id}>
      <Box bg="blue.200">{storage.name}</Box>
    </Link>
  );
};

export default StorageWidget;
