"use client";

import { motion } from "framer-motion";
import type { ScalePreset, UnitSystem } from "@/lib/scale-comparisons";
import { formatArea, terafabBase } from "@/lib/scale-comparisons";
import { ConfidenceTag } from "@/components/atlas/ConfidenceTag";

type Metric = { label: string; value: string; detail: string };

export function InfoCards({ preset, ratio, unit, metrics }: { preset: ScalePreset; ratio: number; unit: UnitSystem; metrics: Metric[] }) {
  const ratioText = ratio >= 1 ? `${ratio.toLocaleString(undefined, { maximumFractionDigits: 1 })}× larger` : `${(1 / ratio).toLocaleString(undefined, { maximumFractionDigits: 1 })}× smaller`;

  return (
    <aside className="space-y-4">
      <motion.article
        key={preset.id}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/30"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">Active comparison</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-white">{preset.name}</h3>
          </div>
          <ConfidenceTag value={preset.confidence} />
        </div>
        <p className="mt-5 text-sm leading-7 text-slate-300">{preset.description}</p>
        <div className="mt-7 rounded-2xl border border-cyan-200/20 bg-cyan-200/[0.045] p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-100/70">Relative footprint</p>
          <p className="mt-2 text-4xl font-semibold tracking-[-0.07em] text-white">{ratioText}</p>
          <p className="mt-2 text-sm text-slate-400">
            {terafabBase.name}: {formatArea(terafabBase.areaKm2, unit)} vs {preset.name}: {formatArea(preset.areaKm2, unit)}
          </p>
        </div>
        <p className="mt-5 text-xs leading-5 text-slate-500">{preset.reference}</p>
      </motion.article>

      <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-1">
        {metrics.map((metric, index) => (
          <motion.div
            key={`${preset.id}-${metric.label}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.035, duration: 0.35 }}
            className="rounded-2xl border border-white/10 bg-black/35 p-4"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-500">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-[-0.06em] text-white">{metric.value}</p>
            <p className="mt-1 text-xs text-slate-500">{metric.detail}</p>
          </motion.div>
        ))}
      </div>
    </aside>
  );
}
