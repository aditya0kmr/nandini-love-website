# Interactive Pages Guide

Comprehensive documentation for Future, Her Corner, and Favorites pages with drag-and-drop, animations, and persistence.

## Overview

These pages form the interactive heart of the romantic experience, enabling shared dream-building, personal message collection, and celebration of favorites.

## Page 1: Future - Shared Dream Vision

**Location:** `src/pages/Future.tsx`

### Features

- **Draggable Dream Cards**: 6 customizable dream categories
  - Dream Trip (✈️)
  - Our Home (🏠)
  - Forever (💍)
  - Family (👨‍👩‍👧)
  - Goals (🎯)
  - Memories (📸)

- **Drop Zone**: Beautiful visual area for shared dreams
- **Sparkle Effects**: Pink sparkles on successful drops
- **Heart Animations**: Floating hearts celebrate each dream
- **Progress Tracking**: Visual counter of dreams shared
- **Persistent Storage**: Dreams saved in localStorage
- **Auto Compliments**: Affirming messages on each drop

### Implementation

```typescript
import Future from "./pages/Future";

function App() {
  return (
    <>
      <Route path="/future" element={<Future />} />
    </>
  );
}
```

### Usage

1. User drags dream cards from left side
2. Drop into the "Our Vision" zone
3. Sparkles + hearts animate
4. Compliment appears
5. Count updates
6. Dream persists in localStorage

### Customization

Edit the `DREAMS` array in Future.tsx:

```typescript
const DREAMS = [
  { id: "custom", emoji: "🎨", title: "Custom Dream", description: "Description" },
  // ...
];
```

### Drag-and-Drop Utilities

**Desktop Support** (via `src/utils/dnd.ts`):
- HTML5 Drag API
- Visual feedback on hover
- Pink border + background when over drop zone

**Mobile Support** (Touch):
- Touch start/end detection
- Fallback for devices without HTML5 drag
- Same visual feedback

### Animation Effects

**Sparkle Animation** (via `src/utils/sparkles.ts`):
- 20 particles spread radially
- Pink glow (#ff9a9e) with glow effect
- 0.6-1.0s duration with easing
- Natural velocity decay

**Heart Animation**:
- 15 heart emojis (❤)
- Upward bias for emotional impact
- Slight rotation and scale
- 1-1.5s floating trajectory

### Performance

- Uses `requestAnimationFrame` for smooth animations
- Respects `prefers-reduced-motion` setting
- No layout thrashing
- Cleanup after animation completes

---

## Page 2: Her Corner - Personal Message Center

**Location:** `src/pages/HerCorner.tsx`

### Features

- **Three Note Types**:
  - 📝 Notes - Thoughts and feelings
  - 💫 Dreams - Future aspirations
  - 👏 Promises - Commitments to her

- **Rich Text Input**: Textarea for longer thoughts
- **Type Selection**: Dropdown to categorize
- **Timestamp Tracking**: Automatic date/time on save
- **Deletion**: Remove notes individually
- **Empty State**: Friendly encouragement
- **Full Persistence**: All notes in localStorage
- **Auto-Compliment**: Feedback on each save

### Implementation

```typescript
import HerCorner from "./pages/HerCorner";

function App() {
  return (
    <>
      <Route path="/her-corner" element={<HerCorner />} />
    </>
  );
}
```

### Data Structure

```typescript
interface Note {
  id: string;              // Timestamp-based unique ID
  text: string;            // User's message
  timestamp: number;       // When saved (milliseconds)
  type: "dream" | "note" | "promise";  // Categorization
}
```

### Usage

1. Open "Her Corner" page
2. Select note type from dropdown
3. Write message in textarea
4. Click "Save to Her Corner"
5. Note appears at top of list with timestamp
6. Delete anytime with × button

### Customization

Modify note types:

```typescript
// In HerCorner.tsx, update getTypeIcon()
const getTypeIcon = (t: string) => {
  switch (t) {
    case "custom":
      return "🎨";
    // ...
  }
};
```

### localStorage Structure

```json
{
  "her-corner-notes": [
    {
      "id": "1700000000000",
      "text": "I love spending time with you...",
      "timestamp": 1700000000000,
      "type": "note"
    }
  ]
}
```

### Accessibility

- Labeled form fields with `aria-label`
- `role="region"` on notes list
- Time elements with semantic `<time>` tags
- Delete buttons with clear labels
- Keyboard navigable (Tab through all controls)

---

## Page 3: Favorites - Celebration Hub

**Location:** `src/pages/FavoritesPage.tsx` (existing)

### Features

- **Unified Favorites Display**:
  - Saved poems with dates
  - Favorite quotes grouped by theme
  - Love letters with quick preview
  - Gallery photos with lightbox

- **Quick Navigation**: Filter by type
- **Persistent Storage**: Uses `useLocalStorage`
- **Search Functionality**: Find favorites by keyword
- **Share Integration**: Copy or share links
- **Empty States**: Encouraging messages

### Implementation

```typescript
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <>
      <Route path="/favorites" element={<FavoritesPage />} />
    </>
  );
}
```

### Integration with Other Pages

**From Poems/Quotes/Letters**:
```typescript
// Add favorite button
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useCompliments } from "../context/ComplimentContext";

function PoemCard({ poemId, title }) {
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);
  const { triggerCompliment } = useCompliments();
  
  const toggleFavorite = () => {
    if (favorites.includes(poemId)) {
      setFavorites(favorites.filter(id => id !== poemId));
    } else {
      setFavorites([...favorites, poemId]);
      triggerCompliment(); // Celebrate the favorite!
    }
  };
  
  return (
    <button onClick={toggleFavorite}>
      {favorites.includes(poemId) ? "❤️ Favorited" : "🤍 Favorite"}
    </button>
  );
}
```

---

## localStorage Keys Reference

| Key | Type | Description |
|-----|------|-------------|
| `dropped-dreams` | `string[]` | Dream IDs that have been dropped |
| `her-corner-notes` | `Note[]` | All notes, dreams, and promises |
| `favorites` | `string[]` | IDs of all favorited content |
| `app-settings` | `Settings` | Sound and animation preferences |

---

## Utilities Used

### Drag-and-Drop (`src/utils/dnd.ts`)
- `setupDragAndDrop()` - Desktop HTML5 API
- `setupTouchDrag()` - Mobile fallback
- Returns cleanup function for unmounting

### Animations (`src/utils/sparkles.ts`)
- `createSparkles(x, y, count)` - Radial sparkle burst
- `createHearts(x, y, count)` - Floating hearts
- Dynamically injects CSS animations

### Hooks
- `useLocalStorage()` - Persisted state
- `useCompliments()` - Trigger random affirmations
- `useSettings()` - Respect animation preferences

---

## Styling Considerations

### Future Page
- Dream cards: Glassmorphism with gradients
- Drop zone: Animated border on hover
- Sparkles: GPU-accelerated transforms

### Her Corner
- Note cards: Soft shadows, rounded corners
- Input section: Clear focus states
- Delete button: Icon only, accessible

### Favorites
- Grid layout responsive (1-3 columns)
- Card shadows on hover
- Lightbox overlay for photos

---

## Best Practices

### Data Management
1. Always validate localStorage data on read
2. Provide sensible defaults
3. Handle quota errors gracefully
4. Clear old data after 1 year

### UX
1. Provide feedback for every action
2. Confirm destructive actions
3. Show empty states helpfully
4. Use emojis for visual clarity

### Performance
1. Debounce input events
2. Lazy load gallery images
3. Cleanup event listeners on unmount
4. Use CSS transforms for animations

### Accessibility
1. All inputs have labels
2. Focus states are visible
3. Colors aren't the only indicator
4. Mobile-friendly touch targets
5. Screen reader friendly alt text

---

## Testing Checklist

- [ ] Desktop: Drag and drop works smoothly
- [ ] Mobile: Touch drag and drop works
- [ ] Animations respects `prefers-reduced-motion`
- [ ] localStorage persists across page reloads
- [ ] Deleting items removes from storage
- [ ] Empty states display correctly
- [ ] All favorites sync across pages
- [ ] Keyboard navigation works
- [ ] Touch events work on mobile browsers
- [ ] Performance is smooth (60 FPS)

---

## Future Enhancements

1. **Export/Import**: Download all memories as JSON
2. **QR Code Sharing**: Share future dreams with link
3. **Collaborative Mode**: Real-time sync between devices
4. **Photo Upload**: Add images to messages
5. **Voice Messages**: Record audio notes
6. **Timeline View**: Visual history of all notes
7. **Analytics**: "Year in review" statistics
8. **Print**: Beautiful print version of favorites
