"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useStampRally } from "@/hooks/useStampRally";
import { STAMPS } from "@/data/stamps";
import { StampNotification } from "./StampNotification";

export function StampCollector() {
  const pathname = usePathname();
  const { stamps, collectStamp, newlyCollected, clearNotification } = useStampRally();

  // Page-visit stamps
  useEffect(() => {
    STAMPS.filter((s) => s.trigger === "page").forEach((s) => {
      if (pathname === s.triggerDetail && !stamps[s.id]?.collected) {
        collectStamp(s.id);
      }
    });
  }, [pathname, stamps, collectStamp]);

  // Scroll-based stamps (IntersectionObserver on slides)
  useEffect(() => {
    const scrollStamps = STAMPS.filter((s) => s.trigger === "scroll");
    if (scrollStamps.length === 0) return;

    // Only observe on the home page where slides exist
    if (pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slideId = entry.target.id;
            const stamp = scrollStamps.find((s) => s.triggerDetail === slideId);
            if (stamp) {
              collectStamp(stamp.id);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    // Wait for DOM to be ready, then observe
    const timer = setTimeout(() => {
      scrollStamps.forEach((s) => {
        const el = document.getElementById(s.triggerDetail);
        if (el) observer.observe(el);
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname, collectStamp]);

  return (
    <StampNotification stampId={newlyCollected} onDismiss={clearNotification} />
  );
}
