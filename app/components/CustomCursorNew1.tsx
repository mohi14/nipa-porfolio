"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [magneticTarget, setMagneticTarget] = useState<DOMRect | null>(null);
  const outerRef = useRef({ x: -100, y: -100 });
  const requestRef = useRef<number | undefined>(undefined);

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
    
    // Get magnetic target bounds
    if (isClickable) {
      const clickableEl = target.closest("a, button") || target;
      setMagneticTarget(clickableEl.getBoundingClientRect());
    } else {
      setMagneticTarget(null);
    }
  }, []);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      updateCursorType(e);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Smooth outer cursor animation
    const animateOuter = () => {
      outerRef.current = {
        x: outerRef.current.x + (position.x - outerRef.current.x) * 0.12,
        y: outerRef.current.y + (position.y - outerRef.current.y) * 0.12,
      };
      requestRef.current = requestAnimationFrame(animateOuter);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    
    requestRef.current = requestAnimationFrame(animateOuter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [position.x, position.y, updateCursorType]);

  if (typeof window !== "undefined") {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return null;
  }

  // Calculate magnetic pull position
  const getMagneticPosition = () => {
    if (!magneticTarget) return position;
    const centerX = magneticTarget.left + magneticTarget.width / 2;
    const centerY = magneticTarget.top + magneticTarget.height / 2;
    return {
      x: position.x + (centerX - position.x) * 0.3,
      y: position.y + (centerY - position.y) * 0.3,
    };
  };

  const magneticPos = getMagneticPosition();

  return (
    <>
      {/* Outer ring - smooth follow */}
      <div
        className={`fixed pointer-events-none z-9998 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: outerRef.current.x,
          top: outerRef.current.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <svg
          className={`transition-all duration-300 ease-out ${
            isClicking ? "scale-75" : isPointer ? "scale-150" : "scale-100"
          }`}
          width="50"
          height="50"
          viewBox="0 0 50 50"
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient id="cursorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="1" />
              <stop offset="50%" stopColor="#9333ea" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Animated circle */}
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="url(#cursorGradient)"
            strokeWidth={isPointer ? "2" : "1.5"}
            strokeDasharray={isPointer ? "8 4" : "0"}
            filter="url(#glow)"
            className={isPointer ? "animate-spin-slow" : ""}
            style={{
              transformOrigin: "center",
            }}
          />
          
          {/* Corner accents when hovering */}
          {isPointer && (
            <>
              <line x1="5" y1="5" x2="12" y2="5" stroke="var(--primary)" strokeWidth="2" className="animate-fade-in" />
              <line x1="5" y1="5" x2="5" y2="12" stroke="var(--primary)" strokeWidth="2" className="animate-fade-in" />
              
              <line x1="45" y1="5" x2="38" y2="5" stroke="var(--primary)" strokeWidth="2" className="animate-fade-in" />
              <line x1="45" y1="5" x2="45" y2="12" stroke="var(--primary)" strokeWidth="2" className="animate-fade-in" />
              
              <line x1="5" y1="45" x2="12" y2="45" stroke="var(--primary)" strokeWidth="2" className="animate-fade-in" />
              <line x1="5" y1="45" x2="5" y2="38" stroke="var(--primary)" strokeWidth="2" className="animate-fade-in" />
              
              <line x1="45" y1="45" x2="38" y2="45" stroke="var(--primary)" strokeWidth="2" className="animate-fade-in" />
              <line x1="45" y1="45" x2="45" y2="38" stroke="var(--primary)" strokeWidth="2" className="animate-fade-in" />
            </>
          )}
        </svg>
      </div>

      {/* Inner dot with magnetic effect */}
      <div
        className={`fixed pointer-events-none z-9999 transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: magneticPos.x,
          top: magneticPos.y,
          transform: "translate(-50%, -50%)",
          transition: magneticTarget ? "left 0.15s, top 0.15s" : "none",
        }}
      >
        {/* Core dot */}
        <div
          className={`rounded-full transition-all duration-200 ease-out ${
            isClicking
              ? "w-2 h-2 bg-white"
              : isPointer
              ? "w-4 h-4 bg-primary mix-blend-difference"
              : "w-2.5 h-2.5 bg-primary"
          }`}
          style={{
            boxShadow: `
              0 0 10px var(--primary),
              0 0 20px var(--primary),
              0 0 30px rgba(199, 120, 221, 0.5)
            `,
          }}
        />

        {/* Rotating mini dots */}
        {isPointer && !isClicking && (
          <div className="absolute inset-0 animate-spin-medium">
            {[0, 120, 240].map((angle) => (
              <div
                key={angle}
                className="absolute w-1 h-1 bg-primary rounded-full"
                style={{
                  transform: `rotate(${angle}deg) translateY(-10px)`,
                  left: "50%",
                  top: "50%",
                  marginLeft: "-2px",
                  marginTop: "-2px",
                  boxShadow: "0 0 6px var(--primary)",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Click burst effect */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-9997"
          style={{
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Expanding rings */}
          <div className="absolute w-6 h-6 border border-primary rounded-full animate-burst-1" 
               style={{ transform: "translate(-50%, -50%)" }} />
          <div className="absolute w-6 h-6 border border-primary/70 rounded-full animate-burst-2" 
               style={{ transform: "translate(-50%, -50%)" }} />
          <div className="absolute w-6 h-6 border border-primary/40 rounded-full animate-burst-3" 
               style={{ transform: "translate(-50%, -50%)" }} />
          
          {/* Spark lines */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <div
              key={angle}
              className="absolute w-0.5 h-3 bg-gradient-to-t from-primary to-transparent animate-spark"
              style={{
                transform: `rotate(${angle}deg)`,
                transformOrigin: "center bottom",
                left: "50%",
                bottom: "50%",
                marginLeft: "-1px",
              }}
            />
          ))}
        </div>
      )}

      {/* Ambient glow that follows slowly */}
      <div
        className={`fixed pointer-events-none z-9996 transition-opacity duration-500 ${
          isVisible ? "opacity-30" : "opacity-0"
        }`}
        style={{
          left: outerRef.current.x,
          top: outerRef.current.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`rounded-full blur-xl transition-all duration-500 ${
            isPointer ? "w-32 h-32 bg-primary/40" : "w-20 h-20 bg-primary/30"
          }`}
        />
      </div>

      {/* Text cursor indicator */}
      {!isPointer && isVisible && (
        <div
          className="fixed pointer-events-none z-9995"
          style={{
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative">
            {/* Subtle scanning line effect */}
            <div 
              className="absolute w-8 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-scan"
              style={{ transform: "translateX(-50%)" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
