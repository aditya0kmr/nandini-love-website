// Nandini's Special Games Page - Games 9-13
import { useState, useEffect } from 'react';
import './NandinisGamesPage.css';

// ==================== GAME 9: NANDINI'S TEMPLE RUN ====================
const TempleRunNandini = ({ onClose, onScore }) => {
  const [position, setPosition] = useState(150);
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(true);
  const [obstacles, setObstacles] = useState([{ id: 1, x: 500 }]);

  useEffect(() => {
    if (!gameRunning) return;
    const moveInterval = setInterval(() => {
      setObstacles(prev => {
        const updated = prev.map(o => ({ ...o, x: o.x - 15 }));
        return updated.filter(o => o.x > -50).length > 0 
          ? updated.filter(o => o.x > -50) 
          : [{ id: Math.random(), x: 500 }];
      });
      setScore(s => s + 5);
      onScore(5);
    }, 100);
    return () => clearInterval(moveInterval);
  }, [gameRunning, onScore]);

  const handleJump = () => {
    if (position === 150) {
      setPosition(80);
      setTimeout(() => setPosition(150), 300);
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>Run Nandini, Run!</h2>
        <p>Score: {score}</p>
      </div>
      <div className="temple-run-area" onClick={handleJump}>
        <div className="nandini-runner" style={{ bottom: position }}>
          🏃‍♀️ Nandini
        </div>
        {obstacles.map(obs => (
          <div 
            key={obs.id} 
            className="obstacle" 
            style={{ right: obs.x }}
          >
            💔 Obstacle
          </div>
        ))}
      </div>
      <p className="instruction">Click to Jump!</p>
      <button className="back-btn" onClick={onClose}>Back</button>
    </div>
  );
};

// ==================== GAME 10: NANDINI'S SUBWAY SURFERS ====================
const SubwaySurfersNandini = ({ onClose, onScore }) => {
  const [position, setPosition] = useState(50);
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(true);

  useEffect(() => {
    if (!gameRunning) return;
    const interval = setInterval(() => {
      setScore(s => {
        const newScore = s + 10;
        onScore(10);
        return newScore;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [gameRunning, onScore]);

  const handleMove = (direction) => {
    setPosition(p => {
      if (direction === 'left' && p > 20) return p - 30;
      if (direction === 'right' && p < 80) return p + 30;
      return p;
    });
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>Nandini Surfs the City!</h2>
        <p>Score: {score}</p>
      </div>
      <div className="subway-area">
        <div className="nandini-surfer" style={{ left: position + '%' }}>
          Nandini Surfing
        </div>
      </div>
      <div className="controls">
        <button className="move-btn" onClick={() => handleMove('left')}>LEFT</button>
        <button className="move-btn" onClick={() => handleMove('right')}>RIGHT</button>
      </div>
      <button className="back-btn" onClick={onClose}>Back</button>
    </div>
  );
};

// ==================== GAME 11: NANDINI'S CANDY CRUSH ====================
const CandyCrushNandini = ({ onClose, onScore }) => {
  const [grid, setGrid] = useState(Array(16).fill(0).map(() => Math.floor(Math.random() * 5)));
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [moves, setMoves] = useState(0);

  const candies = ['🍭', '🍫', '🍬', '🍡', '🧁'];

  const handleCellClick = (index) => {
    if (selected === null) {
      setSelected(index);
    } else {
      const newMoves = moves + 1;
      setMoves(newMoves);
      
      if (grid[selected] === grid[index]) {
        const newScore = score + 50;
        setScore(newScore);
        onScore(50);
        setSelected(null);
        setGrid(Array(16).fill(0).map(() => Math.floor(Math.random() * 5)));
      } else {
        setSelected(null);
      }
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>Nandini's Sweet Crush</h2>
        <p>Score: {score} | Moves: {moves}</p>
      </div>
      <div className="candy-grid">
        {grid.map((cell, i) => (
          <div 
            key={i} 
            className={`candy ${selected === i ? 'selected' : ''}`}
            onClick={() => handleCellClick(i)}
          >
            {candies[cell]}
          </div>
        ))}
      </div>
      <button className="back-btn" onClick={onClose}>Back</button>
    </div>
  );
};

// ==================== GAME 12: TALKING NANDINI ====================
const TalkingNandini = ({ onClose, onScore }) => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('Hi Love! Tell me something nice...');
  const [score, setScore] = useState(0);
  const [chatHistory, setChatHistory] = useState([]);

  const responses = [
    'I love you so much!',
    'You make me smile every day!',
    'Forever with you, my love!',
    'You are my happiness!',
    'I miss you already!',
    'Lets be together forever!',
    'You are my everything!',
    'My heart belongs to you!',
    'You are the best!',
    'I adore you more than anything!'
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newResponse = responses[Math.floor(Math.random() * responses.length)];
      const newScore = score + 25;
      setScore(newScore);
      onScore(25);
      
      setChatHistory([...chatHistory, { user: message, nandini: newResponse }]);
      setResponse(newResponse);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>Chat with Nandini</h2>
        <p>Score: {score}</p>
      </div>
      <div className="chat-container">
        <div className="chat-messages">
          <div className="message nandini-message">Nandini: {response}</div>
          {chatHistory.map((msg, idx) => (
            <div key={idx}>
              <div className="message user-message">You: {msg.user}</div>
              <div className="message nandini-message">Nandini: {msg.nandini}</div>
            </div>
          ))}
        </div>
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button className="send-btn" onClick={handleSendMessage}>Send</button>
      </div>
      <button className="back-btn" onClick={onClose}>Back</button>
    </div>
  );
};

// ==================== GAME 13: BARBIE NANDINI MAKEOVER ====================
const BarbieNandiniMakeover = ({ onClose, onScore }) => {
  const [outfit, setOutfit] = useState({ dress: 'pink', shoes: 'heels', hair: 'long' });
  const [score, setScore] = useState(0);
  const [customizations, setCustomizations] = useState(0);

  const dresses = ['Pink', 'Red', 'Blue', 'Purple', 'Gold', 'White', 'Black'];
  const shoesList = ['Heels', 'Flats', 'Boots', 'Sneakers', 'Sandals', 'Pumps'];
  const hairstyles = ['Long', 'Short', 'Curly', 'Wavy', 'Braided', 'Bob'];

  const changeDress = (dress) => {
    setOutfit({ ...outfit, dress });
    const newScore = score + 20;
    setScore(newScore);
    setCustomizations(customizations + 1);
    onScore(20);
  };

  const changeShoes = (shoes) => {
    setOutfit({ ...outfit, shoes });
    const newScore = score + 20;
    setScore(newScore);
    setCustomizations(customizations + 1);
    onScore(20);
  };

  const changeHair = (hair) => {
    setOutfit({ ...outfit, hair });
    const newScore = score + 20;
    setScore(newScore);
    setCustomizations(customizations + 1);
    onScore(20);
  };

  const resetOutfit = () => {
    setOutfit({ dress: 'pink', shoes: 'heels', hair: 'long' });
    const newScore = score + 50;
    setScore(newScore);
    onScore(50);
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>Dress Up Nandini!</h2>
        <p>Score: {score} | Customizations: {customizations}</p>
      </div>
      <div className="makeover-container">
        <div className="nandini-display">
          👰 Nandini in {outfit.dress} Dress, {outfit.shoes}, {outfit.hair} Hair!
        </div>
        <div className="options-section">
          <div className="option-group">
            <label>Choose Dress:</label>
            <div className="options-buttons">
              {dresses.map(d => (
                <button 
                  key={d} 
                  onClick={() => changeDress(d.toLowerCase())} 
                  className={outfit.dress === d.toLowerCase() ? 'active' : ''}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div className="option-group">
            <label>Choose Shoes:</label>
            <div className="options-buttons">
              {shoesList.map(s => (
                <button 
                  key={s} 
                  onClick={() => changeShoes(s.toLowerCase())} 
                  className={outfit.shoes === s.toLowerCase() ? 'active' : ''}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="option-group">
            <label>Choose Hairstyle:</label>
            <div className="options-buttons">
              {hairstyles.map(h => (
                <button 
                  key={h} 
                  onClick={() => changeHair(h.toLowerCase())} 
                  className={outfit.hair === h.toLowerCase() ? 'active' : ''}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button className="reset-btn" onClick={resetOutfit}>Reset Outfit</button>
      </div>
      <button className="back-btn" onClick={onClose}>Back</button>
    </div>
  );
};

// ==================== MAIN NANDINI'S GAMES PAGE ====================
function NandinisGamesPage() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [score, setScore] = useState(0);
  const [gameScores, setGameScores] = useState(() => {
    const saved = localStorage.getItem('nandini-special-games-scores');
    return saved ? JSON.parse(saved) : {};
  });

  const games = [
    { id: 9, title: 'Nandini Temple Run', icon: 'RUN', description: 'Run with Nandini avoiding obstacles!', component: TempleRunNandini },
    { id: 10, title: 'Nandini Subway Surfers', icon: 'SURF', description: 'Surf the city as Nandini!', component: SubwaySurfersNandini },
    { id: 11, title: 'Nandini Candy Crush', icon: 'CANDY', description: 'Match candies with Nandini!', component: CandyCrushNandini },
    { id: 12, title: 'Talking Nandini', icon: 'CHAT', description: 'Chat with Nandini!', component: TalkingNandini },
    { id: 13, title: 'Nandini Makeover', icon: 'BEAUTY', description: 'Dress up Nandini beautifully!', component: BarbieNandiniMakeover }
  ];

  const handleGameScore = (points) => {
    const newScore = score + points;
    setScore(newScore);
    setGameScores({ ...gameScores, [selectedGame]: newScore });
    localStorage.setItem('nandini-special-games-scores', JSON.stringify({ ...gameScores, [selectedGame]: newScore }));
  };

  if (selectedGame) {
    const game = games.find(g => g.id === selectedGame);
    const Component = game.component;
    return <Component onClose={() => setSelectedGame(null)} onScore={handleGameScore} />;
  }

  return (
    <div className="page nandini-games-page">
      <h1>Nandini's Special Games</h1>
      <p className="page-subtitle">Play 5 exclusive special games with Nandini!</p>
      <div className="games-grid">
        {games.map((game) => (
          <div key={game.id} className="game-card" onClick={() => setSelectedGame(game.id)}>
            <div className="game-icon">{game.icon}</div>
            <h3 className="game-title">{game.title}</h3>
            <p className="game-description">{game.description}</p>
            {gameScores[game.id] && <p className="game-score">Best: {gameScores[game.id]}</p>}
            <button className="play-btn">PLAY</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NandinisGamesPage;
