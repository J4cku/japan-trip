import type { Metadata } from "next";
import Link from "next/link";
import { PackingChecklist } from "@/components/fun/PackingChecklist";

export const metadata: Metadata = {
  title: "Packing",
  description: "Packing checklist for 14 days across Japan — everything you need, nothing you don't.",
  openGraph: {
    title: "Packing List — Japan 2026",
    description: "Interactive packing checklist for the Japan trip.",
  },
};

const PACKING_ITEMS = [
  "Passport + copies (digital & paper)",
  "Comfortable walking shoes (15,000+ steps/day)",
  "Cycling clothes for 2 ride days",
  "Padded cycling shorts or liner",
  "Light rain jacket — May has sudden showers",
  "Layers — Mt Aso highlands are cooler",
  "Sunscreen + hat for cycling days",
  "Small towel — many restrooms lack hand dryers",
  "Portable battery pack",
  "Allergy/dietary card in Japanese (print before trip)",
  "Minimal luggage — lots of stairs and tight trains",
  "Coin purse — Japan uses more coins than expected",
];

export default function PackingPage() {
  return (
    <div className="pk-page">
      <div className="pk-wrapper">
        <Link href="/" className="pk-back">
          ← Back
        </Link>
        <h1 className="pk-title">Packing List</h1>
        <p className="pk-subtitle">14 days, one carry-on. Choose wisely.</p>
        <PackingChecklist items={PACKING_ITEMS} />
      </div>
    </div>
  );
}
