// components/Create.js
import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants";
const Create = ({ fetchTodos }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(BASE_URL + "/add", { task }, { withCredentials: true })
      .then(() => {
        setTask("");
        fetchTodos();
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit} className="create">
      <input
        type="text"
        placeholder="Add a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default Create;
