import { client } from '@/sanity/lib/client';
import {
  profileQuery,
  siteSettingsQuery,
  skillNamesQuery,
} from '@/sanity/lib/queries';

type Profile = {
  fullName: string;
  alternateNames: string[];
  jobTitle: string;
  description: string;
  email: string;
  socialLinks: { platform: string; url: string }[];
  employers: { name: string; country: string }[];
  alumniOf: { name: string; city: string; country: string };
  nationality: string;
  knownLanguages: string[];
};

type SiteSettings = {
  title: string;
  siteUrl: string;
};

export default async function StructuredData() {
  const [profile, siteSettings, skills] = await Promise.all([
    client.fetch<Profile | null>(
      profileQuery,
      {},
      { next: { tags: ['profile'], revalidate: 3600 } }
    ),
    client.fetch<SiteSettings | null>(
      siteSettingsQuery,
      {},
      { next: { tags: ['siteSettings'], revalidate: 3600 } }
    ),
    client.fetch<string[]>(
      skillNamesQuery,
      {},
      { next: { tags: ['skillCategory'], revalidate: 3600 } }
    ),
  ]);

  if (!profile || !siteSettings) return null;

  const siteUrl = siteSettings.siteUrl;
  const sameAs = profile.socialLinks
    .filter((s) => s.platform === 'github' || s.platform === 'linkedin')
    .map((s) => s.url);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: profile.fullName,
    alternateName: profile.alternateNames,
    url: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    sameAs,
    jobTitle: profile.jobTitle,
    worksFor: profile.employers.map((employer) => ({
      '@type': 'Organization',
      name: employer.name,
      address: {
        '@type': 'PostalAddress',
        addressCountry: employer.country,
      },
    })),
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: profile.alumniOf.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: profile.alumniOf.city,
        addressCountry: profile.alumniOf.country,
      },
    },
    nationality: {
      '@type': 'Country',
      name: profile.nationality,
    },
    knowsAbout: skills,
    knowsLanguage: profile.knownLanguages,
    description: profile.description,
    email: profile.email,
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: `${profile.fullName} - Portfolio`,
    description: profile.description,
    author: {
      '@id': `${siteUrl}/#person`,
    },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/?s={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
