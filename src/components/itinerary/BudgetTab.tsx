import type { Budget } from "@/types/trip";

function SectionTitle({ children, icon }: { children: React.ReactNode; icon: string }) {
  return (
    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
      <span>{icon}</span> {children}
    </h2>
  );
}

export function BudgetTab({ budget }: { budget: Budget }) {
  const categories: { label: string; keys: string[] }[] = [
    { label: "Flights & Transport", keys: ["flights", "nex", "trains", "localTransit", "kawaguchikoBus"] },
    { label: "Accommodation", keys: ["hotels"] },
    { label: "Food", keys: ["meals"] },
    { label: "Activities", keys: ["activities", "takkyubin"] },
    { label: "Other", keys: ["wifiAndSouvenirs"] },
  ];

  return (
    <div className="space-y-6">
      <SectionTitle icon={"\uD83D\uDCB0"}>Budget Breakdown (Per Person)</SectionTitle>

      {categories.map((cat) => (
        <div key={cat.label}>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">{cat.label}</h3>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {cat.keys
              .filter((k) => budget.perPerson[k])
              .map((k, i) => {
                const item = budget.perPerson[k];
                const amount = typeof item.amount === "number" ? `\u00A5${item.amount.toLocaleString()}` : item.amount;
                return (
                  <div key={k} className={`px-4 py-2.5 flex items-center gap-3 ${i > 0 ? "border-t border-slate-100" : ""}`}>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800">{item.note}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-slate-800">{amount}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}

      <div className="bg-slate-800 text-white rounded-xl p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-slate-300">Estimated Total ({budget.currency === "JPY" ? "4 people" : "group"})</p>
            <p className="text-2xl font-bold">{budget.totalGroup}</p>
            <p className="text-sm text-slate-400">{budget.totalGroupUSD}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-slate-300">Per Person</p>
            <p className="text-2xl font-bold">{budget.totalPerPerson}</p>
            <p className="text-sm text-slate-400">{budget.totalPerPersonUSD}</p>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3">{budget.note}</p>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
        <p className="text-sm font-semibold text-emerald-800 mb-2">{"\uD83D\uDCA1"} Money-Saving Tips</p>
        <ul className="space-y-1.5 text-sm text-emerald-900">
          <li>{"\u2022"} Konbini meals can replace sit-down restaurants for &yen;500&ndash;800/meal</li>
          <li>{"\u2022"} 100-yen shops (Daiso, Seria) for travel supplies and souvenirs</li>
          <li>{"\u2022"} Tax-free shopping at stores with the &ldquo;TAX FREE&rdquo; sign (&yen;5,000+ purchase)</li>
          <li>{"\u2022"} Book Shinkansen seats early &mdash; non-reserved cars are cheaper but crowded</li>
          <li>{"\u2022"} Supermarket bento boxes after 7pm are often 20&ndash;50% off</li>
        </ul>
      </div>
    </div>
  );
}
