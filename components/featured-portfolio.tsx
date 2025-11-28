'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, FolderOpen } from 'lucide-react';

const featuredProjects = [
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
    link: '#',
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
    link: '#',
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
    link: '#',
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
    link: '#',
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
    link: '#',
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
    link: '#',
    featured: true,
  },
];

const categories = ['All', 'Web App', 'Backend', 'Data', 'Training'];

export default function FeaturedPortfolio() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects =
    activeCategory === 'All'
      ? featuredProjects
      : featuredProjects.filter(
          (project) => project.category === activeCategory
        );

  return (
    <section id='portfolio' className='py-32 bg-card/50 border-t border-border'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='flex flex-col items-center mb-16'>
          <h2 className='text-3xl font-bold text-foreground font-mono uppercase tracking-tight mb-8'>
            Portofolio
          </h2>

          <div className='flex flex-wrap justify-center gap-2'>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-background border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className='group flex flex-col p-6 rounded-2xl border border-border bg-card/10 hover:bg-card/30 hover:border-primary/30 transition-all duration-300 h-full'
            >
              <div className='flex items-start justify-between mb-4'>
                <div className='flex flex-col pr-4'>
                  <span className='text-xs font-mono text-primary mb-2'>
                    {project.category}
                  </span>
                  <h3 className='text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2'>
                    {project.title}
                  </h3>
                </div>
                {project.link && project.link !== '#' && (
                  <a
                    href={project.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='p-2 rounded-full bg-background border border-border text-muted-foreground group-hover:text-primary group-hover:border-primary transition-colors shrink-0'
                  >
                    <ArrowUpRight className='w-4 h-4' />
                  </a>
                )}
              </div>

              <div className='mb-4'>
                <span className='text-xs font-medium text-muted-foreground uppercase tracking-wider bg-muted/50 px-2 py-1 rounded'>
                  {project.role}
                </span>
              </div>

              <p className='text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-4 grow'>
                {project.description}
              </p>

              <div className='flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50'>
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className='px-2 py-1 text-[10px] font-mono text-muted-foreground bg-background border border-border rounded-full'
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className='px-2 py-1 text-[10px] font-mono text-muted-foreground bg-background border border-border rounded-full'>
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
