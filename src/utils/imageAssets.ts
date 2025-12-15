/**
 * Image Assets Configuration
 * Central repository for all image paths and metadata
 * Updated: Dec 15, 2025 - Fixed paths for production deployment
 */

// Gallery Images (8 images for carousel)
export const galleryImages = [
  {
    id: 1,
    text: 'Our First Beach Sunset nanniii',
    image: '/assets/images/gallery-1.jpg',
    carouselAngle: 0
  },
  {
    id: 2,
    text: "nanniii's Beautiful Smile aadi",
    image: '/assets/images/gallery-2.jpg',
    carouselAngle: 72
  },
  {
    id: 3,
    text: 'First Date Magic Forever',
    image: '/assets/images/gallery-3.jpg',
    carouselAngle: 144
  },
  {
    id: 4,
    text: 'Holding Hands Forever',
    image: '/assets/images/gallery-4.jpg',
    carouselAngle: 216
  },
  {
    id: 5,
    text: 'Adventure Together',
    image: '/assets/images/gallery-5.jpg',
    carouselAngle: 288
  },
  {
    id: 6,
    text: 'aadi Forever',
    image: '/assets/images/gallery-6.jpg',
    carouselAngle: 0
  },
  {
    id: 7,
    text: 'Sunset at the Mountains',
    image: '/assets/images/gallery-7.jpg',
    carouselAngle: 0
  },
  {
    id: 8,
    text: 'Starry Night Together',
    image: '/assets/images/gallery-8.jpg',
    carouselAngle: 0
  }
];

// Timeline Images (6 milestones)
export const timelineImages = {
  'First Meeting': '/assets/images/timeline-1.jpg',
  'First Date': '/assets/images/timeline-2.jpg',
  'First Kiss': '/assets/images/timeline-3.jpg',
  'Getting Closer': '/assets/images/timeline-4.jpg',
  'The Promise': '/assets/images/timeline-5.jpg',
  'Our Future': '/assets/images/timeline-6.jpg'
};

// Home Page Hero
export const homeHeroImage = '/assets/images/hero.jpg';

// Summary: Total images needed = 15
// Gallery: 8 images
// Timeline: 6 images
// Hero: 1 image
// All images should be placed in public/assets/images/ folder
