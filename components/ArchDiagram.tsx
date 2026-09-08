"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useReducedMotion } from "framer-motion";

export type ArchNode = { label: string; icon: string; note?: string };

/* ── Geometry ──
   Two layouts, one model. Wide containers get the pipeline left to right,
   which is how these diagrams are meant to read. Narrow ones get it top to
   bottom: a phone cannot show a 560px strip without either shrinking the
   labels past legibility or asking the reader to pan sideways inside a card. */
const NW = 150; // node width, horizontal
const NH = 78; // node height, horizontal
const GAP = 46;
const PAD = 22;
const NY = 34; // node top edge, horizontal
const VH = 148; // viewBox height, horizontal

const V_NH = 56; // node height, vertical
const V_GAP = 30;
const V_PAD = 10;
const V_ICON_X = 18; // icon centre from the node's left edge
const V_LABEL_X = 44;

/* The horizontal strip is clamped to 560px wide, so that is exactly the width
   below which it can no longer be shown without an internal sideways scroll,
   and the stack takes over instead. Measured on the diagram's own container
   rather than the viewport: the same component renders inside a narrow card
   and at full page width. */
const H_MIN_WIDTH = 560;
const STACK_BELOW = H_MIN_WIDTH;

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

const COARSE_QUERY = "(pointer: coarse)";

function subscribeCoarse(onChange: () => void) {
  if (typeof window.matchMedia !== "function") return () => {};
  const mq = window.matchMedia(COARSE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const coarseSnapshot = () =>
  typeof window.matchMedia === "function" &&
  window.matchMedia(COARSE_QUERY).matches;

type Box = { x: number; y: number; w: number; h: number };
type Seg = { x1: number; y1: number; x2: number; y2: number };

export default function ArchDiagram({
  nodes,
  caption,
}: {
  nodes: ArchNode[];
  caption?: string;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const [boxW, setBoxW] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pktRefs = useRef<(SVGCircleElement | null)[]>([]);

  /* The layout follows the space the diagram is actually given. */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      if (w > 0) setBoxW(Math.round(w));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* `false` on the server: hover copy is the safe default, and the first
     client render corrects it before anyone can point at anything. */
  const coarse = useSyncExternalStore(subscribeCoarse, coarseSnapshot, () => false);

  /* Until the container reports a width, render the horizontal form: it is
     what desktop gets, and it keeps the server and first client paint equal. */
  const vertical = boxW !== null && boxW < STACK_BELOW;

  let vw: number;
  let vh: number;
  let boxes: Box[];

  if (vertical) {
    /* The viewBox matches the container width, so nothing is scaled and the
       label renders at the size it is set in. */
    vw = Math.max(240, boxW!);
    vh = V_PAD * 2 + nodes.length * V_NH + (nodes.length - 1) * V_GAP;
    boxes = nodes.map((_, i) => ({
      x: 1,
      y: V_PAD + i * (V_NH + V_GAP),
      w: vw - 2,
      h: V_NH,
    }));
  } else {
    vw = PAD * 2 + nodes.length * NW + (nodes.length - 1) * GAP;
    vh = VH;
    boxes = nodes.map((_, i) => ({
      x: PAD + i * (NW + GAP),
      y: NY,
      w: NW,
      h: NH,
    }));
  }

  const segments: Seg[] = boxes.slice(0, -1).map((b, i) => {
    const n = boxes[i + 1];
    return vertical
      ? { x1: b.x + b.w / 2, y1: b.y + b.h, x2: n.x + n.w / 2, y2: n.y }
      : { x1: b.x + b.w, y1: b.y + b.h / 2, x2: n.x, y2: n.y + n.h / 2 };
  });

  /* Two packets per segment, offset so the flow reads as continuous */
  const packets = segments.flatMap((s, si) =>
    [0, 0.5].map((o) => ({
      ...s,
      t0: (o + si * 0.17) % 1,
      speed: 0.0055 + si * 0.0006,
    })),
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
          el.setAttribute("cy", String(p.y1 + (p.y2 - p.y1) * t));
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
    // Geometry is derived from `nodes` and the resolved orientation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, nodes.length, vertical, vw]);

  /* Hover cannot reach the notes on a touch screen, so a tap latches the
     stage instead, and tapping the same one again releases it. */
  const toggle = useCallback(
    (i: number) => setActive((prev) => (prev === i ? null : i)),
    [],
  );

  const hasNotes = nodes.some((n) => n.note);
  const hint = coarse
    ? "Tap a stage to see what it does."
    : "Hover a stage to see what it does.";
  const readout =
    active !== null && nodes[active]?.note
      ? nodes[active].note
      : (caption ?? hint);

  return (
    <div className="w-full min-w-0">
      <div
        ref={wrapRef}
        className={`px-2 py-4 sm:px-4 sm:py-5 ${vertical ? "" : "overflow-x-auto"}`}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${vw} ${vh}`}
          className="block h-auto w-full"
          style={vertical ? undefined : { minWidth: Math.min(vw, H_MIN_WIDTH) }}
          role="img"
          aria-label={`Architecture: ${nodes.map((n) => n.label).join(", then ")}`}
        >
          {/* Edges */}
          {segments.map((s, i) => (
            <g key={`e${i}`}>
              <line
                x1={s.x1}
                y1={s.y1}
                x2={s.x2}
                y2={s.y2}
                stroke="var(--border-strong)"
                strokeWidth="1.5"
              />
              <path
                d={
                  vertical
                    ? `M${s.x2 - 4} ${s.y2 - 7} L${s.x2} ${s.y2} L${s.x2 + 4} ${s.y2 - 7} Z`
                    : `M${s.x2 - 7} ${s.y2 - 4} L${s.x2} ${s.y2} L${s.x2 - 7} ${s.y2 + 4} Z`
                }
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
                cx={p.x1 + (p.x2 - p.x1) * p.t0}
                cy={p.y1 + (p.y2 - p.y1) * p.t0}
                fill="var(--signal-lit)"
              />
            ))}

          {/* Nodes */}
          {nodes.map((n, i) => {
            const on = active === i;
            const b = boxes[i];
            const iconX = vertical
              ? b.x + V_ICON_X - 10
              : b.x + b.w / 2 - 10;
            const iconY = vertical ? b.y + b.h / 2 - 10 : b.y + 15;

            return (
              <g
                key={n.label}
                tabIndex={0}
                role="button"
                aria-label={n.note ? `${n.label}. ${n.note}` : n.label}
                aria-pressed={on}
                className="cursor-pointer outline-none"
                onMouseEnter={() => !coarse && setActive(i)}
                onMouseLeave={() => !coarse && setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                onClick={() => toggle(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(i);
                  }
                }}
              >
                <rect
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={b.h}
                  rx="6"
                  fill={on ? "var(--signal-haze)" : "var(--secondary)"}
                  stroke={on ? "var(--primary)" : "var(--border-strong)"}
                  strokeWidth="1.25"
                  style={{ transition: "fill .2s, stroke .2s" }}
                />
                <svg
                  x={iconX}
                  y={iconY}
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
                  x={vertical ? b.x + V_LABEL_X : b.x + b.w / 2}
                  y={vertical ? b.y + b.h / 2 : b.y + 60}
                  textAnchor={vertical ? "start" : "middle"}
                  dominantBaseline={vertical ? "central" : undefined}
                  fill="var(--foreground)"
                  style={{ font: "500 12.5px var(--font-plex-sans), sans-serif" }}
                >
                  {n.label}
                </text>
                {vertical && (
                  <text
                    x={b.x + b.w - 12}
                    y={b.y + b.h / 2}
                    textAnchor="end"
                    dominantBaseline="central"
                    fill="var(--faint-foreground)"
                    style={{
                      font: "500 10px var(--font-plex-mono), monospace",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {(hasNotes || caption) && (
        <div className="flex min-h-14 items-start gap-3 border-t border-border px-3 py-3 sm:px-4">
          <span className="label-micro shrink-0 pt-1 text-primary">Readout</span>
          <p className="m-0 max-w-[62ch] text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
            {readout}
          </p>
        </div>
      )}
    </div>
  );
}
