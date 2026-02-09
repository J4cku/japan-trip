const fs = require("fs");
const path = require("path");

const src = path.resolve(__dirname, "../japan-itinerary.json");
const dest = path.resolve(__dirname, "../src/data/trip.json");

function copy() {
  fs.copyFileSync(src, dest);
  console.log(`[sync] ${new Date().toLocaleTimeString()} — trip.json updated`);
}

copy();
fs.watchFile(src, { interval: 500 }, copy);
console.log("[sync] Watching japan-itinerary.json for changes...");
