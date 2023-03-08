import { Box } from "@chakra-ui/react";
import { StorageUnitProps } from "./StorageUnit";

export type ItemProps = {
  id: number;
  name: string;
  locations: string[];
};

const Item: React.FC<{ item: ItemProps }> = ({ item }) => {
  return <Box bg="blue.200">{item.name}</Box>;
};

export default Item;
