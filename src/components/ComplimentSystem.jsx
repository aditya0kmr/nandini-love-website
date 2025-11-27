import React, { useState, useEffect } from 'react';

const compliments = [
  '✨ You added a beautiful dream!',
  '💕 Added to your favorites!',
  '📋 Your words are safe with me',
  '🌟 Our love story grows...',
  '💗 Every moment with you matters',
  '🏽 Forever with you feels right'
];

function ComplimentSystem() {
  const [toasts, setToasts] = useState([]);

  const showCompliment = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  useEffect(() => {
    window.showCompliment = showCompliment;
    
    const randomMsg = compliments[Math.floor(Math.random() * compliments.length)];
    showCompliment(randomMsg);
  }, []);

  return (
    <div className="compliment-container">
      {toasts.map(t => (
        <div key={t.id} className="compliment-toast">
          {t.message}
        </div>
      ))}
    </div>
  );
}

export default ComplimentSystem;
