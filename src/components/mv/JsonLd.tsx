import { faqItems } from "@/lib/faq";
import { PRODUCT_DEFINITION } from "@/lib/product";
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
          "Desktop app for Muse 2, Muse S, and Muse S Athena. Live EEG, local recording, LSL, OSC, and CSV. Not a notes app, RAG tool, or supplement brand.",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${base}/#app`,
        name: "MindVault",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Windows, macOS, Linux",
        url: base,
        description: PRODUCT_DEFINITION,
        publisher: { "@id": `${base}/#org` },
        offers: [
          {
            "@type": "Offer",
            name: "Free",
            price: "0",
            priceCurrency: "USD",
            description: "30 minutes live",
            url: `${base}/#pricing`,
            availability: "https://schema.org/PreOrder",
          },
          {
            "@type": "Offer",
            name: "Plus",
            price: "19",
            priceCurrency: "USD",
            description: "Unlimited live, local recording, CSV and EDF export",
            url: `${base}/#pricing`,
            availability: "https://schema.org/PreOrder",
          },
          {
            "@type": "Offer",
            name: "Lab",
            price: "49",
            priceCurrency: "USD",
            description: "LSL, OSC, HTTP API, event markers",
            url: `${base}/#pricing`,
            availability: "https://schema.org/PreOrder",
          },
          {
            "@type": "Offer",
            name: "Research",
            price: "99",
            priceCurrency: "USD",
            description: "Notch and bandpass on top of Lab",
            url: `${base}/#pricing`,
            availability: "https://schema.org/PreOrder",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#site`,
        url: base,
        name: "MindVault",
        publisher: { "@id": `${base}/#org` },
      },
      {
        "@type": "FAQPage",
        "@id": `${base}/#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
