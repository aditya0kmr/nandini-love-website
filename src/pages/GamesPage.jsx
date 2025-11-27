// Games Page Component - All 13 Love Games for Nandini
import { useState, useRef, useEffect } from 'react';
import './GamesPage.css';

// ==================== PART 1: MAIN GAMES PAGE ====================
// Particle Burst Component
const ParticleBurst = ({ x, y }) => {
  const particles = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    angle: (360 / 8) * i,
    emoji: ['\u2665', '\ud83d\udc97', '\ud83d\udc9f', '\u2728'][Math.floor(Math.random() * 4)]
  }));

  return (
    <div className="particle-burst" style={{ left: x, top: y }}>
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            '--angle': p.angle,
            '--emoji': `"${p.emoji}"`
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
};

// ==================== MEMORY HEARTS GAME ====================
const MemoryHearts = ({ onClose, onScore }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Initialize game
    const emojis = ['\u2665', '\ud83d\udc97', '\ud83d\udc9f', '\u2728', '\ud83c\udf1f', '\ud83c\udf8c'];
    const gameCards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    setCards(gameCards);
  }, []);

  const handleCardClick = (index) => {
    if (flipped.includes(index) || matched.includes(index) || flipped.length === 2) return;
    
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setMatched([...matched, newFlipped[0], newFlipped[1]]);
        setParticles([...particles, { x: Math.random() * 300, y: Math.random() * 300, id: Date.now() }]);
        onScore(100 - moves * 2);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 600);
      }
      setMoves(moves + 1);
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>\ud83c\udf8c Memory Hearts - Match with Nandini! \ud83c\udf8c</h2>
        <p>Moves: {moves}</p>
      </div>
      <div className="memory-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`memory-card ${flipped.includes(index) || matched.includes(index) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-front">?✨</div>
            <div className="card-back">{card}</div>
          </div>
        ))}
      </div>
      {matched.length === cards.length && (
        <div className="win-message">\ud83c\udf86 Nandini loves this! Perfect match! \ud83c\udf86</div>
      )}
      {particles.map(p => (
        <ParticleBurst key={p.id} x={p.x} y={p.y} />
      ))}
      <button className="back-btn" onClick={onClose}>Back to Games</button>
    </div>
  );
};

// ==================== HOW WELL YOU KNOW ME GAME ====================
const HowWellYouKnowMe = ({ onClose, onScore }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const questions = [
    { q: "What's Nandini's favorite color?", correct: 2, options: ["Blue", "Green", "Pink"] },
    { q: "When is Nandini's birthday?", correct: 0, options: ["Your special date", "January 1", "December 31"] },
    { q: "What makes Nandini smile?", correct: 1, options: ["Movies", "Your love", "Shopping"] },
    { q: "Nandini's favorite emoji?", correct: 0, options: ["\u2665", "\ud83c\udf18", "\ud83d\ude00"] },
    { q: "Best thing about Nandini?", correct: 2, options: ["Hair", "Smile", "Everything!"] }
  ];

  const handleAnswer = (index) => {
    if (answered) return;
    setAnswered(true);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 20);
      onScore(20);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
    } else {
      onClose();
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>\ud83c\udf89 How Well Do You Know Nandini? \ud83c\udf89</h2>
        <p>Score: {score}</p>
      </div>
      <div className="quiz-container">
        <div className="question">{questions[currentQuestion].q}</div>
        <div className="options">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${answered ? (index === questions[currentQuestion].correct ? 'correct' : 'wrong') : ''}`}
              onClick={() => handleAnswer(index)}
              disabled={answered}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {answered && (
        <button className="next-btn" onClick={nextQuestion}>
          {currentQuestion === questions.length - 1 ? 'Done!' : 'Next Question'}
        </button>
      )}
      <button className="back-btn" onClick={onClose}>Back to Games</button>
    </div>
  );
};

// ==================== MAIN GAMES PAGE COMPONENT ====================
function GamesPage() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [score, setScore] = useState(0);
  const [gameScores, setGameScores] = useState(() => {
    const saved = localStorage.getItem('nandini-game-scores');
    return saved ? JSON.parse(saved) : {};
  });

  const games = [
    { id: 1, title: 'Memory Hearts', icon: '\ud83c\udf8c', description: 'Match pairs of heart cards with Nandini!', component: MemoryHearts },
    { id: 2, title: 'How Well You Know Nandini', icon: '\ud83c\udf89', description: 'Answer questions about our love!', component: HowWellYouKnowMe },
    160 or Flirty Dare', icon: '\ud83c\udf1f', description: 'Spin and get romantic challenges!', component: nulTruthOrDare }
    { id: 4, title: 'Guess Nandini\'s Emoji Story', icon: '\ud83d\udc97', description: 'Decode our love story!', component: nulEmojiStory }
    { id: 5, title: 'Nandini\'s Photo Puzzle', icon: '\ud83d\udcf7', description: 'Solve romantic photo puzzles!', component: null },
    { id: 6, title: 'This or That for Nandini', icon: '\u26a1', description: 'Choose between love options!', component: null },
    { id: 7, title: 'Nandini\'s Timer Challenge', icon: '\ud83d\udd5b', description: 'Complete love challenges in time!', component: null },
    { id: 8, title: 'Love Fortune Wheel', icon: '\ud83c\udf89', description: 'Spin romantic surprises!', component: null },
    { id: 9, title: 'Nandini\'s Temple Run', icon: '\ud83c\udf18', description: 'Run with Nandini avoiding obstacles!', component: nulTempleRunNandini }
    { id: 10, title: 'Nandini\'s Subway Surfers', icon: '\ud83d\ude98', description: 'Surf the subway as Nandini!', component: nulSubwaySurfersNandini }
    { id: 11, title: 'Nandini\'s Candy Crush', icon: '\ud83c\udf6c', description: 'Match candies in 3s!', component: nulCandyCrushNandini }
    { id: 12, title: 'Talking Nandini', icon: '\ud83d\udde3', description: 'Chat with Nandini!', component: nulTalkingNandini }
    { id: 13, title: 'Barbie Nandini Makeover', icon: '\ud83d\udc84', description: 'Dress up Nandini beautifully!', component: nuBarbieNandiniMakeover }
  ];

  const handleGameScore = (points) => {
    const newScore = score + points;
    setScore(newScore);
    setGameScores({ ...gameScores, [selectedGame]: newScore });
    localStorage.setItem('nandini-game-scores', JSON.stringify({ ...gameScores, [selectedGame]: newScore }));
  };

  if (selectedGame) {
    const game = games.find(g => g.id === selectedGame);
    if (game?.component) {
      const Component = game.component;
      return <Component onClose={() => setSelectedGame(null)} onScore={handleGameScore} />;
    }
    return (
      <div className="game-container">
        <h2>{game?.title} - Coming Soon!</h2>
        <p>This game is being prepared with \u2665 for Nandini...</p>
        <button className="back-btn" onClick={() => setSelectedGame(null)}>Back to Games</button>
      </div>
    );
  }

  return (
    <div className="page games-page">
      <h1>\ud83c\udf8c Play Games with Nandini \ud83c\udf8c</h1>
      <p className="page-subtitle">Choose a game to play together!</p>
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



// ==================== PART 2: REMAINING 11 GAMES ====================
// Truth or Flirty Dare Game
const TruthOrDare = ({ onClose, onScore }) => {
  const [gameState, setGameState] = useState('spin');
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [score, setScore] = useState(0);

  const challenges = [
    'Kiss Nandinis hand romantically!',
    'Compliment Nandini on 3 things!',
    'Share your favorite memory with Nandini!',
    'Tell Nandini why you love her!',
    'Give Nandini a forehead kiss!',
    'Dance with Nandini!'
  ];

  const spinWheel = () => {
    const challenge = challenges[Math.floor(Math.random() * challenges.length)];
    setCurrentChallenge(challenge);
    setGameState('challenge');
    const newScore = score + 50;
    setScore(newScore);
    onScore(50);
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>Truth or Flirty Dare with Nandini!</h2>
        <p>Score: {score}</p>
      </div>
      {gameState === 'spin' && (
        <div className="spin-container">
          <p>Spin the wheel to get a romantic challenge!</p>
          <button className="spin-btn" onClick={spinWheel}>SPIN WHEEL</button>
        </div>
      )}
      {gameState === 'challenge' && (
        <div className="challenge-container">
          <div className="challenge-text">{currentChallenge}</div>
          <button className="done-btn" onClick={() => setGameState('spin')}>Done! Spin Again</button>
        </div>
      )}
      <button className="back-btn" onClick={onClose}>Back to Games</button>
    </div>
  );
};

// Nandini's Temple Run Game
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
        return updated.filter(o => o.x > -50).length > 0 ? updated.filter(o => o.x > -50) : [{ id: Math.random(), x: 500 }];
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
        <h2>Nandini's Temple Run!</h2>
        <p>Score: {score}</p>
      </div>
      <div className="temple-run-area" onClick={handleJump}>
        <div className="nandini-runner" style={{ bottom: position }}>{score >= 100 ? 'Nandini Running!' : 'Click to Jump!'}</div>
        {obstacles.map(obs => (
          <div key={obs.id} className="obstacle" style={{ right: obs.x }}>Obstacle</div>
        ))}
      </div>
      <button className="back-btn" onClick={onClose}>Back to Games</button>
    </div>
  );
};

// Nandini's Subway Surfers Game
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
        <h2>Nandini's Subway Surfers!</h2>
        <p>Score: {score}</p>
      </div>
      <div className="subway-area">
        <div className="nandini-surfer" style={{ left: position + '%' }}>Nandini Surfing!</div>
      </div>
      <div className="controls">
        <button className="move-btn" onClick={() => handleMove('left')}>LEFT</button>
        <button className="move-btn" onClick={() => handleMove('right')}>RIGHT</button>
      </div>
      <button className="back-btn" onClick={onClose}>Back to Games</button>
    </div>
  );
};

// Nandini's Candy Crush Game
const CandyCrushNandini = ({ onClose, onScore }) => {
  const [grid, setGrid] = useState(Array(16).fill(0).map(() => Math.floor(Math.random() * 5)));
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  const handleCellClick = (index) => {
    if (selected === null) {
      setSelected(index);
    } else {
      const newScore = score + 50;
      setScore(newScore);
      onScore(50);
      setSelected(null);
      setGrid(Array(16).fill(0).map(() => Math.floor(Math.random() * 5)));
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>Nandini's Candy Crush!</h2>
        <p>Score: {score}</p>
      </div>
      <div className="candy-grid">
        {grid.map((cell, i) => (
          <div 
            key={i} 
            className={`candy ${selected === i ? 'selected' : ''}`}
            onClick={() => handleCellClick(i)}
          >
            {['C', 'H', 'E', 'A', 'R'][cell]}
          </div>
        ))}
      </div>
      <button className="back-btn" onClick={onClose}>Back to Games</button>
    </div>
  );
};

// Talking Nandini Game
const TalkingNandini = ({ onClose, onScore }) => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('Hi! I love you so much!');
  const [score, setScore] = useState(0);

  const responses = [
    'I love you so much!',
    'You make me smile every day!',
    'Forever with you, my love!',
    'You are my happiness!',
    'I miss you already!',
    'Let\'s be together forever!'
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newResponse = responses[Math.floor(Math.random() * responses.length)];
      setResponse(newResponse);
      const newScore = score + 25;
      setScore(newScore);
      onScore(25);
      setMessage('');
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>Chat with Nandini!</h2>
        <p>Score: {score}</p>
      </div>
      <div className="chat-container">
        <div className="message nandini-message">Nandini: {response}</div>
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button className="send-btn" onClick={handleSendMessage}>Send</button>
      </div>
      <button className="back-btn" onClick={onClose}>Back to Games</button>
    </div>
  );
};

// Barbie Nandini Makeover Game
const BarbieNandiniMakeover = ({ onClose, onScore }) => {
  const [outfit, setOutfit] = useState({ dress: 'pink', shoes: 'heels', hair: 'long' });
  const [score, setScore] = useState(0);

  const dresses = ['Pink', 'Red', 'Blue', 'Purple', 'Gold'];
  const shoesList = ['Heels', 'Flats', 'Boots', 'Sneakers'];
  const hairstyles = ['Long', 'Short', 'Curly', 'Wavy'];

  const changeDress = (dress) => {
    setOutfit({ ...outfit, dress });
    const newScore = score + 20;
    setScore(newScore);
    onScore(20);
  };

  const changeShoes = (shoes) => {
    setOutfit({ ...outfit, shoes });
    const newScore = score + 20;
    setScore(newScore);
    onScore(20);
  };

  const changeHair = (hair) => {
    setOutfit({ ...outfit, hair });
    const newScore = score + 20;
    setScore(newScore);
    onScore(20);
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>Dress Up Nandini!</h2>
        <p>Score: {score}</p>
      </div>
      <div className="makeover-container">
        <div className="nandini-display">
          Nandini in {outfit.dress} Dress, {outfit.shoes}, {outfit.hair} Hair!
        </div>
        <div className="options-section">
          <div className="option-group">
            <label>Choose Dress:</label>
            {dresses.map(d => (
              <button key={d} onClick={() => changeDress(d)} className={outfit.dress === d.toLowerCase() ? 'active' : ''}>
                {d}
              </button>
            ))}
          </div>
          <div className="option-group">
            <label>Choose Shoes:</label>
            {shoesList.map(s => (
              <button key={s} onClick={() => changeShoes(s)} className={outfit.shoes === s.toLowerCase() ? 'active' : ''}>
                {s}
              </button>
            ))}
          </div>
          <div className="option-group">
            <label>Choose Hairstyle:</label>
            {hairstyles.map(h => (
              <button key={h} onClick={() => changeHair(h)} className={outfit.hair === h.toLowerCase() ? 'active' : ''}>
                {h}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button className="back-btn" onClick={onClose}>Back to Games</button>
    </div>
  );
};
export default GamesPage;
