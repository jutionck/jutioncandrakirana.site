import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { Mail, MapPin, Github, Linkedin } from 'lucide-react';
import type { Metadata } from 'next';

import { client } from '@/sanity/lib/client';
import { profileQuery } from '@/sanity/lib/queries';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Jution Candra Kirana.',
};

type Profile = {
  email: string;
  location?: string;
  country?: string;
  timezone?: string;
  socialLinks?: { platform: string; url: string }[];
};

async function getProfile() {
  return client.fetch<Profile | null>(
    profileQuery,
    {},
    { next: { tags: ['profile'], revalidate: 3600 } }
  );
}

export default async function ContactPage() {
  const profile = await getProfile();
  const email = profile?.email || 'jutionck@gmail.com';
  const githubUrl = profile?.socialLinks?.find(
    (s) => s.platform === 'github'
  )?.url;
  const linkedinUrl = profile?.socialLinks?.find(
    (s) => s.platform === 'linkedin'
  )?.url;

  return (
    <main id='main-content' className='min-h-screen bg-background'>
      <Header />

      <section className='relative pt-32 pb-24 overflow-hidden'>
        <div className='absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-primary/10 to-transparent rounded-full blur-3xl -z-10' />

        <div className='max-w-3xl mx-auto px-6'>
          <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight'>
            Contact
          </h1>
          <p className='text-muted-foreground text-lg mb-12 max-w-xl'>
            Have a question about an article, a project idea, or an
            opportunity to collaborate? Reach out directly.
          </p>

          <div className='space-y-4'>
            <a
              href={`mailto:${email}`}
              className='flex items-center gap-4 p-5 rounded-2xl border border-border bg-card/40 hover:border-primary/50 hover:bg-card transition-all group'
            >
              <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0'>
                <Mail className='w-5 h-5 text-primary' />
              </div>
              <div>
                <div className='text-sm text-muted-foreground'>Email</div>
                <div className='text-foreground font-medium group-hover:text-primary transition-colors'>
                  {email}
                </div>
              </div>
            </a>

            {(profile?.location || profile?.timezone) && (
              <div className='flex items-center gap-4 p-5 rounded-2xl border border-border bg-card/40'>
                <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0'>
                  <MapPin className='w-5 h-5 text-primary' />
                </div>
                <div>
                  <div className='text-sm text-muted-foreground'>
                    Location
                  </div>
                  <div className='text-foreground font-medium'>
                    {profile?.location || 'Jakarta'}
                    {profile?.country ? `, ${profile.country}` : ''}
                    {profile?.timezone ? ` · ${profile.timezone}` : ''}
                  </div>
                </div>
              </div>
            )}

            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-4 p-5 rounded-2xl border border-border bg-card/40 hover:border-primary/50 hover:bg-card transition-all group'
              >
                <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0'>
                  <Linkedin className='w-5 h-5 text-primary' />
                </div>
                <div>
                  <div className='text-sm text-muted-foreground'>
                    LinkedIn
                  </div>
                  <div className='text-foreground font-medium group-hover:text-primary transition-colors'>
                    Connect on LinkedIn
                  </div>
                </div>
              </a>
            )}

            {githubUrl && (
              <a
                href={githubUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-4 p-5 rounded-2xl border border-border bg-card/40 hover:border-primary/50 hover:bg-card transition-all group'
              >
                <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0'>
                  <Github className='w-5 h-5 text-primary' />
                </div>
                <div>
                  <div className='text-sm text-muted-foreground'>GitHub</div>
                  <div className='text-foreground font-medium group-hover:text-primary transition-colors'>
                    View projects
                  </div>
                </div>
              </a>
            )}
          </div>

          <p className='text-sm text-muted-foreground mt-12'>
            Want to know more first?{' '}
            <Link href='/about' className='text-primary hover:underline'>
              Read the About page
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
