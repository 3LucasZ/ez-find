import { Box, Link } from "@chakra-ui/react";
import { StorageProps } from "./Storage";

export type ItemProps = {
  id: number;
  name: string;
  storages: StorageProps[];
};

const ItemWidget: React.FC<{ item: ItemProps }> = ({ item }) => {
  return (
    <Link href={"view-item/" + item.id}>
      <Box bg="blue.200">{item.name}</Box>
    </Link>
  );
};

export default ItemWidget;
