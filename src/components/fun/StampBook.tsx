"use client";

import { useEffect, useState } from "react";
import { STAMPS } from "@/data/stamps";
import { STICKERS } from "@/data/stickers";
import { useStampRally } from "@/hooks/useStampRally";
import type { Stamp } from "@/data/stamps";

function StampCard({ stamp, collected, isNew }: { stamp: Stamp; collected: boolean; isNew: boolean }) {
  const stickerSrc = STICKERS[stamp.icon];

  return (
    <div className={`sb-card ${collected ? "sb-collected" : "sb-locked"} ${isNew ? "sb-new" : ""}`}>
      <div className="sb-stamp-frame" style={{ "--stamp-color": stamp.color } as React.CSSProperties}>
        {collected ? (
          <div className="sb-stamp-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={stickerSrc} alt={stamp.label} width={64} height={64} />
            <div className="sb-ink-overlay" />
          </div>
        ) : (
          <div className="sb-placeholder">?</div>
        )}
      </div>
      <div className="sb-card-info">
        <span className="sb-card-label">{stamp.label}</span>
        <span className="sb-card-jp">{stamp.labelJp}</span>
      </div>
    </div>
  );
}

export function StampBook() {
  const { stamps, progress } = useStampRally();
  const [animatedIds, setAnimatedIds] = useState<Set<string>>(new Set());

  // Track which stamps are "new" for animation on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      const ids = new Set(
        Object.entries(stamps)
          .filter(([, v]) => v.collected)
          .map(([k]) => k)
      );
      setAnimatedIds(ids);
    }, 100);
    return () => clearTimeout(timer);
  }, [stamps]);

  const pct = progress.total > 0 ? Math.round((progress.collected / progress.total) * 100) : 0;

  return (
    <div className="sb-page">
      <div className="sb-header">
        <h1 className="sb-title">Stamp Rally</h1>
        <p className="sb-title-jp">駅スタンプラリー</p>
        <div className="sb-progress">
          <div className="sb-progress-bar">
            <div className="sb-progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="sb-progress-text">
            {progress.collected}/{progress.total} stamps collected
          </span>
        </div>
      </div>

      <div className="sb-section">
        <h2 className="sb-section-title">Daily Stamps</h2>
        <div className="sb-grid">
          {STAMPS.filter((s) => s.trigger === "scroll").map((stamp) => (
            <StampCard
              key={stamp.id}
              stamp={stamp}
              collected={!!stamps[stamp.id]?.collected}
              isNew={animatedIds.has(stamp.id)}
            />
          ))}
        </div>
      </div>

      <div className="sb-section">
        <h2 className="sb-section-title">Bonus Stamps</h2>
        <div className="sb-grid">
          {STAMPS.filter((s) => s.trigger === "page" || s.trigger === "action").map((stamp) => (
            <StampCard
              key={stamp.id}
              stamp={stamp}
              collected={!!stamps[stamp.id]?.collected}
              isNew={animatedIds.has(stamp.id)}
            />
          ))}
        </div>
      </div>

      {progress.collected === progress.total && (
        <div className="sb-complete">
          <span className="sb-complete-text">Complete!</span>
          <span className="sb-complete-jp">コンプリート！</span>
        </div>
      )}
    </div>
  );
}
