"use client";

import { useState, useRef, useEffect } from "react";

const HeroSection = () => {
  const text = "A* Studios";
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const [weights, setWeights] = useState(
    Array.from(text).map(() => 400) // initial weight for each letter
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100); // Small delay to ensure smooth animation

    return () => clearTimeout(timer);
  }, []);

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
    <div className="w-full p-4 sm:p-6 md:p-10 bg-[url(/hero-bg-mobile.png)] md:bg-[url(/hero-bg.png)] bg-center bg-cover h-full flex items-center justify-end flex-col gap-4 md:gap-2">
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
      <button
        ref={buttonRef}
        className={`relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 cursor-pointer select-none transition-all duration-700 ease-out active:scale-95 hover:scale-[1.02]   ${
          isLoaded ? "w-[200px] sm:w-[180px] md:w-[200px]" : "w-0"
        }`}
        onClick={() => {
          // Your click handler logic here
          console.log("Button clicked!");
        }}
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#666666_50%,transparent_100%)]" />
        <span
          className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-7 py-2 text-lg font-bold text-white font-sans backdrop-blur-3xl transition-opacity duration-500 delay-300 whitespace-nowrap ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          Book A Call
        </span>
      </button>
    </div>
  );
};

export default HeroSection;
