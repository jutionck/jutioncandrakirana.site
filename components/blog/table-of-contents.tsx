'use client';

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

export type Heading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export default function TableOfContents({
  headings,
}: {
  headings: Heading[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -70% 0px' }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label='Table of contents' className='space-y-3'>
      <div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
        <List className='w-3.5 h-3.5' />
        On this page
      </div>
      <ul className='space-y-1 border-l border-border'>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`block border-l-2 -ml-px py-1 text-sm transition-colors ${
                heading.level === 3 ? 'pl-8' : 'pl-4'
              } ${
                activeId === heading.id
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
