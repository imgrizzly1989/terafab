"use client";

import { motion } from "framer-motion";
import { ecosystemImpacts } from "@/lib/atlas-data";

export function EcosystemSection() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {ecosystemImpacts.map((impact, index) => (
        <motion.article
          key={impact.title}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.06 }}
          className="group min-h-64 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.055] to-white/[0.02] p-6 transition hover:-translate-y-1 hover:border-blue-200/40 sm:p-8"
        >
          <div className="mb-10 h-px w-full bg-gradient-to-r from-cyan-200/60 via-white/10 to-transparent" />
          <h3 className="text-3xl font-semibold tracking-[-0.06em] text-white">{impact.title}</h3>
          <p className="mt-5 text-sm leading-7 text-slate-400">{impact.body}</p>
        </motion.article>
      ))}
    </div>
  );
}
