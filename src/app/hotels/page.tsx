import tripData from "@/data/trip.json";
import type { TripData } from "@/types/trip";
import { HotelsView } from "@/components/hotels/HotelsView";

const data = tripData as unknown as TripData;

const CITY_KEYS = ["shibuya", "kumamoto", "onomichi", "osaka", "tokyoFinal"] as const;

export default function HotelsPage() {
  const cities = CITY_KEYS.map((key) => data.hotels[key]).filter(
    (c) => c && typeof c === "object" && "options" in c
  );

  return <HotelsView cities={cities as TripData["hotels"][typeof CITY_KEYS[number]][]} />;
}
