"use client";

import { useEffect, useState } from "react";

const DEPART = new Date("2026-05-09T00:00:00+09:00").getTime();
const RETURN = new Date("2026-05-22T00:00:00+09:00").getTime();

function compute() {
  const now = Date.now();
  if (now >= RETURN) return { label: "Trip complete!", done: true };
  if (now >= DEPART) return { label: "Trip in progress!", done: true };
  const diff = DEPART - now;
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  return { label: `${d} days, ${h} hours, ${m} minutes`, done: false };
}

export function Countdown() {
  const [state, setState] = useState<{ label: string; done: boolean } | null>(null);

  useEffect(() => {
    setState(compute());
  }, []);

  useEffect(() => {
    if (!state || state.done) return;
    const id = setInterval(() => setState(compute()), 60_000);
    return () => clearInterval(id);
  }, [state]);

  if (!state) return <p className="countdown rv d7">&nbsp;</p>;
  return <p className="countdown rv d7">{state.label}</p>;
}
