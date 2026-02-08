import { HERO_STICKERS } from "@/data/stickers";
import { HERO_TAGS } from "@/data/luggage-tags";
import { Sticker } from "./Sticker";
import { LuggageTag } from "./LuggageTag";
import type { TripData } from "@/types/trip";

export function HeroSlide({ trip }: { trip: TripData["trip"] }) {
  return (
    <section className="slide hero" id="slide-0">
      {HERO_STICKERS.map((s, i) => (
        <Sticker key={i} s={s} />
      ))}
      {HERO_TAGS.map((t, i) => (
        <LuggageTag
          key={i}
          city={t.city}
          code={t.code}
          date={t.date}
          style={{
            ...(t.top ? { top: t.top } : {}),
            ...(t.bottom ? { bottom: t.bottom } : {}),
            ...(t.left ? { left: t.left } : {}),
            ...(t.right ? { right: t.right } : {}),
            "--tag-rot": t.rot || "0deg",
            "--tag-delay": t.delay || "0.2s",
          } as React.CSSProperties}
        />
      ))}
      <div className="hero-content">
        <span className="hero-pre rv d1">May 2026</span>
        <h1 className="hero-title rv d2">JAPAN</h1>
        <p className="hero-jp rv d3">{trip.titleJp}</p>
        <div className="hero-line rv-l d4" />
        <p className="hero-meta rv d5">{trip.travelers} Travelers &middot; {trip.durationDays} Days</p>
        <p className="hero-route rv d6">{trip.route.join(" \u2192 ")}</p>
      </div>
      <div className="scroll-cue">
        <svg viewBox="0 0 24 24">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
        <span>Scroll to begin</span>
      </div>
    </section>
  );
}
