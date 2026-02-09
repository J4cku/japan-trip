"use client";
import { useState } from "react";
import type { ExtendedPracticalTips } from "@/types/trip";

export function Japan101({ tips, dietaryReminder }: { tips: ExtendedPracticalTips; dietaryReminder: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="japan101-toggle" onClick={() => setIsOpen(!isOpen)} title="Japan Tips">
        {"\uD83D\uDCCB"}
      </button>
      {isOpen && (
        <div className="japan101-panel">
          <div className="japan101-header">
            <h3 className="japan101-title">Japan 101</h3>
            <button className="japan101-close" onClick={() => setIsOpen(false)}>{"\u2715"}</button>
          </div>
          <div className="japan101-dietary">
            <span className="japan101-dietary-icon">{"\u26A0\uFE0F"}</span>
            <p>{dietaryReminder}</p>
          </div>
          <ul className="japan101-tips">
            {tips.forLessExperienced.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
          {tips.emergencyFood && tips.emergencyFood.length > 0 && (
            <div className="japan101-emergency">
              <span className="japan101-emergency-label">Emergency GF foods:</span>
              <div className="japan101-emergency-items">
                {tips.emergencyFood.map((food, i) => (
                  <span key={i} className="japan101-emergency-item">{food}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
