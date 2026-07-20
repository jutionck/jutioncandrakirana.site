import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/', '/studio/'],
      },
    ],
    sitemap: 'https://jutioncandrakirana.site/sitemap.xml',
  };
}
