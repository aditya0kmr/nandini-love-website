import React, { useState, useEffect } from 'react';
import './GamesPage.css';
const GamesPage = () => {
  const [currentGame, setCurrentGame] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  // Quiz Game Logic
  const quizQuestions = [
    {
      question: "What's our favorite song?",
      options: ["Hearts Intertwined", "Forever With You", "Love Never Fades", "You Are My Universe"],
      correct: 2
    },
    {
      question: "When did we first meet?",
      options: ["Summer 2021", "Spring 2022", "Fall 2021", "Winter 2022"],
      correct: 1
    },
    {
      question: "What's our favorite place?",
      options: ["Beach", "Mountains", "City", "Stars"],
      correct: 3
    },
    {
      question: "What means the most to us?",
      options: ["Money", "Love", "Power", "Fame"],
      correct: 1
    }
  ];

  // Memory Game Cards
  const cardEmojis = ['💕', '💕', '🌹', '🌹', '💑', '💑', '❤️', '❤️', '💍', '💍', '🌟', '🌟'];

  useEffect(() => {
    if (currentGame === 'memory') {
      initializeMemoryGame();
    }
  }, [currentGame]);

  const initializeMemoryGame = () => {
    const shuffled = [...cardEmojis].sort(() => Math.random() - 0.5);
    setMemoryCards(shuffled);
    setFlippedCards([]);
    setMatchedCards([]);
  };

  const handleCardFlip = (index) => {
    if (flippedCards.includes(index) || matchedCards.includes(index)) return;

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setTimeout(() => {
        if (memoryCards[newFlipped[0]] === memoryCards[newFlipped[1]]) {
          setMatchedCards([...matchedCards, newFlipped[0], newFlipped[1]]);
          setFlippedCards([]);
        } else {
          setFlippedCards([]);
        }
      }, 500);
    }
  };

  const handleQuizAnswer = (optionIndex) => {
    // This would be expanded in a full implementation
    if (optionIndex === quizQuestions[0].correct) {
      setQuizScore(quizScore + 1);
    }
  };

  return (
    <div className="games-page">
      <div className="games-container">
        {!currentGame ? (
          <div className="games-menu">
            <h1 className="games-title">🎮 Play Games with Nandini</h1>
            <p className="games-subtitle">Choose a game to play together!</p>
            
            <div className="games-grid">
              <div className="game-card glass-card" onClick={() => setCurrentGame('memory')}>
                <div className="game-emoji">💕💕</div>
                <h2 className="game-name">Memory Hearts</h2>
                <p className="game-description">Match pairs of heart cards with Nandini!</p>
                <button className="play-btn">PLAY</button>
              </div>

              <div className="game-card glass-card" onClick={() => setCurrentGame('quiz')}>
                <div className="game-emoji">🎯💝</div>
                <h2 className="game-name">How Well You Know Nandini</h2>
                <p className="game-description">Answer questions about our love!</p>
                <button className="play-btn">PLAY</button>
              </div>
            </div>
          </div>
        ) : currentGame === 'memory' ? (
          <div className="game-view">
            <button className="back-btn" onClick={() => setCurrentGame(null)}>← Back to Games</button>
            <h2>Memory Hearts - Match all pairs!</h2>
            <div className="memory-grid">
              {memoryCards.map((emoji, index) => (
                <div
                  key={index}
                  className={`memory-card ${
                    flippedCards.includes(index) || matchedCards.includes(index)
                      ? 'flipped'
                      : ''
                  }`}
                  onClick={() => handleCardFlip(index)}
                >
                  {(flippedCards.includes(index) || matchedCards.includes(index)) && emoji}
                </div>
              ))}
            </div>
            {matchedCards.length === cardEmojis.length && (
              <div className="game-won">🎉 You Won! 🎉</div>
            )}
          </div>
        ) : currentGame === 'quiz' ? (
          <div className="game-view">
            <button className="back-btn" onClick={() => setCurrentGame(null)}>← Back to Games</button>
            <h2>Quiz: How Well Do You Know Nandini?</h2>
            <div className="quiz-container">
              <div className="quiz-question">
                <h3>{quizQuestions[0].question}</h3>
                <div className="quiz-options">
                  {quizQuestions[0].options.map((option, index) => (
                    <button
                      key={index}
                      className="quiz-option"
                      onClick={() => handleQuizAnswer(index)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="quiz-score">Score: {quizScore}</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GamesPage;
