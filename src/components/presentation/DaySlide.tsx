import { DAY_STICKERS, DAY_LABEL_ICON, STICKERS } from "@/data/stickers";
import { DAY_TAGS, DAY_HOTEL_KEY } from "@/data/luggage-tags";
import { Sticker } from "./Sticker";
import { LuggageTag } from "./LuggageTag";
import { TransportStrip } from "./TransportStrip";
import type { Day, Hotels, Travel, HotelCity } from "@/types/trip";
import Link from "next/link";

export function DaySlide({
  day,
  index,
  hotels,
  travels,
  restaurantInfo,
  accentColor,
  children,
  slideClassName,
}: {
  day: Day;
  index: number;
  hotels?: Hotels;
  travels?: Travel[];
  restaurantInfo?: { count: number; locationId: string };
  accentColor?: string;
  children?: React.ReactNode;
  slideClassName?: string;
}) {
  const num = String(day.day).padStart(2, "0");
  const dayStickers = DAY_STICKERS[num] || [];
  const iconKey = DAY_LABEL_ICON[num];
  const iconSrc = iconKey ? STICKERS[iconKey] : null;
  const tag = DAY_TAGS[num];
  const hotelKey = DAY_HOTEL_KEY[num];
  const hotelData =
    hotels && hotelKey
      ? (hotels[hotelKey] as HotelCity | undefined)
      : undefined;

  return (
    <section
      className={`slide${slideClassName ? ` ${slideClassName}` : ""}`}
      id={`slide-${index + 1}`}
      {...(accentColor ? { style: { "--red": accentColor } as React.CSSProperties } : {})}
    >
      <div className="day-bg-num rv-s">{num}</div>
      {dayStickers.map((s, j) => (
        <Sticker key={j} s={{ ...s, delay: `${0.3 + j * 0.2}s` }} />
      ))}
      {tag && (
        <LuggageTag
          city={tag.city}
          code={tag.code}
          date={tag.date}
          hotelData={
            hotelData && typeof hotelData === "object" && "options" in hotelData
              ? hotelData
              : undefined
          }
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
      {travels && travels.length > 0 && (
        <TransportStrip travels={travels} />
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
        {children}
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
              <span className="df-val">
                &yen;{day.keyCost.toLocaleString()}
              </span>
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {restaurantInfo && (
            <Link
              href={`/restaurants#rx-${restaurantInfo.locationId}`}
              className="day-dining rv d9"
            >
              {restaurantInfo.count} dining spots for this area
            </Link>
          )}
          <Link
            href={`/map?day=${day.day}`}
            className="day-dining day-map-link rv d9"
          >
            Show on map
          </Link>
        </div>
        {day.tip && <p className="day-tip rv d9">{day.tip}</p>}
      </div>
    </section>
  );
}
