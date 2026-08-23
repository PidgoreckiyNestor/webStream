type FaqItem = {
  q: string;
  a: string;
  guide?: { href: string; label: string };
};

export const faqItems: FaqItem[] = [
  {
    q: "What is MindVault?",
    a: "MindVault is an Athena-first desktop app for live EEG and local files. The current Athena release pairs over Bluetooth, shows TP9, AF7, AF8, and TP10 at 256 Hz, records CSV, and exports EDF without the phone app. Windows, macOS, and Linux access is rolling out now; LSL, OSC, an HTTP API, and event markers are coming to Lab.",
  },
  {
    q: "Does MindVault work with Muse 2, Muse S, and Muse S Athena?",
    a: "Athena is the current validated workflow: direct Bluetooth, four EEG channels at 256 Hz, contact quality, CSV, and EDF. Muse 2 and Muse S are in the compatibility rollout and will be added as each headset and operating system clears validation.",
  },
  {
    q: "Can I use Muse EEG on a computer without the phone app?",
    a: "Yes. The current Athena release pairs the headband directly over Bluetooth. Live view, contact quality, CSV recording, and EDF export do not need the official Muse app. Windows, macOS, and Linux access is rolling out; LSL, OSC, an HTTP API, and event markers are coming to Lab.",
    guide: {
      href: "/articles/muse-eeg-on-a-computer",
      label: "Muse EEG on a computer without the phone app",
    },
  },
  {
    q: "Does Muse S Athena support LSL, OSC, and CSV on desktop?",
    a: "The current Athena release streams TP9, AF7, AF8, and TP10 at 256 Hz, records CSV, and exports EDF without a phone bridge. LSL, OSC, an HTTP API, and event markers are coming to Lab.",
    guide: {
      href: "/articles/muse-s-athena-desktop",
      label: "Muse S Athena on the desktop",
    },
  },
  {
    q: "What EEG channels and sample rate does MindVault record?",
    a: "The current Athena release records four EEG channels — TP9, AF7, AF8, and TP10 — at 256 Hz. Athena hardware includes both PPG at 64 Hz and fNIRS optics; today’s MindVault export centers on EEG, while PPG and fNIRS export sit on the research roadmap.",
  },
  {
    q: "Can I export Muse EEG to CSV or EDF for Python, MNE, or EEGLAB?",
    a: "Yes. The current Athena access release records CSV for Python, NumPy, or Jupyter and exports EDF for MNE or EEGLAB. The live pipe is coming next in Lab: LSL for Python or MATLAB, and OSC for tools such as Unity.",
  },
  {
    q: "How is MindVault different from the Muse app?",
    a: "The Muse app scores meditation on a phone. MindVault’s current Athena release puts TP9, AF7, AF8, and TP10 EEG at 256 Hz on the desktop, with contact quality, CSV recording, and EDF export. It does not replace Muse meditation features; LSL and OSC are coming next in Lab for research workflows.",
  },
  {
    q: "Can I download MindVault for Windows now?",
    a: "MindVault is onboarding Athena users through controlled early access across Windows, macOS, and Linux. Request access and we will follow up about your setup. Free starts with 30 minutes live, Base is $19/month, Lab is $49/month, and Research is $99/month.",
  },
  {
    q: "Do I need BlueMuse or a BLED112 dongle to stream Muse EEG on Windows?",
    a: "No. MindVault’s current Athena release pairs directly over the computer’s Bluetooth without a phone bridge, BlueMuse, or a BLED112 dongle. Windows, macOS, and Linux access is rolling out now. LSL is coming to Lab; Muse 2 and Muse S are in the compatibility rollout.",
    guide: {
      href: "/articles/bluemuse-alternative",
      label: "BlueMuse alternative on Windows, macOS, and Linux",
    },
  },
  {
    q: "How is MindVault different from Mind Monitor?",
    a: "Mind Monitor is a phone app: live graphs, OSC over Wi-Fi, and CSV on the device. MindVault’s current Athena release pairs on the desktop, shows 256 Hz EEG live, records CSV, and exports EDF without a phone in the loop. LSL and OSC are coming to Lab.",
  },
  {
    q: "Does Muse S Athena work on a computer without the official SDK?",
    a: "Yes. MindVault’s current Athena release connects Muse S Athena (MS-03) over Bluetooth on the desktop. Live view, contact quality, CSV recording, and EDF export do not require Interaxon’s Muse SDK or the meditation app. LSL, OSC, an HTTP API, and event markers are coming to Lab.",
  },
] as const;
