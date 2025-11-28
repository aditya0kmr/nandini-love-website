import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './GalleryPage.css';
import LiquidBlob from '../components/LiquidBlob';

const GalleryPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [blobs, setBlobs] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const memories = [
    { id: 1, text: 'Our First Beach Sunset 🌅', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', favorite: false },
    { id: 2, text: "nanniii's Beautiful Smile 😍", image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400', favorite: true },
    { id: 3, text: 'First Date Magic ✨', image: 'https://images.unsplash.com/photo-1516589178581-a70e2083893c?w=400', favorite: false },
    { id: 4, text: 'Holding Hands Forever 💕', image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400', favorite: false },
    { id: 5, text: 'Adventure Together 🏔️', image: 'https://images.unsplash.com/photo-1464822759023-fed622b4e443?w=400', favorite: false },
    { id: 6, text: 'aadi ❤️ nanniii Forever', image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400', favorite: true }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('galleryFavorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (containerRef.current && memories.length > 0) {
      const newBlobs = memories.map((memory, index) => ({
        id: memory.id,
        x: 100 + index * 150 + Math.random() * 100,
        y: 150 + index * 100 + Math.random() * 100,
        size: 220 + Math.random() * 80,
        image: memory.image,
        text: memory.text,
        isDragging: false,
        favorite: favorites.includes(memory.id)
      }));
      setBlobs(newBlobs);
    }
  }, []);

  const toggleFavorite = useCallback((blobId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(blobId) 
        ? prev.filter(id => id !== blobId)
        : [...prev, blobId];
      
      localStorage.setItem('galleryFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });

    setBlobs(prev => prev.map(blob => 
      blob.id === blobId 
        ? { ...blob, favorite: !blob.favorite }
        : blob
    ));
  }, [favorites]);

  const nextPage = () => {
    navigate('/timeline');
  };

  return (
    <div className="gallery-page">
      <div className="page-hero">
        <h1 className="ink-reveal title-3d">Our Liquified Memories 💧✨</h1>
        <p className="hero-subtitle">Drag, click, and fall in love again, nanniii</p>
      </div>

      <div ref={containerRef} className="blob-container">
        {blobs.map(blob => (
          <LiquidBlob
            key={blob.id}
            blob={blob}
            containerRef={containerRef}
            onFavoriteToggle={toggleFavorite}
            memories={memories}
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
        💫 Drag blobs • Click for hearts • Hover for ripples
      </div>
    </div>
  );
};

export default GalleryPage;
