"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { ScalePreset } from "@/lib/scale-comparisons";

export function OverlayRenderer({ preset, ratio }: { preset: ScalePreset; ratio: number }) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const dragRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const nextPosition = useRef(position);
  const frame = useRef(0);

  useEffect(() => {
    function move(event: PointerEvent) {
      if (!isDragging.current || !dragRef.current) return;
      const rect = dragRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      nextPosition.current = { x: Math.min(88, Math.max(12, x)), y: Math.min(82, Math.max(18, y)) };
      if (!frame.current) {
        frame.current = requestAnimationFrame(() => {
          frame.current = 0;
          setPosition(nextPosition.current);
        });
      }
    }
    function up() {
      isDragging.current = false;
    }
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  const visualScale = Math.min(1.65, Math.max(0.34, Math.sqrt(ratio) * 0.48));
  const width = `${Math.min(72, Math.max(18, 34 * visualScale))}%`;
  const height = `${Math.min(56, Math.max(12, 19 * visualScale))}%`;

  return (
    <div ref={dragRef} className="absolute inset-0 touch-none">
      <motion.div
        key={preset.id}
        initial={{ opacity: 0, scale: 0.65, rotate: preset.bearing / 7 }}
        animate={{ opacity: 1, scale: 1, rotate: preset.bearing / 9, left: `${position.x}%`, top: `${position.y}%`, width, height }}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        onPointerDown={(event) => {
          isDragging.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        role="button"
        aria-label={`Draggable TeraFab footprint overlay compared to ${preset.name}`}
        tabIndex={0}
        onKeyDown={(event) => {
          const step = event.shiftKey ? 8 : 3;
          if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
          event.preventDefault();
          setPosition((current) => ({
            x: Math.min(88, Math.max(12, current.x + (event.key === "ArrowLeft" ? -step : event.key === "ArrowRight" ? step : 0))),
            y: Math.min(82, Math.max(18, current.y + (event.key === "ArrowUp" ? -step : event.key === "ArrowDown" ? step : 0))),
          }));
        }}
        className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-[18px] border border-cyan-100/80 bg-cyan-100/[0.055] shadow-[0_0_80px_rgba(66,232,255,.22)] active:cursor-grabbing"
      >
        <div className="absolute inset-0 rounded-[18px] bg-[linear-gradient(rgba(66,232,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(66,232,255,.16)_1px,transparent_1px)] bg-[size:22px_22px] opacity-60" />
        <div className="absolute -left-2 -top-2 h-4 w-4 border-l border-t border-cyan-100" />
        <div className="absolute -right-2 -top-2 h-4 w-4 border-r border-t border-cyan-100" />
        <div className="absolute -bottom-2 -left-2 h-4 w-4 border-b border-l border-cyan-100" />
        <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b border-r border-cyan-100" />
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100 shadow-[0_0_24px_rgba(66,232,255,.9)]" />
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-cyan-100/30 bg-black/75 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-50 opacity-90 backdrop-blur">
          Drag TeraFab overlay
        </div>
      </motion.div>
    </div>
  );
}
