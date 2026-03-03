"use client";

import { useMemo } from "react";

const STAR_COUNT = 120;

export default function Stars() {
  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${0.5 + Math.random() * 1.5}px`,
        duration: `${3 + Math.random() * 6}s`,
        delay: `${Math.random() * 6}s`,
        opacity: 0.1 + Math.random() * 0.5,
      })),
    []
  );

  return (
    <div className="stars" aria-hidden>
      {stars.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDuration: s.duration,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}