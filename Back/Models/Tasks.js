// models/task.js

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  wyhtd: String,
  description: String,
  date: String,
  time: String,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
