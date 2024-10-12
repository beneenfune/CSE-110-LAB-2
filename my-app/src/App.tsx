import React from 'react';
import { Label, Note } from "./types"
import { dummyNotesList } from './constants';
import './App.css';
import { useState, useEffect } from 'react';
import { IoHeart } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { ThemeContext, themes } from "./context/ThemeContext";


function App() {
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const [notes, setNotes] = useState(dummyNotesList);
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  function createNoteHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newNote = {
      id: notes.length + 1,
      title: createNote.title,
      content: createNote.content,
      label: createNote.label,
    };
    setNotes([...notes, newNote]);
    setCreateNote(initialNote);
  }

  const favoriteClicker = (noteId: number) => {
    if (favorites.includes(noteId)) {
      setFavorites(favorites.filter((id) => id !== noteId));
    } else {
      setFavorites([...favorites, noteId]);
    }
  };

  const deleteClicker = (noteId: number) => {
    setNotes(notes.filter(note => note.id !== noteId));
  }

  useEffect(() => {
    console.log("The favorites list is:", favorites);
      document.body.style.backgroundColor = currentTheme.mainbackgroundcolor;
  }, [favorites, currentTheme]);

  const noteEditor = (field: keyof Note, value: string) => {
    if (selectedNote) {
      const updatedNote = { ...selectedNote, [field]: value };
      setSelectedNote(updatedNote);

      setNotes(
        notes.map((note) =>
          note.id === selectedNote.id ? updatedNote : note
        )
      );
    }
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div
        className="app-container"
        style={{
          background: currentTheme.mainbackgroundcolor,
          color: currentTheme.mainfontcolor,
        }}
      >
        <div className="sidebar">
          <form className="note-form" onSubmit={createNoteHandler}>
            <div>
              <input
                placeholder="Note Title"
                onChange={(event) =>
                  setCreateNote({ ...createNote, title: event.target.value })
                }
                style={{
                  color: currentTheme.mainfontcolor,
                  backgroundColor: currentTheme.inputbackgroundcolor,
                }}
                required
              ></input>
            </div>

            <div>
              <textarea
                placeholder="Note Content"
                onChange={(event) =>
                  setCreateNote({ ...createNote, content: event.target.value })
                }
                style={{
                  color: currentTheme.mainfontcolor,
                  backgroundColor: currentTheme.inputbackgroundcolor,
                }}
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
                style={{
                  color: currentTheme.mainfontcolor,
                  backgroundColor: currentTheme.inputbackgroundcolor,
                }}
                required
              >
                <option value={Label.personal}>Personal</option>
                <option value={Label.study}>Study</option>
                <option value={Label.work}>Work</option>
                <option value={Label.other}>Other</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                style={{
                  color: currentTheme.mainfontcolor,
                }}
              >
                Create Note
              </button>
            </div>
          </form>

          <button
            onClick={toggleTheme}
            style={{
              backgroundColor: currentTheme.background,
              color: currentTheme.mainfontcolor,
            }}
          >
            Toggle Theme
          </button>

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
            <div
              key={note.id}
              className="note-item"
              style={{
                color: currentTheme.inputfontcolor,
                backgroundColor: currentTheme.inputbackgroundcolor,
              }}
            >
              <div className="notes-header">
                <button onClick={() => favoriteClicker(note.id)}>
                  {favorites.includes(note.id) ? (
                    <IoHeart style={{ color: "red" }} />
                  ) : (
                    <IoMdHeartEmpty />
                  )}
                </button>
                <button onClick={() => deleteClicker(note.id)}>x</button>
              </div>
              <h2
                contentEditable="true"
                onBlur={(e) =>
                  noteEditor("title", e.currentTarget.textContent || "")
                }
                onClick={() => setSelectedNote(note)}
                style={{ color: currentTheme.mainfontcolor }}
              >
                {note.title}
              </h2>
              <p
                contentEditable="true"
                onBlur={(e) =>
                  noteEditor("content", e.currentTarget.textContent || "")
                }
                onClick={() => setSelectedNote(note)}
                style={{ color: currentTheme.mainfontcolor }}
              >
                {note.content}
              </p>
              <p
                contentEditable="true"
                onBlur={(e) =>
                  noteEditor("label", e.currentTarget.textContent || "")
                }
                onClick={() => setSelectedNote(note)}
                style={{ color: currentTheme.mainfontcolor }}
              >
                {note.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
