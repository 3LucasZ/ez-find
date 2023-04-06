import React, { useState } from "react";
import Router from "next/router";
import { Select } from "chakra-react-select";
import { FormControl, Input, Button } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";

enum FormState {
  Input,
  Submitting,
  Error,
  Success,
}

const ItemDraft: React.FC = () => {
  const options = props.storages.map((storage) => ({
    value: storage.id,
    label: storage.name,
  }));

  const [name, setStorageName] = useState("");
  const [formState, setFormState] = useState(FormState.Input);
  const [locations, setItems] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setFormState(FormState.Submitting);
    try {
      const body = { name, locations };
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
    <div className="add-storage-form">
      <form onSubmit={submitData}>
        <FormControl>
          <Input
            variant="filled"
            marginTop={10}
            placeholder="Storage name"
            isDisabled={formState === FormState.Input ? false : true}
            onChange={(e) => setStorageName(e.target.value)}
          ></Input>
          <Select
            instanceId="chakra-react-select-1"
            isMulti
            name="colors"
            options={options}
            placeholder="Select some colors..."
            closeMenuOnSelect={false}
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
  );
};

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const storages = await prisma.storage.findMany();
  console.log(storages);
  return {
    props: {
      storages,
    },
  };
}

export default ItemDraft;
