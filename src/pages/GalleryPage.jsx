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
    { id: 1, text: 'Our First Beach Sunset 🌅 nanniii', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500', carouselAngle: 0 },
    { id: 2, text: "nanniii's Beautiful Smile 😍 aadi", image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=500', carouselAngle: 72 },
    { id: 3, text: 'First Date Magic ✨ Forever', image: 'https://images.unsplash.com/photo-1516589178581-a70e2083893c?w=500', carouselAngle: 144 },
    { id: 4, text: 'Holding Hands Forever 💕', image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=500', carouselAngle: 216 },
    { id: 5, text: 'Adventure Together 🏔️', image: 'https://images.unsplash.com/photo-1464822759023-fed622b4e443?w=500', carouselAngle: 288 },
    { id: 6, text: 'aadi ❤️ nanniii Forever', image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500', carouselAngle: 0 },
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

  const toggleFavorite = useCallback((memoryId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(memoryId) 
        ? prev.filter(id => id !== memoryId)
        : [...prev, memoryId];
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
          <div ref={containerRef} className="blobs-grid-container">
            {memories.map(memory => (
              <LiquidBlobCard
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
          : '💫 Click hearts • Hover for ripples • No overlaps!'
        }
      </div>
    </div>
  );
};

const CarouselItem = ({ memory, index, currentImage, onFavoriteToggle, isFavorite }) => {
  return (
    <div 
      className={`carousel-item ${currentImage === index ? 'active' : ''}`}
      style={{ 
        transform: `rotateY(${memory.carouselAngle}deg) translateZ(300px)`,
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

const LiquidBlobCard = ({ memory, isFavorite, onFavoriteToggle }) => {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onFavoriteToggle(memory.id);
  };

  return (
    <div className="liquid-blob-card-grid">
      <div className="blob-wrapper">
        <img src={memory.image} alt={memory.text} className="blob-image" loading="lazy" />
        <div className="blob-overlay"></div>
        <div className="blob-content">
          <p className="blob-text">{memory.text}</p>
          <div 
            className={`favorite-heart ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? '💖' : '🤍'}
          </div>
        </div>
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
