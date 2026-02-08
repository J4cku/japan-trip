"use client";

import { useEffect } from "react";

export function SnapActivator() {
  useEffect(() => {
    document.documentElement.classList.add("snap");
    return () => document.documentElement.classList.remove("snap");
  }, []);
  return null;
}
