import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import tripData from "@/data/trip.json";
import type { TripData } from "@/types/trip";
import { MapLoader } from "@/components/map/MapLoader";

export const metadata: Metadata = {
  title: "Map",
  description: "166 saved pins across Japan — temples, shrines, restaurants & more on an interactive map.",
  openGraph: {
    title: "Map — Japan 2026",
    description: "166 saved pins across Japan — temples, shrines, restaurants & more.",
    images: [{ url: "/og-map.png", width: 1200, height: 630, alt: "Japan 2026 Map" }],
  },
  twitter: {
    images: ["/og-map.png"],
  },
};

const data = tripData as unknown as TripData;

export default function MapPage() {
  return (
    <>
      <Link href="/" className="map-back">
        &larr; Back
      </Link>
      <Suspense>
        <MapLoader
          pinsData={data.pins}
          totalDays={data.days.length}
        />
      </Suspense>
    </>
  );
}
