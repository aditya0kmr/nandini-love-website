import { Routes, Route, Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Home Page Component
function Home() {
  const titleRef = useRef(null)
  const heartRef = useRef(null)

  useEffect(() => {
    // GSAP animation for title
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
    )
    
    // Heartbeat animation
    gsap.to(heartRef.current, {
      scale: 1.2,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    })
  }, [])

  return (
    <div className="page home">
      <h1 ref={titleRef}>Welcome, My Love</h1>
      <span ref={heartRef} className="heart">&#10084;</span>
      <p>This website is made just for you, Nandini</p>
      <nav className="nav-links">
        <Link to="/letters">Love Letters</Link>
        <Link to="/gallery">Our Gallery</Link>
        <Link to="/memories">Memories</Link>
      </nav>
    </div>
  )
}

// Letters Page
function Letters() {
  return (
    <div className="page letters">
      <h1>Love Letters</h1>
      <p>Coming soon...</p>
      <Link to="/">Back Home</Link>
    </div>
  )
}

// Gallery Page
function Gallery() {
  return (
    <div className="page gallery">
      <h1>Our Gallery</h1>
      <p>Coming soon...</p>
      <Link to="/">Back Home</Link>
    </div>
  )
}

// Memories Page
function Memories() {
  return (
    <div className="page memories">
      <h1>Our Memories</h1>
      <p>Coming soon...</p>
      <Link to="/">Back Home</Link>
    </div>
  )
}

// Main App Component
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/letters" element={<Letters />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/memories" element={<Memories />} />
      </Routes>
    </div>
  )
}

export default App
