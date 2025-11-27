/**
 * Performance utilities for smooth animations and interactions
 */

// RequestAnimationFrame throttle - prevents layout thrashing
export function throttleRAF(callback: () => void): () => void {
  let rafId: number | null = null;
  return () => {
    if (rafId !== null) return;
    rafId = requestAnimationFrame(() => {
      callback();
      rafId = null;
    });
  };
}

// Debounce helper for resize/scroll events
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, wait);
  };
}

// Use transform instead of top/left for better perf
export function getTransformStyle(x: number, y: number, scale = 1) {
  return `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
}

// Check if animations are preferred reduced
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Lazy load images
export function lazyLoadImage(img: HTMLImageElement, src: string) {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          img.src = src;
          observer.unobserve(img);
        }
      },
      { rootMargin: "50px" }
    );
    observer.observe(img);
  } else {
    img.src = src;
  }
}

// Prevent layout shift by reserving space
export function getAspectRatioStyle(width: number, height: number) {
  const ratio = (height / width) * 100;
  return { paddingBottom: `${ratio}%` };
}
