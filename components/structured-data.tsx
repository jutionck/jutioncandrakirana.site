export default function StructuredData() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://jutioncandrakirana.site/#person',
    name: 'Jution Candra Kirana',
    alternateName: ['JCK', 'Jution C Kirana', 'jutionck'],
    url: 'https://jutioncandrakirana.site',
    image: 'https://jutioncandrakirana.site/favicon.ico',
    sameAs: [
      'https://github.com/jutionck',
      'https://linkedin.com/in/jutionck',
    ],
    jobTitle: 'Senior Tech Educator & Full-Stack Developer',
    worksFor: [
      {
        '@type': 'Organization',
        name: 'Enigma Camp',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'ID',
        },
      },
      {
        '@type': 'Organization',
        name: 'Sobat Psikotes',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'ID',
        },
      },
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Institut Informatika dan Bisnis Darmajaya',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lampung',
        addressCountry: 'ID',
      },
    },
    nationality: {
      '@type': 'Country',
      name: 'Indonesia',
    },
    knowsAbout: [
      'Full-Stack Development',
      'Golang',
      'Java Spring Boot',
      'Node.js',
      'React',
      'Next.js',
      'Kubernetes',
      'Docker',
      'Cloud Computing',
      'Tech Education',
      'Software Architecture',
      'Artificial Intelligence',
      'Machine Learning',
      'PostgreSQL',
      'MongoDB',
    ],
    knowsLanguage: ['English', 'Indonesian'],
    description:
      'Jution Candra Kirana - Experienced full-stack developer and tech educator from Indonesia with 7+ years specializing in Golang, Java Spring Boot, Node.js, React, and cloud technologies. Training 500+ developers and leading digital transformation.',
    email: 'jutionck@gmail.com',
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://jutioncandrakirana.site/#website',
    url: 'https://jutioncandrakirana.site',
    name: 'Jution Candra Kirana - Portfolio',
    description:
      'Portfolio website of Jution Candra Kirana, a full-stack developer and tech educator from Indonesia',
    author: {
      '@id': 'https://jutioncandrakirana.site/#person',
    },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://jutioncandrakirana.site/?s={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
