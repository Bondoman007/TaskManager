// components/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { BASE_URL } from "../constants";
const Login = () => {
  const [form, setForm] = useState({ emailId: "", password: "" });
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(BASE_URL + "/login", form, { withCredentials: true })
      .then((result) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, emailId: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
