import React, { useState } from "react";
import Router from "next/router";

import {
  FormControl,
  Input,
  Button,
  
} from '@chakra-ui/react'

enum FormState {
  Input,
  Submitting,
  Error,
  Success
}

const ItemDraft: React.FC = () => {
  const [name, setItemName] = useState("");
  const [formState, setFormState] = useState(FormState.Input);
  const [locations, setLocation] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setFormState(FormState.Submitting);
    try {
      const body = { name, locations };
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
    <div className="add-item-form">
    <form onSubmit={submitData}>
      <FormControl> 
        <Input 
          variant="filled"
          marginTop={10}
          placeholder="Item name"
          isDisabled={formState===FormState.Input ? false : true}
          onChange={(e) => setItemName(e.target.value)}>
        </Input>
        <Input 
          variant="filled"
          marginY={10}
          placeholder="Item Location"
          isDisabled={formState===FormState.Input ? false : true}
          onChange={(e) => setLocation(e.target.value)}>
        </Input>
        <Button
          mt={4}
          size='lg'
          colorScheme="teal"
          type='submit'
          isLoading={formState == FormState.Input ? false: true}>

        Submit Item
      </Button>
      </FormControl>
    </form>
    </div>
  );
};

export default ItemDraft;
