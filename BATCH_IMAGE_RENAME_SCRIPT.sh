#!/bin/bash

# 🎨 BATCH IMAGE RENAME SCRIPT FOR NANDINI LOVE WEBSITE
# This script renames all uploaded images to the proper naming convention
# Gallery: gallery-1.jpg through gallery-8.jpg (8 images)
# Timeline: timeline-1.jpg through timeline-6.jpg (6 images)  
# Hero: hero.jpg (1 image)

echo "🎨 Starting batch image rename..."
echo "This script will rename all images to match the website's expected structure"
echo ""

cd public/assets/images/

echo "📁 Current directory: $(pwd)"
echo "📋 Files to rename:"
ls -1 | grep -E '\.(jpg|png|heic)$' | head -20
echo ""

# GALLERY IMAGES (8 images)
echo "🖼️  Renaming GALLERY images..."

# Get the JPG files and rename them
echo "Assigning gallery-1.jpg"
mv 1000068755.png gallery-1.jpg 2>/dev/null || echo "  (file not found)"

echo "Assigning gallery-2.jpg"
mv 1000076848.jpg gallery-2.jpg 2>/dev/null || echo "  (file not found)"

echo "Assigning gallery-3.jpg"
mv 1000077368.jpg gallery-3.jpg 2>/dev/null || echo "  (file not found)"

echo "Assigning gallery-4.jpg"
mv 1000078218.heic gallery-4.jpg 2>/dev/null || echo "  (file not found)"

echo "Assigning gallery-5.jpg"
mv 1000078638.jpg gallery-5.jpg 2>/dev/null || echo "  (file not found)"

echo "Assigning gallery-6.jpg"
mv 1000078643.jpg gallery-6.jpg 2>/dev/null || echo "  (file not found)"

echo "Assigning gallery-7.jpg"
mv 1000079164.jpg gallery-7.jpg 2>/dev/null || echo "  (file not found)"

echo "Assigning gallery-8.jpg"
mv 1000080950.jpg gallery-8.jpg 2>/dev/null || echo "  (file not found)"

# TIMELINE IMAGES (6 images)
echo ""
echo "📅 Renaming TIMELINE images..."

echo "Assigning timeline-1.jpg (First Meeting)"
mv 1000083533.jpg timeline-1.jpg 2>/dev/null || echo "  (file not found)"

echo "Assigning timeline-2.jpg (First Date)"
mv 1000083581.heic timeline-2.jpg 2>/dev/null || echo "  (file not found)"

echo "Assigning timeline-3.jpg (First Kiss)"
mv 1000083804.jpg timeline-3.jpg 2>/dev/null || echo "  (file not found)"

echo "Assigning timeline-4.jpg (Getting Closer)"
mv 1000084230.jpg timeline-4.jpg 2>/dev/null || echo "  (file not found)"

echo "Assigning timeline-5.jpg (The Promise)"
mv 1000084362.heic timeline-5.jpg 2>/dev/null || echo "  (file not found)"

echo "Assigning timeline-6.jpg (Our Future)"
mv 1000097810.jpg timeline-6.jpg 2>/dev/null || echo "  (file not found)"

# HERO IMAGE (1 image)  
echo ""
echo "🏠 Assigning HERO image..."

echo "Assigning hero.jpg (Home page background)"
if ls Snapchat-*.jpg 1> /dev/null 2>&1; then
  mv Snapchat-*.jpg hero.jpg 2>/dev/null || echo "  (file not found)"
else
  echo "  (Snapchat file not found, skipping)"
fi

echo ""
echo "✅ Renaming complete!"
echo ""
echo "📊 Renamed files:"
ls -1 | grep -E '^(gallery-|timeline-|hero\.jpg)' | sort
echo ""
echo "🎉 Your images are now properly organized!"
echo "⏳ GitHub Actions will automatically deploy the website..."
echo "⏸  Check the Actions tab in 2-3 minutes to verify deployment"
echo ""
echo "✨ Next steps:"
echo "1. Commit these renamed files: git add . && git commit -m 'refactor: rename images to standardized convention'"
echo "2. Push to GitHub: git push origin main"
echo "3. Visit: https://aditya0kmr.github.io/nandini-love-website/"
echo "4. Share with Nandini! 💕"
