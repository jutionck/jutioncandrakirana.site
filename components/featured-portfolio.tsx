import { client } from '@/sanity/lib/client';
import { homepageQuery, projectsQuery } from '@/sanity/lib/queries';
import FeaturedPortfolioClient, {
  type Project,
} from './featured-portfolio-client';

type HomepageCopy = {
  portfolioTitle?: string;
};

export default async function FeaturedPortfolio() {
  const [projects, homepage] = await Promise.all([
    client.fetch<Project[]>(
      projectsQuery,
      {},
      { next: { tags: ['project'], revalidate: 3600 } }
    ),
    client.fetch<HomepageCopy | null>(
      homepageQuery,
      {},
      { next: { tags: ['homepage'], revalidate: 3600 } }
    ),
  ]);

  return (
    <section id='portfolio' className='py-32 bg-card/50 border-t border-border'>
      <div className='max-w-7xl mx-auto px-6'>
        <FeaturedPortfolioClient
          projects={projects}
          title={homepage?.portfolioTitle || 'Portofolio'}
        />
      </div>
    </section>
  );
}
