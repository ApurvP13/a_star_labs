"use client";

import React, { useState } from "react";

const HeroSection = () => {
  const [weight, setWeight] = useState(600); // starting font weight

  const handleMouseMove = (e) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();

    // Find the horizontal centre of the element
    const centerX = rect.left + rect.width / 2;
    const distanceX = Math.abs(e.clientX - centerX);

    // Normalise distance (0 near centre → 1 far edge)
    const maxDistance = rect.width / 2;
    const proximity = Math.max(0, 1 - distanceX / maxDistance);

    // Map proximity to font weight (400 → 900)
    const newWeight = Math.round(400 + proximity * 500);
    setWeight(newWeight);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 text-center">
      <div
        className="text-neutral-900 font-title select-none cursor-default"
        style={{
          fontSize: "6rem",
          fontWeight: weight,
          transition: "font-weight 0.05s linear",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setWeight(600)}
      >
        A Star Studios
      </div>
      <div className="text-xl font-medium font-sans text-neutral-500 text-balance ">
        Exceptional, high‑quality websites — beautifully designed and expertly
        built under one roof. Experience seamless collaboration, transparent
        pricing, and a service tailored to perfection.
      </div>
    </div>
  );
};

export default HeroSection;
