import tripData from "@/data/trip.json";
import type { TripData } from "@/types/trip";
import { RestaurantsView } from "@/components/restaurants/RestaurantsView";

const data = tripData as unknown as TripData;

export default function RestaurantsPage() {
  return <RestaurantsView restaurants={data.restaurants} />;
}
