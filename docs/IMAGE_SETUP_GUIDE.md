# 📸 Image Setup Guide - STEP 3B

## Quick Start (LOCAL SETUP)

Since GitHub doesn't support bulk image uploads well via web interface, follow these simple steps on your machine:

### 1️⃣ Clone Your Repository Locally

```bash
git clone https://github.com/aditya0kmr/nandini-love-website.git
cd nandini-love-website
```

### 2️⃣ Download Romantic Couple Images

**Best Sources (All FREE):**
- Unsplash: https://unsplash.com/s/photos/romantic-couple
- Pexels: https://www.pexels.com/search/romantic%20couple
- Pixabay: https://pixabay.com/search/romantic%20couple

**Recommended Images to Download:**

#### Gallery Images (8 - Square 750x750px):
1. Couple at sunset beach
2. Beautiful couple smiling
3. First kiss moment
4. Holding hands
5. Adventure/hiking couple
6. Romantic dinner date
7. Mountain sunset couple
8. Starry night couple

#### Timeline Images (6 - Landscape 600x400px):
1. First meeting scene
2. First date moment
3. First kiss
4. Growing closer
5. Making promises
6. Future together vision

#### Hero Image (1 - Wide 1200x600px):
- Beautiful couple hero shot

### 3️⃣ Prepare Images (Optional but Recommended)

```bash
# Optimize file sizes:
# Use TinyPNG.com OR
# Use ImageOptim (Mac) or PicResize (online)
# Target: ~300-500KB per image
```

### 4️⃣ Add Images to Your Project

```bash
# Copy images to the assets folder
cp ~/Downloads/photo1.jpg public/assets/images/gallery-1.jpg
cp ~/Downloads/photo2.jpg public/assets/images/gallery-2.jpg
# ... repeat for all 15 images
```

**Or manually:**
- Navigate to `public/assets/images/`
- Paste your 15 images here
- Match filenames EXACTLY:
  - `gallery-1.jpg` to `gallery-8.jpg`
  - `timeline-1.jpg` to `timeline-6.jpg`
  - `hero.jpg`

### 5️⃣ Test Locally

```bash
# Install dependencies (if first time)
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in browser
```

**Test these pages:**
- ✅ HomePage (should show hero image)
- ✅ Gallery (8 images carousel)
- ✅ Timeline (6 milestone images)
- ✅ All interactions working
- ✅ Dark/Light mode toggle

### 6️⃣ Commit and Push

```bash
# Stage images
git add public/assets/images/

# Commit
git commit -m "feat: add 15 romantic couple photos to gallery and timeline"

# Push to GitHub
git push origin main
```

### 7️⃣ Watch GitHub Actions Deploy

- Go to Actions tab on GitHub
- Watch build process (2-3 mins)
- Website live at: `https://aditya0kmr.github.io/nandini-love-website`

---

## 🎁 What You Get

Once deployed with images:

✨ **HomePage** - Beautiful hero image  
📸 **Gallery** - 8 carousel images with smooth animations  
📅 **Timeline** - 6 milestone memories with images  
💌 **Love Letters** - Personal romantic content  
🎮 **Games** - 5 interactive games  
📝 **Her Corner** - Save thoughts & dreams  
🌙 **Dark Mode** - Theme toggle  
💾 **Auto-Save** - Data persistence  

---

## ⚡ Alternative: Use Sample Images

If you don't have couple photos yet:

1. Skip adding personal images
2. Website will use Unsplash fallback images
3. All features still work beautifully
4. Add personal photos anytime later!

---

## 📞 Need Help?

If images don't show:
1. Check filename spelling exactly
2. Verify images are in `public/assets/images/`
3. Clear browser cache (Ctrl+Shift+Del)
4. Check console (F12) for errors

**Website is ready - just add images and deploy!** 🚀
