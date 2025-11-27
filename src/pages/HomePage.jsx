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
    <div className="page">
      {/* Parallax accent backgrounds */}
      <div className="parallax-accent-1"></div>
      <div className="parallax-accent-2"></div>

      {/* Floating particles */}
      <div className="floating-particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-content">
          <div className="hero-decoration">💖 ✨</div>
          <h1 className="hero-title">Our Love Story</h1>
          <p className="hero-subtitle">Every moment with you is a treasure I hold close to my heart</p>
          <div className="divider"></div>
          <p className="hero-subtitle" style={{ marginTop: '20px', fontSize: '1.05rem' }}>
            "You turned my ordinary days into extraordinary memories"
          </p>
        </div>
      </section>

      {/* Story Sections */}
      <div className="story-sections">
        {/* Section 1: From Friends to Lovers */}
        <section className="story-section" ref={section1Ref}>
          <div className="section-number">01</div>
          <div className="section-emoji">💜</div>
          <h2 className="section-title">From Friends to Lovers</h2>
          <p className="section-text">
            We started as friends, sharing laughs and dreams. Day by day, moment by moment, I realized that the warmth in my chest wasn't just friendship. It was the beginning of something beautiful and profound. You are my greatest adventure.
          </p>
          <div className="section-accent"></div>
        </section>

        {/* Section 2: Our Trust */}
        <section className="story-section" ref={section2Ref}>
          <div className="section-number">02</div>
          <div className="section-emoji">💓</div>
          <h2 className="section-title">Our Trust</h2>
          <p className="section-text">
            Trust is the foundation of everything we are. It's in the way you listen, in your unwavering presence, in the safety I feel beside you. You've shown me what it means to truly believe in someone without hesitation.
          </p>
          <div className="section-accent"></div>
        </section>

        {/* Section 3: Our Future */}
        <section className="story-section" ref={section3Ref}>
          <div className="section-number">03</div>
          <div className="section-emoji">💋</div>
          <h2 className="section-title">Our Future</h2>
          <p className="section-text">
            I see forever in your eyes. A future filled with laughter, adventures, and quiet moments that mean everything. With you, Nandini, I don't just see tomorrow—I see a lifetime of endless love and beautiful memories.
          </p>
          <div className="section-accent"></div>
        </section>
      </div>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2 className="cta-title">Explore Our Love 💫</h2>
        <p className="cta-text">Discover the moments that made us, the trust we built, and the forever we're creating together</p>
        <button className="cta-button">Start the Journey</button>
      </section>
    </div>
  )
}

export default HomePage
