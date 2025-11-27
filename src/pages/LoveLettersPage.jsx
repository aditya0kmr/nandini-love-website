import { useState, useEffect } from 'react'
import { gsap } from 'gsap'

const LettersPage = () => {
  const [currentLetter, setCurrentLetter] = useState('')
  const [mode, setMode] = useState('sweet') // 'sweet' or 'flirty'
  const [loading, setLoading] = useState(false)
  const [favorites, setFavorites] = useState([])

  // REAL LETTER DATA (no API needed)
  const sweetLetters = [
    "Nanniii, every moment with you feels like a dream. Your smile lights up my entire world. From the day we met as friends to now building our forever, you've been my everything. I love you more than words can express. ❤️ - Aadi",
    "My beautiful Nanniii, your kindness and strength inspire me every single day. The trust we share is unbreakable. Thank you for choosing me, for loving me, for being my partner in this beautiful life. Forever yours. 💕",
    "Nanniii, do you know what makes my heart skip a beat? It's the way you laugh when I say something silly. Your joy is contagious, and I fall in love with you more every single day. Let's keep laughing together forever. 🙋",
    "To my beautiful Nanniii, thank you for being my rock, my comfort, my home. With you, I found not just love, but my soulmate. You make every ordinary moment extraordinary. I love you infinitely. 🎌",
    "Nanniii, I never knew love could feel this right until I met you. You're my greatest blessing, my answer to prayers. Let's build a lifetime of beautiful memories together. You're everything to me. 🥰"
  ]

  const flirtyLetters = [
    "Nanniii 😏, that smile of yours... it does things to me. The way you blush when I tease you? Irresistible. Can't wait to hold you close and whisper all the naughty things I love about you. Yours completely. 😘 - Aadi",
    "Hey gorgeous, wearing my favorite dress tonight? Good, because I can't keep my eyes (or hands) off you. You make my heart race faster than anything else. Come closer... 💋",
    "Nanniii, the way you look at me when we're alone... it drives me crazy in the best way. I want to feel your touch, taste your lips, and lose myself in your eyes all night long. 😎",
    "I love you like fire loves heat. Every touch sends electricity through me. You're my addiction, my obsession, my everything. Tonight, let me show you how much I want you. 🔥",
    "Nanniii baby, I can't stop thinking about you. The way your body fits perfectly against mine... I want you so badly. Let me be your fantasy tonight. All yours. Always. 🥵"
  ]

  const getRandomLetter = () => {
    const letters = mode === 'sweet' ? sweetLetters : flirtyLetters
    return letters[Math.floor(Math.random() * letters.length)]
  }

  const showLetter = () => {
    setLoading(true)
    setTimeout(() => {
      setCurrentLetter(getRandomLetter())
      setLoading(false)
      
      // Confetti for flirty mode
      if (mode === 'flirty') {
        console.log('🎉 Flirty confetti!')
      }
    }, 800)
  }

  useEffect(() => {
    showLetter()
  }, [mode])

  const saveFavorite = () => {
    const id = Date.now()
    const favorite = { id, text: currentLetter, mode, date: new Date().toLocaleDateString() }
    
    setFavorites(prev => [favorite, ...prev])
    localStorage.setItem('letterFavorites', JSON.stringify([favorite, ...favorites]))
    
    // Toast animation
    gsap.fromTo('.favorite-toast', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.5 }
    )
    setTimeout(() => {
      gsap.to('.favorite-toast', { y: -50, opacity: 0, duration: 0.5 })
    }, 3000)
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      {/* Mode Toggle */}
      <div className="glass-card p-8 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text mb-8">
          📈 Love Letters
        </h1>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setMode('sweet')}
            className={`px-8 py-4 rounded-2xl font-bold text-xl transition-all ${mode === 'sweet' ? 'bg-gradient-to-r from-pink-500 to-rose-500 shadow-2xl scale-105' : 'glass-card hover:scale-105'}`}
          >
            💕 Her Love Letters
          </button>
          <button
            onClick={() => setMode('flirty')}
            className={`px-8 py-4 rounded-2xl font-bold text-xl transition-all ${mode === 'flirty' ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-2xl scale-105' : 'glass-card hover:scale-105'}`}
          >
            😘 Flirty Letters
          </button>
        </div>
      </div>

      {/* Letter Display */}
      <div className="glass-card p-12 relative">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-6xl animate-pulse">💖</div>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <button
                onClick={showLetter}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl hover:scale-105 shadow-xl mb-6"
              >
                ✨ New Letter
              </button>
            </div>
            <div className="prose prose-lg max-w-3xl mx-auto text-xl leading-relaxed whitespace-pre-wrap text-white">
              {currentLetter}
            </div>
            <div className="flex gap-4 mt-12 justify-center">
              <button
                onClick={saveFavorite}
                className="px-12 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xl rounded-2xl hover:scale-105 shadow-2xl"
              >
                💖 Save to Favorites
              </button>
            </div>
          </>
        )}
      </div>

      {/* Favorite Toast */}
      <div className="favorite-toast fixed top-20 right-8 glass-card p-6 shadow-2xl hidden">
        <p className="text-lg font-bold text-emerald-300">💖 Saved to your heart!</p>
      </div>
    </div>
  )
}

export default LettersPage
