import React, { useState, useEffect } from 'react';
import './HerCornerPage.css';

const CATEGORIES = ['Feelings', 'Memories', 'Dreams', 'Gratitude', 'Love Notes'];

function HerCornerPage() {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Feelings');
  const [status, setStatus] = useState('');
  const [entries, setEntries] = useState([]);
  const saveTimer = React.useRef();

  // Load entries from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('herCornerEntries');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.log('Error loading entries');
      }
    }
  }, []);

  // Format date for display
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    clearTimeout(saveTimer.current);
    setStatus('Saving...');

    saveTimer.current = setTimeout(() => {
      const newEntry = {
        id: Date.now(),
        content: newText,
        category: category,
        timestamp: Date.now()
      };

      const updatedEntries = [newEntry, ...entries.filter(e => e.content.trim() !== '')];
      localStorage.setItem('herCornerEntries', JSON.stringify(updatedEntries));
      setEntries(updatedEntries);
      setStatus('✓ Saved in your private corner');
      setTimeout(() => setStatus(''), 2500);
    }, 800);
  };

  const deleteEntry = (id) => {
    const updatedEntries = entries.filter(e => e.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem('herCornerEntries', JSON.stringify(updatedEntries));
  };

  const getCategoryColor = (cat) => {
    const colors = {
      'Feelings': '#ff6b9d',
      'Memories': '#c4456d',
      'Dreams': '#9b4d7d',
      'Gratitude': '#ffa500',
      'Love Notes': '#ff1493'
    };
    return colors[cat] || '#ff6b9d';
  };

  return (
    <div className="page her-corner-page">
      <h1>💌 Her Corner</h1>
      <p>A private space for your thoughts and feelings…</p>

      <div className="corner-container">
        <div className="note-card glass-card">
          <div className="category-selector">
            <label>Category:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="category-select">
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <textarea
            value={text}
            onChange={handleChange}
            placeholder="Write anything you feel...\nYour words are private and safe here 💕"
            className="corner-textarea"
          />
          <div className="char-count">Characters: {text.length}</div>
          <div className="corner-status">{status}</div>
        </div>

        {entries.length > 0 && (
          <div className="entries-list">
            <h3>Your Entries ({entries.length})</h3>
            {entries.map(entry => (
              <div key={entry.id} className="entry-item glass-card">
                <div className="entry-header">
                  <span className="entry-category" style={{backgroundColor: getCategoryColor(entry.category)}}>
                    {entry.category}
                  </span>
                  <span className="entry-date">{formatDate(entry.timestamp)}</span>
                  <button className="delete-btn" onClick={() => deleteEntry(entry.id)}>✕</button>
                </div>
                <p className="entry-content">{entry.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HerCornerPage;
