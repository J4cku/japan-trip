import { Suspense } from "react";
import Link from "next/link";
import tripData from "@/data/trip.json";
import type { TripData } from "@/types/trip";
import { MapLoader } from "@/components/map/MapLoader";

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
