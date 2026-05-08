"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { computeScenarios } from "@/lib/atlas-data";
import { FactTrigger } from "@/components/facts/FactConfidenceProvider";
import { ConfidenceTag } from "./ConfidenceTag";

export function ComputeSection() {
  const [active, setActive] = useState(1);
  const scenario = computeScenarios[active];
  const rackBlocks = useMemo(() => Array.from({ length: Math.min(72, Math.round(scenario.racks / 150)) }), [scenario.racks]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {computeScenarios.map((item, index) => (
          <button
            key={item.name}
            onClick={() => setActive(index)}
            aria-pressed={active === index}
            className={`min-h-12 rounded-full border px-4 py-3 font-mono text-[11px] uppercase leading-none tracking-[0.2em] transition ${active === index ? "border-cyan-200 bg-cyan-200/10 text-cyan-100 shadow-[0_0_32px_rgba(66,232,255,.14)]" : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/30 hover:text-white"}`}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[0.58fr_0.42fr]">
        <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#05070a] p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(66,232,255,.18),transparent_34%)]" />
          <div className="relative grid grid-cols-8 gap-2 sm:grid-cols-12">
            {rackBlocks.map((_, index) => (
              <motion.div
                key={`${scenario.name}-${index}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.006 }}
                className="h-20 rounded-sm border border-cyan-100/20 bg-gradient-to-b from-cyan-100/18 to-blue-500/5 shadow-[0_0_22px_rgba(66,232,255,.08)]"
              />
            ))}
          </div>
          <div className="absolute bottom-6 left-6 right-6 grid gap-3 sm:grid-cols-3">
            <Stat label="GPUs" value={scenario.gpuCount.toLocaleString()} claimId={scenario.claimId} />
            <Stat label="Power" value={`${scenario.powerMw} MW`} claimId={scenario.claimId} />
            <Stat label="Racks" value={scenario.racks.toLocaleString()} claimId={scenario.claimId} />
          </div>
        </div>
        <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-100/70">Interactive compute model</p>
          <h3 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white">{scenario.name}</h3>
          <p className="mt-5 text-base leading-7 text-slate-300">{scenario.description}</p>
          <dl className="mt-8 space-y-5">
            <Row label="Cooling architecture" value={scenario.cooling} />
            <Row label="Modeled power" value={`${scenario.powerMw} MW`} />
            <div className="border-t border-white/10 pt-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">Data confidence</dt>
              <dd className="mt-2 flex items-center gap-3 text-sm text-slate-200"><ConfidenceTag value={scenario.claimId ? "speculative" : "estimated"} /> <span>Click compute metrics for source packet</span></dd>
            </div>
          </dl>
        </article>
      </div>
    </div>
  );
}

function Stat({ label, value, claimId }: { label: string; value: string; claimId?: string }) {
  return <FactTrigger claimId={claimId} className="block w-full"><div className="rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur transition hover:border-cyan-200/40 hover:bg-white/[0.06]"><p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">{label}</p><p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-white">{value}</p>{claimId ? <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-100/45">source →</p> : null}</div></FactTrigger>;
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="border-t border-white/10 pt-4"><dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">{label}</dt><dd className="mt-1 text-sm text-slate-200">{value}</dd></div>;
}
