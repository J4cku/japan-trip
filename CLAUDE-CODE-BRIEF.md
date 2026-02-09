# Claude Code Brief: Hotels Page + Ryokan Support + Data Sync

## Context
This is a Next.js 16 app (static export) for a Japan trip itinerary. It uses scroll-snap presentation slides with Apple-style animations. The data source of truth is `japan-itinerary.json` at the project root. There's also `src/data/trip.json` which the app currently imports — these need to be synced.

## What changed in the data
The root `japan-itinerary.json` has been significantly updated. Here's what's new since the last `src/data/trip.json` sync:

### 1. Hotels now have `"type": "hotel"` or `"type": "ryokan"` on every option
Ryokans also have a `ryokanDetails` object:
```json
{
  "type": "ryokan",
  "ryokanDetails": {
    "onsen": true,
    "onsenType": "Private open-air onsen in every room",
    "privateBath": true,
    "rotenburo": true,
    "meals": "Kaiseki dinner and breakfast included",
    "tatami": true,
    "futon": true,
    "yukata": true
  },
  "dietaryNote": "Contact 2+ weeks ahead for vegetarian kaiseki."
}
```
Hotels just have `"type": "hotel"` with no `ryokanDetails`.

### 2. Each hotel city now has booking dates
```json
{
  "stayId": "shibuya",
  "checkIn": "2026-05-09",
  "checkOut": "2026-05-13",
  "searchParams": { "adults": 4, "rooms": 2, "nights": 4 },
  "pricingNote": "May 2026 rates not yet live..."
}
```

### 3. Each hotel option now has `bookingUrl`, `officialUrl`, `totalPerRoom`
```json
{
  "bookingUrl": "https://www.booking.com/hotel/jp/lyf-shibuya-tokyo.html?checkin=2026-05-09&checkout=2026-05-13&group_adults=4&no_rooms=2",
  "officialUrl": "https://www.discoverasr.com/en/lyf/japan/lyf-shibuya-tokyo",
  "totalPerRoom": "€480–640 (4 nights)"
}
```

### 4. New `travels` array with animation hints
```json
{
  "id": "tokyo-kumamoto",
  "day": 5,
  "from": { "name": "Tokyo", "area": "Haneda", "code": "HND" },
  "to": { "name": "Kumamoto", "code": "KMJ" },
  "mode": "plane",
  "icon": "plane",
  "animation": "plane-domestic",
  "duration": "1h50",
  "distance": "900 km"
}
```
Modes: `plane`, `shinkansen`, `train`, `bus`, `bike`
Animations: `plane-long-haul`, `plane-domestic`, `shinkansen`, `train-local`, `train-mountain`, `train-bridge`, `bus-mountain`, `bike-island`

### 5. Day 5 changed from shinkansen to flight (HND → KMJ)

---

## Tasks (in priority order)

### Task 1: Sync data
Copy `japan-itinerary.json` content into `src/data/trip.json` (or better: import directly from the root file). Make sure the app builds.

### Task 2: Update TypeScript types (`src/types/trip.ts`)
Add these to `HotelOption`:
```typescript
type?: "hotel" | "ryokan";
ryokanDetails?: {
  onsen?: boolean;
  onsenType?: string;
  privateBath?: boolean;
  rotenburo?: boolean;
  communalBath?: boolean;
  meals?: string;
  drinks?: string;
  bikeRental?: string;
  tatami?: boolean;
  futon?: boolean;
  yukata?: boolean;
  privateBathInRoom?: boolean;
};
dietaryNote?: string;
shimanamiReady?: boolean;
naritaAccess?: string;
```

Add to `HotelCity`:
```typescript
checkIn?: string;
checkOut?: string;
searchParams?: { adults: number; rooms: number; nights: number };
pricingNote?: string;
```

### Task 3: Update HotelModal to differentiate ryokans
The existing `HotelModal.tsx` renders all options identically. Add visual differentiation:

**For ryokan cards (`type === "ryokan"`):**
- Add a distinct visual treatment — different border color, a ♨️ badge, or a subtle warm background tint (think warm beige vs the current dark cards for hotels)
- Show `ryokanDetails` as icon chips/pills below the price:
  - ♨️ if `onsen`
  - 🔒 if `privateBath` (label: "Private bath")
  - 🌿 if `rotenburo` (label: "Outdoor bath")
  - 🍱 if `meals` (show the meals text)
  - 👘 if `yukata`
  - If `onsenType` exists, show it as a subtitle under the chips
- Show `dietaryNote` as a small italic note at the bottom of the card
- The card class should be `hotel-card hotel-ryokan` (in addition to `hotel-pick` if applicable)

**For hotel cards (`type === "hotel"`):**
- Keep current styling, just add `hotel-card hotel-standard` class

**Both types should show:**
- `totalPerRoom` prominently (total cost for the stay, not just per-night)
- Both `bookingUrl` and `officialUrl` as separate buttons
- `naritaAccess` note if it exists (for tokyoFinal hotels)
- `shimanamiReady` badge if true (for Onomichi hotels)

### Task 4: Create a dedicated `/hotels` page
Create `src/app/hotels/page.tsx` — a standalone page for comparing hotels across all 5 stays.

**Design direction:**
- Same black/white/red color scheme as the rest of the app
- Grid layout: one section per city, each section shows cards for all options
- Sticky city header with: location name, dates, check-in/check-out, nights count
- Filter/toggle to show "All" | "Hotels only" | "Ryokans only"
- Sort options: by price (low→high), by price (high→low), traveller picks first
- Each card links out to booking.com (with dates pre-filled) and official site
- Ryokan cards should have the warm visual treatment (distinct from hotel cards)
- Mobile responsive — single column on mobile, 2-3 cards per row on desktop
- Add a link to this page from the main presentation (alongside the existing "View Itinerary" link)

### Task 5: Enhance TransportStrip animations
The existing `TransportStrip.tsx` uses emoji and a simple track animation. Enhance based on the `animation` field:

- `plane-long-haul` / `plane-domestic`: The ✈️ emoji should animate along a curved arc path (CSS `offset-path` or `@keyframes` with translateY dip). Long-haul gets a longer/slower animation.
- `shinkansen`: The 🚅 should zip across fast with a motion blur effect (use `filter: blur(2px)` during movement, sharp at endpoints).
- `train-local` / `train-mountain` / `train-bridge`: Standard linear animation, but `train-mountain` could have a slight vertical wave, `train-bridge` a slight arch.
- `bike-island`: 🚲 should be slower, with a gentle wave motion (island hopping feel). Maybe show island dots along the track.
- `bus-mountain`: 🚌 with a slight bounce animation.

All animations should trigger on scroll (when the slide enters viewport), using the existing Intersection Observer pattern.

### Task 6: Add navigation link
Add a "Hotels" link next to the existing "View Itinerary" link at the bottom-left of the presentation page.

---

## Design tokens (existing, reuse these)
```css
--red: #bc002d;
--black: #000;
--white: #fff;
--g1: #111;
--g2: #222;
--g3: #444;
--g4: #888;
```

For ryokans, suggest adding:
```css
--ryokan-warm: #2a1f14;       /* dark warm brown for card bg */
--ryokan-accent: #c4956a;     /* warm gold/copper for borders */
--ryokan-text: #e8d5c0;       /* warm cream for text */
```

## File structure reference
```
src/
  app/
    page.tsx              ← main presentation (scroll-snap slides)
    layout.tsx
    globals.css           ← all styles (single file)
    itinerary/page.tsx    ← detailed itinerary view
    hotels/page.tsx       ← NEW: hotels comparison page
  components/
    presentation/
      DaySlide.tsx
      HeroSlide.tsx
      ClosingSlide.tsx
      TransportStrip.tsx  ← enhance animations
      HotelModal.tsx      ← add ryokan differentiation
      LuggageTag.tsx      ← opens HotelModal on click
      NavDots.tsx
      ProgressBar.tsx
      ScrollObserver.tsx
      Sticker.tsx
    itinerary/
      ItineraryPage.tsx
      DayCard.tsx
      BudgetTab.tsx
      PracticalTab.tsx
  types/
    trip.ts               ← update with ryokan types
  data/
    trip.json             ← sync from root japan-itinerary.json
    stickers.ts
    luggage-tags.ts
```

## Important notes
- This is a static export (`output: "export"` in next.config.ts) — no server components with data fetching, everything is imported at build time
- The app uses Tailwind v4 via `@import "tailwindcss"` in globals.css, but most styling is done with custom CSS classes (not utility classes)
- All styles live in `globals.css` — keep it that way, don't split into CSS modules
- The presentation uses `scroll-snap-type: y mandatory` with Intersection Observer for reveal animations
- Animations use `cubic-bezier(0.16, 1, 0.3, 1)` (Apple's easing curve) — keep this consistent
- Inter font, weights 200–900
- The `japan-itinerary.json` at root is the source of truth maintained in a separate Cowork session — don't modify it, only read from it
