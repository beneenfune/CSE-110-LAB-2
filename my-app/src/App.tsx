import React from 'react';
import logo from './logo.svg';
import { Label, Note } from "./types"
import { dummyNotesList } from './constants';
import './App.css';
import { useState } from 'react';

function App() {
  const [notes, setNotes] = useState(dummyNotesList);
  const initialNote = {
    id: -1,
    title: "",
    content:"",
    label: Label.other,
  }
  const [createNote, setCreateNote] = useState(initialNote);

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

  return (
    <div className="app-container">
      <form className="note-form" onSubmit={createNoteHandler}>
        <div>
          <input 
            placeholder="Note Title"
            onChange={(event) =>
              setCreateNote({...createNote, title: event.target.value})}
              required>
          </input>
        </div>

        <div>
          <textarea
            onChange={(event)=>
              setCreateNote({...createNote, content: event.target.value})}
            required>
          </textarea>
        </div>

        <div>
          <select onChange={(event) =>
            setCreateNote({...createNote, label: event.target.value as Label })} 
            required>
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
              <option value={Label.other}>Other</option>
          </select>
        </div>

        <div>
          <button
           type="submit">Create Note</button>
        </div>
      </form>

      <div className="note-grid">
        {notes.map((note) => (
          <div
            key={note.id}
            className='note-item'>
            <div className='notes-header'>
              <button>x</button>
            </div>
            <h2> { note.title } </h2>
            <p> { note.content } </p>
            <p> { note.label } </p>
            </div>
        ))}
      </div>
    </div>
  );
}

export default App;
