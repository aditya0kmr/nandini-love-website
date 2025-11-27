import { useEffect, useRef, useCallback, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HeartRun = () => {
  const canvasRef = useRef(null)
  const [gameState, setGameState] = useState({
    gameRunning: false,
    score: 0,
    highScore: 0,
    heartsCollected: 0,
    distance: 0,
    gameOver: false,
    invincible: false,
    speedBoost: false
  })
  const gameLoopRef = useRef()
  const animationIdRef = useRef()

  // Load high score from localStorage
  useEffect(() => {
    const savedScore = localStorage.getItem('heartRunHighScore') || 0
    setGameState(prev => ({ ...prev, highScore: parseInt(savedScore) }))
  }, [])

  // Game canvas setup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth * 0.9
    canvas.height = window.innerHeight * 0.6

    let gameSpeed = 3
    let gameFrame = 0
    let nanniiiY = canvas.height * 0.7
    let nanniiiX = canvas.width * 0.3
    let lane = 1 // 0=left, 1=middle, 2=right
    let obstacles = []
    let collectibles = []
    let particles = []

    // Parallax background layers
    const clouds = [
      { x: 0, y: 100, speed: 0.5, size: 80 },
      { x: 300, y: 150, speed: 0.3, size: 60 },
      { x: 600, y: 80, speed: 0.4, size: 70 }
    ]

    const heartsBackground = [
      { x: 100, y: 200, speed: 1, size: 20 },
      { x: 400, y: 300, speed: 0.8, size: 15 },
      { x: 700, y: 250, speed: 1.2, size: 18 }
    ]

    // Nanniii character (chibi girl)
    const drawNanniii = (x, y, invincible = false) => {
      ctx.save()
      ctx.translate(x, y)
      
      // Body (pink dress)
      ctx.fillStyle = invincible ? '#ff69b4' : '#ff1493'
      ctx.fillRect(-15, 10, 30, 40)
      
      // Head
      ctx.fillStyle = '#ffb6c1'
      ctx.beginPath()
      ctx.arc(0, -20, 15, 0, Math.PI * 2)
      ctx.fill()
      
      // Hair (heart ponytail)
      ctx.fillStyle = '#ff69b4'
      ctx.beginPath()
      ctx.arc(8, -25, 12, 0, Math.PI * 1.5)
      ctx.fill()
      
      // Eyes
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(-6, -22, 3, 0, Math.PI * 2)
      ctx.arc(6, -22, 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#333'
      ctx.beginPath()
      ctx.arc(-6, -22, 1.5, 0, Math.PI * 2)
      ctx.arc(6, -22, 1.5, 0, Math.PI * 2)
      ctx.fill()
      
      // Smile
      ctx.strokeStyle = '#ff1493'
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.arc(0, -12, 5, 0, Math.PI)
      ctx.stroke()
      
      ctx.restore()
    }

    // Obstacles
    const createObstacle = () => {
      const types = ['broken-heart', 'cloud', 'gap']
      const type = types[Math.floor(Math.random() * types.length)]
      obstacles.push({
        x: canvas.width,
        y: type === 'gap' ? canvas.height * 0.85 : canvas.height * 0.75,
        width: 40,
        height: 40,
        type,
        passed: false
      })
    }

    // Collectibles (hearts)
    const createHeart = () => {
      collectibles.push({
        x: canvas.width + Math.random() * 100,
        y: Math.random() * (canvas.height * 0.4) + 100,
        size: 15 + Math.random() * 10,
        collected: false,
        type: Math.random() > 0.7 ? 'gold' : 'red'
      })
    }

    // Particles
    const createParticles = (x, y, color = '#ff1493') => {
      for (let i = 0; i < 8; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          life: 30,
          maxLife: 30,
          color
        })
      }
    }

    // Input handling
    const keys = {}
    const touchStartY = { left: 0, right: 0 }

    const handleKeyDown = (e) => {
      keys[e.code] = true
      if (e.code === 'Space' && !gameState.gameRunning) {
        startGame()
      }
    }

    const handleKeyUp = (e) => {
      keys[e.code] = false
    }

    const handleTouchStart = (e) => {
      e.preventDefault()
      const touch = e.touches[0]
      if (touch.clientX < canvas.width / 3) {
        lane = 0
      } else if (touch.clientX > (canvas.width * 2) / 3) {
        lane = 2
      }
    }

    const handleTouchMove = (e) => {
      e.preventDefault()
    }

    // Game loop
    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw animated gradient background (option1 style)
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#8b5cf6')
      gradient.addColorStop(0.5, '#ec4899')
      gradient.addColorStop(1, '#f472b6')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Parallax backgrounds
      clouds.forEach(cloud => {
        ctx.fillStyle = 'rgba(255,255,255,0.3)'
        ctx.beginPath()
        ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2)
        ctx.fill()
        cloud.x -= cloud.speed
        if (cloud.x < -cloud.size) cloud.x = canvas.width
      })

      heartsBackground.forEach(heart => {
        ctx.fillStyle = '#ff69b4'
        ctx.font = `${heart.size}px Arial`
        ctx.fillText('💖', heart.x, heart.y)
        heart.x -= heart.speed
        if (heart.x < -heart.size) heart.x = canvas.width + Math.random() * 200
      })

      // Update game objects
      gameFrame++

      // Spawn obstacles and collectibles
      if (gameFrame % 120 === 0) createObstacle()
      if (gameFrame % 80 === 0) createHeart()

      // Update obstacles
      obstacles = obstacles.filter(obstacle => {
        obstacle.x -= gameSpeed
        if (obstacle.x < -50) return false

        // Collision detection
        const nanniiiRect = {
          x: nanniiiX + (lane * 80),
          y: nanniiiY - 40,
          width: 30,
          height: 50
        }

        const obstacleRect = {
          x: obstacle.x,
          y: obstacle.y,
          width: obstacle.width,
          height: obstacle.height
        }

        if (!gameState.invincible && 
            nanniiiRect.x < obstacleRect.x + obstacleRect.width &&
            nanniiiRect.x + nanniiiRect.width > obstacleRect.x &&
            nanniiiRect.y < obstacleRect.y + obstacleRect.height &&
            nanniiiRect.y + nanniiiRect.height > obstacle.y) {
          gameOver()
          return false
        }

        return true
      })

      // Update collectibles
      collectibles = collectibles.filter(heart => {
        heart.x -= gameSpeed * 1.5
        if (heart.x < -50) return false

        const nanniiiRect = {
          x: nanniiiX + (lane * 80),
          y: nanniiiY - 40,
          width: 30,
          height: 50
        }

        if (nanniiiRect.x < heart.x + heart.size &&
            nanniiiRect.x + nanniiiRect.width > heart.x &&
            nanniiiRect.y < heart.y + heart.size &&
            nanniiiRect.y + nanniiiRect.height > heart.y) {
          heart.collected = true
          createParticles(heart.x, heart.y, heart.type === 'gold' ? '#ffd700' : '#ff1493')
          
          const points = heart.type === 'gold' ? 100 : 10
          setGameState(prev => ({
            ...prev,
            heartsCollected: prev.heartsCollected + 1,
            score: prev.score + points
          }))
          return false
        }
        return true
      })

      // Update particles
      particles = particles.filter(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life--
        particle.vy += 0.2
        ctx.save()
        ctx.globalAlpha = particle.life / particle.maxLife
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        return particle.life > 0
      })

      // Draw ground path
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 8
      ctx.setLineDash([20, 20])
      ctx.lineDashOffset = -gameFrame * 0.5
      ctx.beginPath()
      ctx.moveTo(0, canvas.height * 0.85)
      ctx.lineTo(canvas.width, canvas.height * 0.85)
      ctx.stroke()

      // Draw obstacles
      obstacles.forEach(obstacle => {
        ctx.fillStyle = obstacle.type === 'broken-heart' ? '#666' : '#888'
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
      })

      // Draw collectibles
      collectibles.forEach(heart => {
        ctx.save()
        ctx.translate(heart.x + heart.size/2, heart.y + heart.size/2)
        ctx.rotate(gameFrame * 0.1)
        ctx.font = `${heart.size}px Arial`
        ctx.fillText('💖', -heart.size/2, heart.size/2)
        ctx.restore()
      })

      // Draw Nanniii
      drawNanniii(nanniiiX + (lane * 80), nanniiiY, gameState.invincible)

      // Update game stats
      gameSpeed += 0.001
      setGameState(prev => ({
        ...prev,
        distance: Math.floor(gameFrame / 60),
        score: Math.floor(gameFrame * gameSpeed)
      }))

      animationIdRef.current = requestAnimationFrame(gameLoop)
    }

    const startGame = () => {
      setGameState(prev => ({ ...prev, gameRunning: true, gameOver: false }))
      gameLoop()
    }

    const gameOver = () => {
      const newHighScore = gameState.score > gameState.highScore
      if (newHighScore) {
        localStorage.setItem('heartRunHighScore', gameState.score.toString())
      }
      
      setGameState(prev => ({
        ...prev,
        gameRunning: false,
        gameOver: true,
        highScore: newHighScore ? gameState.score : prev.highScore
      }))
      
      gsap.to('.game-over-panel', {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      })
    }

    // Event listeners
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false })
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchmove', handleTouchMove)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [gameState])

  return (
    <div className="glass-card max-w-4xl mx-auto p-8 relative overflow-hidden">
      {/* Header - option1 glass card style */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-4">
          🏃‍♀️ Heart Run Adventure
        </h2>
        <p className="text-xl text-white/80 mb-2">
          Help Nanniii run through our love journey! 💖
        </p>
      </div>

      {/* Game Canvas */}
      <div className="relative">
        anvas
          ref={canvasRef}
          className="w-full rounded-2xl shadow-2xl border-4 border-white/20"
        />
        
        {/* Controls */}
        {!gameState.gameRunning && !gameState.gameOver && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => document.querySelector('canvas')?.focus()}
              className="glass-card px-8 py-4 text-2xl font-bold text-white shadow-2xl hover:scale-105 transition-all duration-300"
            >
              🏃‍♀️ Start Running Nanniii!
            </button>
          </div>
        )}

        {/* Game Over Panel */}
        {gameState.gameOver && (
          <div className="game-over-panel absolute inset-0 bg-black/80 flex flex-col items-center justify-center opacity-0 scale-0">
            <div className="text-center glass-card p-12 rounded-3xl">
              <h3 className="text-5xl mb-6">🎉 Amazing Run!</h3>
              <div className="space-y-4 text-2xl mb-8">
                <p>Distance: {gameState.distance}km</p>
                <p>Hearts: {gameState.heartsCollected}</p>
                <p>Score: {gameState.score.toLocaleString()}</p>
                {gameState.score > gameState.highScore && (
                  <p className="text-yellow-400 text-3xl">🏆 NEW BEST!</p>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-pink-300 italic">
                  "Nanniii, you ran so far! Our love journey is unstoppable! 💕"
                </p>
                <p className="text-purple-300 text-sm">
                  — Aadi ❤️
                </p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="mt-8 px-12 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                🏃‍♀️ Run Again!
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stats Panel */}
      <div className="grid grid-cols-3 gap-4 mt-8 text-center">
        <div className="glass-card p-4">
          <div className="text-2xl font-bold text-pink-400">{gameState.distance}km</div>
          <div className="text-white/70 text-sm">Love Journey</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-2xl font-bold text-red-400">{gameState.heartsCollected}</div>
          <div className="text-white/70 text-sm">💖 Collected</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-2xl font-bold text-yellow-400">
            {gameState.score.toLocaleString()}
          </div>
          <div className="text-white/70 text-sm">Total Score</div>
        </div>
      </div>

      {/* Controls Info */}
      <div className="mt-8 p-6 glass-card text-center text-white/80">
        <h4 className="text-xl font-bold mb-4 text-pink-300">🎮 How to Play</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Desktop:</strong></p>
            <p>SPACE ↑ Jump | ← → Move | ↓ Slide</p>
          </div>
          <div>
            <p><strong>Mobile:</strong></p>
            <p>Swipe UP Jump | LEFT/RIGHT Move | DOWN Slide</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeartRun
