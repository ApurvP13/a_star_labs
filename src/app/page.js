"use client";
// src/components/LoadingScreen.tsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// Assume the SVGs are in /assets/astar-svgs named svg1.svg to svg15.svg
const svgs = Array.from(
  { length: 15 },
  (_, i) => `/assets/astar-svgs/svg${i + 2}.svg`
);

export default function LoadingScreen() {
  const [phase, setPhase] = useState("loading");
  const [showText, setShowText] = useState(false);
  const [starReplaced, setStarReplaced] = useState(false);
  const [labsVisible, setLabsVisible] = useState(false);
  const containerRef = useRef(null);
  const starRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Flash all 15 SVGs one after another quickly
      tl.to({}, { duration: 0.3 });
      svgs.forEach((_, i) => {
        tl.set(
          containerRef.current,
          {
            backgroundImage: `url(${svgs[i]})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          },
          `+=0.3`
        );
      });

      // After flashing, switch to final text
      tl.call(() => setPhase("final"));
      tl.to({}, { duration: 1 });
      tl.call(() => setShowText(true));

      // Spin * and morph to "Star"
      tl.to(starRef.current, {
        rotation: 360,
        duration: 1,
        ease: "power2.inOut",
      });
      tl.call(() => setStarReplaced(true));

      // Slide text up and fade in Labs
      tl.to(containerRef.current, {
        y: -100,
        duration: 0.8,
        ease: "power2.out",
      });
      tl.call(() => setLabsVisible(true));
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#fffafa] overflow-hidden">
      <div
        ref={containerRef}
        className="w-full h-40 flex items-center justify-center"
      >
        {phase === "loading" && (
          <div className="w-40 h-20 bg-center bg-no-repeat bg-contain" />
        )}

        {showText && (
          <h1
            className="text-5xl font-bold text-black flex gap-2 items-center"
            style={{ fontFamily: "sans-serif" }} // Replace later with your custom font
          >
            A
            <span ref={starRef} className="inline-block">
              {starReplaced ? "Star" : "*"}
            </span>
          </h1>
        )}
      </div>

      {labsVisible && <p className="text-xl text-black mt-4 fade-in">Labs</p>}
    </div>
  );
}
