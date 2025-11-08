import Link from 'next/link';

const highlights = [
  {
    role: 'Chief Executive Officer',
    company: 'Sobat Psikotes',
    period: 'Jan 2024 - Present',
    description:
      'Leading trusted online psychometric testing platform used by national companies. Scaled platform to serve corporate clients with hundreds of participants per session.',
    tags: ['Product Strategy', 'Team Leadership', 'Data Security'],
  },
  {
    role: 'Sr. Trainer',
    company: 'Enigma Camp',
    period: 'Sep 2022 - Present',
    description:
      'Designing and delivering IT bootcamps for corporate clients. Trained 500+ developers on Golang, Java Spring Boot, Node.js, and Kubernetes with direct industry placement outcomes.',
    tags: ['Golang', 'Training', 'Kubernetes'],
  },
  {
    role: 'Founder',
    company: 'MIPDEVP - Digital Startup',
    period: 'Oct 2018 - Present',
    description:
      'Founded digital startup specializing in custom web and app development. Delivered 10+ projects including academic systems, cooperative management, and integrated campus solutions.',
    tags: ['Full-Stack', 'Entrepreneurship', 'Architecture'],
  },
];

export default function ExperienceHighlights() {
  return (
    <section className='relative max-w-6xl mx-auto px-4 py-20 overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-secondary/20 to-transparent rounded-full blur-3xl -z-10' />

      <div className='space-y-4 mb-16 text-center'>
        <div className='inline-block px-4 py-2 rounded-full glass border border-secondary/20 mb-4'>
          <span className='text-sm font-semibold text-secondary'>
            💼 Experience
          </span>
        </div>
        <h2 className='text-4xl lg:text-5xl font-bold'>
          Professional{' '}
          <span className='bg-linear-to-r from-primary to-accent bg-clip-text text-transparent'>
            Journey
          </span>
        </h2>
        <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
          7+ years of experience in development, training, entrepreneurship, and
          technical leadership.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
        {highlights.map((exp, index) => (
          <div
            key={exp.role}
            className='group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2'
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {/* Gradient border effect */}
            <div className='absolute inset-0 bg-linear-to-br from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl' />

            {/* Card content */}
            <div className='relative glass rounded-2xl p-8 border-2 border-border/50 group-hover:border-primary/50 transition-all duration-500 h-full flex flex-col'>
              {/* Index number */}
              <div className='absolute -top-3 -right-3 w-14 h-14 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center font-bold text-xl text-primary-foreground shadow-lg group-hover:scale-110 transition-transform duration-300'>
                {index + 1}
              </div>

              {/* Period badge */}
              <div className='mb-6'>
                <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20'>
                  <span className='w-2 h-2 rounded-full bg-accent animate-pulse' />
                  <span className='text-xs text-accent font-semibold'>
                    {exp.period}
                  </span>
                </div>
              </div>

              {/* Role and Company */}
              <div className='mb-4 grow'>
                <h3 className='text-xl font-bold text-foreground mb-2 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all duration-300'>
                  {exp.role}
                </h3>
                <p className='text-primary font-bold text-base mb-4'>
                  {exp.company}
                </p>
                <p className='text-muted-foreground text-sm leading-relaxed'>
                  {exp.description}
                </p>
              </div>

              {/* Tags */}
              <div className='flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50'>
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className='text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-md font-medium border border-primary/20'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-center'>
        <Link
          href='/experience'
          className='group px-8 py-4 glass text-foreground rounded-xl hover:border-accent hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-1 transition-all duration-300 font-semibold inline-flex items-center gap-2'
        >
          View Full Experience
          <span className='group-hover:translate-x-1 transition-transform duration-300'>
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
