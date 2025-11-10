'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
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

  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  return (
    <button
      onClick={() => {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
      }}
      className='p-2 rounded-lg glass hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 group'
      aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {currentTheme === 'dark' ? (
        <Sun className='w-5 h-5 text-accent group-hover:rotate-180 transition-transform duration-500' />
      ) : (
        <Moon className='w-5 h-5 text-accent group-hover:-rotate-12 transition-transform duration-300' />
      )}
    </button>
  );
}
