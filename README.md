

# 🧠 Brain Portfolio

**An interactive 3D portfolio built with Next.js & Three.js**

*Click a lobe. Explore a section. Rotate the brain.*

**URL**: https://cv-two-ochre.vercel.app/

---

## ✨ Features

- **3D Brain** — six organic lobe meshes rendered with Three.js, each mapped to a portfolio section
- **Drag to rotate** — full mouse & touch orbit controls with inertia
- **Hover highlights** — each lobe glows and shows a tooltip on hover
- **Click → Modal** — smooth animated modal with section-specific content
- **Six sections** — Skills, Experience, Education, Seminars, Projects, Contact
- **Legend sidebar** — alternative click-to-navigate panel
- **Particle system** — neural glow particles orbiting the brain
- **Twinkling stars** — ambient deep-space background


---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── page.tsx          # Root page — orchestrates all phases
│   ├── layout.tsx        # HTML shell & metadata
│   └── globals.css       # All styles (no Tailwind)
├── components/
│   ├── Brain3D.tsx       # Three.js scene, lobes, raycasting, orbit controls
│   ├── SectionModal.tsx  # Animated modal with per-section renderers
│   ├── Legend.tsx        # Sidebar lobe navigation
│   └── Stars.tsx         # Twinkling star background
└── data/
    └── portfolio.ts      # All your content lives here
```

---


## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org) | Framework & routing |
| [Three.js](https://threejs.org) | 3D rendering |
| [TypeScript](https://typescriptlang.org) | Type safety |
| Plain CSS | Styling (no UI library) |
