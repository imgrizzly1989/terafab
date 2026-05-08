import type { FactConfidence } from "./fact-confidence";

export type Confidence = FactConfidence;

export type Metric = {
  label: string;
  value: string;
  unit?: string;
  confidence: Confidence;
  note: string;
  claimId?: string;
};

export type Landmark = {
  name: string;
  areaKm2: number;
  label: string;
  confidence: Confidence;
};

export type ComputeScenario = {
  name: string;
  gpuCount: number;
  powerMw: number;
  racks: number;
  cooling: string;
  description: string;
  claimId?: string;
};

export const heroMetrics: Metric[] = [
  {
    label: "Industrial footprint",
    value: "10–100×",
    unit: "gigafactory-class scenarios",
    confidence: "speculative",
    claimId: "claim-industrial-footprint-range",
    note: "Scenario model comparing proposed industrial district scale against public factory and urban-campus benchmarks.",
  },
  {
    label: "Power envelope",
    value: "0.5–5",
    unit: "GW modeled",
    confidence: "speculative",
    claimId: "claim-power-envelope",
    note: "Utility-scale envelope used to frame interconnection, transformer, cooling and dispatchable-power exposure.",
  },
  {
    label: "Systems coupled",
    value: "12",
    unit: "critical layers",
    confidence: "estimated",
    claimId: "claim-systems-coupled",
    note: "Power, cooling, clean-room air, robotics, compute, logistics, water, safety, labor, data, finance, policy.",
  },
];

export const landmarks: Landmark[] = [
  { name: "Pentagon", areaKm2: 0.12, label: "One of the world's largest office buildings", confidence: "reported" },
  { name: "Gigafactory Texas", areaKm2: 0.93, label: "Publicly reported building footprint benchmark", confidence: "reported" },
  { name: "Heathrow T5 campus", areaKm2: 2.6, label: "Airport terminal-scale comparison", confidence: "estimated" },
  { name: "Lower Manhattan district", areaKm2: 7.5, label: "Urban district reference", confidence: "estimated" },
  { name: "TeraFab Base Model", areaKm2: 12, label: "Hypothetical industrial-city footprint", confidence: "speculative" },
  { name: "TeraFab Extreme Model", areaKm2: 32, label: "Speculative full build-out envelope", confidence: "speculative" },
];

export const computeScenarios: ComputeScenario[] = [
  {
    name: "Factory AI",
    gpuCount: 25000,
    powerMw: 55,
    racks: 780,
    cooling: "liquid-assisted air",
    description: "Quality vision, robotic simulation, predictive maintenance and factory orchestration.",
  },
  {
    name: "Robotics Training",
    gpuCount: 100000,
    powerMw: 230,
    racks: 3100,
    cooling: "direct liquid loops",
    claimId: "claim-compute-robotics-training",
    description: "Large-scale embodied AI training loop connected to production telemetry.",
  },
  {
    name: "Frontier Cluster",
    gpuCount: 350000,
    powerMw: 850,
    racks: 10800,
    cooling: "campus-scale chilled water + heat rejection",
    description: "A speculative compute-industrial campus where AI becomes a first-class factory utility.",
  },
];

export const timeline = [
  { phase: "Site intelligence", duration: "0–9 mo", detail: "Land, grid proximity, water, logistics and incentives scored before public commitment." },
  { phase: "Utility spine", duration: "9–30 mo", detail: "Substations, transmission studies, transformers, water treatment and road/rail staging." },
  { phase: "Shell & structure", duration: "18–42 mo", detail: "Earthworks, foundations, steel frame, roof closure and weather-tight industrial bays." },
  { phase: "Clean-room systems", duration: "30–54 mo", detail: "Air handling, pressure zoning, high-purity services and contamination control." },
  { phase: "Compute & robotics", duration: "36–66 mo", detail: "GPU halls, networking, autonomous material flow, robotic cells and instrumentation." },
  { phase: "Commissioning waves", duration: "54–84 mo", detail: "Ramp happens by zone; bottlenecks migrate across energy, tooling, labor and suppliers." },
];

export const infrastructure = [
  "High-voltage interconnect",
  "Dedicated substations",
  "Cooling and heat rejection",
  "Water treatment",
  "Road and rail logistics",
  "Clean-room contractors",
  "Transformer supply",
  "Robotics maintenance",
  "Security perimeter",
  "Workforce mobility",
  "Data backbone",
  "Permitting corridor",
];

export const ecosystemImpacts = [
  {
    title: "AI sovereignty",
    body: "A TeraFab-scale campus reframes compute as strategic industrial infrastructure, not a software expense.",
  },
  {
    title: "Robotics flywheel",
    body: "Physical production telemetry feeds simulation, training, inspection and automation loops back into the factory.",
  },
  {
    title: "Grid politics",
    body: "The hidden fight is not only land. It is interconnection, transformers, dispatchable power and cooling capacity.",
  },
  {
    title: "Capital concentration",
    body: "The project depends on synchronized financing, government incentives, long-lead equipment and credible demand.",
  },
];

export const archive = [
  "Tesla public manufacturing benchmarks",
  "xAI data center and GPU cluster reporting",
  "DOE grid interconnection datasets",
  "Semiconductor clean-room engineering references",
  "Hyperscale data center power-density benchmarks",
  "Megaproject construction and capex case studies",
];
