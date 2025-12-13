import { lazy, Suspense, FC, ReactNode } from 'react';
import { LoadingSpinner } from '../components/LoadingSpinner';

/**
 * Lazy Load Utility for Code Splitting
 * Improves performance by splitting pages and heavy components into separate bundles
 */

// Lazy load page components
export const lazyLoadPage = (importFunc: () => Promise<any>) => {
  const Component = lazy(importFunc);
  
  return (props: any) => (
    <Suspense fallback={<LoadingSpinner />}>
      <Component {...props} />
    </Suspense>
  );
};

// Lazy load with custom fallback
export const lazyLoadComponent = (
  importFunc: () => Promise<any>,
  fallback?: ReactNode
) => {
  const Component = lazy(importFunc);
  
  return (props: any) => (
    <Suspense fallback={fallback || <LoadingSpinner />}>
      <Component {...props} />
    </Suspense>
  );
};

// Image lazy loading utility
export const useLazyImage = (src: string, alt: string = '') => {
  return {
    src,
    alt,
    loading: 'lazy' as const,
    decoding: 'async' as const
  };
};

// Intersection Observer for images
export const useIntersectionObserver = (
  ref: React.RefObject<HTMLImageElement>,
  onVisible: () => void
) => {
  React.useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onVisible();
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, onVisible]);
};

// Example usage in pages:
/*
Example 1: Lazy load a page component
const HomePage = lazyLoadPage(() => import('./HomePage'));

Example 2: Lazy load with custom fallback
const GalleryPage = lazyLoadComponent(
  () => import('./GalleryPage'),
  <div>Loading gallery...</div>
);

Example 3: Lazy load images
<img {...useLazyImage('/images/gallery-1.jpg', 'Gallery image')} />

Example 4: Use intersection observer for manual control
const imageRef = useRef<HTMLImageElement>(null);
useIntersectionObserver(imageRef, () => {
  // Image is visible, trigger action
});
<img ref={imageRef} src="..." />
*/

export default lazyLoadComponent;
