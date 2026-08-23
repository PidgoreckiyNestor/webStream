import { faqItems } from "@/lib/faq";
import { PRODUCT_DEFINITION } from "@/lib/product";
import { siteUrl } from "@/lib/site";

export function GET() {
  const base = siteUrl();
  const faq = faqItems.map((item) => `### ${item.q}\n\n${item.a}`).join("\n\n");
  const body = `# MindVault
> Desktop app for Muse 2, Muse S, and Muse S Athena. Live EEG on a computer — record locally, export CSV, or pipe LSL and OSC.

${PRODUCT_DEFINITION}

## Pages
- [Home](${base}): product, how it works, plans, FAQ
- [Plans](${base}/#pricing): Trial, Plus, Lab, Research
- [FAQ](${base}/#faq): headsets, LSL/OSC, Muse app, download
- [Pricing (machine-readable)](${base}/pricing.md)

## Plans
- Trial: 30 minutes live
- Plus: $19/mo — unlimited live, local recording, replay
- Lab: $49/mo — LSL, OSC, HTTP API, event markers
- Research: $99/mo — signal filters

## FAQ
${faq}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
