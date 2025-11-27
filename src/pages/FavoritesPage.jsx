import React, { useState, useEffect } from 'react';
import './FavoritesPage.css';

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading favorites:', e);
      }
    }
  };

  const removeFavorite = (id) => {
    const updated = favorites.filter(f => f.id !== id);
    localStorage.setItem('favorites', JSON.stringify(updated));
    setFavorites(updated);
    if (window.showCompliment) {
      window.showCompliment('💔 Removed from favorites');
    }
  };

  return (
    <div className="page favorites-page">
      <h1>💕 Saved Moments</h1>
      <p>Memories and moments we cherish together</p>

      <div className="favorites-container">
        {favorites.length > 0 ? (
          <div className="favorites-grid">
            {favorites.map(fav => (
              <div key={fav.id} className="favorite-card glass-card">
                {fav.imageUrl && (
                  <img src={fav.imageUrl} alt={fav.title} className="fav-image" />
                )}
                <div className="fav-content">
                  <h3>{fav.title}</h3>
                  {fav.description && <p>{fav.description}</p>}
                  <small className="fav-date">
                    {new Date(fav.addedAt).toLocaleDateString()}
                  </small>
                </div>
                <button
                  onClick={() => removeFavorite(fav.id)}
                  className="remove-fav-btn"
                  title="Remove from favorites"
                >
                  ❤️
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-favorites">
            <p>🌟 No favorites yet. Mark your favorite moments to save them here!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;
