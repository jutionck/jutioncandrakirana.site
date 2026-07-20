import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import type { Image as SanityImage } from 'sanity';

import { urlFor } from '@/sanity/lib/image';

type RelatedPost = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  mainImage: SanityImage;
  readTime: string;
};

export default function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  if (posts.length === 0) return null;

  return (
    <div className='border-t border-border mt-16 pt-12'>
      <h3 className='text-xl font-bold text-foreground mb-8'>
        Continue reading
      </h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug}`}
            className='group flex flex-col overflow-hidden rounded-xl border border-border bg-card/20 hover:border-primary/30 hover:bg-card/40 transition-all duration-300'
          >
            <div className='relative aspect-video w-full overflow-hidden bg-muted'>
              <Image
                src={urlFor(post.mainImage).width(480).height(270).url()}
                alt={post.title}
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-105'
                sizes='(max-width: 768px) 100vw, 320px'
              />
            </div>
            <div className='p-4 flex flex-col gap-2'>
              <h4 className='text-sm font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors'>
                {post.title}
              </h4>
              <div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
                <Clock className='w-3 h-3' />
                <span>{post.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
