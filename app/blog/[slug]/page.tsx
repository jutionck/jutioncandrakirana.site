'use client';

import { use } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowLeft, Calendar, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css';
import { posts } from '@/lib/data';

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const post = posts.find((p) => p.slug === slug);

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

  return (
    <main id='main-content' className='min-h-screen bg-background'>
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
                {new Date(post.date).toLocaleDateString('en-US', {
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
          </div>

          {/* Title */}
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight tracking-tight'>
            {post.title}
          </h1>

          {/* Tags */}
          <div className='flex flex-wrap gap-2 mb-12'>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className='inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-full font-medium border border-primary/20'
              >
                <Tag className='w-3 h-3' />
                {tag}
              </span>
            ))}
          </div>

          {/* Thumbnail */}
          <div className='relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50 shadow-2xl shadow-primary/5 mb-16 group'>
            <Image
              src={post.thumbnail}
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
      <article className='max-w-3xl mx-auto px-6 pb-24'>
        <div className='prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-card prose-pre:border prose-pre:border-border prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-img:rounded-xl prose-img:shadow-lg'>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            components={{
              h1: ({ children }) => (
                <h1 className='text-3xl font-bold mt-12 mb-6 first:mt-0'>
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className='text-2xl font-bold mt-10 mb-5 pb-2 border-b border-border/50'>
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className='text-xl font-bold mt-8 mb-4'>{children}</h3>
              ),
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
              code: ({ className, children, ...props }: any) => {
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <div className='relative group'>
                    <div className='absolute -top-3 right-4 text-xs font-mono text-muted-foreground bg-card border border-border px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity'>
                      {match[1]}
                    </div>
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </div>
                ) : (
                  <code className='text-sm font-mono' {...props}>
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre className='rounded-xl overflow-x-auto p-6 my-8 bg-[#0d1117] border border-border/50 shadow-lg'>
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className='border-l-4 border-primary pl-6 italic my-8 text-lg text-muted-foreground bg-muted/20 py-4 pr-4 rounded-r-lg'>
                  {children}
                </blockquote>
              ),
            }}
          >
            {post.content || ''}
          </ReactMarkdown>
        </div>

        {/* Divider */}
        <div className='border-t border-border mt-16 pt-12'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            <h3 className='text-xl font-bold text-foreground'>
              Enjoyed this article?
            </h3>
            <Link
              href='/blog'
              className='inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25'
            >
              <ArrowLeft className='w-4 h-4' />
              <span>Read more articles</span>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
