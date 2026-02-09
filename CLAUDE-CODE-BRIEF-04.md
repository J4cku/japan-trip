# Claude Code Brief 04: Extended Trip (Split Group) + Map Pin Updates

## Context
The trip group of 4 splits on Day 13 (May 21). Jacek + Ola take the shinkansen to Tokyo and fly home May 22. The second couple stays an extra week (May 21–29), visiting Nara, deep Kyoto (3 nights), Hakone (2 nights, hiking + onsen), Matsumoto / Nakasendo trail (hiking), then Tokyo and home.

The root `japan-itinerary.json` now has a new top-level `extended` section with the full 9-day extended itinerary, plus pins have been updated with `extendedDay` / `extendedStatus` fields.

## What's new in `japan-itinerary.json`

### 1. New `extended` section
Contains the full extended trip data:
- `splitDay: 13`, `splitDate: "2026-05-21"` — when the group splits
- `splitNote` — describes who goes where
- `stays[]` — 5 stays (Osaka 1N, Kyoto 3N, Hakone 2N, Matsumoto 1N, Tokyo 1N)
- `days[]` — 9 days (Day 13–21), each with full activities, transport, food, tips
- `travels[]` — 5 travel segments with animation hints
- `restaurants.byLocation` — 10 new restaurant spots across 3 locations (kyotoExtended, hakone, matsumoto) with survival tips
- `practicalTips` — extra guidance for less-experienced travelers
- `bookAhead[]` — critical bookings (Saihō-ji, TOUSUIRO, ryokan)
- `pinsUnlocked[]` — summary of which off-route pins become reachable
- `onsenEtiquette` (on Day 17) — detailed rules for first-time onsen visitors
- `nakasendoTrail` (on Day 20) — hiking details with what-to-pack list

### 2. Pins updated with extended trip fields
33 pins that were `offRoute` or `nearRoute` now have:
```json
{
  "extendedStatus": "matched",     // matched in extended itinerary
  "extendedDay": 18,               // which extended day
  "extendedDayLabel": "Day 18 (ext) — Hakone Hiking"
}
```
This lets the map show which "off-route" pins become reachable during the extended trip.

### 3. TypeScript types needed

```typescript
export interface ExtendedDay {
  day: number;
  date: string;
  dateLabel: string;
  title: string;
  region: string;
  tagline: string;
  stay: string | null;
  splitNote?: string;          // only on Day 13
  highlights: string[];
  activities: Activity[];
  transport: Transport;
  food: string;
  tip: string;
  keyCost?: number;
  isHikingDay?: boolean;
  bookAhead?: string[];
  onsenEtiquette?: {
    rules: string[];
    tip: string;
  };
  nakasendoTrail?: {
    distance: string;
    duration: string;
    difficulty: string;
    elevationStart: number;
    elevationPass: number;
    elevationEnd: number;
    terrain: string;
    whatToPack: string[];
  };
}

export interface ExtendedStay {
  location: string;
  nights: number;
  dates: string;
  area: string;
  note: string;
}

export interface ExtendedTravel {
  id: string;
  day: number;
  from: TravelPoint;
  to: TravelPoint;
  mode: string;
  icon: string;
  animation: string;
  duration: string;
  distance: string;
  cost: number;
  roundTrip?: boolean;
  details: string;
}

export interface ExtendedTrip {
  note: string;
  travelers: number;
  rooms: number;
  splitDay: number;
  splitDate: string;
  splitNote: string;
  dates: string;
  extendedDays: number;
  extendedNights: number;
  returnFlight: {
    from: string;
    to: string;
    date: string;
    departs: string;
    note: string;
  };
  dietaryReminder: string;
  stays: ExtendedStay[];
  days: ExtendedDay[];
  travels: ExtendedTravel[];
  restaurants: {
    note: string;
    byLocation: Record<string, RestaurantLocation>;
  };
  practicalTips: {
    forLessExperienced: string[];
    emergencyFood: string[];
    jrPassNote: string;
  };
  bookAhead: Booking[];
  pinsUnlocked: string[];
}
```

Add `extended: ExtendedTrip` to `TripData`.

Add to `Pin`:
```typescript
extendedStatus?: PinStatus;
extendedDay?: number;
extendedDayLabel?: string;
```

---

## Tasks

### Task 1: Sync `src/data/trip.json`
Copy root `japan-itinerary.json` → `src/data/trip.json`. Ensure the app builds.

### Task 2: Update TypeScript types
Add all extended trip interfaces to `src/types/trip.ts`. Add `extended` to `TripData`. Add extended fields to `Pin`.

### Task 3: Add split indicator to Day 13 slide
On the main presentation's Day 13 slide (`DaySlide.tsx`), add a visual "split" indicator:
- A horizontal divider or banner that says something like:
  ```
  ✂️ Group splits here
  Jacek + Ola → Tokyo → Warsaw
  Extended couple → Nara → Kyoto → Hakone → Alps
  ```
- Use a scissors icon or dashed line motif
- Below the split line, show a teaser: "Extended trip continues → 9 more days"
- Link to the extended itinerary page

### Task 4: Build `/extended` page
Create `src/app/extended/page.tsx` — a dedicated page for the extended couple's itinerary.

**Design direction:**
- Same Apple-style scroll-snap presentation as the main page, but with a different accent color to distinguish it. Suggestion: warm gold `#c4956a` instead of red `#BC002D` for headings and accents — signaling "this is a different path"
- Hero slide: "Extended Adventure · May 21–29" with the route overview
- Day slides for all 9 days, same `DaySlide` component structure
- TransportStrip between days
- Special visual treatment for:
  - **Hiking days** (Days 15, 18, 20) — mountain/trail icon, different background tint
  - **Onsen day** (Day 17) — ♨️ badge, warm tint
  - **Split day** (Day 13) — clear visual showing "this is where you diverge"
- Closing slide with stats for extended trip

**Important content to surface prominently:**
- The `onsenEtiquette` rules on Day 17 — these travelers haven't done onsen before. Render as a visual checklist or card, not buried in text.
- The `nakasendoTrail` details on Day 20 — show the elevation profile, what-to-pack list, and trail tips visually
- The `dietaryReminder` — show the allergy card prominently on every day
- The `practicalTips.forLessExperienced` — render as a "Japan 101" card accessible from any slide

### Task 5: Extended restaurants section
Either add extended restaurants to the existing `/restaurants` page (in a separate "Extended Trip" tab/section), or create a sub-section on the `/extended` page. The extended restaurants include:
- `kyotoExtended` (5 spots for Days 14-16)
- `hakone` (2 spots + survival tips for Days 17-18)
- `matsumoto` (3 spots + survival tips for Days 19-21)

Note: The main trip already has Kyoto restaurants for the shared Day 12 — the extended Kyoto restaurants are ADDITIONAL spots for the deeper stay.

### Task 6: Update map page for extended trip
On the `/map` page, add an "Extended Trip" toggle:
- When enabled, pins with `extendedStatus === "matched"` should light up (using the warm gold color instead of red)
- Show the extended route overlay (Osaka → Nara → Kyoto → Hakone → Matsumoto → Tokyo) in gold dashed line
- Day filter should extend to Day 21 when toggle is on
- Pin popups should show both main trip status AND extended status where applicable
- Off-route pins that become matched in extended trip should visually transition (e.g., gray → gold)

### Task 7: Navigation updates
- Add "Extended Trip" link to the nav (alongside Itinerary, Hotels, Restaurants, Map)
- On the main presentation's Day 13 slide, add a CTA button: "Continue to Extended Trip →"
- On the extended page, add a "← Back to Main Trip" link

---

## Design tokens

**Extended trip accent color** (to distinguish from main trip):
```css
--ext-accent: #c4956a;        /* warm gold — same as ryokan accent */
--ext-accent-light: #e8d5c0;  /* light warm cream */
--ext-accent-dark: #2a1f14;   /* dark warm brown */
```

**Hiking day treatment:**
```css
--hiking-green: #2d5a27;      /* forest green accent */
--hiking-bg: #1a2e17;         /* dark green tint */
```

**Onsen treatment:**
```css
--onsen-warm: #3d2b1f;        /* warm brown bg */
--onsen-steam: #c4956a;       /* steam/gold accent */
```

---

## Route coordinates for extended map overlay
```
Osaka (34.6937, 135.5023)
→ Nara (34.6851, 135.8049)     Day 13 (round trip)
→ Kyoto (35.0116, 135.7681)    Days 14-16
  ↳ Kurama (35.1182, 135.7697) Day 15 (day trip)
  ↳ Saihō-ji (34.9920, 135.6840) Day 16 (day trip)
→ Hakone (35.2330, 139.0600)   Days 17-18
  ↳ Lake Ashi (35.2060, 139.0290) Day 18
  ↳ Owakudani (35.2431, 139.0213) Day 18
→ Matsumoto (36.2388, 137.9688) Day 19
  ↳ Magome (35.5310, 137.5682) Day 20
  ↳ Tsumago (35.5796, 137.5951) Day 20
→ Tokyo (35.6762, 139.6503)     Day 21
→ Narita (35.7720, 140.3929)    Day 21
```

## File changes summary
```
MODIFIED: src/data/trip.json                    ← sync from root
MODIFIED: src/types/trip.ts                     ← add Extended types + Pin extended fields
MODIFIED: src/components/presentation/DaySlide.tsx ← split indicator on Day 13
MODIFIED: src/app/page.tsx                      ← Extended Trip nav link
MODIFIED: src/app/map/page.tsx                  ← extended trip toggle + gold overlay
MODIFIED: src/app/restaurants/page.tsx           ← extended restaurants section
NEW:      src/app/extended/page.tsx             ← extended trip presentation page
NEW:      src/components/extended/              ← extended-specific components
NEW:      src/components/extended/SplitBanner.tsx  ← visual split indicator
NEW:      src/components/extended/OnsenGuide.tsx   ← onsen etiquette card
NEW:      src/components/extended/TrailProfile.tsx ← Nakasendo trail info
NEW:      src/components/extended/Japan101.tsx     ← practical tips for beginners
```

## Package additions
None (reuses existing dependencies).

## Important notes
- The extended days are numbered 13-21 (continuing from the main trip's numbering)
- Day 13 exists in BOTH the main trip (Osaka→Tokyo) and extended trip (Nara) — the UI needs to show both versions clearly
- The `japan-itinerary.json` at root is the source of truth — do NOT modify it
- Extended data is at `data.extended` — not mixed into the main `data.days` array
- Pins have BOTH `status` (main trip) and `extendedStatus` (extended trip) — use the appropriate one based on which view is active
