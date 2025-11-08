import Link from 'next/link';

const featuredProjects = [
  {
    title: 'Sobat Psikotes',
    description:
      'CEO-led online psychometric testing platform trusted by national companies. Built core features including real-time psychogram reports, multi-device testing.',
    tags: ['Next.js', 'React.js', 'Product Strategy'],
    link: 'https://sobatpsikotes.com',
  },
  {
    title: 'LASIK JEC Landing Page',
    description:
      'Revamped eye hospital landing page from Figma designs into fully responsive Next.js application within 2 weeks.',
    tags: ['Next.js', 'TailwindCSS', 'Responsive Design'],
    link: '#',
  },
  {
    title: 'Enigma Camp Training Programs',
    description:
      'Designed and delivered comprehensive IT bootcamps on Golang, Java Spring Boot, Node.js. Trained 500+ developers.',
    tags: ['Golang', 'Java Spring Boot', 'Training'],
    link: '#',
  },
];

export default function FeaturedPortfolio() {
  return (
    <section className='relative max-w-6xl mx-auto px-4 py-20 overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute -left-20 top-40 w-96 h-96 bg-linear-to-br from-primary/20 to-transparent rounded-full blur-3xl -z-10' />

      <div className='space-y-4 mb-16 text-center'>
        <div className='inline-block px-4 py-2 rounded-full glass border border-accent/20 mb-4'>
          <span className='text-sm font-semibold text-accent'>
            🚀 Portfolio
          </span>
        </div>
        <h2 className='text-4xl lg:text-5xl font-bold'>
          Featured{' '}
          <span className='bg-linear-to-r from-primary to-accent bg-clip-text text-transparent'>
            Work
          </span>
        </h2>
        <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
          Explore my recent projects showcasing full-stack development, product
          leadership, and training excellence.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
        {featuredProjects.map((project, index) => (
          <a
            key={project.title}
            href={project.link}
            target='_blank'
            rel='noopener noreferrer'
            className='group relative glass rounded-2xl p-8 border border-border/50 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2 transition-all duration-500'
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {/* Gradient overlay on hover */}
            <div className='absolute inset-0 bg-linear-to-br from-primary/10 via-accent/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

            {/* Number badge */}
            <div className='absolute -top-4 -right-4 w-12 h-12 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center font-bold text-primary-foreground shadow-lg'>
              {index + 1}
            </div>

            <div className='relative'>
              <h3 className='text-xl font-bold text-foreground mb-3 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all duration-300'>
                {project.title}
              </h3>
              <p className='text-muted-foreground text-sm mb-6 leading-relaxed min-h-16'>
                {project.description}
              </p>
              <div className='flex flex-wrap gap-2'>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className='text-xs px-3 py-1.5 bg-accent/10 text-accent rounded-full font-medium border border-accent/20'
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow indicator */}
              <div className='mt-6 flex items-center gap-2 text-accent font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <span>View Project</span>
                <span className='group-hover:translate-x-1 transition-transform duration-300'>
                  →
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className='flex justify-center'>
        <Link
          href='/portfolio'
          className='group px-8 py-4 glass text-foreground rounded-xl hover:border-accent hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-1 transition-all duration-300 font-semibold inline-flex items-center gap-2'
        >
          View All Projects
          <span className='group-hover:translate-x-1 transition-transform duration-300'>
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
