"use client";

import { motion } from "framer-motion";
import type { Metric } from "@/lib/atlas-data";
import { ConfidenceTag } from "./ConfidenceTag";
import { FactTrigger } from "@/components/facts/FactConfidenceProvider";

export function MetricCard({ metric, index = 0 }: { metric: Metric; index?: number }) {
  return (
    <FactTrigger claimId={metric.claimId} className="block h-full w-full">
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-full overflow-hidden border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/30 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-200/40 hover:bg-white/[0.055] sm:p-6"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-400">{metric.label}</p>
        <ConfidenceTag value={metric.confidence} />
      </div>
      <div className="mt-8 flex flex-col gap-1">
        <strong className="text-5xl font-semibold tracking-[-0.08em] text-white sm:text-6xl">{metric.value}</strong>
        {metric.unit ? <span className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-100/70">{metric.unit}</span> : null}
      </div>
      <p className="mt-6 text-sm leading-6 text-slate-300">{metric.note}</p>
      {metric.claimId ? (
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-[0.18em]">
          <span className="text-slate-500">Evidence packet</span>
          <span className="text-cyan-100 transition group-hover:text-white">Open source →</span>
        </div>
      ) : null}
    </motion.article>
    </FactTrigger>
  );
}
