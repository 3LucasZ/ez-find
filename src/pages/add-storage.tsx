import React, { useState } from "react";
import Router from "next/router";

import { Select } from "chakra-react-select";

import { FormControl, Input, Button, Box, Stack } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import { StorageProps } from "components/Storage";
import Header from "components/Header";
import { ItemProps } from "components/Item";

enum FormState {
  Input,
  Submitting,
  Error,
  Success,
}
type PageProps = {
  items: ItemProps[];
};
type RelateProps = {
  id: number;
};
const StorageDraft: React.FC<PageProps> = (props) => {
  const options = props.items.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const [name, setName] = useState("");
  const [formState, setFormState] = useState(FormState.Input);
  const [itemIds, setStorageIds] = useState<RelateProps[]>([]);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setFormState(FormState.Submitting);
    try {
      const body = { name, itemIds };
      console.log(body);
      const res = await fetch("/api/add-storage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("view-storages");
      setFormState(FormState.Success);
    } catch (error) {
      setFormState(FormState.Error);
      console.error(error);
    }
  };

  /* Use to unit test form states */
  // const simulateSubmissionData = async (e: React.SyntheticEvent) => {
  //   console.log("Hello");
  //   e.preventDefault();
  //   setFormState(FormState.Submitting);
  //   setTimeout(() => {
  //     console.log("Sending");
  //     setFormState(FormState.Input);
  //   }, 3000);
  // }

  return (
    <Stack>
      <Header />
      <Box h="calc(100vh)">
        <div className="add-item-form">
          <form onSubmit={submitData}>
            <FormControl>
              <Input
                variant="filled"
                marginTop={10}
                placeholder="Storage name"
                isDisabled={formState === FormState.Input ? false : true}
                onChange={(e) => setName(e.target.value)}
              ></Input>
              <Select
                isMulti
                name="storages"
                options={options}
                placeholder="Select items"
                closeMenuOnSelect={false}
                onChange={(e) => {
                  const ids: RelateProps[] = [];
                  e.map((obj) => ids.push({ id: obj.value }));
                  console.log(ids);
                  setStorageIds(ids);
                }}
                size="lg"
              />
              <Button
                mt={4}
                size="lg"
                colorScheme="teal"
                type="submit"
                isLoading={formState == FormState.Input ? false : true}
              >
                Submit Storage
              </Button>
            </FormControl>
          </form>
        </div>
      </Box>
    </Stack>
  );
};

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const items = await prisma.item.findMany();
  return {
    props: {
      items: items,
    },
  };
}

export default StorageDraft;
