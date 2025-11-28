import { useRef, useEffect, useCallback } from 'react';

const LiquidBlob = ({ blob, containerRef, onFavoriteToggle, memories }) => {
  const elementRef = useRef(null);
  const imgRef = useRef(null);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    onFavoriteToggle(blob.id);
  }, [blob.id, onFavoriteToggle]);

  return (
    <div 
      ref={elementRef}
      className={`liquid-blob ${blob.favorite ? 'favorite-active' : ''}`}
      style={{
        left: `${blob.x}px`,
        top: `${blob.y}px`,
        width: `${blob.size}px`,
        height: `${blob.size}px`,
        animationDelay: `${Math.random() * 2}s`
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <img ref={imgRef} src={blob.image} alt={blob.text} className="blob-image" loading="lazy" />
      <div className="blob-text">{blob.text}</div>
      <div className="favorite-heart" onClick={handleClick}>
        {blob.favorite ? '💖' : '🤍'}
      </div>
    </div>
  );
};

export default LiquidBlob;
