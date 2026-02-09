"use client";

import { useEffect, useState, useCallback } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
];

interface RamenBowl {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

function generateBowls(count: number): RamenBowl[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: 5 + Math.random() * 90,
    size: 40 + Math.random() * 40,
    delay: Math.random() * 2,
    duration: 1.5 + Math.random() * 2,
  }));
}

export function KonamiEgg() {
  const [active, setActive] = useState(false);
  const [bowls] = useState(() => generateBowls(20));

  const activate = useCallback(() => {
    setActive(true);
  }, []);

  const dismiss = useCallback(() => {
    setActive(false);
  }, []);

  useEffect(() => {
    let buffer: string[] = [];

    const handleKey = (e: KeyboardEvent) => {
      buffer.push(e.code);
      if (buffer.length > KONAMI.length) {
        buffer = buffer.slice(-KONAMI.length);
      }
      if (
        buffer.length === KONAMI.length &&
        buffer.every((k, i) => k === KONAMI[i])
      ) {
        buffer = [];
        activate();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activate]);

  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(dismiss, 4000);
    return () => clearTimeout(timer);
  }, [active, dismiss]);

  if (!active) return null;

  return (
    <div className="konami-overlay" onClick={dismiss}>
      {bowls.map((b) => (
        <div
          key={b.id}
          className="konami-ramen"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/stickers/n1_08.png"
            alt=""
            width={b.size}
            height={b.size}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      ))}
      <div className="konami-text">
        <span>ラーメンタイム！</span>
        <span className="konami-sub">Ramen Time!</span>
      </div>
    </div>
  );
}
