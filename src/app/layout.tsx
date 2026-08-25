import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { GoogleAdsTag } from "@/components/mv/GoogleAdsTag";
import { Providers } from "@/components/mv/Providers";
import { isIndexable, siteUrl } from "@/lib/site";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const title = "MindVault — Muse S Athena EEG on your computer";
const description =
  "Athena-first desktop app for live 256 Hz EEG, contact quality, CSV recording, and EDF export. Controlled access across Windows, macOS, and Linux. LSL is coming next in Lab.";

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
      className={`${geist.variable} dark h-full`}
    >
      <body className="antialiased min-h-screen flex flex-col">
        <GoogleAdsTag />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-cta-fg"
        >
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
