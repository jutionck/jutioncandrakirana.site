import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Clock, Calendar, Tag, ArrowRight } from 'lucide-react';

import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { allPostsQuery, homepageQuery } from '@/sanity/lib/queries';
import type { Image as SanityImage } from 'sanity';

export const metadata: Metadata = {
  description:
    'Jution Candra Kirana - Technical articles about modern web development, microservices architecture, performance optimization, and cloud technologies. Sharing knowledge from real-world experience.',
  alternates: {
    canonical: 'https://jutioncandrakirana.site/blog',
  },
};

type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
  mainImage: SanityImage;
  readTime: string;
};

type HomepageCopy = {
  blogIndexBadgeText?: string;
  blogIndexTitle?: string;
  blogIndexDescription?: string;
};

export default async function BlogPage() {
  const [posts, homepage] = await Promise.all([
    client.fetch<PostSummary[]>(
      allPostsQuery,
      {},
      { next: { tags: ['post'], revalidate: 3600 } }
    ),
    client.fetch<HomepageCopy | null>(
      homepageQuery,
      {},
      { next: { tags: ['homepage'], revalidate: 3600 } }
    ),
  ]);

  return (
    <main id='main-content' className='min-h-screen bg-background'>
      <Header />

      {/* Hero Section */}
      <section className='relative pt-32 pb-16 overflow-hidden'>
        {/* Background elements */}
        <div className='absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-primary/10 to-transparent rounded-full blur-3xl -z-10' />
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-accent/10 to-transparent rounded-full blur-3xl -z-10' />

        <div className='max-w-4xl mx-auto px-6 text-center'>
          <div className='space-y-6 mb-16'>
            {/* Badge */}
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20'>
              <BookOpen className='w-4 h-4 text-primary' />
              <span className='text-sm font-semibold text-primary'>
                {homepage?.blogIndexBadgeText || 'Technical Articles'}
              </span>
            </div>

            {/* Title */}
            <h1 className='text-5xl lg:text-6xl font-bold tracking-tight text-foreground'>
              {homepage?.blogIndexTitle || 'My Blog'}
            </h1>

            {/* Description */}
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
              {homepage?.blogIndexDescription ||
                'Technical articles about modern web development, architecture, and best practices. Sharing knowledge and insights from real-world experience.'}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className='max-w-5xl mx-auto px-6 pb-24'>
        <div className='grid gap-12'>
          {posts.map((post) => (
            <article
              key={post.slug}
              className='group relative flex flex-col md:flex-row gap-8 p-6 rounded-3xl border border-border bg-card/30 hover:bg-card/50 hover:border-primary/30 transition-all duration-500'
            >
              {/* Thumbnail */}
              <div className='md:w-80 shrink-0'>
                <div className='relative aspect-video w-full overflow-hidden rounded-2xl bg-muted border border-border/50 shadow-sm group-hover:shadow-md transition-all duration-500'>
                  <Image
                    src={urlFor(post.mainImage).width(640).height(360).url()}
                    alt={post.title}
                    fill
                    className='object-cover transition-transform duration-700 group-hover:scale-105'
                    sizes='(max-width: 768px) 100vw, 320px'
                  />
                  <div className='absolute inset-0 bg-linear-to-t from-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                </div>
              </div>

              {/* Content */}
              <div className='flex-1 flex flex-col justify-center'>
                {/* Meta info */}
                <div className='flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground mb-4'>
                  <div className='flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-full'>
                    <Calendar className='w-3.5 h-3.5' />
                    <time>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                  </div>
                  <div className='flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-full'>
                    <Clock className='w-3.5 h-3.5' />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className='text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 leading-tight'>
                  <Link
                    href={`/blog/${post.slug}`}
                    className='before:absolute before:inset-0'
                  >
                    {post.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className='text-muted-foreground leading-relaxed mb-6 line-clamp-2'>
                  {post.excerpt}
                </p>

                {/* Tags & Action */}
                <div className='flex items-center justify-between mt-auto'>
                  <div className='flex flex-wrap gap-2 relative z-10'>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className='inline-flex items-center gap-1 text-[10px] px-2.5 py-1 bg-primary/5 text-primary/80 rounded-full font-medium border border-primary/10 group-hover:bg-primary/10 group-hover:text-primary transition-colors'
                      >
                        <Tag className='w-3 h-3' />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className='hidden md:flex items-center gap-1 text-sm font-medium text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300'>
                    Read Article <ArrowRight className='w-4 h-4' />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
