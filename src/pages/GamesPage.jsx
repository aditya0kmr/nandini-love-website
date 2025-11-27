// Games Page Component
import { useState } from 'react';
import './GamesPage.css';

function GamesPage() {
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      id: 1,
      title: 'Memory Hearts',
      icon: '🎴',
      description: 'Match pairs of heart cards. Test your memory!'
    },
    {
      id: 2,
      title: 'How Well You Know Me',
      icon: '🧠',
      description: 'Answer questions about us and see how well you know me!'
    },
    {
      id: 3,
      title: 'Truth or Flirty Dare',
      icon: '🎲',
      description: 'Spin and get truth or dare challenges made for us.'
    },
    {
      id: 4,
      title: 'Guess the Emoji Story',
      icon: '😄',
      description: 'Decode our love story through emojis. Can you guess it?'
    },
    {
      id: 5,
      title: 'Photo Puzzle',
      icon: '🧩',
      description: 'Solve puzzles made from our favorite photos.'
    },
    {
      id: 6,
      title: 'This or That',
      icon: '⚖️',
      description: 'Choose between two options and discuss our answers!'
    },
    {
      id: 7,
      title: 'Love Timer Challenge',
      icon: '⏱️',
      description: 'Complete romantic challenges before time runs out!'
    },
    {
      id: 8,
      title: 'Love Fortune Wheel',
      icon: '🎡',
      description: 'Spin the wheel for romantic predictions and surprises!'
    }
  ];

  const handlePlayGame = (gameId) => {
    setSelectedGame(gameId);
    console.log(`Playing game: ${gameId}`);
    // Game logic will be implemented in individual components
  };

  return (
    <div className="page games-page">
      <h1>Play Games</h1>
      <p className="page-subtitle">Choose a game to play together!</p>
      
      <div className="games-grid">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <div className="game-icon">{game.icon}</div>
            <h3 className="game-title">{game.title}</h3>
            <p className="game-description">{game.description}</p>
            <button 
              className="play-btn" 
              onClick={() => handlePlayGame(game.id)}
            >
              Play
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamesPage;
