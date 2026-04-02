import { HeroSection } from '@/components/sections/hero-section'
import { StatementSection } from '@/components/sections/statement-section'
import { ConceptSection } from '@/components/sections/concept-section'
import { ResultsSection } from '@/components/sections/results-section'
import { ScalabilityTestSection } from '@/components/sections/scalability-test-section'
import { EventsSection } from '@/components/sections/events-section'
import { CommunitySection } from '@/components/sections/community-section'
import { AboutSection } from '@/components/sections/about-section'
import { ClosingCtaSection } from '@/components/sections/closing-cta-section'

export default function HomePage() {
  return (
    <main className="flex flex-col items-stretch justify-center gap-16">
      <HeroSection />
      <StatementSection />
      <ConceptSection />
      <ResultsSection />
      <ScalabilityTestSection />
      <EventsSection />
      <CommunitySection />
      <AboutSection />
      <ClosingCtaSection />
    </main>
  )
}
