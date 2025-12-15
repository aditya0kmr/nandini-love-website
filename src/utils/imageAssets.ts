/**
 * 🖼️ COMPREHENSIVE IMAGE ASSETS CONFIGURATION
 * Central repository for ALL image paths and metadata
 * Updated: Dec 15, 2025 - Complete mapping with all uploaded personalized images
 * Every section of the website uses these optimized image references
 */

// ==================== GALLERY IMAGES ====================
// 8 beautiful carousel images for the gallery section
export const galleryImages = [
  {
    id: 1,
    text: "Our First Beach Sunset nannii",
    image: '/assets/images/1000068755.png',
    carouselAngle: 0
  },
  {
    id: 2,
    text: "nannii's Beautiful Smile aadi",
    image: '/assets/images/1000076848.jpg',
    carouselAngle: 72
  },
  {
    id: 3,
    text: "First Date Magic Forever",
    image: '/assets/images/1000077368.jpg',
    carouselAngle: 144
  },
  {
    id: 4,
    text: "Adventure Together 🏔️",
    image: '/assets/images/1000078218.heic',
    carouselAngle: 216
  },
  {
    id: 5,
    text: "Sunset Romance 🌟",
    image: '/assets/images/1000078638.jpg',
    carouselAngle: 288
  },
  {
    id: 6,
    text: "aadi Forever",
    image: '/assets/images/1000078643.jpg',
    carouselAngle: 0
  },
  {
    id: 7,
    text: "Mountain Sunset 🎴",
    image: '/assets/images/1000079164.jpg',
    carouselAngle: 72
  },
  {
    id: 8,
    text: "Starry Night Together ⭐",
    image: '/assets/images/1000080950.jpg',
    carouselAngle: 144
  }
];

// ==================== TIMELINE IMAGES ====================
// 6 milestone images showing relationship journey
export const timelineImages = {
  'First Meeting': '/assets/images/1000083533.jpg',
  'First Date': '/assets/images/1000083581.heic',
  'First Kiss': '/assets/images/1000083804.jpg',
  'Getting Closer': '/assets/images/1000084230.jpg',
  'The Promise': '/assets/images/1000084362.heic',
  'Our Future': '/assets/images/1000097810.jpg'
};

// ==================== HERO & BACKGROUND IMAGES ====================
// Primary hero image for home page
export const heroImage = '/assets/images/Snapchat-1687117536.jpg';

// Additional images for different page sections
export const pageImages = {
  home: '/assets/images/Snapchat-1687117536.jpg',
  gallery: '/assets/images/1000068755.png',
  timeline: '/assets/images/1000083533.jpg',
  letters: '/assets/images/1000084230.jpg',
  poems: '/assets/images/1000078638.jpg',
  games: '/assets/images/1000079164.jpg',
  herCorner: '/assets/images/1000076848.jpg',
  favorites: '/assets/images/1000077368.jpg'
};

// ==================== FALLBACK & BACKUP IMAGES ====================
// Fallback images if primary ones fail to load
export const fallbackImages = {
  gallery: '/assets/images/1000068755.png',
  timeline: '/assets/images/1000083533.jpg',
  hero: '/assets/images/Snapchat-1687117536.jpg',
  couple: '/assets/images/1000076848.jpg',
  landscape: '/assets/images/1000079164.jpg',
  sunset: '/assets/images/1000078638.jpg',
  adventure: '/assets/images/1000078218.heic',
  bokeh: '/assets/images/1000080950.jpg'
};

// ==================== IMAGE VARIANTS ====================
// Different sizes and variants for responsive design
export const imageVariants = {
  // High quality images
  hd: {
    gallery: '/assets/images/1000078638.jpg',
    timeline: '/assets/images/1000083533.jpg',
    hero: '/assets/images/Snapchat-1687117536.jpg'
  },
  // Medium quality for faster loading
  medium: {
    gallery: '/assets/images/1000076848.jpg',
    timeline: '/assets/images/1000084230.jpg',
    hero: '/assets/images/1000079164.jpg'
  },
  // Thumbnails
  thumb: {
    gallery: '/assets/images/1000068755.png',
    timeline: '/assets/images/1000083804.jpg',
    hero: '/assets/images/1000077368.jpg'
  }
};

// ==================== ALL IMAGES ARRAY ====================
// Complete list of all uploaded images for easy reference
export const allImages = [
  '/assets/images/1000068755.png',
  '/assets/images/1000076848.jpg',
  '/assets/images/1000077368.jpg',
  '/assets/images/1000078218.heic',
  '/assets/images/1000078638.jpg',
  '/assets/images/1000078643.jpg',
  '/assets/images/1000079164.jpg',
  '/assets/images/1000080950.jpg',
  '/assets/images/1000083533.jpg',
  '/assets/images/1000083581.heic',
  '/assets/images/1000083804.jpg',
  '/assets/images/1000084230.jpg',
  '/assets/images/1000084362.heic',
  '/assets/images/1000097810.jpg',
  '/assets/images/Snapchat-1687117536.jpg'
];

// ==================== UTILITY FUNCTIONS ====================
// Get random image from gallery
export const getRandomGalleryImage = () => {
  return galleryImages[Math.floor(Math.random() * galleryImages.length)];
};

// Get image by ID
export const getImageById = (id) => {
  return galleryImages.find(img => img.id === id)?.image || fallbackImages.gallery;
};

// Get all gallery image paths
export const getAllGalleryPaths = () => {
  return galleryImages.map(img => img.image);
};

// Get all timeline image paths
export const getAllTimelinePaths = () => {
  return Object.values(timelineImages);
};

// ==================== FRAME 2 ENHANCED MEMORIES WITH METADATA ====================
// Enhanced gallery with categories, date tracking, and visual metadata
export const frame2Memories = [
  {
    id: 1,
    text: "Our First Beach Sunset nannii",
    image: '/assets/images/1000068755.png',
    category: 'romantic',
    isNew: true,
    addedDate: '2025-12-15',
    emoji: '🌅',
    vibes: 'sunset, beach, romance'
  },
  {
    id: 2,
    text: "nannii's Beautiful Smile aadi",
    image: '/assets/images/1000076848.jpg',
    category: 'intimate',
    isNew: true,
    addedDate: '2025-12-15',
    emoji: '😍',
    vibes: 'portrait, smile, love'
  },
  {
    id: 3,
    text: "First Date Magic Forever",
    image: '/assets/images/1000077368.jpg',
    category: 'milestone',
    isNew: true,
    addedDate: '2025-12-15',
    emoji: '✨',
    vibes: 'moment, beginning, magic'
  },
  {
    id: 4,
    text: "Adventure Together 🏔️",
    image: '/assets/images/1000078218.heic',
    category: 'adventure',
    isNew: true,
    addedDate: '2025-12-15',
    emoji: '🏔️',
    vibes: 'mountains, hiking, adventure'
  },
  {
    id: 5,
    text: "Sunset Romance 🌟",
    image: '/assets/images/1000078638.jpg',
    category: 'romantic',
    isNew: false,
    addedDate: '2025-12-10',
    emoji: '🌟',
    vibes: 'sunset, romantic, golden hour'
  },
  {
    id: 6,
    text: "aadi Forever",
    image: '/assets/images/1000078643.jpg',
    category: 'intimate',
    isNew: false,
    addedDate: '2025-12-10',
    emoji: '💕',
    vibes: 'couple, love, forever'
  },
  {
    id: 7,
    text: "Mountain Sunset 🎴",
    image: '/assets/images/1000079164.jpg',
    category: 'adventure',
    isNew: false,
    addedDate: '2025-12-08',
    emoji: '🎴',
    vibes: 'landscape, nature, serene'
  },
  {
    id: 8,
    text: "Starry Night Together ⭐",
    image: '/assets/images/1000080950.jpg',
    category: 'intimate',
    isNew: false,
    addedDate: '2025-12-05',
    emoji: '⭐',
    vibes: 'night sky, stars, together'
  }
];

// ==================== CATEGORY FILTER HELPERS ====================
// Get memories by category
export const getMemoriesByCategory = (category) => {
  return frame2Memories.filter(memory => memory.category === category);
};

// Get only new memories (added today)
export const getNewMemories = () => {
  return frame2Memories.filter(memory => memory.isNew);
};

// Get all unique categories
export const getAllCategories = () => {
  return [...new Set(frame2Memories.map(memory => memory.category))];
};

// Sort memories by date (newest first)
export const getSortedMemories = (sortOrder = 'desc') => {
  const sorted = [...frame2Memories].sort((a, b) => {
    const dateA = new Date(a.addedDate);
    const dateB = new Date(b.addedDate);
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });
  return sorted;
};


// Export default configuration
export default {
  galleryImages,
  timelineImages,
  heroImage,
  pageImages,
  fallbackImages,
  imageVariants,
  allImages,
  getRandomGalleryImage,
  getImageById,
  getAllGalleryPaths,
  getAllTimelinePaths,
  frame2Memories,
  getMemoriesByCategory,
  getNewMemories,
  getAllCategories,
  getSortedMemories
};
