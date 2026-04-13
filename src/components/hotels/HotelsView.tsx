"use client";

import type { HotelCity, HotelOption } from "@/types/trip";
import Link from "next/link";

function RyokanChips({ h }: { h: HotelOption }) {
  const rd = h.ryokanDetails;
  if (!rd) return null;
  const chips: string[] = [];
  if (rd.onsen) chips.push("♨️ Onsen");
  if (rd.rotenburo) chips.push("🌿 Rotenburo");
  if (rd.privateBath) chips.push("🛁 Private bath");
  if (rd.meals) chips.push("🍱 " + rd.meals);
  if (rd.drinks) chips.push("🍶 " + rd.drinks);
  if (rd.yukata) chips.push("👘 Yukata");
  if (!chips.length) return null;
  return (
    <div className="hp-chips">
      {chips.map((c, i) => (
        <span key={i} className="hp-chip">{c}</span>
      ))}
      {rd.onsenType && <p className="hp-onsen-type">{rd.onsenType}</p>}
    </div>
  );
}

function HotelCard({ h }: { h: HotelOption }) {
  const isRyokan = h.type === "ryokan";
  return (
    <div className={`hp-card${isRyokan ? " hp-ryokan" : ""} hp-pick`}>
      <div className="hp-card-head">
        <div className="hp-card-labels">
          {isRyokan && <span className="hp-type-badge hp-type-ryokan">♨️ Ryokan</span>}
          <span className="hp-type-badge hp-type-pick">Booked</span>
        </div>
        <h3 className="hp-name">{h.name}</h3>
        <span className="hp-name-jp">{h.nameJp}</span>
      </div>
      <p className="hp-style">{h.style}</p>
      <div className="hp-pricing">
        <span className="hp-price-eur">{h.priceEUR}<span className="hp-per">/night</span></span>
        <span className="hp-price-jpy">{h.priceJPY}</span>
        {h.totalPerRoom && <span className="hp-total">{h.totalPerRoom}</span>}
      </div>
      <p className="hp-loc">{h.neighborhood} — {h.location}</p>
      <ul className="hp-highlights">
        {h.highlights.map((hl, j) => (
          <li key={j}>{hl}</li>
        ))}
      </ul>
      {isRyokan && <RyokanChips h={h} />}
      {h.dietaryNote && <p className="hp-dietary">{h.dietaryNote}</p>}
      {h.naritaAccess && <p className="hp-narita">{h.naritaAccess}</p>}
      <div className="hp-links">
        {h.bookingUrl && (
          <a href={h.bookingUrl} target="_blank" rel="noopener noreferrer" className="hp-btn hp-btn-booking">
            Booking.com
          </a>
        )}
        {h.officialUrl && (
          <a href={h.officialUrl} target="_blank" rel="noopener noreferrer" className="hp-btn hp-btn-official">
            Official site
          </a>
        )}
      </div>
    </div>
  );
}

const BOOKED_HOTELS: Record<string, string> = {
  shibuya: "lyf Shibuya Tokyo",
  kumamoto: "Matsuya Bekkan",
  osaka: "Hotel Resol Trinity Osaka",
  tokyoFinal: "Sequence Miyashita Park",
};

export function HotelsView({ cities }: { cities: HotelCity[] }) {
  return (
    <div className="hp-page">
      <div className="hp-enso" aria-hidden="true" />
      <header className="hp-header">
        <Link href="/" className="hp-back">&larr; Presentation</Link>
        <h1 className="hp-title">Our Hotels</h1>
        <p className="hp-subtitle">
          4 hotels across 4 cities — all booked
        </p>
      </header>
      <main className="hp-cities">
        {cities.map((city) => {
          const bookedName = BOOKED_HOTELS[city.stayId];
          const booked = bookedName
            ? city.options.find((o) => o.name === bookedName)
            : null;
          if (!booked) return null;
          return (
            <section key={city.stayId} className="hp-city">
              <div className="hp-city-header">
                <h2 className="hp-city-name">{city.location}</h2>
                <div className="hp-city-meta">
                  <span>{city.nights} nights</span>
                  <span>{city.dates}</span>
                  {city.checkIn && city.checkOut && (
                    <span className="hp-city-dates">{city.checkIn} → {city.checkOut}</span>
                  )}
                </div>
                <p className="hp-city-purpose">{city.purpose}</p>
              </div>
              <div className="hp-grid">
                <HotelCard h={booked} />
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
