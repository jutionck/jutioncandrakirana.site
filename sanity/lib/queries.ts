import { groq } from 'next-sanity';

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    tags,
    mainImage,
    readTime
  }
`;

export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    tags,
    mainImage,
    readTime
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    tags,
    mainImage,
    readTime,
    body,
    seoTitle,
    seoDescription
  }
`;

export const allPostSlugsQuery = groq`
  *[_type == "post"]{ "slug": slug.current }
`;

export const sitemapPostsQuery = groq`
  *[_type == "post"]{ "slug": slug.current, publishedAt }
`;

export const relatedPostsQuery = groq`
  *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    mainImage,
    readTime
  }
`;

export const statsQuery = groq`
  *[_type == "stat"] | order(order asc) { value, label }
`;

export const skillCategoriesQuery = groq`
  *[_type == "skillCategory"] | order(order asc) {
    _id, title, icon, skills, wide
  }
`;

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id, title, role, category, description, tags, link, featured
  }
`;

export const experiencesQuery = groq`
  *[_type == "experience"] | order(order asc) {
    _id, role, company, period, description, responsibilities, accomplishments, skills, active
  }
`;

export const educationQuery = groq`
  *[_type == "education"] | order(order asc) {
    _id, degree, school, focus, period
  }
`;

export const certificationsQuery = groq`
  *[_type == "certification"] | order(order asc) {
    _id, name, issuer, dateLabel, credentialLink, credentialId
  }
`;

export const homepageQuery = groq`
  *[_type == "homepage" && _id == "homepage"][0]
`;

export const profileQuery = groq`
  *[_type == "profile" && _id == "profile"][0]
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0]
`;

export const skillNamesQuery = groq`
  *[_type == "skillCategory"].skills[]
`;
