"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import HeroSection from "./components/HeroSection";

// Import your HeroSection component
// import { HeroSection } from "./HeroSection"; // Adjust path as needed

const SvgLoadingAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHero, setShowHero] = useState(false);
  const svgRef = useRef(null);
  const heroRef = useRef(null);

  const svgs = Array.from(
    { length: 15 },
    (_, i) => `/assets/astar-svgs/svg${i + 2}.svg`
  );

  useEffect(() => {
    if (!svgRef.current) return;

    // Set initial state
    gsap.set(svgRef.current, { opacity: 0, scale: 1 });

    // Create timeline for the entire sequence
    const tl = gsap.timeline({
      repeat: 0,
      onComplete: () => {
        // Hide SVG and show hero when animation completes
        gsap.to(svgRef.current, { opacity: 0, duration: 0.2 });
        setShowHero(true);
        console.log("hero set to show");
      },
    });

    // Calculate sine curve timing for each SVG
    svgs.forEach((_, index) => {
      // Sine curve: fast at start, slow at end
      const progress = index / (svgs.length - 1); // 0 to 1
      const sineValue = Math.sin((progress * Math.PI) / 2); // 0 to 1 following sine curve
      const duration = 0.05 + sineValue * 0.25; // Start at 0.05s, end at 0.3s

      tl.call(() => setCurrentIndex(index))
        .to(svgRef.current, {
          opacity: 1,
          duration: duration * 0.3,
          ease: "power2.out",
        })
        .to(
          svgRef.current,
          {
            opacity: 0,
            duration: duration * 0.3,
            ease: "power2.in",
          },
          `+=${duration * 0.4}`
        );
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Separate useEffect to handle hero animation after showHero becomes true
  useEffect(() => {
    if (showHero && heroRef.current) {
      // Animate the hero section entrance
      gsap.fromTo(
        heroRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        }
      );
    }
  }, [showHero]);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="flex items-center justify-center bg-black relative w-full h-full">
        {!showHero && (
          <img
            ref={svgRef}
            src={svgs[currentIndex]}
            alt="Loading..."
            className="w-16 h-16 object-contain fill-white"
            style={{ opacity: 0 }}
          />
        )}
        {showHero && (
          <div ref={heroRef} className="w-full h-full" style={{ opacity: 0 }}>
            {/* Replace this comment with your HeroSection component */}
            <HeroSection />

            {/* Temporary placeholder - remove this when you add HeroSection */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SvgLoadingAnimation;
