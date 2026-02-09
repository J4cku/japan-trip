import type { OnsenEtiquette } from "@/types/trip";

export function OnsenGuide({ etiquette }: { etiquette: OnsenEtiquette }) {
  return (
    <div className="onsen-guide">
      <div className="onsen-guide-header">
        <span className="onsen-guide-icon">{"\u2668\uFE0F"}</span>
        <h3 className="onsen-guide-title">Onsen Etiquette</h3>
      </div>
      <ul className="onsen-guide-rules">
        {etiquette.rules.map((rule, i) => (
          <li key={i} className="onsen-guide-rule">
            <span className="onsen-guide-check">{"\u2713"}</span>
            <span>{rule}</span>
          </li>
        ))}
      </ul>
      {etiquette.tip && (
        <p className="onsen-guide-tip">{etiquette.tip}</p>
      )}
    </div>
  );
}
