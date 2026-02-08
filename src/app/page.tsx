import tripData from "@/data/trip.json";
import type { TripData } from "@/types/trip";
import { HeroSlide } from "@/components/presentation/HeroSlide";
import { DaySlide } from "@/components/presentation/DaySlide";
import { ClosingSlide } from "@/components/presentation/ClosingSlide";
import { NavDots } from "@/components/presentation/NavDots";
import { ProgressBar } from "@/components/presentation/ProgressBar";
import { ScrollObserver } from "@/components/presentation/ScrollObserver";
import Link from "next/link";

const data = tripData as unknown as TripData;

export default function PresentationPage() {
  const totalSlides = data.days.length + 2;

  return (
    <div
      id="snap-root"
      className="snap-container"
      style={{
        background: "var(--black)",
        color: "var(--white)",
        overflowX: "hidden",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <ProgressBar />
      <NavDots totalSlides={totalSlides} />
      <ScrollObserver />

      <HeroSlide trip={data.trip} />
      {data.days.map((day, i) => (
        <DaySlide key={day.day} day={day} index={i} />
      ))}
      <ClosingSlide stats={data.stats} totalDays={data.days.length} />

      <Link
        href="/itinerary"
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          zIndex: 200,
          fontSize: "0.7rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--g3)",
          textDecoration: "none",
          padding: "8px 16px",
          border: "1px solid var(--g2)",
          borderRadius: 6,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(8px)",
          transition: "color 0.2s, border-color 0.2s",
        }}
      >
        View Itinerary
      </Link>
    </div>
  );
}
