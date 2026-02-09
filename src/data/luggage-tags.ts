export interface TagPlacement {
  city: string;
  code: string;
  date?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rot?: string;
  delay?: string;
}

export const HERO_TAGS: TagPlacement[] = [
  { city: "Warsaw", code: "WAW", date: "May 8", bottom: "22%", right: "4%", rot: "5deg", delay: "0.6s" },
  { city: "Narita", code: "NRT", date: "May 9", top: "18%", left: "3%", rot: "-4deg", delay: "0.8s" },
];

export const DAY_TAGS: Record<string, TagPlacement> = {
  "01": { city: "Tokyo", code: "TYO", date: "Day 01", bottom: "8%", left: "8%", rot: "-5deg", delay: "0.4s" },
  "02": { city: "Shibuya", code: "SBY", date: "Day 02", bottom: "10%", left: "8%", rot: "3deg", delay: "0.5s" },
  "03": { city: "Kamakura", code: "KMK", date: "Day 03", bottom: "8%", left: "8%", rot: "-4deg", delay: "0.4s" },
  "04": { city: "Mt Fuji", code: "FUJ", date: "Day 04", bottom: "10%", left: "8%", rot: "5deg", delay: "0.5s" },
  "05": { city: "Kumamoto", code: "KMJ", date: "Day 05", bottom: "8%", left: "8%", rot: "-3deg", delay: "0.4s" },
  "06": { city: "Mt Aso", code: "ASO", date: "Day 06", bottom: "10%", left: "8%", rot: "4deg", delay: "0.5s" },
  "07": { city: "Kurokawa", code: "KRK", date: "Day 07", bottom: "8%", left: "8%", rot: "-5deg", delay: "0.4s" },
  "08": { city: "Onomichi", code: "ONO", date: "Day 08", bottom: "10%", left: "8%", rot: "3deg", delay: "0.5s" },
  "09": { city: "Shimanami", code: "SMN", date: "Day 09", bottom: "8%", left: "8%", rot: "-4deg", delay: "0.4s" },
  "10": { city: "Osaka", code: "KIX", date: "Day 10", bottom: "10%", left: "8%", rot: "5deg", delay: "0.5s" },
  "11": { city: "Osaka", code: "KIX", date: "Day 11", bottom: "8%", left: "8%", rot: "-3deg", delay: "0.4s" },
  "12": { city: "Kyoto", code: "KYO", date: "Day 12", bottom: "10%", left: "8%", rot: "4deg", delay: "0.5s" },
  "13": { city: "Tokyo", code: "TYO", date: "Day 13", bottom: "8%", left: "8%", rot: "-5deg", delay: "0.4s" },
  "14": { city: "Narita", code: "NRT", date: "Day 14", bottom: "10%", left: "8%", rot: "3deg", delay: "0.5s" },
};

export const CLOSING_TAGS: TagPlacement[] = [
  { city: "Narita", code: "NRT", date: "May 22", bottom: "12%", right: "4%", rot: "6deg", delay: "0.7s" },
  { city: "Warsaw", code: "WAW", date: "May 23", bottom: "12%", left: "4%", rot: "-5deg", delay: "0.9s" },
];

export const DAY_HOTEL_KEY: Record<string, string> = {
  "01": "shibuya",
  "02": "shibuya",
  "03": "shibuya",
  "04": "shibuya",
  "05": "kumamoto",
  "06": "kumamoto",
  "07": "kumamoto",
  "08": "onomichi",
  "09": "osaka",
  "10": "osaka",
  "11": "osaka",
  "12": "osaka",
  "13": "tokyoFinal",
  "14": "tokyoFinal",
};
