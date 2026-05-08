"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  type ComparisonCategory,
  type UnitSystem,
  blockCountFor,
  comparisonRatio,
  dimensionsFromArea,
  fieldCountFor,
  formatArea,
  formatLength,
  getPresetsByCategory,
  scaleCategories,
  scalePresets,
  terafabBase,
} from "@/lib/scale-comparisons";
import { ComparisonControls } from "./ComparisonControls";
import { InfoCards } from "./InfoCards";
import { MapboxScaleMap } from "./MapboxScaleMap";

export function ScaleComparisonEngine() {
  const [category, setCategory] = useState<ComparisonCategory>("cities");
  const [presetId, setPresetId] = useState(scalePresets[0].id);
  const [unit, setUnit] = useState<UnitSystem>("metric");

  const presets = useMemo(() => getPresetsByCategory(category), [category]);
  const preset = scalePresets.find((item) => item.id === presetId) ?? presets[0] ?? scalePresets[0];
  const dims = dimensionsFromArea(terafabBase.areaKm2, terafabBase.aspectRatio);
  const ratio = comparisonRatio(terafabBase.areaKm2, preset.areaKm2);

  function selectCategory(next: ComparisonCategory) {
    setCategory(next);
    const first = getPresetsByCategory(next)[0];
    if (first) setPresetId(first.id);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-2xl shadow-black/40 backdrop-blur sm:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-100/70">Interactive scale comparison engine</p>
            <h3 className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl">Drag the TeraFab over the world.</h3>
          </div>
          <div className="flex rounded-full border border-white/10 bg-black/40 p-1 font-mono text-[10px] uppercase tracking-[0.2em]">
            {(["metric", "imperial"] as UnitSystem[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setUnit(mode)}
                aria-pressed={unit === mode}
                className={`rounded-full px-4 py-2 transition ${unit === mode ? "bg-cyan-100 text-black" : "text-slate-400 hover:text-white"}`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
        <ComparisonControls
          categories={scaleCategories}
          category={category}
          onCategoryChange={selectCategory}
          preset={preset}
          presets={presets}
          onPresetChange={setPresetId}
        />
      </div>

      <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <MapboxScaleMap preset={preset} ratio={ratio} unit={unit} />
        <InfoCards
          preset={preset}
          ratio={ratio}
          unit={unit}
          metrics={[
            { label: "TeraFab model", value: formatArea(terafabBase.areaKm2, unit), detail: "base footprint envelope" },
            { label: "Overlay dimensions", value: `${formatLength(dims.widthKm, unit)} × ${formatLength(dims.heightKm, unit)}`, detail: "computed from area + aspect" },
            { label: "Football fields", value: fieldCountFor(terafabBase.areaKm2).toLocaleString(), detail: "full fields incl. end zones" },
            { label: "Manhattan blocks", value: blockCountFor(terafabBase.areaKm2).toLocaleString(), detail: "approx block model" },
          ]}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl text-sm leading-7 text-slate-400"
      >
        Editorial note: the geospatial layer can run with live map tiles or with a lightweight cinematic fallback. In both modes, the overlay engine preserves the same scale calculations, interaction model, and mobile behavior.
      </motion.p>
    </div>
  );
}
