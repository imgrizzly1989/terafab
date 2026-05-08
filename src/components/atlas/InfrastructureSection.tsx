"use client";

import { motion } from "framer-motion";
import { infrastructure } from "@/lib/atlas-data";

export function InfrastructureSection() {
  return (
    <div className="relative min-h-[620px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#05070a] p-5 sm:p-8">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="absolute left-1/2 top-1/2 h-44 w-72 -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-white/35 bg-white/[0.035] shadow-[0_0_80px_rgba(77,163,255,.16)] sm:h-56 sm:w-[28rem]" />
      <div className="absolute left-1/2 top-1/2 h-24 w-44 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-cyan-200/50 bg-cyan-200/[0.035]" />
      {infrastructure.map((item, index) => {
        const angle = (index / infrastructure.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 42;
        const x = 50 + Math.cos(angle) * radius;
        const y = 50 + Math.sin(angle) * 35;
        return (
          <motion.div
            key={item}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04, duration: 0.5 }}
            className="absolute max-w-[160px] rounded-full border border-white/10 bg-black/55 px-3 py-2 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-slate-200 backdrop-blur hover:border-cyan-200/50 hover:text-cyan-100"
            style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
          >
            {item}
          </motion.div>
        );
      })}
      <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-amber-200/20 bg-amber-200/[0.04] p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-amber-100/80">Infrastructure dependency map</p>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">The factory is only the visible node. Utility interconnects, water, cooling, transformers, logistics and permitting corridors become part of the operating machine.</p>
      </div>
    </div>
  );
}
