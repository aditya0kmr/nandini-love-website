/**
 * Image Assets Configuration
 * Central repository for all image paths and metadata
 * Updated: Dec 15, 2025 - Mapped to actual uploaded images
 */

// Gallery Images (8 images for carousel)
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
    text: "Adventure Together 🏄",
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

// Timeline Images (6 milestones)
export const timelineImages = {
  'First Meeting': '/assets/images/1000083533.jpg',
  'First Date': '/assets/images/1000083581.heic',
  'First Kiss': '/assets/images/1000083804.jpg',
  'Getting Closer': '/assets/images/1000084230.jpg',
  'The Promise': '/assets/images/1000084362.heic',
  'Our Future': '/assets/images/1000097810.jpg'
};

// Hero Image
export const heroImage = '/assets/images/Snapchat-1687117536.jpg';

// Backup images if primary ones fail
export const fallbackImages = {
  gallery: '/assets/images/1000068755.png',
  timeline: '/assets/images/1000083533.jpg',
  hero: '/assets/images/Snapchat-1687117536.jpg'
};
