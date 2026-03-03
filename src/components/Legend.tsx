"use client";

import { LOBES, SectionId } from "@/data/portfolio";

interface LegendProps {
  onLobeClick: (id: SectionId) => void;
}

export default function Legend({ onLobeClick }: LegendProps) {
  return (
    <nav className="legend" aria-label="Brain sections">
      {LOBES.map((lobe) => (
        <button
          key={lobe.id}
          className="legend-item"
          onClick={() => onLobeClick(lobe.id)}
          style={{ background: "none", border: "none", padding: 0 }}
          title={lobe.label}
        >
          <span
            className="legend-dot"
            style={{ background: lobe.color, color: lobe.color }}
          />
          <span className="legend-label">{lobe.label}</span>
        </button>
      ))}
    </nav>
  );
}