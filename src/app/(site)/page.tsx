import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import VisitesSection from "@/components/sections/VisitesSection";
import FaqHome from "@/components/sections/FaqHome";

// Bounds how stale published content can get — SanityLive alone only
// guarantees updates to sessions already connected when a change is published.
export const revalidate = 30;

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <VisitesSection />
      <FaqHome />
    </main>
  );
}
