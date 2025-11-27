import React, { useState, useEffect } from 'react';
import './HerCornerPage.css';

function HerCornerPage() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');
  const saveTimer = React.useRef();

  useEffect(() => {
    const saved = localStorage.getItem('herCorner');
    if (saved) setText(saved);
  }, []);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    
    clearTimeout(saveTimer.current);
    setStatus('Saving...');
    
    saveTimer.current = setTimeout(() => {
      localStorage.setItem('herCorner', newText);
      setStatus('📋 Saved in your private corner');
      setTimeout(() => setStatus(''), 2500);
      if (window.showCompliment) {
        window.showCompliment('📋 Your words are safe with me');
      }
    }, 500);
  };

  return (
    <div className="page her-corner-page">
      <h1>💌 Her Corner</h1>
      <p>A private space for your thoughts and feelings…</p>
      
      <div className="corner-container">
        <div className="note-card glass-card">
          <textarea
            value={text}
            onChange={handleChange}
            placeholder="Write anything you feel...\nYour words are private and safe here 💕"
            className="corner-textarea"
                    <div className="char-count">✍️ {text.length} characters</div>
          />
          <div className="corner-status">{status}</div>
        </div>
      </div>
    </div>
  );
}

export default HerCornerPage;
