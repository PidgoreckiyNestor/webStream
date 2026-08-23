import Link from "next/link";

export function StubPage({ title }: { title: string }) {
  return (
    <main id="main-content" className="flex-1 pt-24 pb-24 bg-[#06070a]">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h1 className="text-3xl font-medium text-white">{title}</h1>
        <p className="mt-4 text-white/50">Not part of the homepage variants.</p>
        <Link href="/" className="mt-8 inline-block text-sm text-[#c7b8ff] hover:underline cursor-pointer">
          Back to variants
        </Link>
      </div>
    </main>
  );
}
