import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { addUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
  BsPencil,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [updatetask, setUpdatetask] = useState("");
  const [taskid, setTaskid] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchTodos = () => {
    axios
      .get("http://localhost:5000/get", { withCredentials: true })
      .then((result) => {
        const todoList = result?.data?.Todos || []; // fallback to empty array
        setTodos(todoList);
        dispatch(addUser(result.data));
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          navigate("/login");
        }
      });
  };

  useEffect(() => {
    fetchTodos(); // only run once on mount
  }, []);

  const edit = (id) => {
    axios
      .put(`http://localhost:5000/edit/${id}`, {}, { withCredentials: true })
      .then(fetchTodos)
      .catch((err) => console.log(err));
  };

  const Update = (id, updatedTask) => {
    axios
      .put(
        `http://localhost:5000/update/${id}`,
        { task: updatedTask },
        { withCredentials: true }
      )
      .then(() => {
        setTaskid("");
        setUpdatetask("");
        fetchTodos();
      })
      .catch((err) => console.log(err));
  };

  const Hdelete = (id) => {
    axios
      .delete(`http://localhost:5000/delete/${id}`, { withCredentials: true })
      .then(fetchTodos)
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <Create fetchTodos={fetchTodos} />
      {todos.length === 0 ? (
        <div className="task">No tasks found</div>
      ) : (
        todos.map((todo) => (
          <div className="task" key={todo._id}>
            <div className="checkbox">
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" onClick={() => edit(todo._id)} />
              )}
              {taskid === todo._id ? (
                <input
                  type="text"
                  value={updatetask}
                  onChange={(e) => setUpdatetask(e.target.value)}
                />
              ) : (
                <p className={todo.done ? "through" : "normal"}>{todo.task}</p>
              )}
            </div>

            {/* 🗓️ Dates Section */}
            <div className="dates">
              <small>
                Created: {new Date(todo.createdAt).toLocaleString()}
              </small>
              {todo.done && (
                <small>
                  Completed: {new Date(todo.updatedAt).toLocaleString()}
                </small>
              )}
            </div>

            <div>
              <span>
                <BsPencil
                  className="icon"
                  onClick={() => {
                    if (taskid === todo._id) {
                      Update(todo._id, updatetask);
                    } else {
                      setTaskid(todo._id);
                      setUpdatetask(todo.task);
                    }
                  }}
                />
                <BsFillTrashFill
                  className="icon"
                  onClick={() => Hdelete(todo._id)}
                />
              </span>
            </div>
          </div>
        ))
      )}
    </main>
  );
};

export default Home;
