import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './GalleryPage.css';
import { galleryImages, frame2Memories, getNewMemories, getMemoriesByCategory } from '../utils/imageAssets';

const GalleryPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  
  // Frame 1 State
  const [favorites, setFavorites] = useState([]);
  const [currentCarouselImage, setCurrentCarouselImage] = useState(0);
  const memories = galleryImages;
  
  // Frame 2 State
  const [frame2Filter, setFrame2Filter] = useState('all');
  const [frame2DisplayMode, setFrame2DisplayMode] = useState('grid');
  
  // Get filtered Frame 2 memories
  const getFrame2Items = () => {
    if (frame2Filter === 'all') return frame2Memories;
    if (frame2Filter === 'new') return getNewMemories();
    return getMemoriesByCategory(frame2Filter);
  };
  
  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('galleryFavorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);
  
  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselImage((prev) => (prev + 1) % memories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [memories.length]);
  
  // Toggle favorite
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
      {/* Page Hero */}
      <div className="page-hero">
        <h1 className="ink-reveal title-glow">Our Memories for nanniii ✨💖</h1>
        <p className="hero-subtitle">Scroll to see both frames with all memories...</p>
      </div>
      
      {/* FRAME 1: 3D CAROUSEL */}
      <div className="frame-section frame-carousel-section">
        <h2 className="frame-title">🎜 Frame 1: 3D Carousel</h2>
        
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
        
        {/* Carousel Navigation Dots */}
        <div className="carousel-dots">
          {memories.map((_, index) => (
            <div
              key={index}
              className={`dot ${currentCarouselImage === index ? 'active' : ''}`}
              onClick={() => setCurrentCarouselImage(index)}
            />
          ))}
        </div>
        
        {/* Carousel Info Card */}
        <div className="carousel-info">
          <div className="glass-card info-card">
            <h3>{memories[currentCarouselImage]?.text}</h3>
            <p>\"Every moment with you glows brighter, nanniii\" - aadi 💕</p>
          </div>
        </div>
      </div>
      
      {/* FRAME 2: LIQUID BLOB MEMORIES */}
      <div className="frame-section frame-liquid-section">
        <h2 className="frame-title">💧 Frame 2: Liquid Blob Memories</h2>
        
        {/* Filter Buttons */}
        <div className="frame2-filters">
          <button
            className={frame2Filter === 'all' ? 'active' : ''}
            onClick={() => setFrame2Filter('all')}
          >
            ✨ All Memories
          </button>
          <button
            className={frame2Filter === 'new' ? 'active' : ''}
            onClick={() => setFrame2Filter('new')}
          >
            🆕 Just Added Today
          </button>
          <button
            className={frame2Filter === 'romantic' ? 'active' : ''}
            onClick={() => setFrame2Filter('romantic')}
          >
            💕 Romantic
          </button>
          <button
            className={frame2Filter === 'adventure' ? 'active' : ''}
            onClick={() => setFrame2Filter('adventure')}
          >
            🏔️ Adventure
          </button>
        </div>
        
        {/* Display Mode Toggle */}
        <div className="frame2-display-toggle">
          <button
            className={frame2DisplayMode === 'grid' ? 'active' : ''}
            onClick={() => setFrame2DisplayMode('grid')}
          >
            📊 Grid View
          </button>
          <button
            className={frame2DisplayMode === 'timeline' ? 'active' : ''}
            onClick={() => setFrame2DisplayMode('timeline')}
          >
            📅 Timeline View
          </button>
        </div>
        
        {/* Frame 2 Grid */}
        <div ref={containerRef} className={`frame2-memories frame2-memories--${frame2DisplayMode}`}>
          {getFrame2Items().map(memory => (
            <LiquidBlobCard
              key={memory.id}
              memory={memory}
              isFavorite={favorites.includes(memory.id)}
              onFavoriteToggle={toggleFavorite}
            />
          ))}
        </div>
      </div>
      
      {/* FAVORITES SECTION */}
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
      
      {/* Next Page Button */}
      <button className="next-page-btn ribbon-variant" onClick={nextPage}>
        <span>→ Our Timeline Journey</span>
        <div className="ribbon-trail"></div>
      </button>
      
      {/* Instructions */}
      <div className="instructions">
        💫 Scroll to explore both frames • Click hearts to favorite • No overlapping!
      </div>
    </div>
  );
};

// CAROUSEL ITEM COMPONENT
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

// LIQUID BLOB CARD COMPONENT
const LiquidBlobCard = ({ memory, isFavorite, onFavoriteToggle }) => {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onFavoriteToggle(memory.id);
  };
  
  return (
    <article className="blob-card">
      <div className="blob-image-wrapper">
        <img
          src={memory.image}
          alt={memory.title}
          className="blob-image"
          loading="lazy"
        />
        {memory.isNew && <span className="badge-new">🆕 New</span>}
      </div>
      <div className="blob-content">
        <h3>{memory.title}</h3>
        <p>{memory.caption}</p>
        <div className="blob-meta">
          <span>{memory.dateLabel}</span>
          <span>{memory.categoryLabel}</span>
        </div>
        <div
          className={`favorite-heart ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '💖' : '🤍'}
        </div>
      </div>
    </article>
  );
};

// HEART ORB COMPONENT
const HeartOrb = ({ delay = 0 }) => (
  <div
    className="heart-orb"
    style={{ animationDelay: `${delay}s` }}
  >
    ✨
  </div>
);

export default GalleryPage;
