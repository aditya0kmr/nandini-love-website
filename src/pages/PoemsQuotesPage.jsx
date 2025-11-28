import { useState, useEffect } from 'react';
import './PoemsQuotesPage.css';

// Fisher-Yates shuffle algorithm
const shuffleArray = (arr) => {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// 100 Romantic Poems
const poems = [
  "In your eyes, I find my home, a place where love will always bloom",
  "Your touch is poetry, each caress a verse I long to memorize",
  "Forever with you, is all I need to feel my heart complete",
  "You are the melody, to which my soul forever beats",
  "In the garden of my heart, you are the only flower that grows",
  "Love like ours is written in the stars above",
  "Your smile is my sunrise, waking beauty every day",
  "With you, I've found the meaning of forever",
  "You are my yesterday, my today, my all tomorrows",
  "In your arms, I find the peace I've searched for all my life",
  "Every heartbeat whispers your name, my dearest love",
  "You are the song my heart was always meant to sing",
  "In this lifetime and beyond, you're my only prayer",
  "Your love is the crown jewel of my very soul",
  "Dancing in the moonlight, lost in your embrace",
  "You are the reason my heart skips a beat",
  "Like the moon pulls the tides, you pull me closer",
  "Forever is not long enough to love you",
  "You paint my world in colors I never knew existed",
  "My darling, you are my greatest masterpiece",
  "In love with you, I've found my greatest adventure",
  "Your voice is a lullaby that soothes my weary soul",
  "Together, we are an eternal flame",
  "You are my first thought, my last thought, my only thought",
  "With you, I've discovered the true meaning of bliss",
  "Your love is a symphony that plays within my heart",
  "In the garden of eternity, you are my favorite memory",
  "You are the poetry I never knew how to write",
  "My heart belongs to you, now and forever more",
  "You are the light that guides me through the darkest nights",
  "In your presence, I feel alive in ways I never thought possible",
  "Love found me when you came into my life",
  "You are my reason, my rhyme, my every dream",
  "Together, we create a love story for the ages",
  "Your essence is what makes my existence meaningful",
  "I fell in love not just with you, but who I become when I'm with you",
  "You are the answer to every prayer my heart has ever prayed",
  "In loving you, I've learned the true definition of devotion",
  "Your love is the greatest gift my heart has ever received",
  "With every sunrise, I fall deeper in love with you",
  "You are my sanctuary, my safe harbor, my home",
  "In the story of my life, you are my favorite chapter",
  "Your love has transformed me into someone I'm proud to be",
  "I choose you, every day, in every lifetime",
  "You are the reason my dreams feel achievable",
  "Love with you feels like coming home after a long journey",
  "You are my greatest adventure and my forever destination",
  "In your eyes, I see our beautiful future unfolding",
  "My heart recognized you long before my mind caught up",
  "You are the love I've been searching for my entire life",
  "With you, forever feels like it's not nearly long enough",
  "Your love makes me believe in miracles",
  "You are my favorite reason to smile",
  "In loving you, I've discovered my life's greatest purpose",
  "You are poetry, prose, and every beautiful word",
  "Together, we are unstoppable, unshakeable, eternal",
  "Your heart beats in perfect rhythm with mine",
  "I love you not because of who you are, but who I become when I'm with you",
  "You are the one my soul was searching for",
  "In the midst of life's chaos, you are my perfect peace",
  "Your love is my greatest treasure",
  "You are my forever person",
  "With you, I've found my soulmate",
  "You are the love story I never knew I needed",
  "In your arms, I've found my home",
  "You are my greatest blessing",
  "Love found its perfect expression in you",
  "You are the reason my heart sings",
  "With every breath, I thank the universe for you",
  "You are my greatest adventure",
  "In loving you, I've discovered true happiness",
  "You are the light in my darkest moments",
  "Your love is my greatest inspiration",
  "You are my heart's truest desire",
  "Together, we create magic",
  "You are the poetry my soul has always known",
  "I love you with every fiber of my being",
  "You are my forever love",
  "In this lifetime and the next, I choose you",
  "You are the one I've been waiting for",
  "Your love completes me in ways I never imagined",
  "You are my greatest treasure",
  "With you, life feels like a beautiful dream",
  "You are the answer to my heart's deepest longings",
  "In you, I've found everything I was searching for",
  "You are my soulmate, my love, my everything",
  "Your love is the greatest gift I could ever receive",
  "You are the one my heart has always belonged to",
  "Together, we are infinite",
  "You are my greatest happiness"
];

// 100 Romantic Quotes
const quotes = [
  "The greatest love stories are those not found in books, but lived in the heart.",
  "You are my today and all of my tomorrows.",
  "Love is not found, it's created between two souls.",
  "You make me want to be a better person.",
  "In you, I found my home.",
  "Forever is not a long time when I'm with you.",
  "You are my greatest adventure.",
  "Love is a canvas furnished by nature and painted by the heart.",
  "You are my favorite notification.",
  "Every love story is beautiful, but ours is my favorite.",
  "You are my reason to smile.",
  "True love is when he doesn't know the song, but he still sings for you.",
  "I fall in love with you every single day.",
  "You are my favorite hello and my hardest goodbye.",
  "Love never dies, it only grows stronger.",
  "You are the song in my heart.",
  "With you, I found my forever.",
  "You are my favorite person to text.",
  "Love is not about finding the perfect person, it's about loving imperfectly together.",
  "You are my greatest blessing.",
  "I love you more than words could ever express.",
  "You make my heart skip a beat.",
  "Forever with you is my only wish.",
  "You are my happily ever after.",
  "Love is a friendship set to music.",
  "You are the missing piece to my puzzle.",
  "With every beat of my heart, I love you more.",
  "You are my today and all of my tomorrows.",
  "Love is when you meet someone and realize that life just got better.",
  "You are my favorite reason to be alive.",
  "True love is when you love with all your heart.",
  "You are my everything.",
  "Love is not found in books or movies, it's found in your heart.",
  "You are my forever love.",
  "I choose you, every day, for the rest of my life.",
  "You are my greatest adventure.",
  "Love is the bridge between two hearts.",
  "You are my favorite feeling.",
  "With you, life is an adventure.",
  "You are my reason to believe in love.",
  "Love is when you can't imagine life without someone.",
  "You are my favorite person in the world.",
  "Forever starts today with you.",
  "You are my greatest treasure.",
  "Love is the greatest adventure.",
  "You are my only choice.",
  "I love you more each day.",
  "You are my person.",
  "Love is a beautiful journey.",
  "You are my greatest gift.",
  "With you, I found my home.",
  "You are my favorite happy memory.",
  "Love never fails.",
  "You are my heart's desire.",
  "Forever with you is all I want.",
  "You are my greatest inspiration.",
  "Love is when you meet your best friend.",
  "You are my forever person.",
  "I love you with all my heart.",
  "You are my greatest blessing.",
  "Love is the answer.",
  "You are my favorite smile inducer.",
  "With you, anything is possible.",
  "You are my soulmate.",
  "Love is the most beautiful thing.",
  "You are my greatest joy.",
  "Forever is not enough with you.",
  "You are my favorite reason to wake up.",
  "Love is finding your home in another person.",
  "You are my heart and soul.",
  "I love you now and always.",
  "You are my greatest dream.",
  "Love is when you can't stop smiling.",
  "You are my favorite person to love.",
  "With you, love is real.",
  "You are my forever love.",
  "Love is the most powerful force in the world.",
  "You are my greatest adventure.",
  "Forever with you is my only wish.",
  "You are my favorite reason to believe.",
  "Love never fades.",
  "You are my greatest treasure.",
  "I choose you, always.",
  "You are my heart's home.",
  "Love is what makes life worth living.",
  "You are my favorite forever.",
  "With you, love is infinite.",
  "You are my greatest happiness.",
  "Love is the language of the soul.",
  "You are my only love.",
  "Forever with you feels like a beautiful dream.",
  "You are my greatest gift.",
  "Love is all you need.",
  "You are my favorite everything.",
];

function PoemsQuotesPage() {
  const [poemsShuffled, setPoemsShuffled] = useState([]);
  const [quotesShuffled, setQuotesShuffled] = useState([]);
  const [currentPoemIndex, setCurrentPoemIndex] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [isFlipping, setIsFlipping] = useState({ poem: false, quote: false });

  // Initialize shuffled arrays once on component mount
  useEffect(() => {
    setPoemsShuffled(shuffleArray(poems));
    setQuotesShuffled(shuffleArray(quotes));
  }, []);

const nextPoem = () => {
    // Trigger flip animation
    setIsFlipping({ ...isFlipping, poem: true });
    
    setCurrentPoemIndex((prev) => {
      const next = prev + 1;
      if (next >= poemsShuffled.length) {
        const newShuffled = shuffleArray(poems);
        setPoemsShuffled(newShuffled);
        // Remove flip after animation
        setTimeout(() => setIsFlipping(f => ({ ...f, poem: false })), 600);
        return 0;
      }
      // Remove flip after animation
      setTimeout(() => setIsFlipping(f => ({ ...f, poem: false })), 600);
      return next;
    });
  }


  const nextQuote = () => {
    // Trigger flip animation
    setIsFlipping({ ...isFlipping, quote: true });
    
    setCurrentQuoteIndex((prev) => {
      const next = prev + 1;
      if (next >= quotesShuffled.length) {
        const newShuffled = shuffleArray(quotes);
        setQuotesShuffled(newShuffled);
        // Remove flip after animation
        setTimeout(() => setIsFlipping(f => ({ ...f, quote: false })), 600);
        return 0;
      }
      // Remove flip after animation
      setTimeout(() => setIsFlipping(f => ({ ...f, quote: false })), 600);
      return next;
    });
  }
  const currentPoem = poemsShuffled[currentPoemIndex] || '';
  const currentQuote = quotesShuffled[currentQuoteIndex] || '';

  return (
    <div className="page poems-quotes-page">
      <div className="header-section">
        <h1>✨ Poems & Quotes ✨</h1>
        <p>Words of love and inspiration for our beautiful journey</p>
      </div>

      <div className="content-container">
        {/* Poems Section */}
        <div className="section poems-section">
          <div className="section-label">🖋️ Romantic Poem</div>
                      <div className={`glass-card poem-card ${isFlipping.poem ? 'flipping' : ''}`}>
            <p className="poem-text">"{currentPoem}"</p>
            <button className="btn btn-primary" onClick={nextPoem}>
              Next Poem →
            </button>
                        <button className="btn btn-favorite" onClick={() => {const fav = {text: currentPoem, type: 'poem', date: new Date().toLocaleString()}; let favs = JSON.parse(localStorage.getItem('favorites') || '[]'); favs.push(fav); localStorage.setItem('favorites', JSON.stringify(favs)); alert('Added to Favorites!');}}>⭐ Add to Favorites</button> title="Add this poem to your favorites"
                        
          </div>
        </div>

        {/* Quotes Section */}
        <div className="section quotes-section">
          <div className="section-label">💭 Inspiring Quote</div>
                      <div className={`glass-card quote-card ${isFlipping.quote ? 'flipping' : ''}`}>
            <p className="quote-text">"{currentQuote}"</p>
            <button className="btn btn-primary" onClick={nextQuote}>
              Next Quote →
            </button>
                        <button className="btn btn-favorite" onClick={() => {const fav = {text: currentQuote, type: 'quote', date: new Date().toLocaleString()}; let favs = JSON.parse(localStorage.getItem('favorites') || '[]'); favs.push(fav); localStorage.setItem('favorites', JSON.stringify(favs)); alert('Added to Favorites!');}}>⭐ Add to Favorites</button> title="Add this quote to your favorites"
          </div>
        </div>
      </div>
    </div>
  );
}

export default PoemsQuotesPage;


// PoemsQuotesPage component with Fisher-Yates shuffle algorithm and CSS styling
