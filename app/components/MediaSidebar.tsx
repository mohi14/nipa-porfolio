"use client";

import { motion } from "framer-motion";

function FigmaIcon({ className }: { className?: string }) {
  return (
    <motion.svg 
      className={className}
      viewBox="0 0 24 24" 
      fill="currentColor"
      whileHover={{ scale: 1.2, rotate: 10 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    </motion.svg>
  );
}

function DribbbleIcon({ className }: { className?: string }) {
  return (
    <motion.svg 
      className={className}
      viewBox="0 0 24 24" 
      fill="currentColor"
      whileHover={{ scale: 1.2, rotate: -10 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.424 25.424 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" />
    </motion.svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <motion.svg 
      className={className}
      viewBox="0 0 24 24" 
      fill="currentColor"
      whileHover={{ scale: 1.2, y: -5 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </motion.svg>
  );
}

export default function MediaSidebar() {
  return (
    <motion.div 
      className="fixed left-4 top-0 h-full hidden lg:flex lg:flex-col items-center gap-2 z-50"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
    >
      <motion.div 
        className="w-px bg-[#abb2bf]"
        initial={{ height: 0 }}
        animate={{ height: 192 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      />
      <motion.div 
        className="flex flex-col gap-2"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.15, delayChildren: 2.2 }
          }
        }}
      >
        {[
          { href: "https://github.com", Icon: GithubIcon },
          { href: "https://dribbble.com", Icon: DribbbleIcon },
          { href: "https://figma.com", Icon: FigmaIcon },
        ].map(({ href, Icon }, index) => (
          <motion.a 
            key={index}
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-8 h-8 flex items-center justify-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.2 }}
          >
            <Icon className="w-5 h-5" />
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
}
