'use client';

import { isValidElement, useState, type ReactElement, type ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';

import { extractReactText } from '@/lib/react-text';

export default function CodeBlock({ children }: { children: ReactNode }) {
  const [copied, setCopied] = useState(false);

  const codeElement = isValidElement<{ className?: string; children?: ReactNode }>(
    children
  )
    ? (children as ReactElement<{ className?: string; children?: ReactNode }>)
    : null;
  const className = codeElement?.props.className || '';
  const match = /language-(\w+)/.exec(className);
  const language = match ? match[1] : 'text';
  const codeText = extractReactText(
    codeElement?.props.children ?? children
  ).replace(/\n$/, '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — fail silently
    }
  };

  return (
    <div className='group relative my-10 overflow-hidden rounded-xl border border-border/50 bg-[#0d1117] shadow-lg'>
      <div className='flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5'>
        <div className='flex items-center gap-1.5'>
          <span className='h-2.5 w-2.5 rounded-full bg-red-500/60' />
          <span className='h-2.5 w-2.5 rounded-full bg-yellow-500/60' />
          <span className='h-2.5 w-2.5 rounded-full bg-green-500/60' />
        </div>
        <span className='font-mono text-[11px] text-white/40'>{language}</span>
      </div>
      <div className='relative'>
        <button
          type='button'
          onClick={handleCopy}
          aria-label='Copy code'
          className='absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] font-medium text-white/60 opacity-0 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white group-hover:opacity-100'
        >
          {copied ? (
            <>
              <Check className='h-3.5 w-3.5 text-green-400' />
              <span className='text-green-400'>Copied</span>
            </>
          ) : (
            <>
              <Copy className='h-3.5 w-3.5' />
              <span>Copy</span>
            </>
          )}
        </button>
        <pre className='overflow-x-auto p-6 text-sm leading-relaxed'>
          {children}
        </pre>
      </div>
    </div>
  );
}
