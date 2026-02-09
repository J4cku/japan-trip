import type { Metadata } from "next";
import Link from "next/link";
import { flashcards } from "@/data/flashcards";
import { Flashcards } from "@/components/fun/Flashcards";
import { ThemeToggle } from "@/components/presentation/ThemeToggle";

export const metadata: Metadata = {
  title: "Flashcards",
  description:
    "Learn essential Japanese phrases for travel — greetings, dining, directions & emergencies with furigana readings.",
  openGraph: {
    title: "Flashcards — Japan 2026",
    description: "Learn essential Japanese phrases with furigana readings.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Japan 2026 Flashcards" }],
  },
  twitter: {
    images: ["/og.png"],
  },
};

export default function FlashcardsPage() {
  return (
    <div className="fc-page">
      <Link href="/" className="map-back">
        &larr; Back
      </Link>
      <ThemeToggle />
      <header className="fc-header">
        <h1 className="fc-title">Japanese Phrases</h1>
        <p className="fc-subtitle">
          {flashcards.length} essential phrases for your trip
        </p>
      </header>
      <Flashcards cards={flashcards} />
    </div>
  );
}
