# Japan 2026 Trip Website

Personal trip planning website for a 14-day Japan trip (May 9-22, 2026) for 4 travelers.
Deployed at `jpn.leszczynski.me`.

## Stack

- **Framework**: Next.js 16 with App Router, static export (`output: "export"`)
- **Styling**: Tailwind CSS v4 + ~5000 lines of custom CSS in `globals.css`
- **Map**: Leaflet + react-leaflet (Carto dark/light tiles)
- **Fonts**: Inter (body), Caveat (handwritten accents via `--font-caveat`)
- **OG images**: Generated at build time via Satori + Resvg (`scripts/generate-og.mjs`)
- **No tests, no linter config, no CI** — this is a personal project

## Commands

```bash
npm run dev      # Start dev server (also watches japan-itinerary.json)
npm run build    # Generate OG images + next build (static export)
npm run sync     # One-shot copy japan-itinerary.json → src/data/trip.json
npm run og       # Regenerate OG images only
npm start        # Serve built output
```

## Data Flow

The single source of truth is `japan-itinerary.json` (12k lines) at the project root.
- `scripts/sync-json.js` copies it to `src/data/trip.json` (runs on `npm run dev` and watches for changes)
- All components import from `@/data/trip.json` and cast through types in `src/types/trip.ts`
- **Never edit `src/data/trip.json` directly** — edit `japan-itinerary.json` instead

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home — scroll-snap presentation (hero → 14 day slides → closing)
│   ├── layout.tsx          # Root layout with global fun components
│   ├── globals.css         # All custom CSS (~5k lines, dark/light theme vars)
│   ├── itinerary/          # Day-by-day itinerary with budget & practical tabs
│   ├── hotels/             # Hotel/ryokan comparison cards
│   ├── restaurants/        # Restaurant guide (GF/vegan filtering)
│   ├── map/                # Interactive Leaflet map with 200+ pins
│   ├── packing/            # Packing checklist
│   ├── flashcards/         # Japanese phrase flashcards
│   ├── stamps/             # Stamp rally collection book
│   └── extended/           # Extended trip info (days 15-21)
├── components/
│   ├── presentation/       # Home page slides: DaySlide, HeroSlide, ClosingSlide, Polaroid, Sticker, etc.
│   ├── map/                # MapView, MapSidebar, MapFilters, PinPopup, RouteOverlay
│   ├── itinerary/          # ItineraryPage, DayCard, BudgetTab, PracticalTab
│   ├── hotels/             # HotelsView
│   ├── restaurants/        # RestaurantsView
│   ├── extended/           # Japan101, OnsenGuide, SplitBanner, TrailProfile
│   ├── fun/                # Interactive features (see below)
│   └── MobileMenu.tsx      # Mobile navigation
├── data/                   # Static data files
│   ├── trip.json           # Auto-synced from japan-itinerary.json (DO NOT EDIT)
│   ├── polaroids.ts        # Unsplash photo placements per day
│   ├── stickers.ts         # Sticker asset paths + per-day/hero/closing placements
│   ├── stamps.ts           # Stamp rally definitions
│   ├── flashcards.ts       # Japanese phrase cards with furigana
│   ├── luggage-tags.ts     # Luggage tag placements + day→hotel mapping
│   └── weather.ts          # May weather forecasts per location
├── hooks/
│   └── useStampRally.ts    # Stamp collection state (localStorage)
└── types/
    └── trip.ts             # All TypeScript interfaces for trip data
```

## Architecture Patterns

### Rendering Strategy
- **Server components by default** — pages and layout are RSC
- **Client components** where interactivity is needed — marked with `"use client"` (33 files)
- Static export means no server-side data fetching — all data is imported at build time

### Styling
- CSS custom properties for theming (`--red`, `--black`, `--white`, `--g1`–`--g4`)
- Dark theme is default; light theme via `[data-theme="light"]` attribute on `<html>`
- Animations use CSS classes: `.rv` (reveal on scroll), `.d1`–`.d9` (staggered delays)
- Component-specific styles are in `globals.css`, not CSS modules

### Component Conventions
- Props are typed inline at the function signature (not separate interfaces, mostly)
- Data lookups happen at the page level (e.g., `travelsByDay`, `restaurantsByDay` in `page.tsx`)
- Stickers, polaroids, and luggage tags are decorative overlays positioned absolutely within slides

### Fun / Interactive Features (all in `src/components/fun/`)
- `SakuraParticles` — floating cherry blossom animation
- `KonamiEgg` — Konami code easter egg
- `CurrencyConverter` — JPY/EUR/USD converter
- `StampCollector` + `StampBook` — stamp rally gamification (scroll/page triggers)
- `AmbientSound` — background audio
- `WeatherOverlay` — per-day weather display
- `Flashcards` — Japanese phrase practice
- `PackingChecklist` — interactive packing list

### Map System
- 200+ pins with categories (temple, shrine, food, hotel, etc.) and statuses (matched/nearRoute/offRoute)
- Route overlay, day filtering, hotel layer toggle, extended trip toggle
- Dark/light theme-aware tiles and styling

## Key Types

All in `src/types/trip.ts`. Main ones:
- `TripData` — root type for the entire JSON
- `Day`, `Activity`, `Transport` — daily itinerary
- `Hotels`, `HotelCity`, `HotelOption` — accommodation data
- `Restaurants`, `RestaurantSpot` — dining guide
- `Pin`, `PinsData` — map markers
- `Travel` — inter-city transport segments
- `ExtendedTrip`, `ExtendedDay` — days 15-21 extension

## Assets

- `public/stickers/` — PNG sticker sprites (n1_*, n2_*, n3_* series)
- `public/og*.png` — Generated OG images (don't edit manually)
- `stickers/` — Source sticker files (not served)
- Polaroid photos are Unsplash URLs (external)
