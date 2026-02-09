import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "../public");

// Load Inter font from Google Fonts cache or local
// We'll fetch it inline for the script
const fontData = await fetch(
  "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.ttf"
).then((r) => r.arrayBuffer());

const fontDataBold = await fetch(
  "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hjQ.ttf"
).then((r) => r.arrayBuffer());

const pages = [
  {
    name: "og",
    title: "JAPAN",
    subtitle: "2026",
    description: "May 9-22 — 14 Days, 4 Travelers",
    route: "Tokyo → Kumamoto → Onomichi → Shimanami Kaido → Osaka → Kyoto → Tokyo",
  },
  {
    name: "og-map",
    title: "MAP",
    subtitle: "166 Saved Pins",
    description: "Interactive map of temples, shrines, restaurants & more",
    route: "32 in plan · 81 nearby · 53 off-route",
  },
  {
    name: "og-hotels",
    title: "HOTELS",
    subtitle: "& Ryokans",
    description: "Curated stays across 5 cities",
    route: "Shibuya · Kumamoto · Onomichi · Osaka · Tokyo",
  },
  {
    name: "og-restaurants",
    title: "DINING",
    subtitle: "Guide",
    description: "Gluten-free & vegan-friendly spots across Japan",
    route: "Tokyo · Kumamoto · Onomichi · Osaka · Kyoto",
  },
  {
    name: "og-itinerary",
    title: "ITINERARY",
    subtitle: "Day by Day",
    description: "14 days across Japan — every detail planned",
    route: "Flights · Trains · Shinkansen · Cycling · Buses",
  },
];

for (const page of pages) {
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#000",
          fontFamily: "Inter",
          position: "relative",
          overflow: "hidden",
        },
        children: [
          // Red accent line top
          {
            type: "div",
            props: {
              style: { position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#BC002D" },
            },
          },
          // Content
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: 14,
                      letterSpacing: 6,
                      color: "#444",
                      textTransform: "uppercase",
                      marginBottom: 12,
                    },
                    children: "Japan 2026",
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      alignItems: "baseline",
                      gap: 16,
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            fontSize: 96,
                            fontWeight: 900,
                            letterSpacing: -4,
                            color: "#fff",
                            lineHeight: 1,
                          },
                          children: page.title,
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: {
                            fontSize: 36,
                            fontWeight: 200,
                            color: "#BC002D",
                            letterSpacing: 3,
                          },
                          children: page.subtitle,
                        },
                      },
                    ],
                  },
                },
                // Red line
                {
                  type: "div",
                  props: {
                    style: {
                      width: 60,
                      height: 2,
                      background: "#BC002D",
                      marginTop: 24,
                      marginBottom: 24,
                    },
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: 20,
                      color: "#888",
                      letterSpacing: 2,
                    },
                    children: page.description,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: 14,
                      color: "#444",
                      letterSpacing: 1,
                      marginTop: 16,
                      maxWidth: 900,
                      textAlign: "center",
                    },
                    children: page.route,
                  },
                },
              ],
            },
          },
          // Bottom red accent
          {
            type: "div",
            props: {
              style: { position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "#BC002D" },
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: fontData, weight: 400, style: "normal" },
        { name: "Inter", data: fontDataBold, weight: 900, style: "normal" },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
  });
  const png = resvg.render().asPng();

  mkdirSync(publicDir, { recursive: true });
  writeFileSync(resolve(publicDir, `${page.name}.png`), png);
  console.log(`[og] Generated ${page.name}.png`);
}
