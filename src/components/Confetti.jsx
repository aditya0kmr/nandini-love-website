import { useEffect } from 'react'
import gsap from 'gsap'
import './Confetti.css'

function Confetti() {
  useEffect(() => {
    const confetti = document.querySelectorAll('.confetti-piece')
    
    confetti.forEach((piece) => {
      const randomX = Math.random() * 400 - 200
      const randomDelay = Math.random() * 0.2
      const randomDuration = 2 + Math.random() * 1
      
      gsap.to(piece, {
        x: randomX,
        y: window.innerHeight + 100,
        opacity: 0,
        rotation: Math.random() * 720,
        duration: randomDuration,
        delay: randomDelay,
        ease: 'power2.in'
      })
    })
  }, [])

  const pieces = Array.from({ length: 30 }, (_, i) => i)
  const emojis = ['💕', '✨', '💖', '🔥', '💝']

  return (
    <div className="confetti-container">
      {pieces.map((i) => (
        <div key={i} className="confetti-piece">
          {emojis[i % emojis.length]}
        </div>
      ))}
    </div>
  )
}

export default Confetti
