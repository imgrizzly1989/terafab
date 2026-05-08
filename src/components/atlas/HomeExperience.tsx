const platformModules = [
  {
    title: "Site intelligence",
    body: "Score land, utilities, logistics and permitting constraints before a factory-scale decision becomes political or irreversible.",
  },
  {
    title: "Infrastructure topology",
    body: "Map dependencies between grid capacity, cooling, water, roads, rail, clean-room systems, compute and supplier corridors.",
  },
  {
    title: "Evidence governance",
    body: "Separate confirmed facts, reported claims, estimates and scenarios so leadership can see what is known, modeled and still uncertain.",
  },
];

const workflows = [
  ["01", "Frame", "Define the industrial system: site, power, water, compute, robotics, logistics and permitting boundary."],
  ["02", "Model", "Build comparable scenarios from public benchmarks, infrastructure constraints and internal assumptions."],
  ["03", "Decide", "Expose the bottlenecks, risks and capital implications before teams commit to a location or build sequence."],
];

const trustSignals = ["Confidence-labeled claims", "Source and methodology packets", "Scenario assumptions separated from facts", "Executive-readable infrastructure maps"];

const metrics = [
  ["12", "critical infrastructure layers"],
  ["4", "claim confidence states"],
  ["84 mo", "modeled buildout envelope"],
];

const customerTypes = ["Industrial strategy teams", "Advanced manufacturing leaders", "Infrastructure investors", "Robotics and AI operators"];

export function HomeExperience() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#141414] selection:bg-[#141414] selection:text-white">
      <SiteHeader />
      <Hero />
      <TrustBar />
      <ProductDemo />
      <UseCases />
      <Workflow />
      <EvidenceSection />
      <FinalCTA />
      <CompanyFooter />
    </main>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f4f1ea]/88 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="TeraFab Atlas home">
          <span className="flex h-8 w-8 items-center justify-center border border-black/15 bg-[#141414] text-xs font-semibold text-white">TA</span>
          <span className="text-sm font-semibold tracking-[-0.02em]">TeraFab Atlas</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-neutral-600 md:flex" aria-label="Primary navigation">
          <a className="transition hover:text-neutral-950" href="#platform">Platform</a>
          <a className="transition hover:text-neutral-950" href="#workflow">Workflow</a>
          <a className="transition hover:text-neutral-950" href="#evidence">Evidence</a>
          <a className="transition hover:text-neutral-950" href="#contact">Contact</a>
        </nav>
        <a href="#contact" className="inline-flex h-10 items-center justify-center bg-[#141414] px-4 text-sm font-medium text-white transition hover:bg-black">
          Request briefing
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-black/10">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,20,20,0.045)_1px,transparent_1px),linear-gradient(rgba(20,20,20,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 border border-black/10 bg-white/60 px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1b6b62]" />
            Scenario modeling + evidence governance for factory-scale decisions
          </div>
          <h1 className="mt-8 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-[#111] sm:text-7xl lg:text-8xl">
            Plan industrial systems before they become megaprojects.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-650 sm:text-xl">
            TeraFab Atlas is a planning platform for modeling site, utility, compute, logistics and permitting dependencies before capital is committed to TeraFab-scale facilities.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#platform" className="inline-flex h-12 items-center justify-center bg-[#141414] px-5 text-sm font-medium text-white transition hover:bg-black">
              See the platform
            </a>
            <a href="#evidence" className="inline-flex h-12 items-center justify-center border border-black/15 bg-white/55 px-5 text-sm font-medium text-[#141414] transition hover:bg-white">
              View evidence model
            </a>
          </div>
          <div className="mt-10 grid max-w-2xl gap-px overflow-hidden border border-black/10 bg-black/10 sm:grid-cols-3">
            {metrics.map(([value, label]) => (
              <div key={label} className="bg-[#f8f6f1] p-4">
                <p className="text-2xl font-semibold tracking-[-0.04em] text-[#141414]">{value}</p>
                <p className="mt-1 text-sm leading-5 text-neutral-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <HeroProductPanel />
        <p className="-mt-8 max-w-xl text-sm leading-6 text-neutral-500 lg:col-start-2 lg:justify-self-end">
          Product preview: define a site boundary, layer infrastructure constraints and review confidence-labeled scenario outputs in one operating model.
        </p>
      </div>
    </section>
  );
}

function HeroProductPanel() {
  return (
    <div className="self-center border border-black/10 bg-[#171717] p-3 shadow-2xl shadow-black/15">
      <div className="border border-white/10 bg-[#0f1011] text-white">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">Atlas workspace</p>
            <p className="mt-1 text-sm text-neutral-300">TeraFab-class scenario / Austin corridor</p>
          </div>
          <span className="border border-emerald-300/20 bg-emerald-300/10 px-2 py-1 text-xs text-emerald-200">Operational model</span>
        </div>

        <div className="grid min-h-[480px] lg:grid-cols-[0.72fr_1fr]">
          <aside className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">Decision layers</p>
            <div className="mt-4 space-y-2">
              {[
                ["Grid interconnect", "High constraint"],
                ["Water + cooling", "Modeled"],
                ["Road / rail access", "Reported"],
                ["Clean-room fitout", "Estimated"],
                ["Compute density", "Scenario"],
              ].map(([name, state]) => (
                <div key={name} className="flex items-center justify-between border border-white/8 bg-white/[0.035] px-3 py-2 text-sm">
                  <span className="text-neutral-300">{name}</span>
                  <span className="text-xs text-neutral-500">{state}</span>
                </div>
              ))}
            </div>
          </aside>

          <div className="relative p-5">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:38px_38px]" />
            <div className="relative h-full min-h-[390px] border border-white/10 bg-black/20">
              <div className="absolute left-[14%] top-[17%] h-[52%] w-[62%] border border-[#7aa7a1]/60 bg-[#7aa7a1]/10" />
              <div className="absolute left-[28%] top-[32%] h-[24%] w-[28%] border border-white/55 bg-white/8" />
              <div className="absolute left-[58%] top-[22%] h-[38%] w-px bg-[#d7a35b]/80" />
              <div className="absolute left-[8%] top-[64%] h-px w-[84%] bg-white/20" />
              <div className="absolute right-[10%] top-[18%] border border-[#d7a35b]/50 px-2 py-1 text-xs text-[#e7c083]">Utility gate</div>
              <div className="absolute bottom-[18%] left-[12%] border border-white/15 px-2 py-1 text-xs text-neutral-400">Logistics spine</div>
              <div className="absolute left-[29%] top-[58%] border border-[#7aa7a1]/50 px-2 py-1 text-xs text-[#a7d4ce]">12 km² envelope</div>
              <div className="absolute bottom-4 right-4 bg-[#0f1011] px-3 py-2 text-xs text-neutral-400">confidence: scenario</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustBar() {
  return (
    <section className="border-b border-black/10 bg-[#fbfaf7]">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[0.28fr_1fr] lg:items-center">
        <p className="text-sm font-medium text-neutral-500">Built for teams evaluating high-stakes industrial infrastructure.</p>
        <div className="grid gap-3 sm:grid-cols-4">
          {customerTypes.map((type) => (
            <div key={type} className="border border-black/10 bg-white px-4 py-3 text-sm font-medium text-neutral-700 shadow-sm">{type}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductDemo() {
  return (
    <section id="platform" className="border-b border-black/10 bg-[#f4f1ea] px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1b6b62]">Platform</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">A shared operating picture for industrial scale.</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-600">Replace slide decks and scattered assumptions with a clear model of what the project actually depends on.</p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {platformModules.map((module, index) => (
            <article key={module.title} className="border border-black/10 bg-[#fbfaf7] p-6 shadow-sm">
              <div className="mb-8 inline-flex h-8 items-center justify-center border border-black/10 bg-white px-3 text-xs font-semibold text-neutral-500">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-2xl font-semibold tracking-[-0.03em]">{module.title}</h3>
              <p className="mt-4 text-base leading-7 text-neutral-600">{module.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section className="border-b border-black/10 bg-[#141414] px-5 py-20 text-white sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">Why it matters</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">The bottleneck is no longer the building.</h2>
        </div>
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10">
          {[
            ["Energy", "Gigawatt-scale scenarios expose interconnection, transformer and dispatchable-power constraints early."],
            ["Compute", "AI training and robotics workloads turn manufacturing campuses into operational data-center systems."],
            ["Permitting", "Land, water, road, rail and community impact become part of the same decision model."],
            ["Capital", "Scenario confidence helps boards understand where assumptions create financial exposure."],
          ].map(([title, body]) => (
            <article key={title} className="bg-[#171717] p-6">
              <h3 className="text-xl font-semibold tracking-[-0.02em]">{title}</h3>
              <p className="mt-3 text-base leading-7 text-neutral-400">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Workflow() {
  return (
    <section id="workflow" className="border-b border-black/10 bg-[#fbfaf7] px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.4fr_0.6fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1b6b62]">Workflow</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">From ambition to operational clarity.</h2>
          </div>
          <div className="grid gap-3">
            {workflows.map(([step, title, body]) => (
              <article key={step} className="grid gap-5 border border-black/10 bg-white p-6 shadow-sm sm:grid-cols-[72px_1fr]">
                <span className="text-sm font-semibold text-neutral-400">{step}</span>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
                  <p className="mt-2 text-base leading-7 text-neutral-600">{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EvidenceSection() {
  return (
    <section id="evidence" className="border-b border-black/10 bg-[#f4f1ea] px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.45fr_0.55fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1b6b62]">Trust model</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">Every claim carries its confidence level.</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-600">TeraFab Atlas is designed for decisions where speculative assumptions must be visible, not hidden inside a beautiful chart.</p>
        </div>
        <div className="border border-black/10 bg-[#fbfaf7] p-6 shadow-sm">
          <div className="grid gap-px overflow-hidden border border-black/10 bg-black/10">
            {trustSignals.map((signal) => (
              <div key={signal} className="flex items-center justify-between bg-white px-4 py-4">
                <span className="text-sm font-medium text-neutral-800">{signal}</span>
                <span className="text-sm text-neutral-400">included</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            {['confirmed', 'reported', 'estimated', 'speculative'].map((state) => (
              <div key={state} className="border border-black/10 bg-[#f8f6f1] px-3 py-3 text-center text-sm font-medium capitalize text-neutral-700">{state}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="contact" className="bg-[#fbfaf7] px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1b6b62]">TeraFab Atlas</p>
        <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">Make the industrial system legible before the capital is committed.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-600">For teams evaluating TeraFab-scale manufacturing, autonomous systems infrastructure or compute-industrial campuses.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="mailto:research@terafabatlas.com" className="inline-flex h-12 items-center justify-center bg-[#141414] px-5 text-sm font-medium text-white transition hover:bg-black">Request briefing</a>
          <a href="https://github.com/imgrizzly1989/terafab" className="inline-flex h-12 items-center justify-center border border-black/15 bg-white px-5 text-sm font-medium text-[#141414] transition hover:bg-[#f4f1ea]">View repository</a>
        </div>
      </div>
    </section>
  );
}
function CompanyFooter() {
  return (
    <footer className="border-t border-black/10 bg-[#f4f1ea] px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-[#141414]">TeraFab Atlas</p>
          <p className="mt-1">Industrial intelligence for factory-scale infrastructure planning.</p>
        </div>
        <div className="flex flex-wrap gap-5">
          <a className="hover:text-[#141414]" href="mailto:research@terafabatlas.com">research@terafabatlas.com</a>
          <a className="hover:text-[#141414]" href="https://github.com/imgrizzly1989/terafab">GitHub</a>
          <a className="hover:text-[#141414]" href="#evidence">Evidence model</a>
        </div>
      </div>
    </footer>
  );
}

