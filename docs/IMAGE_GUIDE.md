# Image Assets Guide

## Overview

Complete guide for adding, managing, and using images in the nandini-love-website project.

**Total Images Required: 15**

---

## Image Requirements Summary

### Gallery Page (8 Images)
- **Purpose**: Memory carousel and liquid blob displays
- **Format**: JPG, PNG, or WebP
- **Resolution**: 500px - 800px width (minimum)
- **File Size**: < 500KB each (optimize before upload)
- **Location**: `src/assets/images/gallery-1.jpg` through `gallery-8.jpg`

### Timeline Page (6 Images)
- **Purpose**: Milestone visual representations
- **Format**: JPG, PNG, or WebP
- **Resolution**: 400px - 600px width
- **File Size**: < 300KB each
- **Location**: `src/assets/images/timeline-1.jpg` through `timeline-6.jpg`

### Home Page (1 Image)
- **Purpose**: Hero section visual
- **Format**: JPG or WebP (recommended for hero)
- **Resolution**: 1200px - 1600px width
- **File Size**: < 800KB
- **Location**: `src/assets/images/hero.jpg`

---

## File Structure

```
src/
├── assets/
│   └── images/
│       ├── gallery-1.jpg
│       ├── gallery-2.jpg
│       ├── ... (gallery-3 through gallery-8)
│       ├── timeline-1.jpg
│       ├── timeline-2.jpg
│       ├── ... (timeline-3 through timeline-6)
│       └── hero.jpg
├── utils/
│   └── imageAssets.ts (centralized configuration)
└── pages/
    ├── GalleryPage.jsx
    ├── TimelinePage.jsx
    └── HomePage.jsx
```

---

## How to Add Images

### Step 1: Create Assets Folder
```bash
mkdir -p src/assets/images
```

### Step 2: Add Your Images
- Place images in `src/assets/images/` with naming convention:
  - Gallery: `gallery-1.jpg`, `gallery-2.jpg`, ... `gallery-8.jpg`
  - Timeline: `timeline-1.jpg`, `timeline-2.jpg`, ... `timeline-6.jpg`
  - Hero: `hero.jpg`

### Step 3: Update Image References
All image paths are managed in `src/utils/imageAssets.ts`. Update this file if changing paths.

---

## Image Optimization Tips

1. **Compress Before Upload**
   - Use tools like TinyPNG, ImageOptim, or Squoosh
   - Target: JPG quality 80%, 500KB max

2. **Use WebP Format** (modern browsers)
   - Smaller file size than JPG
   - Better compression
   - Fallback to JPG for older browsers

3. **Responsive Images**
   - Provide multiple sizes (mobile, tablet, desktop)
   - Use `srcset` or CSS media queries

4. **Lazy Loading**
   - Images configured in pages support lazy loading
   - Improves performance

---

## Using Images in Components

### Example: Gallery Page
```typescript
import { galleryImages } from '../utils/imageAssets';

// Images automatically loaded from galleryImages array
const memories = galleryImages; // [8 images with local paths]
```

### Example: Timeline Page
```typescript
import { timelineImages } from '../utils/imageAssets';

// Access milestone images by date
const timelineImage = timelineImages['First Meeting']; // /src/assets/images/timeline-1.jpg
```

### Example: Home Page
```typescript
import { homeHeroImage } from '../utils/imageAssets';

<img src={homeHeroImage} alt="Hero" />
```

---

## Fallback Images

If local images fail to load, external Unsplash URLs are available as fallbacks in the GalleryPage configuration.

---

## Performance Checklist

- [ ] All images compressed (< 500KB)
- [ ] All images use optimized format (WebP > JPG > PNG)
- [ ] Lazy loading enabled
- [ ] Responsive image sizes provided
- [ ] Alt text added to all images
- [ ] Image paths verified in imageAssets.ts

---

## Troubleshooting

### Images Not Loading
1. Check file paths in `imageAssets.ts`
2. Verify images exist in `src/assets/images/`
3. Check browser console for 404 errors
4. Ensure correct file extensions (.jpg, .png, .webp)

### Performance Issues
1. Reduce image file size (compress with TinyPNG)
2. Use WebP format
3. Implement lazy loading
4. Check image resolution (don't oversized)

### Missing Images
1. Add images to correct folder
2. Use exact naming convention
3. Update imageAssets.ts if needed

---

## Reference

- Central Config: `src/utils/imageAssets.ts`
- Gallery: `src/pages/GalleryPage.jsx`
- Timeline: `src/pages/TimelinePage.jsx`
- Home: `src/pages/HomePage.jsx`
