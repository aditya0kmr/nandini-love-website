import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useCompliments } from "../context/ComplimentContext";

interface Note {
  id: string;
  text: string;
  timestamp: number;
  type: "dream" | "note" | "promise";
}

export function HerCorner() {
  const [notes, setNotes] = useLocalStorage<Note[]>("her-corner-notes", []);
  const [input, setInput] = useState("");
  const [type, setType] = useState<"dream" | "note" | "promise">("note");
  const { triggerCompliment } = useCompliments();

  const addNote = () => {
    if (!input.trim()) return;
    const newNote: Note = {
      id: Date.now().toString(),
      text: input,
      timestamp: Date.now(),
      type,
    };
    setNotes([newNote, ...notes]);
    setInput("");
    triggerCompliment();
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTypeIcon = (t: string) => {
    switch (t) {
      case "dream":
        return "💫";
      case "promise":
        return "👏";
      default:
        return "📝";
    }
  };

  return (
    <div className="her-corner-page">
      <h1 className="page-title">💊 Her Corner</h1>
      <p className="page-subtitle">A special place for her dreams, notes & promises</p>

      <div className="corner-container">
        <div className="note-input-section">
          <label htmlFor="note-type" aria-label="Select note type">
            Type:
          </label>
          <select
            id="note-type"
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="type-select"
          >
            <option value="note">📝 Note</option>
            <option value="dream">💫 Dream</option>
            <option value="promise">👏 Promise</option>
          </select>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write something for her..."
            className="note-textarea"
            aria-label="Write a note for her"
          />
          <button onClick={addNote} className="add-button">
            🔗 Save to Her Corner
          </button>
        </div>

        <div className="notes-list" role="region" aria-label="Saved notes">
          {notes.length === 0 ? (
            <p className="empty-message">No notes yet. Start writing! ❤️</p>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="note-card">
                <div className="note-header">
                  <span className="note-type-icon">{getTypeIcon(note.type)}</span>
                  <time className="note-time">{formatDate(note.timestamp)}</time>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="delete-btn"
                    aria-label="Delete note"
                  >
                    ×
                  </button>
                </div>
                <p className="note-text">{note.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default HerCorner;
