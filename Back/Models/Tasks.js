

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  wyhtd: String,
  description: String,
  date: String,
  time: String,
  completed: {
    type: Boolean,
    default: false
  }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
