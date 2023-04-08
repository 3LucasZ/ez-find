import React, { useState } from "react";
import Router from "next/router";

import { Select } from "chakra-react-select";

import { FormControl, Input, Button, Box, Stack } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import { StorageProps } from "components/Storage";
import Header from "components/Header";

enum FormState {
  Input,
  Submitting,
  Error,
  Success,
}

const ItemDraft: React.FC<StorageProps[]> = (props) => {
  const options = props.storages.map((storage) => ({
    value: storage.id,
    label: storage.name,
  }));

  const [name, setName] = useState("");
  const [formState, setFormState] = useState(FormState.Input);
  const [storageIds, setStorageIds] = useState([]);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setFormState(FormState.Submitting);
    try {
      const body = { name, storageIds };
      console.log(body);
      const res = await fetch("/api/add-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("view-items");
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
                placeholder="Item name"
                isDisabled={formState === FormState.Input ? false : true}
                onChange={(e) => setName(e.target.value)}
              ></Input>
              <Select
                isMulti
                name="storages"
                options={options}
                placeholder="Select storages"
                closeMenuOnSelect={false}
                onChange={(e) => setStorageIds(Array.from(e.values))}
                size="lg"
              />
              <Button
                mt={4}
                size="lg"
                colorScheme="teal"
                type="submit"
                isLoading={formState == FormState.Input ? false : true}
              >
                Submit Item
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
  const storages = await prisma.storage.findMany();
  return {
    props: {
      storages,
    },
  };
}

export default ItemDraft;
