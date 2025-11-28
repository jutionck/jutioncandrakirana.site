'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  GraduationCap,
  Award,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

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
    accomplishments: [],
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

const certifications = [
  {
    name: 'MongoDB Aggregation Fundamentals',
    issuer: 'MongoDB',
    date: 'Oct 2025',
    credentialLink: '#',
    credentialId: '',
  },
  {
    name: 'MongoDB Schema Design Patterns and Anti-patterns Skill Badge',
    issuer: 'MongoDB',
    date: 'Oct 2025',
    credentialLink: '#',
    credentialId: '',
  },
  {
    name: 'Belajar Dasar AI',
    issuer: 'Dicoding Indonesia',
    date: 'Sep 2025',
    credentialLink: '#',
    credentialId: '53XEK4LQVXRN',
  },
  {
    name: "From Relational Model (SQL) to MongoDB's Document Model",
    issuer: 'MongoDB',
    date: 'Sep 2025',
    credentialLink: '#',
    credentialId: '',
  },
  {
    name: 'Belajar Fundamental Deep Learning',
    issuer: 'Dicoding Indonesia',
    date: 'Aug 2025',
    credentialLink: '#',
    credentialId: '81P25G9LYPOY',
  },
  {
    name: 'AI Praktis untuk Produktivitas',
    issuer: 'Dicoding Indonesia',
    date: 'Jun 2025',
    credentialLink: '#',
    credentialId: 'KEXL2E1J0ZG2',
  },
  {
    name: 'Belajar Machine Learning untuk Pemula',
    issuer: 'Dicoding Indonesia',
    date: 'Jun 2025',
    credentialLink: '#',
    credentialId: '0LZ05OQ6NX65',
  },
  {
    name: 'Belajar Penggunaan Generative AI',
    issuer: 'Dicoding Indonesia',
    date: 'Jun 2025',
    credentialLink: '#',
    credentialId: 'NVP7JYQ2OXR0',
  },
  {
    name: 'Financial Literacy 101',
    issuer: 'Dicoding Indonesia',
    date: 'Jun 2025',
    credentialLink: '#',
    credentialId: '1OP82Q97VPQK',
  },
  {
    name: 'Belajar Dasar Visualisasi Data',
    issuer: 'Dicoding Indonesia',
    date: 'Apr 2025',
    credentialLink: '#',
    credentialId: 'QLZ93ERYDZ5D',
  },
  {
    name: 'Memulai Pemrograman dengan Python',
    issuer: 'Dicoding Indonesia',
    date: 'Apr 2025',
    credentialLink: '#',
    credentialId: 'KEXL7JD70XG2',
  },
  {
    name: 'Belajar Dasar-Dasar DevOps',
    issuer: 'Dicoding Indonesia',
    date: 'Nov 2024',
    credentialLink: '#',
    credentialId: '1OP84JVDQZQK',
  },
  {
    name: 'Belajar Jaringan Komputer untuk Pemula',
    issuer: 'Dicoding Indonesia',
    date: 'Nov 2024',
    credentialLink: '#',
    credentialId: 'QLZ9V6E8MX5D',
  },
  {
    name: 'Belajar Membuat Aplikasi Back-End untuk Pemula',
    issuer: 'Dicoding Indonesia',
    date: 'Dec 2023',
    credentialLink: '#',
    credentialId: 'NVP779E9WPR0',
  },
  {
    name: 'Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)',
    issuer: 'Dicoding Indonesia',
    date: 'Dec 2023',
    credentialLink: '#',
    credentialId: 'NVP7796EGPR0',
  },
  {
    name: 'Belajar Dasar Pemrograman JavaScript',
    issuer: 'Dicoding Indonesia',
    date: 'Sep 2023',
    credentialLink: '#',
    credentialId: '6RPN4663QX2M',
  },
  {
    name: 'Belajar Prinsip Pemrograman SOLID',
    issuer: 'Dicoding Indonesia',
    date: 'Dec 2022',
    credentialLink: '#',
    credentialId: '4EXG97RJDZRL',
  },
];

export default function ExperienceHighlights() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(certifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCertifications = certifications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const certSection = document.getElementById('certifications-grid');
    if (certSection) {
      certSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <section id='experience' className='py-32 relative overflow-hidden'>
      <div className='max-w-4xl mx-auto px-6 relative z-10'>
        <div className='mb-24'>
          <div className='flex items-center gap-3 mb-16'>
            <div className='p-2 bg-primary/10 rounded-lg'>
              <Briefcase className='w-6 h-6 text-primary' />
            </div>
            <h2 className='text-3xl font-bold text-foreground tracking-tight'>
              Professional Journey
            </h2>
          </div>

          <div className='relative border-l border-border ml-3 space-y-16'>
            {experiences.map((job) => (
              <div key={job.id} className='relative pl-12 group'>
                {/* Timeline Dot */}
                <div
                  className={`
                  absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full border-2 transition-all duration-300
                  ${
                    job.active
                      ? 'bg-background border-primary shadow-[0_0_15px_rgba(var(--primary),0.6)] scale-125'
                      : 'bg-card border-border group-hover:border-muted-foreground'
                  }
                `}
                />

                <div className='flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3'>
                  <h3 className='text-xl font-bold text-foreground group-hover:text-primary transition-colors'>
                    {job.role}
                  </h3>
                  <span className='font-mono text-xs text-muted-foreground tabular-nums'>
                    {job.period}
                  </span>
                </div>

                <div className='text-foreground/80 font-medium mb-4'>
                  {job.company}
                </div>

                <p className='text-muted-foreground leading-relaxed mb-4 font-light text-sm'>
                  {job.description}
                </p>

                {/* Responsibilities */}
                {job.responsibilities && job.responsibilities.length > 0 && (
                  <div className='mb-4'>
                    <h4 className='text-sm font-semibold text-foreground mb-2'>
                      Responsibilities:
                    </h4>
                    <ul className='list-disc list-outside ml-4 space-y-1'>
                      {job.responsibilities.map((resp: string, i: number) => (
                        <li
                          key={i}
                          className='text-sm text-muted-foreground font-light leading-relaxed'
                        >
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Accomplishments */}
                {job.accomplishments && job.accomplishments.length > 0 && (
                  <div className='mb-6'>
                    <h4 className='text-sm font-semibold text-foreground mb-2'>
                      Accomplishments:
                    </h4>
                    <ul className='list-disc list-outside ml-4 space-y-1'>
                      {job.accomplishments.map((acc: string, i: number) => (
                        <li
                          key={i}
                          className='text-sm text-muted-foreground font-light leading-relaxed'
                        >
                          {acc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className='flex flex-wrap gap-x-4 gap-y-1'>
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className='text-xs font-mono text-muted-foreground/60 group-hover:text-muted-foreground transition-colors'
                    >
                      #{skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div id='certifications' className='mb-24 scroll-mt-28'>
          <div className='flex items-center gap-3 mb-12'>
            <div className='p-2 bg-muted rounded-lg'>
              <Award className='w-6 h-6 text-muted-foreground' />
            </div>
            <h2 className='text-2xl font-bold text-foreground tracking-tight'>
              Licenses & Certifications
            </h2>
          </div>

          <div
            id='certifications-grid'
            className='grid grid-cols-1 md:grid-cols-2 gap-4'
          >
            {currentCertifications.map((cert, idx) => (
              <div
                key={idx}
                className='group p-6 rounded-xl border border-border bg-card/20 hover:bg-card/40 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between h-full'
              >
                <div>
                  <div className='flex items-start justify-between mb-4'>
                    <div className='p-2 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300'>
                      <Award className='w-5 h-5 text-primary' />
                    </div>
                    <span className='font-mono text-[10px] text-muted-foreground bg-background px-2 py-1 rounded-full border border-border'>
                      {cert.date}
                    </span>
                  </div>

                  <h3 className='text-base font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors'>
                    {cert.name}
                  </h3>
                  <div className='text-sm text-muted-foreground'>
                    {cert.issuer}
                  </div>
                  {cert.credentialId && (
                    <div className='text-xs text-muted-foreground/70 mt-1 font-mono'>
                      ID: {cert.credentialId}
                    </div>
                  )}
                </div>

                {cert.credentialLink && cert.credentialLink !== '#' && (
                  <div className='mt-4 pt-4 border-t border-border/50'>
                    <a
                      href={cert.credentialLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-xs font-medium text-primary hover:underline inline-flex items-center gap-1'
                    >
                      Show Credential
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className='flex justify-center items-center gap-4 mt-8'>
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className='p-2 rounded-lg border border-border bg-card/20 hover:bg-card/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                aria-label='Previous page'
              >
                <ChevronLeft className='w-5 h-5' />
              </button>
              <span className='text-sm font-mono text-muted-foreground'>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className='p-2 rounded-lg border border-border bg-card/20 hover:bg-card/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                aria-label='Next page'
              >
                <ChevronRight className='w-5 h-5' />
              </button>
            </div>
          )}
        </div>

        {/* Education */}
        <div id='education' className='scroll-mt-28'>
          <div className='flex items-center gap-3 mb-12'>
            <div className='p-2 bg-muted rounded-lg'>
              <GraduationCap className='w-6 h-6 text-muted-foreground' />
            </div>
            <h2 className='text-2xl font-bold text-foreground tracking-tight'>
              Education
            </h2>
          </div>

          <div className='grid gap-6'>
            {education.map((edu, idx) => (
              <div
                key={idx}
                className='flex flex-col md:flex-row md:items-center justify-between p-6 rounded-xl border border-border bg-card/20'
              >
                <div>
                  <h3 className='text-lg font-bold text-foreground mb-1'>
                    {edu.school}
                  </h3>
                  <div className='text-primary text-sm mb-2'>{edu.degree}</div>
                  <div className='text-muted-foreground text-sm'>
                    {edu.focus}
                  </div>
                </div>
                <div className='mt-4 md:mt-0 font-mono text-xs text-muted-foreground bg-background px-3 py-1 rounded-full border border-border'>
                  {edu.period}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
