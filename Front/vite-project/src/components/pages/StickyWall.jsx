import React, { useState } from 'react';

const StickyWall = () => {
  const [color, setColor] = useState('#e6b905');
  const [notes, setNotes] = useState([]);

  const createNote = () => {
    const newNote = {
      id: Date.now(),
      color: color,
      left: 50,
      top: 60
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleMouseDown = (event, id) => {
    const index = notes.findIndex(note => note.id === id);
    const { clientX, clientY } = event;
    const newNotes = [...notes];
    newNotes[index].cursor = { x: clientX, y: clientY };
    setNotes(newNotes);
  };

  const handleMouseMove = (event, id) => {
    const index = notes.findIndex(note => note.id === id);
    if (notes[index].cursor) {
      const { clientX, clientY } = event;
      const deltaX = clientX - notes[index].cursor.x;
      const deltaY = clientY - notes[index].cursor.y;
      const newNotes = [...notes];
      newNotes[index].left += deltaX;
      newNotes[index].top += deltaY;
      newNotes[index].cursor = { x: clientX, y: clientY };
      setNotes(newNotes);
    }
  };

  const handleMouseUp = (id) => {
    const index = notes.findIndex(note => note.id === id);
    const newNotes = [...notes];
    delete newNotes[index].cursor;
    setNotes(newNotes);
  };

  return (
    <main className="max-w-lg mx-auto mt-8 p-4 bg-white rounded shadow-lg">
      <form className="flex items-center">
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <button type="button" onClick={createNote}>+</button>
      </form>
      <div id="list" className="mt-4">
        {notes.map(note => (
          <div
            key={note.id}
            className="note"
            style={{
              backgroundColor: note.color,
              left: note.left + 'px',
              top: note.top + 'px'
            }}
            onMouseDown={(e) => handleMouseDown(e, note.id)}
            onMouseMove={(e) => handleMouseMove(e, note.id)}
            onMouseUp={() => handleMouseUp(note.id)}
          >
            <span className="close" onClick={() => deleteNote(note.id)}>x</span>
            <textarea placeholder="Write Content..." rows="10" cols="30"></textarea>
          </div>
        ))}
      </div>
      <style>
        {`
          body{
              margin: 0;
              font-family: Poppins;
          }
          main{
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
          form{
              background-color: #eee;
              width: max-content;
              padding: 5px;
              margin: 10px;
              border-radius: 24px;
              display: flex;
              gap: 10px;
          }
          form input, button{
              width: 30px;
              height: 30px;
              padding: 0;
              border: none;
              background-color: transparent;
              font-size: large;
              cursor: pointer;
          }
          form input::-webkit-color-swatch-wrapper{
              padding: 0;
          }
          form input::-webkit-color-swatch{
              border-radius: 50%;
          }
          #list textarea{
              all: unset;
              color: #d6d6d6;
          }
          #list .note{
              background-color: #333;
              width: max-content;
              border-top: 30px solid #e6b905;
              border-radius: 10px;
              box-shadow: 0 20px 50px #0004;
              padding: 10px;
              position: absolute;
          }
          #list .note span{
              position: absolute;
              bottom: 100%;
              right: 0;
              height: 30px;
              font-family: cursive;
              font-size: large;
              padding-right: 10px;
              cursor: pointer;
          }
        `}
      </style>
    </main>
  );
};

export default StickyWall;
