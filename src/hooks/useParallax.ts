import { RefObject, useEffect } from 'react';

export const useParallax = (
  ref: RefObject<HTMLElement>,
  speed = 0.5
): void => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const element = ref.current;
      if (!element) return;
      const scrollPosition = window.scrollY || window.pageYOffset || 0;
      element.style.transform = `translateY(${scrollPosition * speed}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, speed]);
};
