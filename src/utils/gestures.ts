/**
 * Touch and responsive gesture utilities
 * Supports swipe, pinch, and pointer events with fallbacks
 */

export interface SwipeEvent {
  direction: "left" | "right" | "up" | "down";
  distance: number;
  velocity: number;
}

interface TouchStart {
  x: number;
  y: number;
  time: number;
}

const MIN_SWIPE_DISTANCE = 50;
const SWIPE_TIMEOUT = 300;

export function setupSwipeListener(
  element: HTMLElement,
  onSwipe: (event: SwipeEvent) => void
): () => void {
  let touchStart: TouchStart | null = null;

  const handleStart = (e: PointerEvent | TouchEvent) => {
    const point = (e as TouchEvent).touches?.[0] || (e as PointerEvent);
    touchStart = {
      x: point.clientX,
      y: point.clientY,
      time: Date.now(),
    };
  };

  const handleEnd = (e: PointerEvent | TouchEvent) => {
    if (!touchStart) return;
    const point = (e as TouchEvent).changedTouches?.[0] || (e as PointerEvent);
    const deltaX = point.clientX - touchStart.x;
    const deltaY = point.clientY - touchStart.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const time = Date.now() - touchStart.time;
    const velocity = distance / time;

    if (distance > MIN_SWIPE_DISTANCE && time < SWIPE_TIMEOUT) {
      const direction = Math.abs(deltaX) > Math.abs(deltaY)
        ? deltaX > 0
          ? "right"
          : "left"
        : deltaY > 0
        ? "down"
        : "up";

      onSwipe({ direction, distance, velocity });
    }
    touchStart = null;
  };

  element.addEventListener("pointerdown", handleStart);
  element.addEventListener("pointerup", handleEnd);

  return () => {
    element.removeEventListener("pointerdown", handleStart);
    element.removeEventListener("pointerup", handleEnd);
  };
}

// Prevent double-tap zoom on mobile
export function disableDoubleTapZoom(element: HTMLElement): () => void {
  let lastTap = 0;
  const handleTouchEnd = (e: TouchEvent) => {
    const now = Date.now();
    if (now - lastTap < 300) {
      e.preventDefault();
    }
    lastTap = now;
  };
  element.addEventListener("touchend", handleTouchEnd, false);
  return () => element.removeEventListener("touchend", handleTouchEnd);
}

// Detect if device supports touch
export const isTouchDevice = () => {
  return (
    typeof window !== "undefined" &&
    ("ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0)
  );
};
