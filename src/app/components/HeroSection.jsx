"use client";

import { useState, useRef, useEffect } from "react";

const HeroSection = () => {
  const text = "A Star Studios*";
  const containerRef = useRef(null);
  const [weights, setWeights] = useState(
    Array.from(text).map(() => 400) // initial weight for each letter
  );

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container) return;

    const letters = Array.from(container.querySelectorAll("span"));
    const newWeights = letters.map((letter, i) => {
      const rect = letter.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      // Max distance at which effect is noticeable
      const maxDistance = 150;
      const proximity = Math.max(0, 1 - distance / maxDistance);

      // Map proximity to font weight (400 → 900)
      return Math.round(400 + proximity * 500);
    });

    setWeights(newWeights);
  };

  const handleMouseLeave = () => {
    setWeights(Array.from(text).map(() => 400));
  };

  return (
    <div className="w-full p-10 bg-[url(/hero-bg.png)] bg-center bg-cover h-full flex items-center justify-end flex-col gap-2">
      <div
        ref={containerRef}
        className="flex gap-0 text-neutral-100 font-title select-none cursor-default"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ fontSize: "6rem" }}
      >
        {Array.from(text).map((char, i) => (
          <span
            key={i}
            style={{
              fontWeight: weights[i],
              transition: "font-weight 0.05s linear",
            }}
            className="hover:scale-105 transition-all duration-200"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
      <div className="text-center text-lg font-sans text-neutral-300 text-balance font-medium">
        Exceptional, high‑quality websites, beautifully designed and expertly
        built under one roof. Experience seamless collaboration, transparent
        pricing, and a service tailored to perfection.
      </div>
    </div>
  );
};

export default HeroSection;
