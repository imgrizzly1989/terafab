export type UnitSystem = "metric" | "imperial";
export type ComparisonCategory = "cities" | "airports" | "gigafactories" | "football" | "blocks";

export type ScalePreset = {
  id: string;
  category: ComparisonCategory;
  name: string;
  locationLabel: string;
  center: [number, number];
  zoom: number;
  bearing: number;
  pitch: number;
  areaKm2: number;
  aspectRatio: number;
  confidence: "confirmed" | "reported" | "estimated" | "speculative";
  description: string;
  reference: string;
};

export const terafabBase = {
  name: "TeraFab Base Model",
  areaKm2: 12,
  aspectRatio: 1.78,
};

export const footballFieldAreaM2 = 5351;
export const manhattanBlockAreaKm2 = 0.0324;

export const scaleCategories: { id: ComparisonCategory; label: string; short: string }[] = [
  { id: "cities", label: "Cities", short: "City" },
  { id: "airports", label: "Airports", short: "Airport" },
  { id: "gigafactories", label: "Gigafactories", short: "Factory" },
  { id: "football", label: "Football fields", short: "Fields" },
  { id: "blocks", label: "Manhattan blocks", short: "Blocks" },
];

export const scalePresets: ScalePreset[] = [
  {
    id: "downtown-austin",
    category: "cities",
    name: "Downtown Austin",
    locationLabel: "Austin, Texas",
    center: [-97.7431, 30.2672],
    zoom: 12.3,
    bearing: -18,
    pitch: 48,
    areaKm2: 9.4,
    aspectRatio: 1.4,
    confidence: "estimated",
    description: "A central-city footprint comparison near the likely geography of Texas industrial expansion.",
    reference: "Urban district approximation for editorial scale comparison.",
  },
  {
    id: "lower-manhattan",
    category: "cities",
    name: "Lower Manhattan",
    locationLabel: "New York City",
    center: [-74.0089, 40.7075],
    zoom: 12.1,
    bearing: 24,
    pitch: 50,
    areaKm2: 7.5,
    aspectRatio: 1.9,
    confidence: "estimated",
    description: "A recognizable dense urban district: useful for making city-scale land consumption intuitive.",
    reference: "Approximate district area; use GIS boundary data in research-grade version.",
  },
  {
    id: "dfw-terminal-core",
    category: "airports",
    name: "DFW terminal core",
    locationLabel: "Dallas–Fort Worth",
    center: [-97.0403, 32.8998],
    zoom: 11.5,
    bearing: 8,
    pitch: 52,
    areaKm2: 18.1,
    aspectRatio: 2.25,
    confidence: "estimated",
    description: "Airport-scale logistics, aprons, roads and service infrastructure are closer to TeraFab logic than a single building.",
    reference: "Airport-campus envelope estimate for comparative infrastructure modeling.",
  },
  {
    id: "heathrow-t5",
    category: "airports",
    name: "Heathrow Terminal 5 campus",
    locationLabel: "London",
    center: [-0.4877, 51.4700],
    zoom: 12.4,
    bearing: -32,
    pitch: 47,
    areaKm2: 2.6,
    aspectRatio: 1.7,
    confidence: "estimated",
    description: "A terminal-campus benchmark for people who understand megastructure movement systems.",
    reference: "Approximate public terminal-campus comparison.",
  },
  {
    id: "giga-texas",
    category: "gigafactories",
    name: "Gigafactory Texas building",
    locationLabel: "Austin, Texas",
    center: [-97.6151, 30.2220],
    zoom: 13.3,
    bearing: -20,
    pitch: 50,
    areaKm2: 0.93,
    aspectRatio: 4.2,
    confidence: "reported",
    description: "The familiar Tesla factory benchmark becomes visually small against the base TeraFab model.",
    reference: "Publicly reported building footprint benchmark; verify exact source before publication.",
  },
  {
    id: "giga-nevada",
    category: "gigafactories",
    name: "Gigafactory Nevada campus",
    locationLabel: "Storey County, Nevada",
    center: [-119.4446, 39.5362],
    zoom: 12.7,
    bearing: 14,
    pitch: 46,
    areaKm2: 0.49,
    aspectRatio: 3.6,
    confidence: "reported",
    description: "A factory known for scale becomes a component-level reference, not the whole system.",
    reference: "Approximate building footprint benchmark for comparative scale analysis.",
  },
  {
    id: "football-fields",
    category: "football",
    name: "American football fields",
    locationLabel: "Abstract scale grid",
    center: [-96.7969, 32.7767],
    zoom: 11.9,
    bearing: 0,
    pitch: 35,
    areaKm2: footballFieldAreaM2 / 1_000_000,
    aspectRatio: 1.89,
    confidence: "reported",
    description: "A visceral unit: the base model equals thousands of playing fields when land is translated into human-scale rectangles.",
    reference: "Field area uses 120 yd × 53.3 yd including end zones.",
  },
  {
    id: "manhattan-blocks",
    category: "blocks",
    name: "Manhattan blocks",
    locationLabel: "Midtown Manhattan",
    center: [-73.9855, 40.7580],
    zoom: 13.0,
    bearing: 29,
    pitch: 50,
    areaKm2: manhattanBlockAreaKm2,
    aspectRatio: 4.0,
    confidence: "estimated",
    description: "The comparison converts abstract square kilometers into blocks a pedestrian can imagine crossing.",
    reference: "Approximate 80 m × 405 m Manhattan block model.",
  },
];

export function getPresetsByCategory(category: ComparisonCategory) {
  return scalePresets.filter((preset) => preset.category === category);
}

export function km2ToM2(areaKm2: number) {
  return areaKm2 * 1_000_000;
}

export function km2ToMi2(areaKm2: number) {
  return areaKm2 * 0.3861021585;
}

export function kmToMiles(km: number) {
  return km * 0.6213711922;
}

export function dimensionsFromArea(areaKm2: number, aspectRatio: number) {
  const widthKm = Math.sqrt(areaKm2 * aspectRatio);
  const heightKm = areaKm2 / widthKm;
  return { widthKm, heightKm };
}

export function comparisonRatio(targetAreaKm2: number, referenceAreaKm2: number) {
  return targetAreaKm2 / referenceAreaKm2;
}

export function formatArea(areaKm2: number, unit: UnitSystem) {
  if (unit === "metric") return `${areaKm2.toLocaleString(undefined, { maximumFractionDigits: 2 })} km²`;
  return `${km2ToMi2(areaKm2).toLocaleString(undefined, { maximumFractionDigits: 2 })} mi²`;
}

export function formatLength(km: number, unit: UnitSystem) {
  if (unit === "metric") return `${km.toLocaleString(undefined, { maximumFractionDigits: 2 })} km`;
  return `${kmToMiles(km).toLocaleString(undefined, { maximumFractionDigits: 2 })} mi`;
}

export function fieldCountFor(areaKm2: number) {
  return Math.round(km2ToM2(areaKm2) / footballFieldAreaM2);
}

export function blockCountFor(areaKm2: number) {
  return Math.round(areaKm2 / manhattanBlockAreaKm2);
}
