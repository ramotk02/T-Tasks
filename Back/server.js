const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Note = require("./Models/Note"); // Importez votre modèle de Note
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

app.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;
  Note.findByIdAndDelete(noteId)
    .then(() => {
      console.log("Note deleted:", noteId);
      res.status(200).json({ message: "Note deleted successfully" });
    })
    .catch((error) => {
      console.error("Error deleting note:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});
