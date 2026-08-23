import { siteUrl } from "@/lib/site";

export function JsonLd() {
  const base = siteUrl();
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${base}/#org`,
        name: "MindVault",
        url: base,
        logo: `${base}/icon.png`,
        description:
          "Desktop app for Muse 2 and Muse S. Live EEG, local recording, LSL, OSC, and CSV.",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${base}/#app`,
        name: "MindVault",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Windows, macOS, Linux",
        url: base,
        description:
          "Stream Muse EEG (TP9, AF7, AF8, TP10 at 256 Hz), PPG, and IMU to a computer. Record locally. Export CSV or live-out via LSL and OSC.",
        publisher: { "@id": `${base}/#org` },
        offers: [
          { "@type": "Offer", name: "Trial", price: "0", priceCurrency: "USD", description: "30 minutes live" },
          { "@type": "Offer", name: "Plus", price: "19", priceCurrency: "USD", description: "Unlimited live, local recording, replay" },
          { "@type": "Offer", name: "Lab", price: "49", priceCurrency: "USD", description: "LSL, OSC, HTTP API, event markers" },
          { "@type": "Offer", name: "Research", price: "99", priceCurrency: "USD", description: "Signal filters" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#site`,
        url: base,
        name: "MindVault",
        publisher: { "@id": `${base}/#org` },
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
