import type React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/theme-provider';
import ScrollToTop from '@/components/scroll-to-top';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { profileQuery, siteSettingsQuery } from '@/sanity/lib/queries';
import type { Image as SanityImage } from 'sanity';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
});

type SiteSettings = {
  title: string;
  siteName: string;
  keywords?: string[];
  siteUrl: string;
  ogImage?: SanityImage;
  twitterHandle?: string;
  googleSiteVerification?: string;
};

type ProfileMeta = {
  fullName: string;
  description: string;
};

export async function generateMetadata(): Promise<Metadata> {
  const [siteSettings, profile] = await Promise.all([
    client.fetch<SiteSettings | null>(
      siteSettingsQuery,
      {},
      { next: { tags: ['siteSettings'], revalidate: 3600 } }
    ),
    client.fetch<ProfileMeta | null>(
      profileQuery,
      {},
      { next: { tags: ['profile'], revalidate: 3600 } }
    ),
  ]);

  const siteUrl = siteSettings?.siteUrl || 'https://jutioncandrakirana.site';
  const title =
    siteSettings?.title ||
    'Jution Candra Kirana - Tech Edu & Fullstack Developer';
  const description =
    profile?.description ||
    'Jution Candra Kirana - Experienced full-stack developer and tech educator from Indonesia.';
  const ogImageUrl = siteSettings?.ogImage
    ? urlFor(siteSettings.ogImage).width(1200).height(630).url()
    : undefined;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: siteSettings?.keywords,
    authors: [{ name: profile?.fullName || 'Jution Candra Kirana', url: siteUrl }],
    creator: profile?.fullName || 'Jution Candra Kirana',
    publisher: profile?.fullName || 'Jution Candra Kirana',
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      alternateLocale: 'id_ID',
      url: siteUrl,
      title,
      description,
      siteName: siteSettings?.siteName || 'Jution Candra Kirana Portfolio',
      images: ogImageUrl
        ? [{ url: ogImageUrl, width: 1200, height: 630, alt: title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: siteSettings?.twitterHandle,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: siteSettings?.googleSiteVerification
      ? { google: siteSettings.googleSiteVerification }
      : undefined,
    icons: {
      icon: [
        { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        {
          rel: 'icon',
          url: '/favicon.ico',
        },
      ],
    },
  };
}

import StructuredData from '@/components/structured-data';
import SkipLink from '@/components/skip-link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <StructuredData />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('jck-theme') || 'system';
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const actualTheme = theme === 'system' ? systemTheme : theme;
                document.documentElement.classList.toggle('dark', actualTheme === 'dark');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <SkipLink />
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          storageKey='jck-theme'
        >
          {children}
          <ScrollToTop />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
