import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './GalleryPage.css';
import { galleryImages, frame2Memories, getNewMemories, getMemoriesByCategory, getSortedMemories } from '../utils/imageAssets';

const GalleryPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const [favorites, setFavorites] = useState([]);
  const [currentCarouselImage, setCurrentCarouselImage] = useState(0);

  // Using local images from src/assets/images/, fallback to Unsplash if local fails
const memories = galleryImages;

 // Get filtered Frame 2 memories based on selected filter
 const getFrame2Memories = () => {
   if (frame2Filter === 'all') return frame2Memories;
   if (frame2Filter === 'new') return getNewMemories();
   return getMemoriesByCategory(frame2Filter);
 };

 const [frame2Filter, setFrame2Filter] = useState('all');
 const [frame2DisplayMode, setFrame2DisplayMode] = useState('grid'); // 'grid' or 'timeline'
  useEffect(() => {
    const saved = localStorage.getItem('galleryFavorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselImage((prev) => (prev + 1) % memories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [memories.length]);

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
        <p className="hero-subtitle">Scroll to see both frames with all memories...</p>
      </div>

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

           {/* Frame 2 Enhanced with Smart Filters & 'New' Showcase */}
     <div className="frame2-filter-buttons" style={{display: 'flex', gap: '10px', margin: '20px 0', justifyContent: 'center', flexWrap: 'wrap'}}>
       <button onClick={() => setFrame2Filter('new')} style={{padding: '8px 16px', borderRadius: '20px', border: frame2Filter === 'new' ? '2px solid #e63946' : '1px solid #ccc', background: frame2Filter === 'new' ? '#ffe0e6' : 'transparent', cursor: 'pointer'}}>🆕 Just Added Today</button>
       <button onClick={() => setFrame2Filter('all')} style={{padding: '8px 16px', borderRadius: '20px', border: frame2Filter === 'all' ? '2px solid #a8d8ea' : '1px solid #ccc', background: frame2Filter === 'all' ? '#d4f1f9' : 'transparent', cursor: 'pointer'}}>✨ All Memories</button>
       <button onClick={() => setFrame2Filter('romantic')} style={{padding: '8px 16px', borderRadius: '20px', border: frame2Filter === 'romantic' ? '2px solid #f8614f' : '1px solid #ccc', background: frame2Filter === 'romantic' ? '#ffe5e0' : 'transparent', cursor: 'pointer'}}>💕 Romantic</button>
       <button onClick={() => setFrame2Filter('intimate')} style={{padding: '8px 16px', borderRadius: '20px', border: frame2Filter === 'intimate' ? '2px solid #ff69b4' : '1px solid #ccc', background: frame2Filter === 'intimate' ? '#ffe0f0' : 'transparent', cursor: 'pointer'}}>😍 Intimate</button>
       <button onClick={() => setFrame2Filter('adventure')} style={{padding: '8px 16px', borderRadius: '20px', border: frame2Filter === 'adventure' ? '2px solid #4a7c59' : '1px solid #ccc', background: frame2Filter === 'adventure' ? '#d9f0e0' : 'transparent', cursor: 'pointer'}}>🏔️ Adventure</button>
     </div>
      <div className="frame-section frame-liquid-section">
        <h2 className="frame-title">💧 Frame 2: Liquid Blob Memories (No Overlapping)</h2>
        <div ref={containerRef} className="blobs-grid-container">
{125(memory => (
            <LiquidBlobCard
              key={memory.id}
              memory={memory}
              isFavorite={favorites.includes(memory.id)}
                  onFavoriteToggle={toggleFavorite}

            />
          ))}
        </div>
      </div>

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
        💫 Scroll to explore both frames • Click hearts to favorite • No overlapping!
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
    <>
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
    
    {/* Frame 2: Liquid Blob Memories */}
    <section className="frame2-section">
      <h2>\ud83d\udc95 Frame 2: Liquid Blob Memories</h2>

      {/* Filters */}
      <div className="frame2-filters">
        <button
          className={frame2Filter === 'all' ? 'active' : ''}
          onClick={() => setFrame2Filter('all')}
        >
          All
        </button>
        <button
          className={frame2Filter === 'new' ? 'active' : ''}
          onClick={() => setFrame2Filter('new')}
        >
          Just Added Today
        </button>
        <button
          className={frame2Filter === 'romantic' ? 'active' : ''}
          onClick={() => setFrame2Filter('romantic')}
        >
          Romantic
        </button>
        <button
          className={frame2Filter === 'adventure' ? 'active' : ''}
          onClick={() => setFrame2Filter('adventure')}
        >
          Adventure
        </button>
      </div>

      {/* Grid / Timeline toggle */}
      <div className="frame2-display-toggle">
        <button
          className={frame2DisplayMode === 'grid' ? 'active' : ''}
          onClick={() => setFrame2DisplayMode('grid')}
        >
          Grid
        </button>
        <button
          className={frame2DisplayMode === 'timeline' ? 'active' : ''}
          onClick={() => setFrame2DisplayMode('timeline')}
        >
          Timeline
        </button>
      </div>

      <div className={`frame2-memories frame2-memories--${frame2DisplayMode}`}>
        {getFrame2Memories().map(memory => (
          <article key={memory.id} className="blob-card">
            <div className="blob-image-wrapper">
              <img
                src={memory.src}
                alt={memory.title}
                className="blob-image"
              />
              {memory.isNew && <span className="badge-new">\ud83c\udd86 New</span>}
            </div>
            <div className="blob-content">
              <h3>{memory.title}</h3>
              <p>{memory.caption}</p>
              <div className="blob-meta">
                <span>{memory.dateLabel}</span>
                <span>{memory.categoryLabel}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
          </>
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
