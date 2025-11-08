'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/tech-stack', label: 'Tech Stack' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Blog' },
    { href: '/experience', label: 'Experience' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className='sticky top-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/80'>
      <nav className='max-w-6xl mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <Link
            href='/'
            className='text-2xl font-bold bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity'
          >
            JCK
          </Link>

          <div className='flex items-center gap-4'>
            {/* Desktop Navigation */}
            <ul className='hidden md:flex items-center gap-8 text-sm font-medium'>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`transition-all duration-300 ease-out pb-2 border-b-2 ${
                      isActive(link.href)
                        ? 'text-accent border-accent'
                        : 'text-muted-foreground hover:text-foreground border-transparent'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='md:hidden p-2 rounded-lg glass hover:border-accent/50 transition-colors'
              aria-label='Toggle menu'
            >
              {isMenuOpen ? (
                <X className='w-5 h-5' />
              ) : (
                <Menu className='w-5 h-5' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='md:hidden mt-4 pb-4'>
            <ul className='flex flex-col gap-4'>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-2 px-4 rounded-lg transition-all duration-300 ${
                      isActive(link.href)
                        ? 'bg-accent/10 text-accent font-semibold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
