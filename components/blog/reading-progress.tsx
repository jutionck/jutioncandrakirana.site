'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress({
  targetId,
}: {
  targetId: string;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const handleScroll = () => {
      const { top, height } = target.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrolled = -top;
      const scrollable = height - viewportHeight;
      const pct =
        scrollable > 0
          ? Math.min(100, Math.max(0, (scrolled / scrollable) * 100))
          : 0;
      setProgress(pct);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [targetId]);

  return (
    <div className='fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent'>
      <div
        className='h-full bg-linear-to-r from-primary via-accent to-secondary transition-[width] duration-150 ease-out'
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
