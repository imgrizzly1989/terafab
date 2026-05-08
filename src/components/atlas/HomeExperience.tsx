import { HeroCinematic } from "./HeroCinematic";
import { SectionShell } from "./SectionShell";
import { FactConfidenceProvider } from "@/components/facts/FactConfidenceProvider";
import { LazyMegaCity, LazyScaleComparisonEngine } from "./LazyHeavySections";
import { WorldLandmarks } from "./WorldLandmarks";
import { ComputeSection } from "./ComputeSection";
import { TimelineSection } from "./TimelineSection";
import { InfrastructureSection } from "./InfrastructureSection";
import { EcosystemSection } from "./EcosystemSection";
import { FooterArchive } from "./FooterArchive";

export function HomeExperience() {
  return (
    <FactConfidenceProvider>
    <main className="min-h-screen bg-black text-white selection:bg-cyan-200 selection:text-black">
      <HeroCinematic />

      <LazyMegaCity />

      <SectionShell id="scale" eyebrow="01 / Massive scale visualization" title="Stop thinking in buildings. Start thinking in districts.">
        <LazyScaleComparisonEngine />
      </SectionShell>

      <SectionShell id="landmarks" eyebrow="02 / TeraFab vs world landmarks" title="A footprint that needs a map, not a floorplan." className="bg-[#030405]">
        <WorldLandmarks />
      </SectionShell>

      <SectionShell id="compute" eyebrow="03 / Interactive compute section" title="The factory starts to look like a data center with walls around it.">
        <ComputeSection />
      </SectionShell>

      <SectionShell id="timeline" eyebrow="04 / Construction timeline" title="Megaprojects are built in waves, then bottlenecked in systems.">
        <TimelineSection />
      </SectionShell>

      <SectionShell id="infrastructure" eyebrow="05 / Infrastructure requirements" title="The invisible factory is grid, water, cooling, roads and permits.">
        <InfrastructureSection />
      </SectionShell>

      <SectionShell id="ecosystem" eyebrow="06 / AI ecosystem impact" title="Manufacturing capacity and compute capacity converge into one strategic asset.">
        <EcosystemSection />
      </SectionShell>

      <FooterArchive />
    </main>
    </FactConfidenceProvider>
  );
}
