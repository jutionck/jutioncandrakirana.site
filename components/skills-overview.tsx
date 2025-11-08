import Link from 'next/link';

const skillCategories = [
  {
    category: 'Backend & API',
    icon: '⚙️',
    skills: ['Golang', 'Java Spring Boot', 'Node.js', 'PHP'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    category: 'Frontend',
    icon: '🎨',
    skills: ['Next.js', 'React.js', 'TypeScript', 'TailwindCSS'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    category: 'Databases',
    icon: '💾',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    category: 'DevOps & Cloud',
    icon: '☁️',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'Git/GitHub'],
    color: 'from-orange-500 to-red-500',
  },
  {
    category: 'Mobile & Testing',
    icon: '📱',
    skills: ['Flutter', 'Kotlin', 'Robot Framework', 'Appium'],
    color: 'from-indigo-500 to-blue-500',
  },
  {
    category: 'Leadership',
    icon: '🎯',
    skills: ['Agile/Scrum', 'Training', 'Product Strategy', 'Team Management'],
    color: 'from-yellow-500 to-amber-500',
  },
];

export default function SkillsOverview() {
  return (
    <section className='relative max-w-6xl mx-auto px-4 py-20 overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute top-20 right-0 w-72 h-72 bg-linear-to-br from-accent/20 to-transparent rounded-full blur-3xl -z-10' />

      <div className='space-y-4 mb-16 text-center'>
        <div className='inline-block px-4 py-2 rounded-full glass border border-primary/20 mb-4'>
          <span className='text-sm font-semibold text-primary'>
            💡 Tech Stack
          </span>
        </div>
        <h2 className='text-4xl lg:text-5xl font-bold'>
          Technical{' '}
          <span className='bg-linear-to-r from-primary to-accent bg-clip-text text-transparent'>
            Expertise
          </span>
        </h2>
        <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
          Comprehensive skill set spanning full-stack development, cloud
          infrastructure, and technical leadership.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
        {skillCategories.map((item, index) => (
          <div
            key={item.category}
            className='group relative glass rounded-2xl p-6 border border-border/50 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-1 transition-all duration-500'
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Hover glow effect */}
            <div className='absolute inset-0 bg-linear-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

            <div className='relative'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='p-3 rounded-xl bg-linear-to-br from-primary/10 to-accent/10 group-hover:scale-110 transition-transform duration-300'>
                  <span className='text-3xl'>{item.icon}</span>
                </div>
                <h3 className='font-bold text-lg group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all duration-300'>
                  {item.category}
                </h3>
              </div>
              <div className='flex flex-wrap gap-2'>
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className='text-xs px-3 py-1.5 bg-accent/10 text-accent rounded-full font-medium border border-accent/20 hover:bg-accent/20 hover:scale-105 transition-all duration-200 cursor-default'
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-center'>
        <Link
          href='/tech-stack'
          className='group px-8 py-4 glass text-foreground rounded-xl hover:border-accent hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-1 transition-all duration-300 font-semibold inline-flex items-center gap-2'
        >
          Explore Full Tech Stack
          <span className='group-hover:translate-x-1 transition-transform duration-300'>
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
