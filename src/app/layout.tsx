import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SakuraParticles } from "@/components/fun/SakuraParticles";
import { KonamiEgg } from "@/components/fun/KonamiEgg";
import { CurrencyConverter } from "@/components/fun/CurrencyConverter";
import { StampCollector } from "@/components/fun/StampCollector";
import { AmbientSound } from "@/components/fun/AmbientSound";
import { MobileMenu } from "@/components/MobileMenu";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Japan 2026",
    template: "%s — Japan 2026",
  },
  description: "May 9-22, 2026 — 14 Days, 4 Travelers. Tokyo → Kumamoto → Onomichi → Shimanami Kaido → Osaka → Kyoto → Tokyo.",
  metadataBase: new URL("https://jpn.leszczynski.me"),
  openGraph: {
    type: "website",
    siteName: "Japan 2026",
    title: "Japan 2026",
    description: "May 9-22 — 14 Days, 4 Travelers across Japan",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Japan 2026 Trip" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan 2026",
    description: "May 9-22 — 14 Days, 4 Travelers across Japan",
    images: ["/og.png"],
  },
  other: {
    "theme-color": "#000000",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <SakuraParticles />
        <KonamiEgg />
        <CurrencyConverter />
        <StampCollector />
        <AmbientSound />
        <MobileMenu />
      </body>
    </html>
  );
}
