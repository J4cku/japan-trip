# Claude Code Brief 02: Itinerary Restructure + Restaurants + Data Sync

## What changed in `japan-itinerary.json`

### 1. Itinerary restructured — Nara removed, Kurokawa Onsen added
The day order has changed significantly. Nara day trip is gone. An extra Kyushu day (Kurokawa Onsen day trip) was added. All dates from Day 7 onward shifted.

**New day structure:**
```
Day  1 | May  9 | Arrival in Tokyo
Day  2 | May 10 | TeamLab & Harajuku
Day  3 | May 11 | Kamakura
Day  4 | May 12 | Mt Fuji
Day  5 | May 13 | Tokyo → Kumamoto (flight)
Day  6 | May 14 | Mt Aso & Bike Ride
Day  7 | May 15 | Kurokawa Onsen         ← NEW
Day  8 | May 16 | Kumamoto → Onomichi    ← was Day 7
Day  9 | May 17 | Shimanami Kaido → Osaka ← was Day 8
Day 10 | May 18 | Osaka — Dōtonbori      ← was Day 9
Day 11 | May 19 | Osaka — Castle & Markets ← was Day 10
Day 12 | May 20 | Kyoto day trip          ← was Day 11
Day 13 | May 21 | Osaka → Tokyo           (unchanged)
Day 14 | May 22 | Departure               (unchanged)
```

**Nara is completely removed** — no day entry, no travel entry.

### 2. Stays updated
```
Shibuya:   4 nights (May 9–12)    — unchanged
Kumamoto:  3 nights (May 13–15)   — was 2, now 3
Onomichi:  1 night  (May 16)      — shifted +1 day
Osaka:     4 nights (May 17–20)   — was 5, now 4
Tokyo:     1 night  (May 21)      — unchanged
```

### 3. Hotel dates shifted
All hotel `checkIn`/`checkOut` dates, `bookingUrl` query params, `searchParams.nights`, and `totalPerRoom` amounts have been updated to match the new dates. Kumamoto now has 3-night totals, Osaka has 4-night totals.

### 4. Travels updated
- **Added:** `kumamoto-kurokawa` (Day 7, bus, `bus-mountain` animation)
- **Removed:** `osaka-nara`
- **Day numbers shifted:** `kumamoto-onomichi` → Day 8, `onomichi-imabari` → Day 9, `imabari-osaka` → Day 9, `osaka-kyoto` → Day 12

### 5. New `restaurants` section added
Major new data section with 21 restaurant recommendations organized by location:

```typescript
interface Restaurant {
  name: string;
  nameJp: string;
  cuisine: string;
  neighborhood: string;
  price: "¥" | "¥¥" | "¥¥¥";
  gf: boolean;       // gluten-free safe
  vegan: boolean;
  vegetarian: boolean;
  mustTry: string;
  note: string;
  url: string;
}

interface RestaurantLocation {
  label: string;
  forDays: number[];     // which days these restaurants are relevant for
  spots: Restaurant[];
  survivalTips?: string;         // for limited areas (Kumamoto)
  cyclingFuelGuide?: {           // for Onomichi/Shimanami
    whatToPack: string[];
    konbiniStops: string;
    tip: string;
  };
}

interface Restaurants {
  note: string;
  allergyCardJp: string;        // Japanese allergy card text
  allergyCardEn: string;
  safeFoods: string[];           // always-safe food list
  dangerFoods: string[];         // watch-out foods
  apps: string[];                // useful apps
  byLocation: Record<string, RestaurantLocation>;
}
```

Locations: `tokyo` (7 spots), `kumamoto` (3 spots + survival tips), `onomichi` (2 spots + cycling fuel guide), `osaka` (4 spots), `kyoto` (5 spots)

### 6. Stats updated
- Removed Nara reference
- Added "3 Onsen baths" stat (Kurokawa rotenburo meguri)

---

## Tasks

### Task 1: Sync `src/data/trip.json`
Copy root `japan-itinerary.json` → `src/data/trip.json`. Ensure the app builds.

### Task 2: Update TypeScript types (`src/types/trip.ts`)
Add the `Restaurant`, `RestaurantLocation`, and `Restaurants` interfaces. Add `restaurants: Restaurants` to `TripData`.

### Task 3: Build a `/restaurants` page
Create `src/app/restaurants/page.tsx` — a dedicated dining guide page.

**Design direction:**
- Same black/white/red (#BC002D) color scheme
- Sections by location, each with a sticky header showing location name + relevant days
- Each restaurant card shows:
  - Name (English + Japanese)
  - Cuisine type
  - Price range (¥ symbols)
  - Three badges: GF (green if true, red if false), Vegan, Vegetarian
  - `mustTry` as a highlighted callout
  - `note` as smaller detail text
  - Link to `url`
- For Kumamoto: show the `survivalTips` as a callout box
- For Onomichi: show the `cyclingFuelGuide` as a visual checklist (what to pack, konbini strategy)
- At the top of the page: show the `allergyCardJp` in large Japanese text with a "copy to clipboard" button — travelers can show this to restaurant staff
- Also show `safeFoods` and `dangerFoods` as two columns (green checkmarks vs red X marks)
- Mobile responsive

### Task 4: Add restaurant hints to DaySlide
In `DaySlide.tsx`, add a small food icon/chip at the bottom of each slide that shows the number of restaurant recommendations available for that day. Something like:

```
🍴 4 dining spots for this area
```

This could link to the `/restaurants` page filtered to the relevant location, or open a mini-overlay.

To determine which restaurants apply to a given day: check `restaurants.byLocation[location].forDays` array — if it includes the current `day.day`, those restaurants are relevant.

### Task 5: Update `src/data/luggage-tags.ts`
The luggage tag positions map day numbers to cities. With Day 7 now being Kurokawa and all subsequent days shifted, the luggage tag mappings need updating:
- Day 7: Kurokawa/Kumamoto
- Day 8: Onomichi (was Day 7)
- Day 9: Shimanami/Osaka (was Day 8)
- Days 10-11: Osaka (were Days 9-10)
- Day 12: Kyoto (was Day 11)
- Remove any Day 12 Nara tag

Also update `DAY_HOTEL_KEY` mappings since hotel lookups are tied to day numbers.

### Task 6: Add navigation links
Add "Restaurants" link alongside "View Itinerary" and "Hotels" at the bottom-left of the presentation page. Use 🍴 icon or similar.

---

## Important implementation notes

- The `japan-itinerary.json` at project root is the source of truth — do NOT modify it
- `forDays` arrays in restaurants map to `day.day` numbers — use these to connect restaurant data to day slides
- The `allergyCardJp` string is real Japanese that can be shown to staff — render it large and legible
- `gf: true` means the restaurant can safely accommodate celiac — `gf: false` means it's vegetarian/vegan but uses soy sauce with wheat
- The cycling fuel guide for Onomichi is important safety info — make it visually prominent, not hidden
- Kurokawa Onsen (Day 7) uses `bus-mountain` animation in travels — same as the Kawaguchiko bus

## File changes summary
```
MODIFIED: src/data/trip.json          ← sync from root
MODIFIED: src/types/trip.ts           ← add Restaurant types
MODIFIED: src/components/presentation/DaySlide.tsx  ← restaurant hints
MODIFIED: src/data/luggage-tags.ts    ← shift day mappings
MODIFIED: src/app/page.tsx            ← add Restaurants nav link
NEW:      src/app/restaurants/page.tsx ← dining guide page
NEW:      src/components/restaurants/  ← components for restaurant page
```
