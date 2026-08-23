import { Features } from "@/components/Features";
import { Integrations } from "@/components/Integrations";
import { Pricing } from "@/components/Pricing";
import { UseCases } from "@/components/UseCases";
import { Cta } from "@/components/Cta";
import { AidaMotion } from "@/components/mv/AidaMotion";
import { BrandLogos } from "@/components/mv/BrandLogos";
import { HowItWorks } from "@/components/mv/HowItWorks";
import { TheStream } from "@/components/mv/TheStream";
import { MvFooter } from "@/components/mv/MvFooter";
import { MvHeader } from "@/components/mv/MvHeader";
import { MvHero } from "@/components/mv/MvHero";
import type { ShotMode } from "@/components/mv/ProductCarousel";
import { VariantBar } from "@/components/mv/VariantBar";
import type { VariantId } from "@/components/mv/variants";

export function MvLanding({
  variant,
  shot,
  layout = "split",
}: {
  variant: VariantId;
  shot?: ShotMode;
  layout?: "split" | "centered";
}) {
  const aida = layout === "centered";

  const page = (
    <>
      <main id="main-content" className="flex-1">
        <div className="relative">
          <div className="pointer-events-none fixed top-0 right-0 left-0 z-40 h-24 bg-gradient-to-b from-background via-background/80 to-transparent" />
          <MvHero variant={variant} shot={shot} layout={layout} />
          {aida ? (
            <>
              <HowItWorks />
              <TheStream />
              <BrandLogos />
              <Pricing product="MindVault" quiet />
            </>
          ) : (
            <>
              <Features />
              <UseCases />
              <Pricing />
              <Integrations />
              <Cta />
            </>
          )}
        </div>
      </main>
      <MvFooter compact={aida} />
    </>
  );

  return (
    <div className={`theme-${variant} flex min-h-screen flex-col`}>
      {aida ? null : <VariantBar active={shot ?? variant} />}
      <MvHeader compact={aida} />
      {aida ? <AidaMotion>{page}</AidaMotion> : page}
    </div>
  );
}
