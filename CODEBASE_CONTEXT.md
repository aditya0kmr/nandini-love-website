# Nandini Love Website - Codebase Context Guide

## CRITICAL FIX APPLIED - Dec 14, 2025

**Issue**: Website showing blank page despite successful deployment
**Root Cause**: FloatingNav.jsx had improper React hook structure
**Solution**: Restructured useEffect hooks with proper closure and JSX hierarchy
**Deployment**: Commit #159 successfully deployed and marked "Active"

## CODE STRUCTURE PATTERN (MANDATORY FOR FUTURE EDITS)

ALWAYS follow this pattern in React components:
1. Imports
2. Function declaration
3. Hooks (useState, useRef, etc.)
4. useEffect hooks (with cleanup functions INSIDE)
5. JSX return statement
6. Export

NEVER mix cleanup functions with JSX returns!

## FloatingNav Component Features

### Navigation Items (9 total)
- 🏠 Home (/home) - Key: 1
- 💌 Letters (/letters) - Key: 2
- 📸 Gallery (/gallery) - Key: 3  
- 📅 Timeline (/timeline) - Key: 4
- 📝 Poems (/poems) - Key: 5
- 🎮 Games (/games) - Key: 6
- 🌟 Future (/future) - Key: 7
- ⭐ Favorites (/favorites) - Key: 8
- 💗 Her Corner (/her-corner) - Key: 9 (or press H)

### Features
- Circular orbit layout with magnetic cursor attraction
- Keyboard shortcuts: H + numbers 1-9 + arrow keys
- Smooth 3D perspective transforms
- Items expand when cursor approaches (influence radius: 200-400px)

## Key Files & Their Purpose

- `src/App.jsx` - All page routes configured here
- `src/components/FloatingNav.jsx` - Circular nav (⭐ CRITICAL)
- `src/pages/` - Individual page components
- `src/index.css` - Global styles
- `src/main.jsx` - React entry with HashRouter
- `vite.config.js` - GitHub Pages configuration

## When Editing Code

✅ DO:
- Test in browser after changes
- Keep all bracket pairs balanced
- Put cleanup functions inside useEffect
- Run `npm run build` before committing
- Check GitHub Deployments after commit

❌ DON'T:
- Mix hooks and JSX in wrong order
- Leave mismatched brackets
- Forget cleanup in event listeners
- Ignore console errors (F12)
- Commit without testing

## Quick Fixes If Blank Page

1. Check browser console (F12) for errors
2. Verify all useEffect hooks closed properly
3. Ensure JSX return is AFTER all hooks
4. Count opening/closing braces match
5. Clear cache: Ctrl+Shift+Delete, then refresh

## Last Update
Dec 14, 2025 - Fixed FloatingNav rendering issue
