import { ItemProps } from "./Item";

export type StorageUnitProps = {
  id: number;
  name: string;
  items: ItemProps[];
};

const StorageUnit: React.FC<{ storageUnit: StorageUnitProps }> = ({
  storageUnit,
}) => {
  return <p>{storageUnit.name}</p>;
};

export default StorageUnit;
