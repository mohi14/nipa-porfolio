"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface TextChar {
  char: string;
  x: number;
  y: number;
  id: number;
  angle: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [textTrail, setTextTrail] = useState<TextChar[]>([]);
  const [hoverText, setHoverText] = useState("");
  const trailIdRef = useRef(0);
  const chars = "⟨⟩◇◆▸▹●○⬡⬢✦✧";
  
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
    
    // Get text for hover element
    if (isClickable) {
      const el = target.closest("a, button") || target;
      const text = el.textContent?.slice(0, 20) || "click";
      setHoverText(text);
    } else {
      setHoverText("");
    }
  }, []);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;
      
      // Calculate distance moved
      const distance = Math.sqrt((newX - lastX) ** 2 + (newY - lastY) ** 2);
      
      // Add character to trail based on movement
      if (distance > 15) {
        trailIdRef.current += 1;
        const angle = Math.atan2(newY - lastY, newX - lastX) * (180 / Math.PI);
        setTextTrail((prev) => [
          ...prev.slice(-15),
          {
            char: chars[Math.floor(Math.random() * chars.length)],
            x: newX,
            y: newY,
            id: trailIdRef.current,
            angle,
          },
        ]);
        lastX = newX;
        lastY = newY;
      }
      
      setPosition({ x: newX, y: newY });
      setIsVisible(true);
      updateCursorType(e);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Cleanup old trail chars
    const cleanupInterval = setInterval(() => {
      setTextTrail((prev) => prev.slice(-10));
    }, 100);

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
      clearInterval(cleanupInterval);
    };
  }, [updateCursorType]);

  if (typeof window !== "undefined") {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return null;
  }

  return (
    <>
      {/* Text character trail */}
      {textTrail.map((item, index) => {
        const opacity = (index + 1) / textTrail.length;
        const scale = 0.5 + (index / textTrail.length) * 0.5;
        return (
          <div
            key={item.id}
            className="fixed pointer-events-none z-9996 font-mono text-primary animate-char-fade"
            style={{
              left: item.x,
              top: item.y,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity: opacity * 0.7,
              fontSize: "14px",
              textShadow: "0 0 10px var(--primary)",
            }}
          >
            {item.char}
          </div>
        );
      })}

      {/* Main cursor - code bracket style */}
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
        {/* Bracket cursor */}
        <div
          className={`relative font-mono transition-all duration-200 ${
            isClicking ? "scale-75" : isPointer ? "scale-125" : "scale-100"
          }`}
        >
          {/* Left bracket */}
          <span
            className={`absolute text-primary font-bold transition-all duration-200 ${
              isPointer ? "-translate-x-4" : "-translate-x-2"
            }`}
            style={{
              fontSize: isPointer ? "24px" : "18px",
              textShadow: "0 0 10px var(--primary), 0 0 20px var(--primary)",
              transform: `translateX(${isPointer ? -16 : -8}px) translateY(-50%)`,
            }}
          >
            {"<"}
          </span>

          {/* Center dot or text */}
          <div
            className={`transition-all duration-200 ${
              isPointer ? "opacity-0" : "opacity-100"
            }`}
          >
            <div
              className="w-1.5 h-1.5 bg-primary rounded-full"
              style={{
                boxShadow: "0 0 8px var(--primary), 0 0 16px var(--primary)",
              }}
            />
          </div>

          {/* Underscore blink for pointer */}
          {isPointer && (
            <span
              className="absolute text-primary font-bold animate-blink"
              style={{
                fontSize: "18px",
                textShadow: "0 0 10px var(--primary)",
                transform: "translateX(-50%) translateY(-50%)",
              }}
            >
              _
            </span>
          )}

          {/* Right bracket */}
          <span
            className={`absolute text-primary font-bold transition-all duration-200 ${
              isPointer ? "translate-x-4" : "translate-x-2"
            }`}
            style={{
              fontSize: isPointer ? "24px" : "18px",
              textShadow: "0 0 10px var(--primary), 0 0 20px var(--primary)",
              transform: `translateX(${isPointer ? 10 : 4}px) translateY(-50%)`,
            }}
          >
            {"/>"}
          </span>
        </div>

        {/* Hover text display */}
        {isPointer && hoverText && (
          <div
            className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs text-primary/80 animate-typewriter overflow-hidden"
            style={{
              textShadow: "0 0 5px var(--primary)",
              borderRight: "2px solid var(--primary)",
              paddingRight: "2px",
            }}
          >
            {`// ${hoverText.toLowerCase()}`}
          </div>
        )}
      </div>

      {/* Click effect - code execution */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-9997"
          style={{
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Expanding code symbols */}
          {["{ }", "( )", "[ ]", "< >"].map((symbol, i) => (
            <div
              key={symbol}
              className="absolute font-mono text-primary animate-code-burst"
              style={{
                fontSize: "12px",
                textShadow: "0 0 8px var(--primary)",
                transform: `rotate(${i * 90}deg)`,
                animationDelay: `${i * 0.05}s`,
              }}
            >
              {symbol}
            </div>
          ))}
          
          {/* Binary burst */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute font-mono text-primary/60 text-xs animate-binary-burst"
              style={{
                transform: `rotate(${i * 45}deg)`,
                animationDelay: `${i * 0.02}s`,
              }}
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </div>
          ))}
        </div>
      )}

      {/* Ambient terminal glow */}
      <div
        className={`fixed pointer-events-none z-9995 transition-opacity duration-500 ${
          isVisible ? "opacity-20" : "opacity-0"
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`rounded-full blur-2xl transition-all duration-300 ${
            isPointer 
              ? "w-40 h-40 bg-gradient-radial from-primary/50 to-transparent" 
              : "w-24 h-24 bg-primary/30"
          }`}
        />
      </div>

      {/* Floating code snippet on idle */}
      {!isPointer && isVisible && (
        <div
          className="fixed pointer-events-none z-9994 font-mono text-primary/20 text-xs animate-float"
          style={{
            left: position.x + 30,
            top: position.y - 20,
          }}
        >
          <div className="animate-pulse-slow">{"</>"}</div>
        </div>
      )}
    </>
  );
}
