'use client';

import { useState } from 'react';
import { Check, Link2 } from 'lucide-react';

function XIcon() {
  return (
    <svg viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
      <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
      <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z' />
    </svg>
  );
}

export default function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — fail silently
    }
  };

  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(url)}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`;

  const buttonClass =
    'flex items-center justify-center w-9 h-9 rounded-full bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors';

  return (
    <div className='flex items-center gap-2'>
      <a
        href={twitterHref}
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Share on X'
        className={buttonClass}
      >
        <XIcon />
      </a>
      <a
        href={linkedinHref}
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Share on LinkedIn'
        className={buttonClass}
      >
        <LinkedInIcon />
      </a>
      <button
        type='button'
        onClick={handleCopyLink}
        aria-label='Copy link'
        className={buttonClass}
      >
        {copied ? (
          <Check className='w-4 h-4 text-green-500' />
        ) : (
          <Link2 className='w-4 h-4' />
        )}
      </button>
    </div>
  );
}
