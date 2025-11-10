import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import SkillsOverview from '@/components/skills-overview';
import FeaturedPortfolio from '@/components/featured-portfolio';
import ExperienceHighlights from '@/components/experience-highlights';
import CTASection from '@/components/cta-section';

export const metadata: Metadata = {
  title: 'Jution Candra Kirana - Tech Edu & Fullstack Developer',
  description:
    'Full-stack developer and tech educator with 7+ years of experience. Specializing in Golang, Java Spring Boot, React, and cloud technologies. Training 500+ developers.',
};

export default function Home() {
  return (
    <main id='main-content' className='min-h-screen bg-background'>
      <Header />
      <Hero />
      <SkillsOverview />
      <FeaturedPortfolio />
      <ExperienceHighlights />
      <CTASection />
      <Footer />
    </main>
  );
}
