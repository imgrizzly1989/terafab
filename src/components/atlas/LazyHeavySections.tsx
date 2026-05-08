"use client";

import dynamic from "next/dynamic";
import { DeferredSection } from "./DeferredSection";

const TeraFabMegaCity = dynamic(() => import("./TeraFabMegaCity").then((mod) => mod.TeraFabMegaCity), {
  ssr: false,
  loading: () => <MegaCitySkeleton />,
});

const ScaleComparisonEngine = dynamic(() => import("@/components/scale-engine/ScaleComparisonEngine").then((mod) => mod.ScaleComparisonEngine), {
  ssr: false,
  loading: () => <ScaleEngineSkeleton />,
});

export function LazyMegaCity() {
  return (
    <DeferredSection fallback={<MegaCitySkeleton />} rootMargin="420px 0px">
      <TeraFabMegaCity />
    </DeferredSection>
  );
}

export function LazyScaleComparisonEngine() {
  return (
    <DeferredSection fallback={<ScaleEngineSkeleton />} rootMargin="520px 0px">
      <ScaleComparisonEngine />
    </DeferredSection>
  );
}

function MegaCitySkeleton() {
  return (
    <section id="mega-city" className="relative isolate overflow-hidden bg-black py-10 sm:py-16" aria-label="Industrial mega-city visualization preparing">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[680px] overflow-hidden rounded-[2.4rem] border border-white/10 bg-[#020306] shadow-2xl shadow-cyan-950/20 sm:min-h-[760px]">
          <div className="absolute inset-0 grid-overlay opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(66,232,255,.12),transparent_28rem),linear-gradient(180deg,rgba(0,0,0,.5),rgba(0,0,0,.92))]" />
          <div className="absolute left-5 top-5 max-w-xl rounded-[2rem] border border-white/10 bg-black/45 p-6 backdrop-blur-md sm:left-8 sm:top-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-100/70">Industrial simulation layer</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.9] tracking-[-0.075em] text-white sm:text-6xl">Industrial mega-city view.</h2>
            <p className="mt-5 text-sm leading-7 text-slate-300">A lightweight preview protects first-load performance while the full WebGL district model prepares near the viewport.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScaleEngineSkeleton() {
  return (
    <div className="space-y-6" aria-label="Scale comparison engine preparing">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/40 backdrop-blur">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-100/70">Interactive scale comparison engine</p>
        <h3 className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">Preparing geospatial scale engine.</h3>
      </div>
      <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#05070a]">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(77,163,255,.18),transparent_28rem)]" />
      </div>
    </div>
  );
}
