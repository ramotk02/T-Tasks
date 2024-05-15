// Models/Note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  color: String,
  left: Number,
  top: Number,
  width: Number,
  height: Number,
  content: String,
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
