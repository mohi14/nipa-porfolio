"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  hue: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [rotation, setRotation] = useState(0);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const particleId = useRef(0);
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
      
      // Calculate movement for trail
      const dx = newX - lastPos.current.x;
      const dy = newY - lastPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Add trail points
      if (distance > 5) {
        trailId.current += 1;
        setTrail((prev) => [...prev.slice(-20), { x: newX, y: newY, id: trailId.current }]);
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
      // Spawn explosion particles
      const newParticles: Particle[] = [];
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20;
        const speed = 2 + Math.random() * 4;
        particleId.current += 1;
        newParticles.push({
          id: particleId.current,
          x: position.x,
          y: position.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: 2 + Math.random() * 4,
          hue: 280 + Math.random() * 40,
        });
      }
      setParticles((prev) => [...prev, ...newParticles]);
    };
    
    const handleMouseUp = () => setIsClicking(false);

    // Animation loop for rotation and particles
    const animate = () => {
      setRotation((prev) => (prev + 2) % 360);
      
      // Update particles
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.1, // gravity
            life: p.life - 0.02,
          }))
          .filter((p) => p.life > 0)
      );
    };

    const animationInterval = setInterval(animate, 16);

    // Trail cleanup
    const trailCleanup = setInterval(() => {
      setTrail((prev) => prev.slice(-15));
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
      {/* Comet trail */}
      {trail.map((point, index) => {
        const progress = index / trail.length;
        const size = 2 + progress * 6;
        const opacity = progress * 0.6;
        return (
          <div
            key={point.id}
            className="fixed pointer-events-none z-9996 rounded-full"
            style={{
              left: point.x,
              top: point.y,
              width: size,
              height: size,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`,
              opacity,
              boxShadow: `0 0 ${size * 2}px var(--primary)`,
            }}
          />
        );
      })}

      {/* Explosion particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-9995 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size * particle.life,
            height: particle.size * particle.life,
            transform: "translate(-50%, -50%)",
            background: `hsl(${particle.hue}, 80%, 60%)`,
            opacity: particle.life,
            boxShadow: `0 0 ${particle.size * 2}px hsl(${particle.hue}, 80%, 60%)`,
          }}
        />
      ))}

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
        {/* Outer hexagon ring */}
        <div
          className={`absolute transition-all duration-300 ${
            isClicking ? "scale-50" : isPointer ? "scale-150" : "scale-100"
          }`}
          style={{
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          }}
        >
          <svg width="50" height="50" viewBox="0 0 50 50">
            <defs>
              <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            <polygon
              points="25,2 45,14 45,36 25,48 5,36 5,14"
              fill="none"
              stroke="url(#hexGradient)"
              strokeWidth={isPointer ? "2" : "1.5"}
              style={{
                filter: "drop-shadow(0 0 8px var(--primary))",
              }}
            />
          </svg>
        </div>

        {/* Inner counter-rotating hexagon */}
        <div
          className={`absolute transition-all duration-300 ${
            isClicking ? "scale-75" : isPointer ? "scale-125" : "scale-100"
          }`}
          style={{
            transform: `translate(-50%, -50%) rotate(${-rotation * 1.5}deg)`,
          }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30">
            <polygon
              points="15,2 27,8.5 27,21.5 15,28 3,21.5 3,8.5"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="1"
              strokeDasharray={isPointer ? "4 2" : "0"}
              opacity="0.7"
              style={{
                filter: "drop-shadow(0 0 4px var(--primary))",
              }}
            />
          </svg>
        </div>

        {/* Center core */}
        <div
          className={`absolute rounded-full transition-all duration-200 ${
            isClicking
              ? "w-2 h-2 bg-white"
              : isPointer
              ? "w-4 h-4 bg-primary"
              : "w-3 h-3 bg-primary"
          }`}
          style={{
            transform: "translate(-50%, -50%)",
            boxShadow: `
              0 0 10px var(--primary),
              0 0 20px var(--primary),
              0 0 30px var(--primary),
              inset 0 0 10px rgba(255,255,255,0.3)
            `,
          }}
        />

        {/* Corner accents on hover */}
        {isPointer && (
          <>
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <div
                key={angle}
                className="absolute w-1.5 h-1.5 bg-primary rounded-full animate-pulse-fast"
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle + rotation}deg) translateY(-30px)`,
                  boxShadow: "0 0 8px var(--primary)",
                  animationDelay: `${angle * 0.005}s`,
                }}
              />
            ))}
          </>
        )}

        {/* Energy lines */}
        {isPointer && (
          <div
            className="absolute"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <div
                key={angle}
                className="absolute h-px bg-gradient-to-r from-primary to-transparent animate-energy-pulse"
                style={{
                  width: "20px",
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: "left center",
                  animationDelay: `${angle * 0.01}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Click shockwave */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-9994"
          style={{
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <svg width="120" height="120" viewBox="0 0 120 120" className="animate-shockwave">
            <polygon
              points="60,5 105,32.5 105,87.5 60,115 15,87.5 15,32.5"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2"
              opacity="0.8"
            />
          </svg>
          <svg width="100" height="100" viewBox="0 0 100 100" className="absolute inset-2.5 animate-shockwave-delay">
            <polygon
              points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="1.5"
              opacity="0.6"
            />
          </svg>
        </div>
      )}

      {/* Ambient glow */}
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
