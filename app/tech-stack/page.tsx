import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import {
  Code2,
  Database,
  Cloud,
  Smartphone,
  Wrench,
  Layers,
} from 'lucide-react';

export const metadata: Metadata = {
  description: 'Jution Candra Kirana - Comprehensive expertise spanning backend development (Golang, Java Spring Boot, Node.js), modern frontends (React, Next.js), databases (PostgreSQL, MongoDB), AI/ML, and cloud technologies (Docker, Kubernetes).',
  alternates: {
    canonical: 'https://jutioncandrakirana.site/tech-stack',
  },
};

const categoryIcons: Record<string, any> = {
  'Backend & API': Code2,
  Frontend: Layers,
  Databases: Database,
  'DevOps & Cloud': Cloud,
  'Mobile & Testing': Smartphone,
  'Tools & Methodologies': Wrench,
};

const technologies = {
  'Backend & API': [
    {
      name: 'Golang',
      description:
        'REST APIs, goroutines, backend microservices, high-performance services',
    },
    {
      name: 'Java Spring Boot',
      description:
        'Enterprise applications, microservices architecture, dependency injection',
    },
    {
      name: 'Node.js',
      description: 'Express, NestJS, real-time applications, API development',
    },
    {
      name: 'PHP',
      description: 'Laravel, CodeIgniter, REST API design, backend services',
    },
  ],
  Frontend: [
    {
      name: 'Next.js',
      description:
        'App Router, SSR, API Routes, TypeScript, production applications',
    },
    {
      name: 'React.js',
      description: 'Hooks, Context, State management, performance optimization',
    },
    {
      name: 'TypeScript',
      description: 'Type safety, advanced types, interfaces, strong typing',
    },
    {
      name: 'TailwindCSS',
      description: 'Utility-first CSS, responsive design, modern styling',
    },
    {
      name: 'Angular',
      description: 'Enterprise frameworks, RxJS, component architecture',
    },
  ],
  Databases: [
    {
      name: 'PostgreSQL',
      description:
        'Advanced queries, indexing, transactions, complex relationships',
    },
    {
      name: 'MongoDB',
      description: 'Document storage, aggregation pipeline, NoSQL',
    },
    {
      name: 'MySQL',
      description: 'Relational databases, optimization, data integrity',
    },
    {
      name: 'Redis',
      description: 'Caching, real-time features, session management',
    },
  ],
  'DevOps & Cloud': [
    {
      name: 'Docker',
      description: 'Containerization, container management, deployment',
    },
    {
      name: 'Kubernetes',
      description: 'Orchestration, scaling, cloud-native solutions',
    },
    {
      name: 'CI/CD',
      description: 'Jenkins, GitHub Actions, automated testing and deployment',
    },
    {
      name: 'Git/GitHub',
      description: 'Version control, collaboration, repository management',
    },
  ],
  'Mobile & Testing': [
    {
      name: 'Flutter',
      description: 'Cross-platform mobile development, responsive UI',
    },
    {
      name: 'Kotlin',
      description: 'Android development, modern language features',
    },
    {
      name: 'Java',
      description: 'Android development, enterprise applications',
    },
    {
      name: 'Robot Framework',
      description: 'Automated testing, SQA, test automation',
    },
    {
      name: 'Appium',
      description: 'Mobile app testing, cross-platform testing',
    },
  ],
  'Tools & Methodologies': [
    {
      name: 'Agile/Scrum',
      description: 'Sprint planning, project management, team coordination',
    },
    {
      name: 'Jira',
      description: 'Project tracking, issue management, team collaboration',
    },
    {
      name: 'Training & Development',
      description: 'Curriculum design, bootcamp delivery, mentorship',
    },
    {
      name: 'Product Strategy',
      description: 'Product leadership, feature planning, scalability',
    },
  ],
};

export default function TechStackPage() {
  return (
    <main id="main-content" className='min-h-screen bg-background'>
      <Header />

      {/* Hero Section */}
      <section className='relative max-w-6xl mx-auto px-4 py-16 lg:py-24 text-center overflow-hidden'>
        {/* Background elements */}
        <div className='absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-primary/20 to-transparent rounded-full blur-3xl -z-10' />
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-accent/20 to-transparent rounded-full blur-3xl -z-10' />

        <div className='space-y-6 mb-16'>
          {/* Badge */}
          <div className='inline-block px-4 py-2 rounded-full glass border border-primary/20'>
            <span className='text-sm font-semibold text-primary'>
              ⚡ Technologies & Tools
            </span>
          </div>

          {/* Title */}
          <h1 className='text-5xl lg:text-6xl font-bold'>
            My{' '}
            <span className='bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent'>
              Tech Stack
            </span>
          </h1>

          {/* Description */}
          <p className='text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
            Comprehensive expertise spanning backend development, modern
            frontends, cloud infrastructure, and training. Expert proficiency in
            building{' '}
            <span className='text-primary font-semibold'>
              scalable, high-performance applications
            </span>{' '}
            and mentoring development teams.
          </p>

          {/* Stats */}
          <div className='flex flex-wrap justify-center gap-8 pt-8'>
            {[
              { value: '15+', label: 'Technologies' },
              { value: '6', label: 'Categories' },
              { value: '7+', label: 'Years Experience' },
            ].map((stat, i) => (
              <div key={i} className='text-center'>
                <div className='text-3xl font-bold bg-linear-to-br from-primary to-accent bg-clip-text text-transparent'>
                  {stat.value}
                </div>
                <div className='text-sm text-muted-foreground mt-1'>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Grid */}
      <section className='max-w-7xl mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {Object.entries(technologies).map(
            ([category, techs], categoryIndex) => {
              const IconComponent = categoryIcons[category];
              return (
                <div
                  key={category}
                  className='group relative'
                  style={{ animationDelay: `${categoryIndex * 0.1}s` }}
                >
                  {/* Category Card */}
                  <div className='glass rounded-2xl p-8 border-2 border-border/50 hover:border-primary/50 transition-all duration-500 h-full'>
                    {/* Category Header */}
                    <div className='flex items-center gap-4 mb-6 pb-4 border-b border-border/50'>
                      <div className='p-3 rounded-xl bg-linear-to-br from-primary/10 to-accent/10 group-hover:scale-110 transition-transform duration-300'>
                        {IconComponent && (
                          <IconComponent className='w-6 h-6 text-primary' />
                        )}
                      </div>
                      <h2 className='text-2xl font-bold capitalize group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all duration-300'>
                        {category}
                      </h2>
                    </div>

                    {/* Tech Items */}
                    <div className='space-y-4'>
                      {techs.map((tech, techIndex) => (
                        <div
                          key={tech.name}
                          className='group/item relative p-4 rounded-xl border border-border/30 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300'
                        >
                          {/* Tech name */}
                          <h3 className='font-bold text-foreground mb-1 group-hover/item:text-accent transition-colors duration-300'>
                            {tech.name}
                          </h3>
                          {/* Tech description */}
                          <p className='text-muted-foreground text-sm leading-relaxed'>
                            {tech.description}
                          </p>

                          {/* Hover indicator */}
                          <div className='absolute top-4 right-4 w-2 h-2 rounded-full bg-accent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300' />
                        </div>
                      ))}
                    </div>

                    {/* Tech count badge */}
                    <div className='mt-6 pt-4 border-t border-border/50'>
                      <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20'>
                        <span className='text-xs font-semibold text-primary'>
                          {techs.length} Technologies
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
