import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TimelinePage.css';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    id: 1,
    date: 'First Meeting',
    title: '💫 Our Journey Begins',
    description: 'The day I realized my life was about to change forever. Your smile was the most beautiful thing I had ever seen.',
    icon: '✨'
  },
  {
    id: 2,
    date: 'First Date',
    title: '🌹 A Magical Evening',
    description: 'Coffee turned into hours of conversation. Every moment with you felt like a dream I didn\'t want to wake up from.',
    icon: '💕'
  },
  {
    id: 3,
    date: 'First Kiss',
    title: '💋 A Tender Moment',
    description: 'The sweetest kiss that made my heart skip a beat. In that moment, I knew you were my forever.',
    icon: '💗'
  },
  {
    id: 4,
    date: 'Getting Closer',
    title: '🎀 Building Our Love',
    description: 'Every day with you is a new adventure. Your laughter is my favorite melody.',
    icon: '🎵'
  },
  {
    id: 5,
    date: 'The Promise',
    title: '💍 Forever Starts Now',
    description: 'I promise to love you endlessly, to cherish every moment, and to make you smile every single day.',
    icon: '👑'
  },
  {
    id: 6,
    date: 'Our Future',
    title: '🌈 Endless Possibilities',
    description: 'Together, we\'ll create countless beautiful memories. With you, my love, anything is possible.',
    icon: '✨'
  }
];

function TimelinePage() {
  const [cardRefs, setCardRefs] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize refs array
    setCardRefs(arr => 
      [...Array(timelineData.length)].map((_, i) => arr[i] || useRef(null))
    );
  }, []);

  // Scroll trigger animations
  useEffect(() => {
    if (cardRefs.length === 0) return;
    
    cardRefs.forEach((ref, index) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1,
              markers: false
            }
          }
        );
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [cardRefs]);

  return (
    <div className="page timeline-page" ref={containerRef}>
      <div className="timeline-header">
        <h1>💝 Our Beautiful Timeline</h1>
        <p>Every moment with you is a precious memory</p>
      </div>
      <div className="timeline-container">
        {timelineData.map((item, index) => (
          <div
            key={item.id}
            ref={el => {
              if (cardRefs[index]) {
                cardRefs[index].current = el;
              }
            }}
            className={`timeline-card ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
          >
            <div className="timeline-icon">{item.icon}</div>
            <div className="glass-card timeline-content">
              <div className="timeline-date">{item.date}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimelinePage;
