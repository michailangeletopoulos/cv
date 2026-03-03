"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Stars from "@/components/Stars";
import Legend from "@/components/Legend";
import SectionModal from "@/components/SectionModal";
import { SectionId } from "@/data/portfolio";

// Three.js must be dynamically imported (no SSR)
const Brain3D = dynamic(() => import("@/components/Brain3D"), { ssr: false });

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  const handleLobeClick = useCallback((id: SectionId) => {
    setActiveSection(id);
  }, []);

  return (
    <main className="root">
      <Stars />

      <Brain3D onLobeClick={handleLobeClick} />

      {/* Info bar */}
      <header className="info-bar">
        <div>
          <div className="info-name">Michalis Angeletopoulos</div>
          <div className="info-role">Full-Stack Developer</div>
        </div>
        <div className="info-role" style={{ fontSize: "0.65rem" }}>
          {"drag · rotate · click a lobe"}
        </div>
      </header>

      {/* Legend */}
      <Legend onLobeClick={handleLobeClick} />

      {/* Hint */}
      <div className="hint-bar">
        <span className="hint-text">click a lobe to explore</span>
      </div>

      {/* Modal */}
      {activeSection && (
        <SectionModal
          sectionId={activeSection}
          onClose={() => setActiveSection(null)}
        />
      )}
    </main>
  );
}