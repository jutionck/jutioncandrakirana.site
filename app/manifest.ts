import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Jution Candra Kirana - Portfolio',
    short_name: 'JCK Portfolio',
    description:
      'Experienced full-stack developer and tech educator with 7+ years specializing in Golang, Java Spring Boot, Node.js, React, and cloud technologies.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
