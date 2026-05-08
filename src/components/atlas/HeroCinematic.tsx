"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { heroMetrics } from "@/lib/atlas-data";
import { HeroEarth } from "./HeroEarth";
import { MetricCard } from "./MetricCard";

export function HeroCinematic() {
  const { scrollYProgress } = useScroll();
  const titleY = useTransform(scrollYProgress, [0, 0.18], [0, -90]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0.25]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.22], [0.12, 0.42]);

  return (
    <section className="relative min-h-[180vh] overflow-hidden bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        <HeroEarth />
        <motion.div style={{ opacity: gridOpacity }} className="absolute inset-0 grid-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,rgba(77,163,255,0.22),transparent_33%),linear-gradient(90deg,rgba(0,0,0,0.88),rgba(0,0,0,0.24)_48%,rgba(0,0,0,0.9))]" />

        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="relative z-10 flex h-full flex-col justify-end px-5 pb-10 sm:px-8 lg:px-16 lg:pb-16">
          <nav className="absolute left-5 right-5 top-5 flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[10px] uppercase tracking-[0.26em] text-slate-300 sm:left-8 sm:right-8 lg:left-16 lg:right-16">
            <span>TeraFab Atlas</span>
            <span className="hidden text-cyan-100/70 sm:inline">Interactive industrial intelligence</span>
            <span>Texas target lock</span>
          </nav>
          <div className="max-w-6xl">
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="font-mono text-[11px] uppercase tracking-[0.34em] text-cyan-100/80">
              Earth orbit → continental grid → industrial city
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.05, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="mt-6 text-[13.5vw] font-semibold uppercase leading-[0.86] tracking-[-0.085em] text-white sm:text-[12vw] lg:text-[8.9vw]">
              TeraFab<br />Atlas
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.55 }} className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              A data-backed industrial atlas explaining the scale, power, compute and infrastructure consequences of a proposed TeraFab-class project.
            </motion.p>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:max-w-5xl">
            {heroMetrics.map((metric, index) => <MetricCard key={metric.label} metric={metric} index={index} />)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
