export const faqItems = [
  {
    q: "What is MindVault?",
    a: "MindVault is a desktop app for Muse 2, Muse S, and Muse S Athena — not a notes or RAG tool, and not a supplement brand. It streams EEG (TP9, AF7, AF8, TP10 at 256 Hz) to Windows, macOS, and Linux over Bluetooth. Record locally, export CSV or EDF, or pipe LSL and OSC. The Muse phone app is not in the loop.",
  },
  {
    q: "Does MindVault work with Muse 2, Muse S, and Muse S Athena?",
    a: "Yes. Muse 2, Muse S, and Muse S Athena (MS-03) connect over Bluetooth on Windows, macOS, and Linux. No extra dongle. Athena is first-class: same live view, same local recording, same CSV and EDF, same LSL and OSC on Lab. EEG is four channels at 256 Hz on all three hoops.",
  },
  {
    q: "Can I use Muse EEG on a computer without the phone app?",
    a: "Yes. MindVault pairs the headset from Windows, macOS, or Linux over Bluetooth. Live view, local recording, and CSV or EDF export do not need the official Muse app. Lab adds LSL, OSC, an HTTP API, and event markers on the same desktop session.",
  },
  {
    q: "Does Muse S Athena support LSL, OSC, and CSV on desktop?",
    a: "Yes. MindVault streams Muse S Athena EEG to a computer and writes CSV or EDF on Plus. Lab ($49/month) adds Lab Streaming Layer (LSL), OSC, an HTTP API, and event markers. No phone bridge. Same TP9, AF7, AF8, TP10 montage at 256 Hz.",
  },
  {
    q: "What EEG channels and sample rate does MindVault record?",
    a: "Four EEG channels — TP9, AF7, AF8, and TP10 — at 256 Hz, timestamped. Same montage on Muse 2, Muse S, and Muse S Athena. Muse 2 and Muse S also have PPG (64 Hz). Athena uses optics / fNIRS, not PPG. IMU is 52 Hz. EEG is what we write to CSV and EDF today.",
  },
  {
    q: "Can I export Muse EEG to CSV or EDF for Python, MNE, or EEGLAB?",
    a: "Yes. Plus records locally and exports CSV (Python, NumPy, Jupyter) or EDF (MNE, EEGLAB). Lab is the live pipe instead of a file: LSL into Python or MATLAB, OSC into Unity. Free is 30 minutes live to see the stream first.",
  },
  {
    q: "How is MindVault different from the Muse app?",
    a: "The Muse app scores meditation on a phone. MindVault puts the raw stream on a desk: 256 Hz EEG on TP9, AF7, AF8, and TP10, on Windows, macOS, or Linux. Record locally. Export CSV or EDF. Lab pipes LSL and OSC. It does not replace Muse meditation features.",
  },
  {
    q: "Can I download MindVault for Windows now?",
    a: "Not as a public installer yet. Lab beta is a waitlist: pick a plan, leave an email, we write when Windows, macOS, and Linux builds open. Free is 30 minutes live. Plus is $19/month. Lab is $49/month. Research is $99/month. One note — not a newsletter.",
  },
  {
    q: "Do I need BlueMuse or a BLED112 dongle to stream Muse EEG on Windows?",
    a: "No. MindVault pairs Muse 2, Muse S, and Muse S Athena over the computer’s Bluetooth. No phone bridge, no BlueMuse, no BLED112 dongle. Windows, macOS, and Linux use the same desktop app. Lab adds LSL without a second Windows-only helper.",
  },
  {
    q: "How is MindVault different from Mind Monitor?",
    a: "Mind Monitor is a phone app: live graphs, OSC over Wi-Fi, CSV on the device. MindVault is a desktop app — pair the hoop on Windows, macOS, or Linux, watch 256 Hz EEG live, record locally, export CSV or EDF. Lab pipes LSL and OSC from the same session. No phone in the loop.",
  },
  {
    q: "Does Muse S Athena work on a computer without the official SDK?",
    a: "Yes. MindVault connects Muse S Athena (MS-03) over Bluetooth on the desktop. Live view, contact quality, local recording, CSV, and EDF do not need Interaxon’s Muse SDK or the meditation app. Lab adds LSL, OSC, an HTTP API, and event markers on Athena the same way as Muse 2 and Muse S.",
  },
] as const;
