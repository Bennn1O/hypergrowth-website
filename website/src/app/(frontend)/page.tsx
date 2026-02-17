import { HeroSection } from '@/components/sections/hero-section'
import { ConceptSection } from '@/components/sections/concept-section'
import { ResultsSection } from '@/components/sections/results-section'
import { ScalabilityTestSection } from '@/components/sections/scalability-test-section'
import { EventsSection } from '@/components/sections/events-section'
import { CommunitySection } from '@/components/sections/community-section'
import { AboutSection } from '@/components/sections/about-section'
import { TeamSection } from '@/components/sections/team-section'
import { ResourcesSection } from '@/components/sections/resources-section'

export default function HomePage() {
  return (
    <main className="flex flex-col items-stretch justify-center gap-16">
      <HeroSection />
      <ConceptSection />
      <ResultsSection />
      <ScalabilityTestSection />
      <EventsSection />
      <CommunitySection />
      <AboutSection />
      <TeamSection />
      <ResourcesSection />
    </main>
  )
}
