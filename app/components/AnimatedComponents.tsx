"use client";

import { motion, useScroll, useTransform, useSpring, useInView, Variants } from "framer-motion";
import { useRef, ReactNode, useEffect, useState } from "react";

// ============================================
// ANIMATION VARIANTS
// ============================================

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const letterAnimation: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

// ============================================
// ANIMATED TEXT COMPONENTS
// ============================================

// Animated text that reveals letter by letter
export function AnimatedText({ 
  text, 
  className = "",
  delay = 0 
}: { 
  text: string; 
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  
  return (
    <motion.span 
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.03,
            delayChildren: delay
          }
        }
      }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 50, rotateX: -90 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  rotateX: 0,
                  transition: { 
                    duration: 0.5, 
                    ease: [0.22, 1, 0.36, 1] 
                  }
                }
              }}
            >
              {char}
            </motion.span>
          ))}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </motion.span>
  );
}

// Typewriter effect
export function TypewriterText({ 
  text, 
  className = "",
  delay = 0,
  speed = 50
}: { 
  text: string; 
  className?: string;
  delay?: number;
  speed?: number;
}) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, speed]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: isComplete ? 0 : [1, 0] }}
        transition={{ duration: 0.5, repeat: isComplete ? 0 : Infinity }}
        className="inline-block w-0.75 h-[1em] bg-[#c778dd] ml-1 align-middle"
      />
    </span>
  );
}

// Glitch text effect
export function GlitchText({ 
  text, 
  className = "" 
}: { 
  text: string; 
  className?: string;
}) {
  return (
    <motion.span 
      className={`relative inline-block ${className}`}
      whileHover="hover"
    >
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 text-[#c778dd] z-0"
        variants={{
          hover: {
            x: [0, -2, 2, -2, 0],
            opacity: [0, 1, 1, 1, 0],
            transition: { duration: 0.3 }
          }
        }}
        style={{ clipPath: "inset(10% 0 60% 0)" }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-[#98c379] z-0"
        variants={{
          hover: {
            x: [0, 2, -2, 2, 0],
            opacity: [0, 1, 1, 1, 0],
            transition: { duration: 0.3 }
          }
        }}
        style={{ clipPath: "inset(60% 0 10% 0)" }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
}

// ============================================
// SCROLL REVEAL COMPONENTS
// ============================================

// Scroll-triggered reveal
export function ScrollReveal({ 
  children, 
  className = "",
  delay = 0,
  direction = "up"
}: { 
  children: ReactNode; 
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    up: { hidden: { opacity: 0, y: 75 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -75 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -75 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 75 }, visible: { opacity: 1, x: 0 } }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

// Stagger children reveal
export function StaggerReveal({ 
  children, 
  className = "",
  staggerDelay = 0.1
}: { 
  children: ReactNode; 
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// PARALLAX COMPONENTS
// ============================================

// Parallax wrapper
export function ParallaxWrapper({ 
  children, 
  className = "",
  speed = 0.5
}: { 
  children: ReactNode; 
  className?: string;
  speed?: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} className={className} style={{ y: smoothY }}>
      {children}
    </motion.div>
  );
}

// Floating animation
export function FloatingElement({ 
  children, 
  className = "",
  duration = 3,
  distance = 20
}: { 
  children: ReactNode; 
  className?: string;
  duration?: number;
  distance?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance / 2, distance / 2, -distance / 2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// INTERACTIVE COMPONENTS
// ============================================

// Magnetic button effect
export function MagneticButton({ 
  children, 
  className = "",
  strength = 0.3
}: { 
  children: ReactNode; 
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) * strength;
    const y = (clientY - top - height / 2) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}

// 3D Tilt card
export function TiltCard({ 
  children, 
  className = "",
  maxTilt = 15
}: { 
  children: ReactNode; 
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setRotateX(-y * maxTilt);
    setRotateY(x * maxTilt);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      animate={{ 
        rotateX, 
        rotateY,
        transformPerspective: 1000
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

// Hover scale
export function HoverScale({ 
  children, 
  className = "",
  scale = 1.05
}: { 
  children: ReactNode; 
  className?: string;
  scale?: number;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// DECORATIVE COMPONENTS
// ============================================

// Animated dots pattern
export function AnimatedDots({ 
  className = "", 
  rows = 5, 
  cols = 5 
}: { 
  className?: string; 
  rows?: number; 
  cols?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div 
      ref={ref}
      className={`flex flex-col gap-3 ${className}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="flex gap-3">
          {Array.from({ length: cols }).map((_, colIdx) => (
            <motion.div 
              key={colIdx} 
              className="w-1 h-1 rounded-full bg-[#abb2bf]"
              variants={{
                hidden: { scale: 0, opacity: 0 },
                visible: { 
                  scale: 1, 
                  opacity: 1,
                  transition: {
                    delay: (rowIdx * cols + colIdx) * 0.02,
                    duration: 0.3
                  }
                }
              }}
              whileHover={{
                scale: 2,
                backgroundColor: "#c778dd",
                transition: { duration: 0.2 }
              }}
            />
          ))}
        </div>
      ))}
    </motion.div>
  );
}

// Animated line
export function AnimatedLine({ 
  className = "",
  direction = "horizontal"
}: { 
  className?: string;
  direction?: "horizontal" | "vertical";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={`bg-[#c778dd] ${direction === "horizontal" ? "h-px" : "w-px"} ${className}`}
      initial={{ 
        scaleX: direction === "horizontal" ? 0 : 1,
        scaleY: direction === "vertical" ? 0 : 1
      }}
      animate={isInView ? { 
        scaleX: 1,
        scaleY: 1
      } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ originX: 0, originY: 0 }}
    />
  );
}

// Animated border box
export function AnimatedBorderBox({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover="hover"
    >
      {/* Top border */}
      <motion.div
        className="absolute top-0 left-0 h-px bg-[#c778dd]"
        initial={{ width: 0 }}
        variants={{
          hover: { width: "100%", transition: { duration: 0.3 } }
        }}
      />
      {/* Right border */}
      <motion.div
        className="absolute top-0 right-0 w-px bg-[#c778dd]"
        initial={{ height: 0 }}
        variants={{
          hover: { height: "100%", transition: { duration: 0.3, delay: 0.1 } }
        }}
      />
      {/* Bottom border */}
      <motion.div
        className="absolute bottom-0 right-0 h-px bg-[#c778dd]"
        initial={{ width: 0 }}
        variants={{
          hover: { width: "100%", transition: { duration: 0.3, delay: 0.2 } }
        }}
        style={{ originX: 1 }}
      />
      {/* Left border */}
      <motion.div
        className="absolute bottom-0 left-0 w-px bg-[#c778dd]"
        initial={{ height: 0 }}
        variants={{
          hover: { height: "100%", transition: { duration: 0.3, delay: 0.3 } }
        }}
        style={{ originY: 1 }}
      />
      {children}
    </motion.div>
  );
}

// Gradient orb
export function GradientOrb({ 
  className = "",
  color = "#c778dd"
}: { 
  className?: string;
  color?: string;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
      style={{ background: color }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.3, 0.2],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

// ============================================
// PAGE TRANSITION
// ============================================

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

// Section reveal with clip path
export function SectionReveal({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={isInView ? { clipPath: "inset(0% 0 0 0)" } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Counter animation
export function AnimatedCounter({ 
  value, 
  className = "",
  duration = 2
}: { 
  value: number; 
  className?: string;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * value));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {count}
    </span>
  );
}

// ============================================
// NEW STUNNING ANIMATIONS
// ============================================

// Particle background effect
export function ParticleField({ 
  count = 50,
  className = ""
}: { 
  count?: number;
  className?: string;
}) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
      }))
    );
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#c778dd]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: 0.3
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// Spotlight cursor effect
export function SpotlightCursor({ className = "" }: { className?: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <motion.div
      className={`fixed pointer-events-none z-30 ${className}`}
      animate={{
        x: mousePosition.x - 200,
        y: mousePosition.y - 200,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
    >
      <div 
        className="w-100 h-100 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(199,120,221,0.15) 0%, transparent 70%)"
        }}
      />
    </motion.div>
  );
}

// Text scramble/decode effect
export function ScrambleText({ 
  text, 
  className = "",
  scrambleOnHover = true
}: { 
  text: string; 
  className?: string;
  scrambleOnHover?: boolean;
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    
    let iterations = 0;
    const maxIterations = text.length * 3;
    
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text.split("").map((char, i) => {
          if (i < iterations / 3) return text[i];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      
      iterations++;
      if (iterations >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 30);
  };

  return (
    <motion.span 
      className={`font-mono ${className}`}
      onMouseEnter={scrambleOnHover ? scramble : undefined}
      whileHover={{ scale: 1.02 }}
    >
      {displayText}
    </motion.span>
  );
}

// Morphing blob shape
export function MorphingBlob({ 
  className = "",
  color = "#c778dd"
}: { 
  className?: string;
  color?: string;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        borderRadius: [
          "60% 40% 30% 70%/60% 30% 70% 40%",
          "30% 60% 70% 40%/50% 60% 30% 60%",
          "60% 40% 30% 70%/60% 30% 70% 40%"
        ],
        scale: [1, 1.1, 1],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        background: `linear-gradient(45deg, ${color}40, ${color}20)`,
        filter: "blur(40px)"
      }}
    />
  );
}

// Animated gradient border
export function GradientBorderCard({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <motion.div 
      className={`relative p-0.5 rounded-lg overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(0deg, #c778dd, #61afef, #98c379, #c778dd)",
            "linear-gradient(360deg, #c778dd, #61afef, #98c379, #c778dd)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative bg-[#282c33] rounded-lg p-4 h-full">
        {children}
      </div>
    </motion.div>
  );
}

// Ripple effect on click
export function RippleButton({ 
  children, 
  className = "",
  onClick
}: { 
  children: ReactNode; 
  className?: string;
  onClick?: () => void;
}) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);
    
    onClick?.();
  };

  return (
    <button 
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: 200, height: 200, opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            left: ripple.x - 100,
            top: ripple.y - 100
          }}
        />
      ))}
      {children}
    </button>
  );
}

// Staggered list reveal
export function StaggeredList({ 
  children, 
  className = "",
  staggerDelay = 0.1
}: { 
  children: ReactNode; 
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: { staggerChildren: staggerDelay }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggeredItem({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// Infinite marquee/ticker
export function MarqueeText({ 
  text, 
  className = "",
  speed = 20
}: { 
  text: string; 
  className?: string;
  speed?: number;
}) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        animate={{ x: [0, -1000] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {Array(10).fill(text).map((t, i) => (
          <span key={i} className="mx-8">{t}</span>
        ))}
      </motion.div>
    </div>
  );
}

// Reveal on scroll with mask
export function MaskReveal({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// 3D Rotating card
export function Card3D({ 
  children, 
  className = "" 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setRotateX((y - centerY) / 10);
    setRotateY((centerX - x) / 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={`${className}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Wave text animation
export function WaveText({ 
  text, 
  className = "" 
}: { 
  text: string; 
  className?: string;
}) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.05,
            ease: "easeInOut"
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// Pulse ring effect
export function PulseRing({ 
  className = "",
  color = "#c778dd"
}: { 
  className?: string;
  color?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: color }}
          animate={{
            scale: [1, 2],
            opacity: [0.5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}

