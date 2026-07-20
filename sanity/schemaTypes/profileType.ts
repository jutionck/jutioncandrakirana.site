import { defineField, defineType } from 'sanity';

export const profileType = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  groups: [
    { name: 'identity', title: 'Identity' },
    { name: 'bio', title: 'Bio' },
    { name: 'contact', title: 'Contact' },
    { name: 'background', title: 'Background' },
  ],
  fields: [
    defineField({
      name: 'fullName',
      type: 'string',
      group: 'identity',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alternateNames',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'identity',
    }),
    defineField({
      name: 'jobTitle',
      type: 'string',
      group: 'identity',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'avatar',
      type: 'image',
      options: { hotspot: true },
      group: 'identity',
    }),
    defineField({
      name: 'description',
      title: 'Long description',
      type: 'text',
      rows: 3,
      description: 'Used for Person structured data and site meta description',
      group: 'bio',
    }),
    defineField({
      name: 'bioSegments',
      title: 'Hero bio (segments)',
      type: 'array',
      description:
        'Each segment renders inline; mark segments bold to highlight names like company/product names',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'text', type: 'string' }),
            defineField({ name: 'bold', type: 'boolean', initialValue: false }),
          ],
          preview: {
            select: { title: 'text', subtitle: 'bold' },
          },
        },
      ],
      group: 'bio',
    }),
    defineField({
      name: 'heroStack',
      title: 'Hero stack list',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Curated tech list shown in the hero code-block mockup',
      group: 'bio',
    }),
    defineField({
      name: 'heroEducationLabel',
      title: 'Hero education line',
      type: 'string',
      description: "e.g. 'Universitas Budi Luhur (Ongoing)'",
      group: 'bio',
    }),
    defineField({
      name: 'experienceLabel',
      type: 'string',
      description: "e.g. '7+ Years'",
      group: 'bio',
    }),
    defineField({
      name: 'email',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'country',
      type: 'string',
      description: "Short country code shown next to location, e.g. 'ID'",
      group: 'contact',
    }),
    defineField({
      name: 'timezone',
      type: 'string',
      description: "e.g. 'GMT+7'",
      group: 'contact',
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              options: { list: ['github', 'linkedin', 'email'] },
            }),
            defineField({ name: 'url', type: 'string' }),
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
      group: 'contact',
    }),
    defineField({
      name: 'employers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', type: 'string' }),
            defineField({ name: 'country', type: 'string' }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'country' },
          },
        },
      ],
      group: 'background',
    }),
    defineField({
      name: 'alumniOf',
      type: 'object',
      fields: [
        defineField({ name: 'name', type: 'string' }),
        defineField({ name: 'city', type: 'string' }),
        defineField({ name: 'country', type: 'string' }),
      ],
      group: 'background',
    }),
    defineField({
      name: 'nationality',
      type: 'string',
      group: 'background',
    }),
    defineField({
      name: 'knownLanguages',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'background',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Profile' };
    },
  },
});
