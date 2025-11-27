import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import './GalleryPage.css'

const galleryImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=400&h=400&fit=crop',
    caption: 'Our First Moment',
    compliment: 'Your smile lights up my entire world 💕'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1518838773e15f75f4f7b87c6c1b61e9?w=400&h=400&fit=crop',
    caption: 'Forever Together',
    compliment: 'Every moment with you is precious ✨'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=400&h=400&fit=crop',
    caption: 'Love in Every Frame',
    compliment: 'You are my greatest masterpiece 🎨'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1519225421-b2110f6f1f38?w=400&h=400&fit=crop',
    caption: 'Your Beauty',
    compliment: 'You take my breath away every single day 😍'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1516192318423-f06f70a504f0?w=400&h=400&fit=crop',
    caption: 'Perfect Together',
    compliment: 'With you, everything feels right 💖'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop',
    caption: 'My Heart',
    compliment: 'You are my reason to smile 🌟'
  }
]

function GalleryPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null)
  const carouselRef = useRef(null)
  const slideRefs = useRef([])

  // 3D carousel rotation
  useEffect(() => {
    const angle = (currentIndex / galleryImages.length) * -360
    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        rotationY: angle,
        duration: 0.8,
        ease: 'power2.inOut'
      })
    }
  }, [currentIndex])

  // Next slide
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
  }

  // Previous slide
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  // Open modal
  const openModal = (image) => {
    setSelectedImage(image)
    gsap.fromTo(
      '.modal-overlay',
      { opacity: 0 },
      { opacity: 1, duration: 0.4 }
    )
    gsap.fromTo(
      '.modal-content',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, delay: 0.1 }
    )
  }

  // Close modal
  const closeModal = () => {
    gsap.to('.modal-overlay', {
      opacity: 0,
      duration: 0.3,
      onComplete: () => setSelectedImage(null)
    })
    gsap.to('.modal-content', {
      opacity: 0,
      scale: 0.8,
      duration: 0.3
    })
  }

  return (
    <div className="page gallery-page">
      {/* Header */}
      <section className="gallery-header">
        <h1 className="gallery-title">📸 Our Gallery</h1>
        <p className="gallery-subtitle">A visual celebration of our love</p>
        <div className="divider"></div>
      </section>

      {/* 3D Carousel */}
      <section className="carousel-section">
        <div className="carousel-container">
          <div className="carousel" ref={carouselRef}>
            {galleryImages.map((image, index) => {
              const angle = (index / galleryImages.length) * 360
              return (
                <div
                  key={image.id}
                  className="carousel-slide"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(300px)`,
                    opacity: Math.abs(currentIndex - index) < 2 ? 1 : 0.5
                  }}
                  onClick={() => openModal(image)}
                >
                  <img src={image.url} alt={image.caption} />
                  <div className="slide-caption">{image.caption}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="carousel-controls">
          <button className="carousel-btn prev-btn" onClick={prevSlide}>
            ← Prev
          </button>
          <div className="slide-counter">
            {currentIndex + 1} / {galleryImages.length}
          </div>
          <button className="carousel-btn next-btn" onClick={nextSlide}>
            Next →
          </button>
        </div>
      </section>

      {/* Dots Indicator */}
      <div className="carousel-dots">
        {galleryImages.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <div className="modal-image-container">
              <img src={selectedImage.url} alt={selectedImage.caption} />
            </div>
            <div className="modal-text">
              <h2 className="modal-caption">{selectedImage.caption}</h2>
              <p className="modal-compliment">{selectedImage.compliment}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryPage
