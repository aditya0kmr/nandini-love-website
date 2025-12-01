import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import './LoveLettersPage.css'
import LetterToggle from '../components/LetterToggle'

const LoveLettersPage = () => {
  const [revealed, setRevealed] = useState(false)
  const [mode, setMode] = useState('sweet')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [favorites, setFavorites] = useState([])

  const sweetLetters = [
    "Nanniii, every moment with you feels like a dream. Your smile lights up my entire world. I love you more than words can express. Forever yours. ❤️ - Aadi",
    "My beautiful Nanniii, your kindness and strength inspire me every single day. Thank you for being my partner in this beautiful life. 💕",
    "Nanniii, the way you laugh... it makes me fall in love with you more every day. Let's keep laughing together forever. 🙋",
    "To my beautiful Nanniii, thank you for being my rock. You make every ordinary moment extraordinary. I love you infinitely. 🎌",
    "Nanniii, I never knew love could feel this right. You're my greatest blessing. Forever yours. 🥰"
  ]

  const flirtyLetters = [
    "Nanniii, that smile drives me crazy. Can't wait to hold you close. Yours completely. 😘 - Aadi",
    "Hey gorgeous, I can't keep my eyes off you. Come closer... 💋",
    "Nanniii, the way you look at me... it drives me crazy in the best way. 😎",
    "I love you like fire loves heat. Every touch sends electricity through me. 🔥",
    "Nanniii baby, I want you so badly. Let me be your fantasy tonight. 🥵"
  ]

  const currentLetters = mode === 'sweet' ? sweetLetters : flirtyLetters
  const currentLetter = currentLetters[currentIndex]

  const handleHeartClick = () => {
    setRevealed(true)
    gsap.fromTo('.heart-3d', 
      { scale: 0.5, rotationY: 0, opacity: 0 },
      { scale: 1.2, rotationY: 360, opacity: 1, duration: 1 }
    )
  }

  useEffect(() => {
    if (!revealed) return
    setIsTyping(true)
    setDisplayedText('')
    let index = 0
    const timer = setInterval(() => {
      if (index < currentLetter.length) {
        setDisplayedText(prev => prev + currentLetter[index])
        index++
      } else {
        setIsTyping(false)
        clearInterval(timer)
      }
    }, 30)
    return () => clearInterval(timer)
  }, [currentIndex, mode, revealed, currentLetter])

  useEffect(() => {
    setCurrentIndex(0)
    setDisplayedText('')
  }, [mode])

  useEffect(() => {
    const saved = localStorage.getItem('letterFavorites')
    if (saved) setFavorites(JSON.parse(saved))
  }, [])

  const nextLetter = () => {
    setCurrentIndex((prev) => (prev + 1) % currentLetters.length)
  }

  const saveFavorite = () => {
    const id = Date.now()
    const favorite = { id, text: currentLetter, mode, date: new Date().toLocaleDateString() }
    const updated = [favorite, ...favorites]
    setFavorites(updated)
    localStorage.setItem('letterFavorites', JSON.stringify(updated))
    
    gsap.fromTo('.toast-notification',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    )
    setTimeout(() => {
      gsap.to('.toast-notification', { y: -50, opacity: 0, duration: 0.5 })
    }, 3000)
  }

  return (
    <div className="letters-page min-h-screen p-8">
      {!revealed ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-8">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-400 to-rose-600 bg-clip-text text-transparent mb-8">
              💌 Secret Love Letters
            </h1>
            <p className="text-xl text-gray-300 mb-8">Click the heart to reveal the magic...</p>
            <div className="heart-3d-container" onClick={handleHeartClick}>
              <div className="heart-3d cursor-pointer text-8xl transform hover:scale-110 transition-transform duration-300">
                ❤️
              </div>
            </div>
            <p className="text-sm text-gray-400 animate-pulse mt-8">Click to reveal</p>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">
<LetterToggle mode={mode} onModeChange={setMode} />
          <div className="glass-card p-12 rounded-3xl min-h-80 flex flex-col justify-center">
            <div className="text-2xl leading-relaxed text-white whitespace-pre-wrap font-light">
              {displayedText}
              {isTyping && <span className="animate-pulse">|</span>}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={nextLetter}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-2xl hover:scale-105 transition-transform shadow-xl"
            >
              → Next Letter
            </button>
            <button
              onClick={saveFavorite}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl hover:scale-105 transition-transform shadow-xl"
            >
              ❤️ Save Letter
            </button>
          </div>

          <div className="text-center text-gray-400">
            Letter {currentIndex + 1} of {currentLetters.length}
          </div>
        </div>
      )}

      <div className="toast-notification fixed bottom-8 right-8 glass-card p-6 rounded-2xl shadow-2xl text-emerald-300 font-bold text-lg hidden">
        ❤️ Saved to your heart!
      </div>
    </div>
  )
}

export default LoveLettersPage
