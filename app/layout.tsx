import type React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/theme-provider';
import ScrollToTop from '@/components/scroll-to-top';
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
  title: {
    default: 'Jution Candra Kirana - Tech Educator & Full-Stack Developer',
    template: '%s | Jution Candra Kirana'
  },
  description:
    'Experienced full-stack developer and tech educator with 7+ years specializing in Golang, Java Spring Boot, Node.js, React, and cloud technologies. Training 500+ developers and leading digital transformation.',
  keywords: [
    'Full-Stack Developer',
    'Tech Educator',
    'Golang Developer',
    'Java Spring Boot',
    'React Developer',
    'Node.js',
    'Kubernetes',
    'Cloud Native',
    'Tech Trainer',
    'Software Engineer',
    'Indonesia Developer',
  ],
  authors: [{ name: 'Jution Candra Kirana', url: 'https://jutioncandrakirana.site' }],
  creator: 'Jution Candra Kirana',
  publisher: 'Jution Candra Kirana',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jutioncandrakirana.site',
    title: 'Jution Candra Kirana - Tech Educator & Full-Stack Developer',
    description:
      'Experienced full-stack developer and tech educator with 7+ years specializing in Golang, Java Spring Boot, Node.js, React, and cloud technologies.',
    siteName: 'Jution Candra Kirana Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jution Candra Kirana - Tech Educator & Full-Stack Developer',
    description:
      'Experienced full-stack developer and tech educator with 7+ years specializing in Golang, Java Spring Boot, Node.js, React, and cloud technologies.',
    creator: '@jutioncandrakirana',
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
      </head>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <SkipLink />
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ScrollToTop />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
