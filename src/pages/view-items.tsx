import { PrismaClient } from "@prisma/client";
import ItemWidget, { ItemProps } from "components/Item";
import Layout from "components/Layout";
import SearchView from "components/SearchView";
import { GetServerSideProps } from "next";

type PageProps = {
  items: ItemProps[];
};

const Items: React.FC<PageProps> = (props) => {
  return (
    <Layout>
      <SearchView
        set={props.items.map((item) => ({
          name: item.name,
          widget: <ItemWidget item={item} key={item.id} />,
        }))}
      />
    </Layout>
  );
};

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async () => {
  const items = await prisma.item.findMany();
  return {
    props: { items },
  };
};

export default Items;
