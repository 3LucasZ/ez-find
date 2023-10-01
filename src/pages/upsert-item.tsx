import React, { useState } from "react";
import Router from "next/router";

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
  allStorages: StorageProps[];
  oldItem: ItemProps;
};
type RelateProps = {
  id: number;
};
const ItemDraft: React.FC<PageProps> = (props) => {
  const allOptions = props.allStorages.map((storage) => ({
    value: storage.id,
    label: storage.name,
  }));
  const prefillOptions = props.oldItem.storages.map((storage) => ({
    value: storage.id,
    label: storage.name,
  }));
  const id = props.oldItem.id;
  const isNew = id == -1;
  const [name, setName] = useState<string>(isNew ? "" : props.oldItem.name);
  const [formState, setFormState] = useState(FormState.Input);
  const [storages, setStorages] = useState<
    MultiValue<{ value: number; label: string }>
  >(isNew ? [] : prefillOptions);
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setFormState(FormState.Submitting);
    try {
      const storageIds: RelateProps[] = [];
      storages.map((obj) => storageIds.push({ id: obj.value }));
      const body = { id, name, storageIds };
      console.log(body);
      const res = await fetch("/api/upsert-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push(isNew ? "view-items" : "item/" + id);
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
                placeholder="Item name"
                isDisabled={formState === FormState.Input ? false : true}
                onChange={(e) => setName(e.target.value)}
              ></Input>
              <Select
                isMulti
                name="storages"
                options={allOptions}
                value={storages}
                placeholder="Select storages"
                closeMenuOnSelect={false}
                onChange={(e) => setStorages(e)}
                size="lg"
              />
              <Button
                mt={4}
                size="lg"
                colorScheme="teal"
                type="submit"
                isLoading={formState == FormState.Input ? false : true}
              >
                {isNew ? "Add Item" : "Update Item"}
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
  const allStorages = await prisma.storage.findMany();
  const { id } = context.query;
  const realId = id == undefined ? -1 : Number(id);
  const find = await prisma.item.findUnique({
    where: {
      id: realId,
    },
    include: {
      storages: true,
    },
  });
  const oldItem = find == null ? { id: -1, name: "", storages: [] } : find;
  return {
    props: {
      allStorages: allStorages,
      oldItem: oldItem,
    },
  };
};

export default ItemDraft;
