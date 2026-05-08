export type FactConfidence = "confirmed" | "reported" | "estimated" | "speculative";

export type EvidenceSource = {
  title: string;
  outlet: string;
  url?: string;
  date: string;
  sourceType: "official" | "reporting" | "dataset" | "model" | "benchmark";
};

export type FactClaim = {
  id: string;
  label: string;
  value: string;
  unit?: string;
  category: FactConfidence;
  score: number;
  source: EvidenceSource;
  methodology: string;
  lastReviewed: string;
  reviewerNote: string;
};

export const confidenceCopy: Record<FactConfidence, { label: string; definition: string; color: string }> = {
  confirmed: {
    label: "Confirmed",
    definition: "Directly supported by official filings, primary datasets, or on-record project statements.",
    color: "white",
  },
  reported: {
    label: "Reported",
    definition: "Published by a credible outlet or benchmark source, but not independently confirmed by TeraFab Atlas.",
    color: "blue",
  },
  estimated: {
    label: "Estimated",
    definition: "Derived from public benchmarks, geospatial comparison, or engineering calculations.",
    color: "cyan",
  },
  speculative: {
    label: "Speculative",
    definition: "Scenario model or forward-looking assumption. Useful for exploration, not presented as fact.",
    color: "amber",
  },
};

export const factClaims: FactClaim[] = [
  {
    id: "claim-industrial-footprint-range",
    label: "Industrial footprint",
    value: "10–100×",
    unit: "gigafactory-class scenarios",
    category: "speculative",
    score: 42,
    source: {
      title: "TeraFab Atlas prototype scenario model v0.1",
      outlet: "Internal model",
      date: "2026-05-07",
      sourceType: "model",
    },
    methodology: "Placeholder magnitude range comparing a hypothetical TeraFab envelope against gigafactory-class public footprint benchmarks. Must be replaced with a sourced scenario model before publication.",
    lastReviewed: "2026-05-07",
    reviewerNote: "Prototype-only. Keep visually labeled as speculative.",
  },
  {
    id: "claim-power-envelope",
    label: "Power envelope",
    value: "0.5–5",
    unit: "GW modeled",
    category: "speculative",
    score: 38,
    source: {
      title: "Utility-scale load envelope placeholder",
      outlet: "Internal model",
      date: "2026-05-07",
      sourceType: "model",
    },
    methodology: "Scenario band intended to show grid-scale implications from manufacturing, compute, HVAC, cooling, robotics and redundancy assumptions. Not a reported project number.",
    lastReviewed: "2026-05-07",
    reviewerNote: "Needs external energy benchmarks and explicit assumptions before public research release.",
  },
  {
    id: "claim-systems-coupled",
    label: "Systems coupled",
    value: "12",
    unit: "critical layers",
    category: "estimated",
    score: 64,
    source: {
      title: "Industrial systems taxonomy for homepage prototype",
      outlet: "TeraFab Atlas editorial model",
      date: "2026-05-07",
      sourceType: "model",
    },
    methodology: "Editorial count of distinct infrastructure layers represented on the prototype: power, cooling, clean-room air, robotics, compute, logistics, water, safety, labor, data, finance and policy.",
    lastReviewed: "2026-05-07",
    reviewerNote: "The taxonomy is credible as an editorial model, but exact layer count is not a physical measurement.",
  },
  {
    id: "claim-terafab-base-footprint",
    label: "TeraFab Base Model",
    value: "12",
    unit: "km²",
    category: "speculative",
    score: 45,
    source: {
      title: "Scale Comparison Engine base footprint assumption",
      outlet: "TeraFab Atlas model",
      date: "2026-05-07",
      sourceType: "model",
    },
    methodology: "Synthetic base-case footprint used for interaction design and scale comparisons. The value exists to stress-test UI behavior and should not be interpreted as a reported plan.",
    lastReviewed: "2026-05-07",
    reviewerNote: "Use as model input only; do not cite as fact.",
  },
  {
    id: "claim-gigafactory-texas-footprint",
    label: "Gigafactory Texas benchmark",
    value: "0.93",
    unit: "km² area benchmark",
    category: "reported",
    score: 78,
    source: {
      title: "Public footprint benchmark placeholder",
      outlet: "Public reporting / facility benchmark",
      date: "2026-05-07",
      sourceType: "benchmark",
    },
    methodology: "Benchmark value stored as a prototype comparison datum. Replace placeholder source with canonical facility source and source URL in backend phase.",
    lastReviewed: "2026-05-07",
    reviewerNote: "Reported benchmark category, but source URL still needs production-grade citation.",
  },
  {
    id: "claim-compute-robotics-training",
    label: "Robotics Training compute model",
    value: "100,000 GPUs / 230 MW",
    category: "speculative",
    score: 36,
    source: {
      title: "Interactive compute section dummy dataset",
      outlet: "TeraFab Atlas prototype model",
      date: "2026-05-07",
      sourceType: "model",
    },
    methodology: "Dummy scenario used to visualize rack count, power implications and cooling architecture for an embodied-AI training loop. No live procurement or confirmed deployment is implied.",
    lastReviewed: "2026-05-07",
    reviewerNote: "Keep behind speculative confidence badge until sourced compute reporting exists.",
  },
];

export function getFactClaim(id?: string) {
  return factClaims.find((claim) => claim.id === id);
}
