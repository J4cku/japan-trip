"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  createSoundscape,
  slideToSoundscape,
  type Soundscape,
  type SoundscapeType,
} from "@/lib/soundscapes";

const FADE_MS = 500;

export function AmbientSound() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const ctxRef = useRef<AudioContext | null>(null);
  const currentScapeRef = useRef<Soundscape | null>(null);
  const currentTypeRef = useRef<SoundscapeType | null>(null);
  const volumeRef = useRef(0.5);
  const enabledRef = useRef(false);
  const masterVolumeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("ambient-volume");
    if (saved) {
      const v = parseFloat(saved);
      if (!isNaN(v)) {
        setVolume(v);
        volumeRef.current = v;
      }
    }
  }, []);

  // Keep refs in sync
  useEffect(() => {
    volumeRef.current = volume;
    if (masterVolumeRef.current) {
      masterVolumeRef.current.gain.setValueAtTime(
        volume,
        ctxRef.current?.currentTime ?? 0
      );
    }
  }, [volume]);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  const getOrCreateContext = useCallback((): AudioContext => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
      const mv = ctxRef.current.createGain();
      mv.gain.value = volumeRef.current;
      mv.connect(ctxRef.current.destination);
      masterVolumeRef.current = mv;
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const switchSoundscape = useCallback(
    (type: SoundscapeType | null) => {
      if (type === currentTypeRef.current) return;

      const old = currentScapeRef.current;
      if (old) {
        old.fadeOut(FADE_MS);
        const ref = old;
        setTimeout(() => {
          try { ref.stop(); } catch {}
        }, FADE_MS + 50);
      }

      currentScapeRef.current = null;
      currentTypeRef.current = type;

      if (!type || !enabledRef.current) return;

      const ctx = getOrCreateContext();
      const scape = createSoundscape(ctx, type);
      // Connect through master volume
      scape.gainNode.disconnect();
      scape.gainNode.connect(masterVolumeRef.current!);
      scape.start();
      scape.fadeIn(FADE_MS);
      currentScapeRef.current = scape;
    },
    [getOrCreateContext]
  );

  // Observe which slide is visible (only on pages with #snap-root)
  useEffect(() => {
    if (!mounted) return;

    const container = document.getElementById("snap-root");
    if (!container) {
      // Not on the presentation page — stop any playing soundscape
      if (currentScapeRef.current) {
        currentScapeRef.current.fadeOut(FADE_MS);
        const ref = currentScapeRef.current;
        setTimeout(() => { try { ref.stop(); } catch {} }, FADE_MS + 50);
        currentScapeRef.current = null;
        currentTypeRef.current = null;
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const idx = parseInt(id.replace("slide-", ""), 10);
            if (!isNaN(idx) && enabledRef.current) {
              const type = slideToSoundscape(idx);
              switchSoundscape(type);
            }
          }
        }
      },
      { root: container, threshold: 0.5 }
    );

    // Wait for slides to render
    const timer = setTimeout(() => {
      container.querySelectorAll(".slide").forEach((s) => observer.observe(s));
    }, 300);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [mounted, pathname, switchSoundscape]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (currentScapeRef.current) {
        try { currentScapeRef.current.stop(); } catch {}
      }
      if (ctxRef.current) {
        try { ctxRef.current.close(); } catch {}
      }
    };
  }, []);

  const toggle = useCallback(() => {
    const next = !enabled;
    setEnabled(next);
    setShowVolume(next);

    if (next) {
      // Turning on — create context on user gesture, start current soundscape
      const ctx = getOrCreateContext();
      if (ctx.state === "suspended") ctx.resume();

      // Find current visible slide
      const container = document.getElementById("snap-root");
      if (container) {
        const slides = container.querySelectorAll(".slide");
        for (const slide of slides) {
          const rect = slide.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const visible =
            rect.top >= containerRect.top - rect.height * 0.5 &&
            rect.top <= containerRect.bottom - rect.height * 0.5;
          if (visible) {
            const idx = parseInt(slide.id.replace("slide-", ""), 10);
            if (!isNaN(idx)) {
              enabledRef.current = true;
              const type = slideToSoundscape(idx);
              switchSoundscape(type);
            }
            break;
          }
        }
      }
    } else {
      // Turning off — fade out current
      if (currentScapeRef.current) {
        currentScapeRef.current.fadeOut(FADE_MS);
        const ref = currentScapeRef.current;
        setTimeout(() => {
          try { ref.stop(); } catch {}
        }, FADE_MS + 50);
        currentScapeRef.current = null;
        currentTypeRef.current = null;
      }
    }
  }, [enabled, getOrCreateContext, switchSoundscape]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    localStorage.setItem("ambient-volume", String(v));
  }, []);

  useEffect(() => {
    const close = () => setShowVolume(false);
    window.addEventListener("mobile-menu-close", close);
    return () => window.removeEventListener("mobile-menu-close", close);
  }, []);

  if (!mounted) return null;

  // Only show on the main presentation page
  if (pathname !== "/" && pathname !== "/extended") return null;

  return (
    <div
      className="ambient-wrap"
      onMouseEnter={() => setShowVolume(true)}
      onMouseLeave={() => setShowVolume(false)}
    >
      <div className={`ambient-volume${showVolume ? " ambient-volume-show" : ""}`}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="ambient-slider"
          aria-label="Ambient volume"
        />
      </div>
      <button
        className={`ui-toggle ambient-toggle${enabled ? " active" : ""}`}
        onClick={toggle}
        title={enabled ? "Disable ambient sounds" : "Enable ambient sounds"}
        aria-label="Toggle ambient sounds"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {enabled ? (
            <>
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </>
          ) : (
            <>
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}
