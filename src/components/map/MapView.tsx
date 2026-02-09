"use client";
import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Pin, PinCategory, PinStatus, PinsData } from "@/types/trip";
import { PinPopup } from "./PinPopup";
import { RouteOverlay } from "./RouteOverlay";
import { MapSidebar } from "./MapSidebar";

const STATUS_STYLE: Record<PinStatus, { color: string; radius: number; opacity: number; borderColor: string; borderWidth: number }> = {
  matched:   { color: "#BC002D", radius: 6, opacity: 1.0, borderColor: "#fff", borderWidth: 2 },
  nearRoute: { color: "#c4956a", radius: 5, opacity: 0.75, borderColor: "#fff", borderWidth: 1 },
  offRoute:  { color: "#888",    radius: 4, opacity: 0.4, borderColor: "#444", borderWidth: 1 },
};

function FlyToHandler({ target }: { target: { lat: number; lng: number } | null }) {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo([target.lat, target.lng], 14, { duration: 1.5 });
    }
  }, [map, target]);
  return null;
}

function InitialDayHandler({ day, pins }: { day: number | null; pins: Pin[] }) {
  const map = useMap();
  const hasFlown = useRef(false);
  useEffect(() => {
    if (day !== null && !hasFlown.current) {
      hasFlown.current = true;
      const dayPins = pins.filter(
        (p) => (p.status === "matched" && p.day === day) ||
               (p.status === "nearRoute" && p.possibleDays.includes(day))
      );
      if (dayPins.length > 0) {
        const bounds = dayPins.map((p) => [p.lat, p.lng] as [number, number]);
        const L = require("leaflet");
        map.flyToBounds(L.latLngBounds(bounds).pad(0.3), { duration: 1.5 });
      }
    }
  }, [day, pins, map]);
  return null;
}

interface MapViewProps {
  pinsData: PinsData;
  totalDays: number;
  initialDay?: number | null;
}

export default function MapView({ pinsData, totalDays, initialDay = null }: MapViewProps) {
  const allPins = pinsData.items;
  const mapRef = useRef<LeafletMap | null>(null);

  const [statusFilters, setStatusFilters] = useState<Record<PinStatus, boolean>>({
    matched: true,
    nearRoute: true,
    offRoute: false,
  });
  const [categoryFilters, setCategoryFilters] = useState<Set<PinCategory>>(
    () => new Set(pinsData.categories as PinCategory[])
  );
  const [selectedDay, setSelectedDay] = useState<number | null>(initialDay);
  const [flyTarget, setFlyTarget] = useState<{ lat: number; lng: number } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleStatus = useCallback((s: PinStatus) => {
    setStatusFilters((prev) => ({ ...prev, [s]: !prev[s] }));
  }, []);

  const toggleCategory = useCallback((c: PinCategory) => {
    setCategoryFilters((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  }, []);

  const visiblePins = useMemo(() => {
    return allPins.filter((pin) => {
      if (!statusFilters[pin.status]) return false;
      if (!categoryFilters.has(pin.category)) return false;
      return true;
    });
  }, [allPins, statusFilters, categoryFilters]);

  const getPinOpacity = useCallback((pin: Pin) => {
    if (selectedDay === null) return STATUS_STYLE[pin.status].opacity;
    const isActive =
      (pin.status === "matched" && pin.day === selectedDay) ||
      (pin.status === "nearRoute" && pin.possibleDays.includes(selectedDay));
    return isActive ? 1.0 : 0.15;
  }, [selectedDay]);

  const handleFlyTo = useCallback((pin: Pin) => {
    setFlyTarget({ lat: pin.lat, lng: pin.lng });
    setSidebarOpen(false);
  }, []);

  return (
    <div className="map-page">
      <MapSidebar
        pins={allPins}
        visiblePins={visiblePins}
        statusFilters={statusFilters}
        onToggleStatus={toggleStatus}
        categoryFilters={categoryFilters}
        onToggleCategory={toggleCategory}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
        totalDays={totalDays}
        stats={pinsData.stats}
        onFlyTo={handleFlyTo}
        isOpen={sidebarOpen}
        onToggleOpen={() => setSidebarOpen((o) => !o)}
      />

      <MapContainer
        center={[36.5, 137.0]}
        zoom={6}
        maxBounds={[[24, 122], [46, 154]]}
        maxBoundsViscosity={1.0}
        minZoom={5}
        maxZoom={18}
        style={{ width: "100%", height: "100%", background: "#0d1117" }}
        ref={mapRef}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <RouteOverlay selectedDay={selectedDay} />
        <FlyToHandler target={flyTarget} />
        <InitialDayHandler day={initialDay} pins={allPins} />

        {visiblePins.map((pin) => {
          const style = STATUS_STYLE[pin.status];
          const opacity = getPinOpacity(pin);
          const isGlowing =
            selectedDay !== null &&
            pin.status === "matched" &&
            pin.day === selectedDay;

          return (
            <CircleMarker
              key={pin.id}
              center={[pin.lat, pin.lng]}
              radius={style.radius}
              pathOptions={{
                fillColor: style.color,
                fillOpacity: opacity,
                color: style.borderColor,
                weight: style.borderWidth,
                opacity: opacity,
                className: isGlowing ? "pin-glow" : undefined,
              }}
            >
              <Popup
                closeButton={false}
                className="map-popup"
              >
                <PinPopup pin={pin} />
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
