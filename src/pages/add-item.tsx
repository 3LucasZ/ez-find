import React, { useState } from "react";
import Router from "next/router";

const ItemDraft: React.FC = () => {
  const [name, setName] = useState("");
  const [locations, addLocation] = useState([]);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { name, locations };
      const res = await fetch("/api/add-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("view-items");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={submitData}>
      <h1>Create Item</h1>
      <input
        autoFocus
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        type="text"
        value={name}
      />

      <input disabled={!name} type="submit" value="Update" />
      <a href="#" onClick={() => Router.push("/")}>
        or Cancel
      </a>
    </form>
  );
};

export default ItemDraft;
