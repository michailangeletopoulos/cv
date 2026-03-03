// ─── Types ────────────────────────────────────────────────────────────────────

export type SectionId =
  | "skills"
  | "experience"
  | "education"
  | "seminars"
  | "hobbies"
  | "contact";

// ─── Lobe definitions (color + label per section) ─────────────────────────────

export const LOBES: {
  id: SectionId;
  label: string;
  color: string;
  icon: string;
}[] = [
  { id: "skills",     label: "Skills",      color: "#4ff8c0", icon: "⚡" },
  { id: "experience", label: "Experience",  color: "#7b61ff", icon: "💼" },
  { id: "education",  label: "Education",   color: "#ff6b6b", icon: "🎓" },
  { id: "seminars",   label: "Seminars",    color: "#f5a623", icon: "📚" },
  { id: "hobbies",    label: "Projects",    color: "#50c8ff", icon: "🚀" },
  { id: "contact",    label: "Contact",     color: "#c084fc", icon: "✉️"  },
];

// ─── Section content ──────────────────────────────────────────────────────────

export const SECTION_DATA: Record<SectionId, unknown> = {

  skills: {
    categories: [
      {
        name: "Frontend",
        tags: [
          { label: "React",       primary: true  },
          { label: "Next.js",     primary: true  },
          { label: "TypeScript",  primary: true  },
          { label: "JavaScript",  primary: false },
          { label: "CSS",  primary: false },
          { label: "Tailwind",    primary: false },
        ],
      },
      {
        name: "Databases",
        tags: [
          { label: "PostgreSQL",  primary: true  },
          { label: "MongoDB",     primary: true  },
          { label: "Supabase",    primary: true  },
          { label: "MySQL",  primary: false },
          { label: "Microsoft SQL Server",  primary: false },
        ],
      },
      {
        name: "Backend & Tools",
        tags: [
          { label: "Node.js",     primary: true  },
          { label: "Python",        primary: true },
          { label: "REST APIs",   primary: true },
          { label: "Java",     primary: true },
          { label: "Git",      primary: true },
          { label: "Vercel",         primary: false },
          { label: "Postman",      primary: false },
          { label: "UMLet",      primary: false },
          { label: "Bonitasoft",         primary: false },
          { label: "Oracle SQL Developer Data Modeler",      primary: false },
          { label: "ProjectLibre",      primary: false },  
        ],
      },
    ],
  },

  experience: {
    jobs: [
      {
        company: "Family Estates",
        role: "Agricultural Worker",
        period: "2018 – 2026",
        description:
          "Developed strong work ethic and physical/mental resilience through demanding seasonal harvests (grapes, olives).",
      },
      
    ],
  },

  education: {
    degrees: [
      {
        degree: "IT",
        school: "University of Piraeus",
        period: "2020 – 2025",
      },
    ],
  },

  seminars: {
    items: [
      {
        name: "Frontend (React.js) School",
        org: "Cognity",
        icon: "🎓",
      },
      {
        name: "The Founder’s Journey: 5 Steps to Build your Startup",
        org: "Piraeus Bank and POS4work",
        icon: "🚀",
      },
      {
        name: "Cybersecurity Seminar",
        org: "Audax",
        icon: "🛡️",
      },
    ],
  },

  hobbies: {
    projects: [
      {
        name: "Thesis (Grade: 10/10) - Full Stack Information System Using React/Next.js - Supabase",
        description: "Information System for the Digital Transformation of Organizations Using Cloud Computing Services",
        tech: ["React",  "Next.js", "TypeScript", "Supabase"],
        url: "https://github.com/michailangeletopoulos/govapp",
      },
      {
        name: "Flight Booking REST API Using Python + Flask and Postman",
        description: "A lightweight and efficient REST API built with Python and Flask for managing flight bookings",
        tech: ["Python", "Flask"],
        url: "https://github.com/michailangeletopoulos/Flight_Booking_REST_API",
      },
      {
        name: "Brain Portfolio",
        description: "Interactive 3D portfolio site using Three.js and Next.js",
        tech: ["React", "Next.js", "TypeScript"],
        url: "https://github.com/michailangeletopoulos/cv",
      },
    ],
  },

  contact: {
    links: [
      {
        icon: "📧",
        label: "Email",
        value: "mixalisaggeletopoulos@gmail.com",
        href: "mailto:mixalisaggeletopoulos@gmail.com",
      },
      {
        icon: "💼",
        label: "LinkedIn",
        value: "linkedin.com/in/michail-angeletopoulos",
        href: "https://www.linkedin.com/in/michail-angeletopoulos-29b056359/",
      },
      {
        icon: "🐙",
        label: "GitHub",
        value: "github.com/michailangeletopoulos",
        href: "https://github.com/michailangeletopoulos",
      },
      {
        icon: "🌐",
        label: "Website",
        value: "cv-two-ochre.vercel.app",
        href: "https://cv-two-ochre.vercel.app/",
      },
    ],
  },
};