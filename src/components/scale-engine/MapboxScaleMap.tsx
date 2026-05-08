"use client";

import { useEffect, useRef, useState } from "react";
import type mapboxgl from "mapbox-gl";
import type { ScalePreset, UnitSystem } from "@/lib/scale-comparisons";
import { formatArea } from "@/lib/scale-comparisons";
import { OverlayRenderer } from "./OverlayRenderer";

export function MapboxScaleMap({ preset, ratio, unit }: { preset: ScalePreset; ratio: number; unit: UnitSystem }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const initialPresetRef = useRef(preset);
  const [mapReady, setMapReady] = useState(false);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!token || !containerRef.current || mapRef.current) return;
    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;

    async function init() {
      const mapbox = await import("mapbox-gl");
      if (cancelled || !containerRef.current || mapRef.current) return;
      mapbox.default.accessToken = token;
      const initialPreset = initialPresetRef.current;
      const map = new mapbox.default.Map({
        container: containerRef.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: initialPreset.center,
        zoom: initialPreset.zoom,
        bearing: initialPreset.bearing,
        pitch: initialPreset.pitch,
        attributionControl: false,
        logoPosition: "bottom-right",
        antialias: false,
        cooperativeGestures: true,
        fadeDuration: 120,
        maxZoom: 15.5,
        minZoom: 3,
      });
      map.addControl(new mapbox.default.AttributionControl({ compact: true }), "bottom-right");
      map.on("load", () => {
        map.resize();
        setMapReady(true);
      });
      resizeObserver = new ResizeObserver(() => map.resize());
      resizeObserver.observe(containerRef.current);
      mapRef.current = map;
    }

    init();
    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [token]);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.flyTo({
      center: preset.center,
      zoom: preset.zoom,
      bearing: preset.bearing,
      pitch: preset.pitch,
      duration: 1700,
      essential: false,
      curve: 1.35,
    });
  }, [preset.bearing, preset.center, preset.pitch, preset.zoom]);

  return (
    <div className="relative min-h-[620px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#05070a] shadow-2xl shadow-cyan-950/20 sm:min-h-[720px]">
      <div ref={containerRef} className="absolute inset-0" />
      {!token || !mapReady ? <FallbackMap preset={preset} tokenMissing={!token} /> : null}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent,rgba(0,0,0,.72)_78%),linear-gradient(180deg,rgba(0,0,0,.36),transparent_35%,rgba(0,0,0,.72))]" />
      <OverlayRenderer preset={preset} ratio={ratio} />
      <div className="pointer-events-none absolute left-4 right-4 top-4 z-30 flex flex-col gap-3 sm:left-6 sm:right-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="rounded-2xl border border-white/10 bg-black/65 p-4 backdrop-blur-md">
          <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-cyan-100/70">Map target</p>
          <p className="mt-2 text-2xl font-semibold tracking-[-0.06em] text-white">{preset.locationLabel}</p>
          <p className="mt-1 text-xs text-slate-400">{preset.name} · {formatArea(preset.areaKm2, unit)}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/65 p-4 text-right backdrop-blur-md">
          <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-slate-500">Map mode</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-cyan-100">{token ? "Mapbox dark-v11" : "Tokenless cinematic fallback"}</p>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-30 flex flex-col gap-3 sm:left-6 sm:right-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="rounded-full border border-white/10 bg-black/65 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-300 backdrop-blur-md">
          Scroll / pinch map · drag glowing overlay
        </div>
        <div className="h-12 w-40 border-b border-l border-white/45 p-2 text-right font-mono text-[9px] uppercase tracking-[0.18em] text-slate-300">
          scale reference
        </div>
      </div>
    </div>
  );
}

function FallbackMap({ preset, tokenMissing }: { preset: ScalePreset; tokenMissing: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#05070a]">
      <div className="absolute inset-0 grid-overlay opacity-45" />
      <div className="absolute inset-[-20%] bg-[radial-gradient(ellipse_at_40%_42%,rgba(77,163,255,.20),transparent_28%),radial-gradient(ellipse_at_66%_56%,rgba(255,176,32,.10),transparent_22%)]" />
      <div className="absolute left-[12%] top-[20%] h-[62%] w-[76%] rounded-[48%] border border-cyan-100/10" style={{ transform: `rotate(${preset.bearing}deg)` }} />
      <div className="absolute left-[22%] top-[28%] h-[36%] w-[48%] rounded-[42%] border border-white/10" />
      <div className="absolute inset-x-[8%] top-1/2 h-px bg-cyan-100/20" />
      <div className="absolute inset-y-[14%] left-1/2 w-px bg-cyan-100/20" />
      <div className="absolute bottom-24 left-6 max-w-md rounded-2xl border border-amber-200/20 bg-black/55 p-4 backdrop-blur">
        <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-amber-100/80">{tokenMissing ? "Cinematic geospatial fallback" : "Map layer initializing"}</p>
        <p className="mt-2 text-xs leading-5 text-slate-400">The scale overlay remains interactive while the live geospatial layer is unavailable. This preserves comparison logic without exposing implementation details.</p>
      </div>
    </div>
  );
}
