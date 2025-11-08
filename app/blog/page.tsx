import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Technical articles about modern web development, microservices architecture, performance optimization, and cloud technologies. Sharing knowledge from real-world experience.',
};

const posts = [
  {
    slug: 'building-scalable-microservices',
    title: 'Building Scalable Microservices with Go',
    excerpt:
      'Learn best practices for architecting microservices using Go and Kubernetes',
    date: '2025-01-15',
    tags: ['Go', 'Architecture', 'Microservices'],
    thumbnail:
      'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80',
    readTime: '8 min read',
  },
  {
    slug: 'react-performance-optimization',
    title: 'React Performance Optimization Techniques',
    excerpt:
      'Deep dive into memoization, code splitting, and bundle optimization',
    date: '2025-01-10',
    tags: ['React', 'Performance', 'JavaScript'],
    thumbnail:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    readTime: '6 min read',
  },
  {
    slug: 'kubernetes-deployment-guide',
    title: 'Kubernetes Deployment: A Practical Guide',
    excerpt:
      'Step-by-step guide to deploying containerized applications on Kubernetes',
    date: '2025-01-05',
    tags: ['Kubernetes', 'DevOps', 'Docker'],
    thumbnail:
      'https://images.unsplash.com/photo-1667372393086-9d4001d51cf1?w=800&auto=format&fit=crop&q=80',
    readTime: '10 min read',
  },
];

export default function BlogPage() {
  return (
    <main id="main-content" className='min-h-screen bg-background'>
      <Header />

      {/* Hero Section */}
      <section className='relative max-w-6xl mx-auto px-4 py-16 lg:py-24 text-center overflow-hidden'>
        {/* Background elements */}
        <div className='absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-primary/20 to-transparent rounded-full blur-3xl -z-10' />
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-accent/20 to-transparent rounded-full blur-3xl -z-10' />

        <div className='space-y-6 mb-16'>
          {/* Badge */}
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20'>
            <BookOpen className='w-4 h-4 text-primary' />
            <span className='text-sm font-semibold text-primary'>
              Technical Articles
            </span>
          </div>

          {/* Title */}
          <h1 className='text-5xl lg:text-6xl font-bold'>
            My{' '}
            <span className='bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent'>
              Blog
            </span>
          </h1>

          {/* Description */}
          <p className='text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
            Technical articles about{' '}
            <span className='text-primary font-semibold'>
              modern web development, architecture, and best practices
            </span>
            . Sharing knowledge and insights from real-world experience.
          </p>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className='max-w-5xl mx-auto px-4 py-8 pb-16'>
        <div className='space-y-12'>
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className='group pb-12 border-b border-border/50 last:border-b-0 last:pb-0'
            >
              <Link href={`/blog/${post.slug}`} className='block'>
                <div className='flex flex-col md:flex-row gap-8'>
                  {/* Thumbnail */}
                  <div className='md:w-80 shrink-0'>
                    <div className='relative aspect-video w-full overflow-hidden rounded-xl bg-muted'>
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        className='object-cover transition-transform duration-500 group-hover:scale-105'
                        sizes='(max-width: 768px) 100vw, 320px'
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className='flex-1 flex flex-col'>
                    {/* Meta info */}
                    <div className='flex items-center gap-3 text-sm text-muted-foreground mb-3'>
                      <time className='font-medium'>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                      <span>•</span>
                      <div className='flex items-center gap-1'>
                        <Clock className='w-4 h-4' />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className='text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 leading-tight'>
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className='text-muted-foreground leading-relaxed mb-4 grow'>
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className='flex flex-wrap gap-2'>
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className='text-xs px-3 py-1.5 bg-muted text-muted-foreground rounded-full font-medium hover:bg-primary/10 hover:text-primary transition-colors duration-300'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
