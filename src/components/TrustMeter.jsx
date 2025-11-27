import React, { useState } from 'react';
import './TrustMeter.css';

const compliments = [
  '100% Pure Love ❤️',
  'Unconditional Trust 💕',
  'Soulmate Bond 👫',
  'Forever Connected 💑',
  'My Everything 💖',
  'Perfect Together 💝',
  'Eternally Yours 💗'
];

const TrustMeter = () => {
  const [hoveredCompliment, setHoveredCompliment] = useState(null);

  const compliment = compliments[Math.floor(Math.random() * compliments.length)];

  return (
    <div className="trust-meter-container">
      <div className="trust-meter-wrapper">
        <div className="trust-label">Our Trust Level</div>
        
        <div 
          className="trust-meter"
          onMouseEnter={() => setHoveredCompliment(compliment)}
          onMouseLeave={() => setHoveredCompliment(null)}
        >
          <div className="trust-meter-fill"></div>
          <div className="trust-meter-glow"></div>
        </div>
        
        <div className="trust-percentage">100%</div>
        
        {hoveredCompliment && (
          <div className="trust-tooltip">
            {hoveredCompliment}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrustMeter;
