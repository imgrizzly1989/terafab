"use client";

import { motion } from "framer-motion";

const pins = [
  { label: "Texas", x: "24%", y: "48%", tone: "bg-amber-300" },
  { label: "Shanghai", x: "73%", y: "47%", tone: "bg-cyan-200" },
  { label: "Nevada", x: "20%", y: "45%", tone: "bg-blue-300" },
  { label: "Riyadh", x: "56%", y: "53%", tone: "bg-violet-300" },
  { label: "Taiwan", x: "75%", y: "50%", tone: "bg-red-300" },
];

export function WorldLandmarks() {
  return (
    <div className="relative min-h-[650px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#05070a] p-5 sm:p-8">
      <div className="absolute inset-0 opacity-60 [background:radial-gradient(circle_at_50%_50%,rgba(77,163,255,.16),transparent_45%),linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:auto,48px_48px,48px_48px]" />
      <div className="absolute inset-x-[7%] top-[18%] h-[58%] rounded-[50%] border border-cyan-200/20 bg-[radial-gradient(ellipse_at_center,rgba(77,163,255,0.12),transparent_68%)]" />
      <div className="absolute left-[12%] top-[35%] h-[16%] w-[24%] rounded-[48%] border border-white/15" />
      <div className="absolute left-[43%] top-[36%] h-[20%] w-[17%] rounded-[42%] border border-white/15" />
      <div className="absolute right-[14%] top-[32%] h-[27%] w-[28%] rounded-[45%] border border-white/15" />
      {pins.map((pin, index) => (
        <motion.div
          key={pin.label}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.12, duration: 0.6 }}
          className="absolute"
          style={{ left: pin.x, top: pin.y }}
        >
          <span className={`absolute -left-2 -top-2 h-4 w-4 rounded-full ${pin.tone} shadow-[0_0_30px_currentColor]`} />
          <span className="ml-4 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-slate-200">{pin.label}</span>
        </motion.div>
      ))}
      <div className="relative z-10 mt-auto flex h-full min-h-[580px] flex-col justify-end">
        <p className="max-w-xl text-sm leading-6 text-slate-400">Geospatial intelligence layer for comparing industrial footprints, power corridors, logistics access, supplier arcs and site-suitability constraints.</p>
      </div>
    </div>
  );
}
