'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== '/') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -35% 0px' }
    );

    const sections = [
      'home',
      'tech-stack',
      'portfolio',
      'blog',
      'experience',
      'contact',
    ];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (href: string) => {
    if (pathname.startsWith('/blog')) {
      return href === '/#blog';
    }

    if (pathname === '/') {
      if (href === '/' && activeSection === 'home') return true;
      return href.replace('/#', '') === activeSection;
    }

    return false;
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#tech-stack', label: 'Stack' },
    { href: '/#portfolio', label: 'Portfolio' },
    { href: '/#experience', label: 'Experience' },
    { href: '/#blog', label: 'Blog' },
    { href: '/#contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className='fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none'>
        <div
          className={`
            pointer-events-auto
            relative flex items-center justify-between px-2 py-2 rounded-full transition-all duration-500 ease-out
            ${
              scrolled || isMenuOpen
                ? 'bg-card/80 backdrop-blur-md border border-border shadow-2xl w-full max-w-4xl'
                : 'bg-card/40 backdrop-blur-sm border border-border/50 w-full max-w-md md:max-w-3xl'
            }
          `}
        >
          {/* Logo */}
          <div className='pl-4 shrink-0'>
            <Link
              href='/'
              className='font-mono font-bold text-foreground tracking-tighter flex items-center gap-2'
            >
              <span className='w-2 h-2 rounded-full bg-primary animate-pulse'></span>
              JCK<span className='text-muted-foreground'>.site</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center gap-1'>
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`px-4 py-2 text-xs font-medium rounded-full transition-all ${
                  isActive(item.href)
                    ? 'text-foreground bg-muted'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side - Theme Toggle & Mobile Menu */}
          <div className='flex items-center gap-2 pr-2'>
            <ThemeToggle />

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='p-2 text-muted-foreground hover:text-foreground transition-colors md:hidden'
            >
              {isMenuOpen ? (
                <X className='w-5 h-5' />
              ) : (
                <Menu className='w-5 h-5' />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 z-40 bg-background/95 backdrop-blur-xl transition-all duration-300 md:hidden flex items-center justify-center
          ${
            isMenuOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }
        `}
      >
        <div className='flex flex-col items-center space-y-6'>
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-xl font-medium transition-colors tracking-tight font-mono ${
                isActive(item.href)
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className='pt-8 border-t border-border w-20'></div>
          <div className='text-primary font-mono text-xs'>
            initiate_contact()
          </div>
        </div>
      </div>
    </>
  );
}
