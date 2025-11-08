'use client';

import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import {
  ExternalLink,
  Briefcase,
  X,
  User,
  Code,
  FileText,
  Link as LinkIcon,
  Image as ImageIcon,
} from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    title: 'Sobat Psikotes',
    description:
      'Production-ready online psychometric testing platform trusted by national companies like Pizza Hut Indonesia. Built core features including real-time psychogram reports, multi-device testing. Scaled to serve hundreds of participants per session with modern UI/UX.',
    category: 'Product & Platform',
    tags: [
      'Next.js',
      'React.js',
      'Product Strategy',
      'Data Security',
      'Full-Stack',
      'Production',
    ],
    link: 'https://sobatpsikotes.com',
    role: 'CEO & Lead Developer',
    stack: [
      'Next.js',
      'React.js',
      'TypeScript',
      'TailwindCSS',
      'Node.js',
      'PostgreSQL',
    ],
    detailedDescription:
      'Leading the development and product strategy of Sobat Psikotes, a comprehensive online psychometric testing platform currently in production. Built from ground up with modern tech stack to serve corporate clients including Pizza Hut Indonesia and other national companies. Implemented real-time psychogram report generation, multi-device testing capabilities, and scalable architecture to handle hundreds of concurrent participants. Platform features secure data handling, responsive design for cross-device compatibility, and automated reporting system.',
    images: [],
  },
  {
    title: 'Student Pathfinder',
    description:
      'AI-powered student career recommendation platform using OpenAI for intelligent career path suggestions based on student profiles, interests, and academic performance.',
    category: 'AI & Machine Learning',
    tags: ['Java Spring Boot', 'PostgreSQL', 'OpenAI', 'AI/ML', 'RESTful API'],
    link: 'https://github.com/jutionck/be-student-pathfinder',
    role: 'Backend Developer',
    stack: [
      'Java Spring Boot',
      'PostgreSQL',
      'OpenAI API',
      'Gemini API',
      'REST API',
      'Maven',
    ],
    detailedDescription:
      'Developed an AI-powered career recommendation system for students using Java Spring Boot and PostgreSQL. Integrated OpenAI and Google Gemini APIs to provide intelligent career path suggestions based on comprehensive student profiles including academic performance, interests, and skills. The system analyzes student data and generates personalized career recommendations with detailed explanations. Implemented secure API endpoints, database optimization for fast query performance, and robust error handling for AI API integrations.',
    images: [],
  },
  {
    title: 'AI CV Evaluator',
    description:
      'Intelligent CV evaluation system powered by AI. Parses PDF resumes, extracts key information, and provides detailed feedback using vector database (Chroma) for semantic search and matching.',
    category: 'AI & Machine Learning',
    tags: [
      'Java Spring Boot',
      'PDF Parsing',
      'Vector DB',
      'Chroma',
      'AI/ML',
      'NLP',
    ],
    link: 'https://github.com/jutionck/ai-cv-evaluator',
    role: 'Backend Developer',
    stack: [
      'Java Spring Boot',
      'Apache PDFBox',
      'Chroma Vector DB',
      'OpenAI Embeddings',
      'PostgreSQL',
      'REST API',
    ],
    detailedDescription:
      'Built an advanced AI-powered CV evaluation system using Java Spring Boot. The system parses PDF resumes using Apache PDFBox, extracts structured information, and stores embeddings in Chroma vector database for semantic search. Leverages AI to provide comprehensive feedback on CV quality, skill matching, and improvement suggestions. Implemented document processing pipeline, vector similarity search for job matching, and detailed analytics on candidate profiles. Features include automated skill extraction, experience validation, and AI-generated recommendations for CV improvement.',
    images: [],
  },
  {
    title: 'LASIK JEC Landing Page',
    description:
      'Revamped eye hospital landing page from Figma designs into fully responsive Next.js application. Implemented pixel-perfect UI within 2 weeks with cross-browser and mobile optimization.',
    category: 'Web Development',
    tags: ['Next.js', 'React.js', 'TailwindCSS', 'Responsive Design'],
    link: '#',
    role: 'Frontend Developer',
    stack: [
      'Next.js',
      'React.js',
      'TailwindCSS',
      'TypeScript',
      'Responsive Design',
    ],
    detailedDescription:
      "Transformed Figma designs into a fully functional, responsive landing page for JEC Eye Hospital's LASIK services. Implemented pixel-perfect UI with attention to detail, ensuring cross-browser compatibility and mobile optimization. Completed within 2 weeks timeline with modern web technologies.",
    images: [],
  },
  {
    title: 'FOILA - Investment & Creative Platform',
    description:
      'Long-term development of investment and creative showcase platform for Lampung. Built features for investment transparency and created creative hub for local SME/UMKM products and artworks.',
    category: 'Web Development',
    tags: ['PHP', 'Laravel', 'Node.js', 'CodeIgniter', 'MySQL'],
    link: '#',
    role: 'Full-Stack Developer',
    stack: ['PHP', 'Laravel', 'Node.js', 'CodeIgniter', 'MySQL', 'Bootstrap'],
    detailedDescription:
      'Long-term development and maintenance of FOILA platform, serving as both investment information portal and creative showcase for Lampung region. Built comprehensive features for investment transparency and created a digital hub for local SME/UMKM products and artworks. Implemented content management system and responsive design.',
    images: [],
  },
  {
    title: 'Bank Indonesia Scholarship System',
    description:
      'Developed secure scholarship management website for Bank Indonesia Lampung. Ensured secure data handling and reliable online access for student scholarship applications and tracking.',
    category: 'Enterprise System',
    tags: ['CodeIgniter', 'PHP', 'MySQL', 'Web Security'],
    link: 'https://beasiswabilampung.com',
    role: 'Full-Stack Developer',
    stack: ['CodeIgniter', 'PHP', 'MySQL', 'Bootstrap', 'jQuery'],
    detailedDescription:
      'Developed a secure and reliable scholarship management system for Bank Indonesia Lampung branch. Implemented comprehensive features for student application submission, document management, and application tracking. Ensured data security and privacy compliance for handling sensitive student information.',
    images: [],
  },
  {
    title: 'MIPDEVP - Digital Solutions Portfolio',
    description:
      '10+ delivered projects spanning academic information systems, cooperative management apps, mosque management platforms, and integrated campus systems. Full-stack development from requirement analysis to deployment.',
    category: 'Enterprise System',
    tags: [
      'Full-Stack',
      'Project Management',
      'Architecture',
      'Entrepreneurship',
    ],
    link: 'https://mipdevp.com',
    role: 'Founder & Lead Developer',
    stack: [
      'PHP',
      'Laravel',
      'CodeIgniter',
      'MySQL',
      'JavaScript',
      'Bootstrap',
    ],
    detailedDescription:
      'Founded and led MIPDEVP, delivering 10+ custom software solutions since 2018. Portfolio includes academic information systems, cooperative management applications, mosque management platforms, and integrated campus systems. Handled full software development lifecycle from requirement gathering to deployment and maintenance.',
    images: [],
  },
  {
    title: 'Enigma Camp Training Programs',
    description:
      'Designed and delivered comprehensive IT bootcamps and corporate training on Golang, Java Spring Boot, Node.js, Angular, Flutter, and cloud technologies. Trained 500+ developers with direct placement outcomes.',
    category: 'Training & Education',
    tags: ['Golang', 'Java Spring Boot', 'Node.js', 'Training', 'Kubernetes'],
    link: '#',
    role: 'Senior Trainer',
    stack: [
      'Golang',
      'Java Spring Boot',
      'Node.js',
      'Angular',
      'Flutter',
      'Kubernetes',
      'Docker',
    ],
    detailedDescription:
      'Designed and delivered comprehensive IT bootcamp curricula and corporate training programs for Enigma Camp. Specialized in backend technologies (Golang, Java Spring Boot, Node.js), frontend frameworks (Angular), mobile development (Flutter), and cloud technologies (Kubernetes, Docker). Successfully trained 500+ developers with high placement rates in industry.',
    images: [],
  },
];

type Project = (typeof projects)[0];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const allCategories = [
    'All',
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const categoryCount = (category: string) => {
    if (category === 'All') return projects.length;
    return projects.filter((p) => p.category === category).length;
  };

  return (
    <main id='main-content' className='min-h-screen bg-background'>
      <Header />

      {/* Hero Section */}
      <section className='relative max-w-6xl mx-auto px-4 py-16 lg:py-24 text-center overflow-hidden'>
        {/* Background elements */}
        <div className='absolute top-0 left-0 w-96 h-96 bg-linear-to-br from-primary/20 to-transparent rounded-full blur-3xl -z-10' />
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-linear-to-tl from-accent/20 to-transparent rounded-full blur-3xl -z-10' />

        <div className='space-y-6 mb-16'>
          {/* Badge */}
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/20'>
            <Briefcase className='w-4 h-4 text-accent' />
            <span className='text-sm font-semibold text-accent'>
              Projects & Work
            </span>
          </div>

          {/* Title */}
          <h1 className='text-5xl lg:text-6xl font-bold'>
            My{' '}
            <span className='bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent'>
              Portfolio
            </span>
          </h1>

          {/* Description */}
          <p className='text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
            Featured projects showcasing expertise in{' '}
            <span className='text-primary font-semibold'>
              full-stack development
            </span>
            , product leadership, training programs, and scalable systems. Each
            project represents real-world impact and technical excellence.
          </p>

          {/* Stats */}
          <div className='flex flex-wrap justify-center gap-8 pt-8'>
            {[
              { value: `${projects.length}`, label: 'Projects' },
              { value: `${allCategories.length - 1}`, label: 'Categories' },
              { value: '500+', label: 'Users Impacted' },
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

      {/* Filter Section */}
      <section className='max-w-6xl mx-auto px-4 pb-8'>
        <div className='glass rounded-2xl p-6 border border-border/50'>
          <div className='flex gap-3 overflow-x-auto pb-2 scrollbar-hide'>
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap shrink-0 ${
                  selectedCategory === category
                    ? 'bg-linear-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30'
                    : 'glass text-foreground hover:border-accent/50'
                }`}
              >
                <div className='flex items-center gap-2'>
                  <span className='font-semibold'>{category}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedCategory === category
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-muted/50 text-muted-foreground'
                    }`}
                  >
                    {categoryCount(category)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className='max-w-6xl mx-auto px-4 py-8 pb-16'>
        {filteredProjects.length === 0 ? (
          <div className='text-center py-20'>
            <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-4'>
              <Briefcase className='w-10 h-10 text-muted-foreground' />
            </div>
            <h3 className='text-xl font-bold text-foreground mb-2'>
              No projects found
            </h3>
            <p className='text-muted-foreground'>
              Try selecting a different category
            </p>
          </div>
        ) : (
          <>
            <div className='mb-6 flex items-center justify-between'>
              <p className='text-sm text-muted-foreground'>
                Showing{' '}
                <span className='font-semibold text-primary'>
                  {filteredProjects.length}
                </span>{' '}
                {filteredProjects.length === 1 ? 'project' : 'projects'}
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {filteredProjects.map((project, index) => (
                <button
                  key={project.title}
                  onClick={() => setSelectedProject(project)}
                  className='group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 text-left w-full'
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* linear border glow */}
                  <div className='absolute inset-0 bg-linear-to-br from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl' />

                  {/* Card content */}
                  <div className='relative glass rounded-2xl p-8 border-2 border-border/50 group-hover:border-accent/50 transition-all duration-500 h-full flex flex-col'>
                    {/* Project number badge */}
                    <div className='absolute -top-3 -right-3 w-12 h-12 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center font-bold text-lg text-primary-foreground shadow-lg group-hover:scale-110 transition-transform duration-300'>
                      {index + 1}
                    </div>

                    {/* Category badge */}
                    <div className='mb-4'>
                      <span className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary'>
                        {project.category}
                      </span>
                    </div>

                    {/* Title with external link icon */}
                    <div className='flex items-start justify-between gap-3 mb-4'>
                      <h3 className='text-2xl font-bold text-foreground group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all duration-300 flex-1'>
                        {project.title}
                      </h3>
                      <ExternalLink className='w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors duration-300 shrink-0 mt-1' />
                    </div>

                    {/* Description */}
                    <p className='text-muted-foreground leading-relaxed mb-6 grow'>
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className='flex flex-wrap gap-2 pt-4 border-t border-border/50'>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className='text-xs px-3 py-1.5 bg-accent/10 text-accent rounded-full font-medium border border-accent/20'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View project indicator */}
                    <div className='mt-6 flex items-center gap-2 text-accent font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      <span>View Project</span>
                      <span className='group-hover:translate-x-1 transition-transform duration-300'>
                        →
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className='fixed inset-0 z-50 flex items-start md:items-center justify-center p-0 md:p-4 bg-background/80 backdrop-blur-sm overflow-y-auto'
          onClick={() => setSelectedProject(null)}
        >
          <div
            className='relative w-full max-w-4xl min-h-screen md:min-h-0 md:max-h-[90vh] md:overflow-y-auto glass md:rounded-2xl border-0 md:border-2 border-border/50 shadow-2xl'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className='sticky md:absolute top-4 right-4 z-10 p-2 rounded-lg glass hover:border-accent/50 transition-colors duration-200'
            >
              <X className='w-5 h-5' />
            </button>

            <div className='p-8 space-y-6'>
              {/* Header */}
              <div className='space-y-3'>
                <div className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary'>
                  {selectedProject.category}
                </div>
                <h2 className='text-4xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent'>
                  {selectedProject.title}
                </h2>
              </div>

              {/* Role */}
              <div className='flex items-start gap-3 p-4 rounded-xl bg-accent/5 border border-accent/20'>
                <User className='w-5 h-5 text-accent shrink-0 mt-0.5' />
                <div>
                  <h3 className='text-sm font-semibold text-muted-foreground mb-1'>
                    Role
                  </h3>
                  <p className='text-foreground font-medium'>
                    {selectedProject.role}
                  </p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className='space-y-3'>
                <div className='flex items-center gap-2'>
                  <Code className='w-5 h-5 text-primary' />
                  <h3 className='text-sm font-semibold text-foreground uppercase tracking-wide'>
                    Tech Stack
                  </h3>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {selectedProject.stack.map((tech) => (
                    <span
                      key={tech}
                      className='px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium border border-primary/20'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className='space-y-3'>
                <div className='flex items-center gap-2'>
                  <FileText className='w-5 h-5 text-accent' />
                  <h3 className='text-sm font-semibold text-foreground uppercase tracking-wide'>
                    Description
                  </h3>
                </div>
                <p className='text-muted-foreground leading-relaxed'>
                  {selectedProject.detailedDescription}
                </p>
              </div>

              {/* Project Link */}
              {selectedProject.link && selectedProject.link !== '#' && (
                <div className='space-y-3'>
                  <div className='flex items-center gap-2'>
                    <LinkIcon className='w-5 h-5 text-secondary' />
                    <h3 className='text-sm font-semibold text-foreground uppercase tracking-wide'>
                      Project Link
                    </h3>
                  </div>
                  <a
                    href={selectedProject.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary to-accent text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 font-semibold'
                  >
                    Visit Project
                    <ExternalLink className='w-4 h-4' />
                  </a>
                </div>
              )}

              {/* Images */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className='space-y-3'>
                  <div className='flex items-center gap-2'>
                    <ImageIcon className='w-5 h-5 text-accent' />
                    <h3 className='text-sm font-semibold text-foreground uppercase tracking-wide'>
                      Project Images
                    </h3>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {selectedProject.images.map((image, index) => (
                      <div
                        key={index}
                        className='relative aspect-video rounded-lg overflow-hidden border border-border/50'
                      >
                        <Image
                          src={image}
                          alt={`${selectedProject.title} - Image ${index + 1}`}
                          fill
                          className='object-cover'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
