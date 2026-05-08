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
    <section id="mega-city" className="relative isolate overflow-hidden bg-black py-10 sm:py-16" aria-label="Industrial district massing preview">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[620px] overflow-hidden border border-white/10 bg-[#020306] shadow-2xl shadow-cyan-950/20 sm:min-h-[700px]">
          <div className="absolute inset-0 grid-overlay opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(66,232,255,.12),transparent_28rem),linear-gradient(180deg,rgba(0,0,0,.45),rgba(0,0,0,.92))]" />
          <div className="absolute inset-x-8 bottom-10 top-48 border border-cyan-100/10 bg-cyan-100/[0.018]">
            <div className="absolute left-[8%] top-[15%] h-[48%] w-[38%] border border-cyan-100/25 bg-cyan-100/[0.04]" />
            <div className="absolute right-[12%] top-[12%] h-[30%] w-[26%] border border-amber-100/30 bg-amber-100/[0.035]" />
            <div className="absolute bottom-[18%] left-[18%] h-px w-[64%] bg-white/25" />
            <div className="absolute bottom-[28%] left-[10%] h-px w-[80%] bg-cyan-100/25" />
            <div className="absolute left-[55%] top-0 h-full w-px bg-amber-100/20" />
          </div>
          <div className="absolute left-5 top-5 max-w-xl border border-white/10 bg-black/55 p-6 backdrop-blur-md sm:left-8 sm:top-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-100/70">Industrial massing model</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.9] tracking-[-0.075em] text-white sm:text-6xl">Industrial mega-city view.</h2>
            <p className="mt-5 text-sm leading-7 text-slate-300">A district-scale plan view: clean-room blocks, compute halls, utility spine, logistics yards and controlled perimeter before the full WebGL model enters view.</p>
          </div>
          <div className="absolute bottom-8 left-8 grid max-w-3xl grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400 sm:grid-cols-4">
            {['Clean rooms', 'Compute halls', 'Utility spine', 'Logistics yards'].map((item) => <div key={item} className="bg-black/72 px-3 py-2">{item}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScaleEngineSkeleton() {
  return (
    <div className="space-y-6" aria-label="Scale comparison preview">
      <div className="border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/40 backdrop-blur">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-100/70">Interactive scale comparison engine</p>
        <h3 className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">Scale comparison active.</h3>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">Compare the base footprint envelope against cities, airports, factory campuses, football fields and Manhattan blocks.</p>
      </div>
      <div className="relative min-h-[520px] overflow-hidden border border-white/10 bg-[#05070a]">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(77,163,255,.18),transparent_28rem)]" />
        <div className="absolute left-[10%] top-[18%] h-[54%] w-[34%] border border-cyan-100/35 bg-cyan-100/[0.035]" />
        <div className="absolute right-[14%] top-[30%] h-[24%] w-[18%] border border-amber-100/40 bg-amber-100/[0.035]" />
        <div className="absolute bottom-8 left-8 border border-white/15 bg-black/70 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-300">12 km² base model · overlay scale locked</div>
      </div>
    </div>
  );
}
