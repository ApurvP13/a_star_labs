"use client";

import { useState, useRef, useEffect } from "react";

const HeroSection = () => {
  const text = "A* Studios";
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

      // Max distance at which effect is noticeable - responsive
      const maxDistance = window.innerWidth < 768 ? 100 : 150;
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
    <div className="w-full p-36 sm:p-6 md:p-10 bg-[url(/hero-bg-mobile.png)] md:bg-[url(/hero-bg.png)] bg-center bg-cover h-full flex items-center justify-end md:justify-end flex-col gap-4 md:gap-2">
      <div
        ref={containerRef}
        className="flex gap-0 text-neutral-100 font-title select-none cursor-default text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
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
      <div
        className="p-[1px] bg-gradient-to-b rounded-[40px] from-[#C9C9C9] via-[#686A69] to-[#05070C] 
                   w-[200px] h-[50px] sm:w-[220px] sm:h-[55px] md:w-[243px] md:h-[63px] 
                   cursor-pointer select-none transition-transform duration-150 ease-out active:scale-95 hover:scale-[1.02] "
        onClick={() => {
          // Your click handler logic here
          console.log("Button clicked!");
        }}
      >
        <div className="w-full h-full rounded-[40px] bg-gradient-to-b from-[#FAFAFA] via-[#565656] flex items-center justify-center to-[#999999]">
          <div className="h-[calc(100%-8px)] w-[calc(100%-8px)] rounded-[40px] bg-gradient-to-b from-[#fafafa] to-[#666666] flex items-center justify-center">
            <div className="bg-gradient-to-b from-[#999999] font-sans text-sm sm:text-base md:text-lg font-bold to-[#1E1E1E] bg-clip-text text-transparent">
              Book A Call
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
