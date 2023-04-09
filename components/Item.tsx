import { Box, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { StorageProps } from "./Storage";

export type ItemProps = {
  id: number;
  name: string;
  storages: StorageProps[];
};

const ItemWidget: React.FC<{ item: ItemProps }> = ({ item }) => {
  return (
    <Link as={NextLink} href={"/view-item/" + item.id}>
      {item.name}
    </Link>
  );
};

export default ItemWidget;
