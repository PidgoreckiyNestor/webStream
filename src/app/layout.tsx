import type { Metadata } from "next";
import { DM_Sans, Public_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Petal Technology - EEG & Biometric Data Streaming Software",
  description:
    "Stream brainwave data from Muse headsets with Metrics software. Real-time EEG visualization, data recording, and integration tools for researchers and developers.",
  authors: [{ name: "Petal Technology LLC" }],
  keywords: [
    "EEG",
    "Muse",
    "brainwave",
    "biometric",
    "neuroscience",
    "brain-computer interface",
    "BCI",
    "Metrics",
    "data streaming",
    "research software",
  ],
  robots: { index: false, follow: false },
  openGraph: {
    title: "Petal Technology - EEG & Biometric Data Streaming Software",
    description:
      "Stream brainwave data from Muse headsets with Metrics software. Real-time EEG visualization, data recording, and integration tools.",
    siteName: "Petal Technology",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Petal Technology - Metrics Software" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${publicSans.variable} ${dmSans.variable} dark h-full`}>
      <body className="antialiased min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to main content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
