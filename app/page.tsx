import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import StatsBar from '@/components/stats-bar';
import SkillsOverview from '@/components/skills-overview';
import FeaturedPortfolio from '@/components/featured-portfolio';
import ExperienceHighlights from '@/components/experience-highlights';
import LatestPosts from '@/components/latest-posts';
import CTASection from '@/components/cta-section';

export const metadata: Metadata = {
  description:
    'Jution Candra Kirana - Full-stack developer and tech educator from Indonesia with 7+ years of experience. Specializing in Golang, Java Spring Boot, React, and cloud technologies. Training 500+ developers.',
  alternates: {
    canonical: 'https://jutioncandrakirana.site',
  },
};

export default function Home() {
  return (
    <main id='main-content' className='min-h-screen bg-background'>
      <Header />
      <Hero />
      <StatsBar />
      <SkillsOverview />
      <FeaturedPortfolio />
      <ExperienceHighlights />
      <LatestPosts />
      <CTASection />
      <Footer />
    </main>
  );
}
