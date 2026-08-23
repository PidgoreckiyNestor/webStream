import Link from "next/link";

const variants = [
  {
    href: "/v1",
    title: "V1 Mockup",
    hint: "Як на твоєму скріні: mint CTA, MindVault wordmark, живий UI.",
  },
  {
    href: "/v2",
    title: "V2 Glow",
    hint: "Рекомендація: glowing violet кнопки, navy фон, токени з апки.",
  },
  {
    href: "/v3",
    title: "V3 Solid",
    hint: "Суцільний brand #5b4bdc, світлий текст на кнопках.",
  },
  {
    href: "/v4",
    title: "V4 Quiet",
    hint: "Без fake 1000+, більше повітря, спокійніший glow.",
  },
  {
    href: "/v5",
    title: "V5 Center",
    hint: "Текст по центру, Win / macOS / Linux зверху, stack-скрін знизу.",
  },
  {
    href: "/original",
    title: "Petal original",
    hint: "Контроль: буквальний клон petal.tech.",
  },
];

const shots = [
  {
    href: "/shot/fade",
    title: "Fade",
    hint: "Live → Spectral → Bands, crossfade кожні 4.5 с.",
  },
  {
    href: "/shot/dots",
    title: "Dots",
    hint: "Те саме + крапки, пауза на hover, клік по слайду.",
  },
  {
    href: "/shot/stack",
    title: "Stack",
    hint: "Колода: наступний скрін трохи виглядає з-за кадру.",
  },
  {
    href: "/shot/captions",
    title: "Labels",
    hint: "Fade з підписом Live / Spectral / Bands знизу.",
  },
];

export default function ChooserPage() {
  return (
    <main id="main-content" className="flex-1 bg-[#06070a] text-[#e9eaf0]">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <p className="text-sm font-medium text-[#c7b8ff]">MindVault landing</p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight text-white">Обери варіант hero</h1>
        <p className="mt-4 text-white/50">
          Одна й та сама сітка petal.tech, різна ідентика. Унизу кожної сторінки — перемикач.
        </p>
        <ul className="mt-12 space-y-3">
          {variants.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 hover:border-white/20 hover:bg-white/[0.05] transition-colors cursor-pointer"
              >
                <span className="text-lg font-medium text-white">{item.title}</span>
                <span className="mt-1 block text-sm text-white/50">{item.hint}</span>
              </Link>
            </li>
          ))}
        </ul>
        <h2 className="mt-16 text-2xl font-medium text-white">Скріни по колу</h2>
        <p className="mt-2 text-sm text-white/50">Три кадри апки, стиль V2 Glow.</p>
        <ul className="mt-6 space-y-3">
          {shots.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 hover:border-white/20 hover:bg-white/[0.05] transition-colors cursor-pointer"
              >
                <span className="text-lg font-medium text-white">{item.title}</span>
                <span className="mt-1 block text-sm text-white/50">{item.hint}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
