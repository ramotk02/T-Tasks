
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';

  const StickyWall = () => {
    const [color, setColor] = useState('#e6b905');
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
      fetchNotes();
    }, []);

    const fetchNotes = async () => {
      try {
        const response = await axios.get('https://t-tasks.onrender.com/api/notes');
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    const createNote = async () => {
      try {
        const newNoteWidth = 300;
        const newNoteHeight = 300;
        const left = window.innerWidth / 2 - newNoteWidth / 2;
        const top = window.innerHeight / 2 - newNoteHeight / 2;

        const newNote = {
          color: color,
          left: left,
          top: top,
          width: newNoteWidth,
          height: newNoteHeight,
          content: '' 
        };

        const response = await axios.post('https://t-tasks.onrender.com/api/notes', newNote);
        setNotes(prevNotes => [...prevNotes, response.data]);
      } catch (error) {
        console.error('Error creating note:', error);
      }
    };

    const deleteNote = async (id) => {
      try {
        await axios.delete(`https://t-tasks.onrender.com/api/notes/${id}`);
        setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
        if (selectedNote === id) {
          setSelectedNote(null);
        }
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    };

    useEffect(() => {
      const handleDocumentKeyDown = (event) => {
        if (event.key === 'Delete' && selectedNote) {
          deleteNote(selectedNote);
        }
      };

      document.addEventListener('keydown', handleDocumentKeyDown);

      return () => {
        document.removeEventListener('keydown', handleDocumentKeyDown);
      };
    }, [selectedNote]);

    const bringToFront = (id) => {
      const index = notes.findIndex(note => note._id === id);
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
      const index = notes.findIndex(note => note._id === id);
      const offsetX = clientX - notes[index].left;
      const offsetY = clientY - notes[index].top;
      setDragOffset({ x: offsetX, y: offsetY });
    };

    const handleMouseMove = (event) => {
      if (selectedNote) {
        const { clientX, clientY } = event;
        const newNotes = notes.map(note => {
          if (note._id === selectedNote) {
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

    const handleNoteContentChange = async (e, noteId) => {
      const newContent = e.target.value;
      try {
        await axios.put(`https://t-tasks.onrender.com/api/notes/${noteId}`, { content: newContent });
        const newNotes = notes.map(existingNote => {
          if (existingNote._id === noteId) {
            return { ...existingNote, content: newContent };
          }
          return existingNote;
        });
        setNotes(newNotes);
      } catch (error) {
        console.error('Error updating note:', error);
      }
    };

    return (
      <>
        <style>
          {`
            main {
              width: 100vw;
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
              font-size: large;
              cursor: pointer;
              color: #000;
            }
          `}
        </style>
        <main
          className="p-4 bg-white rounded shadow-lg "
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <h2 className="text-7xl my-10" style={{ fontFamily: '', fontSize: '66px', fontWeight: 550 }}> StickyWall</h2>
          <form className="flex items-center">
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            <button type="button" onClick={createNote}>+</button>
          </form>
          <div id="list" className="mt-2">
            {Array.isArray(notes) && notes.length > 0 ? (
              notes.map(note => (
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
                      onChange={(e) => handleNoteContentChange(e, note._id)}
                    ></textarea>
                  </div>
                </div>
              ))
            ) : (
              <div>No notes available</div>
            )}
          </div>
        </main>
      </>
    );
  };

  export default StickyWall;
