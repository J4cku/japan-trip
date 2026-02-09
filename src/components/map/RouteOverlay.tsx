"use client";
import { Polyline } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

const MAIN_ROUTE: LatLngExpression[] = [
  [35.6762, 139.6503],  // Tokyo
  [32.8032, 130.7079],  // Kumamoto
  [34.4090, 133.2050],  // Onomichi
  [34.0660, 132.9976],  // Imabari
  [34.6937, 135.5023],  // Osaka
  [35.6762, 139.6503],  // Tokyo (return)
  [35.7720, 140.3929],  // Narita
];

const DAY_TRIPS: { from: LatLngExpression; to: LatLngExpression }[] = [
  { from: [35.6762, 139.6503], to: [35.3197, 139.5466] },  // Tokyo → Kamakura
  { from: [35.6762, 139.6503], to: [35.5161, 138.7556] },  // Tokyo → Kawaguchiko
  { from: [32.8032, 130.7079], to: [32.8842, 131.1041] },  // Kumamoto → Aso
  { from: [32.8032, 130.7079], to: [33.0988, 131.0758] },  // Kumamoto → Kurokawa
  { from: [34.6937, 135.5023], to: [35.0116, 135.7681] },  // Osaka → Kyoto
];

interface RouteOverlayProps {
  selectedDay: number | null;
}

export function RouteOverlay({ selectedDay }: RouteOverlayProps) {
  const isHighlighted = selectedDay !== null;
  const mainOpacity = isHighlighted ? 0.3 : 0.6;
  const dayTripOpacity = isHighlighted ? 0.2 : 0.45;

  return (
    <>
      <Polyline
        positions={MAIN_ROUTE}
        pathOptions={{
          color: "#BC002D",
          weight: 2,
          opacity: mainOpacity,
          dashArray: "8,6",
        }}
      />
      {DAY_TRIPS.map((trip, i) => (
        <Polyline
          key={i}
          positions={[trip.from, trip.to]}
          pathOptions={{
            color: "#BC002D",
            weight: 1.5,
            opacity: dayTripOpacity,
            dashArray: "4,4",
          }}
        />
      ))}
    </>
  );
}
