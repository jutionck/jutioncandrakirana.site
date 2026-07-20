import Header from '@/components/header';
import Footer from '@/components/footer';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowLeft, Calendar, Tag, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css';
import type { Metadata } from 'next';
import type { Image as SanityImage } from 'sanity';

import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import {
  allPostSlugsQuery,
  postBySlugQuery,
  profileQuery,
  relatedPostsQuery,
} from '@/sanity/lib/queries';
import CodeBlock from '@/components/blog/code-block';
import ReadingProgress from '@/components/blog/reading-progress';
import RelatedPosts from '@/components/blog/related-posts';
import ShareButtons from '@/components/blog/share-buttons';
import TableOfContents, {
  type Heading,
} from '@/components/blog/table-of-contents';
import { extractReactText, uniqueSlug } from '@/lib/react-text';

type Post = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
  mainImage: SanityImage;
  readTime: string;
  body: string;
  seoTitle?: string;
  seoDescription?: string;
};

type AuthorProfile = {
  fullName: string;
  jobTitle: string;
  avatar?: SanityImage;
};

type RelatedPost = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  mainImage: SanityImage;
  readTime: string;
};

function extractHeadings(
  markdown: string,
  seen: Map<string, number>
): Heading[] {
  const headings: Heading[] = [];
  for (const line of markdown.split('\n')) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/[*_`]/g, '').trim();
    headings.push({ id: uniqueSlug(text, seen), text, level });
  }
  return headings;
}

async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(
    postBySlugQuery,
    { slug },
    { next: { tags: ['post', `post:${slug}`], revalidate: 3600 } }
  );
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(
    allPostSlugsQuery,
    {},
    { next: { tags: ['post'], revalidate: 3600 } }
  );
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <main className='min-h-screen bg-background'>
        <Header />
        <section className='max-w-3xl mx-auto px-4 py-32 text-center'>
          <h1 className='text-4xl font-bold text-foreground mb-4'>
            Post Not Found
          </h1>
          <p className='text-muted-foreground mb-8'>
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href='/blog'
            className='inline-flex items-center gap-2 text-primary hover:underline'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Blog
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  const thumbnailUrl = urlFor(post.mainImage).width(1600).height(900).url();
  const headings = extractHeadings(post.body || '', new Map());
  // Separate counter (but same left-to-right traversal order as extractHeadings
  // above) so rendered heading anchors line up with the TOC's generated IDs.
  const headingIdSeen = new Map<string, number>();
  const postUrl = `https://jutioncandrakirana.site/blog/${slug}`;

  const [profile, relatedPosts] = await Promise.all([
    client.fetch<AuthorProfile | null>(
      profileQuery,
      {},
      { next: { tags: ['profile'], revalidate: 3600 } }
    ),
    client.fetch<RelatedPost[]>(
      relatedPostsQuery,
      { slug },
      { next: { tags: ['post'], revalidate: 3600 } }
    ),
  ]);

  return (
    <main id='main-content' className='min-h-screen bg-background'>
      <ReadingProgress targetId='article-content' />
      <Header />

      {/* Hero Section */}
      <section className='relative pt-32 pb-16 overflow-hidden'>
        {/* Background elements */}
        <div className='absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-primary/10 to-transparent rounded-full blur-3xl -z-10' />
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-accent/10 to-transparent rounded-full blur-3xl -z-10' />

        <div className='max-w-4xl mx-auto px-6'>
          {/* Back Link */}
          <Link
            href='/blog'
            className='inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium mb-8 group'
          >
            <ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
            <span>Back to Blog</span>
          </Link>

          {/* Meta Info */}
          <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6'>
            <div className='flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full'>
              <Calendar className='w-4 h-4' />
              <time>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>
            <div className='flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-full'>
              <Clock className='w-4 h-4' />
              <span>{post.readTime}</span>
            </div>
            <ShareButtons url={postUrl} title={post.title} />
          </div>

          {/* Title */}
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight tracking-tight'>
            {post.title}
          </h1>

          {/* Author byline */}
          {profile && (
            <div className='flex items-center gap-3 mb-8 pb-8 border-b border-border/50'>
              <div className='relative w-10 h-10 rounded-full overflow-hidden bg-muted border border-border shrink-0 flex items-center justify-center'>
                {profile.avatar ? (
                  <Image
                    src={urlFor(profile.avatar).width(80).height(80).url()}
                    alt={profile.fullName}
                    fill
                    className='object-cover'
                  />
                ) : (
                  <User className='w-5 h-5 text-muted-foreground' />
                )}
              </div>
              <div>
                <div className='text-sm font-semibold text-foreground'>
                  {profile.fullName}
                </div>
                <div className='text-xs text-muted-foreground'>
                  {profile.jobTitle}
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className='flex flex-wrap gap-2 mb-12'>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className='inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-full font-medium border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-colors'
              >
                <Tag className='w-3 h-3' />
                {tag}
              </span>
            ))}
          </div>

          {/* Thumbnail */}
          <div className='relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50 shadow-2xl shadow-primary/5 group'>
            <Image
              src={thumbnailUrl}
              alt={post.title}
              fill
              className='object-cover transition-transform duration-700 group-hover:scale-105'
              sizes='(max-width: 896px) 100vw, 896px'
              priority
            />
            <div className='absolute inset-0 bg-linear-to-t from-background/20 to-transparent' />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className='max-w-6xl mx-auto px-6 pb-24'>
        <div className='lg:grid lg:grid-cols-[1fr_240px] lg:gap-16 lg:items-start'>
          <article id='article-content' className='max-w-3xl'>
            <div className='prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-transparent prose-pre:p-0 prose-pre:border-none prose-pre:shadow-none prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-img:rounded-xl prose-img:shadow-lg'>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                components={{
                  h1: ({ children }) => (
                    <h1 className='text-3xl font-bold mt-12 mb-6 first:mt-0 scroll-mt-28'>
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => {
                    const id = uniqueSlug(
                      extractReactText(children),
                      headingIdSeen
                    );
                    return (
                      <h2
                        id={id}
                        className='text-2xl font-bold mt-12 mb-5 pl-4 border-l-4 border-primary scroll-mt-28'
                      >
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ children }) => {
                    const id = uniqueSlug(
                      extractReactText(children),
                      headingIdSeen
                    );
                    return (
                      <h3
                        id={id}
                        className='text-xl font-bold mt-8 mb-4 scroll-mt-28'
                      >
                        {children}
                      </h3>
                    );
                  },
                  p: ({ children }) => <p className='mb-6'>{children}</p>,
                  ul: ({ children }) => (
                    <ul className='mb-6 ml-6 list-disc space-y-2 marker:text-primary'>
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className='mb-6 ml-6 list-decimal space-y-2 marker:text-primary'>
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className='leading-relaxed pl-1'>{children}</li>
                  ),
                  code: ({ className, children, ...props }) => (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
                  blockquote: ({ children }) => (
                    <blockquote className='border-l-4 border-primary pl-6 italic my-8 text-lg text-muted-foreground bg-muted/20 py-4 pr-4 rounded-r-lg'>
                      {children}
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <div className='not-prose my-8 overflow-x-auto rounded-lg border border-border [&_tr>*:first-child]:sticky [&_tr>*:first-child]:left-0'>
                      <table className='w-full border-collapse text-sm whitespace-nowrap'>
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className='bg-muted/70 text-foreground'>
                      {children}
                    </thead>
                  ),
                  tbody: ({ children }) => (
                    <tbody className='divide-y divide-border'>
                      {children}
                    </tbody>
                  ),
                  th: ({ children }) => (
                    <th className='bg-muted/70 px-4 py-3 text-left font-semibold border-b border-border'>
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className='bg-background px-4 py-3 text-muted-foreground'>
                      {children}
                    </td>
                  ),
                }}
              >
                {post.body || ''}
              </ReactMarkdown>
            </div>

            <RelatedPosts posts={relatedPosts} />

            <div className='flex justify-center mt-12'>
              <Link
                href='/blog'
                className='inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:border-primary hover:bg-primary/5 transition-all duration-300'
              >
                <ArrowLeft className='w-4 h-4' />
                <span>Back to all articles</span>
              </Link>
            </div>
          </article>

          {headings.length > 0 && (
            <aside className='hidden lg:block sticky top-32'>
              <TableOfContents headings={headings} />
            </aside>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
