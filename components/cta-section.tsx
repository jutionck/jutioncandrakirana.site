import { Mail } from 'lucide-react';

import { client } from '@/sanity/lib/client';
import { homepageQuery, profileQuery } from '@/sanity/lib/queries';

type Profile = {
  email: string;
  location: string;
  country: string;
  timezone: string;
  socialLinks: { platform: string; url: string }[];
};

type HomepageCta = {
  ctaBadgeText?: string;
  ctaHeadline?: string;
  ctaSubheadline?: string;
};

export default async function CTASection() {
  const [profile, homepage] = await Promise.all([
    client.fetch<Profile | null>(
      profileQuery,
      {},
      { next: { tags: ['profile'], revalidate: 3600 } }
    ),
    client.fetch<HomepageCta | null>(
      homepageQuery,
      {},
      { next: { tags: ['homepage'], revalidate: 3600 } }
    ),
  ]);

  const email = profile?.email || 'jutionck@gmail.com';
  const linkedinUrl = profile?.socialLinks?.find(
    (s) => s.platform === 'linkedin'
  )?.url;

  return (
    <section
      id='contact'
      className='py-32 border-t border-border bg-background'
    >
      <div className='max-w-4xl mx-auto px-6 text-center'>
        <div className='inline-block mb-8 px-4 py-1.5 rounded-full border border-border bg-card/50 text-xs font-mono text-green-500'>
          ● {homepage?.ctaBadgeText || 'OPEN FOR OPPORTUNITIES'}
        </div>

        <h2 className='text-4xl md:text-6xl font-bold text-foreground mb-8 tracking-tighter'>
          {homepage?.ctaHeadline || "Let's engineer the future."}
        </h2>

        <p className='text-muted-foreground max-w-xl mx-auto mb-12 font-light text-lg'>
          {homepage?.ctaSubheadline ||
            "Whether you need a scalable backend architecture, corporate training, or a full-stack overhaul, I'm ready to deploy."}
        </p>

        <div className='flex flex-col items-center gap-6'>
          <a
            href={`mailto:${email}`}
            className='group relative inline-flex h-12 overflow-hidden rounded-full p-px focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background'
          >
            <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--primary)_0%,var(--secondary)_50%,var(--primary)_100%)]' />
            <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background px-8 py-1 text-sm font-medium text-foreground backdrop-blur-3xl transition-all group-hover:bg-card'>
              {email} <Mail className='ml-2 w-4 h-4' />
            </span>
          </a>

          <div className='flex gap-8 text-sm font-mono text-muted-foreground mt-8'>
            <span className='hover:text-foreground cursor-pointer transition-colors'>
              {(profile?.location || 'Jakarta').toUpperCase()}
              {profile?.country ? `, ${profile.country}` : ''}
            </span>
            <span className='hover:text-foreground cursor-pointer transition-colors'>
              {profile?.timezone || 'GMT+7'}
            </span>
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-primary cursor-pointer transition-colors'
              >
                LINKEDIN
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
