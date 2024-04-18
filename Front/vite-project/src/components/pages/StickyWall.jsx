import React, { useState } from 'react';

const StickyWall = () => {
  const [color, setColor] = useState('#e6b905');
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const createNote = () => {
    const newNote = {
      id: Date.now(),
      color: color,
      left: 50,
      top: 60,
      width: 300, // Increase width
      height: 300 // Increase height
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const bringToFront = (id) => {
    const index = notes.findIndex(note => note.id === id);
    const newNotes = [...notes];
    const [selectedNote] = newNotes.splice(index, 1);
    newNotes.push(selectedNote);
    setNotes(newNotes);
  };

  const handleMouseDown = (event, id) => {
    event.stopPropagation();
    setSelectedNote(id);
    bringToFront(id);
    const { clientX, clientY } = event;
    const index = notes.findIndex(note => note.id === id);
    const offsetX = clientX - notes[index].left;
    const offsetY = clientY - notes[index].top;
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (event) => {
    if (selectedNote) {
      const { clientX, clientY } = event;
      const newNotes = notes.map(note => {
        if (note.id === selectedNote) {
          return {
            ...note,
            left: clientX - dragOffset.x,
            top: clientY - dragOffset.y
          };
        }
        return note;
      });
      setNotes(newNotes);
    }
  };

  const handleMouseUp = () => {
    setSelectedNote(null);
  };

  return (
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
        
          body {
            margin: 0;
            font-family: 'Montserrat', sans-serif;
          }
          
          main {
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            background-image: 
              repeating-linear-gradient(
                to right,
                transparent 0 50px, 
                #fff1 50px 51px
              ),
              repeating-linear-gradient(
                to bottom,
                transparent 0 50px, 
                #fff1 50px 51px
              );
            position: relative;
          }
          
          form {
            background-color: #eee;
            width: max-content;
            padding: 5px;
            margin: 10px;
            border-radius: 24px;
            display: flex;
            gap: 10px;
          }
          
          form input, button {
            width: 30px;
            height: 30px;
            padding: 0;
            border: none;
            background-color: transparent;
            font-size: large;
            cursor: pointer;
          }
          
          form input::-webkit-color-swatch-wrapper {
            padding: 0;
          }
          
          form input::-webkit-color-swatch {
            border-radius: 50%;
          }
          
          .note-textarea {
            all: unset;
            color: #000;
            background-color: #fff;
            border: none;
            width: 100%;
            height: 100%;
            resize: none;
            padding: 10px;
            font-family: 'Roboto Mono', monospace;
          }
          
          .note {
            border-radius: 10px;
            box-shadow: 0 20px 50px #0004;
            padding: 0;
            position: absolute;
            overflow: hidden;
          }
          
          .note-top {
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 10px;
            position: sticky;
            top: 0;
            z-index: 1;
          }
          
          .note-bottom {
            height: calc(100% - 30px);
            background-color: #fff;
          }
          
          .note span {
            font-family: cursive;
            font-size: large;
            cursor: pointer;
            color: #000;
          }
        `}
      </style>
      <main
        className="p-4 bg-white rounded shadow-lg"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
<h2 className="text-7xl my-10" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '46px', fontWeight: 'bold' }}> StickyWall</h2>
        <form className="flex items-center">
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          <button type="button" onClick={createNote}>+</button>
        </form>
        <div id="list" className="mt-2">
          {notes.map(note => (
            <div
              key={note.id}
              className="note"
              style={{
                width: note.width + 'px',
                height: note.height + 'px',
                left: note.left + 'px',
                top: note.top + 'px',
                zIndex: note.id === selectedNote ? 1 : 0
              }}
              onMouseDown={(e) => handleMouseDown(e, note.id)}
            >
              <div className="note-top" style={{ backgroundColor: note.color }}>
                <span className="close" onClick={() => deleteNote(note.id)}>x</span>
              </div>
              <div className="note-bottom">
                <textarea
                  placeholder="Write Content..."
                  rows="10"
                  cols="30"
                  className="note-textarea"
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
