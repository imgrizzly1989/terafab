import type { FactConfidence } from "@/lib/fact-confidence";

const styles: Record<FactConfidence, string> = {
  confirmed: "border-white/45 text-white bg-white/[0.04]",
  reported: "border-blue-300/50 text-blue-100 bg-blue-300/[0.055]",
  estimated: "border-cyan-300/50 text-cyan-100 bg-cyan-300/[0.055]",
  speculative: "border-amber-300/60 text-amber-100 bg-amber-300/[0.055] border-dashed",
};

export function ConfidenceTag({ value }: { value: FactConfidence }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] ${styles[value]}`}>
      {value}
    </span>
  );
}
