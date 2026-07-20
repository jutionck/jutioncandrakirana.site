import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { siteSettingsQuery } from '@/sanity/lib/queries';

const legalLinks = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
];

export default async function Footer() {
  const siteSettings = await client.fetch<{ siteName?: string } | null>(
    siteSettingsQuery,
    {},
    { next: { tags: ['siteSettings'], revalidate: 3600 } }
  );

  return (
    <footer className='bg-background py-8 border-t border-border'>
      <div className='max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4'>
        <div className='text-muted-foreground text-xs font-mono'>
          {siteSettings?.siteName || 'JCK.site'} © {new Date().getFullYear()}
        </div>
        <nav className='flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground'>
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='hover:text-foreground transition-colors'
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
