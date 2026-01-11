"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [smoothPosition, setSmoothPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });
  const [isGlitching, setIsGlitching] = useState(false);
  const requestRef = useRef<number | null>(null);

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
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      updateCursorType(e);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    const handleMouseDown = () => {
      setIsClicking(true);
      // Trigger glitch effect
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    };
    
    const handleMouseUp = () => setIsClicking(false);

    // Smooth follow animation
    const animate = () => {
      setSmoothPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.12,
        y: prev.y + (position.y - prev.y) * 0.12,
      }));
      requestRef.current = requestAnimationFrame(animate);
    };

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitchOffset({
          x: (Math.random() - 0.5) * 10,
          y: (Math.random() - 0.5) * 10,
        });
        setTimeout(() => setGlitchOffset({ x: 0, y: 0 }), 50);
      }
    }, 100);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      clearInterval(glitchInterval);
    };
  }, [position.x, position.y, updateCursorType]);

  if (typeof window !== "undefined") {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return null;
  }

  return (
    <>
      {/* Glitch layers - RGB split effect */}
      {(isGlitching || isPointer) && (
        <>
          {/* Red channel */}
          <div
            className={`fixed pointer-events-none z-9997 transition-opacity ${
              isVisible ? "opacity-50" : "opacity-0"
            }`}
            style={{
              left: position.x + (isGlitching ? -4 : -2),
              top: position.y + (isGlitching ? 2 : 0),
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className={`border-2 border-red-500 transition-all duration-200 ${
                isPointer ? "w-10 h-10 rounded-lg" : "w-6 h-6 rounded-full"
              }`}
              style={{ mixBlendMode: "screen" }}
            />
          </div>

          {/* Blue channel */}
          <div
            className={`fixed pointer-events-none z-9997 transition-opacity ${
              isVisible ? "opacity-50" : "opacity-0"
            }`}
            style={{
              left: position.x + (isGlitching ? 4 : 2),
              top: position.y + (isGlitching ? -2 : 0),
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className={`border-2 border-blue-500 transition-all duration-200 ${
                isPointer ? "w-10 h-10 rounded-lg" : "w-6 h-6 rounded-full"
              }`}
              style={{ mixBlendMode: "screen" }}
            />
          </div>
        </>
      )}

      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-9999 transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: position.x + glitchOffset.x,
          top: position.y + glitchOffset.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Outer ring */}
        <div
          className={`absolute border-2 border-primary transition-all duration-200 ${
            isClicking
              ? "w-4 h-4 rounded-full"
              : isPointer
              ? "w-12 h-12 rounded-lg rotate-45"
              : "w-8 h-8 rounded-full"
          }`}
          style={{
            transform: "translate(-50%, -50%)",
            boxShadow: isGlitching
              ? "0 0 20px var(--primary), 0 0 40px var(--primary)"
              : "0 0 10px var(--primary)",
          }}
        />

        {/* Inner dot */}
        <div
          className={`absolute bg-primary transition-all duration-150 ${
            isClicking
              ? "w-1 h-1 rounded-full"
              : isPointer
              ? "w-2 h-6 rounded-sm"
              : "w-1.5 h-1.5 rounded-full"
          }`}
          style={{
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 8px var(--primary)",
          }}
        />

        {/* Magnetic orbit dots on hover */}
        {isPointer && (
          <div className="absolute" style={{ transform: "translate(-50%, -50%)" }}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 bg-primary rounded-full animate-magnetic-orbit"
                style={{
                  boxShadow: "0 0 6px var(--primary), 0 0 12px var(--primary)",
                  animationDelay: `${i * -0.5}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Pulsing rings on hover */}
        {isPointer && (
          <>
            <div 
              className="absolute w-16 h-16 border border-primary/40 rounded-full animate-hover-ring-1"
              style={{ transform: "translate(-50%, -50%)" }}
            />
            <div 
              className="absolute w-16 h-16 border border-primary/30 rounded-full animate-hover-ring-2"
              style={{ transform: "translate(-50%, -50%)" }}
            />
          </>
        )}
      </div>

      {/* Trailing cursor */}
      <div
        className={`fixed pointer-events-none z-9998 transition-opacity duration-300 ${
          isVisible ? "opacity-60" : "opacity-0"
        }`}
        style={{
          left: smoothPosition.x,
          top: smoothPosition.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`border border-primary/50 transition-all duration-300 ${
            isPointer ? "w-16 h-16 rounded-lg" : "w-12 h-12 rounded-full"
          }`}
          style={{
            transform: isPointer ? "rotate(45deg)" : "rotate(0deg)",
          }}
        />
      </div>

      {/* Electric arc effect on click */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-9996"
          style={{
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Lightning bolts */}
          <svg width="80" height="80" viewBox="0 0 80 80" className="absolute -left-10 -top-10">
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <g key={angle} transform={`rotate(${angle} 40 40)`}>
                <path
                  d="M40 40 L42 25 L38 28 L40 15"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="2"
                  className="animate-lightning"
                  style={{ 
                    animationDelay: `${i * 0.05}s`,
                    filter: "drop-shadow(0 0 4px var(--primary))"
                  }}
                />
              </g>
            ))}
          </svg>
          
          {/* Center flash */}
          <div className="absolute w-6 h-6 bg-primary/80 rounded-full animate-click-flash"
               style={{ transform: "translate(-50%, -50%)", left: "50%", top: "50%" }} />
          
          {/* Expanding electric ring */}
          <div 
            className="absolute w-4 h-4 border-2 border-primary rounded-full animate-electric-ring"
            style={{ transform: "translate(-50%, -50%)", left: "50%", top: "50%" }}
          />
        </div>
      )}

      {/* Glitch text on click */}
      {isGlitching && (
        <div
          className="fixed pointer-events-none z-9995 font-mono text-xs text-primary animate-glitch-text"
          style={{
            left: position.x + 25,
            top: position.y - 15,
            textShadow: "2px 0 #ff0000, -2px 0 #00ffff",
          }}
        >
          {"[!]"}
        </div>
      )}

      {/* Floating data bits on hover */}
      {isPointer && isVisible && (
        <div
          className="fixed pointer-events-none z-9994"
          style={{
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {["01", "10", "11", "00"].map((bit, i) => (
            <div
              key={i}
              className="absolute font-mono text-xs text-primary/60 animate-float-data"
              style={{
                transform: `rotate(${i * 90 + 45}deg) translateY(-35px)`,
                animationDelay: `${i * 0.3}s`,
                textShadow: "0 0 4px var(--primary)",
              }}
            >
              {bit}
            </div>
          ))}
        </div>
      )}

      {/* Ambient glow */}
      <div
        className={`fixed pointer-events-none z-9993 transition-all duration-500 ${
          isVisible ? "opacity-20" : "opacity-0"
        }`}
        style={{
          left: smoothPosition.x,
          top: smoothPosition.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`blur-2xl transition-all duration-300 ${
            isPointer ? "w-32 h-32 bg-primary/50" : "w-20 h-20 bg-primary/40"
          }`}
        />
      </div>
    </>
  );
}
