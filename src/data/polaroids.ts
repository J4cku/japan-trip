import type { PolaroidPhoto } from "@/types/trip";

const u = (id: string) => `https://images.unsplash.com/${id}?w=400&h=400&fit=crop`;

export const DAY_POLAROIDS: Record<string, PolaroidPhoto[]> = {
  "01": [
    { src: u("photo-1503899036084-c55cdd92da26"), caption: "Last Polish coffee", rotation: -3, position: { top: "12%", right: "6%" }, size: "md" },
    { src: u("photo-1436491865332-7a61a109cc05"), caption: "LO79, boarding", rotation: 4, position: { top: "45%", right: "3%" }, size: "sm" },
    { src: u("photo-1540959733332-eab4deabeeaf"), caption: "Wake up in Tokyo", rotation: -1, position: { top: "20%", left: "4%" }, size: "md" },
  ],
  "02": [
    { src: u("photo-1540959733332-eab4deabeeaf"), caption: "Shinjuku skyline, first time", rotation: -3, position: { top: "12%", right: "6%" }, size: "md" },
    { src: u("photo-1555396273-367ea4eb4db5"), caption: "First konbini onigiri", rotation: 4, position: { top: "45%", right: "3%" }, size: "sm" },
    { src: u("photo-1542051841857-5f90071e7989"), caption: "Midnight crossing", rotation: -1, position: { top: "20%", left: "4%" }, size: "md" },
  ],
  "03": [
    { src: u("photo-1705807671058-db6c317df87e"), caption: "TeamLab Borderless", rotation: 2, position: { top: "10%", right: "5%" }, size: "lg" },
    { src: u("photo-1542051841857-5f90071e7989"), caption: "Shibuya scramble after dark", rotation: -5, position: { top: "55%", left: "5%" }, size: "sm" },
    { src: u("photo-1528360983277-13d401cdc186"), caption: "Walk from Gyoen", rotation: 3, position: { top: "22%", left: "3%" }, size: "md" },
  ],
  "04": [
    { src: u("photo-1528164344705-47542687000d"), caption: "Daibutsu, cast 1252", rotation: 1, position: { top: "15%", right: "4%" }, size: "md" },
    { src: u("photo-1545569341-9eb8b30979d9"), caption: "Hase-dera incense", rotation: -4, position: { top: "48%", right: "7%" }, size: "sm" },
    { src: u("photo-1507525428034-b723cf961d3e"), caption: "Yuigahama at low tide", rotation: 3, position: { top: "22%", left: "3%" }, size: "md" },
  ],
  "05": [
    { src: u("photo-1490806843957-31f4c9a91c65"), caption: "Fuji-san. Finally.", rotation: -2, position: { top: "10%", right: "5%" }, size: "lg" },
    { src: u("photo-1524413840807-0c3cb6fa808d"), caption: "Oishi Park reflections", rotation: 5, position: { top: "52%", left: "6%" }, size: "sm" },
    { src: u("photo-1503899036084-c55cdd92da26"), caption: "Cafe Troisieme Marche", rotation: -2, position: { top: "20%", left: "3%" }, size: "md" },
  ],
  "06": [
    { src: u("photo-1436491865332-7a61a109cc05"), caption: "JAL629 wing view", rotation: 3, position: { top: "12%", right: "4%" }, size: "sm" },
    { src: u("photo-1578469550956-0e16b69c6a3d"), caption: "Kumamoto Castle, late light", rotation: -3, position: { top: "40%", right: "6%" }, size: "md" },
    { src: u("photo-1553621042-f6e147245754"), caption: "Kei car loaded up", rotation: 1, position: { top: "18%", left: "5%" }, size: "md" },
  ],
  "07": [
    { src: u("photo-1698879435405-7189ad41155c"), caption: "Naka-dake crater steam", rotation: -4, position: { top: "14%", right: "5%" }, size: "md" },
    { src: u("photo-1505118380757-91f5f5632de0"), caption: "E-bike across the caldera", rotation: 2, position: { top: "50%", left: "4%" }, size: "sm" },
    { src: u("photo-1545569341-9eb8b30979d9"), caption: "Kurokawa at dusk", rotation: 3, position: { top: "25%", left: "3%" }, size: "md" },
  ],
  "08": [
    { src: u("photo-1545569341-9eb8b30979d9"), caption: "Manai-no-taki kayaks", rotation: -2, position: { top: "12%", right: "5%" }, size: "md" },
    { src: u("photo-1503899036084-c55cdd92da26"), caption: "Gokase walking path", rotation: 4, position: { top: "52%", left: "6%" }, size: "sm" },
    { src: u("photo-1528164344705-47542687000d"), caption: "Amano-Iwato cedars", rotation: 1, position: { top: "22%", left: "3%" }, size: "md" },
  ],
  "09": [
    { src: u("photo-1517760444937-f6397edcbbcd"), caption: "Five Bridges drive", rotation: -1, position: { top: "10%", right: "4%" }, size: "lg" },
    { src: u("photo-1507525428034-b723cf961d3e"), caption: "Tomioka beach, no tourists", rotation: 5, position: { top: "50%", left: "5%" }, size: "sm" },
    { src: u("photo-1505118380757-91f5f5632de0"), caption: "Sunset off Amakusa", rotation: -3, position: { top: "20%", left: "3%" }, size: "md" },
  ],
  "10": [
    { src: u("photo-1474302770737-173ee21bab63"), caption: "Sakura 752, boarding", rotation: 2, position: { top: "12%", right: "5%" }, size: "md" },
    { src: u("photo-1551218808-94e220e084d2"), caption: "First Osaka takoyaki", rotation: -4, position: { top: "45%", right: "3%" }, size: "sm" },
    { src: u("photo-1590559899731-a382839e5549"), caption: "Dotonbori, lit up", rotation: 1, position: { top: "22%", left: "4%" }, size: "md" },
  ],
  "11": [
    { src: u("photo-1590559899731-a382839e5549"), caption: "Glico Running Man", rotation: -3, position: { top: "14%", right: "6%" }, size: "md" },
    { src: u("photo-1551218808-94e220e084d2"), caption: "Takoyaki from the stall", rotation: 4, position: { top: "50%", left: "5%" }, size: "sm" },
    { src: u("photo-1629569320448-a5504a24d384"), caption: "Hozenji lanterns", rotation: 1, position: { top: "20%", left: "3%" }, size: "md" },
  ],
  "12": [
    { src: u("photo-1517760444937-f6397edcbbcd"), caption: "Shimanami stretch", rotation: 1, position: { top: "10%", right: "4%" }, size: "lg" },
    { src: u("photo-1505118380757-91f5f5632de0"), caption: "Setoda lemon stop", rotation: -5, position: { top: "48%", left: "6%" }, size: "md" },
    { src: u("photo-1545569341-9eb8b30979d9"), caption: "Dogo Honkan steam", rotation: 3, position: { top: "55%", right: "3%" }, size: "sm" },
  ],
  "13": [
    { src: u("photo-1474302770737-173ee21bab63"), caption: "Ishizuchi to Takamatsu", rotation: -2, position: { top: "15%", right: "5%" }, size: "md" },
    { src: u("photo-1505118380757-91f5f5632de0"), caption: "Seto Inland Sea ferry", rotation: 5, position: { top: "48%", left: "4%" }, size: "sm" },
    { src: u("photo-1536098561742-ca998e48cbcc"), caption: "Yellow Pumpkin, golden hour", rotation: 2, position: { top: "20%", left: "3%" }, size: "md" },
  ],
  "14": [
    { src: u("photo-1474302770737-173ee21bab63"), caption: "Nozomi north", rotation: 3, position: { top: "12%", right: "5%" }, size: "sm" },
    { src: u("photo-1540959733332-eab4deabeeaf"), caption: "Tokyo lights once more", rotation: -3, position: { top: "40%", right: "6%" }, size: "md" },
    { src: u("photo-1503899036084-c55cdd92da26"), caption: "Cocktail at Bar High Five", rotation: 1, position: { top: "22%", left: "5%" }, size: "md" },
  ],
  "15": [
    { src: u("photo-1503899036084-c55cdd92da26"), caption: "Slow morning coffee", rotation: 1, position: { top: "15%", right: "6%" }, size: "md" },
    { src: u("photo-1528360983277-13d401cdc186"), caption: "Don Quijote omiyage haul", rotation: -5, position: { top: "48%", right: "3%" }, size: "sm" },
    { src: u("photo-1555396273-367ea4eb4db5"), caption: "One last ramen", rotation: 3, position: { top: "25%", left: "4%" }, size: "md" },
  ],
  "16": [
    { src: u("photo-1474302770737-173ee21bab63"), caption: "N'EX to NRT", rotation: -1, position: { top: "18%", right: "6%" }, size: "md" },
    { src: u("photo-1536098561742-ca998e48cbcc"), caption: "Sayonara, Japan", rotation: 3, position: { top: "50%", left: "5%" }, size: "sm" },
    { src: u("photo-1436491865332-7a61a109cc05"), caption: "LO80 wing view", rotation: -3, position: { top: "22%", left: "3%" }, size: "md" },
  ],
};
