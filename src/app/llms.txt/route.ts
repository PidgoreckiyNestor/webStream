import { articles } from "@/lib/articles";
import { faqItems } from "@/lib/faq";
import { PRODUCT_DEFINITION } from "@/lib/product";
import { siteUrl } from "@/lib/site";

export function GET() {
  const base = siteUrl();
  const faq = faqItems.map((item) => `### ${item.q}\n\n${item.a}`).join("\n\n");
  const body = `# MindVault
> Athena-first desktop app for live 256 Hz EEG, contact quality, CSV recording, and EDF export. Controlled early access is rolling out across Windows, macOS, and Linux.

${PRODUCT_DEFINITION}

## Pages
- [Home](${base}): product, how it works, plans, FAQ
- [Plans](${base}/#pricing): Free, Base, Lab, Research
- [FAQ](${base}/#faq): headsets, LSL/OSC, Muse app, download
- [Guides](${base}/articles): Muse EEG on a computer
${articles.map((item) => `- [${item.navTitle}](${base}/articles/${item.slug}): ${item.dek}`).join("\n")}
- [Pricing (machine-readable)](${base}/pricing.md)

## Plans and rollout
- Available in current Athena access: Free — 30 minutes live
- Available in current Athena access: Base ($19/mo) — unlimited live, local recording, CSV and EDF
- Lab ($49/mo), coming next — LSL, OSC, HTTP API, event markers
- Research ($99/mo), on the roadmap — adjustable notch and bandpass, raw and filtered export, filter recipe in the file

## FAQ
${faq}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
