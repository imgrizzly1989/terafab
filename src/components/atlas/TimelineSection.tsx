"use client";

import { motion } from "framer-motion";
import { timeline } from "@/lib/atlas-data";

const bottlenecks = ["Grid queue", "Transformers", "Clean-room labor", "Tooling", "Cooling", "Commissioning"];

export function TimelineSection() {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="relative border border-white/10 bg-white/[0.025] p-4 sm:p-6">
        <div className="absolute inset-0 grid-overlay opacity-10" />
        <div className="relative space-y-4 before:absolute before:left-4 before:top-6 before:h-[calc(100%-3rem)] before:w-px before:bg-gradient-to-b before:from-cyan-200 before:via-white/20 before:to-amber-200/70 sm:before:left-6">
          {timeline.map((item, index) => (
            <motion.article
              key={item.phase}
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.62, delay: index * 0.05 }}
              className="relative ml-10 border border-white/10 bg-black/45 p-5 transition hover:border-cyan-100/25 sm:ml-16 sm:p-6"
            >
              <span className="absolute -left-[2.35rem] top-6 h-3 w-3 rounded-full bg-cyan-100 shadow-[0_0_28px_rgba(66,232,255,.55)] sm:-left-[2.85rem]" />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">Phase {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-white">{item.phase}</h3>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-100/80">{item.duration}</span>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">{item.detail}</p>
              <div className="mt-5 h-1 overflow-hidden bg-white/10">
                <div className="h-full bg-gradient-to-r from-cyan-200/80 to-amber-200/70" style={{ width: `${24 + index * 12}%` }} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <aside className="border border-amber-100/15 bg-black/50 p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber-100/80">Critical path watchlist</p>
        <h3 className="mt-4 text-3xl font-semibold leading-none tracking-[-0.06em] text-white">The schedule is governed by systems, not steel.</h3>
        <p className="mt-4 text-sm leading-6 text-slate-400">A TeraFab-scale build becomes credible only when long-lead utilities, high-purity systems, labor pools and commissioning windows line up.</p>
        <div className="mt-6 grid gap-px overflow-hidden border border-white/10 bg-white/10">
          {bottlenecks.map((item, index) => (
            <div key={item} className="flex items-center justify-between bg-black/72 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em]">
              <span className="text-slate-300">{item}</span>
              <span className={index < 2 ? "text-amber-100" : "text-slate-500"}>{index < 2 ? "high" : "watch"}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
