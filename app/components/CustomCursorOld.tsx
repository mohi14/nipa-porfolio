"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface Trail {
  x: number;
  y: number;
  id: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });
  const trailId = useRef(0);

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
      const newX = e.clientX;
      const newY = e.clientY;
      
      // Calculate velocity
      setVelocity({
        x: newX - lastPosition.current.x,
        y: newY - lastPosition.current.y,
      });
      
      lastPosition.current = { x: newX, y: newY };
      setPosition({ x: newX, y: newY });
      setIsVisible(true);
      updateCursorType(e);

      // Add trail point
      trailId.current += 1;
      setTrails((prev) => [
        ...prev.slice(-12),
        { x: newX, y: newY, id: trailId.current },
      ]);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Cleanup old trails
    const cleanupInterval = setInterval(() => {
      setTrails((prev) => prev.slice(-8));
    }, 50);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      clearInterval(cleanupInterval);
    };
  }, [updateCursorType]);

  if (typeof window !== "undefined") {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return null;
  }

  const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
  const rotation = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);

  return (
    <>
      {/* Trail dots with gradient fade */}
      {trails.map((trail, index) => {
        const opacity = (index + 1) / trails.length;
        const scale = 0.3 + (index / trails.length) * 0.7;
        return (
          <div
            key={trail.id}
            className="fixed pointer-events-none z-9997"
            style={{
              left: trail.x,
              top: trail.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="rounded-full bg-primary"
              style={{
                width: `${4 * scale}px`,
                height: `${4 * scale}px`,
                opacity: opacity * 0.6,
                boxShadow: `0 0 ${8 * scale}px var(--primary)`,
              }}
            />
          </div>
        );
      })}

      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-9999 transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Morphing shape based on velocity */}
        <div
          className={`relative transition-all duration-150 ease-out ${
            isClicking ? "scale-75" : isPointer ? "scale-150" : "scale-100"
          }`}
          style={{
            transform: `rotate(${speed > 2 ? rotation : 0}deg)`,
          }}
        >
          {/* Core diamond shape */}
          <div
            className={`absolute transition-all duration-200 ${
              isPointer 
                ? "w-5 h-5 rounded-sm bg-transparent border-2 border-primary" 
                : "w-3 h-3 rounded-sm bg-primary"
            }`}
            style={{
              transform: `translate(-50%, -50%) rotate(45deg) ${
                speed > 5 ? `scaleX(${1 + speed * 0.02})` : ""
              }`,
              boxShadow: isPointer 
                ? "0 0 20px var(--primary), inset 0 0 10px var(--primary)"
                : "0 0 15px var(--primary), 0 0 30px var(--primary)",
            }}
          />

          {/* Orbiting particles */}
          {isPointer && (
            <>
              {[0, 90, 180, 270].map((angle) => (
                <div
                  key={angle}
                  className="absolute w-1.5 h-1.5 bg-primary rounded-full animate-orbit"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(16px)`,
                    animationDelay: `${angle * 0.003}s`,
                    boxShadow: "0 0 8px var(--primary)",
                  }}
                />
              ))}
            </>
          )}

          {/* Pulsing rings on hover */}
          {isPointer && (
            <>
              <div
                className="absolute w-10 h-10 border border-primary/40 rounded-full animate-ping-slow"
                style={{ transform: "translate(-50%, -50%)" }}
              />
              <div
                className="absolute w-8 h-8 border border-primary/60 rounded-full animate-ping-slower"
                style={{ transform: "translate(-50%, -50%)" }}
              />
            </>
          )}
        </div>

        {/* Click ripple effect */}
        {isClicking && (
          <div className="absolute" style={{ transform: "translate(-50%, -50%)" }}>
            <div className="w-12 h-12 border-2 border-primary rounded-full animate-ripple" />
            <div className="absolute top-1/2 left-1/2 w-8 h-8 border border-primary/50 rounded-full animate-ripple-delay" 
                 style={{ transform: "translate(-50%, -50%)" }} />
          </div>
        )}
      </div>

      {/* Crosshair lines that appear on pointer */}
      {isPointer && isVisible && (
        <div
          className="fixed pointer-events-none z-9998"
          style={{
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="absolute w-px h-6 bg-gradient-to-b from-transparent via-primary/50 to-transparent"
               style={{ transform: "translateX(-50%) translateY(-18px)" }} />
          <div className="absolute w-px h-6 bg-gradient-to-b from-transparent via-primary/50 to-transparent"
               style={{ transform: "translateX(-50%) translateY(12px)" }} />
          <div className="absolute h-px w-6 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
               style={{ transform: "translateY(-50%) translateX(-18px)" }} />
          <div className="absolute h-px w-6 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
               style={{ transform: "translateY(-50%) translateX(12px)" }} />
        </div>
      )}

      {/* Speed lines when moving fast */}
      {speed > 8 && isVisible && (
        <div
          className="fixed pointer-events-none z-9996"
          style={{
            left: position.x,
            top: position.y,
            transform: `translate(-50%, -50%) rotate(${rotation + 180}deg)`,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-primary to-transparent"
              style={{
                width: `${20 + speed * 1.5}px`,
                opacity: 0.6 - i * 0.15,
                transform: `translateY(${(i - 1) * 4}px)`,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
