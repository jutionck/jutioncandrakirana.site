import { defineField, defineType } from 'sanity';
import { CATEGORIES } from '../../lib/categories';

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: CATEGORIES.map((c) => ({ title: c.label, value: c.value })),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'readTime',
      type: 'string',
      description: "e.g. '8 min read'",
    }),
    defineField({
      name: 'body',
      title: 'Body (Markdown)',
      type: 'text',
      rows: 20,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seoTitle',
      type: 'string',
      description: 'Falls back to Title if empty',
    }),
    defineField({
      name: 'seoDescription',
      type: 'text',
      rows: 2,
      description: 'Falls back to Excerpt if empty',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'mainImage', subtitle: 'excerpt' },
  },
});
