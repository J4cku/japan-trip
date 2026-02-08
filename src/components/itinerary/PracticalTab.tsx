"use client";

import { useState } from "react";
import type { DietaryGuide, Booking, TransportInfo } from "@/types/trip";

function SectionTitle({ children, icon }: { children: React.ReactNode; icon: string }) {
  return (
    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
      <span>{icon}</span> {children}
    </h2>
  );
}

export function PracticalTab({
  dietary,
  bookings,
  transport,
  packing,
}: {
  dietary: DietaryGuide;
  bookings: Booking[];
  transport: TransportInfo;
  packing: string[];
}) {
  const [openSection, setOpenSection] = useState(0);

  const dietarySections = [
    { title: "Essential Japanese Phrases", items: dietary.japanesePhrases.map((p) => `"${p.japanese}" \u2014 ${p.meaning}`) },
    { title: "Safe Foods (Naturally Veg + GF)", items: dietary.safeFoods },
    { title: "Watch Out For", items: dietary.watchOut },
    { title: "Recommended Apps & Resources", items: dietary.apps },
  ];

  return (
    <div className="space-y-6">
      <div>
        <SectionTitle icon={"\uD83C\uDF71"}>Vegetarian & Gluten-Free Guide</SectionTitle>
        <div className="space-y-3">
          {dietarySections.map((section, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setOpenSection(openSection === i ? -1 : i)}
                className="w-full px-4 py-3 flex justify-between items-center text-left cursor-pointer"
              >
                <span className="font-semibold text-sm text-slate-800">{section.title}</span>
                <span className="text-slate-400">{openSection === i ? "\u25B2" : "\u25BC"}</span>
              </button>
              {openSection === i && (
                <div className="px-4 pb-3">
                  <ul className="space-y-1.5">
                    {section.items.map((item, j) => (
                      <li key={j} className="text-sm text-slate-700">{"\u2022"} {item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Restaurants */}
      <div>
        <SectionTitle icon={"\uD83C\uDF7D\uFE0F"}>Recommended Restaurants</SectionTitle>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {dietary.recommendedRestaurants.map((r, i) => (
            <div key={i} className={`px-4 py-2.5 ${i > 0 ? "border-t border-slate-100" : ""}`}>
              <p className="text-sm font-medium text-slate-800">{r.name}</p>
              <p className="text-xs text-slate-500">{r.city} &middot; {r.type}</p>
            </div>
          ))}
        </div>
      </div>

      {/* JR Pass */}
      <div>
        <SectionTitle icon={"\uD83D\uDE85"}>JR Pass Analysis</SectionTitle>
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <p className="text-lg font-bold text-slate-800">&yen;{transport.jrPassAnalysis.sevenDay.toLocaleString()}</p>
              <p className="text-xs text-slate-500">7-day pass</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <p className="text-lg font-bold text-slate-800">&yen;{transport.jrPassAnalysis.fourteenDay.toLocaleString()}</p>
              <p className="text-xs text-slate-500">14-day pass</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <p className="text-lg font-bold text-slate-800">{transport.jrPassAnalysis.estimatedIndividualTotal}</p>
              <p className="text-xs text-slate-500">Individual tickets (est.)</p>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm font-semibold text-amber-800 mb-1">{"\u26A0\uFE0F"} Honest Assessment</p>
            <p className="text-sm text-amber-900 leading-relaxed">{transport.jrPassAnalysis.recommendation}</p>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{transport.jrPassAnalysis.note}</p>
        </div>
      </div>

      {/* Bookings */}
      <div>
        <SectionTitle icon={"\uD83D\uDCCB"}>Book in Advance</SectionTitle>
        <div className="space-y-2">
          {bookings.map((b, i) => (
            <div key={i} className="bg-white rounded-lg border border-slate-200 px-4 py-2 flex items-center gap-3">
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  b.priority === "critical" ? "bg-red-500" :
                  b.priority === "high" ? "bg-amber-500" :
                  b.priority === "medium" ? "bg-blue-500" : "bg-slate-400"
                }`}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">{b.item}</p>
                <p className="text-xs text-slate-500">{b.when}</p>
              </div>
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-white ${
                  b.priority === "critical" ? "bg-red-500" :
                  b.priority === "high" ? "bg-amber-500" :
                  b.priority === "medium" ? "bg-blue-500" : "bg-slate-400"
                }`}
              >
                {b.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Packing */}
      <div>
        <SectionTitle icon={"\uD83C\uDF92"}>Packing Checklist</SectionTitle>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <ul className="grid grid-cols-1 gap-1.5">
            {packing.map((item, i) => (
              <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                <span className="text-slate-300 mt-0.5">{"\u25A1"}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
