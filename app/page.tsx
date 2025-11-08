import Header from "@/components/header"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import SkillsOverview from "@/components/skills-overview"
import FeaturedPortfolio from "@/components/featured-portfolio"
import ExperienceHighlights from "@/components/experience-highlights"
import CTASection from "@/components/cta-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <SkillsOverview />
      <FeaturedPortfolio />
      <ExperienceHighlights />
      <CTASection />
      <Footer />
    </main>
  )
}
