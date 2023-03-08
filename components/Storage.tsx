import { StorageUnitProps } from "./StorageUnit";

export type StorageProps = {
  id: number;
  name: string;
  items: string[];
};

const Item: React.FC<{ item: StorageProps }> = ({ item }) => {
  return <p>{item.name}</p>;
};

export default Item;
