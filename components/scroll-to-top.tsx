'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 p-3 rounded-full bg-linear-to-r from-primary to-accent text-primary-foreground shadow-lg hover:shadow-2xl hover:shadow-primary/30 hover:scale-110 transition-all duration-300 group'
          aria-label='Scroll to top'
        >
          <ArrowUp className='w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300' />
        </button>
      )}
    </>
  );
}
