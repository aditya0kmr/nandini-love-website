import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './GalleryPage.css';

const GalleryPage = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  const memories = [
    { id: 1, text: 'Our First Beach Sunset 🌅', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
    { id: 2, text: "nanniii's Beautiful Smile 😍", image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400' },
    { id: 3, text: 'First Date Magic ✨', image: 'https://images.unsplash.com/photo-1516589178581-a70e2083893c?w=400' },
    { id: 4, text: 'Holding Hands Forever 💕', image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400' },
    { id: 5, text: 'Adventure Together 🏔️', image: 'https://images.unsplash.com/photo-1464822759023-fed622b4e443?w=400' },
    { id: 6, text: 'aadi ❤️ nanniii Forever', image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400' }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('galleryFavorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = useCallback((memoryId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(memoryId) 
        ? prev.filter(id => id !== memoryId)
        : [...prev, memoryId];
      
      localStorage.setItem('galleryFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const nextPage = () => {
    navigate('/timeline');
  };

  return (
    <div className="gallery-page">
      <div className="page-hero">
        <h1 className="ink-reveal title-3d">Our Liquified Memories 💧✨</h1>
        <p className="hero-subtitle">Scroll and cherish our beautiful moments together</p>
      </div>

      <div className="blob-container">
        {memories.map(memory => (
          <BlobCard
            key={memory.id}
            memory={memory}
            isFavorite={favorites.includes(memory.id)}
            onToggleFavorite={() => toggleFavorite(memory.id)}
          />
        ))}
      </div>

      <div className="favorites-section">
        <h3 className="favorites-title">
          💖 Your Favorite Memories ({favorites.length})
        </h3>
        <div className="favorites-grid">
          {favorites.map(id => {
            const memory = memories.find(m => m.id === id);
            return memory ? (
              <div key={id} className="favorite-card">
                <img src={memory.image} alt={memory.text} />
                <span>{memory.text}</span>
              </div>
            ) : null;
          })}
        </div>
      </div>

      <button className="next-page-btn ribbon-variant" onClick={nextPage}>
        <span>→ Timeline Journey</span>
        <div className="ribbon-trail"></div>
      </button>

      <div className="instructions">
        💫 Click hearts • Scroll to explore • Build your collection
      </div>
    </div>
  );
};

const BlobCard = ({ memory, isFavorite, onToggleFavorite }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <div className="liquid-blob-card">
      <div className="blob-wrapper">
        <img src={memory.image} alt={memory.text} className="blob-image" loading="lazy" />
        <div className="blob-overlay"></div>
      </div>
      <div className="blob-content">
        <p className="blob-text">{memory.text}</p>
        <div className="favorite-heart" onClick={handleClick}>
          {isFavorite ? '💖' : '🤍'}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
