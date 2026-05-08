"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function DeferredSection({
  children,
  fallback,
  rootMargin = "900px 0px",
}: {
  children: ReactNode;
  fallback: ReactNode;
  rootMargin?: string;
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;
    const node = hostRef.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setShouldRender(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return <div ref={hostRef}>{shouldRender ? children : fallback}</div>;
}
