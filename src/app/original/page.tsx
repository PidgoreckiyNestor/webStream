import { Cta } from "@/components/Cta";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Integrations } from "@/components/Integrations";
import { Pricing } from "@/components/Pricing";
import { UseCases } from "@/components/UseCases";
import { VariantBar } from "@/components/mv/VariantBar";

export default function OriginalPage() {
  return (
    <>
      <VariantBar active="original" />
      <Header />
      <main id="main-content" className="flex-1">
        <div className="relative">
          <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#010101] to-transparent pointer-events-none z-40" />
          <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#010101] to-transparent pointer-events-none z-40" />
          <Hero />
          <Features />
          <UseCases />
          <Pricing />
          <Integrations />
          <Cta />
        </div>
      </main>
      <Footer />
    </>
  );
}
