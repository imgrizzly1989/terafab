"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { confidenceCopy, getFactClaim, type FactClaim } from "@/lib/fact-confidence";

const FactConfidenceContext = createContext<{ openClaim: (id: string) => void } | null>(null);

export function FactConfidenceProvider({ children }: { children: ReactNode }) {
  const [activeClaim, setActiveClaim] = useState<FactClaim | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const closeClaim = useCallback(() => {
    setActiveClaim(null);
    window.requestAnimationFrame(() => openerRef.current?.focus());
  }, []);

  const openClaim = useCallback((id: string) => {
    const claim = getFactClaim(id);
    if (claim) {
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setActiveClaim(claim);
    }
  }, []);

  const value = useMemo(() => ({ openClaim }), [openClaim]);

  return (
    <FactConfidenceContext.Provider value={value}>
      {children}
      <FactLegend />
      <AnimatePresence>{activeClaim ? <FactDrawer claim={activeClaim} onClose={closeClaim} /> : null}</AnimatePresence>
    </FactConfidenceContext.Provider>
  );
}

export function useFactConfidence() {
  const context = useContext(FactConfidenceContext);
  if (!context) throw new Error("useFactConfidence must be used inside FactConfidenceProvider");
  return context;
}

export function FactTrigger({ claimId, children, className = "" }: { claimId?: string; children: ReactNode; className?: string }) {
  const { openClaim } = useFactConfidence();
  const claim = claimId ? getFactClaim(claimId) : undefined;
  if (!claimId || !claim) return <>{children}</>;

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openClaim(claimId!);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => openClaim(claimId)}
      onKeyDown={onKeyDown}
      className={`cursor-pointer text-left ${className}`}
    >
      {children}
    </div>
  );
}

function FactLegend() {
  return (
    <div className="fixed bottom-4 left-1/2 z-40 hidden -translate-x-1/2 rounded-full border border-white/10 bg-black/55 px-3 py-2 shadow-2xl shadow-black/50 backdrop-blur-xl lg:block" aria-label="Fact confidence legend">
      <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">
        <span className="px-2 text-slate-500">Fact confidence</span>
        {Object.entries(confidenceCopy).map(([key, item]) => (
          <span key={key} className="rounded-full border border-white/10 px-2 py-1 text-slate-300">
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function FactDrawer({ claim, onClose }: { claim: FactClaim; onClose: () => void }) {
  const copy = confidenceCopy[claim.category];
  const drawerRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) return;
      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((node) => !node.hasAttribute("disabled") && node.offsetParent !== null);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button type="button" aria-label="Close fact drawer" onClick={onClose} className="absolute inset-0 cursor-default bg-black/68 backdrop-blur-sm" />
      <motion.aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="fact-drawer-title"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto border-l border-white/10 bg-[#05070a]/95 p-4 shadow-2xl shadow-black sm:p-5"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-100/65">Claim evidence packet</p>
            <h3 id="fact-drawer-title" className="mt-3 text-3xl font-semibold tracking-[-0.07em] text-white">{claim.label}</h3>
          </div>
          <button ref={closeButtonRef} type="button" onClick={onClose} className="min-h-11 rounded-full border border-white/10 px-4 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-300 transition hover:border-white/30 hover:text-white">
            Close
          </button>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">Displayed metric</p>
              <p className="mt-1 text-4xl font-semibold tracking-[-0.08em] text-white">{claim.value}</p>
              {claim.unit ? <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-100/70">{claim.unit}</p> : null}
            </div>
            <div className="text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">Confidence score</p>
              <p className="mt-1 text-4xl font-semibold tracking-[-0.08em] text-white">{claim.score}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">/ 100</p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/35 p-3">
            <div className="flex items-center justify-between gap-4">
              <span className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] ${badgeClass(claim.category)}`}>{copy.label}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">last reviewed {claim.lastReviewed}</span>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-300">{copy.definition}</p>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-4">
            <MiniDetail label="Source" value={claim.source.title} />
            <MiniDetail label="Date" value={claim.source.date} />
            <MiniDetail label="Reporting outlet" value={claim.source.outlet} />
            <MiniDetail label="Methodology" value={claim.methodology} />
          </div>
        </div>

        <dl className="mt-4 grid gap-2 sm:grid-cols-2">
          <Detail label="Source" value={claim.source.title} />
          <Detail label="Date" value={claim.source.date} />
          <Detail label="Reporting outlet" value={claim.source.outlet} />
          <Detail label="Source type" value={claim.source.sourceType} />
        </dl>

        <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">Methodology</p>
          <p className="mt-4 text-sm leading-7 text-slate-300">{claim.methodology}</p>
        </div>

        <div className="mt-4 rounded-[1.5rem] border border-amber-300/20 bg-amber-300/[0.04] p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber-100/70">Editorial note</p>
          <p className="mt-4 text-sm leading-7 text-slate-300">{claim.reviewerNote}</p>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
          Every production metric must resolve to this structure: category, source, date, score, outlet and methodology.
        </div>
      </motion.aside>
    </motion.div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">{label}</dt>
      <dd className="mt-2 text-sm leading-6 text-slate-200">{value}</dd>
    </div>
  );
}

function MiniDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/28 p-2.5">
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-slate-200">{value}</p>
    </div>
  );
}

function badgeClass(category: FactClaim["category"]) {
  return {
    confirmed: "border-white/50 text-white",
    reported: "border-blue-300/50 text-blue-100",
    estimated: "border-cyan-300/50 text-cyan-100",
    speculative: "border-amber-300/60 text-amber-100 border-dashed",
  }[category];
}
