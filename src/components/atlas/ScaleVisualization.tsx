"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { landmarks } from "@/lib/atlas-data";
import { ConfidenceTag } from "./ConfidenceTag";

export function ScaleVisualization() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.65, 1.25]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -60]);

  return (
    <div ref={ref} className="space-y-10">
      <motion.div style={{ scale, y }} className="relative min-h-[540px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#06080c] p-5 shadow-2xl shadow-cyan-950/20 sm:p-8">
        <div className="absolute inset-0 grid-overlay opacity-35" />
        <div className="absolute left-1/2 top-1/2 h-[78%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-[32px] border border-cyan-200/60 bg-cyan-200/[0.025] shadow-[0_0_90px_rgba(66,232,255,0.12)]" />
        <div className="absolute left-[18%] top-[22%] h-[26%] w-[30%] rounded-xl border border-white/25 bg-white/[0.03]" />
        <div className="absolute bottom-[17%] right-[14%] h-[18%] w-[34%] rounded-xl border border-amber-200/35 bg-amber-200/[0.035]" />
        <div className="absolute left-8 top-8 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-100/80">Modeled footprint / base scenario</div>
        <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between gap-6">
          <div>
            <div className="text-6xl font-semibold tracking-[-0.08em] text-white sm:text-8xl">12 km²</div>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">Scenario envelope: an industrial city-scale planning model, not a confirmed TeraFab site plan.</p>
          </div>
          <div className="hidden h-24 w-40 border-b border-l border-white/40 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-300 sm:flex sm:items-end sm:justify-end sm:p-2">2 km ruler</div>
        </div>
      </motion.div>

      <div className="grid gap-3 md:grid-cols-2">
        {landmarks.map((landmark, index) => {
          const width = Math.max(8, Math.sqrt(landmark.areaKm2 / 32) * 100);
          return (
            <motion.div
              key={landmark.name}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.04 }}
              className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium text-white">{landmark.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{landmark.label}</p>
                </div>
                <ConfidenceTag value={landmark.confidence} />
              </div>
              <div className="mt-6 h-2 rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-cyan-200 to-blue-400" style={{ width: `${width}%` }} />
              </div>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-slate-300">{landmark.areaKm2} km² reference</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
