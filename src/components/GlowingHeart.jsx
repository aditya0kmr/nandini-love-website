import { useState } from 'react'
import gsap from 'gsap'
import './GlowingHeart.css'

function GlowingHeart({ onReveal }) {
  const [revealed, setRevealed] = useState(false)
  const heartRef = React.useRef(null)

  const handleHeartClick = () => {
    if (revealed) return
    setRevealed(true)

    // 3D scale and glow animation
    gsap.to(heartRef.current, {
      scale: 1.5,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out',
      onComplete: () => {
        onReveal()
      }
    })
  }

  if (revealed) return null

  return (
    <div className="heart-container" ref={heartRef}>
      <div className="glowing-heart" onClick={handleHeartClick}>
        💝
      </div>
    </div>
  )
}

export default GlowingHeart
