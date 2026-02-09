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

const EXTENDED_ROUTE: LatLngExpression[] = [
  [34.6937, 135.5023],  // Osaka
  [34.6851, 135.8048],  // Nara
  [35.0116, 135.7681],  // Kyoto
  [35.1280, 135.7700],  // Kurama
  [35.2367, 139.0530],  // Hakone/Odawara area
  [35.2047, 139.0229],  // Lake Ashi
  [35.2473, 139.0237],  // Owakudani
  [36.2381, 137.9720],  // Matsumoto
  [35.5275, 137.5692],  // Magome
  [35.5789, 137.5975],  // Tsumago
  [35.6762, 139.6503],  // Tokyo
  [35.7720, 140.3929],  // Narita
];

interface RouteOverlayProps {
  selectedDay: number | null;
  showExtended?: boolean;
}

export function RouteOverlay({ selectedDay, showExtended = false }: RouteOverlayProps) {
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
      {showExtended && (
        <Polyline
          positions={EXTENDED_ROUTE}
          pathOptions={{
            color: "#c4956a",
            weight: 2,
            opacity: isHighlighted ? 0.3 : 0.6,
            dashArray: "6,8",
          }}
        />
      )}
    </>
  );
}
