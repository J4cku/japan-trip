"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { STAMPS } from "@/data/stamps";

const STORAGE_KEY = "jpn-stamps";

export interface StampEntry {
  collected: boolean;
  collectedAt?: string;
}

export type StampRecord = Record<string, StampEntry>;

function loadStamps(): StampRecord {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore parse errors
  }
  return {};
}

function saveStamps(stamps: StampRecord) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stamps));
  } catch {
    // ignore storage errors
  }
}

export function useStampRally() {
  const [stamps, setStamps] = useState<StampRecord>({});
  const [newlyCollected, setNewlyCollected] = useState<string | null>(null);

  useEffect(() => {
    setStamps(loadStamps());
  }, []);

  const collectStamp = useCallback(
    (id: string) => {
      setStamps((prev) => {
        if (prev[id]?.collected) return prev;
        const next = {
          ...prev,
          [id]: { collected: true, collectedAt: new Date().toISOString() },
        };
        saveStamps(next);
        setNewlyCollected(id);
        return next;
      });
    },
    []
  );

  const clearNotification = useCallback(() => {
    setNewlyCollected(null);
  }, []);

  const progress = useMemo(() => {
    const collected = Object.values(stamps).filter((s) => s.collected).length;
    return { collected, total: STAMPS.length };
  }, [stamps]);

  return { stamps, collectStamp, progress, newlyCollected, clearNotification };
}
