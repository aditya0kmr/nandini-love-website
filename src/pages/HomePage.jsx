import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './HomePage.css'

function HomePage() {
  const heroRef = useRef(null)
  const section1Ref = useRef(null)
  const section2Ref = useRef(null)
  const section3Ref = useRef(null)

  useEffect(() => {
    // Hero fade-in on mount
    gsap.fromTo(heroRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    )

    // Fade-in sections with stagger
    const sections = [section1Ref.current, section2Ref.current, section3Ref.current]
    sections.forEach((section, index) => {
      gsap.fromTo(section,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: 0.3 + (index * 0.2),
          ease: 'power2.out'
        }
      )
    })
  }, [])

  return (
    <div className="home-page">
      {/* Animated Background Elements */}
      <div className="bg-elements">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="floating-particle" style={{
            '--delay': `${i * 0.1}s`,
            '--x': `${Math.random() * 100}%`,
            '--y': `${Math.random() * 100}%`,
          }}>
            ❤️
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-content">
          <div className="hero-decoration">💖</div>
          <h1 className="hero-title">Our Love Story</h1>
          <p className="hero-subtitle">Every moment with you is a treasure I hold close to my heart</p>
          <div className="hero-divider"></div>
          <p className="hero-quote">"You turned my ordinary days into extraordinary memories"</p>
        </div>
      </section>

      {/* Section 1: From Friends to Lovers */}
      <section className="story-section section-1" ref={section1Ref}>
        <div className="section-header">
          <span className="section-number">01</span>
          <h2>From Friends to Lovers</h2>
        </div>
        <div className="section-content">
          <p className="section-text">
            We started as friends, sharing laughs and dreams. Day by day, moment by moment, I realized that the warmth in my chest wasn't just friendship. It was the beginning of something beautiful and profound.
          </p>
          <div className="section-emoji">💜</div>
        </div>
        <div className="section-accent accent-1"></div>
      </section>

      {/* Section 2: Our Trust */}
      <section className="story-section section-2" ref={section2Ref}>
        <div className="section-header">
          <span className="section-number">02</span>
          <h2>Our Trust</h2>
        </div>
        <div className="section-content">
          <p className="section-text">
            Trust is the foundation of everything we are. It's in the way you listen, in your unwavering presence, in the safety I feel beside you. You've shown me what it means to truly believe in someone.
          </p>
          <div className="section-emoji">💓</div>
        </div>
        <div className="section-accent accent-2"></div>
      </section>

      {/* Section 3: Our Future */}
      <section className="story-section section-3" ref={section3Ref}>
        <div className="section-header">
          <span className="section-number">03</span>
          <h2>Our Future</h2>
        </div>
        <div className="section-content">
          <p className="section-text">
            I see forever in your eyes. A future filled with laughter, adventures, and quiet moments that mean everything. With you, Nandini, I don't just see tomorrow—I see a lifetime of endless love.
          </p>
          <div className="section-emoji">💋</div>
        </div>
        <div className="section-accent accent-3"></div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <p className="cta-text">Explore our story in every page 💫</p>
      </section>
    </div>
  )
}

export default HomePage
