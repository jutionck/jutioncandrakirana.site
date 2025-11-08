'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className='p-2 rounded-lg glass' aria-label='Toggle theme'>
        <div className='w-5 h-5' />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='p-2 rounded-lg glass hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 group'
      aria-label='Toggle theme'
    >
      {theme === 'dark' ? (
        <Sun className='w-5 h-5 text-accent group-hover:rotate-180 transition-transform duration-500' />
      ) : (
        <Moon className='w-5 h-5 text-accent group-hover:-rotate-12 transition-transform duration-300' />
      )}
    </button>
  );
}
