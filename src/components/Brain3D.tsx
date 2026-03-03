"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { LOBES, SectionId } from "@/data/portfolio";

interface Brain3DProps {
  onLobeClick: (id: SectionId) => void;
}

export default function Brain3D({ onLobeClick }: Brain3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const tooltip = tooltipRef.current!;

    // ─── Renderer ────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    // ─── Scene & Camera ──────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    // ─── Lights ──────────────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(4, 6, 4);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x4ff8c0, 0.6);
    rimLight.position.set(-4, -2, -4);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0x7b61ff, 1.5, 12);
    pointLight.position.set(0, 2, 3);
    scene.add(pointLight);

    // ─── Brain lobes (6 organic blob-like meshes) ────────────────────────────
    // We build the brain from 6 deformed spheres arranged as actual brain lobes
    const lobeMeshes: THREE.Mesh[] = [];

    // Lobe configurations: [position, scale, rotation, segment]
    const lobeConfigs: {
      id: SectionId;
      color: string;
      pos: [number, number, number];
      scale: [number, number, number];
      rot: [number, number, number];
    }[] = [
      // Skills → Frontal lobe (front-left)
      { id: "skills",     color: "#4ff8c0", pos: [-0.55, 0.35, 0.55],  scale: [0.85, 0.75, 0.80], rot: [0.1, -0.2, 0.15]  },
      // Experience → Frontal lobe right
      { id: "experience", color: "#7b61ff", pos: [0.55, 0.35, 0.55],   scale: [0.85, 0.75, 0.80], rot: [0.1, 0.2, -0.15]  },
      // Education → Parietal left
      { id: "education",  color: "#ff6b6b", pos: [-0.6, 0.5, -0.3],   scale: [0.80, 0.70, 0.75], rot: [0.2, -0.1, 0.1]   },
      // Seminars → Parietal right
      { id: "seminars",   color: "#f5a623", pos: [0.6, 0.5, -0.3],    scale: [0.80, 0.70, 0.75], rot: [0.2, 0.1, -0.1]   },
      // Hobbies → Temporal / Occipital left-back
      { id: "hobbies",    color: "#50c8ff", pos: [-0.45, -0.1, -0.65], scale: [0.75, 0.70, 0.80], rot: [-0.1, -0.2, 0.05] },
      // Contact → Occipital right-back
      { id: "contact",    color: "#c084fc", pos: [0.45, -0.1, -0.65],  scale: [0.75, 0.70, 0.80], rot: [-0.1, 0.2, -0.05] },
    ];

    // Shared geometry (subdivided sphere, then perturb vertices for organic feel)
    function makeBlobGeometry(seed: number) {
      const geo = new THREE.SphereGeometry(1, 48, 48);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = pos.getZ(i);
        const noise =
          0.12 * Math.sin(seed + x * 4.1 + y * 3.7) +
          0.08 * Math.sin(seed * 1.3 + y * 5.2 + z * 2.9) +
          0.05 * Math.sin(seed * 0.7 + z * 6.0 + x * 4.4);
        pos.setXYZ(i, x + x * noise, y + y * noise, z + z * noise);
      }
      geo.computeVertexNormals();
      return geo;
    }

    // Groove / sulci geometry (thin torus-like lines on surface)
    function addSulci(parent: THREE.Group, color: string) {
      const c = new THREE.Color(color);
      const mat = new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: 0.35 });
      for (let i = 0; i < 5; i++) {
        const curve = new THREE.EllipseCurve(
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4,
          0.4 + Math.random() * 0.4,
          0.2 + Math.random() * 0.2,
          0, Math.PI * 1.5,
          false,
          Math.random() * Math.PI
        );
        const pts = curve.getPoints(40).map((p) => new THREE.Vector3(p.x, p.y, 1.02));
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const line = new THREE.Line(geo, mat);
        line.rotation.set(
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.8,
          0
        );
        parent.add(line);
      }
    }

    const brainGroup = new THREE.Group();
    scene.add(brainGroup);

    lobeConfigs.forEach((cfg, i) => {
      const geo = makeBlobGeometry(i * 7.3);
      const color = new THREE.Color(cfg.color);

      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.55,
        metalness: 0.1,
        transparent: true,
        opacity: 0.88,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...cfg.pos);
      mesh.scale.set(...cfg.scale);
      mesh.rotation.set(...cfg.rot);
      mesh.userData = { lobeId: cfg.id, baseColor: color.clone(), color: cfg.color };

      // Sulci lines
      const lobeGroup = new THREE.Group();
      lobeGroup.position.set(...cfg.pos);
      lobeGroup.scale.set(...cfg.scale);
      lobeGroup.rotation.set(...cfg.rot);
      addSulci(lobeGroup, cfg.color);

      brainGroup.add(mesh);
      brainGroup.add(lobeGroup);
      lobeMeshes.push(mesh);
    });

    // Central bridge / corpus callosum
    const ccGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.2, 16);
    const ccMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#a0aabb"),
      roughness: 0.7,
      transparent: true,
      opacity: 0.5,
    });
    const cc = new THREE.Mesh(ccGeo, ccMat);
    cc.rotation.z = Math.PI / 2;
    cc.position.set(0, 0.1, 0.1);
    brainGroup.add(cc);

    // Brain stem
    const stemGeo = new THREE.CylinderGeometry(0.12, 0.08, 0.55, 12);
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x8899aa, roughness: 0.8, transparent: true, opacity: 0.6 });
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.set(0, -0.75, -0.2);
    brainGroup.add(stem);

    // Glow particles around brain
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 180;
    const pPositions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);
    const lobeColors = LOBES.map((l) => new THREE.Color(l.color));
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.6 + Math.random() * 1.2;
      pPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      pPositions[i * 3 + 2] = r * Math.cos(phi);
      const c = lobeColors[i % lobeColors.length];
      pColors[i * 3] = c.r; pColors[i * 3 + 1] = c.g; pColors[i * 3 + 2] = c.b;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));
    const particleMat = new THREE.PointsMaterial({ size: 0.025, vertexColors: true, transparent: true, opacity: 0.6 });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ─── Raycaster ───────────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredMesh: THREE.Mesh | null = null;

    function updateMouse(e: MouseEvent | TouchEvent) {
      const ev = e instanceof TouchEvent ? e.touches[0] : e;
      if (!ev) return;
      mouse.x = (ev.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(ev.clientY / window.innerHeight) * 2 + 1;
    }

    function castRay() {
      raycaster.setFromCamera(mouse, camera);
      return raycaster.intersectObjects(lobeMeshes);
    }

    // ─── Orbit controls (manual) ─────────────────────────────────────────────
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotX = 0, rotY = 0;
    let velocityX = 0, velocityY = 0;

    canvas.addEventListener("mousedown", (e) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    });

    canvas.addEventListener("mousemove", (e) => {
      updateMouse(e);

      if (isDragging) {
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        velocityX = dx * 0.008;
        velocityY = dy * 0.008;
        rotY += velocityX;
        rotX += velocityY;
        rotX = Math.max(-0.8, Math.min(0.8, rotX));
        prevMouse = { x: e.clientX, y: e.clientY };
      }

      // Tooltip & hover highlight
      const hits = castRay();
      if (hits.length > 0) {
        const mesh = hits[0].object as THREE.Mesh;
        if (mesh !== hoveredMesh) {
          // Restore old
          if (hoveredMesh) {
            const m = hoveredMesh.material as THREE.MeshStandardMaterial;
            m.emissive.set(0x000000);
            m.emissiveIntensity = 0;
          }
          hoveredMesh = mesh;
          // Highlight new
          const m = mesh.material as THREE.MeshStandardMaterial;
          m.emissive.set(mesh.userData.baseColor);
          m.emissiveIntensity = 0.25;
        }
        canvas.classList.add("hovering");
        const lobe = LOBES.find((l) => l.id === mesh.userData.lobeId)!;
        tooltip.textContent = lobe.icon + "  " + lobe.label;
        tooltip.style.left = e.clientX + "px";
        tooltip.style.top = e.clientY + "px";
        tooltip.classList.remove("hidden");
      } else {
        if (hoveredMesh) {
          const m = hoveredMesh.material as THREE.MeshStandardMaterial;
          m.emissive.set(0x000000);
          m.emissiveIntensity = 0;
          hoveredMesh = null;
        }
        canvas.classList.remove("hovering");
        tooltip.classList.add("hidden");
      }
    });

    canvas.addEventListener("mouseup", (e) => {
      if (!isDragging) return;
      const moved = Math.abs(e.clientX - prevMouse.x) + Math.abs(e.clientY - prevMouse.y);
      isDragging = false;
      if (moved < 5) {
        const hits = castRay();
        if (hits.length > 0) {
          const mesh = hits[0].object as THREE.Mesh;
          onLobeClick(mesh.userData.lobeId as SectionId);
        }
      }
    });

    canvas.addEventListener("mouseleave", () => { isDragging = false; });

    // Touch
    canvas.addEventListener("touchstart", (e) => {
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });
    canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const dx = e.touches[0].clientX - prevMouse.x;
      const dy = e.touches[0].clientY - prevMouse.y;
      rotY += dx * 0.008;
      rotX += dy * 0.008;
      rotX = Math.max(-0.8, Math.min(0.8, rotX));
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: false });
    canvas.addEventListener("touchend", (e) => {
      updateMouse(e as unknown as TouchEvent);
      const hits = castRay();
      if (hits.length > 0) {
        onLobeClick((hits[0].object as THREE.Mesh).userData.lobeId as SectionId);
      }
    });

    // ─── Resize ──────────────────────────────────────────────────────────────
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onResize);

    // ─── Animation loop ──────────────────────────────────────────────────────
    const clock = new THREE.Clock();

    function animate() {
      const raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Inertia
      if (!isDragging) {
        velocityX *= 0.92;
        velocityY *= 0.92;
        rotY += velocityX;
        rotX += velocityY;
        // Gentle auto-rotate
        rotY += 0.002;
      }

      brainGroup.rotation.y = rotY;
      brainGroup.rotation.x = rotX;

      // Subtle breathing scale
      const breathe = 1 + 0.012 * Math.sin(t * 1.1);
      brainGroup.scale.setScalar(breathe);

      // Animate particles (slow drift)
      particles.rotation.y = t * 0.04;
      particles.rotation.x = Math.sin(t * 0.07) * 0.1;

      // Pulse point light
      pointLight.intensity = 1.2 + 0.6 * Math.sin(t * 1.8);

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, [onLobeClick]);

  return (
    <>
      <canvas ref={canvasRef} id="brain-canvas" />
      <div ref={tooltipRef} className="brain-tooltip hidden" />
    </>
  );
}