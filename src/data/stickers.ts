const S = "/stickers/";

export const STICKERS: Record<string, string> = {
  boy: S + "n1_01.png",
  girl: S + "n1_02.png",
  logo: S + "n1_03.png",
  mapPin: S + "n1_04.png",
  pagoda: S + "n1_05.png",
  castle: S + "n1_06.png",
  fuji: S + "n1_07.png",
  ramen: S + "n1_08.png",
  sushi: S + "n1_09.png",
  sakura: S + "n1_10.png",
  ticket: S + "n1_11.png",
  torii: S + "n1_12.png",
  daruma: S + "n1_13.png",
  train: S + "n1_14.png",
  neko: S + "n2_01.png",
  lantern: S + "n2_02.png",
  fan: S + "n2_03.png",
  kimono: S + "n2_04.png",
  sushi2: S + "n2_05.png",
  geta: S + "n2_06.png",
  castle2: S + "n2_07.png",
  origami: S + "n2_08.png",
  crane: S + "n2_08.png",
  fuji2: S + "n2_09.png",
  flag: S + "n2_10.png",
  flag2: S + "n2_11.png",
  bowl: S + "n2_12.png",
  camera: S + "n2_13.png",
  peace: S + "n2_14.png",
  tea: S + "n2_15.png",
  rice: S + "n2_16.png",
  shrine: S + "n2_17.png",
  branch: S + "n2_17.png",
  itinerary: S + "n2_18.png",
  notebook: S + "n2_19.png",
  map: S + "n2_20.png",
  station: S + "n2_21.png",
  suitcase: S + "n2_22.png",
  couple: S + "n2_23.png",
  bonsai: S + "n3_05.png",
  taiko: S + "n3_06.png",
  coffee: S + "n3_08.png",
  pocky: S + "n3_10.png",
};

export interface StickerPlacement {
  src: string;
  size: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rot: string;
  op: number;
  dur?: string;
  drift?: string;
  swing?: string;
  delay?: string;
  anim?: "spin";
}

export const HERO_STICKERS: StickerPlacement[] = [
  { src: "logo", size: "clamp(100px,14vw,180px)", top: "8%", left: "6%", rot: "-8deg", op: 0.85, dur: "7s", drift: "-12px", swing: "3deg" },
  { src: "fuji", size: "clamp(80px,12vw,160px)", top: "12%", right: "5%", rot: "6deg", op: 0.75, dur: "8s", drift: "-18px", swing: "-4deg" },
  { src: "torii", size: "clamp(70px,10vw,130px)", bottom: "18%", left: "8%", rot: "5deg", op: 0.7, dur: "6s", drift: "-10px", swing: "5deg" },
  { src: "train", size: "clamp(80px,11vw,140px)", bottom: "12%", right: "7%", rot: "-4deg", op: 0.75, dur: "9s", drift: "-14px", swing: "-3deg" },
  { src: "daruma", size: "clamp(60px,8vw,100px)", top: "35%", left: "2%", rot: "12deg", op: 0.6, dur: "7s", drift: "-8px", swing: "6deg" },
  { src: "sakura", size: "clamp(60px,8vw,100px)", top: "30%", right: "3%", rot: "-10deg", op: 0.65, dur: "8s", drift: "-16px", swing: "4deg" },
  { src: "neko", size: "clamp(60px,9vw,110px)", bottom: "28%", right: "12%", rot: "8deg", op: 0.65, dur: "6s", drift: "-12px", swing: "-5deg" },
  { src: "neko", size: "clamp(55px,7vw,90px)", bottom: "25%", left: "14%", rot: "-15deg", op: 0.6, dur: "7s", drift: "-10px", swing: "3deg" },
];

export const CLOSING_STICKERS: StickerPlacement[] = [
  { src: "couple", size: "clamp(100px,14vw,180px)", top: "10%", right: "5%", rot: "5deg", op: 0.85, dur: "8s", drift: "-15px", swing: "-3deg" },
  { src: "sushi2", size: "clamp(80px,11vw,140px)", bottom: "15%", left: "6%", rot: "-8deg", op: 0.75, dur: "7s", drift: "-12px", swing: "4deg" },
  { src: "flag", size: "clamp(70px,9vw,110px)", top: "15%", left: "4%", rot: "10deg", op: 0.7, dur: "6s", drift: "-10px", swing: "5deg" },
  { src: "daruma", size: "clamp(65px,8vw,100px)", bottom: "20%", right: "8%", rot: "-6deg", op: 0.65, dur: "9s", drift: "-14px", swing: "-4deg" },
  { src: "fan", size: "clamp(60px,8vw,100px)", top: "40%", right: "15%", rot: "15deg", op: 0.6, dur: "7s", drift: "-8px", swing: "3deg" },
];

export const DAY_STICKERS: Record<string, StickerPlacement[]> = {
  "01": [
    { src: "suitcase", size: "clamp(90px,14vw,180px)", top: "10%", right: "4vw", rot: "-8deg", op: 0.85 },
    { src: "ticket", size: "clamp(60px,8vw,110px)", bottom: "18%", right: "8vw", rot: "12deg", op: 0.7 },
    { src: "mapPin", size: "clamp(50px,6vw,80px)", top: "60%", right: "2vw", rot: "-5deg", op: 0.55 },
  ],
  "02": [
    { src: "daruma", size: "clamp(100px,14vw,180px)", top: "8%", right: "3vw", rot: "6deg", op: 0.85 },
    { src: "neko", size: "clamp(60px,8vw,100px)", bottom: "15%", right: "10vw", rot: "-10deg", op: 0.7 },
    { src: "lantern", size: "clamp(50px,6vw,80px)", top: "50%", right: "1vw", rot: "15deg", op: 0.55 },
  ],
  "03": [
    { src: "pagoda", size: "clamp(90px,14vw,180px)", top: "10%", right: "4vw", rot: "-5deg", op: 0.85 },
    { src: "neko", size: "clamp(65px,9vw,110px)", bottom: "20%", right: "6vw", rot: "8deg", op: 0.7 },
    { src: "ticket", size: "clamp(45px,6vw,75px)", top: "55%", right: "2vw", rot: "-12deg", op: 0.55 },
  ],
  "04": [
    { src: "pagoda", size: "clamp(90px,14vw,180px)", top: "10%", right: "4vw", rot: "-5deg", op: 0.85 },
    { src: "bonsai", size: "clamp(65px,9vw,110px)", bottom: "20%", right: "6vw", rot: "8deg", op: 0.7 },
    { src: "geta", size: "clamp(45px,6vw,75px)", top: "55%", right: "2vw", rot: "-12deg", op: 0.55 },
  ],
  "05": [
    { src: "fuji", size: "clamp(110px,16vw,200px)", top: "8%", right: "2vw", rot: "4deg", op: 0.9 },
    { src: "bowl", size: "clamp(60px,8vw,100px)", bottom: "18%", right: "12vw", rot: "-6deg", op: 0.6 },
    { src: "camera", size: "clamp(50px,6vw,80px)", bottom: "35%", right: "3vw", rot: "10deg", op: 0.55 },
  ],
  "06": [
    { src: "train", size: "clamp(100px,14vw,180px)", top: "10%", right: "3vw", rot: "-3deg", op: 0.85 },
    { src: "castle", size: "clamp(65px,9vw,110px)", bottom: "15%", right: "8vw", rot: "8deg", op: 0.7 },
    { src: "flag2", size: "clamp(55px,7vw,90px)", top: "55%", right: "1vw", rot: "-10deg", op: 0.55 },
  ],
  "07": [
    { src: "tea", size: "clamp(90px,13vw,170px)", top: "10%", right: "3vw", rot: "-6deg", op: 0.85 },
    { src: "bonsai", size: "clamp(60px,8vw,100px)", bottom: "18%", right: "8vw", rot: "10deg", op: 0.7 },
    { src: "coffee", size: "clamp(55px,7vw,85px)", top: "55%", right: "1vw", rot: "-8deg", op: 0.55 },
  ],
  "08": [
    { src: "torii", size: "clamp(90px,14vw,180px)", top: "10%", right: "4vw", rot: "5deg", op: 0.85 },
    { src: "origami", size: "clamp(60px,8vw,100px)", bottom: "15%", right: "10vw", rot: "-12deg", op: 0.7 },
    { src: "pocky", size: "clamp(50px,6vw,80px)", top: "55%", right: "2vw", rot: "8deg", op: 0.55 },
  ],
  "09": [
    { src: "flag", size: "clamp(90px,13vw,170px)", top: "8%", right: "3vw", rot: "-4deg", op: 0.85 },
    { src: "branch", size: "clamp(70px,10vw,120px)", bottom: "18%", right: "6vw", rot: "10deg", op: 0.7 },
    { src: "sushi2", size: "clamp(55px,7vw,90px)", top: "52%", right: "1vw", rot: "-15deg", op: 0.55 },
  ],
  "10": [
    { src: "ramen", size: "clamp(100px,14vw,180px)", top: "10%", right: "4vw", rot: "6deg", op: 0.85 },
    { src: "sushi2", size: "clamp(65px,9vw,110px)", bottom: "18%", right: "8vw", rot: "-8deg", op: 0.7 },
    { src: "rice", size: "clamp(50px,6vw,80px)", top: "50%", right: "2vw", rot: "12deg", op: 0.55 },
  ],
  "11": [
    { src: "castle", size: "clamp(100px,14vw,180px)", top: "8%", right: "3vw", rot: "-5deg", op: 0.85 },
    { src: "kimono", size: "clamp(65px,9vw,110px)", bottom: "20%", right: "10vw", rot: "8deg", op: 0.7 },
    { src: "pocky", size: "clamp(50px,6vw,80px)", top: "55%", right: "1vw", rot: "-10deg", op: 0.55 },
  ],
  "12": [
    { src: "torii", size: "clamp(100px,15vw,190px)", top: "8%", right: "3vw", rot: "4deg", op: 0.9 },
    { src: "fan", size: "clamp(60px,8vw,100px)", bottom: "15%", right: "8vw", rot: "-12deg", op: 0.7 },
    { src: "tea", size: "clamp(55px,7vw,90px)", top: "52%", right: "2vw", rot: "10deg", op: 0.55 },
  ],
  "13": [
    { src: "logo", size: "clamp(100px,14vw,180px)", top: "10%", right: "4vw", rot: "-3deg", op: 0.85 },
    { src: "origami", size: "clamp(65px,9vw,110px)", bottom: "18%", right: "6vw", rot: "8deg", op: 0.7 },
    { src: "camera", size: "clamp(50px,6vw,80px)", top: "55%", right: "2vw", rot: "-8deg", op: 0.55 },
  ],
  "14": [
    { src: "train", size: "clamp(100px,14vw,180px)", top: "8%", right: "3vw", rot: "5deg", op: 0.85 },
    { src: "ticket", size: "clamp(70px,10vw,120px)", bottom: "15%", right: "8vw", rot: "-8deg", op: 0.75 },
    { src: "lantern", size: "clamp(60px,8vw,100px)", top: "50%", right: "1vw", rot: "6deg", op: 0.6 },
  ],
  "15": [
    { src: "girl", size: "clamp(100px,14vw,180px)", top: "8%", right: "3vw", rot: "-4deg", op: 0.85 },
    { src: "neko", size: "clamp(70px,10vw,120px)", bottom: "15%", right: "8vw", rot: "8deg", op: 0.75 },
    { src: "pocky", size: "clamp(60px,8vw,100px)", top: "50%", right: "1vw", rot: "10deg", op: 0.6 },
  ],
  "16": [
    { src: "ticket", size: "clamp(100px,14vw,180px)", top: "8%", right: "3vw", rot: "5deg", op: 0.85 },
    { src: "sakura", size: "clamp(70px,10vw,120px)", bottom: "15%", right: "8vw", rot: "-8deg", op: 0.75 },
    { src: "suitcase", size: "clamp(60px,8vw,100px)", top: "50%", right: "1vw", rot: "6deg", op: 0.6 },
    { src: "neko", size: "clamp(55px,7vw,90px)", bottom: "30%", right: "14vw", rot: "-10deg", op: 0.6 },
  ],
};

export const DAY_LABEL_ICON: Record<string, string> = {
  "01": "suitcase",
  "02": "daruma",
  "03": "pagoda",
  "04": "pagoda",
  "05": "fuji",
  "06": "train",
  "07": "tea",
  "08": "torii",
  "09": "flag",
  "10": "ramen",
  "11": "castle",
  "12": "torii",
  "13": "logo",
  "14": "train",
  "15": "girl",
  "16": "ticket",
};
