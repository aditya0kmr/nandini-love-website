import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isShaking, setIsShaking] = useState(false)
  const [showHearts, setShowHearts] = useState(false)
  const navigate = useNavigate()

  // Check if already logged in
  useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true') {
      navigate('/home')
    }
  }, [navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Check password (nanniii for now)
    if (password === 'nanniii') {
      // Success!
      localStorage.setItem('loggedIn', 'true')
      setShowHearts(true)
      setError('')
      
      // Navigate after brief celebration
      setTimeout(() => {
        navigate('/home')
      }, 1500)
    } else {
      // Wrong password - show error and shake
      setError(getRandomErrorMessage())
      setIsShaking(true)
      
      // Remove shake after animation
      setTimeout(() => {
        setIsShaking(false)
      }, 500)
    }
  }

  const getRandomErrorMessage = () => {
    const messages = [
      "Oops! That's not it, baby! Try again? 😘",
      "Hmm... wrong password, sweetheart! 💔",
      "Nope! Think harder, my love! 🤔💕",
      "Almost! But not quite right... 😉",
      "Wrong one, cutie! Hint: It's about us! 💋",
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  return (
    <div className="page login-page">
      {/* Floating Hearts Background */}
      <div className="hearts-bg">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="floating-heart">❤️</span>
        ))}
      </div>

      {/* Login Card */}
      <div className={`glass-card login-card ${isShaking ? 'shake' : ''}`}>
        <div className="login-header">
          <span className="heart-icon">💖</span>
          <h1>For My Love</h1>
          <p className="subtitle">Enter our secret password, Nandini 💋</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="input-field password-input"
              autoFocus
            />
            <span className="input-icon">🔒</span>
          </div>

          {error && (
            <p className="error-message">{error}</p>
          )}

          <button type="submit" className="btn btn-primary login-btn">
            <span>Unlock Our World</span>
            <span className="btn-hearts">💕</span>
          </button>
        </form>

        <p className="hint-text">
          Hint: What do you call me? 🥰
        </p>
      </div>

      {/* Success Hearts Animation */}
      {showHearts && (
        <div className="success-overlay">
          <div className="success-hearts">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="burst-heart">❤️</span>
            ))}
          </div>
          <p className="success-text">Welcome, my love! 💖</p>
        </div>
      )}
    </div>
  )
}

export default LoginPage
