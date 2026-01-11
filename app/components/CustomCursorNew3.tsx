"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const [morphProgress, setMorphProgress] = useState(0);
  const targetRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });
  const rippleId = useRef(0);
  const animationRef = useRef<number | null>(null);

  const updateCursorType = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const computedStyle = window.getComputedStyle(target);
    const cursorStyle = computedStyle.cursor;
    
    const isClickable = 
      cursorStyle === "pointer" ||
      target.tagName === "A" ||
      target.tagName === "BUTTON" ||
      !!target.closest("a") ||
      !!target.closest("button") ||
      target.getAttribute("role") === "button";

    setIsPointer(isClickable);
  }, []);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      updateCursorType(e);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    const handleMouseDown = () => {
      setIsClicking(true);
      // Add ripple on click
      rippleId.current += 1;
      setRipples((prev) => [
        ...prev.slice(-3),
        { x: targetRef.current.x, y: targetRef.current.y, id: rippleId.current },
      ]);
    };
    
    const handleMouseUp = () => setIsClicking(false);

    // Smooth cursor animation
    const animate = () => {
      currentRef.current = {
        x: currentRef.current.x + (targetRef.current.x - currentRef.current.x) * 0.15,
        y: currentRef.current.y + (targetRef.current.y - currentRef.current.y) * 0.15,
      };
      animationRef.current = requestAnimationFrame(animate);
    };

    // Morph animation
    const morphInterval = setInterval(() => {
      setMorphProgress((prev) => (prev + 1) % 360);
    }, 50);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup ripples
    const rippleCleanup = setInterval(() => {
      setRipples((prev) => prev.slice(-2));
    }, 1000);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      clearInterval(morphInterval);
      clearInterval(rippleCleanup);
    };
  }, [updateCursorType]);

  if (typeof window !== "undefined") {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return null;
  }

  // Calculate blob path based on morph progress
  const getBlobPath = () => {
    const size = isPointer ? 30 : 20;
    const wobble = isClicking ? 0 : 3;
    const t = morphProgress * (Math.PI / 180);
    
    const r1 = size + Math.sin(t * 2) * wobble;
    const r2 = size + Math.cos(t * 3) * wobble;
    const r3 = size + Math.sin(t * 2.5) * wobble;
    const r4 = size + Math.cos(t * 1.5) * wobble;
    
    return `
      M ${50 + r1} 50
      Q ${50 + r2 * 0.7} ${50 - r2 * 0.7} 50 ${50 - r2}
      Q ${50 - r3 * 0.7} ${50 - r3 * 0.7} ${50 - r3} 50
      Q ${50 - r4 * 0.7} ${50 + r4 * 0.7} 50 ${50 + r4}
      Q ${50 + r1 * 0.7} ${50 + r1 * 0.7} ${50 + r1} 50
      Z
    `;
  };

  return (
    <>
      {/* Click ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-9996"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-4 h-4 rounded-full border-2 border-primary animate-ripple-expand" />
          <div className="absolute inset-0 w-4 h-4 rounded-full border border-primary/50 animate-ripple-expand-delay" />
        </div>
      ))}

      {/* Main blob cursor */}
      <div
        className={`fixed pointer-events-none z-9999 transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: currentRef.current.x,
          top: currentRef.current.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          className={`transition-transform duration-300 ${
            isClicking ? "scale-75" : isPointer ? "scale-110" : "scale-100"
          }`}
          style={{
            filter: "drop-shadow(0 0 10px var(--primary)) drop-shadow(0 0 20px var(--primary))",
          }}
        >
          <defs>
            <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#9333ea" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.9" />
            </linearGradient>
            <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Morphing blob */}
          <path
            d={getBlobPath()}
            fill="url(#blobGradient)"
            className="transition-all duration-100"
          />
          
          {/* Inner highlight */}
          <circle cx="50" cy="50" r="8" fill="url(#innerGlow)" />
          
          {/* Center dot */}
          <circle
            cx="50"
            cy="50"
            r={isPointer ? 4 : 3}
            fill="white"
            className="transition-all duration-200"
          />
        </svg>

        {/* Orbiting dots for pointer state */}
        {isPointer && (
          <div className="absolute inset-0 w-full h-full">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 bg-white rounded-full animate-orbit-blob"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `rotate(${morphProgress + i * 90}deg) translateX(35px)`,
                  boxShadow: "0 0 6px var(--primary)",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Liquid trail effect */}
      <div
        className={`fixed pointer-events-none z-9998 transition-opacity duration-300 ${
          isVisible ? "opacity-60" : "opacity-0"
        }`}
        style={{
          left: currentRef.current.x,
          top: currentRef.current.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60">
          <defs>
            <filter id="gooey">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="gooey"
              />
            </filter>
          </defs>
          <g filter="url(#gooey)">
            <circle cx="30" cy="30" r="12" fill="var(--primary)" opacity="0.4" />
            <circle
              cx={30 + Math.sin(morphProgress * 0.05) * 5}
              cy={30 + Math.cos(morphProgress * 0.05) * 5}
              r="8"
              fill="var(--primary)"
              opacity="0.3"
            />
          </g>
        </svg>
      </div>

      {/* Ambient particles */}
      {isPointer && isVisible && (
        <div
          className="fixed pointer-events-none z-9995"
          style={{
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/60 rounded-full animate-float-particle"
              style={{
                transform: `rotate(${i * 60}deg) translateY(-40px)`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Click explosion */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-9994"
          style={{
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-explode-particle"
              style={{
                background: `linear-gradient(135deg, var(--primary), ${i % 2 === 0 ? '#9333ea' : '#6366f1'})`,
                transform: `rotate(${i * 30}deg)`,
                animationDelay: `${i * 0.02}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Subtle glow aura */}
      <div
        className={`fixed pointer-events-none z-9993 transition-all duration-500 ${
          isVisible ? "opacity-25" : "opacity-0"
        }`}
        style={{
          left: currentRef.current.x,
          top: currentRef.current.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`rounded-full blur-3xl transition-all duration-500 ${
            isPointer
              ? "w-48 h-48 bg-gradient-radial from-primary via-purple-500/30 to-transparent"
              : "w-32 h-32 bg-primary/40"
          }`}
          style={{
            animation: "pulse-aura 3s ease-in-out infinite",
          }}
        />
      </div>
    </>
  );
}
