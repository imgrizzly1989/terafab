"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { heroMetrics } from "@/lib/atlas-data";
import { HeroEarth } from "./HeroEarth";
import { MetricCard } from "./MetricCard";

const evidenceRail = [
  ["Source families", "6", "benchmarks + reporting"],
  ["Confidence states", "4", "confirmed → speculative"],
  ["Last review", "2026-05", "editorial model"],
];

const infrastructureLayers = ["GRID", "WATER", "ROAD", "RAIL", "DATA", "SECURITY"];

export function HeroCinematic() {
  const { scrollYProgress } = useScroll();
  const titleY = useTransform(scrollYProgress, [0, 0.18], [0, -64]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0.32]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.22], [0.14, 0.42]);

  return (
    <section className="relative min-h-[124vh] overflow-hidden bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        <HeroEarth />
        <motion.div style={{ opacity: gridOpacity }} className="absolute inset-0 grid-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_67%_38%,rgba(77,163,255,0.22),transparent_30%),linear-gradient(90deg,rgba(0,0,0,0.92),rgba(0,0,0,0.38)_48%,rgba(0,0,0,0.9))]" />

        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="relative z-10 flex h-full flex-col px-5 pb-6 pt-5 sm:px-8 lg:px-16 lg:pb-12">
          <nav className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[10px] uppercase tracking-[0.26em] text-slate-300">
            <span>TeraFab Atlas</span>
            <span className="hidden text-cyan-100/70 sm:inline">Interactive industrial intelligence</span>
            <span>Texas target lock</span>
          </nav>

          <div className="grid flex-1 items-center gap-8 pt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.72fr)] lg:gap-12">
            <div className="max-w-5xl">
              <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="font-mono text-[11px] uppercase tracking-[0.34em] text-cyan-100/80">
                Scenario model / evidence tagged / infrastructure first
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.05, delay: 0.08, ease: [0.16, 1, 0.3, 1] }} className="mt-5 text-[18vw] font-semibold uppercase leading-[0.82] tracking-[-0.09em] text-white sm:text-[13vw] lg:text-[7.7vw]">
                TeraFab<br />Atlas
              </motion.h1>
              <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.35 }} className="mt-6 max-w-4xl text-3xl font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
                A factory proposal at city scale.
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.55 }} className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
                A confidence-tagged atlas of land, grid load, compute, water, logistics and permitting constraints behind a TeraFab-class industrial district.
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }} className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                Scenario model — not a site claim. Built to separate public facts, reported claims, estimates and speculative envelopes.
              </motion.p>

              <div className="mt-7 grid max-w-3xl gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
                {evidenceRail.map(([label, value, detail]) => (
                  <div key={label} className="bg-black/70 p-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-slate-500">{label}</p>
                    <p className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-white">{value}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <TexasIntelligencePanel />
          </div>

        </motion.div>
      </div>
      <div className="relative z-20 mx-auto -mt-[4vh] grid max-w-6xl gap-3 px-5 pb-16 sm:grid-cols-3 sm:px-8 lg:px-16">
        {heroMetrics.map((metric, index) => <MetricCard key={metric.label} metric={metric} index={index} />)}
      </div>
    </section>
  );
}

function TexasIntelligencePanel() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.95, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="hidden lg:block"
      aria-label="Texas industrial district intelligence preview"
    >
      <div className="relative overflow-hidden border border-cyan-100/18 bg-black/45 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur-md">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_44%,rgba(77,163,255,.18),transparent_18rem)]" />
        <div className="relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-slate-400">
            <span>Site intelligence preview</span>
            <span className="text-amber-100/80">scenario</span>
          </div>

          <div className="relative mt-5 aspect-[1.12] overflow-hidden bg-[#020609]">
            <div className="absolute inset-0 opacity-60 grid-overlay" />
            <div className="absolute left-[18%] top-[14%] h-[70%] w-[58%] rotate-[-10deg] border border-cyan-100/18 bg-cyan-100/[0.025]" />
            <div className="absolute left-[34%] top-[31%] h-[28%] w-[34%] rotate-[-10deg] border-2 border-cyan-100/70 bg-cyan-100/[0.055] shadow-[0_0_40px_rgba(103,232,249,0.18)]" />
            <div className="absolute left-[39%] top-[36%] h-[18%] w-[24%] rotate-[-10deg] border border-amber-100/70" />
            <div className="absolute left-0 top-[52%] h-px w-full bg-amber-100/35" />
            <div className="absolute left-[64%] top-0 h-full w-px bg-cyan-100/28" />
            <div className="absolute bottom-[18%] left-[8%] h-px w-[84%] rotate-[-18deg] bg-white/18" />
            <div className="absolute right-[15%] top-[18%] h-16 w-16 rounded-full border border-amber-100/50" />
            <div className="absolute right-[calc(15%+1.85rem)] top-[18%] h-16 w-px bg-amber-100/45" />
            <div className="absolute right-[15%] top-[calc(18%+1.85rem)] h-px w-16 bg-amber-100/45" />

            <MapLabel className="left-[8%] top-[9%]" label="TX grid corridor" />
            <MapLabel className="left-[39%] top-[61%]" label="12 km² base envelope" tone="cyan" />
            <MapLabel className="right-[8%] top-[39%]" label="utility gate" tone="amber" />
            <MapLabel className="bottom-[8%] left-[10%]" label="logistics spine" />

            <div className="absolute bottom-4 right-4 border border-white/15 bg-black/70 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-300">
              30.22°N / 97.62°W · 5 km scale
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden border border-white/10 bg-white/10">
            {infrastructureLayers.map((layer) => (
              <div key={layer} className="bg-black/72 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">
                {layer}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

function MapLabel({ label, tone = "slate", className }: { label: string; tone?: "slate" | "cyan" | "amber"; className: string }) {
  const colors = {
    slate: "border-white/15 text-slate-300",
    cyan: "border-cyan-100/30 text-cyan-100",
    amber: "border-amber-100/30 text-amber-100",
  };

  return <div className={`absolute border bg-black/70 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.18em] ${colors[tone]} ${className}`}>{label}</div>;
}
