"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const SvgLoadingAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showText, setShowText] = useState(false);
  const svgRef = useRef(null);
  const textRef = useRef(null);

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
        // Hide SVG and show text when animation completes
        gsap.to(svgRef.current, { opacity: 0, duration: 0.2 });
        setShowText(true);
        console.log("text set to show");
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

  // Separate useEffect to handle text animation after showText becomes true
  useEffect(() => {
    if (showText && textRef.current) {
      const tl = gsap.timeline();

      // 1. Fade in "A STAR" at the center
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 20, letterSpacing: "0em" }, // Start with 0 opacity, slightly below center, no extra letter spacing
        { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
      )
        // 2. Slide "A STAR" upwards and increase letter tracking simultaneously
        .to(textRef.current, {
          y: -window.innerHeight * 0.35, // Move to top area
          letterSpacing: "1em", // Adjust this value for desired wider tracking
          duration: 1,
          ease: "power2.inOut",
          delay: 0.5, // Start sliding/tracking animation after a short delay from initial fade-in
        });
    }
  }, [showText]);

  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center overflow-hidden">
      <div className="flex items-center justify-center bg-white relative">
        {!showText && (
          <img
            ref={svgRef}
            src={svgs[currentIndex]}
            alt="Loading..."
            className="w-16 h-16 object-contain"
            style={{ opacity: 0 }}
          />
        )}
        {showText && (
          <div
            ref={textRef}
            className="text-9xl font-bold text-gray-800" // Simplified class names as no individual span animation
            style={{ opacity: 0, letterSpacing: "0em" }} // Initial state for GSAP to animate from
          >
            A STAR
          </div>
        )}
      </div>
    </div>
  );
};

export default SvgLoadingAnimation;
