'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { PROJECT_CATEGORIES } from '@/sanity/lib/constants';

export type Project = {
  _id: string;
  title: string;
  role: string;
  category: string;
  description: string;
  tags: string[];
  link?: string;
  featured: boolean;
};

const categories = ['All', ...PROJECT_CATEGORIES];

export default function FeaturedPortfolioClient({
  projects,
  title,
}: {
  projects: Project[];
  title: string;
}) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <>
      <div className='flex flex-col items-center mb-16'>
        <h2 className='text-3xl font-bold text-foreground font-mono uppercase tracking-tight mb-8'>
          {title}
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
        {filteredProjects.map((project) => (
          <div
            key={project._id}
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
              {project.link && (
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
    </>
  );
}
