import type { Metadata } from "next";
import { DM_Sans, Geist, Public_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "MindVault — Muse EEG on your computer",
  description:
    "Desktop app for Muse 2 and Muse S. Live stream, local recording, LSL, OSC, and CSV — on a desk.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "MindVault — Muse EEG on your computer",
    description: "Desktop app for Muse 2 and Muse S. Live stream, local recording, and live-out.",
    siteName: "MindVault",
    locale: "en_US",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
