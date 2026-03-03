"use client";

import { useEffect, useState } from "react";
import { LOBES, SECTION_DATA, SectionId } from "@/data/portfolio";

interface ModalProps {
  sectionId: SectionId;
  onClose: () => void;
}

export default function SectionModal({ sectionId, onClose }: ModalProps) {
  const [closing, setClosing] = useState(false);
  const lobe = LOBES.find((l) => l.id === sectionId)!;
  const data = SECTION_DATA[sectionId] as any;

  // Close on backdrop click or Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  function handleClose() {
    setClosing(true);
    setTimeout(onClose, 240);
  }

  return (
    <div
      className={`modal-backdrop ${closing ? "closing" : ""}`}
      onMouseDown={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="modal"
        style={{ borderColor: `${lobe.color}30` }}
      >
        {/* Header */}
        <div className="modal-header">
          <span className="modal-icon">{lobe.icon}</span>
          <h2
            className="modal-title"
            style={{ color: lobe.color }}
          >
            {lobe.label}
          </h2>
        </div>

        <button className="modal-close" onClick={handleClose} aria-label="Close">✕</button>

        {/* Content */}
        {sectionId === "skills" && <SkillsContent data={data} color={lobe.color} />}
        {sectionId === "experience" && <ExperienceContent data={data} color={lobe.color} />}
        {sectionId === "education" && <EducationContent data={data} color={lobe.color} />}
        {sectionId === "seminars" && <SeminarsContent data={data} color={lobe.color} />}
        {sectionId === "hobbies" && <ProjectsContent data={data} color={lobe.color} />}
        {sectionId === "contact" && <ContactContent data={data} color={lobe.color} />}
      </div>
    </div>
  );
}

// ─── Skills ──────────────────────────────────────────────────────────────────

function SkillsContent({ data, color }: { data: any; color: string }) {
  return (
    <>
      {data.categories.map((cat: any) => (
        <div key={cat.name} className="modal-section">
          <div className="modal-section-title">{cat.name}</div>
          <div className="tags-wrap">
            {cat.tags.map((tag: any) => (
              <span
                key={tag.label}
                className="tag"
                style={{
                  borderColor: tag.primary ? color : `${color}40`,
                  color: tag.primary ? color : "var(--text)",
                  background: tag.primary ? `${color}15` : "transparent",
                }}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────

function ExperienceContent({ data, color }: { data: any; color: string }) {
  return (
    <div className="modal-section">
      {data.jobs.map((job: any, i: number) => (
        <div key={i} className="timeline-item" style={{ borderColor: `${color}25` }}>
          <div className="timeline-company" style={{ color }}>{job.company}</div>
          <div className="timeline-role">{job.role}</div>
          <div className="timeline-period">{job.period}</div>
          <div className="timeline-desc">{job.description}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Education ────────────────────────────────────────────────────────────────

function EducationContent({ data, color }: { data: any; color: string }) {
  return (
    <div className="modal-section">
      {data.degrees.map((d: any, i: number) => (
        <div key={i} className="edu-item" style={{ borderColor: `${color}25` }}>
          <div className="edu-degree" style={{ color }}>{d.degree}</div>
          <div className="edu-school">{d.school}</div>
          <div className="edu-period">{d.period}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Seminars ─────────────────────────────────────────────────────────────────

function SeminarsContent({ data, color }: { data: any; color: string }) {
  return (
    <div className="modal-section">
      {data.items.map((s: any, i: number) => (
        <div key={i} className="seminar-item" style={{ borderColor: `${color}25` }}>
          <div className="seminar-badge">{s.icon}</div>
          <div>
            <div className="seminar-name" style={{ color }}>{s.name}</div>
            <div className="seminar-org">{s.org}</div>
            <div className="seminar-year">{s.year}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsContent({ data, color }: { data: any; color: string }) {
  return (
    <div className="modal-section">
      {data.projects.map((p: any, i: number) => (
        <div key={i} className="timeline-item" style={{ borderColor: `${color}25` }}>
          <div className="timeline-company" style={{ color }}>{p.name}</div>
          <div className="timeline-period">{p.year}</div>
          <div className="timeline-desc" style={{ marginBottom: "12px" }}>{p.description}</div>
          <div className="tags-wrap" style={{ marginBottom: "10px" }}>
            {p.tech.map((t: string) => (
              <span key={t} className="tag" style={{ borderColor: `${color}40`, color: "var(--text)", fontSize: "0.68rem" }}>
                {t}
              </span>
            ))}
          </div>
          <a
            href={p.url}
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: "0.7rem", color, letterSpacing: "0.05em", textDecoration: "none", opacity: 0.8 }}
          >
            GitHub →
          </a>
        </div>
      ))}
    </div>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function ContactContent({ data, color }: { data: any; color: string }) {
  return (
    <div className="modal-section">
      <div className="contact-links">
        {data.links.map((l: any, i: number) => (
          <a
            key={i}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="contact-link"
            style={{ borderColor: `${color}25` }}
          >
            <span className="contact-link-icon">{l.icon}</span>
            <div>
              <div className="contact-link-label">{l.label}</div>
              <div>{l.value}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}