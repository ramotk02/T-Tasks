import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importez Axios

const StickyWall = () => {
  const [color, setColor] = useState('#e6b905');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('/api/notes')
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, []);

  const createNote = () => {
    const newNote = {
      color: color,
      left: 50,
      top: 60,
      width: 300,
      height: 300,
      content: "",
    };

    axios.post('/api/notes', newNote)
      .then((response) => {
        console.log("Note created:", response.data);
        setNotes([...notes, response.data]);
      })
      .catch((error) => {
        console.error("Error creating note:", error);
      });
  };

  const deleteNote = (id) => {
    axios.delete(`/api/notes/${id}`)
      .then(() => {
        console.log("Note deleted:", id);
        setNotes(notes.filter((note) => note._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  };

  // Fonctions handleMouseDown, handleMouseMove, handleMouseUp restent inchangées

  return (
    <>
      <style>{/* Styles CSS restent inchangés */}</style>
      <main
        className="p-4 bg-white rounded shadow-lg"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <h2 className="text-7xl my-10" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '66px', fontWeight: 500 }}> StickyWall</h2>
        <form className="flex items-center">
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          <button type="button" onClick={createNote}>+</button>
        </form>
        <div id="list" className="mt-2">
          {notes.map(note => (
            <div
              key={note._id}
              className="note"
              style={{
                width: note.width + 'px',
                height: note.height + 'px',
                left: note.left + 'px',
                top: note.top + 'px',
                zIndex: note._id === selectedNote ? 1 : 0
              }}
              onMouseDown={(e) => handleMouseDown(e, note._id)}
            >
              <div className="note-top" style={{ backgroundColor: note.color }}>
                <span className="close" onClick={() => deleteNote(note._id)}>x</span>
              </div>
              <div className="note-bottom">
                <textarea
                  placeholder="Write Content..."
                  rows="10"
                  cols="30"
                  className="note-textarea"
                  value={note.content}
                  onChange={(e) => {
                    const updatedNotes = notes.map((n) =>
                      n._id === note._id ? { ...n, content: e.target.value } : n
                    );
                    setNotes(updatedNotes);
                  }}
                ></textarea>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default StickyWall;
