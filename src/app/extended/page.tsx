import tripData from "@/data/trip.json";
import type { TripData, Travel, RestaurantLocation, ExtendedDay } from "@/types/trip";
import { DaySlide } from "@/components/presentation/DaySlide";
import { NavDots } from "@/components/presentation/NavDots";
import { ProgressBar } from "@/components/presentation/ProgressBar";
import { ScrollObserver } from "@/components/presentation/ScrollObserver";
import { ThemeToggle } from "@/components/presentation/ThemeToggle";
import { WeatherOverlay } from "@/components/fun/WeatherOverlay";
import { SplitBanner } from "@/components/extended/SplitBanner";
import { OnsenGuide } from "@/components/extended/OnsenGuide";
import { TrailProfile } from "@/components/extended/TrailProfile";
import { Japan101Client } from "./Japan101Client";
import Link from "next/link";

export const metadata = {
  title: "Extended Trip — Japan 2026",
  description: "9 more days: Nara, Kyoto, Hakone, Japanese Alps & Nakasendo Trail.",
};

const data = tripData as unknown as TripData;
const ext = data.extended;

// Group travels by day
const travelsByDay: Record<number, Travel[]> = {};
(ext.travels || []).forEach((t) => {
  if (!travelsByDay[t.day]) travelsByDay[t.day] = [];
  travelsByDay[t.day].push(t);
});

// Extended restaurant counts by day
const restaurantsByDay: Record<number, { count: number; locationId: string }> = {};
if (ext.restaurants?.byLocation) {
  Object.entries(ext.restaurants.byLocation).forEach(([id, loc]) => {
    (loc as RestaurantLocation).forDays.forEach((d) => {
      restaurantsByDay[d] = { count: (loc as RestaurantLocation).spots.length, locationId: id };
    });
  });
}

export default function ExtendedPage() {
  const totalSlides = ext.days.length + 2; // hero + days + closing
  const ACCENT = "#c4956a";

  return (
    <div
      id="snap-root"
      className="snap-container extended-page"
      style={{
        backgroundColor: "var(--black)",
        color: "var(--white)",
        overflowX: "hidden",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <ProgressBar />
      <NavDots totalSlides={totalSlides} />
      <ScrollObserver />
      <ThemeToggle />
      <WeatherOverlay />
      <Japan101Client tips={ext.practicalTips} dietaryReminder={ext.dietaryReminder} />

      {/* Hero Slide */}
      <section className="slide hero" id="slide-0">
        <div className="hero-content">
          <p className="hero-pre">Extended Adventure</p>
          <h1 className="hero-title" style={{ color: ACCENT }}>+9 Days</h1>
          <p className="hero-jp" style={{ color: ACCENT }}>{"\u5EF6\u9577\u5192\u967A"}</p>
          <div className="hero-line" style={{ background: ACCENT }} />
          <p className="hero-meta">{ext.dates}<br />{ext.travelers} travelers &middot; {ext.extendedDays} days &middot; {ext.extendedNights} nights</p>
          <p className="hero-route">
            {ext.stays.map((s) => s.location).join(" \u2192 ")}
          </p>
          <SplitBanner isExtendedPage />
        </div>
      </section>

      {/* Day slides */}
      {ext.days.map((day, i) => {
        const extDay = day as ExtendedDay;
        let slideClass = "";
        if (extDay.isHikingDay) slideClass = "slide-hiking";
        if (extDay.onsenEtiquette) slideClass = "slide-onsen";

        return (
          <DaySlide
            key={day.day}
            day={day}
            index={i}
            travels={travelsByDay[day.day]}
            restaurantInfo={restaurantsByDay[day.day]}
            accentColor={ACCENT}
            slideClassName={slideClass}
          >
            {extDay.onsenEtiquette && <OnsenGuide etiquette={extDay.onsenEtiquette} />}
            {extDay.nakasendoTrail && <TrailProfile trail={extDay.nakasendoTrail} />}
          </DaySlide>
        );
      })}

      {/* Closing Slide */}
      <section className="slide closing" id={`slide-${totalSlides - 1}`}>
        <h2 className="closing-jp" style={{ color: ACCENT }}>{"\u3044\u3044\u65C5\u3092"}</h2>
        <p className="closing-sub">Have a wonderful journey</p>
        <div className="stats" style={{ marginTop: 32 }}>
          <div>
            <div className="stat-num" style={{ color: ACCENT }}>{ext.extendedDays}</div>
            <div className="stat-label">Extra days</div>
          </div>
          <div>
            <div className="stat-num" style={{ color: ACCENT }}>{ext.stays.length}</div>
            <div className="stat-label">Cities</div>
          </div>
          <div>
            <div className="stat-num" style={{ color: ACCENT }}>{ext.days.reduce((acc, d) => acc + (d.keyCost || 0), 0).toLocaleString()}<span className="suffix">{"\u00A5"}</span></div>
            <div className="stat-label">Est. costs</div>
          </div>
        </div>
      </section>

      <div className="fixed-links">
        <Link href="/" className="itinerary-link">Main Trip</Link>
        <Link href="/itinerary" className="itinerary-link">Itinerary</Link>
        <Link href="/hotels" className="itinerary-link">Hotels</Link>
        <Link href="/restaurants" className="itinerary-link">Restaurants</Link>
        <Link href="/map" className="itinerary-link">Map</Link>
        <Link href="/packing" className="itinerary-link">Packing</Link>
        <Link href="/flashcards" className="itinerary-link" style={{ borderColor: "rgba(188,143,183,0.3)", color: "#bc8fb7" }}>Flashcards</Link>
        <Link href="/stamps" className="itinerary-link" style={{ borderColor: "rgba(188,0,45,0.3)", color: "#bc002d" }}>Stamps</Link>
      </div>
    </div>
  );
}
