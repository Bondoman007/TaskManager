const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const authRouter = require("./auth");
const { userAuth } = require("./middleware/auth");
const cookieParser = require("cookie-parser");
require("dotenv").config(); // ✅ Load environment variables early in the file

const app = express();

app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });

app.listen(5000, () => console.log("Server listening on port: 5000"));
app.use("/", authRouter);

// ADD TODO
app.post("/add", userAuth, async (req, res) => {
  try {
    const { task } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { Todos: { task } } },
      { new: true }
    );
    res.json(updatedUser.Todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET TODOS
app.get("/get", userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    console.log(user);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MARK TODO AS DONE
app.put("/edit/:id", userAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id, "Todos._id": id },
      { $set: { "Todos.$.done": true } },
      { new: true }
    );
    res.json(updatedUser.Todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE TASK TEXT
app.put("/update/:id", userAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id, "Todos._id": id },
      { $set: { "Todos.$.task": task } },
      { new: true }
    );
    res.json(updatedUser.Todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE TODO
app.delete("/delete/:id", userAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { Todos: { _id: id } } },
      { new: true }
    );
    res.json(updatedUser.Todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
