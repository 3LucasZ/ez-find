import { StorageUnitProps } from "./StorageUnit";

export type ItemProps = {
  id: number;
  name: string;
  locations: string[];
};

const Item: React.FC<{ item: ItemProps }> = ({ item }) => {
  return <p>{item.name}</p>;
};

export default Item;
