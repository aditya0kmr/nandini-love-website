// Love Letters component with sweet and flirty letter modes
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import './LoveLettersPage.css'

const sweetLetters = [
  {
    id: 'sweet-1',
    title: 'A Day With You',
    content: 'Dear Nandini,\n\nEvery morning when I wake up and think about you, my heart smiles. The way you laugh at my silly jokes, the way you look at me with those eyes full of love—it makes me believe that I\'m the luckiest person in the world.\n\nI want to spend forever creating memories with you. Thank you for being my greatest blessing.\n\nForever yours,\nYour Love'
  },
  {
    id: 'sweet-2',
    title: 'Thank You For Loving Me',
    content: 'My Dearest Nandini,\n\nI never knew love could feel this way until I met you. Every moment with you feels like a beautiful dream that I never want to wake up from.\n\nYou\'ve brought so much light into my life. Your kindness, your warmth, your presence—it all means the world to me. I\'m grateful for every laugh, every hug, and every tender moment we share.\n\nWith all my love,\nYour Sweetheart'
  },
  {
    id: 'sweet-3',
    title: 'My Heart Belongs to You',
    content: 'Dearest Nandini,\n\nBefore you, I didn\'t know what it meant to truly love someone. But now I do. It\'s in the little things—the way you hold my hand, how you care for me, the dreams we build together.\n\nYou are my inspiration, my motivation, and my greatest joy. I promise to love you more with each passing day.\n\nForever and always,\nYour One and Only'
  },
  {
    id: 'sweet-4',
    title: 'In Your Arms',
    content: 'My Sweet Nandini,\n\nWhen I\'m with you, the world disappears. All that matters is the love between us. Your smile brightens even my darkest days. Your touch calms my troubled heart.\n\nI\'ve found my home in you. In your arms is where I want to be, always.\n\nYours completely,\nYour Love'
  },
  {
    id: 'sweet-5',
    title: 'You Are My Forever',
    content: 'My Beloved Nandini,\n\nI\'ve never been more sure of anything in my life. You are my forever. Not just for a moment, not just for a season, but for all the tomorrows ahead.\n\nWith you, I\'ve found true peace and unconditional love. Thank you for choosing me.\n\nForever devoted,\nYour Heart'
  }
]

const flirtyLetters = [
  {
    id: 'flirty-1',
    title: 'Guilty Pleasure',
    content: 'Hey Beautiful,\n\nI have a confession—I think about you way more than I should. That smile of yours? It\'s absolutely dangerous. And don\'t get me started on how you look at me... it makes my heart race every single time.\n\nI love the way you tease me, the way you bite your lip when you\'re laughing, how you get closer to me when we\'re talking. You drive me absolutely crazy in the best way possible.\n\nMissing you already,\nYour Admirer'
  },
  {
    id: 'flirty-2',
    title: 'Can\'t Get Enough',
    content: 'My Irresistible Nandini,\n\nYou\'re addictive. Seriously. One touch from you and I\'m completely captivated. The way your eyes light up when you see me, the way you laugh at my jokes... I could watch you all day.\n\nI love flirting with you. The way we play, the way we make each other blush—it makes me fall for you more deeply every single day.\n\nYours obsessively,\nYour Favorite Person'
  },
  {
    id: 'flirty-3',
    title: 'You Got Me',
    content: 'Nandini,\n\nI\'m totally caught up in you. The way you move, the way you laugh, that sparkle in your eyes—you\'ve completely bewitched me. I love how we can be silly together, how you make me feel alive and wanted.\n\nI love your playfulness, your confidence, the way you own every moment. You are absolutely breathtaking, and I\'m so lucky to call you mine.\n\nCompletely yours,\nYour Devoted One'
  },
  {
    id: 'flirty-4',
    title: 'You Make Me Want You',
    content: 'Dear Nandini,\n\nThere\'s something about you that drives me wild. Your charm, your wit, the way you make me feel... nobody does it like you do. I find myself constantly thinking about the next time I\'ll see you, the next time I\'ll hold you close.\n\nYou make me want to be better, to love harder, to cherish every single moment with you. The chemistry between us is undeniable, and I never want to let you go.\n\nDesperately yours,\nYour Love'
  },
  {
    id: 'flirty-5',
    title: 'My Weakness',
    content: 'Oh Nandini,\n\nYou\'re my greatest weakness. When you smile at me like that, I lose all control. When you get close to me, I can\'t think straight. You have this power over me that\'s absolutely intoxicating.\n\nI love everything about you—your boldness, your beauty, the way you make me feel like I\'m the only person in the world. You are my addiction, my obsession, my everything.\n\nForever captivated,\nYour Completely Smitten One'
  }
]

function LoveLettersPage() {
  const [currentLetter, setCurrentLetter] = useState(null)
  const [letterMode, setLetterMode] = useState(null)
  const [displayText, setDisplayText] = useState('')
  const [isTypewriting, setIsTypewriting] = useState(false)
  const letterRef = useRef(null)
  const typewriterIntervalRef = useRef(null)

  // Typewriter effect
  useEffect(() => {
    if (!currentLetter || !isTypewriting) return

    let charIndex = 0
    const fullText = currentLetter.content
    setDisplayText('')

    typewriterIntervalRef.current = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayText((prev) => prev + fullText[charIndex])
        charIndex++
      } else {
        setIsTypewriting(false)
        clearInterval(typewriterIntervalRef.current)
      }
    }, 30)

    return () => clearInterval(typewriterIntervalRef.current)
  }, [currentLetter, isTypewriting])

  // Show random letter
  const showRandomLetter = (mode) => {
    const letters = mode === 'sweet' ? sweetLetters : flirtyLetters
    const randomIndex = Math.floor(Math.random() * letters.length)
    const letter = letters[randomIndex]

    setLetterMode(mode)
    setCurrentLetter(letter)
    setDisplayText('')
    setIsTypewriting(true)

    // GSAP animation for the letter card
    if (letterRef.current) {
      gsap.fromTo(
        letterRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
    }
  }

  // Save letter to localStorage
  const saveLetter = () => {
    if (!currentLetter) return

    const savedLetters = JSON.parse(localStorage.getItem('savedLetters') || '[]')
    if (!savedLetters.includes(currentLetter.id)) {
      savedLetters.push(currentLetter.id)
      localStorage.setItem('savedLetters', JSON.stringify(savedLetters))
    }

    // Show toast notification
    showToast(`Letter "${currentLetter.title}" saved! 💕`)
  }

  // Toast notification
  const showToast = (message) => {
    const toast = document.createElement('div')
    toast.textContent = message
    toast.className = 'toast'
    document.body.appendChild(toast)

    gsap.fromTo(
      toast,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4 }
    )

    setTimeout(() => {
      gsap.to(toast, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        onComplete: () => toast.remove()
      })
    }, 2500)
  }

  return (
    <div className="page letters-page">
      {/* Header Section */}
      <section className="letters-header">
        <h1 className="letters-title">💌 Love Letters</h1>
        <p className="letters-subtitle">Words from my heart to yours</p>
        <div className="divider"></div>
      </section>

      {/* Letter Mode Selection */}
      <section className="letter-mode-section">
        <div className="mode-buttons-container">
          <button
            className={`mode-button ${letterMode === 'sweet' ? 'active' : ''}`}
            onClick={() => showRandomLetter('sweet')}
          >
            💕 Her Love Letters
          </button>
          <button
            className={`mode-button ${letterMode === 'flirty' ? 'active' : ''}`}
            onClick={() => showRandomLetter('flirty')}
          >
            🔥 Flirty Letters
          </button>
        </div>
      </section>

      {/* Letter Display */}
      {currentLetter && (
        <section className="letter-display-section" ref={letterRef}>
          <div className="glass-card letter-card">
            <div className="letter-header">
              <h2 className="letter-title">{currentLetter.title}</h2>
              <span className="letter-mode-badge">
                {letterMode === 'sweet' ? '💕 Sweet' : '🔥 Flirty'}
              </span>
            </div>

            <div className="letter-content">
              <p className="typewriter-text">{displayText}</p>
              {!isTypewriting && displayText.length > 0 && (
                <span className="cursor">|</span>
              )}
            </div>

            <div className="letter-actions">
              <button
                className="action-button save-button"
                onClick={saveLetter}
              >
                💾 Save this Letter
              </button>
              <button
                className="action-button next-button"
                onClick={() =>
                  showRandomLetter(letterMode === 'sweet' ? 'sweet' : 'flirty')
                }
              >
                ➜ Next Letter
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Placeholder */}
      {!currentLetter && (
        <section className="placeholder-section">
          <div className="glass-card placeholder-card">
            <p className="placeholder-text">Select a letter type to begin... 💭</p>
          </div>
        </section>
      )}
    </div>
  )
}

export default LoveLettersPage
