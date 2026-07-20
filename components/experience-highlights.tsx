import { Briefcase, GraduationCap, Award } from 'lucide-react';

import { client } from '@/sanity/lib/client';
import {
  certificationsQuery,
  educationQuery,
  experiencesQuery,
  homepageQuery,
} from '@/sanity/lib/queries';
import CertificationsGrid, {
  type Certification,
} from './certifications-grid';

type Experience = {
  _id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  responsibilities: string[];
  accomplishments: string[];
  skills: string[];
  active: boolean;
};

type Education = {
  _id: string;
  degree: string;
  school: string;
  focus: string;
  period: string;
};

type HomepageCopy = {
  experienceTitle?: string;
  certificationsTitle?: string;
  educationTitle?: string;
};

export default async function ExperienceHighlights() {
  const [experiences, education, certifications, homepage] =
    await Promise.all([
      client.fetch<Experience[]>(
        experiencesQuery,
        {},
        { next: { tags: ['experience'], revalidate: 3600 } }
      ),
      client.fetch<Education[]>(
        educationQuery,
        {},
        { next: { tags: ['education'], revalidate: 3600 } }
      ),
      client.fetch<Certification[]>(
        certificationsQuery,
        {},
        { next: { tags: ['certification'], revalidate: 3600 } }
      ),
      client.fetch<HomepageCopy | null>(
        homepageQuery,
        {},
        { next: { tags: ['homepage'], revalidate: 3600 } }
      ),
    ]);

  return (
    <section id='experience' className='py-32 relative overflow-hidden'>
      <div className='max-w-4xl mx-auto px-6 relative z-10'>
        <div className='mb-24'>
          <div className='flex items-center gap-3 mb-16'>
            <div className='p-2 bg-primary/10 rounded-lg'>
              <Briefcase className='w-6 h-6 text-primary' />
            </div>
            <h2 className='text-3xl font-bold text-foreground tracking-tight'>
              {homepage?.experienceTitle || 'Professional Journey'}
            </h2>
          </div>

          <div className='relative border-l border-border ml-3 space-y-16'>
            {experiences.map((job) => (
              <div key={job._id} className='relative pl-12 group'>
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
                      {job.responsibilities.map((resp) => (
                        <li
                          key={resp}
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
                      {job.accomplishments.map((acc) => (
                        <li
                          key={acc}
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
              {homepage?.certificationsTitle || 'Licenses & Certifications'}
            </h2>
          </div>

          <CertificationsGrid certifications={certifications} />
        </div>

        {/* Education */}
        <div id='education' className='scroll-mt-28'>
          <div className='flex items-center gap-3 mb-12'>
            <div className='p-2 bg-muted rounded-lg'>
              <GraduationCap className='w-6 h-6 text-muted-foreground' />
            </div>
            <h2 className='text-2xl font-bold text-foreground tracking-tight'>
              {homepage?.educationTitle || 'Education'}
            </h2>
          </div>

          <div className='grid gap-6'>
            {education.map((edu) => (
              <div
                key={edu._id}
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
