import tripData from "@/data/trip.json";
import type { TripData, Travel, RestaurantLocation } from "@/types/trip";
import { HeroSlide } from "@/components/presentation/HeroSlide";
import { DaySlide } from "@/components/presentation/DaySlide";
import { ClosingSlide } from "@/components/presentation/ClosingSlide";
import { NavDots } from "@/components/presentation/NavDots";
import { ProgressBar } from "@/components/presentation/ProgressBar";
import { ScrollObserver } from "@/components/presentation/ScrollObserver";
import { ThemeToggle } from "@/components/presentation/ThemeToggle";
import Link from "next/link";

const data = tripData as unknown as TripData;

// Group travels by day for lookup
const travelsByDay: Record<number, Travel[]> = {};
(data.travels || []).forEach((t) => {
  if (!travelsByDay[t.day]) travelsByDay[t.day] = [];
  travelsByDay[t.day].push(t);
});

// Map day number → restaurant count for that area
const restaurantsByDay: Record<number, { count: number; locationId: string }> = {};
if (data.restaurants?.byLocation) {
  Object.entries(data.restaurants.byLocation).forEach(([id, loc]) => {
    (loc as RestaurantLocation).forDays.forEach((d) => {
      restaurantsByDay[d] = { count: (loc as RestaurantLocation).spots.length, locationId: id };
    });
  });
}

export default function PresentationPage() {
  const totalSlides = data.days.length + 2;

  return (
    <div
      id="snap-root"
      className="snap-container"
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

      <HeroSlide trip={data.trip} />
      {data.days.map((day, i) => (
        <DaySlide
          key={day.day}
          day={day}
          index={i}
          hotels={data.hotels}
          travels={travelsByDay[day.day]}
          restaurantInfo={restaurantsByDay[day.day]}
        />
      ))}
      <ClosingSlide stats={data.stats} totalDays={data.days.length} />

      <div className="fixed-links">
        <Link href="/itinerary" className="itinerary-link">
          Itinerary
        </Link>
        <Link href="/hotels" className="itinerary-link">
          Hotels
        </Link>
        <Link href="/restaurants" className="itinerary-link">
          Restaurants
        </Link>
      </div>
    </div>
  );
}
