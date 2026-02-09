import type { Metadata } from "next";
import tripData from "@/data/trip.json";
import type { TripData } from "@/types/trip";
import { HotelsView } from "@/components/hotels/HotelsView";

export const metadata: Metadata = {
  title: "Hotels & Ryokans",
  description: "Curated hotels and ryokans across 5 cities in Japan — Shibuya, Kumamoto, Onomichi, Osaka & Tokyo.",
  openGraph: {
    title: "Hotels & Ryokans — Japan 2026",
    description: "Curated stays across 5 cities in Japan.",
    images: [{ url: "/og-hotels.png", width: 1200, height: 630, alt: "Japan 2026 Hotels" }],
  },
  twitter: {
    images: ["/og-hotels.png"],
  },
};

const data = tripData as unknown as TripData;

const CITY_KEYS = ["shibuya", "kumamoto", "onomichi", "osaka", "tokyoFinal"] as const;

export default function HotelsPage() {
  const cities = CITY_KEYS.map((key) => data.hotels[key]).filter(
    (c) => c && typeof c === "object" && "options" in c
  );

  return <HotelsView cities={cities as TripData["hotels"][typeof CITY_KEYS[number]][]} />;
}
