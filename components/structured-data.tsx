export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jution Candra Kirana',
    url: 'https://jutioncandrakirana.site',
    image: 'https://jutioncandrakirana.site/og-image.jpg',
    sameAs: [
      'https://github.com/jutionck',
      'https://linkedin.com/in/jutionck',
    ],
    jobTitle: 'Senior Tech Educator & Full-Stack Developer',
    worksFor: [
      {
        '@type': 'Organization',
        name: 'Enigma Camp',
      },
      {
        '@type': 'Organization',
        name: 'Sobat Psikotes',
      },
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Institut Informatika dan Bisnis Darmajaya',
    },
    knowsAbout: [
      'Full-Stack Development',
      'Golang',
      'Java Spring Boot',
      'Node.js',
      'React',
      'Kubernetes',
      'Docker',
      'Cloud Computing',
      'Tech Education',
      'Software Architecture',
    ],
    description:
      'Experienced full-stack developer and tech educator with 7+ years specializing in Golang, Java Spring Boot, Node.js, React, and cloud technologies. Training 500+ developers and leading digital transformation.',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
