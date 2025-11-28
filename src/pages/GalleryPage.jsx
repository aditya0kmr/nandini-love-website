import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './GalleryPage.css';

const GalleryPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const [activeFrame, setActiveFrame] = useState('carousel');
  const [favorites, setFavorites] = useState([]);
  const [currentCarouselImage, setCurrentCarouselImage] = useState(0);

  const memories = [
    { id: 1, text: 'Our First Beach Sunset 🌅 nanniii', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', carouselAngle: 0 },
    { id: 2, text: "nanniii's Beautiful Smile 😍 aadi", image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400', carouselAngle: 72 },
    { id: 3, text: 'First Date Magic ✨ Forever', image: 'https://images.unsplash.com/photo-1516589178581-a70e2083893c?w=400', carouselAngle: 144 },
    { id: 4, text: 'Holding Hands Forever 💕', image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400', carouselAngle: 216 },
    { id: 5, text: 'Adventure Together 🏔️', image: 'https://images.unsplash.com/photo-1464822759023-fed622b4e443?w=400', carouselAngle: 288 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('galleryFavorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (activeFrame === 'carousel') {
      const interval = setInterval(() => {
        setCurrentCarouselImage((prev) => (prev + 1) % memories.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeFrame, memories.length]);

  const toggleFavorite = useCallback((blobId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(blobId) 
        ? prev.filter(id => id !== blobId)
        : [...prev, blobId];
      localStorage.setItem('galleryFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const nextPage = () => navigate('/timeline');

  return (
    <div className="gallery-page">
      <div className="page-hero">
        <h1 className="ink-reveal title-glow">Our Memories for nanniii ✨💖</h1>
        <p className="hero-subtitle">Two ways to relive our love story...</p>
      </div>

      <div className="frame-tabs">
        <button 
          className={`tab-btn ${activeFrame === 'carousel' ? 'active' : ''}`}
          onClick={() => setActiveFrame('carousel')}
        >
          🎜 3D Carousel
        </button>
        <button 
          className={`tab-btn ${activeFrame === 'liquid' ? 'active' : ''}`}
          onClick={() => setActiveFrame('liquid')}
        >
          💧 Liquid Memories
        </button>
      </div>

      {activeFrame === 'carousel' && (
        <div className="carousel-frame">
          <div ref={carouselRef} className="carousel-container">
            <div className="carousel-orbit">
              {memories.map((memory, index) => (
                <CarouselItem
                  key={memory.id}
                  memory={memory}
                  index={index}
                  currentImage={currentCarouselImage}
                  onFavoriteToggle={toggleFavorite}
                  isFavorite={favorites.includes(memory.id)}
                />
              ))}
            </div>
            <div className="heart-orbs-container">
              {[...Array(4)].map((_, i) => (
                <HeartOrb key={i} delay={i * 0.5} />
              ))}
            </div>
          </div>
          
          <div className="carousel-dots">
            {memories.map((_, index) => (
              <div
                key={index}
                className={`dot ${currentCarouselImage === index ? 'active' : ''}`}
                onClick={() => setCurrentCarouselImage(index)}
              />
            ))}
          </div>

          <div className="carousel-info">
            <div className="glass-card info-card">
              <h3>{memories[currentCarouselImage]?.text}</h3>
              <p>"Every moment with you glows brighter, nanniii" - aadi 💕</p>
            </div>
          </div>
        </div>
      )}

      {activeFrame === 'liquid' && (
        <div className="liquid-frame">
          <div ref={containerRef} className="blob-container">
            {memories.map(memory => (
              <LiquidBlobMemory
                key={memory.id}
                memory={memory}
                isFavorite={favorites.includes(memory.id)}
                onFavoriteToggle={toggleFavorite}
              />
            ))}
          </div>
        </div>
      )}

      <div className="favorites-section">
        <h3 className="favorites-title">
          💖 nanniii's Favorite Memories ({favorites.length})
        </h3>
        <div className="favorites-grid">
          {favorites.map(id => {
            const memory = memories.find(m => m.id === id);
            return memory ? (
              <div key={id} className="favorite-card glass-card">
                <img src={memory.image} alt={memory.text} loading="lazy" />
                <span>{memory.text}</span>
              </div>
            ) : null;
          })}
        </div>
      </div>

      <button className="next-page-btn ribbon-variant" onClick={nextPage}>
        <span>→ Our Timeline Journey</span>
        <div className="ribbon-trail"></div>
      </button>

      <div className="instructions">
        {activeFrame === 'carousel' 
          ? '🔎 Hover to tilt • Click photo • Tap dots' 
          : '💫 Drag blobs • Click for hearts • Hover ripples'
        }
      </div>
    </div>
  );
};

const CarouselItem = ({ memory, index, currentImage, onFavoriteToggle, isFavorite }) => {
  const itemRef = useRef(null);

  return (
    <div 
      ref={itemRef}
      className={`carousel-item ${currentImage === index ? 'active' : ''}`}
      style={{ 
        transform: `rotateY(${memory.carouselAngle}deg) translateZ(300px)`,
        '--hover-tilt': `${(index - currentImage) * 5}deg`
      }}
    >
      <div className="carousel-image-wrapper glass-card">
        <img src={memory.image} alt={memory.text} loading="lazy" />
        <div className="carousel-overlay">
          <div className="carousel-text">{memory.text}</div>
          <div 
            className={`favorite-heart ${isFavorite ? 'active' : ''}`}
            onClick={() => onFavoriteToggle(memory.id)}
          >
            {isFavorite ? '💖' : '🤍'}
          </div>
        </div>
      </div>
    </div>
  );
};

const LiquidBlobMemory = ({ memory, isFavorite, onFavoriteToggle }) => {
  const elementRef = useRef(null);

  return (
    <div 
      ref={elementRef}
      className={`liquid-blob ${isFavorite ? 'favorite-active' : ''}`}
      onClick={() => onFavoriteToggle(memory.id)}
      style={{
        left: `${100 + memory.id * 150 + Math.random() * 100}px`,
        top: `${150 + memory.id * 100 + Math.random() * 100}px`,
        width: '240px',
        height: '240px',
      }}
    >
      <img src={memory.image} alt={memory.text} className="blob-image" loading="lazy" />
      <div className="blob-text">{memory.text}</div>
      <div className="favorite-heart" onClick={() => onFavoriteToggle(memory.id)}>
        {isFavorite ? '💖' : '🤍'}
      </div>
    </div>
  );
};

const HeartOrb = ({ delay = 0 }) => (
  <div 
    className="heart-orb"
    style={{ animationDelay: `${delay}s` }}
  >
    ✨
  </div>
);

export default GalleryPage;
