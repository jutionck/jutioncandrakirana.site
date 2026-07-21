import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  Clock,
  Calendar,
  Tag,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from 'lucide-react';

import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { allPostsQuery, homepageQuery } from '@/sanity/lib/queries';
import { CATEGORIES, categoryLabel } from '@/lib/categories';
import type { Image as SanityImage } from 'sanity';

const POSTS_PER_PAGE = 6;

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
  category: string;
  tags: string[];
  mainImage: SanityImage;
  readTime: string;
};

type HomepageCopy = {
  blogIndexBadgeText?: string;
  blogIndexTitle?: string;
  blogIndexDescription?: string;
};

function buildBlogHref({
  category,
  page,
  query,
}: {
  category?: string;
  page?: number;
  query?: string;
}) {
  const search = new URLSearchParams();
  if (category) search.set('category', category);
  if (query) search.set('q', query);
  if (page && page > 1) search.set('page', String(page));
  const qs = search.toString();
  return qs ? `/blog?${qs}` : '/blog';
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string; q?: string }>;
}) {
  const { category, page: pageParam, q } = await searchParams;
  const activeCategory =
    category && CATEGORIES.some((c) => c.value === category)
      ? category
      : undefined;
  const activeSearch = q?.trim() || undefined;
  const requestedPage = Math.max(1, Number.parseInt(pageParam ?? '1', 10) || 1);

  const [posts, homepage] = await Promise.all([
    client.fetch<PostSummary[], { category: string; search: string }>(
      allPostsQuery,
      { category: activeCategory ?? '', search: activeSearch ?? '' },
      { next: { tags: ['post'], revalidate: 3600 } }
    ),
    client.fetch<HomepageCopy | null>(
      homepageQuery,
      {},
      { next: { tags: ['homepage'], revalidate: 3600 } }
    ),
  ]);

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(requestedPage, totalPages);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

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

          {/* Search */}
          <form
            action='/blog'
            method='GET'
            className='relative max-w-lg mx-auto mb-8'
          >
            {activeCategory && (
              <input type='hidden' name='category' value={activeCategory} />
            )}
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none' />
            <input
              type='text'
              name='q'
              defaultValue={activeSearch ?? ''}
              placeholder='Search articles...'
              className='w-full pl-11 pr-11 py-3 rounded-full border border-border bg-card/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all'
            />
            {activeSearch && (
              <Link
                href={buildBlogHref({ category: activeCategory })}
                aria-label='Clear search'
                className='absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
              >
                <X className='w-4 h-4' />
              </Link>
            )}
          </form>

          {/* Category Filter */}
          <div className='flex flex-wrap items-center justify-center gap-2'>
            <Link
              href={buildBlogHref({ query: activeSearch })}
              className={`px-4 py-2 text-xs font-medium rounded-full border transition-all ${
                !activeCategory
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'text-muted-foreground border-border hover:text-foreground hover:border-primary/50'
              }`}
            >
              All
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.value}
                href={buildBlogHref({ category: c.value, query: activeSearch })}
                className={`px-4 py-2 text-xs font-medium rounded-full border transition-all ${
                  activeCategory === c.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'text-muted-foreground border-border hover:text-foreground hover:border-primary/50'
                }`}
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className='max-w-5xl mx-auto px-6 pb-24'>
        {paginatedPosts.length === 0 ? (
          <div className='text-center py-24 text-muted-foreground'>
            No articles found
            {activeSearch ? ` for "${activeSearch}"` : ''}
            {activeCategory ? ` in "${categoryLabel(activeCategory)}"` : ''}.
          </div>
        ) : (
          <div className='grid gap-12'>
            {paginatedPosts.map((post) => (
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
                    <span className='px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20'>
                      {categoryLabel(post.category)}
                    </span>
                    <div className='flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-full'>
                      <Calendar className='w-3.5 h-3.5' />
                      <time>
                        {new Date(post.publishedAt).toLocaleDateString(
                          'en-US',
                          {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          }
                        )}
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
                      {post.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className='inline-flex items-center gap-1 text-[10px] px-2.5 py-1 bg-primary/5 text-primary/80 rounded-full font-medium border border-primary/10 group-hover:bg-primary/10 group-hover:text-primary transition-colors'
                        >
                          <Tag className='w-3 h-3' />
                          {t}
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
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            aria-label='Blog pagination'
            className='flex items-center justify-center gap-2 mt-16'
          >
            {currentPage > 1 ? (
              <Link
                href={buildBlogHref({ category: activeCategory, query: activeSearch, page: currentPage - 1 })}
                className='flex items-center gap-1 px-4 py-2 rounded-full border border-border text-sm font-medium text-foreground hover:border-primary hover:bg-primary/5 transition-all'
              >
                <ChevronLeft className='w-4 h-4' />
                Prev
              </Link>
            ) : (
              <span className='flex items-center gap-1 px-4 py-2 rounded-full border border-border text-sm font-medium text-muted-foreground/40 cursor-not-allowed'>
                <ChevronLeft className='w-4 h-4' />
                Prev
              </span>
            )}

            <div className='flex items-center gap-1'>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <Link
                    key={pageNumber}
                    href={buildBlogHref({ category: activeCategory, query: activeSearch, page: pageNumber })}
                    className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all ${
                      pageNumber === currentPage
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {pageNumber}
                  </Link>
                )
              )}
            </div>

            {currentPage < totalPages ? (
              <Link
                href={buildBlogHref({ category: activeCategory, query: activeSearch, page: currentPage + 1 })}
                className='flex items-center gap-1 px-4 py-2 rounded-full border border-border text-sm font-medium text-foreground hover:border-primary hover:bg-primary/5 transition-all'
              >
                Next
                <ChevronRight className='w-4 h-4' />
              </Link>
            ) : (
              <span className='flex items-center gap-1 px-4 py-2 rounded-full border border-border text-sm font-medium text-muted-foreground/40 cursor-not-allowed'>
                Next
                <ChevronRight className='w-4 h-4' />
              </span>
            )}
          </nav>
        )}
      </section>

      <Footer />
    </main>
  );
}
