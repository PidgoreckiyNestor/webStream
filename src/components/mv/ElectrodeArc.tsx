"use client";

import { useEffect, useState } from "react";

type QualityState = "ok" | "weak" | "bad";

const OK = "#34d399";
const WEAK = "#fbbf24";
const BAD = "#f87171";
const RING_COLOR: Record<QualityState, string> = { ok: OK, weak: WEAK, bad: BAD };
const RING_FILL: Record<QualityState, string> = {
  ok: "rgba(52,211,153,.18)",
  weak: "rgba(251,191,36,.16)",
  bad: "rgba(248,113,113,.16)",
};

const CHANNELS = ["TP9", "AF7", "AF8", "TP10"] as const;

const P0 = { x: 34, y: 128 };
const P1 = { x: 150, y: 24 };
const P2 = { x: 266, y: 128 };
const PAD_T = [0.05, 0.36, 0.64, 0.95];
const RING_R = 19;
const RING_CIRC = 2 * Math.PI * RING_R;
const BAND_OUTER = "M34 128 Q150 24 266 128";
const BAND_ARMS = "M34 128 q-12 22 4 40 M266 128 q12 22 -4 40";

const bezier = (t: number) => {
  const u = 1 - t;
  return {
    x: u * u * P0.x + 2 * u * t * P1.x + t * t * P2.x,
    y: u * u * P0.y + 2 * u * t * P1.y + t * t * P2.y,
  };
};

type Pad = { ch: (typeof CHANNELS)[number]; uv: number; qpct: number; state: QualityState };

const BASE: Pad[] = [
  { ch: "TP9", uv: 74, qpct: 92, state: "ok" },
  { ch: "AF7", uv: 42, qpct: 77, state: "ok" },
  { ch: "AF8", uv: 28, qpct: 89, state: "ok" },
  { ch: "TP10", uv: 69, qpct: 90, state: "ok" },
];

function ChartGrid() {
  const xs = [30, 80, 130, 180, 230, 270];
  const ys = [28, 68, 108, 148];
  return (
    <g aria-hidden="true">
      {ys.map((y) => (
        <line key={`h-${y}`} x1="8" x2="292" y1={y} y2={y} stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
      ))}
      {xs.map((x) => (
        <line key={`v-${x}`} x1={x} x2={x} y1="12" y2="172" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
    </g>
  );
}

function ElectrodeRings({ pads }: { pads: Pad[] }) {
  return (
    <svg viewBox="0 0 300 184" className="block h-auto w-full" role="img" aria-labelledby="electrode-arc-title">
      <title id="electrode-arc-title">Muse electrode placement TP9, AF7, AF8, TP10</title>
      <g transform="translate(0, -14)">
        <ChartGrid />
        <path d={BAND_OUTER} fill="none" stroke="rgba(255,255,255,.05)" strokeWidth={30} strokeLinecap="round" />
        <path d={BAND_OUTER} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth={15} strokeLinecap="round" />
        <path d={BAND_ARMS} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth={11} strokeLinecap="round" />
        {pads.map((p, i) => {
          const { x, y } = bezier(PAD_T[i]);
          const color = RING_COLOR[p.state];
          const fill = RING_FILL[p.state];
          const dash = `${((p.qpct / 100) * RING_CIRC).toFixed(1)} ${RING_CIRC.toFixed(1)}`;
          return (
            <g key={p.ch}>
              <circle className="eeg-halo" cx={x} cy={y} r={22} fill={color} />
              <circle cx={x} cy={y} r={RING_R} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth={3.5} />
              <circle
                cx={x}
                cy={y}
                r={RING_R}
                fill="none"
                stroke={color}
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeDasharray={dash}
                transform={`rotate(-90 ${x} ${y})`}
              />
              <circle cx={x} cy={y} r={12} fill={fill} stroke={color} strokeWidth={2} />
              <text x={x} y={y + 3.5} textAnchor="middle" fontSize={10} fontWeight={700} fill="#e9eaf0" className="font-mono">
                {p.qpct}
              </text>
              <text
                x={x}
                y={y + 35}
                textAnchor="middle"
                fontSize={13}
                fontWeight={600}
                fill={color}
                fillOpacity={0.55}
                className="font-mono"
              >
                {p.uv} µV
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export function ElectrodeArc() {
  const [pads, setPads] = useState(BASE);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const started = performance.now();
    const id = window.setInterval(() => {
      const t = (performance.now() - started) / 1000;
      setPads(
        BASE.map((p, i) => ({
          ...p,
          uv: Math.max(8, Math.round(p.uv + Math.sin(t * 0.7 + i * 1.4) * 5)),
          qpct: Math.min(99, Math.max(62, Math.round(p.qpct + Math.sin(t * 0.45 + i * 1.9) * 3))),
        })),
      );
    }, 180);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-[#07080d] px-5 py-5 sm:px-6 sm:py-6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 42%, rgba(52,211,153,0.10) 0%, transparent 62%)",
        }}
      />
      <div className="relative flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/65">Electrode placement</p>
        <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400/80">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Live
        </span>
      </div>
      <div className="relative flex flex-1 items-center justify-center">
        <div className="w-full max-w-lg">
          <ElectrodeRings pads={pads} />
        </div>
      </div>
    </div>
  );
}
