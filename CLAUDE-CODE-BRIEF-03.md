# Claude Code Brief 03: Interactive Map Page with Pins

## Context
This is the third brief for our Next.js 16 Japan trip itinerary app. Previous briefs covered hotels/ryokans (Brief 01) and restaurants + itinerary restructure (Brief 02). This brief adds an interactive map page that overlays all saved pins AND hotel proposal pins on a Japan map, classified by itinerary status — with the ability to mark a hotel as "chosen" from the proposals.

The root `japan-itinerary.json` now has a `pins` section with all the data needed.

## What's new in `japan-itinerary.json`

### `pins` section
252 pins total: 166 from Google Maps saves, 34 generated from itinerary activities, 4 extended-trip additions, and **48 hotel/ryokan proposal pins** — each with coordinates, category, region, and itinerary alignment status.

```typescript
interface Pin {
  id: number;
  name: string;
  nameJp?: string;              // Japanese name (hotels/ryokans)
  note: string | null;          // user's personal note (Polish) or hotel description
  lat: number;
  lng: number;
  googleMapsUrl: string | null;
  region: string;               // geographic region (see list below)
  category: PinCategory;
  status: "matched" | "nearRoute" | "offRoute";
  day: number | null;           // day number if matched
  dayLabel: string | null;      // e.g. "Day 4 — Mt Fuji"
  possibleDays: number[];       // for nearRoute: days when you're in that city
  possibleDayLabels: string[];
  extendedStatus?: PinStatus;   // status within extended trip
  extendedDay?: number | null;
  extendedDayLabel?: string | null;
  source?: "itinerary" | "hotels";  // "itinerary" = generated, "hotels" = hotel option
  hotelLocation?: string;       // hotels only: "shibuya"|"kumamoto"|"onomichi"|"osaka"|"tokyoFinal"
  chosen?: boolean;             // hotels only: true = selected as the booking choice
}

type PinCategory =
  | "temple" | "shrine" | "museum" | "food" | "shopping"
  | "nature" | "park" | "onsen" | "attraction" | "hotel"
  | "viewpoint" | "neighborhood" | "street" | "bridge"
  | "ryokan";

interface PinsData {
  source: string;
  exportDate: string;
  stats: { total: number; matched: number; nearRoute: number; offRoute: number };
  categories: PinCategory[];
  regions: string[];
  statusDescriptions: Record<string, string>;
  items: Pin[];
}
```

### Hotel options now have a `chosen` field
Every hotel option in the `hotels` section now has `"chosen": true|false`. The `travellerPick` options are pre-selected as defaults. When a user marks a hotel as chosen on the map, the corresponding `chosen` field should be toggled. **This is purely client-side state** — the JSON is the starting default.

Pre-selected hotels:
- **Shibuya**: lyf Shibuya Tokyo
- **Kumamoto**: OMO5 Kumamoto + Yamaga Onsen Seiryuso (ryokan)
- **Onomichi**: Hotel Cycle (U2) + Ryokan Nishiyama
- **Osaka**: Hotel Resol Trinity + Yamatoya Honten (ryokan)
- **Tokyo Final**: Hotel Metropolitan Marunouchi

**Pin statuses:**
- `matched` (114 pins) — already in our itinerary, linked to a specific day
- `nearRoute` (81 pins) — in a city we visit, could squeeze in
- `offRoute` (57 pins) — different region, would need a different trip

**Regions** (21): `tokyo`, `kamakura`, `fuji`, `hakone`, `kyushu`, `seto`, `kansai-osaka`, `kansai-kyoto`, `kansai-nara`, `hiroshima`, `nikko`, `alps`, `tohoku`, `gunma`, `fukui`, `kii`, `shikoku`, `awaji`, `lake-biwa`, `tango`, `narita`, `yokohama`

**Categories** (15): `temple`, `shrine`, `museum`, `food`, `shopping`, `nature`, `park`, `onsen`, `attraction`, `hotel`, `viewpoint`, `neighborhood`, `street`, `bridge`, `ryokan`

---

## Tasks

### Task 1: Sync `src/data/trip.json`
Copy root `japan-itinerary.json` → `src/data/trip.json`. Ensure the app builds.

### Task 2: Update TypeScript types (`src/types/trip.ts`)
Add the `Pin`, `PinsData` interfaces. Add `pins: PinsData` to `TripData`.

```typescript
export type PinCategory =
  | "temple" | "shrine" | "museum" | "food" | "shopping"
  | "nature" | "park" | "onsen" | "attraction" | "hotel"
  | "viewpoint" | "neighborhood" | "street" | "bridge";

export type PinStatus = "matched" | "nearRoute" | "offRoute";

export interface Pin {
  id: number;
  name: string;
  note: string | null;
  lat: number;
  lng: number;
  googleMapsUrl: string;
  region: string;
  category: PinCategory;
  status: PinStatus;
  day: number | null;
  dayLabel: string | null;
  possibleDays: number[];
  possibleDayLabels: string[];
}

export interface PinsData {
  source: string;
  exportDate: string;
  stats: { total: number; matched: number; nearRoute: number; offRoute: number };
  categories: PinCategory[];
  regions: string[];
  statusDescriptions: Record<PinStatus, string>;
  items: Pin[];
}
```

### Task 3: Build the `/map` page
Create `src/app/map/page.tsx` — an interactive map page showing all pins on a map of Japan.

**Map library:** Use **Leaflet** via `react-leaflet` (works great with static exports, no API key needed). Install: `npm install leaflet react-leaflet @types/leaflet`.

Alternatively, if you prefer zero dependencies: render an SVG map of Japan with pins plotted by lat/lng → pixel coordinate mapping. But Leaflet will be much better UX.

**Map setup:**
- Center: `[36.5, 137.0]` (central Japan)
- Default zoom: `6` (shows all of Japan)
- Tile layer: OpenStreetMap or a dark-themed tile (e.g. CartoDB Dark Matter: `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`) — dark tiles match our black UI
- Restrict bounds to Japan roughly: `[[24, 122], [46, 154]]`

**Pin rendering:**
Each pin is a circular marker on the map. Marker appearance by status:

| Status | Color | Opacity | Size | Border |
|---|---|---|---|---|
| `matched` | `#BC002D` (our red) | 1.0 | 12px | 2px white |
| `nearRoute` | `#c4956a` (warm gold) | 0.75 | 10px | 1px white |
| `offRoute` | `#888` (gray) | 0.4 | 8px | 1px #444 |

**Hotel/ryokan pins get special treatment:**
| State | Shape | Color | Size | Extra |
|---|---|---|---|---|
| Hotel (not chosen) | Square marker | `#555` | 10px | 1px dashed border |
| Hotel (chosen ⭐) | Square marker | `#BC002D` | 14px | 2px solid white + subtle glow |
| Ryokan (not chosen) | Diamond marker | `#555` | 10px | 1px dashed border |
| Ryokan (chosen ⭐) | Diamond marker | `#c4956a` | 14px | 2px solid white + subtle glow |

Use Leaflet `DivIcon` for hotel/ryokan pins (squares and diamonds via CSS `transform: rotate(45deg)` for diamonds). Regular pins use `CircleMarker`. Avoid default blue Leaflet markers.

**Category icons (optional enhancement):**
If using `DivIcon`, show a small emoji or icon inside the marker based on category:
- temple: ⛩️ (or use for shrines too)
- shrine: ⛩️
- museum: 🏛️
- food: 🍴
- shopping: 🛍️
- nature: 🌿
- park: 🌳
- onsen: ♨️
- attraction: ⭐
- hotel: 🏨
- ryokan: 🏯
- viewpoint: 👁️
- neighborhood: 📍
- street: 🚶
- bridge: 🌉

**Popup / tooltip on hover or click:**
When a user hovers over (desktop) or taps (mobile) a pin, show a popup with:
```
┌─────────────────────────────────┐
│ ⛩️  Fushimi Inari-Taisha        │
│ shrine · kyoto                  │
│                                 │
│ ✅ Day 12 — Kyoto               │  ← status-dependent
│                                 │
│ "ścieżka kapliczkami"           │  ← user note (if exists)
│                                 │
│ [Open in Google Maps ↗]         │  ← link to googleMapsUrl
└─────────────────────────────────┘
```

For `nearRoute` pins, show:
```
│ 🟡 Could visit on:              │
│    Day 10 — Dōtonbori           │
│    Day 11 — Castle & Markets    │
```

For `offRoute` pins, show:
```
│ ❌ Not on this trip's route      │
│    Region: nikko                 │
```

**Hotel/ryokan popup (special):**
Hotel pins get a richer popup with pricing, a description, and the "Choose this hotel" toggle:
```
┌─────────────────────────────────────┐
│ 🏨  lyf Shibuya Tokyo              │
│ ライフ渋谷東京                        │
│ hotel · shibuya · Days 1–4          │
│                                     │
│ Design-forward coliving lifestyle   │
│ hotel — €120–160/night              │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  ⭐  Chosen for this stay       │ │  ← green bg when chosen
│ │     [Change selection]          │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [View on Booking.com ↗]            │
│ [Open in Google Maps ↗]            │
└─────────────────────────────────────┘
```

When clicking "Change selection" (or clicking an unchosen hotel), it becomes the chosen hotel for that location. Only one hotel OR one ryokan can be chosen per location (think radio button per `hotelLocation` group — though user CAN choose one hotel + one ryokan for the same stay, e.g. Kumamoto has both OMO5 and Yamaga Onsen selected).

**Hotel selection is client-side state** — use React state (e.g. `useState` or a context) initialized from the JSON's `chosen` fields. No need to persist to disk. The visual effect: clicking a non-chosen hotel makes it "chosen" (fills in the marker, enlarges it), and optionally de-selects the previous choice in that location group. Show a brief toast/animation confirming the switch.

**Route overlay:**
Draw a polyline connecting the trip route cities in order using the `days` data. Use coordinates for major stops:
```
Tokyo (35.6762, 139.6503)
→ Kamakura (35.3197, 139.5466)  (day trip, return)
→ Kawaguchiko (35.5161, 138.7556)  (day trip, return)
→ Kumamoto (32.8032, 130.7079)
→ Aso (32.8842, 131.1041)  (day trip, return)
→ Kurokawa (33.0988, 131.0758)  (day trip, return)
→ Onomichi (34.4090, 133.2050)
→ Shimanami Kaido → Imabari (34.0660, 132.9976)
→ Osaka (34.6937, 135.5023)
→ Kyoto (35.0116, 135.7681)  (day trip, return)
→ Tokyo (35.6762, 139.6503)
→ Narita (35.7720, 140.3929)
```

Style: dashed line, color `#BC002D` with opacity 0.6, weight 2px. Day trips shown as short branches off the main route.

**Sidebar / control panel:**
A collapsible panel (left side on desktop, bottom sheet on mobile) with:

1. **Stats bar** at top:
   ```
   252 pins · ✅ 114 in plan · 🟡 81 nearby · ❌ 57 off-route · 🏨 48 hotels
   ```

2. **Filter by status** — three toggle buttons:
   - ✅ Matched (on by default)
   - 🟡 Near Route (on by default)
   - ❌ Off Route (off by default — show only when toggled)

3. **Filter by category** — pill/chip buttons for each of the 15 categories. All on by default. Clicking toggles visibility. `hotel` and `ryokan` categories should be visually grouped together.

4. **Filter by day** — dropdown or slider (1–13) that highlights pins for that day:
   - Matched pins on that day get a pulsing/glowing effect
   - NearRoute pins where `possibleDays` includes the selected day get highlighted
   - Hotel pins for that location get highlighted
   - All other pins dim to 20% opacity
   - The route segment for that day gets highlighted
   - "All days" option to reset

5. **Hotel layer toggle** — a dedicated toggle:
   ```
   🏨 Show hotels (48)  [ON/OFF]
   ```
   When ON, hotel/ryokan pins appear on the map. When OFF, they're hidden (keeps the map cleaner when you're not thinking about accommodation). **Default: OFF** — hotels are a secondary layer.

6. **Hotel summary panel** (shown when hotel layer is ON):
   A compact card per stay location showing the chosen hotel(s):
   ```
   ┌─ Shibuya (4N) ──────────────────┐
   │ ⭐ lyf Shibuya Tokyo    €120–160 │
   │   [Change ▾]                     │
   ├─ Kumamoto (3N) ─────────────────┤
   │ ⭐ OMO5 Kumamoto        €100–130 │
   │ ⭐ Yamaga Onsen Seiryuso  €180   │
   │   [Change ▾]                     │
   └──────────────────────────────────┘
   ```
   Clicking "Change" expands a dropdown showing all options for that location. Selecting one updates the chosen state and the map markers.

7. **Pin list** (scrollable, below filters):
   List all visible pins grouped by region. Each item shows: category icon, name, status badge. Clicking a pin in the list flies the map to that location and opens its popup. Hotel pins show a small ⭐ if chosen.

### Task 4: Mobile responsiveness
- On mobile (< 768px): map takes full viewport height, filters collapse into a bottom sheet that can be swiped up
- Pin popups should be sized for touch (min 44px tap targets)
- The "filter by day" could become a horizontal swipeable strip at the top
- Ensure Leaflet's touch zoom and gesture handling work properly

### Task 5: Add navigation link
Add a "Map" link (with 📍 or 🗺️ icon) alongside "View Itinerary", "Hotels", and "Restaurants" in the bottom-left nav of the presentation page (`src/app/page.tsx`).

### Task 6: Connect map to day slides
Optional but nice: when viewing the main presentation and clicking a day's slide, add a small "Show on map" link/button that navigates to `/map?day=X` — which auto-selects that day's filter and flies to the relevant area.

Similarly, on the map page, clicking a matched pin's day label could link to `/` with a hash like `#day-4` to scroll to that slide (if scroll-snap anchoring is set up).

---

## Design direction

**Aesthetic:**
- Dark-themed map tiles (CartoDB Dark Matter or similar) — matches our black `#000` background
- Red `#BC002D` for matched pins and route line — consistent with app theme
- Warm gold `#c4956a` for nearRoute (same as ryokan accent color)
- Gray `#888` for offRoute
- White text on dark backgrounds for popups and panels
- The map page should feel like an extension of the app, not a separate tool

**Transitions:**
- Flying to a pin location: use Leaflet's `flyTo` with duration 1.5s
- Filter toggles: pins should fade in/out with CSS transition (opacity 0.3s)
- Day filter: smooth opacity transitions, pulsing glow on active pins

**Typography:**
- Same Inter font as the rest of the app
- Pin names: 14px weight 500
- Notes: 12px weight 300 italic
- Status labels: 11px weight 600 uppercase

---

## Implementation notes

- **Static export compatible**: `react-leaflet` works fine with Next.js static export BUT Leaflet requires `window` — wrap the map component in a dynamic import with `ssr: false`:
  ```tsx
  import dynamic from 'next/dynamic';
  const Map = dynamic(() => import('@/components/map/MapView'), { ssr: false });
  ```
- **Leaflet CSS**: Import Leaflet's CSS in the map component or in `globals.css`:
  ```css
  @import "leaflet/dist/leaflet.css";
  ```
  Or link it in the head. Make sure the tiles render.
- **Custom markers**: Leaflet's default icon images won't work with Next.js static export. Use `CircleMarker` or `DivIcon` (HTML-based markers) to avoid the missing-icon issue entirely.
- **Performance**: 252 markers is fine for Leaflet, no clustering needed. But if you add clustering later, use `react-leaflet-cluster`.
- **Hotel selection state**: Initialize from JSON `chosen` fields. Store in React state (`useState` or context). No persistence to disk needed — it's a planning tool for comparing options. Consider `useReducer` for the selection logic since changing one hotel might deselect another in the same location group.
- **Tile attribution**: OpenStreetMap and CartoDB require attribution. Add it to the map.
- The `japan-itinerary.json` at root is the source of truth — do NOT modify it.

## File changes summary
```
MODIFIED: src/data/trip.json                  ← sync from root
MODIFIED: src/types/trip.ts                  ← add Pin, PinsData types (+ chosen, hotelLocation, source, nameJp)
MODIFIED: src/app/page.tsx                   ← add Map nav link
NEW:      src/app/map/page.tsx               ← map page (dynamic import wrapper)
NEW:      src/components/map/MapView.tsx      ← main Leaflet map component
NEW:      src/components/map/MapSidebar.tsx   ← filters + pin list panel
NEW:      src/components/map/PinPopup.tsx     ← popup content for each pin (+ hotel variant)
NEW:      src/components/map/RouteOverlay.tsx ← trip route polyline
NEW:      src/components/map/MapFilters.tsx   ← filter controls (status, category, day)
NEW:      src/components/map/HotelPanel.tsx   ← hotel summary + selection panel
NEW:      src/components/map/HotelMarker.tsx  ← square/diamond DivIcon markers for hotels
```

## Package additions
```bash
npm install leaflet react-leaflet
npm install -D @types/leaflet
```
