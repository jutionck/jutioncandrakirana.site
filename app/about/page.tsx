import Header from '@/components/header';
import Footer from '@/components/footer';
import Image from 'next/image';
import Link from 'next/link';
import { User, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import type { Image as SanityImage } from 'sanity';

import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { profileQuery } from '@/sanity/lib/queries';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Jution Candra Kirana — full-stack developer and tech educator.',
};

type Profile = {
  fullName: string;
  jobTitle: string;
  avatar?: SanityImage;
  description?: string;
  experienceLabel?: string;
  heroEducationLabel?: string;
  nationality?: string;
  knownLanguages?: string[];
  employers?: { name: string; country?: string }[];
};

async function getProfile() {
  return client.fetch<Profile | null>(
    profileQuery,
    {},
    { next: { tags: ['profile'], revalidate: 3600 } }
  );
}

export default async function AboutPage() {
  const profile = await getProfile();
  const avatarUrl = profile?.avatar
    ? urlFor(profile.avatar).width(240).height(240).url()
    : undefined;

  return (
    <main id='main-content' className='min-h-screen bg-background'>
      <Header />

      <section className='relative pt-32 pb-24 overflow-hidden'>
        <div className='absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-primary/10 to-transparent rounded-full blur-3xl -z-10' />

        <div className='max-w-3xl mx-auto px-6'>
          <div className='flex items-center gap-5 mb-10'>
            <div className='relative w-20 h-20 rounded-full overflow-hidden bg-muted border border-border shrink-0 flex items-center justify-center'>
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={profile?.fullName || 'Jution Candra Kirana'}
                  fill
                  className='object-cover'
                />
              ) : (
                <User className='w-8 h-8 text-muted-foreground' />
              )}
            </div>
            <div>
              <h1 className='text-3xl md:text-4xl font-bold text-foreground tracking-tight'>
                {profile?.fullName || 'Jution Candra Kirana'}
              </h1>
              <p className='text-muted-foreground'>
                {profile?.jobTitle || 'Full-Stack Developer & Tech Educator'}
              </p>
            </div>
          </div>

          <p className='text-muted-foreground leading-relaxed text-lg'>
            {profile?.description ||
              'Experienced full-stack developer and tech educator from Indonesia, focused on building reliable backend systems and sharing what I learn along the way.'}
          </p>

          <div className='grid sm:grid-cols-2 gap-4 mt-10'>
            {profile?.experienceLabel && (
              <div className='p-5 rounded-2xl border border-border bg-card/40'>
                <div className='text-sm text-muted-foreground mb-1'>
                  Experience
                </div>
                <div className='text-foreground font-medium'>
                  {profile.experienceLabel}
                </div>
              </div>
            )}
            {profile?.heroEducationLabel && (
              <div className='p-5 rounded-2xl border border-border bg-card/40'>
                <div className='text-sm text-muted-foreground mb-1'>
                  Education
                </div>
                <div className='text-foreground font-medium'>
                  {profile.heroEducationLabel}
                </div>
              </div>
            )}
            {profile?.employers && profile.employers.length > 0 && (
              <div className='p-5 rounded-2xl border border-border bg-card/40'>
                <div className='text-sm text-muted-foreground mb-1'>
                  Background
                </div>
                <div className='text-foreground font-medium'>
                  {profile.employers.map((e) => e.name).join(', ')}
                </div>
              </div>
            )}
            {profile?.knownLanguages && profile.knownLanguages.length > 0 && (
              <div className='p-5 rounded-2xl border border-border bg-card/40'>
                <div className='text-sm text-muted-foreground mb-1'>
                  Languages
                </div>
                <div className='text-foreground font-medium'>
                  {profile.knownLanguages.join(', ')}
                </div>
              </div>
            )}
          </div>

          <div className='flex flex-wrap gap-4 mt-12'>
            <Link
              href='/blog'
              className='inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity'
            >
              Read the blog
              <ArrowRight className='w-4 h-4' />
            </Link>
            <Link
              href='/contact'
              className='inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:border-primary hover:bg-primary/5 transition-all'
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
