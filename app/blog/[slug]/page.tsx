'use client';

import { use } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowLeft, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css';

const posts: Record<
  string,
  {
    title: string;
    date: string;
    tags: string[];
    content: string;
    thumbnail: string;
    readTime: string;
    excerpt: string;
  }
> = {
  'building-scalable-microservices': {
    title: 'Building Scalable Microservices with Go',
    date: '2025-01-15',
    tags: ['Go', 'Architecture', 'Microservices'],
    thumbnail:
      'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&auto=format&fit=crop&q=80',
    readTime: '8 min read',
    excerpt:
      'Learn best practices for architecting microservices using Go and Kubernetes',
    content: `
# Building Scalable Microservices with Go

Microservices architecture has become the go-to pattern for building scalable applications. In this post, we'll explore how to build microservices using Go.

## Why Go for Microservices?

Go is an excellent choice for microservices because of:

- **Performance**: Go compiles to a single binary with minimal runtime overhead
- **Concurrency**: Goroutines make it easy to handle thousands of concurrent requests
- **Simplicity**: Clean syntax and standard library reduce external dependencies

## Core Principles

When building microservices with Go, follow these key principles:

1. **Single Responsibility**: Each service should have a clear, single purpose
2. **API-First Design**: Define clear APIs between services
3. **Independent Deployment**: Each service should be deployable independently
4. **Resilience**: Handle failures gracefully with timeouts and retries

## Getting Started

Here's a basic example of a simple microservice:

\`\`\`go
package main

import (
    "net/http"
    "log"
)

func main() {
    http.HandleFunc("/api/status", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(http.StatusOK)
        w.Write([]byte(\`{"status": "healthy"}\`))
    })
    
    log.Fatal(http.ListenAndServe(":8080", nil))
}
\`\`\`

## Deployment with Kubernetes

Deploy your Go microservices using Kubernetes for automatic scaling and management.

## Conclusion

Go provides an excellent foundation for building modern microservices architectures. Its performance, simplicity, and built-in concurrency features make it ideal for this use case.
    `,
  },
  'react-performance-optimization': {
    title: 'React Performance Optimization Techniques',
    date: '2025-01-10',
    tags: ['React', 'Performance', 'JavaScript'],
    thumbnail:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format&fit=crop&q=80',
    readTime: '6 min read',
    excerpt:
      'Deep dive into memoization, code splitting, and bundle optimization',
    content: `
# React Performance Optimization Techniques

Performance is critical for modern web applications. Let's explore key techniques to optimize your React applications.

## Memoization

Use React.memo to prevent unnecessary re-renders:

\`\`\`jsx
const MyComponent = React.memo(({ data }) => {
    return <div>{data.name}</div>;
});
\`\`\`

## Code Splitting

Use dynamic imports to reduce bundle size:

\`\`\`jsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));
\`\`\`

## Virtualization

For long lists, use virtualization libraries to render only visible items.

## Measuring Performance

Use React DevTools Profiler to identify performance bottlenecks.

## Best Practices

- Profile before optimizing
- Avoid inline objects in render
- Use useMemo and useCallback wisely
- Minimize bundle size

## Conclusion

Performance optimization is an ongoing process. Always measure, identify bottlenecks, and apply targeted optimizations.
    `,
  },
  'kubernetes-deployment-guide': {
    title: 'Kubernetes Deployment: A Practical Guide',
    date: '2025-01-05',
    tags: ['Kubernetes', 'DevOps', 'Docker'],
    thumbnail:
      'https://images.unsplash.com/photo-1667372393086-9d4001d51cf1?w=1200&auto=format&fit=crop&q=80',
    readTime: '10 min read',
    excerpt:
      'Step-by-step guide to deploying containerized applications on Kubernetes',
    content: `
# Kubernetes Deployment: A Practical Guide

Kubernetes is a powerful platform for container orchestration. Learn how to deploy applications effectively.

## Prerequisites

- Docker installed
- Basic understanding of containers
- kubectl installed

## Creating a Deployment

Define your deployment in a YAML file:

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: my-app:latest
        ports:
        - containerPort: 8080
\`\`\`

## Deploying to Kubernetes

Apply your deployment:

\`\`\`bash
kubectl apply -f deployment.yaml
\`\`\`

## Scaling

Scale your deployment:

\`\`\`bash
kubectl scale deployment my-app --replicas=5
\`\`\`

## Monitoring

Use kubectl commands to monitor your deployment:

\`\`\`bash
kubectl get pods
kubectl logs deployment/my-app
\`\`\`

## Conclusion

Kubernetes provides powerful capabilities for deploying and managing containerized applications. Start simple and gradually adopt more advanced features.
    `,
  },
};

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const post = posts[slug];

  if (!post) {
    return (
      <main className='min-h-screen bg-background'>
        <Header />
        <section className='max-w-3xl mx-auto px-4 py-16'>
          <h1 className='text-4xl font-bold text-foreground'>Post Not Found</h1>
          <p className='text-muted-foreground mt-4'>
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-background'>
      <Header />

      {/* Back to Blog Link */}
      <div className='max-w-4xl mx-auto px-4 pt-8'>
        <Link
          href='/blog'
          className='inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium'
        >
          <ArrowLeft className='w-4 h-4' />
          <span>Back to Blog</span>
        </Link>
      </div>

      <article className='max-w-4xl mx-auto px-4 py-8 pb-16'>
        {/* Article Header */}
        <header className='mb-8'>
          {/* Meta Info */}
          <div className='flex items-center gap-3 text-sm text-muted-foreground mb-6'>
            <div className='flex items-center gap-1'>
              <Calendar className='w-4 h-4' />
              <time>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>
            <span>•</span>
            <div className='flex items-center gap-1'>
              <Clock className='w-4 h-4' />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight'>
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className='text-xl text-muted-foreground leading-relaxed mb-6'>
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className='flex flex-wrap gap-2 mb-8'>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className='text-xs px-3 py-1.5 bg-muted text-muted-foreground rounded-full font-medium'
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Thumbnail */}
          <div className='relative aspect-video w-full overflow-hidden rounded-xl bg-muted mb-8'>
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className='object-cover'
              sizes='(max-width: 896px) 100vw, 896px'
              priority
            />
          </div>
        </header>

        {/* Article Content */}
        <div className='prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-p:text-lg prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground prose-code:text-accent prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-border/50 prose-a:text-primary prose-a:no-underline hover:prose-a:underline'>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            components={{
              h1: ({ children }) => (
                <h1 className='text-3xl font-bold mt-10 mb-4 first:mt-0'>
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className='text-2xl font-bold mt-8 mb-4'>{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className='text-xl font-bold mt-6 mb-3'>{children}</h3>
              ),
              p: ({ children }) => <p className='mb-6'>{children}</p>,
              ul: ({ children }) => (
                <ul className='mb-6 ml-6 list-disc space-y-2'>{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className='mb-6 ml-6 list-decimal space-y-2'>{children}</ol>
              ),
              li: ({ children }) => (
                <li className='leading-relaxed'>{children}</li>
              ),
              code: ({ className, children, ...props }: any) => {
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <code className={className} {...props}>
                    {children}
                  </code>
                ) : (
                  <code className='text-sm' {...props}>
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre className='rounded-xl overflow-x-auto p-4 my-6'>
                  {children}
                </pre>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Divider */}
        <div className='border-t border-border/50 mt-16 pt-8'>
          <Link
            href='/blog'
            className='inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-300 font-semibold'
          >
            <ArrowLeft className='w-5 h-5' />
            <span>Back to all articles</span>
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
