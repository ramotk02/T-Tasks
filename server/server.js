const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Note = require("./Models/Note");
const Task= require("./Models/Tasks");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3002;

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
app.get("/",async (req,res)=>{
  res.json("Hello World")
})
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
  app.delete("/api/tasks/:id", async (req, res) => {
    const taskId = req.params.id;
    try {
      const deletedTask = await Task.findByIdAndDelete(taskId);
      if (!deletedTask) {
        return res.status(404).json({ error: "Task not found" });
      }
      console.log("Task deleted:", deletedTask);
      res.status(200).json(deletedTask);
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app.put("/api/tasks/:id", async (req, res) => {
    const taskId = req.params.id;
    const { completed } = req.body;
    try {
      const updatedTask = await Task.findByIdAndUpdate(taskId, { completed }, { new: true });
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

  app.get("/api/notes", async (req, res) => {
    try {
      const notes = await Note.find();
      res.status(200).json(notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    Note.create(newNote)
      .then((note) => {
        console.log("Note created:", note);
        res.status(201).json(note);
      })
      .catch((error) => {
        console.error("Error creating note:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  });
  
  app.delete("/api/notes/:id", async (req, res) => {
    const noteId = req.params.id;
    try {
      const deletedNote = await Note.findByIdAndDelete(noteId);
      if (!deletedNote) {
        return res.status(404).json({ error: "Note not found" });
      }
      console.log("Note deleted:", deletedNote);
      res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
      console.error("Error deleting note:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  app.put("/api/notes/:id", async (req, res) => {
    const noteId = req.params.id;
    const { title, content } = req.body;
    try {
      const updatedNote = await Note.findByIdAndUpdate(noteId, { title, content }, { new: true });
      if (!updatedNote) {
        return res.status(404).json({ error: "Note not found" });
      }
      console.log("Note updated:", updatedNote);
      res.status(200).json(updatedNote);
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  