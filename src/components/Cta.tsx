export function Cta({ product = "Metrics®", quiet = false }: { product?: string; quiet?: boolean }) {
  if (quiet) {
    return (
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">Ready when you are.</h2>
          <p className="mx-auto mt-4 max-w-md text-base text-white/45">
            Unlock {product} and connect Muse on Windows, Mac, and Linux.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <a
              href="#pricing"
              className="inline-flex h-8 items-center rounded-md bg-white px-3.5 text-[13px] font-medium text-black transition-colors duration-150 hover:bg-white/90 cursor-pointer"
            >
              Download
            </a>
            <a
              href="/contact"
              className="inline-flex h-8 items-center rounded-md border border-white/15 px-3.5 text-[13px] font-medium text-white/90 transition-colors duration-150 hover:border-white/25 hover:bg-white/[0.06] cursor-pointer"
            >
              Contact
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 sm:py-32" style={{ background: "var(--cta-wash)" }}>
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-medium text-white sm:text-4xl">Ready to get started?</h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-white/50">
          Choose a plan to unlock {product} and connect Muse to Windows, Mac, and Linux.
        </p>
        <div className="mt-8">
          <a
            href="#pricing"
            className="inline-flex h-12 cursor-pointer items-center justify-center rounded-lg bg-accent px-10 text-lg font-medium text-cta-fg transition-colors duration-150 hover:bg-accent-hover"
          >
            Select a Plan
          </a>
        </div>
      </div>
    </section>
  );
}
