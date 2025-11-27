import { useState, useEffect } from 'react';
import './MemoryHearts.css';

const MemoryHearts = ({ onClose }) => {
  const heartPairs = [
    { id: 1, emoji: '❤️', label: 'Love' },
    { id: 2, emoji: '💕', label: 'Hearts' },
    { id: 3, emoji: '💖', label: 'Crush' },
    { id: 4, emoji: '💗', label: 'Growing' },
    { id: 5, emoji: '💝', label: 'Gift' },
    { id: 6, emoji: '💓', label: 'Heartbeat' }
  ];

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (matched.length === heartPairs.length * 2) {
      setGameWon(true);
    }
  }, [matched]);

  const initializeGame = () => {
    const deck = [...heartPairs, ...heartPairs].sort(() => Math.random() - 0.5);
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  const toggleCard = (index) => {
    if (flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      if (cards[newFlipped[0]].id === cards[newFlipped[1]].id) {
        setMatched([...matched, ...newFlipped]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>Memory Hearts</h2>
        <p>Moves: {moves}</p>
        {gameWon && <p className="win-message">You Won!</p>}
      </div>

      <div className="memory-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`memory-card ${flipped.includes(index) || matched.includes(index) ? 'flipped' : ''}`}
            onClick={() => toggleCard(index)}
          >
            <div className="card-inner">
              <div className="card-front">?</div>
              <div className="card-back">{card.emoji}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="game-controls">
        <button onClick={initializeGame} className="btn-restart">Restart</button>
        <button onClick={onClose} className="btn-close">Exit Game</button>
      </div>
    </div>
  );
};

export default MemoryHearts;
