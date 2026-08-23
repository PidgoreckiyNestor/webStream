export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  sections: { heading?: string; paragraphs: string[] }[];
};

export const articles: Article[] = [
  {
    slug: "bluemuse-alternative",
    title: "A BlueMuse alternative on Windows, macOS, and Linux",
    description:
      "BlueMuse is a Windows LSL bridge for Muse. MindVault is a desktop app for Muse 2, Muse S, and Muse S Athena — no dongle, no phone. LSL ships on Lab. Waitlist, not a download.",
    date: "2026-08-23",
    sections: [
      {
        paragraphs: [
          "BlueMuse streams Muse EEG over Lab Streaming Layer on Windows. It does that job. It does not run on macOS or Linux, and it is a bridge — not a live view, not CSV, not Athena-first.",
          "MindVault is a desktop app for Muse 2, Muse S, and Muse S Athena. Pair over the computer’s Bluetooth. No BLED112 dongle. No phone in the loop. Windows, macOS, and Linux use the same app.",
        ],
      },
      {
        heading: "LSL without a second Windows helper",
        paragraphs: [
          "Free is 30 minutes live and contact quality. Base adds unlimited live, local recording, and CSV or EDF. Lab ($49/month) adds LSL, OSC, an HTTP API, and event markers on the same session — including Athena.",
          "That is not a public installer yet. Lab beta is a waitlist: pick a plan, leave an email. We write when builds open. BlueMuse stays the right pick if you need a Windows LSL stream today.",
        ],
      },
    ],
  },
  {
    slug: "muse-eeg-on-a-computer",
    title: "Muse EEG on a computer without the phone app",
    description:
      "The Muse app and Mind Monitor run on a phone. MindVault pairs Muse 2, Muse S, or Muse S Athena on Windows, macOS, or Linux over Bluetooth and records 256 Hz EEG on the desk.",
    date: "2026-08-23",
    sections: [
      {
        paragraphs: [
          "The official Muse app scores meditation on iOS and Android. Mind Monitor graphs raw data on a phone and can write CSV or stream OSC over Wi-Fi. Neither puts the hoop on a computer as the first device.",
          "MindVault pairs Muse 2, Muse S, or Muse S Athena from Windows, macOS, or Linux over Bluetooth. Four EEG channels — TP9, AF7, AF8, TP10 — at 256 Hz. Watch bands live. Record locally. Export CSV or EDF on Base.",
        ],
      },
      {
        heading: "Not a download today",
        paragraphs: [
          "Free is 30 minutes live so you can see the stream. Then Base, Lab, or Research. Lab adds LSL and OSC. There is no public installer yet — join the waitlist from the plans on the site.",
        ],
      },
    ],
  },
  {
    slug: "muse-s-athena-desktop",
    title: "Muse S Athena on the desktop: CSV now, LSL on Lab",
    description:
      "Muse S Athena (MS-03) connects in MindVault over Bluetooth. Same 256 Hz montage as Muse 2 and Muse S. CSV and EDF on Base. LSL and OSC on Lab. Waitlist for the Lab beta.",
    date: "2026-08-23",
    sections: [
      {
        paragraphs: [
          "Athena is first-class in MindVault: same live view, same local recording, same CSV and EDF as Muse 2 and Muse S. EEG is still four channels at 256 Hz. Athena uses optics / fNIRS, not PPG. You do not need Interaxon’s SDK or the meditation app for the live session.",
          "LSL, OSC, an HTTP API, and event markers sit on Lab. If you need a file for Python, MNE, or EEGLAB, Base is the export. If you need a live pipe, Lab is the plan — when the beta opens.",
        ],
      },
    ],
  },
];

export function articleBySlug(slug: string): Article | undefined {
  return articles.find((item) => item.slug === slug);
}
