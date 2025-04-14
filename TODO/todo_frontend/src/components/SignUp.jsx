// components/Signup.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { BASE_URL } from "../constants";
const Signup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    age: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(BASE_URL + "/signup", form, { withCredentials: true })
      .then(() => navigate("/login"))
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign Up</h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={form.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={form.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="emailId"
        placeholder="Email"
        value={form.emailId}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="gender"
        placeholder="Gender"
        value={form.gender}
        onChange={handleChange}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
