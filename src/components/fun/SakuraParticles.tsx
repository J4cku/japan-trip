"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  swayAmount: number;
}

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 8 + Math.random() * 8,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 6,
    opacity: 0.3 + Math.random() * 0.3,
    swayAmount: 20 + Math.random() * 40,
  }));
}

function PetalSVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="10" cy="7" rx="4" ry="6.5" fill="#ffb7c5" transform="rotate(0 10 10)" />
      <ellipse cx="10" cy="7" rx="4" ry="6.5" fill="#ffc8d6" transform="rotate(72 10 10)" />
      <ellipse cx="10" cy="7" rx="4" ry="6.5" fill="#ffb7c5" transform="rotate(144 10 10)" />
      <ellipse cx="10" cy="7" rx="4" ry="6.5" fill="#ffc8d6" transform="rotate(216 10 10)" />
      <ellipse cx="10" cy="7" rx="4" ry="6.5" fill="#ffb7c5" transform="rotate(288 10 10)" />
      <circle cx="10" cy="10" r="2" fill="#ff8fa3" />
    </svg>
  );
}

export function SakuraParticles() {
  const [enabled, setEnabled] = useState(true);
  const [petals, setPetals] = useState<Petal[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPetals(generatePetals(15));
    setMounted(true);
    const saved = localStorage.getItem("sakura");
    if (saved === "off") setEnabled(false);
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem("sakura", next ? "on" : "off");
  };

  return (
    <>
      {mounted && enabled && (
        <div className="sakura-container" aria-hidden="true">
          {petals.map((p) => (
            <div
              key={p.id}
              className="sakura-petal"
              style={{
                left: `${p.left}%`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                opacity: p.opacity,
                ["--sway" as string]: `${p.swayAmount}px`,
              }}
            >
              <PetalSVG size={p.size} />
            </div>
          ))}
        </div>
      )}
      <button
        className="ui-toggle sakura-toggle"
        onClick={toggle}
        title={enabled ? "Disable sakura petals" : "Enable sakura petals"}
        aria-label="Toggle sakura petals"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="10" cy="7" rx="3.5" ry="5.5" fill={enabled ? "#ffb7c5" : "#888"} transform="rotate(0 10 10)" />
          <ellipse cx="10" cy="7" rx="3.5" ry="5.5" fill={enabled ? "#ffc8d6" : "#999"} transform="rotate(72 10 10)" />
          <ellipse cx="10" cy="7" rx="3.5" ry="5.5" fill={enabled ? "#ffb7c5" : "#888"} transform="rotate(144 10 10)" />
          <ellipse cx="10" cy="7" rx="3.5" ry="5.5" fill={enabled ? "#ffc8d6" : "#999"} transform="rotate(216 10 10)" />
          <ellipse cx="10" cy="7" rx="3.5" ry="5.5" fill={enabled ? "#ffb7c5" : "#888"} transform="rotate(288 10 10)" />
          <circle cx="10" cy="10" r="1.8" fill={enabled ? "#ff8fa3" : "#666"} />
        </svg>
      </button>
    </>
  );
}
