import { useState, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import './FlipCard.css';

type FlipCardProps = {
  front: ReactNode;
  back: ReactNode;
  onClick?: () => void;
};

export default function FlipCard({ front, back, onClick }: FlipCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotationY: isFlipped ? 0 : 180,
      duration: 0.6,
      ease: 'back.out(1.7)',
      transformOrigin: 'center center',
    });

    setIsFlipped((prev) => !prev);
    onClick?.();
  };

  return (
    <div
      className="flip-card-container"
      onClick={handleClick}
      ref={cardRef}
    >
      <div className="flip-card">
        <div className="flip-card-front">{front}</div>
        <div className="flip-card-back">{back}</div>
      </div>
    </div>
  );
}
