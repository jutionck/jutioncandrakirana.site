import { defineField, defineType } from 'sanity';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'siteName',
      type: 'string',
      description: "Short name used in footer/OG, e.g. 'JCK.site'",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logoText',
      type: 'string',
      description: "Header logo text, e.g. 'JCK'",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'keywords',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'siteUrl',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ogImage',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'twitterHandle',
      type: 'string',
      description: "e.g. '@jutioncandrakirana'",
    }),
    defineField({
      name: 'googleSiteVerification',
      type: 'string',
      description: 'Leave empty until you have a real verification code',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    },
  },
});
