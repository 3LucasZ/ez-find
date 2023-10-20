import { PrismaClient } from "@prisma/client";
import StorageWidget, { StorageProps } from "components/Storage";
import Layout from "components/Layout";
import { GetServerSideProps } from "next";
import SearchView from "components/SearchView";

type PageProps = {
  storages: StorageProps[];
};

const Storages: React.FC<PageProps> = (props) => {
  return (
    <Layout>
      <SearchView
        set={props.storages.map((storage) => ({
          name: storage.name,
          widget: <StorageWidget storage={storage} key={storage.id} />,
        }))}
      />
    </Layout>
  );
};

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async () => {
  const storages = await prisma.storage.findMany();
  return {
    props: { storages },
  };
};

export default Storages;
