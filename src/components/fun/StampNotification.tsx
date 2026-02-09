"use client";

import { useEffect, useState } from "react";
import { STAMPS_MAP } from "@/data/stamps";
import { STICKERS } from "@/data/stickers";

interface StampNotificationProps {
  stampId: string | null;
  onDismiss: () => void;
}

export function StampNotification({ stampId, onDismiss }: StampNotificationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!stampId) {
      setVisible(false);
      return;
    }
    // Small delay before showing so it animates in
    const showTimer = setTimeout(() => setVisible(true), 50);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 400);
    }, 3000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [stampId, onDismiss]);

  if (!stampId) return null;

  const stamp = STAMPS_MAP[stampId];
  if (!stamp) return null;

  const stickerSrc = STICKERS[stamp.icon];

  return (
    <div className={`stamp-toast ${visible ? "stamp-toast-visible" : ""}`}>
      <div className="stamp-toast-icon">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={stickerSrc} alt="" width={36} height={36} />
      </div>
      <div className="stamp-toast-text">
        <span className="stamp-toast-title">Stamp collected!</span>
        <span className="stamp-toast-label">{stamp.label}</span>
      </div>
    </div>
  );
}
