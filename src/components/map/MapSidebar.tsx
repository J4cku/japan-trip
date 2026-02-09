"use client";
import type { Pin, PinCategory, PinStatus } from "@/types/trip";
import { MapFilters } from "./MapFilters";

const CATEGORY_ICONS: Record<string, string> = {
  temple: "\u{26E9}\uFE0F", shrine: "\u{26E9}\uFE0F", museum: "\u{1F3DB}\uFE0F",
  food: "\u{1F374}", shopping: "\u{1F6CD}\uFE0F", nature: "\u{1F33F}",
  park: "\u{1F333}", onsen: "\u{2668}\uFE0F", attraction: "\u{2B50}",
  hotel: "\u{1F3E8}", viewpoint: "\u{1F441}\uFE0F", neighborhood: "\u{1F4CD}",
  street: "\u{1F6B6}", bridge: "\u{1F309}",
};

const STATUS_COLOR: Record<PinStatus, string> = {
  matched: "#4a9",
  nearRoute: "#c4956a",
  offRoute: "#666",
};

interface MapSidebarProps {
  pins: Pin[];
  visiblePins: Pin[];
  statusFilters: Record<PinStatus, boolean>;
  onToggleStatus: (s: PinStatus) => void;
  categoryFilters: Set<PinCategory>;
  onToggleCategory: (c: PinCategory) => void;
  selectedDay: number | null;
  onSelectDay: (d: number | null) => void;
  totalDays: number;
  stats: { total: number; matched: number; nearRoute: number; offRoute: number };
  onFlyTo: (pin: Pin) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export function MapSidebar({
  visiblePins,
  statusFilters,
  onToggleStatus,
  categoryFilters,
  onToggleCategory,
  selectedDay,
  onSelectDay,
  totalDays,
  stats,
  onFlyTo,
  isOpen,
  onToggleOpen,
}: MapSidebarProps) {
  // Group visible pins by region
  const byRegion = visiblePins.reduce<Record<string, Pin[]>>((acc, pin) => {
    if (!acc[pin.region]) acc[pin.region] = [];
    acc[pin.region].push(pin);
    return acc;
  }, {});

  const regionKeys = Object.keys(byRegion).sort();

  return (
    <>
    <button className={`ms-toggle ${isOpen ? "ms-toggle-open" : ""}`} onClick={onToggleOpen}>
      {isOpen ? "\u{2715}" : "\u{2630}"} {!isOpen && <span className="ms-toggle-label">Filters</span>}
    </button>
    <div className={`map-sidebar ${isOpen ? "map-sidebar-open" : ""}`}>
      <div className="ms-inner">
        <MapFilters
          statusFilters={statusFilters}
          onToggleStatus={onToggleStatus}
          categoryFilters={categoryFilters}
          onToggleCategory={onToggleCategory}
          selectedDay={selectedDay}
          onSelectDay={onSelectDay}
          totalDays={totalDays}
          stats={stats}
        />

        <div className="ms-list">
          <div className="mf-label" style={{ marginBottom: 8 }}>
            {visiblePins.length} visible pins
          </div>
          {regionKeys.map((region) => (
            <div key={region} className="ms-region">
              <div className="ms-region-name">{region}</div>
              {byRegion[region].map((pin) => (
                <button
                  key={pin.id}
                  className="ms-pin"
                  onClick={() => onFlyTo(pin)}
                >
                  <span className="ms-pin-icon">{CATEGORY_ICONS[pin.category] || "\u{1F4CD}"}</span>
                  <span className="ms-pin-name">
                    {pin.name}
                    {pin.source === "itinerary" && <span className="ms-pin-src">ITN</span>}
                  </span>
                  <span
                    className="ms-pin-status"
                    style={{ color: STATUS_COLOR[pin.status] }}
                  >
                    {pin.status === "matched" ? "\u2713" : pin.status === "nearRoute" ? "\u25CB" : "\u00B7"}
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
