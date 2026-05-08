"use client";

import { motion } from "framer-motion";
import { timeline } from "@/lib/atlas-data";

export function TimelineSection() {
  return (
    <div className="relative space-y-4 before:absolute before:left-4 before:top-6 before:h-[calc(100%-3rem)] before:w-px before:bg-gradient-to-b before:from-cyan-200 before:via-white/20 before:to-amber-200/70 sm:before:left-6">
      {timeline.map((item, index) => (
        <motion.article
          key={item.phase}
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.62, delay: index * 0.05 }}
          className="relative ml-10 rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:ml-16 sm:p-6"
        >
          <span className="absolute -left-[2.35rem] top-6 h-3 w-3 rounded-full bg-cyan-100 shadow-[0_0_28px_rgba(66,232,255,.55)] sm:-left-[2.85rem]" />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <h3 className="text-2xl font-semibold tracking-[-0.05em] text-white">{item.phase}</h3>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-100/80">{item.duration}</span>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">{item.detail}</p>
        </motion.article>
      ))}
    </div>
  );
}
