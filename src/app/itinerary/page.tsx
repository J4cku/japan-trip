import type { Metadata } from "next";
import { ItineraryPage } from "@/components/itinerary/ItineraryPage";

export const metadata: Metadata = {
  title: "Itinerary",
  description: "Day-by-day itinerary for 14 days across Japan — flights, trains, activities & more.",
  openGraph: {
    title: "Itinerary — Japan 2026",
    description: "14 days across Japan — every detail planned.",
    images: [{ url: "/og-itinerary.png", width: 1200, height: 630, alt: "Japan 2026 Itinerary" }],
  },
  twitter: {
    images: ["/og-itinerary.png"],
  },
};

export default function Page() {
  return <ItineraryPage />;
}
