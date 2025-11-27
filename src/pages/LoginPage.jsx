import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import './LoginPage.css'

function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const cardRef = useRef(null)
  const pageRef = useRef(null)

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
      // Success - GSAP fade out animation
      gsap.to(cardRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: 'power2.inOut',
      })
      
      gsap.to(pageRef.current, {
        backgroundColor: 'rgba(255, 107, 157, 0.1)',
        duration: 0.6,
        ease: 'power2.inOut',
      })
      
      // Set localStorage and navigate
      localStorage.setItem('loggedIn', 'true')
      setError('')
      
      // Navigate after animation
      setTimeout(() => {
        navigate('/home')
      }, 600)
    } else {
      // Wrong password - GSAP shake animation
      setError(getRandomErrorMessage())
      
      // Shake animation using GSAP
      gsap.to(cardRef.current, {
        x: -10,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        ease: 'power2.out',
      })
      
      // Pulse scale on shake
      gsap.to(cardRef.current, {
        boxShadow: '0 0 30px rgba(255, 107, 157, 0.8)',
        duration: 0.15,
        repeat: 5,
        yoyo: true,
      })
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
    <div className="page login-page" ref={pageRef}>
      {/* Floating Hearts Background */}
      <div className="hearts-bg">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="floating-heart">❤️</span>
        ))}
      </div>

      {/* Login Card */}
      <div className="glass-card login-card" ref={cardRef}>
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
    </div>
  )
}

export default LoginPage
