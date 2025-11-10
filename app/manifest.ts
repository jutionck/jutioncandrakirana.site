import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Jution Candra Kirana - Tech Edu & Fullstack Developer',
    short_name: 'JCK Portfolio',
    description:
      'Jution Candra Kirana - Experienced full-stack developer and tech educator from Indonesia with 7+ years specializing in Golang, Java Spring Boot, Node.js, React, AI/ML, and cloud technologies.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
    ],
  };
}
