import type { Metadata } from "next";
import { Inter, Playfair_Display, Space_Mono } from "next/font/google";
import "./globals.css";
import { SakuraParticles } from "@/components/fun/SakuraParticles";
import { KonamiEgg } from "@/components/fun/KonamiEgg";
import { CurrencyConverter } from "@/components/fun/CurrencyConverter";
import { StampCollector } from "@/components/fun/StampCollector";
import { AmbientSound } from "@/components/fun/AmbientSound";
import { MobileMenu } from "@/components/MobileMenu";
import { ThemeToggle } from "@/components/presentation/ThemeToggle";
import { WeatherOverlay } from "@/components/fun/WeatherOverlay";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "800", "900"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "TripMag — Your Trip. Perfectly Personalized.",
    template: "%s — TripMag",
  },
  description: "AI-powered personalized trip magazines. Skip the travel research and get a stunning interactive magazine with curated recommendations, custom itineraries, and everything you need.",
  metadataBase: new URL("https://jpn.leszczynski.me"),
  openGraph: {
    type: "website",
    siteName: "TripMag",
    title: "TripMag — Your Trip. Perfectly Personalized.",
    description: "AI-powered personalized trip magazines for the modern traveler.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "TripMag" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TripMag",
    description: "AI-powered personalized trip magazines for the modern traveler.",
    images: ["/og.png"],
  },
  other: {
    "theme-color": "#0A0E27",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${playfair.variable} ${spaceMono.variable}`}>
        {children}
        <SakuraParticles />
        <KonamiEgg />
        <CurrencyConverter />
        <StampCollector />
        <ThemeToggle />
        <WeatherOverlay />
        <AmbientSound />
        <MobileMenu />
      </body>
    </html>
  );
}
