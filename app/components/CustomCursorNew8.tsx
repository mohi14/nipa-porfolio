"use client";

import { useEffect, useState, useCallback } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

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
    };
  }, [updateCursorType]);

  if (typeof window !== "undefined") {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return null;
  }

  return (
    <>
      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-9999 transition-opacity duration-150 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Crosshair design */}
        <div
          className={`relative transition-all duration-200 ease-out ${
            isClicking ? "scale-75" : isPointer ? "scale-110" : "scale-100"
          }`}
        >
          {/* Center dot */}
          <div
            className={`absolute rounded-full bg-primary transition-all duration-200 ${
              isPointer ? "w-2 h-2" : "w-1.5 h-1.5"
            }`}
            style={{
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 8px var(--primary)",
            }}
          />

          {/* Top line */}
          <div
            className={`absolute bg-primary transition-all duration-200 ${
              isPointer ? "w-0.5 h-3 -top-4" : "w-px h-2 -top-3"
            }`}
            style={{ transform: "translateX(-50%)", left: "50%" }}
          />

          {/* Bottom line */}
          <div
            className={`absolute bg-primary transition-all duration-200 ${
              isPointer ? "w-0.5 h-3 top-1" : "w-px h-2 top-0.5"
            }`}
            style={{ transform: "translateX(-50%)", left: "50%" }}
          />

          {/* Left line */}
          <div
            className={`absolute bg-primary transition-all duration-200 ${
              isPointer ? "h-0.5 w-3 -left-4" : "h-px w-2 -left-3"
            }`}
            style={{ transform: "translateY(-50%)", top: "50%" }}
          />

          {/* Right line */}
          <div
            className={`absolute bg-primary transition-all duration-200 ${
              isPointer ? "h-0.5 w-3 left-1" : "h-px w-2 left-0.5"
            }`}
            style={{ transform: "translateY(-50%)", top: "50%" }}
          />

          {/* Corner brackets on hover */}
          {isPointer && (
            <>
              <div className="absolute -top-5 -left-5 w-2 h-2 border-t border-l border-primary" />
              <div className="absolute -top-5 -right-5 w-2 h-2 border-t border-r border-primary" />
              <div className="absolute -bottom-5 -left-5 w-2 h-2 border-b border-l border-primary" />
              <div className="absolute -bottom-5 -right-5 w-2 h-2 border-b border-r border-primary" />
            </>
          )}
        </div>
      </div>

      {/* Click effect */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-9998"
          style={{
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-6 h-6 border border-primary rounded-full animate-simple-ripple" />
        </div>
      )}
    </>
  );
}
