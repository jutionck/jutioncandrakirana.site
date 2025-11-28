import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';
import { posts } from '@/lib/data';

export default function LatestPosts() {
  const latestPosts = posts.slice(0, 3);

  return (
    <section id='blog' className='py-32 bg-background border-t border-border'>
      <div className='max-w-6xl mx-auto px-6'>
        <div className='flex items-center justify-between mb-20'>
          <div className='flex items-center gap-4 flex-1'>
            <div className='h-px bg-border flex-1'></div>
            <h2 className='text-3xl font-bold text-foreground font-mono uppercase tracking-tight'>
              Latest Articles
            </h2>
            <div className='h-px bg-border flex-1'></div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {latestPosts.map((post) => (
            <article
              key={post.slug}
              className='group flex flex-col h-full bg-card/30 rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300'
            >
              <Link
                href={`/blog/${post.slug}`}
                className='flex-1 flex flex-col'
              >
                {/* Thumbnail */}
                <div className='relative aspect-video w-full overflow-hidden bg-muted'>
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                    sizes='(max-width: 768px) 100vw, 320px'
                  />
                </div>

                {/* Content */}
                <div className='p-6 flex flex-col flex-1'>
                  {/* Meta info */}
                  <div className='flex items-center gap-3 text-xs text-muted-foreground mb-3'>
                    <time className='font-medium'>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                    <span>•</span>
                    <div className='flex items-center gap-1'>
                      <Clock className='w-3 h-3' />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className='text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 leading-tight line-clamp-2'>
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className='text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 flex-1'>
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className='flex flex-wrap gap-2 mt-auto'>
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className='text-[10px] px-2 py-1 bg-muted text-muted-foreground rounded-full font-medium'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className='flex justify-center mt-12'>
          <Link
            href='/blog'
            className='group px-6 py-3 border border-border text-foreground rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-300 font-semibold inline-flex items-center gap-2'
          >
            Read All Articles
            <span className='group-hover:translate-x-1 transition-transform duration-300'>
              <ArrowRight className='w-4 h-4' />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
