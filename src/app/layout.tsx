import type { Metadata } from "next";
import { DM_Sans, Geist, Public_Sans } from "next/font/google";
import { JsonLd } from "@/components/mv/JsonLd";
import { Providers } from "@/components/mv/Providers";
import { isIndexable, siteUrl } from "@/lib/site";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const title = "MindVault — Muse EEG on your computer";
const description =
  "Desktop app for Muse 2 and Muse S. Live stream, local recording, LSL, OSC, and CSV — on a desk.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title,
  description,
  alternates: { canonical: "/" },
  robots: isIndexable()
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    title,
    description,
    siteName: "MindVault",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${publicSans.variable} ${dmSans.variable} ${geist.variable} dark h-full`}
    >
      <body className="antialiased min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-cta-fg"
        >
          Skip to main content
        </a>
        <JsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
