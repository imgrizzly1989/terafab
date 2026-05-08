import { archive } from "@/lib/atlas-data";

export function FooterArchive() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black px-5 py-20 sm:px-8 lg:px-16">
      <div className="absolute inset-0 grid-overlay opacity-10" />
      <div className="relative mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.45fr_0.55fr]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-cyan-100/70">Footer research archive</p>
          <h2 className="mt-5 text-5xl font-semibold leading-[0.92] tracking-[-0.075em] text-white sm:text-7xl">Evidence before spectacle.</h2>
          <p className="mt-7 max-w-xl text-base leading-7 text-slate-400">The current local claim registry is ready to evolve into sourced metrics, claim IDs, scenario JSON, methodology pages and geospatial intelligence layers.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {archive.map((item, index) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">SRC-{String(index + 1).padStart(3, "0")}</p>
              <p className="mt-3 text-sm leading-6 text-slate-200">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
