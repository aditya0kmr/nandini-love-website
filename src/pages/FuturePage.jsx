import React, { useState, useEffect } from 'react';
import './FuturePage.css';

function FuturePage() {
  const [dreams, setDreams] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);

  // Load dreams from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('futureDreams');
    if (saved) {
      try {
        setDreams(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading dreams:', e);
      }
    }
  }, []);

  // Save dreams to localStorage
  const saveDreams = (newDreams) => {
    localStorage.setItem('futureDreams', JSON.stringify(newDreams));
    setDreams(newDreams);
  };

  // Add new dream
  const addDream = () => {
    if (!title.trim()) return;
    
    const newDream = {
      id: Date.now(),
      title: title.trim(),
      desc: desc.trim(),
      createdAt: new Date().toISOString()
    };
    
    const updated = [...dreams, newDream];
    saveDreams(updated);
    
    // Show compliment if available
    if (window.showCompliment) {
      window.showCompliment('✨ You added a beautiful dream!');
    }
    
    setTitle('');
    setDesc('');
  };

  // Delete dream
  const removeDream = (id) => {
    const updated = dreams.filter(d => d.id !== id);
    saveDreams(updated);
    if (window.showCompliment) {
      window.showCompliment('🌙 Dream archived with love');
    }
  };

  // Drag handlers
  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === targetIndex) return;

    const newDreams = [...dreams];
    const [draggedDream] = newDreams.splice(draggedItem, 1);
    newDreams.splice(targetIndex, 0, draggedDream);
    
    saveDreams(newDreams);
    setDraggedItem(null);
    
    if (window.showCompliment) {
      window.showCompliment('✨ Dreams reordered!');
    }
  };

  return (
    <div className="page future-page">
      <h1>🌟 Our Future Dreams</h1>
      <p>Plans and dreams ahead - Drag to reorder</p>

      <div className="future-container">
        {/* Add Dream Form */}
        <div className="add-dream-card glass-card">
          <h2>✨ Add a Dream</h2>
          <input
            type="text"
            placeholder="Dream title (e.g., 'Trip to Paris')"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addDream()}
            className="dream-input"
          />
          <textarea
            placeholder="Description of this dream..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="dream-textarea"
          />
          <button onClick={addDream} className="add-dream-btn">
            ✨ Add Dream
          </button>
        </div>

        {/* Dreams Grid */}
        <div className="dreams-grid">
          {dreams.map((dream, index) => (
            <div
              key={dream.id}
              className="dream-card glass-card"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              style={{ opacity: draggedItem === index ? 0.5 : 1 }}
            >
              <h3>{dream.title}</h3>
              {dream.desc && <p>{dream.desc}</p>}
              <small>{new Date(dream.createdAt).toLocaleDateString()}</small>
              <button
                onClick={() => removeDream(dream.id)}
                className="delete-btn"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {dreams.length === 0 && (
          <div className="empty-state">
            <p>🌙 No dreams yet. Add one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FuturePage;
