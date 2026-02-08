"use client";

import { useEffect, useRef } from "react";

export function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      if (!ref.current) return;
      const pct =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      ref.current.style.width = `${pct * 100}%`;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return <div id="progress" ref={ref} />;
}
