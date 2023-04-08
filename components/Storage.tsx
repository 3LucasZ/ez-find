import { ItemProps } from "./Item";

export type StorageProps = {
  id: number;
  name: string;
  items: ItemProps[];
};

const StorageWidget: React.FC<{ storage: StorageProps }> = ({ storage }) => {
  return <p>{storage.name}</p>;
};

export default StorageWidget;
