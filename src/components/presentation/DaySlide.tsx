import { DAY_STICKERS, DAY_LABEL_ICON, STICKERS } from "@/data/stickers";
import { DAY_TAGS } from "@/data/luggage-tags";
import { Sticker } from "./Sticker";
import { LuggageTag } from "./LuggageTag";
import type { Day } from "@/types/trip";

export function DaySlide({ day, index }: { day: Day; index: number }) {
  const num = String(day.day).padStart(2, "0");
  const dayStickers = DAY_STICKERS[num] || [];
  const iconKey = DAY_LABEL_ICON[num];
  const iconSrc = iconKey ? STICKERS[iconKey] : null;
  const tag = DAY_TAGS[num];

  return (
    <section className="slide" id={`slide-${index + 1}`}>
      <div className="day-bg-num rv-s">{num}</div>
      {dayStickers.map((s, j) => (
        <Sticker key={j} s={{ ...s, delay: `${0.3 + j * 0.2}s` }} />
      ))}
      {tag && (
        <LuggageTag
          city={tag.city}
          code={tag.code}
          date={tag.date}
          style={{
            ...(tag.top ? { top: tag.top } : {}),
            ...(tag.bottom ? { bottom: tag.bottom } : {}),
            ...(tag.left ? { left: tag.left } : {}),
            ...(tag.right ? { right: tag.right } : {}),
            "--tag-rot": tag.rot || "0deg",
            "--tag-delay": tag.delay || "0.2s",
          } as React.CSSProperties}
        />
      )}
      <div className="day-content">
        <p className="day-label rv">
          {iconSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="day-icon" src={iconSrc} alt="" />
          )}
          Day {num} &mdash; {day.dateLabel}
        </p>
        <div className="red-line rv-l d1" />
        <h2 className="day-title rv d2">{day.title}</h2>
        <p className="day-tagline rv d3">{day.tagline}</p>
        <div className="highlights">
          {day.highlights.map((h, j) => (
            <div key={j} className={`hl rv d${Math.min(j + 4, 9)}`}>
              <span className="hl-dot" />
              <span>{h}</span>
            </div>
          ))}
        </div>
        <div className="day-footer rv d8">
          <div className="df-item">
            <span className="df-label">Transport</span>
            <span className="df-val">{day.transport.mode}</span>
          </div>
          <div className="df-item">
            <span className="df-label">Stay</span>
            <span className="df-val">{day.stay || "N/A"}</span>
          </div>
          {day.keyCost != null && (
            <div className="df-item">
              <span className="df-label">Key cost</span>
              <span className="df-val">&yen;{day.keyCost.toLocaleString()}</span>
            </div>
          )}
        </div>
        {day.tip && <p className="day-tip rv d9">{day.tip}</p>}
      </div>
    </section>
  );
}
