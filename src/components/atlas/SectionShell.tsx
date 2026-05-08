import type { ReactNode } from "react";

export function SectionShell({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative isolate overflow-hidden px-5 py-24 sm:px-8 lg:px-16 lg:py-32 ${className}`}>
      <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.36fr_0.64fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-cyan-200/70">{eyebrow}</p>
          <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-[0.94] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
