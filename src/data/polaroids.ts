import type { PolaroidPhoto } from "@/types/trip";

const u = (id: string) => `https://images.unsplash.com/${id}?w=400&h=400&fit=crop`;

export const DAY_POLAROIDS: Record<string, PolaroidPhoto[]> = {
  "01": [
    { src: u("photo-1611264789335-aa9294cec654"), caption: "WAW · LO79 calling", rotation: -3, position: { top: "12%", right: "6%" }, size: "md" },
    { src: u("photo-1565444007614-6b38c78224df"), caption: "Ten hours over the Pole", rotation: 4, position: { top: "45%", right: "3%" }, size: "sm" },
    { src: u("photo-1696463469919-def9b2830857"), caption: "Snacks for the flight", rotation: -1, position: { top: "20%", left: "4%" }, size: "md" },
  ],
  "02": [
    { src: u("photo-1622989428689-569c4fe81c11"), caption: "First Tokyo skyline", rotation: -3, position: { top: "12%", right: "6%" }, size: "md" },
    { src: u("photo-1696463469919-def9b2830857"), caption: "First konbini onigiri", rotation: 4, position: { top: "45%", right: "3%" }, size: "sm" },
    { src: u("photo-1542051841857-5f90071e7989"), caption: "Shibuya at midnight", rotation: -1, position: { top: "20%", left: "4%" }, size: "md" },
  ],
  "03": [
    { src: u("photo-1593073862407-a3ce22748763"), caption: "TeamLab Borderless", rotation: 2, position: { top: "10%", right: "5%" }, size: "lg" },
    { src: u("photo-1542051841857-5f90071e7989"), caption: "Scramble after dark", rotation: -5, position: { top: "55%", left: "5%" }, size: "sm" },
    { src: u("photo-1622989428689-569c4fe81c11"), caption: "Shibuya Sky, golden hour", rotation: 3, position: { top: "22%", left: "3%" }, size: "md" },
  ],
  "04": [
    { src: u("photo-1662554471428-d036dfbc6c45"), caption: "Daibutsu, cast 1252", rotation: 1, position: { top: "15%", right: "4%" }, size: "md" },
    { src: u("photo-1717089634125-19f8ec12e86e"), caption: "Yuigahama at low tide", rotation: -4, position: { top: "48%", right: "7%" }, size: "sm" },
    { src: u("photo-1542051841857-5f90071e7989"), caption: "Back to Shibuya by dusk", rotation: 3, position: { top: "22%", left: "3%" }, size: "md" },
  ],
  "05": [
    { src: u("photo-1714810443487-cfc0b72b28e2"), caption: "Fuji-san. Finally.", rotation: -2, position: { top: "10%", right: "5%" }, size: "lg" },
    { src: u("photo-1714810443487-cfc0b72b28e2"), caption: "Iyashi thatched roofs", rotation: 5, position: { top: "52%", left: "6%" }, size: "sm" },
  ],
  "06": [
    { src: u("photo-1705695464723-56195396666b"), caption: "JAL629, Haneda", rotation: 3, position: { top: "12%", right: "4%" }, size: "sm" },
    { src: u("photo-1600506639292-cb7ac26d3a06"), caption: "Kumamoto Castle keep", rotation: -3, position: { top: "40%", right: "6%" }, size: "md" },
    { src: u("photo-1565444007614-6b38c78224df"), caption: "Kyushu from the wing", rotation: 1, position: { top: "18%", left: "5%" }, size: "md" },
  ],
  "07": [
    { src: u("photo-1698879434759-0a54b36a3233"), caption: "Naka-dake crater steam", rotation: -4, position: { top: "14%", right: "5%" }, size: "md" },
    { src: u("photo-1760475291639-8fc73e25315d"), caption: "Kusasenri grasslands", rotation: 2, position: { top: "50%", left: "4%" }, size: "sm" },
    { src: u("photo-1700325347467-8767c512ecd1"), caption: "Kurokawa lanterns", rotation: 3, position: { top: "25%", left: "3%" }, size: "md" },
  ],
  "08": [
    { src: u("photo-1699073141845-5c6436fde432"), caption: "Manai-no-taki rowboats", rotation: -2, position: { top: "12%", right: "5%" }, size: "lg" },
    { src: u("photo-1760475291639-8fc73e25315d"), caption: "Volcanic highlands drive", rotation: 4, position: { top: "52%", left: "6%" }, size: "sm" },
  ],
  "09": [
    { src: u("photo-1706758419551-d30c4846d0f1"), caption: "Amakusa Five Bridges", rotation: -1, position: { top: "10%", right: "4%" }, size: "lg" },
    { src: u("photo-1664188578262-08c57ebf69ae"), caption: "Tomioka, no tourists", rotation: 5, position: { top: "50%", left: "5%" }, size: "sm" },
    { src: u("photo-1717089634125-19f8ec12e86e"), caption: "Sunset off the islands", rotation: -3, position: { top: "20%", left: "3%" }, size: "md" },
  ],
  "10": [
    { src: u("photo-1613097527499-02501b007b68"), caption: "Sakura 752 platform", rotation: 2, position: { top: "12%", right: "5%" }, size: "md" },
    { src: u("photo-1751094364516-02b351f9c277"), caption: "First Osaka takoyaki", rotation: -4, position: { top: "45%", right: "3%" }, size: "sm" },
    { src: u("photo-1769265114270-c8accef5b910"), caption: "Dotonbori, lit up", rotation: 1, position: { top: "22%", left: "4%" }, size: "md" },
  ],
  "11": [
    { src: u("photo-1769265114270-c8accef5b910"), caption: "Glico Running Man", rotation: -3, position: { top: "14%", right: "6%" }, size: "md" },
    { src: u("photo-1751094364516-02b351f9c277"), caption: "Takoyaki from the stall", rotation: 4, position: { top: "50%", left: "5%" }, size: "sm" },
    { src: u("photo-1559542386-3f1bc15aeaf5"), caption: "Hozenji lantern alley", rotation: 1, position: { top: "20%", left: "3%" }, size: "md" },
  ],
  "12": [
    { src: u("photo-1639048366948-92e8abb79460"), caption: "Shimanami bridge stretch", rotation: 1, position: { top: "10%", right: "4%" }, size: "lg" },
    { src: u("photo-1682330681951-17b874c6b37a"), caption: "Setoda lemon stop", rotation: -5, position: { top: "48%", left: "6%" }, size: "md" },
    { src: u("photo-1759271339366-fd558ca24b2c"), caption: "Dogo Onsen Honkan, 20:00", rotation: 3, position: { top: "55%", right: "3%" }, size: "sm" },
  ],
  "13": [
    { src: u("photo-1762776639828-bb304c9acb6c"), caption: "Yayoi's Yellow Pumpkin", rotation: -2, position: { top: "10%", right: "5%" }, size: "lg" },
    { src: u("photo-1544699748-bdfb8b2f3796"), caption: "Chichu · Tadao Ando", rotation: 5, position: { top: "48%", left: "4%" }, size: "sm" },
    { src: u("photo-1769321790854-c13b6a62d29e"), caption: "Benesse House view", rotation: 2, position: { top: "20%", left: "3%" }, size: "md" },
  ],
  "14": [
    { src: u("photo-1613097527499-02501b007b68"), caption: "Nozomi north", rotation: 3, position: { top: "12%", right: "5%" }, size: "sm" },
    { src: u("photo-1649947220552-bf31b0a8298f"), caption: "Sequence · Miyashita Park", rotation: -3, position: { top: "40%", right: "6%" }, size: "md" },
    { src: u("photo-1769265114270-c8accef5b910"), caption: "Last cocktail in Ginza", rotation: 1, position: { top: "22%", left: "5%" }, size: "md" },
  ],
  "15": [
    { src: u("photo-1763475775000-3a2ea3ca539f"), caption: "Don Quijote neon haul", rotation: 1, position: { top: "15%", right: "6%" }, size: "md" },
    { src: u("photo-1696463469919-def9b2830857"), caption: "One last konbini run", rotation: -5, position: { top: "48%", right: "3%" }, size: "sm" },
    { src: u("photo-1542051841857-5f90071e7989"), caption: "Shibuya, one more time", rotation: 3, position: { top: "25%", left: "4%" }, size: "md" },
  ],
  "16": [
    { src: u("photo-1561995704-aa9f9aeee83e"), caption: "N'EX to Narita", rotation: -1, position: { top: "18%", right: "6%" }, size: "md" },
    { src: u("photo-1565444007614-6b38c78224df"), caption: "LO80 wing, sayonara", rotation: 3, position: { top: "50%", left: "5%" }, size: "sm" },
    { src: u("photo-1622989428689-569c4fe81c11"), caption: "Last view of Tokyo", rotation: -3, position: { top: "22%", left: "3%" }, size: "md" },
  ],
};
