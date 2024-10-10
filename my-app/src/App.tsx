import React from 'react';
import logo from './logo.svg';
import { Label, Note } from "./types"
import { dummyNotesList } from './constants';
import './App.css';
import { useState, useEffect } from 'react';
import { IoHeart } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";



function App() {
  const [notes, setNotes] = useState(dummyNotesList);
  const initialNote = {
    id: -1,
    title: "",
    content:"",
    label: Label.other,
  }
  const [createNote, setCreateNote] = useState(initialNote);
  const [favorites, setFavorites] = useState<number[]>([]);


  function createNoteHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newNote = {
      id: notes.length + 1,
      title: createNote.title,
      content: createNote.content,
      label: createNote.label,
    }
    setNotes([...notes, newNote]);
    setCreateNote(initialNote);
  }

  const favoriteClicker = (noteId: number) => {
    if (favorites.includes(noteId)) {
      setFavorites(favorites.filter((id)=> id !== noteId));
    } else {
      setFavorites([...favorites, noteId]);
    }
  };

  useEffect(() => {
    console.log('The favorites list is:', favorites);
  }, [favorites])

  return (
    <div className="app-container">
      <div className="sidebar">
        <form className="note-form" onSubmit={createNoteHandler}>
          <div>
            <input
              placeholder="Note Title"
              onChange={(event) =>
                setCreateNote({ ...createNote, title: event.target.value })
              }
              required
            ></input>
          </div>

          <div>
            <textarea
              placeholder="Note Content"
              onChange={(event) =>
                setCreateNote({ ...createNote, content: event.target.value })
              }
              required
            ></textarea>
          </div>

          <div>
            <select
              onChange={(event) =>
                setCreateNote({
                  ...createNote,
                  label: event.target.value as Label,
                })
              }
              required
            >
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
              <option value={Label.other}>Other</option>
            </select>
          </div>

          <div>
            <button type="submit">Create Note</button>
          </div>
        </form>

        <div className="favorites">
          <h2>List of Favorites:</h2>
          <ul>
            {favorites.map((favId) => {
              const favoriteNote = notes.find((note) => note.id === favId);
              return <li key={favId}>{favoriteNote?.title}</li>;
            })}
          </ul>
        </div>
      </div>

      <div className="note-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <button onClick={() => favoriteClicker(note.id)}>
                {favorites.includes(note.id) ? <IoHeart style={{color: "red"}}/> : <IoMdHeartEmpty/>}
              </button>
              <button>x</button>
            </div>
            <h2> {note.title} </h2>
            <p> {note.content} </p>
            <p> {note.label} </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
