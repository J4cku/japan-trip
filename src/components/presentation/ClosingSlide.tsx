import { CLOSING_STICKERS } from "@/data/stickers";
import { CLOSING_TAGS } from "@/data/luggage-tags";
import { Sticker } from "./Sticker";
import { LuggageTag } from "./LuggageTag";
import type { Stat } from "@/types/trip";

export function ClosingSlide({ stats, totalDays }: { stats: Stat[]; totalDays: number }) {
  return (
    <section className="slide closing" id={`slide-${totalDays + 1}`}>
      {CLOSING_STICKERS.map((s, i) => (
        <Sticker key={i} s={s} />
      ))}
      {CLOSING_TAGS.map((t, i) => (
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
      <p className="hero-pre rv">The journey</p>
      <div className="stats">
        {stats.map((s, i) => (
          <div key={i} className={`rv d${i + 1}`}>
            <div className="stat-num">
              {s.value}
              {s.suffix && <span className="suffix">{s.suffix}</span>}
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <p className="closing-jp rv d7">いい旅を！</p>
      <p className="closing-sub rv d8">Have a great trip, Jacek.</p>
    </section>
  );
}
