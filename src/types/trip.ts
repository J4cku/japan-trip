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

export interface RestaurantSpot {
  name: string;
  nameJp: string;
  cuisine: string;
  neighborhood: string;
  price: "¥" | "¥¥" | "¥¥¥";
  gf: boolean;
  vegan: boolean;
  vegetarian: boolean;
  mustTry: string;
  note: string;
  url: string;
}

export interface RestaurantLocation {
  label: string;
  forDays: number[];
  spots: RestaurantSpot[];
  survivalTips?: string;
  cyclingFuelGuide?: {
    whatToPack: string[];
    konbiniStops: string;
    tip: string;
  };
}

export interface Restaurants {
  note: string;
  allergyCardJp: string;
  allergyCardEn: string;
  safeFoods: string[];
  dangerFoods: string[];
  apps: string[];
  byLocation: Record<string, RestaurantLocation>;
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

export interface RyokanDetails {
  onsen?: boolean;
  onsenType?: string;
  privateBath?: boolean;
  privateBathInRoom?: boolean;
  rotenburo?: boolean;
  communalBath?: boolean;
  meals?: string;
  drinks?: string;
  bikeRental?: string;
  tatami?: boolean;
  futon?: boolean;
  yukata?: boolean;
}

export interface HotelOption {
  name: string;
  nameJp: string;
  type?: "hotel" | "ryokan";
  priceEUR: string;
  priceJPY: string;
  style: string;
  location: string;
  neighborhood: string;
  highlights: string[];
  url?: string;
  travellerPick: boolean;
  pickReason?: string;
  bookingUrl?: string;
  officialUrl?: string;
  totalPerRoom?: string;
  ryokanDetails?: RyokanDetails;
  dietaryNote?: string;
  shimanamiReady?: boolean;
  naritaAccess?: string;
}

export interface HotelCity {
  stayId: string;
  location: string;
  nights: number;
  dates: string;
  purpose: string;
  options: HotelOption[];
  checkIn?: string;
  checkOut?: string;
  searchParams?: { adults: number; rooms: number; nights: number };
  pricingNote?: string;
}

export interface Hotels {
  budget: string;
  note: string;
  userPreferences: {
    lovedHotel: string;
    style: string;
    interestedIn: string;
  };
  shibuya: HotelCity;
  kumamoto: HotelCity;
  onomichi: HotelCity;
  osaka: HotelCity;
  tokyoFinal: HotelCity;
  [key: string]: HotelCity | string | { lovedHotel: string; style: string; interestedIn: string };
}

export interface TravelPoint {
  name: string;
  area?: string;
  country?: string;
  code?: string;
}

export interface Travel {
  id: string;
  day: number;
  from: TravelPoint;
  to: TravelPoint;
  mode: "plane" | "train" | "shinkansen" | "bus" | "bike";
  icon: string;
  carrier?: string;
  line?: string;
  route?: string;
  duration: string;
  distance: string;
  cost: number | null;
  costNote?: string;
  roundTrip?: boolean;
  via?: string[];
  islands?: string[];
  details: string;
  animation: string;
}

export type PinCategory =
  | "temple" | "shrine" | "museum" | "food" | "shopping"
  | "nature" | "park" | "onsen" | "attraction" | "hotel"
  | "viewpoint" | "neighborhood" | "street" | "bridge"
  | "ryokan";

export type PinStatus = "matched" | "nearRoute" | "offRoute";

export interface Pin {
  id: number;
  name: string;
  nameJp?: string;
  note: string | null;
  lat: number;
  lng: number;
  googleMapsUrl: string | null;
  region: string;
  category: PinCategory;
  status: PinStatus;
  day: number | null;
  dayLabel: string | null;
  possibleDays: number[];
  possibleDayLabels: string[];
  source?: "itinerary" | "hotels";
  hotelLocation?: string;
  chosen?: boolean;
  extendedStatus?: PinStatus;
  extendedDay?: number | null;
  extendedDayLabel?: string | null;
}

export interface PinsData {
  source: string;
  exportDate: string;
  stats: { total: number; matched: number; nearRoute: number; offRoute: number };
  categories: PinCategory[];
  regions: string[];
  statusDescriptions: Record<PinStatus, string>;
  items: Pin[];
}

export interface OnsenEtiquette {
  rules: string[];
  tip: string;
}

export interface NakasendoTrail {
  distance: string;
  duration: string;
  difficulty: string;
  elevationStart: number;
  elevationPass: number;
  elevationEnd: number;
  terrain: string;
  whatToPack: string[];
}

export interface ExtendedDay extends Day {
  splitNote?: string;
  isHikingDay?: boolean;
  onsenEtiquette?: OnsenEtiquette;
  nakasendoTrail?: NakasendoTrail;
}

export interface ExtendedStay {
  location: string;
  nights: number;
  dates: string;
  area: string;
  note: string;
}

export interface ExtendedPracticalTips {
  forLessExperienced: string[];
  emergencyFood?: string[];
  jrPassNote?: string;
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
  dietaryReminder: string;
  returnFlight: {
    from: string;
    to: string;
    date: string;
    departs: string;
  };
  stays: ExtendedStay[];
  days: ExtendedDay[];
  travels: Travel[];
  restaurants: Restaurants;
  practicalTips: ExtendedPracticalTips;
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
  hotels: Hotels;
  travels: Travel[];
  restaurants: Restaurants;
  pins: PinsData;
  extended: ExtendedTrip;
}
