import { useState, useEffect } from 'react'
import { gsap } from 'gsap'

const FuturePage = () => {
  const [dreams, setDreams] = useState([])
  const [inputValue, setInputValue] = useState('')

  // Load dreams from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nanniiiDreams')
      if (saved) {
        setDreams(JSON.parse(saved))
      }
    } catch (e) {
      console.log('No saved dreams found')
    }
  }, [])

  // Save dreams to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('nanniiiDreams', JSON.stringify(dreams.slice(0, 50)))
    } catch (e) {}
  }, [dreams])

  const addDream = () => {
    const text = inputValue.trim()
    if (!text) return

    const newDream = {
      id: Date.now(),
      text,
      createdAt: new Date().toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    }

    // Add to state (immediate UI update)
    setDreams(prev => [newDream, ...prev])
    setInputValue('')

    // Animate new dream card
    setTimeout(() => {
      gsap.fromTo(
        `[data-dream-id="${newDream.id}"]`,
        { scale: 0, y: 50, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
      )
    }, 10)
  }

  const deleteDream = (id) => {
    // Animate removal first
    gsap.to(`[data-dream-id="${id}"]`, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setDreams(prev => prev.filter(dream => dream.id !== id))
      }
    })
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-400 via-rose-400 to-purple-500 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
            💫 Our Future Together
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Nanniii, let's dream about our beautiful life together. Every dream you add makes our future brighter! ❤️
          </p>
        </div>

        {/* Add Dream Form */}
        <div className="glass-card p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            ✨ Add Our Next Dream
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Our Paris vacation... Our first home... Starting a family..."
              className="flex-1 p-6 text-xl rounded-3xl glass-card focus:outline-none focus:ring-4 ring-pink-500/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 placeholder-white/60"
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), addDream())}
            />
            <button
              onClick={addDream}
              disabled={!inputValue.trim()}
              className="px-10 py-6 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-pink-500/50 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 min-w-[160px] whitespace-nowrap"
            >
              💭 Add Dream
            </button>
          </div>
          <p className="text-center text-white/60 mt-4 text-sm">
            Press Enter to add -  Dreams are saved forever ❤️
          </p>
        </div>

        {/* Dreams List */}
        <div className="space-y-6">
          {dreams.length === 0 ? (
            <div className="glass-card p-20 text-center">
              <div className="text-8xl mb-8 animate-pulse">💭</div>
              <h3 className="text-4xl font-bold text-white mb-4">No dreams yet!</h3>
              <p className="text-xl text-white/70 max-w-md mx-auto">
                Start by adding your first dream about our future together ✨
              </p>
            </div>
          ) : (
            <>
              <div className="text-center">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm px-8 py-4 rounded-3xl border border-white/20">
                  <span className="text-3xl">💖</span>
                  <span className="text-2xl font-bold text-white">
                    {dreams.length} {dreams.length === 1 ? 'Dream' : 'Dreams'}
                  </span>
                  <span className="text-3xl">✨</span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dreams.map((dream) => (
                  <div
                    key={dream.id}
                    data-dream-id={dream.id}
                    className="glass-card p-8 hover:shadow-2xl hover:shadow-pink-500/30 group hover:-translate-y-2 transition-all duration-500 relative overflow-hidden rounded-3xl"
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <p className="text-xl leading-relaxed mb-6 min-h-[100px] flex items-center">
                        {dream.text}
                      </p>
                      <div className="flex items-center justify-between text-sm text-white/60">
                        <span>{dream.createdAt}</span>
                        <button
                          onClick={() => deleteDream(dream.id)}
                          className="p-2 hover:bg-white/20 rounded-2xl hover:scale-110 transition-all group/delete"
                          title="Remove dream"
                        >
                          <span className="text-xl group-hover/delete:text-red-400">×</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Floating hearts decoration */}
                    <div className="absolute top-4 right-4 opacity-30">
                      <span className="text-2xl animate-pulse">💖</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  )
}

export default FuturePage
