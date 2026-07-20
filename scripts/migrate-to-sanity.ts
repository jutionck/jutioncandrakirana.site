import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;
const dryRun = process.argv.includes('--dry-run');

if (!projectId || !dataset) {
  throw new Error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET in the environment.'
  );
}
if (!dryRun && !token) {
  throw new Error(
    'Missing SANITY_API_WRITE_TOKEN in the environment (required unless run with --dry-run).'
  );
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2025-01-01',
  useCdn: false,
});

type SeedPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  thumbnail: string;
  readTime: string;
  content: string;
};

const posts: SeedPost[] = [
  {
    slug: 'building-scalable-microservices',
    title: 'Building Scalable Microservices with Go',
    excerpt:
      'Learn best practices for architecting microservices using Go and Kubernetes',
    date: '2025-01-15',
    tags: ['Go', 'Architecture', 'Microservices'],
    thumbnail:
      'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80',
    readTime: '8 min read',
    content: `
# Building Scalable Microservices with Go

Microservices architecture has become the go-to pattern for building scalable applications. In this post, we'll explore how to build microservices using Go.

## Why Go for Microservices?

Go is an excellent choice for microservices because of:

- **Performance**: Go compiles to a single binary with minimal runtime overhead
- **Concurrency**: Goroutines make it easy to handle thousands of concurrent requests
- **Simplicity**: Clean syntax and standard library reduce external dependencies

## Core Principles

When building microservices with Go, follow these key principles:

1. **Single Responsibility**: Each service should have a clear, single purpose
2. **API-First Design**: Define clear APIs between services
3. **Independent Deployment**: Each service should be deployable independently
4. **Resilience**: Handle failures gracefully with timeouts and retries

## Getting Started

Here's a basic example of a simple microservice:

\`\`\`go
package main

import (
    "net/http"
    "log"
)

func main() {
    http.HandleFunc("/api/status", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(http.StatusOK)
        w.Write([]byte(\`{"status": "healthy"}\`))
    })

    log.Fatal(http.ListenAndServe(":8080", nil))
}
\`\`\`

## Deployment with Kubernetes

Deploy your Go microservices using Kubernetes for automatic scaling and management.

## Conclusion

Go provides an excellent foundation for building modern microservices architectures. Its performance, simplicity, and built-in concurrency features make it ideal for this use case.
    `,
  },
  {
    slug: 'react-performance-optimization',
    title: 'React Performance Optimization Techniques',
    excerpt:
      'Deep dive into memoization, code splitting, and bundle optimization',
    date: '2025-01-10',
    tags: ['React', 'Performance', 'JavaScript'],
    thumbnail:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    readTime: '6 min read',
    content: `
# React Performance Optimization Techniques

Performance is critical for modern web applications. Let's explore key techniques to optimize your React applications.

## Memoization

Use React.memo to prevent unnecessary re-renders:

\`\`\`jsx
const MyComponent = React.memo(({ data }) => {
    return <div>{data.name}</div>;
});
\`\`\`

## Code Splitting

Use dynamic imports to reduce bundle size:

\`\`\`jsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));
\`\`\`

## Virtualization

For long lists, use virtualization libraries to render only visible items.

## Measuring Performance

Use React DevTools Profiler to identify performance bottlenecks.

## Best Practices

- Profile before optimizing
- Avoid inline objects in render
- Use useMemo and useCallback wisely
- Minimize bundle size

## Conclusion

Performance optimization is an ongoing process. Always measure, identify bottlenecks, and apply targeted optimizations.
    `,
  },
  {
    slug: 'kubernetes-deployment-guide',
    title: 'Kubernetes Deployment: A Practical Guide',
    excerpt:
      'Step-by-step guide to deploying containerized applications on Kubernetes',
    date: '2025-01-05',
    tags: ['Kubernetes', 'DevOps', 'Docker'],
    thumbnail:
      'https://images.unsplash.com/photo-1667372393086-9d4001d51cf1?w=800&auto=format&fit=crop&q=80',
    readTime: '10 min read',
    content: `
# Kubernetes Deployment: A Practical Guide

Kubernetes is a powerful platform for container orchestration. Learn how to deploy applications effectively.

## Prerequisites

- Docker installed
- Basic understanding of containers
- kubectl installed

## Creating a Deployment

Define your deployment in a YAML file:

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: my-app:latest
        ports:
        - containerPort: 8080
\`\`\`

## Deploying to Kubernetes

Apply your deployment:

\`\`\`bash
kubectl apply -f deployment.yaml
\`\`\`

## Scaling

Scale your deployment:

\`\`\`bash
kubectl scale deployment my-app --replicas=5
\`\`\`

## Monitoring

Use kubectl commands to monitor your deployment:

\`\`\`bash
kubectl get pods
kubectl logs deployment/my-app
\`\`\`

## Conclusion

Kubernetes provides powerful capabilities for deploying and managing containerized applications. Start simple and gradually adopt more advanced features.
    `,
  },
];

async function uploadThumbnail(url: string, slug: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch thumbnail for ${slug}: ${res.status}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  const filename = `${slug}.jpg`;
  if (dryRun) {
    console.log(`  [dry-run] would upload asset ${filename}`);
    return undefined;
  }
  const asset = await client.assets.upload('image', buffer, { filename });
  return asset._id;
}

async function writeDoc(doc: Record<string, unknown>) {
  if (dryRun) {
    console.log(`  [dry-run] would write ${doc._id}:`, JSON.stringify(doc, null, 2));
    return;
  }
  await client.createOrReplace(doc as { _id: string; _type: string });
  console.log(`  done: ${doc._id}`);
}

async function migratePosts() {
  for (const post of posts) {
    console.log(`Migrating post: ${post.slug}`);
    const assetId = await uploadThumbnail(post.thumbnail, post.slug);

    await writeDoc({
      _id: `post-${post.slug}`,
      _type: 'post',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      excerpt: post.excerpt,
      publishedAt: new Date(post.date).toISOString(),
      tags: post.tags,
      readTime: post.readTime,
      body: post.content.trim(),
      mainImage: assetId
        ? { _type: 'image', asset: { _type: 'reference', _ref: assetId } }
        : undefined,
    });
  }
}

const stats = [
  { value: '07+', label: 'Years Experience' },
  { value: '500+', label: 'Developers Trained' },
  { value: '10+', label: 'Enterprise Projects' },
  { value: '02', label: 'Degrees (BS & MS)' },
];

async function migrateStats() {
  console.log('Migrating stats');
  for (const [index, stat] of stats.entries()) {
    await writeDoc({
      _id: `stat-${index}`,
      _type: 'stat',
      value: stat.value,
      label: stat.label,
      order: index,
    });
  }
}

const skillCategories = [
  {
    id: 'backend',
    title: 'Backend & API Architecture',
    icon: 'server',
    wide: true,
    skills: [
      'Golang',
      'Java Spring Boot',
      'Node.js',
      'PHP',
      'REST API Design',
      'OAuth/JWT',
    ],
  },
  {
    id: 'frontend',
    title: 'Modern Frontend',
    icon: 'layout',
    wide: false,
    skills: ['Next.js', 'React.js', 'TypeScript', 'TailwindCSS', 'ES6+'],
  },
  {
    id: 'database',
    title: 'Data Systems',
    icon: 'database',
    wide: false,
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  },
  {
    id: 'devops',
    title: 'DevOps & Infrastructure',
    icon: 'cloud',
    wide: true,
    skills: [
      'Docker',
      'Kubernetes',
      'CI/CD (Jenkins)',
      'Git/GitHub',
      'Agile/Scrum',
    ],
  },
  {
    id: 'ml',
    title: 'Data & ML',
    icon: 'cpu',
    wide: true,
    skills: [
      'Data Analytics',
      'Machine Learning',
      'scikit-learn',
      'TensorFlow',
      'Python',
    ],
  },
  {
    id: 'leadership',
    title: 'Technical Leadership',
    icon: 'users',
    wide: false,
    skills: [
      'Curriculum Design',
      'Corporate Training',
      'Mentorship',
      'Project Management',
    ],
  },
];

async function migrateSkillCategories() {
  console.log('Migrating skill categories');
  for (const [index, category] of skillCategories.entries()) {
    await writeDoc({
      _id: `skillCategory-${category.id}`,
      _type: 'skillCategory',
      title: category.title,
      icon: category.icon,
      skills: category.skills,
      wide: category.wide,
      order: index,
    });
  }
}

const projects = [
  {
    id: 1,
    title: 'Psychological Testing Platform',
    role: 'Lead Developer & CEO',
    category: 'Web App',
    description:
      'A fully functional enterprise assessment platform for Sobat Psikotes. Built secure assessment workflows, automated scoring logic, and scalable deployment structures trusted by national companies.',
    tags: ['Next.js', 'React.js', 'PostgreSQL', 'Product Strategy'],
    link: 'https://sobatpsikotes.com',
    featured: true,
  },
  {
    id: 2,
    title: 'LASIK JEC Landing Page',
    role: 'Full Stack Developer',
    category: 'Web App',
    description:
      'Revamped eye hospital landing page from Figma designs into fully responsive Next.js application within 2 weeks with SEO optimization.',
    tags: ['Next.js', 'TailwindCSS', 'Responsive Design'],
    link: 'https://lasik.jec.co.id',
    featured: true,
  },
  {
    id: 3,
    title: 'Corporate IT Training Bootcamps',
    role: 'Senior Trainer',
    category: 'Training',
    description:
      'Designed and delivered high-impact engineering bootcamps for major clients like Bank Danamon and Bank Mandiri. Trained 500+ developers in Golang, Java, and Cloud Native stacks.',
    tags: ['Curriculum Dev', 'Mentorship', 'Java', 'Golang'],
    link: undefined,
    featured: true,
  },
  {
    id: 4,
    title: 'Simpel Aja TPID (Lampung Province)',
    role: 'Full Stack Developer',
    category: 'Web App',
    description:
      'Developed a province-wide reporting system used by all districts/cities in Lampung. Built monitoring dashboards for inflation indicators and program execution, improving coordination efficiency across TPID teams.',
    tags: ['Full Stack', 'Dashboard', 'Reporting', 'Government'],
    link: undefined,
    featured: true,
  },
  {
    id: 5,
    title: 'HRIS Platform (PT Panca Mitra Multiperdana)',
    role: 'Software Developer',
    category: 'Backend',
    description:
      'Delivered payroll, attendance, and employee management modules. Implemented NestJS and PostgreSQL backend services at enterprise scale, improving HR process efficiency through automation.',
    tags: ['NestJS', 'PostgreSQL', 'HRIS', 'Backend'],
    link: undefined,
    featured: true,
  },
  {
    id: 6,
    title: 'Fundtastic Microservices Platform',
    role: 'Backend Developer',
    category: 'Backend',
    description:
      'Delivered key microservices critical to platform reliability. Built service-to-service communication and secure API flows. Improved monitoring and logging through centralized microservice tooling.',
    tags: ['Microservices', 'Backend', 'API', 'Security'],
    link: undefined,
    featured: true,
  },
  {
    id: 7,
    title: 'BI Scholarship Information System',
    role: 'Backend Developer',
    category: 'Web App',
    description:
      'Developed BI Scholarship system for Lampung Region. Implemented document verification and real-time monitoring. Delivered dashboard used by BI administrators to manage recipients.',
    tags: ['Full Stack', 'Dashboard', 'Scholarship System'],
    link: undefined,
    featured: true,
  },
  {
    id: 8,
    title: 'Corporate Data Visualization',
    role: 'Data Visualization Developer',
    category: 'Data',
    description:
      'Designed and implemented interactive dashboards in Google Looker Studio tailored to client requirements. Processed and cleaned datasets to ensure data accuracy and clarity.',
    tags: ['Google Looker Studio', 'Data Visualization', 'Analytics'],
    link: undefined,
    featured: true,
  },
];

async function migrateProjects() {
  console.log('Migrating projects');
  for (const [index, project] of projects.entries()) {
    await writeDoc({
      _id: `project-${project.id}`,
      _type: 'project',
      title: project.title,
      role: project.role,
      category: project.category,
      description: project.description,
      tags: project.tags,
      link: project.link,
      featured: project.featured,
      order: index,
    });
  }
}

const experiences = [
  {
    id: 1,
    role: 'Chief Executive Officer',
    company: 'Sobat Psikotes',
    period: 'Jan 2024 - Present',
    description:
      'Leading trusted online psychometric testing platform used by national companies.',
    responsibilities: [
      'Lead end-to-end project execution using Agile methodology',
      'Translate business requirements into technical tasks',
      'Coordinate between stakeholders and engineering teams',
      'Ensure system security, data integrity, and timely delivery',
    ],
    accomplishments: [
      'Delivered a fully functional psychological testing platform using Spring Boot, React.js, and PostgreSQL',
      'Built secure assessment workflows and automated scoring logic',
      'Ensured scalable deployment using Docker, Nginx, and Cloudflare',
    ],
    skills: [
      'Product Strategy',
      'Team Leadership',
      'Data Security',
      'Next.js',
      'Spring Boot',
    ],
    active: true,
  },
  {
    id: 2,
    role: 'Senior Trainer',
    company: 'PT Enigma Cipta Humanika',
    period: 'Sep 2020 - Present',
    description:
      'Delivering corporate IT training and full-stack engineering programs for banking clients.',
    responsibilities: [
      'Design and deliver IT bootcamps for corporate and individual trainees',
      'Conduct training on Golang API, Java Spring Boot, Angular, TypeScript, Node.js, and Kubernetes',
      'Facilitate corporate programs for major banks (Danamon, Bank Mandiri, SMM)',
    ],
    accomplishments: [
      'Trained 500+ developers in Golang, Java, and Cloud Native stacks',
      "Improved participants' technical readiness enabling direct placement into industry roles",
      'Designed and developed syllabi for multiple technology stacks',
    ],
    skills: [
      'Angular',
      'Appium',
      'Dart',
      'Docker',
      'Express.js',
      'Flutter',
      'Git',
      'Go',
      'Java',
      'JavaScript',
      'Jira',
      'JMeter',
      'Kotlin',
      'Kubernetes',
      'Node.js',
      'PostgreSQL',
      'React.js',
      'Robot Framework',
      'Sequelize.js',
      'Spring Boot',
      'System Architecture',
      'Training & Development',
      'TypeScript',
    ],
    active: true,
  },
  {
    id: 3,
    role: 'Laboratory Assistant Lecturer',
    company: 'Politeknik Negeri Lampung',
    period: 'Sep 2016 - Oct 2020',
    description: 'Assisted lecturers in teaching Basic Programming courses.',
    responsibilities: [
      'Assisted lecturers in teaching Basic Programming courses',
      'Maintained laboratory computers, networks, and installed required software',
      'Supported students during lab sessions to ensure smooth practical learning',
    ],
    accomplishments: [] as string[],
    skills: [
      'CodeIgniter',
      'PHP',
      'CorelDRAW',
      'C#',
      'MySQL',
      'JavaScript',
      'C++',
      'Adobe Photoshop',
      'Microsoft SQL Server',
    ],
    active: false,
  },
];

async function migrateExperiences() {
  console.log('Migrating experiences');
  for (const [index, exp] of experiences.entries()) {
    await writeDoc({
      _id: `experience-${exp.id}`,
      _type: 'experience',
      role: exp.role,
      company: exp.company,
      period: exp.period,
      description: exp.description,
      responsibilities: exp.responsibilities,
      accomplishments: exp.accomplishments,
      skills: exp.skills,
      active: exp.active,
      order: index,
    });
  }
}

const education = [
  {
    degree: "Master's Degree (Ongoing)",
    school: 'Universitas Budi Luhur',
    focus: 'Data Analytics and Machine Learning',
    period: 'Jan 2024 - Present',
  },
  {
    degree: "Bachelor's Degree",
    school: 'Institut Informatika dan Bisnis Darmajaya',
    focus: 'Expert Systems',
    period: 'Sep 2016 - Apr 2018',
  },
];

async function migrateEducation() {
  console.log('Migrating education');
  for (const [index, edu] of education.entries()) {
    await writeDoc({
      _id: `education-${index}`,
      _type: 'education',
      degree: edu.degree,
      school: edu.school,
      focus: edu.focus,
      period: edu.period,
      order: index,
    });
  }
}

const certifications = [
  { name: 'MongoDB Aggregation Fundamentals', issuer: 'MongoDB', date: 'Oct 2025', credentialId: '' },
  { name: 'MongoDB Schema Design Patterns and Anti-patterns Skill Badge', issuer: 'MongoDB', date: 'Oct 2025', credentialId: '' },
  { name: 'Belajar Dasar AI', issuer: 'Dicoding Indonesia', date: 'Sep 2025', credentialId: '53XEK4LQVXRN' },
  { name: "From Relational Model (SQL) to MongoDB's Document Model", issuer: 'MongoDB', date: 'Sep 2025', credentialId: '' },
  { name: 'Belajar Fundamental Deep Learning', issuer: 'Dicoding Indonesia', date: 'Aug 2025', credentialId: '81P25G9LYPOY' },
  { name: 'AI Praktis untuk Produktivitas', issuer: 'Dicoding Indonesia', date: 'Jun 2025', credentialId: 'KEXL2E1J0ZG2' },
  { name: 'Belajar Machine Learning untuk Pemula', issuer: 'Dicoding Indonesia', date: 'Jun 2025', credentialId: '0LZ05OQ6NX65' },
  { name: 'Belajar Penggunaan Generative AI', issuer: 'Dicoding Indonesia', date: 'Jun 2025', credentialId: 'NVP7JYQ2OXR0' },
  { name: 'Financial Literacy 101', issuer: 'Dicoding Indonesia', date: 'Jun 2025', credentialId: '1OP82Q97VPQK' },
  { name: 'Belajar Dasar Visualisasi Data', issuer: 'Dicoding Indonesia', date: 'Apr 2025', credentialId: 'QLZ93ERYDZ5D' },
  { name: 'Memulai Pemrograman dengan Python', issuer: 'Dicoding Indonesia', date: 'Apr 2025', credentialId: 'KEXL7JD70XG2' },
  { name: 'Belajar Dasar-Dasar DevOps', issuer: 'Dicoding Indonesia', date: 'Nov 2024', credentialId: '1OP84JVDQZQK' },
  { name: 'Belajar Jaringan Komputer untuk Pemula', issuer: 'Dicoding Indonesia', date: 'Nov 2024', credentialId: 'QLZ9V6E8MX5D' },
  { name: 'Belajar Membuat Aplikasi Back-End untuk Pemula', issuer: 'Dicoding Indonesia', date: 'Dec 2023', credentialId: 'NVP779E9WPR0' },
  { name: 'Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)', issuer: 'Dicoding Indonesia', date: 'Dec 2023', credentialId: 'NVP7796EGPR0' },
  { name: 'Belajar Dasar Pemrograman JavaScript', issuer: 'Dicoding Indonesia', date: 'Sep 2023', credentialId: '6RPN4663QX2M' },
  { name: 'Belajar Prinsip Pemrograman SOLID', issuer: 'Dicoding Indonesia', date: 'Dec 2022', credentialId: '4EXG97RJDZRL' },
];

async function migrateCertifications() {
  console.log('Migrating certifications');
  for (const [index, cert] of certifications.entries()) {
    await writeDoc({
      _id: `certification-${index}`,
      _type: 'certification',
      name: cert.name,
      issuer: cert.issuer,
      dateLabel: cert.date,
      credentialId: cert.credentialId || undefined,
      order: index,
    });
  }
}

async function migrateHomepage() {
  console.log('Migrating homepage copy');
  await writeDoc({
    _id: 'homepage',
    _type: 'homepage',
    heroStatusBadgeText: 'SYSTEM STATUS: ONLINE',
    heroHeadlineLine1: 'Jution Candra',
    heroHeadlineLine2: 'Kirana.',
    heroPrimaryCtaLabel: 'View Projects',
    heroPrimaryCtaHref: '#portfolio',
    heroFloatingBadges: [
      { _key: 'badge-1', label: 'Full Stack', value: 'Dev' },
      { _key: 'badge-2', label: 'Trainer', value: '500+ Students' },
    ],
    ctaBadgeText: 'OPEN FOR OPPORTUNITIES',
    ctaHeadline: "Let's engineer the future.",
    ctaSubheadline:
      "Whether you need a scalable backend architecture, corporate training, or a full-stack overhaul, I'm ready to deploy.",
    skillsEyebrow: 'Technical Arsenal',
    skillsTitle: 'Core Competencies',
    skillsDescription:
      'Comprehensive toolset for building scalable enterprise systems, from bare-metal backend to distributed cloud architecture.',
    portfolioTitle: 'Portofolio',
    experienceTitle: 'Professional Journey',
    certificationsTitle: 'Licenses & Certifications',
    educationTitle: 'Education',
    blogIndexBadgeText: 'Technical Articles',
    blogIndexTitle: 'My Blog',
    blogIndexDescription:
      'Technical articles about modern web development, architecture, and best practices. Sharing knowledge and insights from real-world experience.',
  });
}

async function migrateProfile() {
  console.log('Migrating profile');
  await writeDoc({
    _id: 'profile',
    _type: 'profile',
    fullName: 'Jution Candra Kirana',
    alternateNames: ['JCK', 'Jution C Kirana', 'jutionck'],
    jobTitle: 'Senior Tech Educator & Full-Stack Developer',
    description:
      'Jution Candra Kirana - Experienced full-stack developer and tech educator from Indonesia with 7+ years specializing in Golang, Java Spring Boot, Node.js, React, Next.js, and cloud technologies. Training 500+ developers and leading digital transformation.',
    bioSegments: [
      { _key: 'seg-1', text: 'Senior Trainer at ', bold: false },
      { _key: 'seg-2', text: 'Enigma Camp', bold: true },
      {
        _key: 'seg-3',
        text: ' with 7+ years of experience in backend, frontend, and cloud-native development. Founder of ',
        bold: false,
      },
      { _key: 'seg-4', text: 'MIPDEVP', bold: true },
      { _key: 'seg-5', text: ' and ', bold: false },
      { _key: 'seg-6', text: 'Sobat Psikotes', bold: true },
      {
        _key: 'seg-7',
        text: ', delivering scalable apps and digital solutions for businesses and organizations. Passionate about building systems and developing future tech talent.',
        bold: false,
      },
    ],
    heroStack: ['Golang', 'Java', 'PHP', 'JavaScript', 'Next.js', 'Docker'],
    heroEducationLabel: 'Universitas Budi Luhur (Ongoing)',
    experienceLabel: '7+ Years',
    email: 'jutionck@gmail.com',
    location: 'Jakarta',
    country: 'ID',
    timezone: 'GMT+7',
    socialLinks: [
      { _key: 'social-github', platform: 'github', url: 'https://github.com/jutionck' },
      { _key: 'social-linkedin', platform: 'linkedin', url: 'https://linkedin.com/in/jutionck' },
      { _key: 'social-email', platform: 'email', url: 'mailto:jutionck@gmail.com' },
    ],
    employers: [
      { _key: 'employer-1', name: 'Enigma Camp', country: 'ID' },
      { _key: 'employer-2', name: 'Sobat Psikotes', country: 'ID' },
    ],
    alumniOf: {
      name: 'Institut Informatika dan Bisnis Darmajaya',
      city: 'Lampung',
      country: 'ID',
    },
    nationality: 'Indonesia',
    knownLanguages: ['English', 'Indonesian'],
  });
}

async function migrateSiteSettings() {
  console.log('Migrating site settings');
  await writeDoc({
    _id: 'siteSettings',
    _type: 'siteSettings',
    title: 'Jution Candra Kirana - Tech Edu & Fullstack Developer',
    siteName: 'JCK.site',
    logoText: 'JCK',
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
    siteUrl: 'https://jutioncandrakirana.site',
    twitterHandle: '@jutioncandrakirana',
  });
}

async function migrate() {
  await migratePosts();
  await migrateStats();
  await migrateSkillCategories();
  await migrateProjects();
  await migrateExperiences();
  await migrateEducation();
  await migrateCertifications();
  await migrateHomepage();
  await migrateProfile();
  await migrateSiteSettings();
}

migrate()
  .then(() => console.log(dryRun ? 'Dry run complete.' : 'Migration complete.'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
