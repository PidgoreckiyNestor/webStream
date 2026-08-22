export function StubPage({ title }: { title: string }) {
  return (
    <main id="main-content" className="flex-1 pt-40 pb-24">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h1 className="text-3xl font-medium text-white">{title}</h1>
        <p className="mt-4 text-white/50">
          This route exists on petal.tech. The study clone only captures the homepage.
        </p>
      </div>
    </main>
  );
}
