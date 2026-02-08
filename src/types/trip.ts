export interface Trip {
  title: string;
  titleJp: string;
  dates: string;
  travelers: number;
  durationDays: number;
  durationNights: number;
  origin: string;
  flights: {
    outbound: { from: string; to: string; date: string; arrives: string; note: string };
    return: { from: string; to: string; date: string; departs: string };
  };
  dietary: string[];
  route: string[];
}

export interface Activity {
  time: string;
  name: string;
  location?: string;
  duration?: string;
  cost?: number;
  bookAhead?: boolean;
  note?: string;
  type: string;
}

export interface Transport {
  mode: string;
  from?: string;
  to?: string;
  via?: string;
  duration?: string;
  cost?: number;
  jrPass?: boolean;
  roundTrip?: boolean;
  note?: string;
}

export interface Day {
  day: number;
  date: string;
  dateLabel: string;
  title: string;
  region: string;
  tagline: string;
  stay: string | null;
  highlights: string[];
  activities: Activity[];
  transport: Transport;
  food: string;
  tip: string;
  keyCost?: number;
  isCyclingDay?: boolean;
  optional?: { name: string; addedTime: string };
  shimanamiKaido?: {
    distance: string;
    duration: string;
    islands: string[];
    bikeRental: { type: string; cost: number; oneWayDropoff: boolean; reserveAhead: boolean };
  };
}

export interface Stay {
  location: string;
  nights: number;
  dates: string;
  area: string;
  budget: string;
}

export interface DietaryPhrase {
  japanese: string;
  meaning: string;
}

export interface Restaurant {
  name: string;
  city: string;
  type: string;
}

export interface DietaryGuide {
  restrictions: string[];
  japanesePhrases: DietaryPhrase[];
  safeFoods: string[];
  watchOut: string[];
  apps: string[];
  recommendedRestaurants: Restaurant[];
}

export interface JrPassAnalysis {
  sevenDay: number;
  fourteenDay: number;
  estimatedIndividualTotal: string;
  recommendation: string;
  note: string;
}

export interface TransportInfo {
  jrPassAnalysis: JrPassAnalysis;
  suicaCard: string;
  takkyubin: {
    what: string;
    cost: string;
    how: string;
    delivery: string;
    usedOnDay: number;
  };
}

export interface Booking {
  item: string;
  when: string;
  priority: "critical" | "high" | "medium" | "low";
  url?: string;
  note?: string;
}

export interface BudgetItem {
  amount: number | string;
  note: string;
}

export interface Budget {
  currency: string;
  perPerson: Record<string, BudgetItem>;
  totalPerPerson: string;
  totalPerPersonUSD: string;
  totalGroup: string;
  totalGroupUSD: string;
  note: string;
}

export interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

export interface TripData {
  trip: Trip;
  stays: Stay[];
  days: Day[];
  dietary: DietaryGuide;
  transport: TransportInfo;
  bookings: Booking[];
  budget: Budget;
  packing: string[];
  stats: Stat[];
}
