
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const Task = require("./Models/Tasks");
require("dotenv").config();

const app = express();
const port = 3002;

app.use(express.json());
app.use(cors()); 

mongoose
  .connect(
    `mongodb+srv://omartakyot:${process.env.MONGODB_PASSWORD}@cluster0.mxrkn5l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks); 
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/tasks", (req, res) => {
  const newTask = req.body;
  Task.create(newTask)
    .then((task) => {
      console.log("Task created:", task);
      res.status(201).json(task);
    })
    .catch((error) => {
      console.error("Error creating task:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});
