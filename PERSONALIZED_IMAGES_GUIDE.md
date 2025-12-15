# 📸 PERSONALIZED IMAGES GUIDE
## Adding Your Own Photos to the Nandini Love Website

---

## 📋 OVERVIEW

This guide walks you through adding your personalized photos to the website's Gallery, Timeline, and other sections. You have two options:

1. **Option A:** Local Development Setup (Recommended for customization)
2. **Option B:** Direct GitHub Upload (Simpler but requires rebuild)

---

## OPTION A: LOCAL DEVELOPMENT SETUP ⭐ RECOMMENDED

### Prerequisites
- Node.js installed (v14+)
- Git installed
- A code editor (VSCode recommended)
- Your personal photos in JPG/PNG format

### Step 1: Clone the Repository

```bash
git clone https://github.com/aditya0kmr/nandini-love-website.git
cd nandini-love-website
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Add Your Images

**Location:** `public/assets/images/`

```
public/
├── assets/
│   └── images/
│       ├── gallery1.jpg          (Gallery images)
│       ├── gallery2.jpg
│       ├── gallery3.jpg
│       ├── gallery4.jpg
│       ├── gallery5.jpg
│       ├── gallery6.jpg
│       ├── gallery7.jpg
│       ├── gallery8.jpg
│       ├── couple1.jpg          (Timeline/Hero images)
│       ├── couple2.jpg
│       ├── couple3.jpg
│       └── memories.jpg
```

#### Image Recommendations:

**Gallery Images** (8 images, 500x500px or larger):
- High-quality couple photos
- Beautiful landscape moments
- Special occasion photos
- Candid relationship moments

**Recommended Format:**
- Format: JPG or PNG
- Size: 500x500px minimum (for gallery)
- Orientation: Square (1:1 ratio)
- File size: < 500KB each

### Step 4: Update Gallery Configuration

Edit `src/utils/imageAssets.ts`:

```typescript
export const imageAssets = {
  gallery: {
    frame1: [
      '/assets/images/gallery1.jpg',
      '/assets/images/gallery2.jpg',
      '/assets/images/gallery3.jpg',
      '/assets/images/gallery4.jpg'
    ],
    frame2: [
      '/assets/images/gallery5.jpg',
      '/assets/images/gallery6.jpg',
      '/assets/images/gallery7.jpg',
      '/assets/images/gallery8.jpg'
    ]
  },
  timeline: {
    meetingImage: '/assets/images/couple1.jpg',
    specialMoments: '/assets/images/couple2.jpg',
    futureVision: '/assets/images/couple3.jpg'
  },
  hero: {
    memories: '/assets/images/memories.jpg'
  }
};
```

### Step 5: Update Gallery Component

Edit `src/pages/GalleryPage.jsx`:

```jsx
import { imageAssets } from '../utils/imageAssets';

function GalleryPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryImages = imageAssets.gallery.frame1; // Use your images
  
  // Component will display your images in the carousel
  // ...
}
```

### Step 6: Update Timeline with Images

Edit `src/pages/TimelinePage.jsx`:

```jsx
const timelineEvents = [
  {
    title: 'FIRST MEETING',
    subtitle: 'Our Journey Begins',
    description: 'The day I realized my life was about to change forever...',
    image: imageAssets.timeline.meetingImage,
    emoji: '✨'
  },
  // ... more timeline items with your images
];
```

### Step 7: Run Development Server

```bash
npm run dev
```

Open `http://localhost:5173/` in your browser to preview the changes.

### Step 8: Test All Pages

- ✅ Check Gallery page with new images
- ✅ Verify Timeline displays images correctly
- ✅ Test responsive design on mobile
- ✅ Verify image loading speed

### Step 9: Build and Deploy

```bash
# Build for production
npm run build

# Test the build locally
npm run preview

# Deploy to GitHub Pages
git add .
git commit -m "feat: add personalized images to gallery and timeline"
git push origin main
```

---

## OPTION B: DIRECT GITHUB UPLOAD

### Step 1: Navigate to Images Folder

1. Open your repository: https://github.com/aditya0kmr/nandini-love-website
2. Navigate to `public/assets/images/`
3. Click "Add file" → "Upload files"

### Step 2: Upload Images

1. Drag and drop your images
2. Name them appropriately:
   - `gallery1.jpg`, `gallery2.jpg`, etc.
   - `couple1.jpg`, `couple2.jpg`, etc.
3. Commit the changes

### Step 3: Update Configuration Files

Same steps as Option A (Steps 4-6) but do it through GitHub's web editor.

### Step 4: Wait for Deployment

GitHub Actions will automatically rebuild and deploy your website.

---

## 🖼️ IMAGE SPECIFICATIONS

### Gallery Images
- **Aspect Ratio:** 1:1 (Square)
- **Minimum Size:** 500x500px
- **Recommended Size:** 600x600px - 1000x1000px
- **Format:** JPG (for web optimization)
- **Quality:** 80-90% (balance quality and file size)
- **Max File Size:** 500KB per image

### Timeline Images
- **Aspect Ratio:** 16:9 or 4:3 (Landscape)
- **Minimum Size:** 800x600px
- **Recommended Size:** 1200x800px
- **Format:** JPG
- **Max File Size:** 800KB per image

### Hero/Background Images
- **Aspect Ratio:** 16:9
- **Minimum Size:** 1920x1080px
- **Format:** JPG
- **Max File Size:** 1MB

---

## 🎨 IMAGE ORGANIZATION TIPS

### Gallery Organization (8 images)
```
Frame 1 (Liquid Blob - with overlapping):
1. Romantic moment photo
2. Candid laughing moment
3. Special occasion dressed up
4. Beautiful outdoor scenery

Frame 2 (Liquid Blob - no overlapping):
5. Sunset/scenic moment
6. Adventure/travel photo
7. Close-up intimate moment
8. Favorite memory photo
```

### Timeline Organization
```
First Meeting: You meeting for the first time
Magical Evening: Special date or moment
First Kiss: Important romantic moment
Getting Closer: Building relationship moment
```

---

## 🛠️ OPTIMIZATION TIPS

### Compress Images Before Upload

**Using Online Tools:**
- https://tinypng.com/ (Recommended)
- https://imagecompressor.com/
- https://www.compressjpeg.com/

**Using Command Line (ImageMagick):**
```bash
# Install ImageMagick
brew install imagemagick  # macOS

# Compress images
convert gallery1.jpg -quality 85 -resize 1000x1000 gallery1-optimized.jpg
```

### Batch Rename Images

**macOS:**
```bash
ls | awk '{print $0}' | nl | while read n f; do mv "$f" "gallery$n.jpg"; done
```

**Windows (PowerShell):**
```powershell
dir | % { Rename-Item -Path $_.FullName -NewName ("gallery{0}.jpg" -f $_) }
```

---

## ✅ CHECKLIST FOR ADDING IMAGES

- [ ] Selected 8 high-quality gallery photos
- [ ] Selected 3-4 timeline photos
- [ ] Compressed all images to optimize file size
- [ ] Renamed images with clear naming convention
- [ ] Created `public/assets/images/` folder (if not exists)
- [ ] Uploaded all images to the folder
- [ ] Updated `src/utils/imageAssets.ts` with new image paths
- [ ] Updated gallery/timeline components with image references
- [ ] Tested locally with `npm run dev`
- [ ] Built the project with `npm run build`
- [ ] Committed changes: `git commit -m "feat: add personalized images"`
- [ ] Pushed to GitHub: `git push origin main`
- [ ] Verified website displays images correctly
- [ ] Tested responsiveness on mobile devices

---

## 🐛 TROUBLESHOOTING

### Images Not Showing?

1. **Check file paths:**
   - Ensure paths in `imageAssets.ts` start with `/assets/images/`
   - Verify filenames match exactly (case-sensitive)

2. **Browser console errors:**
   - Open DevTools (F12) → Console
   - Check for 404 errors
   - Verify image URLs are correct

3. **Images loading slow:**
   - Compress images using TinyPNG
   - Check file sizes are < 500KB
   - Consider using WebP format

### Build Fails?

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### GitHub Pages Not Updated?

```bash
# Hard refresh the page
# Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

# Or clear browser cache
# Settings → Clear Browsing Data → All Time
```

---

## 🚀 ADVANCED: WebP FORMAT FOR BETTER OPTIMIZATION

### Convert Images to WebP

```bash
# Using ImageMagick
convert gallery1.jpg -quality 80 gallery1.webp

# Using cwebp (faster)
cwebp -q 80 gallery1.jpg -o gallery1.webp
```

### Update Configuration

```typescript
export const imageAssets = {
  gallery: {
    frame1: [
      '/assets/images/gallery1.webp',
      '/assets/images/gallery2.webp',
      // ... WebP images load 25-30% faster!
    ]
  }
};
```

---

## 📱 RESPONSIVE IMAGE TESTING

### Test on Different Devices

1. **Desktop:** 1920x1080 and above
2. **Tablet:** 768x1024
3. **Mobile:** 375x667 (iPhone SE)
4. **Mobile:** 414x896 (iPhone 11)

### Use DevTools Device Emulation

```
F12 → DevTools → Device Toolbar (Ctrl+Shift+M)
```

---

## 📞 SUPPORT & RESOURCES

### Helpful Links
- React Image Component: https://react.dev/reference/react-dom/components/img
- Image Optimization: https://web.dev/image-optimization/
- GitHub Pages Deployment: https://docs.github.com/en/pages
- Vite Static Assets: https://vitejs.dev/guide/assets.html

### Common React Image Patterns

```jsx
// Lazy loading images
<img src="image.jpg" loading="lazy" alt="description" />

// With error handling
<img 
  src="image.jpg" 
  alt="description" 
  onError={(e) => e.target.src = '/fallback-image.jpg'}
/>

// Responsive images
<img 
  srcSet="image-small.jpg 500w, image-large.jpg 1000w"
  sizes="(max-width: 600px) 500px, 1000px"
  src="image-large.jpg"
  alt="description"
/>
```

---

## ✨ FINAL TIPS

1. **Quality Over Quantity:** 8 beautiful images beat 20 mediocre ones
2. **Tell a Story:** Order images to show your relationship progression
3. **Mix Variety:** Include couple photos, landscapes, and special moments
4. **Keep it Fresh:** Update gallery images periodically
5. **Mobile First:** Test on mobile before publishing
6. **Optimize Always:** Compressed images = faster website = better UX

---

## 🎉 NEXT STEPS

After adding personalized images:

1. Share the website with Nandini!
2. Get feedback on image selection
3. Consider adding:
   - More photos for expanding gallery
   - Video integration
   - Photo captions or stories
   - Advanced filters or effects

---

**Happy Personalizing! 📸❤️**
