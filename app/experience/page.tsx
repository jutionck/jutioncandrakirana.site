import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Experience',
  description: '7+ years journey spanning development, training, and entrepreneurship. CEO at Sobat Psikotes, Senior Trainer at Enigma Camp, Founder of MIPDEVP. Trained 500+ developers.',
};

const experienceByCompany = [
  {
    company: 'Sobat Psikotes',
    positions: [
      {
        role: 'Chief Executive Officer',
        period: 'January 2024 - Present',
        description:
          'Leading the development of a trusted online psychometric testing platform used by national companies. Built core features including real-time psychogram reports, multi-device testing, and intuitive user experience. Scaled platform adoption to serve corporate clients with hundreds of participants per session, focusing on product scalability, data security, and modern UI/UX.',
        technologies: [
          'Next.js',
          'React.js',
          'Product Strategy',
          'Team Leadership',
          'Data Security',
        ],
      },
    ],
  },
  {
    company: 'Enigma Camp',
    positions: [
      {
        role: 'Sr. Trainer',
        period: 'September 2022 - Present',
        description:
          "Designing and delivering IT bootcamps for corporate and individual trainees, focusing on backend development, software testing, and cloud technologies. Conducted training on Golang API, Java Spring Boot, Angular, TypeScript, Node.js, and Kubernetes. Facilitated corporate programs for major banks (Danamon, Bank Mandiri, SMM) under ITDP & Enigma 2.0 initiatives. Improved participants' technical readiness enabling direct placement into industry roles.",
        technologies: [
          'Golang',
          'Java Spring Boot',
          'Node.js',
          'Kubernetes',
          'Docker',
          'Training & Development',
        ],
      },
      {
        role: 'Trainer (Contract)',
        period: 'January 2022 - September 2022',
        description:
          'Delivered bootcamps for corporate clients on Golang, PostgreSQL, MongoDB, with additional upskilling classes in Laravel, Angular, and Flutter. Conducted both onsite and online sessions using hands-on, project-based learning. Enhanced participant proficiency in full-stack development and deployment.',
        technologies: [
          'Golang',
          'PostgreSQL',
          'MongoDB',
          'Laravel',
          'Angular',
          'Flutter',
        ],
      },
      {
        role: 'Jr. Trainer',
        period: 'October 2020 - January 2022',
        description:
          'Designed and developed syllabi for Golang, JavaScript, TypeScript, ReactJS, Angular, Flutter, and Java. Trained participants through blended (offline & online) classes for corporate clients, aligning with industry requirements.',
        technologies: [
          'Golang',
          'JavaScript',
          'TypeScript',
          'React.js',
          'Angular',
          'Flutter',
          'Java',
        ],
      },
      {
        role: 'Full-Stack Bootcamp Trainee',
        period: 'June 2020 - October 2020',
        description:
          'Completed an intensive online bootcamp focused on backend, frontend, and mobile development. Backend: Built REST APIs using Golang. Frontend: Developed interactive user interfaces with React.js. Mobile: Created Android apps using Kotlin. Practiced version control (Git) and relational databases (MySQL).',
        technologies: [
          'Golang',
          'React.js',
          'Kotlin',
          'Git',
          'MySQL',
          'REST APIs',
        ],
      },
    ],
  },
  {
    company: 'MIPDEVP - Digital Startup',
    positions: [
      {
        role: 'Founder',
        period: 'October 2018 - Present',
        description:
          'Founded a digital startup specializing in custom web and application development. Delivered 10+ projects including academic information systems, cooperative management apps, mosque management platforms, and integrated campus systems. Led end-to-end development including requirement analysis, architecture, implementation, and deployment. Sustained business operations with recurring clients since 2018.',
        technologies: [
          'Full-Stack',
          'Project Management',
          'Entrepreneurship',
          'Architecture',
        ],
      },
    ],
  },
  {
    company: 'LASIK JEC',
    positions: [
      {
        role: 'Frontend Developer (Next.js)',
        period: 'September 2025 - Present',
        description:
          'Revamped the LASIK JEC landing page by converting Figma designs into a fully responsive Next.js application. Implemented pixel-perfect UI from scratch within 2 weeks, ensuring cross-browser and mobile compatibility. Enhanced page performance and user experience through clean code and optimized components.',
        technologies: [
          'Next.js',
          'React.js',
          'TailwindCSS',
          'Responsive Design',
        ],
      },
    ],
  },
  {
    company: 'PT Sarimelati Kencana (Pizza Hut Indonesia)',
    positions: [
      {
        role: 'Project Manager - Psikotes Application',
        period: 'January 2024 - June 2024',
        description:
          'Led a 4-member cross-functional team (UI/UX Designer, Backend Developer, Frontend Developer, DevOps Engineer) in developing the Sobat Psikotes application for Pizza Hut Indonesia. Defined project scope, allocated tasks, and monitored progress to ensure deliverables were completed on time. Acted as main point of contact for the client, translating business requirements into technical tasks. Facilitated regular stand-ups and progress reviews for smooth communication and issue resolution.',
        technologies: [
          'Project Management',
          'Agile',
          'Team Leadership',
          'Stakeholder Management',
        ],
      },
    ],
  },
  {
    company: 'Multiple Clients - FOILA & Bank Indonesia',
    positions: [
      {
        role: 'Freelance Web Developer',
        period: 'December 2018 - January 2023',
        description:
          'Contributed to long-term development of FOILA, an investment and creative showcase platform for Lampung. Built and enhanced features to support investment information transparency. Developed scholarship management website for Bank Indonesia Lampung with secure data handling and reliable online access. Migrated and maintained systems using PHP, Laravel, Node.js, and CodeIgniter.',
        technologies: [
          'PHP',
          'Laravel',
          'Node.js',
          'CodeIgniter',
          'MySQL',
          'Web Hosting',
        ],
      },
    ],
  },
  {
    company: 'Politeknik Negeri Lampung',
    positions: [
      {
        role: 'Dosen Praktisi Mengajar (Teaching Practitioner)',
        period: 'September 2022 - October 2022',
        description:
          "Invited as an industry practitioner under the Indonesian Ministry of Education's 'Praktisi Mengajar' program. Delivered a short-course on Mobile Programming with focus on Java and Android Development. Collaborated with academic lecturers to align curriculum with industry practices. Helped students gain practical skills to prepare for professional careers in software development.",
        technologies: ['Java', 'Android Development', 'Mobile Programming'],
      },
    ],
  },
  {
    company: 'LP3i Indonesia',
    positions: [
      {
        role: 'Lecturer (Part-time)',
        period: 'February 2019 - October 2020',
        description:
          'Part-time lecturer in Database and Web Programming courses. Taught Database Administration, Web Design, and Web Programming with a practical, project-based approach. Mentored students to apply database and web technologies in real-world scenarios.',
        technologies: [
          'Database Administration',
          'Web Design',
          'CodeIgniter',
          'CSS',
          'Bootstrap',
          'JavaScript',
        ],
      },
    ],
  },
];

const education = [
  {
    degree: "Master's Degree",
    school: 'Universitas Budi Luhur',
    year: 'January 2024 - Present',
    details:
      'Focus on Data Analytics and Machine Learning. Coursework and research on data preprocessing, predictive modeling, and algorithm evaluation.',
  },
  {
    degree: "Bachelor's Degree - Informatics Engineering",
    school: 'Institut Informatika dan Bisnis Darmajaya',
    year: 'September 2016 - April 2018',
    details:
      'Expert Systems concentration. Specialized in knowledge-based systems for decision support.',
  },
];

export default function ExperiencePage() {
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
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20'>
            <Briefcase className='w-4 h-4 text-primary' />
            <span className='text-sm font-semibold text-primary'>
              Career Journey
            </span>
          </div>

          {/* Title */}
          <h1 className='text-5xl lg:text-6xl font-bold'>
            My{' '}
            <span className='bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent'>
              Experience
            </span>
          </h1>

          {/* Description */}
          <p className='text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
            A{' '}
            <span className='text-primary font-semibold'>7+ year journey</span>{' '}
            spanning development, training, entrepreneurship, and technical
            leadership in software engineering. Building products, mentoring
            developers, and driving digital transformation.
          </p>

          {/* Stats */}
          <div className='flex flex-wrap justify-center gap-8 pt-8'>
            {[
              { value: '7+', label: 'Years' },
              { value: `${experienceByCompany.length}`, label: 'Companies' },
              { value: '500+', label: 'Trained Developers' },
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

      {/* Work Experience Section */}
      <section className='max-w-6xl mx-auto px-4 py-8'>
        <div className='mb-12 flex items-center gap-3'>
          <Briefcase className='w-6 h-6 text-primary' />
          <h2 className='text-3xl font-bold text-foreground'>
            Work Experience
          </h2>
        </div>

        <div className='space-y-6'>
          {experienceByCompany.map((company, index) => (
            <div
              key={company.company}
              className='group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1'
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient border effect */}
              <div className='absolute inset-0 bg-linear-to-br from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl' />

              {/* Card content */}
              <div className='relative glass rounded-2xl p-8 border-2 border-border/50 group-hover:border-primary/50 transition-all duration-500'>
                {/* Index number */}
                <div className='absolute -top-3 -right-3 w-12 h-12 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center font-bold text-lg text-primary-foreground shadow-lg group-hover:scale-110 transition-transform duration-300'>
                  {index + 1}
                </div>

                {/* Company Header */}
                <div className='mb-6'>
                  <div className='flex items-center gap-2 text-primary font-bold text-xl mb-2'>
                    <MapPin className='w-5 h-5' />
                    <span>{company.company}</span>
                  </div>
                </div>

                {/* Positions */}
                <div className='space-y-6'>
                  {company.positions.map((position, posIndex) => (
                    <div
                      key={position.role}
                      className={
                        posIndex > 0 ? 'pt-6 border-t border-border/30' : ''
                      }
                    >
                      {/* Period badge */}
                      <div className='mb-3'>
                        <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20'>
                          <Calendar className='w-3.5 h-3.5 text-accent' />
                          <span className='text-xs text-accent font-semibold'>
                            {position.period}
                          </span>
                        </div>
                      </div>

                      {/* Role */}
                      <div className='mb-4'>
                        <h3 className='text-xl font-bold text-foreground mb-3 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all duration-300'>
                          {position.role}
                        </h3>
                        <p className='text-muted-foreground leading-relaxed'>
                          {position.description}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div className='flex flex-wrap gap-2'>
                        {position.technologies.map((tech) => (
                          <span
                            key={tech}
                            className='text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-md font-medium border border-primary/20'
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className='max-w-6xl mx-auto px-4 py-8'>
        <div className='mb-12 flex items-center gap-3'>
          <GraduationCap className='w-6 h-6 text-secondary' />
          <h2 className='text-3xl font-bold text-foreground'>Education</h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {education.map((edu, index) => (
            <div
              key={edu.degree}
              className='group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1'
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient border effect */}
              <div className='absolute inset-0 bg-linear-to-br from-secondary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl' />

              {/* Card content */}
              <div className='relative glass rounded-2xl p-8 border-2 border-border/50 group-hover:border-secondary/50 transition-all duration-500 h-full'>
                {/* Icon badge */}
                <div className='mb-4'>
                  <div className='inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-secondary/20 to-accent/20 group-hover:scale-110 transition-transform duration-300'>
                    <GraduationCap className='w-6 h-6 text-secondary' />
                  </div>
                </div>

                {/* Year badge */}
                <div className='mb-4'>
                  <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20'>
                    <Calendar className='w-3.5 h-3.5 text-secondary' />
                    <span className='text-xs text-secondary font-semibold'>
                      {edu.year}
                    </span>
                  </div>
                </div>

                {/* Degree and School */}
                <div>
                  <h3 className='text-xl font-bold text-foreground mb-2 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-secondary group-hover:to-accent group-hover:bg-clip-text transition-all duration-300'>
                    {edu.degree}
                  </h3>
                  <p className='text-secondary font-bold text-base mb-4'>
                    {edu.school}
                  </p>
                  <p className='text-muted-foreground leading-relaxed'>
                    {edu.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
