import { defineField, defineType } from 'sanity';

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage Copy',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'skills', title: 'Skills Section' },
    { name: 'portfolio', title: 'Portfolio Section' },
    { name: 'experience', title: 'Experience Section' },
    { name: 'certifications', title: 'Certifications Section' },
    { name: 'education', title: 'Education Section' },
    { name: 'blogIndex', title: 'Blog Index' },
    { name: 'ctaSection', title: 'CTA Section' },
  ],
  fields: [
    defineField({
      name: 'heroStatusBadgeText',
      title: 'Status badge text',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeadlineLine1',
      title: 'Headline line 1',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeadlineLine2',
      title: 'Headline line 2',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroPrimaryCtaLabel',
      title: 'Primary CTA label',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroPrimaryCtaHref',
      title: 'Primary CTA link',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroFloatingBadges',
      title: 'Floating badges',
      type: 'array',
      description: 'Exactly 2 badges shown floating over the hero code block',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string' }),
            defineField({ name: 'value', type: 'string' }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
      group: 'hero',
    }),
    defineField({
      name: 'ctaBadgeText',
      title: 'Badge text',
      type: 'string',
      group: 'ctaSection',
    }),
    defineField({
      name: 'ctaHeadline',
      title: 'Headline',
      type: 'string',
      group: 'ctaSection',
    }),
    defineField({
      name: 'ctaSubheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
      group: 'ctaSection',
    }),
    defineField({
      name: 'skillsEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'skills',
    }),
    defineField({
      name: 'skillsTitle',
      title: 'Title',
      type: 'string',
      group: 'skills',
    }),
    defineField({
      name: 'skillsDescription',
      title: 'Description',
      type: 'text',
      rows: 2,
      group: 'skills',
    }),
    defineField({
      name: 'portfolioTitle',
      title: 'Title',
      type: 'string',
      group: 'portfolio',
    }),
    defineField({
      name: 'experienceTitle',
      title: 'Title',
      type: 'string',
      group: 'experience',
    }),
    defineField({
      name: 'certificationsTitle',
      title: 'Title',
      type: 'string',
      group: 'certifications',
    }),
    defineField({
      name: 'educationTitle',
      title: 'Title',
      type: 'string',
      group: 'education',
    }),
    defineField({
      name: 'blogIndexBadgeText',
      title: 'Badge text',
      type: 'string',
      group: 'blogIndex',
    }),
    defineField({
      name: 'blogIndexTitle',
      title: 'Title',
      type: 'string',
      group: 'blogIndex',
    }),
    defineField({
      name: 'blogIndexDescription',
      title: 'Description',
      type: 'text',
      rows: 2,
      group: 'blogIndex',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage Copy' };
    },
  },
});
