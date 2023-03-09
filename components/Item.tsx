import { Box, Link } from "@chakra-ui/react";
import { StorageUnitProps } from "./StorageUnit";

export type ItemProps = {
  id: number;
  name: string;
  locations: string[];
};

const Item: React.FC<{ item: ItemProps }> = ({ item }) => {
  return <Link href={"view-item/"+item.name}><Box bg="blue.200">{item.name}</Box></Link>;
};

export default Item;
