import type { ComparisonCategory, ScalePreset } from "@/lib/scale-comparisons";

type Category = { id: ComparisonCategory; label: string; short: string };

export function ComparisonControls({
  categories,
  category,
  onCategoryChange,
  preset,
  presets,
  onPresetChange,
}: {
  categories: Category[];
  category: ComparisonCategory;
  onCategoryChange: (category: ComparisonCategory) => void;
  preset: ScalePreset;
  presets: ScalePreset[];
  onPresetChange: (id: string) => void;
}) {
  return (
    <div className="mt-5 grid gap-4 lg:grid-cols-[0.62fr_0.38fr]">
      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((item) => (
          <button
            key={item.id}
            onClick={() => onCategoryChange(item.id)}
            aria-pressed={category === item.id}
            className={`min-h-11 shrink-0 rounded-full border px-4 font-mono text-[10px] uppercase tracking-[0.2em] transition sm:px-5 ${category === item.id ? "border-cyan-200 bg-cyan-200/10 text-cyan-100 shadow-[0_0_30px_rgba(66,232,255,.12)]" : "border-white/10 bg-black/30 text-slate-400 hover:border-white/30 hover:text-white"}`}
          >
            <span className="hidden sm:inline">{item.label}</span>
            <span className="sm:hidden">{item.short}</span>
          </button>
        ))}
      </div>
      <label className="block">
        <span className="sr-only">Comparison preset</span>
        <select
          value={preset.id}
          onChange={(event) => onPresetChange(event.target.value)}
          className="h-12 w-full rounded-full border border-white/10 bg-black/70 px-5 font-mono text-[11px] uppercase tracking-[0.16em] text-white outline-none transition hover:border-cyan-200/40 focus:border-cyan-200"
        >
          {presets.map((item) => (
            <option key={item.id} value={item.id} className="bg-black text-white">
              {item.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
