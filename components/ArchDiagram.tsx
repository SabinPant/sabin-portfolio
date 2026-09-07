"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export type ArchNode = { label: string; icon: string; note?: string };

/* ── Geometry ── */
const NW = 150; // node width
const NH = 78; // node height
const GAP = 46;
const PAD = 22;
const NY = 34; // node top edge
const VH = 148; // viewBox height

/* Icon paths, drawn into a nested 24x24 svg inside each node */
const ICONS: Record<string, React.ReactNode> = {
  browser: (
    <>
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <line x1="2" y1="8" x2="22" y2="8" />
      <line x1="6" y1="5.5" x2="6.01" y2="5.5" />
      <line x1="9" y1="5.5" x2="9.01" y2="5.5" />
    </>
  ),
  server: (
    <>
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </>
  ),
  layers: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </>
  ),
  chart: (
    <>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </>
  ),
  flask: (
    <>
      <path d="M9 3h6M9 3v7l-4 8a1 1 0 0 0 .9 1.5h12.2A1 1 0 0 0 19 18l-4-8V3" />
      <line x1="7.5" y1="15" x2="16.5" y2="15" />
    </>
  ),
};

export default function ArchDiagram({
  nodes,
  caption,
}: {
  nodes: ArchNode[];
  caption?: string;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pktRefs = useRef<(SVGCircleElement | null)[]>([]);

  const xs = nodes.map((_, i) => PAD + i * (NW + GAP));
  const vw = PAD * 2 + nodes.length * NW + (nodes.length - 1) * GAP;
  const midY = NY + NH / 2;

  const segments = nodes.slice(0, -1).map((_, i) => ({
    x1: xs[i] + NW,
    x2: xs[i + 1],
  }));

  /* Two packets per segment, offset so the flow reads as continuous */
  const packets = segments.flatMap((s, si) =>
    [0, 0.5].map((o) => ({ ...s, t0: (o + si * 0.17) % 1, speed: 0.0055 + si * 0.0006 })),
  );

  useEffect(() => {
    if (reduce || packets.length === 0) return;

    let raf = 0;
    let visible = true;
    const state = packets.map((p) => p.t0);

    const loop = () => {
      if (visible) {
        for (let i = 0; i < state.length; i++) {
          state[i] = (state[i] + packets[i].speed) % 1;
          const el = pktRefs.current[i];
          if (!el) continue;
          const t = state[i];
          const p = packets[i];
          el.setAttribute("cx", String(p.x1 + (p.x2 - p.x1) * t));
          el.setAttribute(
            "opacity",
            String(t < 0.1 ? t / 0.1 : t > 0.9 ? (1 - t) / 0.1 : 1),
          );
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    let io: IntersectionObserver | undefined;
    if (svgRef.current && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(svgRef.current);
    }

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
    // Geometry is derived from `nodes`, which is stable per project.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, nodes.length]);

  const hasNotes = nodes.some((n) => n.note);
  const readout =
    active !== null && nodes[active]?.note
      ? nodes[active].note
      : caption ?? "Hover a stage to see what it owns.";

  return (
    <div className="w-full">
      <div className="overflow-x-auto px-4 py-5">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${vw} ${VH}`}
          className="block w-full h-auto"
          style={{ minWidth: Math.min(vw, 560) }}
          role="img"
          aria-label={`Architecture: ${nodes.map((n) => n.label).join(", then ")}`}
        >
          {/* Edges */}
          {segments.map((s, i) => (
            <g key={`e${i}`}>
              <line
                x1={s.x1}
                y1={midY}
                x2={s.x2}
                y2={midY}
                stroke="var(--border-strong)"
                strokeWidth="1.5"
              />
              <path
                d={`M${s.x2 - 7} ${midY - 4} L${s.x2} ${midY} L${s.x2 - 7} ${midY + 4} Z`}
                fill="var(--border-strong)"
              />
            </g>
          ))}

          {/* Packets */}
          {!reduce &&
            packets.map((p, i) => (
              <circle
                key={`p${i}`}
                ref={(el) => {
                  pktRefs.current[i] = el;
                }}
                r="3.2"
                cy={midY}
                cx={p.x1 + (p.x2 - p.x1) * p.t0}
                fill="var(--signal-lit)"
              />
            ))}

          {/* Nodes */}
          {nodes.map((n, i) => {
            const on = active === i;
            return (
              <g
                key={n.label}
                tabIndex={0}
                role="button"
                aria-label={n.note ? `${n.label}. ${n.note}` : n.label}
                className="cursor-pointer outline-none"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
              >
                <rect
                  x={xs[i]}
                  y={NY}
                  width={NW}
                  height={NH}
                  rx="6"
                  fill={on ? "var(--signal-haze)" : "var(--secondary)"}
                  stroke={on ? "var(--primary)" : "var(--border-strong)"}
                  strokeWidth="1.25"
                  style={{ transition: "fill .2s, stroke .2s" }}
                />
                <svg
                  x={xs[i] + NW / 2 - 10}
                  y={NY + 15}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={on ? "var(--primary)" : "var(--muted-foreground)"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transition: "stroke .2s" }}
                >
                  {ICONS[n.icon] ?? ICONS.layers}
                </svg>
                <text
                  x={xs[i] + NW / 2}
                  y={NY + 60}
                  textAnchor="middle"
                  fill="var(--foreground)"
                  style={{ font: "500 12.5px var(--font-plex-sans), sans-serif" }}
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {(hasNotes || caption) && (
        <div className="border-t border-border px-4 py-3 min-h-14 flex gap-3 items-start">
          <span className="label-micro pt-1 shrink-0 text-primary">Readout</span>
          <p className="text-sm text-muted-foreground m-0 max-w-[62ch]">{readout}</p>
        </div>
      )}
    </div>
  );
}
