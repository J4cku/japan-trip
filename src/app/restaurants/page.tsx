import type { Metadata } from "next";
import tripData from "@/data/trip.json";
import type { TripData } from "@/types/trip";
import { RestaurantsView } from "@/components/restaurants/RestaurantsView";

export const metadata: Metadata = {
  title: "Dining Guide",
  description: "Gluten-free & vegan-friendly restaurant picks across Tokyo, Kumamoto, Onomichi, Osaka & Kyoto.",
  openGraph: {
    title: "Dining Guide — Japan 2026",
    description: "Gluten-free & vegan-friendly spots across Japan.",
    images: [{ url: "/og-restaurants.png", width: 1200, height: 630, alt: "Japan 2026 Dining" }],
  },
  twitter: {
    images: ["/og-restaurants.png"],
  },
};

const data = tripData as unknown as TripData;

export default function RestaurantsPage() {
  return <RestaurantsView restaurants={data.restaurants} />;
}
