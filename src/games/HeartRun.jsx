import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import '../styles/games.css';

const HeartRun = ({ onClose }) => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('playing'); // 'playing' | 'gameOver'
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const gameDataRef = useRef({
    playerX: 0,
    playerY: 0,
    playerWidth: 40,
    playerHeight: 50,
    playerVelocity: 0,
    playerLane: 1,
    gameSpeed: 5,
    frameCount: 0,
    obstacles: [],
    collectibles: [],
    particles: [],
  });

  // Load high score
  useEffect(() => {
    const savedScore = localStorage.getItem('heartRunHighScore') || 0;
    setHighScore(parseInt(savedScore));
  }, []);

  // Main game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const gameData = gameDataRef.current;
    const lanes = [canvas.width / 4, (3 * canvas.width) / 4];

    // Initialize player position
    gameData.playerX = lanes[1] - gameData.playerWidth / 2;
    gameData.playerY = canvas.height - 100;

    // Keyboard controls
    const keys = {};
    const handleKeyDown = (e) => {
      keys[e.key] = true;
      if (e.key === ' ') e.preventDefault();
    };
    const handleKeyUp = (e) => {
      keys[e.key] = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Touch controls
    const handleTouchStart = (e) => {
      const touchX = e.touches[0].clientX;
      const rect = canvas.getBoundingClientRect();
      if (touchX < rect.left + rect.width / 3) {
        gameData.playerLane = 0;
      } else if (touchX > rect.left + (2 * rect.width) / 3) {
        gameData.playerLane = 1;
      }
    };
    canvas.addEventListener('touchstart', handleTouchStart);

    // Animation loop
    let animationId;
    const gameLoop = () => {
      if (gameState !== 'playing') {
        cancelAnimationFrame(animationId);
        return;
      }

      // Clear canvas with gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1a0033');
      gradient.addColorStop(1, '#330066');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw parallax background (clouds)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      for (let i = 0; i < 3; i++) {
        const cloudY = ((gameData.frameCount * 0.5 + i * 100) % canvas.height);
        ctx.beginPath();
        ctx.arc(100 + i * 150, cloudY, 30, 0, Math.PI * 2);
        ctx.fill();
      }

      // Handle keyboard controls
      if (keys['ArrowLeft'] || keys['a']) gameData.playerLane = 0;
      if (keys['ArrowRight'] || keys['d']) gameData.playerLane = 1;
      if (keys[' ']) gameData.playerVelocity = -12; // Jump

      // Update player position
      gameData.playerVelocity += 0.5; // Gravity
      gameData.playerY += gameData.playerVelocity;
      gameData.playerX = lanes[gameData.playerLane] - gameData.playerWidth / 2;

      // Collision with ground
      if (gameData.playerY + gameData.playerHeight >= canvas.height - 20) {
        gameData.playerY = canvas.height - gameData.playerHeight - 20;
        gameData.playerVelocity = 0;
      }

      // Draw player (Nannini character)
      drawNannini(ctx, gameData.playerX, gameData.playerY, gameData.playerWidth, gameData.playerHeight);

      // Spawn obstacles
      if (gameData.frameCount % 80 === 0) {
        const lane = Math.random() > 0.5 ? 0 : 1;
        gameData.obstacles.push({
          x: lanes[lane] - 20,
          y: 0,
          width: 40,
          height: 40,
          type: 'broken-heart',
        });
      }

      // Spawn collectibles
      if (gameData.frameCount % 120 === 0) {
        const lane = Math.random() > 0.5 ? 0 : 1;
        gameData.collectibles.push({
          x: lanes[lane] - 15,
          y: 0,
          width: 30,
          height: 30,
          type: Math.random() > 0.8 ? 'gold-heart' : 'red-heart',
        });
      }

      // Update and draw obstacles
      gameData.obstacles = gameData.obstacles.filter((obs) => obs.y < canvas.height);
      gameData.obstacles.forEach((obs) => {
        obs.y += gameData.gameSpeed;
        if (obs.type === 'broken-heart') {
          ctx.fillStyle = '#FF6B9D';
          ctx.globalAlpha = 0.5;
          ctx.beginPath();
          ctx.arc(obs.x, obs.y, 15, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Collision detection
        if (
          gameData.playerX < obs.x + obs.width &&
          gameData.playerX + gameData.playerWidth > obs.x &&
          gameData.playerY < obs.y + obs.height &&
          gameData.playerY + gameData.playerHeight > obs.y
        ) {
          setGameState('gameOver');
        }
      });

      // Update and draw collectibles
      gameData.collectibles = gameData.collectibles.filter((col) => col.y < canvas.height);
      gameData.collectibles.forEach((col, idx) => {
        col.y += gameData.gameSpeed;
        ctx.fillStyle = col.type === 'gold-heart' ? '#FFD700' : '#FF1744';
        ctx.beginPath();
        ctx.arc(col.x, col.y, 15, 0, Math.PI * 2);
        ctx.fill();

        // Collision detection
        if (
          gameData.playerX < col.x + col.width &&
          gameData.playerX + gameData.playerWidth > col.x &&
          gameData.playerY < col.y + col.height &&
          gameData.playerY + gameData.playerHeight > col.y
        ) {
          const points = col.type === 'gold-heart' ? 100 : 10;
          setScore((prev) => prev + points);
          setHearts((prev) => prev + 1);
          gameData.collectibles.splice(idx, 1);

          // Particle effect
          for (let i = 0; i < 10; i++) {
            gameData.particles.push({
              x: col.x,
              y: col.y,
              vx: (Math.random() - 0.5) * 8,
              vy: (Math.random() - 0.5) * 8,
              life: 30,
            });
          }
        }
      });

      // Update particles
      gameData.particles = gameData.particles.filter((p) => p.life > 0);
      gameData.particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // Gravity
        p.life--;
        ctx.fillStyle = `rgba(255, 24, 68, ${p.life / 30})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw stats
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 20px Arial';
      ctx.fillText(`Score: ${score}`, 20, 40);
      ctx.fillText(`Hearts: ${hearts}`, 20, 70);
      ctx.fillText(`Speed: ${Math.floor(gameData.gameSpeed)}`', 20, 100);

      // Increase difficulty
      gameData.gameSpeed += 0.001;
      gameData.frameCount++;
      animationId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
    };
  }, [gameState, score, hearts]);

  // Draw Nannini character
  const drawNannini = (ctx, x, y, width, height) => {
    // Body (dress)
    ctx.fillStyle = '#FF69B4';
    ctx.fillRect(x + 10, y + 20, 20, 20);

    // Head
    ctx.fillStyle = '#FFDBAC';
    ctx.beginPath();
    ctx.arc(x + 20, y + 10, 8, 0, Math.PI * 2);
    ctx.fill();

    // Hair
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x + 15, y, 10, 10);

    // Heart ponytail
    ctx.fillStyle = '#FF1744';
    ctx.beginPath();
    ctx.arc(x + 25, y + 8, 5, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <div className="game-container" style={{ position: 'relative', width: '100%', height: '100vh', background: 'linear-gradient(135deg, #1a0033, #330066)' }}>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight - 100}
        style={{
          display: 'block',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, #1a0033, #330066)',
        }}
      />
      {gameState === 'gameOver' && (
        <div className="game-over-panel" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          color: '#FFFFFF',
          zIndex: 1000,
        }}>
          <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#FF69B4' }}>Game Over</h2>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>Final Score: {score}</p>
          <p style={{ fontSize: '16px', marginBottom: '20px' }}>Hearts Collected: {hearts}</p>
          <p style={{ fontSize: '14px', marginBottom: '30px', fontStyle: 'italic' }}>
            "Nannini, you ran so far! Our love journey is unstoppable! 💕" — Aadi ❤️
          </p>
          {score > highScore && (
            <p style={{ fontSize: '16px', color: '#FFD700', marginBottom: '20px', fontWeight: 'bold' }}>
              🎉 New High Score! 🎉
            </p>
          )}
          <button
            onClick={() => {
              if (score > highScore) {
                setHighScore(score);
                localStorage.setItem('heartRunHighScore', score);
              }
              window.location.reload();
            }}
            style={{
              padding: '12px 30px',
              fontSize: '16px',
              background: 'linear-gradient(135deg, #FF69B4, #FF1744)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'transform 0.2s',
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default HeartRun;
