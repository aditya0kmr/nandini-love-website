# Global Systems & Polishing Guide

Comprehensive implementation guide for persistent data, compliments, settings, and accessibility.

## Overview

This project includes a complete global systems layer for smooth animations, persistent user preferences, accessibility compliance, and mobile responsiveness.

## Core Components

### 1. Persistent Data: `useLocalStorage` Hook

**Location:** `src/hooks/useLocalStorage.ts`

Manages persistent state across browser sessions with automatic serialization.

```typescript
import { useLocalStorage } from "../hooks/useLocalStorage";

function MyComponent() {
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);
  
  const toggleFavorite = (id: string) => {
    setFavorites(
      favorites.includes(id)
        ? favorites.filter(fav => fav !== id)
        : [...favorites, id]
    );
  };
  
  return (
    <button onClick={() => toggleFavorite("poem-1")}>
      {favorites.includes("poem-1") ? "❤️ Favorited" : "🤍 Favorite"}
    </button>
  );
}
```

### 2. Global Compliment System: `ComplimentContext`

**Location:** `src/context/ComplimentContext.tsx`

Triggered on key user actions (reading poems, winning games, favoriting). No immediate repeats.

**Setup in App.tsx:**

```typescript
import { ComplimentProvider } from "./context/ComplimentContext";

function App() {
  return (
    <ComplimentProvider>
      {/* Your app content */}
    </ComplimentProvider>
  );
}
```

**Usage:**

```typescript
import { useCompliments } from "../context/ComplimentContext";

function PoemCard() {
  const { triggerCompliment } = useCompliments();
  
  const handleReadPoem = () => {
    // ... read poem logic
    triggerCompliment();
  };
  
  return <button onClick={handleReadPoem}>Read Poem</button>;
}
```

### 3. Settings Management: `useSettings` Hook

**Location:** `src/hooks/useSettings.ts`

Customizable toggles for sound effects and animations.

**Usage:**

```typescript
import { useSettings } from "../hooks/useSettings";

function GameComponent() {
  const [settings] = useSettings();
  
  useEffect(() => {
    if (settings.animationsEnabled) {
      // Run GSAP animations
    }
    if (settings.soundEnabled) {
      // Play sound effect
    }
  }, [settings]);
}
```

### 4. Settings Panel Component

**Location:** `src/components/SettingsPanel.tsx`

Accessible UI for users to control experience preferences.

```typescript
import { SettingsPanel } from "../components/SettingsPanel";

function App() {
  return (
    <>
      <SettingsPanel />
      {/* Rest of app */}
    </>
  );
}
```

## Performance Utilities

**Location:** `src/utils/performance.ts`

- `throttleRAF()` - Prevents layout thrashing
- `debounce()` - Debounces resize/scroll events
- `prefersReducedMotion()` - Respects user's motion preferences
- `lazyLoadImage()` - Lazy loads images with IntersectionObserver
- `getAspectRatioStyle()` - Prevents layout shift

**Example:**

```typescript
import { prefersReducedMotion } from "../utils/performance";

function AnimatedComponent() {
  const reducedMotion = prefersReducedMotion();
  
  return (
    <div
      style={{
        animation: reducedMotion ? "none" : "fadeIn 0.6s ease-out",
      }}
    >
      Content
    </div>
  );
}
```

## Responsive & Touch Gestures

**Location:** `src/utils/gestures.ts`

- `setupSwipeListener()` - Handles swipe gestures
- `disableDoubleTapZoom()` - Prevents unwanted zoom
- `isTouchDevice()` - Detects touch support

**Example:**

```typescript
import { setupSwipeListener } from "../utils/gestures";

function Carousel() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    return setupSwipeListener(ref.current, (event) => {
      if (event.direction === "left") {
        // Go to next slide
      } else if (event.direction === "right") {
        // Go to previous slide
      }
    });
  }, []);
  
  return <div ref={ref}>Carousel content</div>;
}
```

## Accessibility Compliance

**Location:** `src/styles/global-accessibility.css`

### Features

- **WCAG AA Compliance** - 4.5:1 minimum contrast ratio
- **Focus Indicators** - Pink (#ff9a9e) outline for keyboard navigation
- **Prefers Reduced Motion** - Respects user's animation preferences
- **High Contrast Mode** - Supports high contrast displays
- **Dark Mode Support** - Adapts to system preference
- **Skip-to-main Link** - Hidden by default, visible on focus
- **Scrollbar Styling** - Custom scrollbar with accessibility consideration

### Import in your app:

```typescript
import "../styles/global-accessibility.css";
```

## Full App Integration Example

```typescript
// App.tsx
import { ComplimentProvider } from "./context/ComplimentContext";
import { SettingsPanel } from "./components/SettingsPanel";
import "./styles/global-accessibility.css";

function App() {
  return (
    <ComplimentProvider>
      <div className="app">
        <header>
          <h1>For My Love - Nandini</h1>
          <SettingsPanel />
        </header>
        <main>
          {/* Your pages and components */}
        </main>
      </div>
    </ComplimentProvider>
  );
}

export default App;
```

## Best Practices

### 1. Persistent Storage
- Use meaningful key names (e.g., "poem-favorites", "user-preferences")
- Always provide sensible defaults
- Handle JSON parsing errors gracefully

### 2. Compliments
- Trigger after meaningful user actions only
- Randomize without immediate repeats
- Keep messages positive and personal
- Display for 3-4 seconds for readability

### 3. Performance
- Use `prefers-reduced-motion` to respect user settings
- Use `transform` and `opacity` instead of layout properties
- Lazy load images to reduce initial load
- Throttle RAF callbacks to prevent jank

### 4. Accessibility
- Always include `aria-label` on icon-only buttons
- Use `role="region"` for custom sections
- Ensure 4.5:1 color contrast (WCAG AA)
- Test with keyboard navigation
- Support screen readers with proper semantics

### 5. Mobile Responsiveness
- Use pointer events instead of mouse events
- Support both touch and mouse
- Test on multiple screen sizes
- Prevent zoom on double-tap when needed

## Testing

### Accessibility Testing
- Use browser DevTools accessibility panel
- Test with screen reader (NVDA, JAWS)
- Verify keyboard navigation
- Check color contrast with tools like WebAIM

### Performance Testing
- Use Lighthouse CI
- Monitor FPS with DevTools Performance tab
- Check for layout thrashing
- Test on slow 3G networks

### Mobile Testing
- Test on real devices
- Verify touch interactions
- Check responsiveness across breakpoints
- Test with reduced motion enabled

## File Structure

```
src/
├── hooks/
│   ├── useLocalStorage.ts
│   └── useSettings.ts
├── context/
│   └── ComplimentContext.tsx
├── components/
│   └── SettingsPanel.tsx
├── utils/
│   ├── performance.ts
│   └── gestures.ts
└── styles/
    └── global-accessibility.css
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

All modern APIs used have polyfills or fallbacks included.

## Contributing

When adding new features:
1. Consider accessibility implications
2. Respect reduced motion preferences
3. Optimize for performance
4. Test on mobile devices
5. Ensure localStorage is used appropriately
