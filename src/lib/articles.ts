export type ArticleTable = {
  caption: string;
  columns: string[];
  highlight?: number;
  rows: { label: string; cells: string[] }[];
};

export type ArticleSection = {
  heading?: string;
  paragraphs: string[];
  table?: ArticleTable;
};

export type Article = {
  slug: string;
  title: string;
  metaTitle?: string;
  navTitle: string;
  dek: string;
  shot: string;
  shotAlt: string;
  shotFit: "cover" | "contain";
  category: string;
  description: string;
  date: string;
  sections: ArticleSection[];
  faqs?: { q: string; a: string }[];
  availability?: string;
  cta?: { action: string; body: string };
};

export const articles: Article[] = [
  {
    slug: "bluemuse-alternative",
    title: "BlueMuse alternative: Windows LSL and desktop options",
    metaTitle: "BlueMuse alternative: Windows LSL vs desktop apps",
    navTitle: "BlueMuse alternative",
    dek: "BlueMuse 3.1 is a strong Windows GUI for Muse-to-LSL streaming. Compare it with MuseLSL, official Muse research tools, and MindVault’s Athena-first desktop workflow.",
    shot: "/images/shot-bluemuse-lsl.png",
    shotAlt: "Concept illustration of Muse EEG streaming through BlueMuse on Windows into LSL research tools",
    shotFit: "cover",
    category: "LSL",
    description:
      "Compare BlueMuse 3.1, MuseLSL, official Muse research tools, and MindVault for Windows LSL, Athena EEG, desktop recording, CSV, EDF, and access.",
    date: "2026-08-23",
    sections: [
      {
        paragraphs: [
          "BlueMuse has a clear strength: it turns Muse data into Lab Streaming Layer streams from a Windows GUI. The [MuseLSL documentation](https://github.com/alexandrebarachant/muse-lsl) recommends BlueMuse for Windows while pointing macOS and Linux users to the MuseLSL command line. Current [BlueMuse 3.1.0](https://github.com/kowalej/BlueMuse/blob/master/README.md) is a stable, modernized Windows release.",
        ],
      },
      {
        heading: "The job BlueMuse already does",
        paragraphs: [
          "You have a Muse headband and a Windows pipeline. BlueMuse publishes EEG and optional sensor streams over LSL so MATLAB, Python, or another inlet can subscribe. The interface manages discovered headsets and shows stream status, latest values, timestamps, and sample rates.",
          "BlueMuse 3.1 requires Windows 10 version 1809 or later, or Windows 11. It replaces the classic UWP app and separate LSL Bridge used by 2.4 with a .NET 10 and WinUI 3 app whose LSL logic runs in-process. The current installation remains an MSIX sideload; the guide does not list BLED112 as a requirement.",
          "The 3.1 release lists Muse S Athena support as experimental and not verified. Protocol support is not the same as a validated production workflow: Athena users should test their exact signals before relying on it for a study.",
        ],
      },
      {
        heading: "Where the other routes fit",
        paragraphs: [
          "[MuseLSL](https://github.com/alexandrebarachant/muse-lsl) is the broader command-line and Python-library route for Muse 2016, Muse 2, and Muse S across Windows, macOS, and Linux. It can create LSL streams, show data, and record CSV, but it is not an integrated desktop workspace.",
          "The vendor-backed [Muse research software](https://musehealth.ai/pages/platform-data) provides desktop and mobile streaming, LSL or OSC, event markers, multi-device sessions, and CSV or EDF recording, including Athena optics. It is licensed research software accessed by contacting Muse rather than a public self-serve download.",
          "MindVault’s current Athena release connects the headband directly to the computer and brings live TP9, AF7, AF8, and TP10 at 256 Hz, contact quality, CSV recording, and EDF export into one desktop workflow. Windows, macOS, and Linux distribution is rolling out, with LSL, OSC, an HTTP API, and event markers coming to Lab.",
        ],
      },
      {
        heading: "Which route fits your workflow?",
        paragraphs: [
          "BlueMuse is an established and actively maintained Windows GUI for Muse-to-LSL, and MuseLSL recommends it for that workflow. There is no public market-share dataset that supports a broader claim about overall Muse desktop leadership.",
          "The right comparison depends on the job. Choose BlueMuse 3.1 for a Windows GUI that publishes LSL today, MuseLSL for a cross-platform CLI or Python library, or official Muse tools for a licensed research stack. Choose MindVault for an Athena-first desktop workflow that combines direct pairing, live EEG, contact quality, and local files. LSL and OSC are coming next in Lab.",
          "For a broader overview of phone, LSL, and direct desktop routes, see [Muse EEG on a computer without the phone app](/articles/muse-eeg-on-a-computer). For MS-03 hardware and signal details, see [Muse S Athena raw EEG on the desktop](/articles/muse-s-athena-desktop).",
        ],
        table: {
          caption: "Choose a Muse desktop route by job",
          columns: ["BlueMuse 3.1", "MuseLSL", "Official Muse tools", "MindVault"],
          highlight: 3,
          rows: [
            { label: "Best for", cells: ["Windows GUI to LSL", "Cross-platform CLI / library", "Licensed research studies", "Athena live view and files"] },
            { label: "OS", cells: ["Windows 10 / 11", "Windows, macOS, Linux", "Desktop and mobile", "Windows, macOS, Linux rollout"] },
            { label: "Availability", cells: ["Public stable release", "Public package and source", "Contact Muse for access", "Controlled early access"] },
            { label: "Live pipe", cells: ["LSL", "LSL", "LSL and OSC", "LSL and OSC coming to Lab"] },
            { label: "Recording", cells: ["LSL output; no built-in files", "CSV", "CSV and EDF", "CSV recording and EDF export"] },
            { label: "Athena", cells: ["Experimental; not verified", "Not listed", "Supported", "Tested four-channel EEG"] },
            { label: "Interface", cells: ["Windows GUI", "CLI / Python", "Vendor research software", "Athena desktop workspace"] },
          ],
        },
      },
      {
        heading: "MindVault plans",
        paragraphs: [
          "Free brings 30 minutes of live EEG and contact quality to the desktop.",
          "Base ($19/mo) adds unlimited live view, local recording, CSV, and EDF export.",
          "Coming next in Lab ($49/mo): LSL, OSC, an HTTP API, and event markers in the same session.",
          "Research roadmap ($99/mo): adjustable notch and bandpass filters, plus raw and filtered export.",
        ],
      },
      {
        heading: "Sources and status",
        paragraphs: [
          "Status checked August 23, 2026. Primary sources: [BlueMuse README and 3.1 version notes](https://github.com/kowalej/BlueMuse/blob/master/README.md), [MuseLSL documentation](https://github.com/alexandrebarachant/muse-lsl), [Muse Platform + Data](https://musehealth.ai/pages/platform-data), and the [Muse SDK developer page](https://choosemuse.com/pages/developers).",
        ],
      },
    ],
    faqs: [
      {
        q: "Does BlueMuse run on macOS or Linux?",
        a: "No. BlueMuse 3.1 is a Windows LSL app. MuseLSL provides a cross-platform command-line route, while official Muse research tools cover licensed desktop workflows. MindVault is rolling out controlled early access for Windows, macOS, and Linux.",
      },
      {
        q: "If I need Muse LSL on Windows today, should I use BlueMuse?",
        a: "Yes. BlueMuse 3.1 is a current public Windows GUI route to LSL. MindVault takes a different route: direct Athena pairing, live EEG, CSV, and EDF today, with LSL coming to Lab.",
      },
      {
        q: "Does BlueMuse 3.1 support Muse S Athena?",
        a: "The project lists Athena support as experimental and not verified. Test the required streams before relying on it for a study. MindVault’s current Athena release provides a tested four-channel EEG workflow through controlled early access.",
      },
    ],
    availability:
      "MindVault is onboarding Athena users through controlled early access. Leave your email; we will follow up about your operating system and workflow. One reply, not a newsletter.",
    cta: {
      action: "Request Athena access",
      body: "Connect Athena directly, view 256 Hz EEG, record CSV, and export EDF. LSL and OSC are coming next in Lab.",
    },
  },
  {
    slug: "muse-eeg-on-a-computer",
    title: "Muse EEG on a computer without the phone app",
    metaTitle: "Muse headband desktop app without a phone",
    navTitle: "EEG without the phone",
    dek: "Compare phone, LSL, and direct-Bluetooth routes for getting Muse EEG onto a computer.",
    shot: "/images/shot-live.png",
    shotAlt: "Live EEG on the desk: electrodes and raw signal",
    shotFit: "cover",
    category: "Desktop",
    description:
      "Compare ways to use Muse EEG on a computer: Mind Monitor OSC, BlueMuse, MuseLSL, official Muse research tools, direct Bluetooth, CSV, and EDF.",
    date: "2026-08-23",
    sections: [
      {
        paragraphs: [
          "You can get Muse EEG onto a computer through a phone-to-computer stream, a Windows or command-line LSL bridge, or a desktop app that pairs the headband directly. MindVault’s current Athena release uses the direct route: four EEG channels at 256 Hz, live contact quality, CSV recording, and EDF export with no phone in the loop.",
        ],
      },
      {
        heading: "Ways to get Muse EEG onto a computer",
        paragraphs: [
          "The consumer Muse app is built for meditation scores on iOS and Android. Muse also offers licensed [research software and an SDK](https://musehealth.ai/pages/platform-data) for raw desktop and mobile data. Keep the consumer app if you want meditation features; it is not the same workflow as a raw 256 Hz desktop stream.",
          "[Mind Monitor](https://www.musemonitor.com/FAQ.php) graphs raw data on a phone, records CSV on the device, and can send OSC over Wi-Fi. That is still a phone in the loop: the computer receives data downstream rather than pairing the headband.",
          "[BlueMuse 3.1](https://github.com/kowalej/BlueMuse/blob/master/README.md) puts Muse EEG on LSL from a Windows GUI. [MuseLSL](https://github.com/alexandrebarachant/muse-lsl) provides a cross-platform command-line and Python route. Both are useful when another program already receives LSL; neither is a full desktop analysis workspace.",
          "Muse’s licensed research software combines live desktop streaming, LSL or OSC, markers, multi-device sessions, and CSV or EDF recording.",
        ],
      },
      {
        heading: "What MindVault supports now",
        paragraphs: [
          "MindVault pairs Muse S Athena over the computer’s Bluetooth. No official Muse app open. No phone bridge. The current Athena release reads TP9, AF7, AF8, and TP10 at 256 Hz, shows contact quality and live EEG, records CSV, and exports the session as EDF.",
          "Controlled early access is rolling out across Windows, macOS, and Linux. Athena is the current validated workflow; Muse 2 and Muse S join as each headset and operating system clears the compatibility matrix.",
          "Coming next in Lab: LSL, OSC, an HTTP API, and event markers in the same desktop session. For the current Windows LSL route and its alternatives, see [the BlueMuse comparison](/articles/bluemuse-alternative). For MS-03 specifically, see [Muse S Athena on the desktop](/articles/muse-s-athena-desktop).",
        ],
      },
      {
        heading: "Muse app vs Mind Monitor vs desktop tools",
        paragraphs: [
          "Choose by route and output. Stay on the phone for meditation scores or a pocket graph. Use an LSL tool when another program already receives the stream. Use a desktop workspace when you want pairing, a live view, and local files in one place.",
        ],
        table: {
          caption: "Phone, LSL, licensed research, and desktop routes compared",
          columns: ["Muse app", "Mind Monitor", "BlueMuse", "MuseLSL", "Official Muse tools", "MindVault"],
          highlight: 5,
          rows: [
            { label: "Runs on", cells: ["Phone", "Phone", "Windows", "CLI on Windows, macOS, Linux", "Desktop and mobile", "Windows, macOS, Linux rollout"] },
            { label: "Pairs the headband", cells: ["On the phone", "On the phone", "On the computer", "On the computer", "On the computer or mobile device", "On the computer"] },
            { label: "Primary use", cells: ["Meditation scores", "Phone graphs and recording", "Windows LSL", "CLI streaming and recording", "Licensed research studies", "Live Athena view and files"] },
            { label: "File", cells: ["No desktop CSV/EDF", "CSV on the phone", "No built-in CSV/EDF", "CSV recording", "CSV and EDF", "CSV, then EDF export"] },
            { label: "Live pipe", cells: ["No", "OSC over Wi-Fi", "LSL", "LSL", "LSL and OSC", "LSL and OSC coming to Lab"] },
            { label: "Availability", cells: ["Public", "Public", "Public stable release", "Public open source", "Licensed; contact Muse", "Controlled early access"] },
          ],
        },
      },
      {
        heading: "MindVault plans",
        paragraphs: [
          "Free brings 30 minutes of live EEG and contact quality to the desktop.",
          "Base ($19/mo) adds unlimited live view, local recording, CSV, and EDF.",
          "Coming next in Lab ($49/mo): LSL, OSC, an HTTP API, and event markers in the same session.",
          "Research roadmap ($99/mo): adjustable notch and bandpass filters, plus raw and filtered export.",
        ],
      },
      {
        heading: "Sources and further reading",
        paragraphs: [
          "Primary sources: [Muse Platform + Data](https://musehealth.ai/pages/platform-data), [Muse SDK for developers](https://choosemuse.com/pages/developers), [Mind Monitor FAQ and CSV specification](https://www.musemonitor.com/FAQ.php), [BlueMuse README](https://github.com/kowalej/BlueMuse/blob/master/README.md), and [MuseLSL](https://github.com/alexandrebarachant/muse-lsl).",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Mind Monitor run as a desktop Muse client?",
        a: "No. Mind Monitor is a phone app. It can send OSC to a computer over Wi-Fi. That is not pairing the hoop on the computer.",
      },
      {
        q: "Do I need the official Muse app open for MindVault?",
        a: "No. MindVault’s current Athena release pairs the headband directly over the computer’s Bluetooth. The meditation app is not in the loop.",
      },
      {
        q: "Can I record Muse EEG to CSV on the computer without LSL?",
        a: "Yes. The current Athena release records EEG to CSV and exports EDF without LSL. Controlled early access is open now; LSL is coming next in Lab.",
      },
    ],
    availability:
      "MindVault is onboarding Athena users through controlled early access. Leave your email; we will follow up about your operating system and workflow. One reply, not a newsletter.",
    cta: {
      action: "Request Athena access",
      body: "Put live Athena EEG, contact quality, CSV recording, and EDF export on your desktop without a phone bridge.",
    },
  },
  {
    slug: "muse-s-athena-desktop",
    title: "Muse S Athena raw EEG on the desktop",
    metaTitle: "Muse S Athena raw EEG on desktop: CSV and EDF",
    navTitle: "Muse S Athena desktop",
    dek: "MindVault connects Muse S Athena directly to the desktop, records four-channel EEG to CSV, and exports EDF. LSL and OSC are coming next in Lab.",
    shot: "/images/shot-athena-ms03-reference.png",
    shotAlt: "Concept illustration of a Muse S Athena fabric headband beside four EEG traces and a spectrogram",
    shotFit: "cover",
    category: "Athena",
    description:
      "Muse S Athena raw EEG on a computer with MindVault: direct Bluetooth, live 256 Hz EEG, CSV recording, EDF export, with LSL and OSC coming next in Lab.",
    date: "2026-08-23",
    sections: [
      {
        paragraphs: [
          "MindVault’s current Athena release pairs Muse S Athena (MS-03) over the computer’s Bluetooth, shows four EEG channels at 256 Hz, records them locally to CSV, and exports EDF. No Interaxon SDK installation. No meditation app in the loop.",
        ],
      },
      {
        heading: "Athena hardware and MindVault output",
        paragraphs: [
          "According to the official [Muse Platform + Data specifications](https://musehealth.ai/pages/platform-data), Athena hardware includes four EEG channels at 256 Hz, PPG at 64 Hz, fNIRS optics, SpO2, and motion sensing. MindVault’s current release centers on TP9, AF7, AF8, and TP10 EEG; PPG, fNIRS, SpO2, and motion export sit on the research roadmap.",
          "Current BlueMuse 3.1 lists Athena support as experimental and not verified in its [README](https://github.com/kowalej/BlueMuse/blob/master/README.md). Interaxon’s licensed research software officially supports Athena streaming and recording. MindVault takes an Athena-first desktop route with a tested four-channel EEG workflow, local recording, and EDF export.",
        ],
      },
      {
        heading: "What the current Athena release supports",
        paragraphs: [
          "Pair Athena over the computer’s Bluetooth and see contact quality plus live EEG on the same desktop. No Interaxon SDK installation. No phone bridge.",
          "Record four EEG channels locally to CSV and export EDF for Python, MNE, or EEGLAB. Controlled early access is rolling out across Windows, macOS, and Linux.",
          "Coming to Lab: LSL, OSC, an HTTP API, and event markers in the same Athena session.",
          "For the available routes to put Muse EEG on a computer without a phone, see [Muse EEG on a computer without the phone app](/articles/muse-eeg-on-a-computer). For BlueMuse version and reliability details, see [the BlueMuse comparison](/articles/bluemuse-alternative).",
        ],
      },
      {
        heading: "Athena capability status in MindVault",
        paragraphs: [
          "The current Athena release covers the local EEG workflow. Plan access shows how each capability is packaged; the final column shows what joins the session in Lab.",
        ],
        table: {
          caption: "Athena capability status in MindVault",
          columns: ["Current Athena release", "Plan access", "Coming to Lab"],
          highlight: 0,
          rows: [
            { label: "Live EEG", cells: ["Tested: 4 channels at 256 Hz", "Free, Base, Lab", "Same live session"] },
            { label: "CSV / EDF", cells: ["Tested: CSV recording and EDF export", "Base and above", "Files alongside the live pipe"] },
            { label: "LSL / OSC", cells: ["EEG + CSV/EDF today", "Lab", "LSL and OSC"] },
            { label: "HTTP API", cells: ["EEG + CSV/EDF today", "Lab", "HTTP API"] },
            { label: "PPG / fNIRS export", cells: ["EEG-focused release", "Research roadmap", "Later research work"] },
          ],
        },
      },
      {
        heading: "MindVault plans",
        paragraphs: [
          "Free brings 30 minutes of live Athena EEG and contact quality to the desktop.",
          "Base ($19/mo) adds unlimited live view, local recording, CSV, and EDF.",
          "Coming next in Lab ($49/mo): LSL, OSC, an HTTP API, and event markers in the same session.",
          "Research roadmap ($99/mo): adjustable notch and bandpass filters, plus raw and filtered export.",
        ],
      },
      {
        heading: "Official specifications and implementation sources",
        paragraphs: [
          "Primary sources: [Muse Platform + Data](https://musehealth.ai/pages/platform-data) for Athena sensors, sampling rates, and official desktop research workflows; the [Muse SDK developer page](https://choosemuse.com/pages/developers) for SDK availability and licensing; and the [BlueMuse README](https://github.com/kowalej/BlueMuse/blob/master/README.md) for Athena protocol and version status.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Athena export PPG?",
        a: "Athena hardware includes both PPG at 64 Hz and fNIRS optics. MindVault’s current release focuses on exporting the four 256 Hz EEG channels to CSV and EDF; PPG and fNIRS export sit on the research roadmap.",
      },
      {
        q: "Is Interaxon’s SDK required for a live Athena desktop session?",
        a: "No. MindVault’s current Athena release pairs the headband over Bluetooth and handles live EEG, recording, CSV, and EDF inside the desktop app.",
      },
      {
        q: "Is Athena LSL on Base?",
        a: "LSL is coming next in Lab. Base centers on unlimited live view, local recording, CSV, and EDF export.",
      },
    ],
    availability:
      "MindVault is onboarding Athena users through controlled early access. Leave your email; we will follow up about your operating system and workflow. One reply, not a newsletter.",
    cta: {
      action: "Request Athena access",
      body: "Bring live 256 Hz EEG, contact quality, CSV recording, and EDF export to your desktop now. LSL and OSC are coming next in Lab.",
    },
  },
];

export function articleBySlug(slug: string): Article | undefined {
  return articles.find((item) => item.slug === slug);
}

export function articleWordCount(article: Article): number {
  const chunks = [
    article.dek,
    ...article.sections.flatMap((section) => [
      section.heading ?? "",
      ...section.paragraphs,
      ...(section.table?.rows.flatMap((row) => [row.label, ...row.cells]) ?? []),
    ]),
    article.availability ?? "",
    article.cta?.action ?? "",
    article.cta?.body ?? "",
    ...(article.faqs ?? []).flatMap((item) => [item.q, item.a]),
  ];
  return chunks.join(" ").split(/\s+/).filter(Boolean).length;
}

export function formatArticleDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}
