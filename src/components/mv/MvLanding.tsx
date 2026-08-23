import { AidaMotion } from "@/components/mv/AidaMotion";
import { BrandLogos } from "@/components/mv/BrandLogos";
import { HowItWorks } from "@/components/mv/HowItWorks";
import { MvFooter } from "@/components/mv/MvFooter";
import { MvHeader } from "@/components/mv/MvHeader";
import { MvHero } from "@/components/mv/MvHero";
import { Pricing } from "@/components/Pricing";
import { TheStream } from "@/components/mv/TheStream";

export function MvLanding() {
  return (
    <div className="theme-v2 flex min-h-screen flex-col">
      <MvHeader />
      <AidaMotion>
        <main id="main-content" className="flex-1">
          <div className="relative">
            <div className="pointer-events-none fixed top-0 right-0 left-0 z-40 h-24 bg-gradient-to-b from-background via-background/80 to-transparent" />
            <MvHero />
            <HowItWorks />
            <TheStream />
            <BrandLogos />
            <Pricing />
          </div>
        </main>
        <MvFooter />
      </AidaMotion>
    </div>
  );
}
