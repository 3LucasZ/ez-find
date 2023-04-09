import React, { useState } from "react";
import Router, { useRouter } from "next/router";

import { MultiValue, Select } from "chakra-react-select";

import { FormControl, Input, Button, Box, Stack } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import { StorageProps } from "components/Storage";
import Header from "components/Header";
import { GetServerSideProps } from "next";
import { ItemProps } from "components/Item";

enum FormState {
  Input,
  Submitting,
  Error,
  Success,
}
type PageProps = {
  allItems: ItemProps[];
  oldStorage: StorageProps;
};
type RelateProps = {
  id: number;
};
const StorageDraft: React.FC<PageProps> = (props) => {
  const allOptions = props.allItems.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  const prefillOptions = props.oldStorage.items.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  const id = props.oldStorage.id;
  const isNew = id == -1;
  const [name, setName] = useState<string>(isNew ? "" : props.oldStorage.name);
  const [formState, setFormState] = useState(FormState.Input);
  const [items, setItems] = useState<
    MultiValue<{ value: number; label: string }>
  >(isNew ? [] : prefillOptions);
  console.log("upsert buffer:");
  console.log("name:", name);
  console.log("items:", items);
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setFormState(FormState.Submitting);
    try {
      const itemIds: RelateProps[] = [];
      items.map((obj) => itemIds.push({ id: obj.value }));
      const body = { id, name, itemIds };
      const res = await fetch("/api/upsert-storage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push(isNew ? "view-storages" : "storage/" + id);
      setFormState(FormState.Success);
    } catch (error) {
      setFormState(FormState.Error);
      console.error(error);
    }
  };

  return (
    <Stack>
      <Header />
      <Box h="calc(100vh)">
        <div className="add-item-form">
          <form onSubmit={submitData}>
            <FormControl>
              <Input
                value={name}
                variant="filled"
                marginTop={10}
                placeholder="Storage name"
                isDisabled={formState === FormState.Input ? false : true}
                onChange={(e) => setName(e.target.value)}
              ></Input>
              <Select
                isMulti
                name="items"
                options={allOptions}
                value={items}
                placeholder="Select items"
                closeMenuOnSelect={false}
                onChange={(e) => setItems(e)}
                size="lg"
              />
              <Button
                mt={4}
                size="lg"
                colorScheme="teal"
                type="submit"
                isLoading={formState == FormState.Input ? false : true}
              >
                {isNew ? "Add Storage" : "Update Storage"}
              </Button>
            </FormControl>
          </form>
        </div>
      </Box>
    </Stack>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const allItems = await prisma.item.findMany();
  const { id } = context.query;
  const realId = id == undefined ? -1 : Number(id);
  const find = await prisma.storage.findUnique({
    where: {
      id: realId,
    },
    include: {
      items: true,
    },
  });
  const oldStorage = find == null ? { id: -1, storages: [] } : find;
  return {
    props: {
      allItems: allItems,
      oldStorage: oldStorage,
    },
  };
};

export default StorageDraft;
