import { siteUrl } from "@/lib/site";

export function GET() {
  const base = siteUrl();
  const body = `# MindVault
> Desktop app for Muse 2 and Muse S. Live EEG on a computer — record locally, export CSV, or pipe LSL and OSC.

MindVault streams Muse EEG (TP9, AF7, AF8, TP10 at 256 Hz) plus PPG and IMU to Windows, macOS, and Linux. No phone in the loop. Lab adds LSL, OSC, an HTTP API, and event markers.

## Pages
- [Home](${base}): product, how it works, and plans
- [Plans](${base}/#pricing): Trial, Plus, Lab, Research

## Plans
- Trial: 30 minutes live
- Plus: $19/mo — unlimited live, local recording, replay
- Lab: $49/mo — LSL, OSC, HTTP API, event markers
- Research: $99/mo — signal filters

## Not
MindVault is not a meditation score app, not a Muse phone companion, and not the unrelated “MindVault” note/RAG tools on other domains.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
