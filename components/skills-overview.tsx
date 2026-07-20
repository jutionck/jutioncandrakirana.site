import {
  Server,
  Layout,
  Database,
  Cloud,
  Users,
  Cpu,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';

import { client } from '@/sanity/lib/client';
import { homepageQuery, skillCategoriesQuery } from '@/sanity/lib/queries';

const ICON_MAP: Record<string, LucideIcon> = {
  server: Server,
  layout: Layout,
  database: Database,
  cloud: Cloud,
  cpu: Cpu,
  users: Users,
};

type SkillCategory = {
  _id: string;
  title: string;
  icon: string;
  skills: string[];
  wide: boolean;
};

type HomepageCopy = {
  skillsEyebrow?: string;
  skillsTitle?: string;
  skillsDescription?: string;
};

export default async function SkillsOverview() {
  const [skillCategories, homepage] = await Promise.all([
    client.fetch<SkillCategory[]>(
      skillCategoriesQuery,
      {},
      { next: { tags: ['skillCategory'], revalidate: 3600 } }
    ),
    client.fetch<HomepageCopy | null>(
      homepageQuery,
      {},
      { next: { tags: ['homepage'], revalidate: 3600 } }
    ),
  ]);

  return (
    <section id='tech-stack' className='py-32 relative'>
      <div className='max-w-6xl mx-auto px-6'>
        <div className='flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4'>
          <div>
            <span className='text-primary font-mono text-sm tracking-wider uppercase mb-2 block'>
              {homepage?.skillsEyebrow || 'Technical Arsenal'}
            </span>
            <h2 className='text-3xl md:text-5xl font-bold text-foreground tracking-tight'>
              {homepage?.skillsTitle || 'Core Competencies'}
            </h2>
          </div>
          <p className='text-muted-foreground max-w-sm text-sm md:text-base'>
            {homepage?.skillsDescription ||
              'Comprehensive toolset for building scalable enterprise systems, from bare-metal backend to distributed cloud architecture.'}
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {skillCategories.map((category) => {
            const Icon = ICON_MAP[category.icon] ?? Server;
            return (
              <div
                key={category._id}
                className={`
                  group p-8 rounded-2xl border border-border bg-card/20 hover:bg-card/40 transition-all duration-300 relative overflow-hidden
                  ${category.wide ? 'md:col-span-2' : ''}
                `}
              >
                <div className='absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity'>
                  <ArrowUpRight className='w-5 h-5 text-muted-foreground' />
                </div>

                <div className='w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-foreground mb-6 group-hover:scale-110 transition-transform duration-300'>
                  <Icon className='w-6 h-6' />
                </div>

                <h3 className='text-xl font-bold text-foreground mb-4'>
                  {category.title}
                </h3>

                <div className='flex flex-wrap gap-2'>
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className='px-3 py-1.5 text-xs font-mono font-medium text-muted-foreground bg-background border border-border rounded-md group-hover:text-foreground group-hover:border-muted-foreground/50 transition-colors'
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
