import type React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/theme-provider';
import ScrollToTop from '@/components/scroll-to-top';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

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

export const metadata: Metadata = {
  metadataBase: new URL('https://jutioncandrakirana.site'),
  title: 'Jution Candra Kirana - Tech Edu & Fullstack Developer',
  description:
    'Jution Candra Kirana - Experienced full-stack developer and tech educator from Indonesia with 7+ years specializing in Golang, Java Spring Boot, Node.js, React, Next.js, and cloud technologies. Training 500+ developers and leading digital transformation.',
  keywords: [
    'Jution Candra Kirana',
    'Full-Stack Developer Indonesia',
    'Tech Educator Indonesia',
    'Golang Developer',
    'Java Spring Boot Developer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'Kubernetes Expert',
    'Cloud Native',
    'Tech Trainer',
    'Software Engineer Indonesia',
    'AI Developer Indonesia',
    'Senior Developer Indonesia',
    'Enigma Camp Trainer',
    'Sobat Psikotes CEO',
  ],
  authors: [
    { name: 'Jution Candra Kirana', url: 'https://jutioncandrakirana.site' },
  ],
  creator: 'Jution Candra Kirana',
  publisher: 'Jution Candra Kirana',
  alternates: {
    canonical: 'https://jutioncandrakirana.site',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'id_ID',
    url: 'https://jutioncandrakirana.site',
    title: 'Jution Candra Kirana - Tech Edu & Fullstack Developer',
    description:
      'Jution Candra Kirana - Experienced full-stack developer and tech educator from Indonesia with 7+ years specializing in Golang, Java Spring Boot, Node.js, React, and cloud technologies. Training 500+ developers.',
    siteName: 'Jution Candra Kirana Portfolio',
    images: [
      {
        url: '/1.png',
        width: 512,
        height: 512,
        alt: 'Jution Candra Kirana Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jution Candra Kirana - Tech Edu & Fullstack Developer',
    description:
      'Jution Candra Kirana - Experienced full-stack developer and tech educator from Indonesia with 7+ years specializing in Golang, Java Spring Boot, Node.js, React, and cloud technologies.',
    creator: '@jutioncandrakirana',
    images: ['/1.png'],
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
  verification: {
    google: 'your-google-verification-code',
  },
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
