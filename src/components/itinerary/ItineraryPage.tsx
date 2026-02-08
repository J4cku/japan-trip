"use client";

import { useState } from "react";
import tripData from "@/data/trip.json";
import type { TripData } from "@/types/trip";
import { DayCard } from "./DayCard";
import { PracticalTab } from "./PracticalTab";
import { BudgetTab } from "./BudgetTab";
import Link from "next/link";

const data = tripData as unknown as TripData;

const REGION_STYLES: Record<string, { bg: string; border: string; badge: string; accent: string }> = {
  tokyo: { bg: "bg-blue-50", border: "border-blue-200", badge: "bg-blue-600", accent: "text-blue-700" },
  fuji: { bg: "bg-violet-50", border: "border-violet-200", badge: "bg-violet-600", accent: "text-violet-700" },
  kyushu: { bg: "bg-emerald-50", border: "border-emerald-200", badge: "bg-emerald-600", accent: "text-emerald-700" },
  seto: { bg: "bg-cyan-50", border: "border-cyan-200", badge: "bg-cyan-600", accent: "text-cyan-700" },
  kansai: { bg: "bg-amber-50", border: "border-amber-200", badge: "bg-amber-600", accent: "text-amber-700" },
  travel: { bg: "bg-slate-50", border: "border-slate-200", badge: "bg-slate-500", accent: "text-slate-600" },
};

const ROUTE_STOPS = [
  { name: "Warsaw", sub: "May 8", icon: "\u2708\uFE0F" },
  { name: "Tokyo", sub: "May 9\u201312", icon: "\uD83C\uDFD9\uFE0F" },
  { name: "Kamakura", sub: "Day trip", icon: "\uD83D\uDDFF" },
  { name: "Mt Fuji", sub: "Day trip", icon: "\uD83D\uDDFB" },
  { name: "Kumamoto", sub: "May 13\u201314", icon: "\uD83C\uDFEF" },
  { name: "Mt Aso", sub: "May 14", icon: "\uD83C\uDF0B" },
  { name: "Onomichi", sub: "May 15", icon: "\uD83C\uDFD8\uFE0F" },
  { name: "Shimanami", sub: "May 16", icon: "\uD83D\uDEB4" },
  { name: "Osaka", sub: "May 16\u201320", icon: "\uD83C\uDF1F" },
  { name: "Kyoto", sub: "Day trip", icon: "\u26E9\uFE0F" },
  { name: "Nara", sub: "Day trip", icon: "\uD83E\uDD8C" },
  { name: "Tokyo", sub: "May 21\u201322", icon: "\uD83C\uDFD9\uFE0F" },
  { name: "Warsaw", sub: "May 23", icon: "\uD83C\uDFE0" },
];

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
        active
          ? "bg-slate-800 text-white shadow-md"
          : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
      }`}
    >
      {children}
    </button>
  );
}

export function ItineraryPage() {
  const [tab, setTab] = useState<"itinerary" | "practical" | "budget">("itinerary");
  const [openDay, setOpenDay] = useState<number | null>(null);
  const [expandAll, setExpandAll] = useState(false);

  const toggleDay = (dayNum: number) => {
    if (expandAll) {
      setExpandAll(false);
      setOpenDay(dayNum);
    } else {
      setOpenDay(openDay === dayNum ? null : dayNum);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-4xl mb-2">{"\uD83C\uDDEF\uD83C\uDDF5"}</p>
          <h1 className="text-2xl font-bold text-slate-800">Japan Adventure</h1>
          <p className="text-sm text-slate-500 mt-1">
            {data.trip.dates} &middot; {data.trip.durationDays} Days &middot; {data.trip.travelers} Travelers
          </p>
          <p className="text-xs text-slate-400 mt-1">{data.trip.route.join(" \u2192 ")}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[
            { val: "14", label: "Days", icon: "\uD83D\uDCC5" },
            { val: "8", label: "Cities", icon: "\uD83D\uDCCD" },
            { val: "2", label: "Bike Rides", icon: "\uD83D\uDEB4" },
            { val: "1", label: "Onsen", icon: "\u2668\uFE0F" },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-lg border border-slate-200 p-2 text-center">
              <p className="text-lg">{s.icon}</p>
              <p className="text-lg font-bold text-slate-800">{s.val}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Route */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 overflow-x-auto">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Your Route</p>
          <div className="flex items-center gap-1 min-w-max">
            {ROUTE_STOPS.map((stop, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center">
                  <span className="text-lg">{stop.icon}</span>
                  <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">{stop.name}</span>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{stop.sub}</span>
                </div>
                {i < ROUTE_STOPS.length - 1 && (
                  <div className="w-6 h-px bg-slate-300 mx-1" style={{ marginTop: "-12px" }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <TabButton active={tab === "itinerary"} onClick={() => setTab("itinerary")}>{"\uD83D\uDDFA\uFE0F"} Itinerary</TabButton>
          <TabButton active={tab === "practical"} onClick={() => setTab("practical")}>{"\uD83D\uDCD6"} Practical Info</TabButton>
          <TabButton active={tab === "budget"} onClick={() => setTab("budget")}>{"\uD83D\uDCB0"} Budget</TabButton>
        </div>

        {/* Content */}
        {tab === "itinerary" && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <p className="text-xs text-slate-500">Click a day to expand details</p>
              <button
                onClick={() => { setExpandAll(!expandAll); setOpenDay(null); }}
                className="text-xs text-slate-500 hover:text-slate-700 underline cursor-pointer"
              >
                {expandAll ? "Collapse All" : "Expand All"}
              </button>
            </div>
            {data.days.map((day) => (
              <DayCard
                key={day.day}
                day={day}
                regionStyle={REGION_STYLES[day.region] || REGION_STYLES.travel}
                isOpen={expandAll || openDay === day.day}
                onToggle={() => toggleDay(day.day)}
              />
            ))}
          </div>
        )}

        {tab === "practical" && <PracticalTab dietary={data.dietary} bookings={data.bookings} transport={data.transport} packing={data.packing} />}
        {tab === "budget" && <BudgetTab budget={data.budget} />}

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-400 border-t border-slate-200 pt-4">
          <p>{"\u3044\u3044\u65C5\u3092\uFF01"} (Ii tabi wo!) &mdash; Have a great trip!</p>
          <p className="mt-1">Built with love for Jacek &amp; crew &middot; May 2026</p>
          <Link href="/" className="inline-block mt-3 text-slate-500 hover:text-slate-700 underline">
            View Presentation
          </Link>
        </div>
      </div>
    </div>
  );
}
