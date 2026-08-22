import { Activity, Bluetooth, FileDown, MonitorSmartphone, Plug, Waves } from "lucide-react";

const features = [
  {
    icon: Waves,
    title: "Real-Time EEG Visualization",
    body: "View live brainwave data from all four EEG channels at 256 Hz. Configurable time windows (1-16 seconds) and amplitude scales (50-1600 µV).",
  },
  {
    icon: Activity,
    title: "Multi-Sensor Streaming",
    body: "Beyond EEG, stream accelerometer (52 Hz), gyroscope (52 Hz), and PPG heart rate data (64 Hz) from Muse 2 and Muse S.",
  },
  {
    icon: Bluetooth,
    title: "Publication-Grade Timestamps",
    body: "Precise millisecond timestamping on all data points, suitable for research publications and scientific analysis.",
  },
  {
    icon: FileDown,
    title: "CSV Data Recording",
    body: "Record sessions with precise timestamps suitable for research publications. Export to CSV for analysis in Python, MATLAB, or your preferred tools.",
  },
  {
    icon: Plug,
    title: "LSL & OSC Streaming",
    body: "Stream data over Lab Streaming Layer (LSL) for neuroscience research or OSC for creative applications in Unity, Max/MSP, and more.",
  },
  {
    icon: MonitorSmartphone,
    title: "Cross-Platform",
    body: "Native applications for Windows, macOS, and Linux. Consistent experience and performance across all platforms.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-white/5 px-4 py-1.5 text-sm font-medium text-accent border border-white/10">
            Features
          </span>
          <h2 className="mt-6 text-4xl font-medium tracking-normal text-white sm:text-5xl">
            Powerful features for EEG workflows
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">
            Connect Muse 2 or Muse S to desktop computers and start streaming brainwave data instantly.
            Visualize, record, and integrate EEG data into your research and applications.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent/15 transition-colors">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-white/50 leading-relaxed">{feature.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
