"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [rotation, setRotation] = useState(0);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number; opacity: number }[]>([]);
  const starId = useRef(0);
  const trailId = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });

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
      
      // Calculate distance for trail
      const dx = newX - lastPos.current.x;
      const dy = newY - lastPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Add trail points
      if (distance > 8) {
        trailId.current += 1;
        setTrail((prev) => [...prev.slice(-25), { x: newX, y: newY, id: trailId.current, opacity: 1 }]);
        lastPos.current = { x: newX, y: newY };
      }
      
      setPosition({ x: newX, y: newY });
      setIsVisible(true);
      updateCursorType(e);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    const handleMouseDown = () => {
      setIsClicking(true);
      // Create starburst on click
      const newStars: Star[] = [];
      for (let i = 0; i < 12; i++) {
        starId.current += 1;
        newStars.push({
          id: starId.current,
          x: position.x,
          y: position.y,
          size: 2 + Math.random() * 4,
          opacity: 1,
          speed: 3 + Math.random() * 5,
        });
      }
      setStars((prev) => [...prev, ...newStars]);
    };
    
    const handleMouseUp = () => setIsClicking(false);

    // Animation loop
    const animate = () => {
      setRotation((prev) => (prev + 1) % 360);
      
      // Update stars (move outward and fade)
      setStars((prev) =>
        prev
          .map((star, index) => {
            const angle = (index * 30) * (Math.PI / 180);
            return {
              ...star,
              x: star.x + Math.cos(angle) * star.speed,
              y: star.y + Math.sin(angle) * star.speed,
              opacity: star.opacity - 0.03,
              size: star.size * 0.97,
            };
          })
          .filter((star) => star.opacity > 0)
      );
    };

    const animationInterval = setInterval(animate, 16);
    
    // Trail cleanup
    const trailCleanup = setInterval(() => {
      setTrail((prev) => prev.slice(-20));
    }, 50);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      clearInterval(animationInterval);
      clearInterval(trailCleanup);
    };
  }, [position.x, position.y, updateCursorType]);

  if (typeof window !== "undefined") {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return null;
  }

  return (
    <>
      {/* Sparkle trail */}
      {trail.map((point, index) => {
        const progress = index / trail.length;
        const size = 2 + progress * 4;
        return (
          <div
            key={point.id}
            className="fixed pointer-events-none z-9996"
            style={{
              left: point.x,
              top: point.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Star shape */}
            <svg
              width={size * 3}
              height={size * 3}
              viewBox="0 0 24 24"
              style={{
                opacity: progress * 0.7,
                filter: `drop-shadow(0 0 ${size}px var(--primary))`,
              }}
            >
              <path
                d="M12 2L14 9H21L15.5 13.5L17.5 21L12 16.5L6.5 21L8.5 13.5L3 9H10L12 2Z"
                fill="var(--primary)"
              />
            </svg>
          </div>
        );
      })}

      {/* Click starburst */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="fixed pointer-events-none z-9995"
          style={{
            left: star.x,
            top: star.y,
            transform: "translate(-50%, -50%)",
            opacity: star.opacity,
          }}
        >
          <svg width={star.size * 3} height={star.size * 3} viewBox="0 0 24 24">
            <path
              d="M12 2L14 9H21L15.5 13.5L17.5 21L12 16.5L6.5 21L8.5 13.5L3 9H10L12 2Z"
              fill="var(--primary)"
              style={{ filter: `drop-shadow(0 0 ${star.size * 2}px var(--primary))` }}
            />
          </svg>
        </div>
      ))}

      {/* Main cursor - Magic wand style */}
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
        {/* Rotating star ring on hover */}
        {isPointer && (
          <div
            className="absolute"
            style={{
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            }}
          >
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <div
                key={angle}
                className="absolute"
                style={{
                  transform: `rotate(${angle}deg) translateY(-22px)`,
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24">
                  <path
                    d="M12 2L14 9H21L15.5 13.5L17.5 21L12 16.5L6.5 21L8.5 13.5L3 9H10L12 2Z"
                    fill="var(--primary)"
                    style={{ filter: "drop-shadow(0 0 4px var(--primary))" }}
                  />
                </svg>
              </div>
            ))}
          </div>
        )}

        {/* Main star cursor */}
        <div
          className={`transition-all duration-200 ${
            isClicking ? "scale-50" : isPointer ? "scale-125" : "scale-100"
          }`}
          style={{
            transform: `rotate(${isPointer ? rotation * 2 : 0}deg)`,
          }}
        >
          <svg
            width={isPointer ? "28" : "24"}
            height={isPointer ? "28" : "24"}
            viewBox="0 0 24 24"
            style={{
              filter: `drop-shadow(0 0 8px var(--primary)) drop-shadow(0 0 16px var(--primary))`,
            }}
          >
            <path
              d="M12 2L14 9H21L15.5 13.5L17.5 21L12 16.5L6.5 21L8.5 13.5L3 9H10L12 2Z"
              fill="var(--primary)"
            />
            {/* Inner highlight */}
            <path
              d="M12 5L13 9H17L14 11.5L15 15L12 12.5L9 15L10 11.5L7 9H11L12 5Z"
              fill="white"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Twinkle effect */}
        {isPointer && (
          <>
            <div
              className="absolute w-1 h-8 bg-gradient-to-b from-transparent via-primary/60 to-transparent animate-twinkle-v"
              style={{ transform: "translate(-50%, -50%)", left: "50%", top: "50%" }}
            />
            <div
              className="absolute w-8 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-twinkle-h"
              style={{ transform: "translate(-50%, -50%)", left: "50%", top: "50%" }}
            />
          </>
        )}
      </div>

      {/* Outer glow ring */}
      <div
        className={`fixed pointer-events-none z-9998 transition-all duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`rounded-full border transition-all duration-300 ${
            isClicking
              ? "w-8 h-8 border-primary/80"
              : isPointer
              ? "w-16 h-16 border-primary/40 animate-pulse-ring"
              : "w-10 h-10 border-primary/30"
          }`}
          style={{
            boxShadow: isPointer ? "0 0 20px var(--primary), inset 0 0 20px var(--primary)" : "none",
          }}
        />
      </div>

      {/* Magic dust on hover */}
      {isPointer && isVisible && (
        <div
          className="fixed pointer-events-none z-9994"
          style={{
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full animate-magic-dust"
              style={{
                transform: `rotate(${i * 45 + rotation}deg) translateY(-30px)`,
                animationDelay: `${i * 0.15}s`,
                boxShadow: "0 0 4px var(--primary), 0 0 8px var(--primary)",
              }}
            />
          ))}
        </div>
      )}

      {/* Ambient sparkle aura */}
      <div
        className={`fixed pointer-events-none z-9993 transition-all duration-500 ${
          isVisible ? "opacity-30" : "opacity-0"
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`blur-2xl transition-all duration-300 ${
            isPointer ? "w-40 h-40" : "w-24 h-24"
          }`}
          style={{
            background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          }}
        />
      </div>
    </>
  );
}
