import { DAY_LABEL_ICON } from "./stickers";

export interface Stamp {
  id: string;
  label: string;
  labelJp: string;
  icon: string;
  trigger: "scroll" | "page" | "action";
  triggerDetail: string;
  color: string;
}

const DAY_LABELS: Record<string, { label: string; labelJp: string }> = {
  "01": { label: "Day 1 — Tokyo Arrival", labelJp: "東京到着" },
  "02": { label: "Day 2 — TeamLab & Harajuku", labelJp: "チームラボ" },
  "03": { label: "Day 3 — Kamakura", labelJp: "鎌倉" },
  "04": { label: "Day 4 — Mt Fuji", labelJp: "富士山" },
  "05": { label: "Day 5 — Tokyo to Kumamoto", labelJp: "熊本へ" },
  "06": { label: "Day 6 — Mt Aso & Bike Ride", labelJp: "阿蘇山" },
  "07": { label: "Day 7 — Kurokawa Onsen", labelJp: "黒川温泉" },
  "08": { label: "Day 8 — Onomichi", labelJp: "尾道" },
  "09": { label: "Day 9 — Shimanami Kaido", labelJp: "しまなみ海道" },
  "10": { label: "Day 10 — Osaka Dotonbori", labelJp: "道頓堀" },
  "11": { label: "Day 11 — Osaka Castle", labelJp: "大阪城" },
  "12": { label: "Day 12 — Kyoto", labelJp: "京都" },
  "13": { label: "Day 13 — Osaka to Tokyo", labelJp: "東京へ" },
  "14": { label: "Day 14 — Departure", labelJp: "出発" },
};

const DAY_COLORS: Record<string, string> = {
  "01": "#bc002d",
  "02": "#c73e1d",
  "03": "#2e5090",
  "04": "#1a6b4b",
  "05": "#bc002d",
  "06": "#8b4513",
  "07": "#2e7d6f",
  "08": "#c73e1d",
  "09": "#2e5090",
  "10": "#bc002d",
  "11": "#1a6b4b",
  "12": "#c73e1d",
  "13": "#2e5090",
  "14": "#bc002d",
};

const dayStamps: Stamp[] = Array.from({ length: 14 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  const info = DAY_LABELS[num];
  return {
    id: `day-${num}`,
    label: info.label,
    labelJp: info.labelJp,
    icon: DAY_LABEL_ICON[num],
    trigger: "scroll" as const,
    triggerDetail: `slide-${i + 1}`,
    color: DAY_COLORS[num],
  };
});

const bonusStamps: Stamp[] = [
  {
    id: "map-explorer",
    label: "Map Explorer",
    labelJp: "地図探検家",
    icon: "map",
    trigger: "page",
    triggerDetail: "/map",
    color: "#2e5090",
  },
  {
    id: "food-master",
    label: "Food Master",
    labelJp: "食の達人",
    icon: "ramen",
    trigger: "page",
    triggerDetail: "/restaurants",
    color: "#c73e1d",
  },
  {
    id: "packing-pro",
    label: "Packing Pro",
    labelJp: "荷造り名人",
    icon: "suitcase",
    trigger: "page",
    triggerDetail: "/packing",
    color: "#8b4513",
  },
];

export const STAMPS: Stamp[] = [...dayStamps, ...bonusStamps];
export const STAMPS_MAP: Record<string, Stamp> = Object.fromEntries(
  STAMPS.map((s) => [s.id, s])
);
