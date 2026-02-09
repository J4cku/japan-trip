import type { NakasendoTrail } from "@/types/trip";

export function TrailProfile({ trail }: { trail: NakasendoTrail }) {
  const totalRange = trail.elevationPass - Math.min(trail.elevationStart, trail.elevationEnd);

  return (
    <div className="trail-profile">
      <div className="trail-header">
        <span className="trail-icon">{"\uD83E\uDD7E"}</span>
        <h3 className="trail-title">Nakasendo Trail</h3>
        <span className="trail-badge">{trail.difficulty}</span>
      </div>
      <div className="trail-stats">
        <div className="trail-stat">
          <span className="trail-stat-val">{trail.distance}</span>
          <span className="trail-stat-label">Distance</span>
        </div>
        <div className="trail-stat">
          <span className="trail-stat-val">{trail.duration}</span>
          <span className="trail-stat-label">Duration</span>
        </div>
        <div className="trail-stat">
          <span className="trail-stat-val">{trail.elevationPass}m</span>
          <span className="trail-stat-label">Highest point</span>
        </div>
      </div>
      <div className="trail-elevation">
        <div className="trail-elevation-bar">
          <div className="trail-point trail-start" style={{ bottom: `${((trail.elevationStart - trail.elevationEnd) / totalRange) * 100}%` }}>
            <span>{trail.elevationStart}m</span>
            <span className="trail-point-label">Magome</span>
          </div>
          <div className="trail-point trail-pass" style={{ bottom: "100%" }}>
            <span>{trail.elevationPass}m</span>
            <span className="trail-point-label">Pass</span>
          </div>
          <div className="trail-point trail-end" style={{ bottom: "0%" }}>
            <span>{trail.elevationEnd}m</span>
            <span className="trail-point-label">Tsumago</span>
          </div>
        </div>
      </div>
      <div className="trail-terrain">
        <span className="trail-terrain-label">Terrain:</span> {trail.terrain}
      </div>
      <div className="trail-packing">
        <span className="trail-packing-label">What to pack:</span>
        <ul className="trail-packing-list">
          {trail.whatToPack.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
