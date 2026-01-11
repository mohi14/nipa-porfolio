"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import {
  ScrollReveal,
  FloatingElement,
  MagneticButton,
  TiltCard,
  AnimatedDots,
  GradientOrb,
  ParallaxWrapper,
  AnimatedText,
  ParticleField,
  SpotlightCursor,
  MorphingBlob,
  ScrambleText,
  MarqueeText,
} from "./components/AnimatedComponents";

// Asset URLs from Figma
const imgRectangle22 = "https://www.figma.com/api/mcp/asset/c0c8fdbc-dfe4-4326-9652-e3d7be9cfeec";
const imgImage = "https://www.figma.com/api/mcp/asset/a7f1ffeb-8800-47e0-9f79-786e10200bef";
const img4 = "https://www.figma.com/api/mcp/asset/e9fbe77b-a90f-430f-8786-4de6f51d53cc";
const img5 = "https://www.figma.com/api/mcp/asset/bab6b7a3-5b19-41bd-a683-e951297c7355";
const imgImage1 = "https://www.figma.com/api/mcp/asset/c56aabbe-7c03-4444-995e-7465e6260e5d";
const imgVector = "https://www.figma.com/api/mcp/asset/664768c4-7c1c-4836-a13f-3772910e1f41";
const imgVector1 = "https://www.figma.com/api/mcp/asset/3041f7a1-9dfe-4cdb-b987-fefae821187f";
const imgVector2 = "https://www.figma.com/api/mcp/asset/322cebf0-f011-446f-a548-0d8f1278e958";
const imgLogo = "https://www.figma.com/api/mcp/asset/cfcdfaa1-34a2-4e4d-a8c7-613688fb6dff";
const imgVector3 = "https://www.figma.com/api/mcp/asset/255509b5-1756-49c9-8aec-fe3e9be3223b";
const imgVector4 = "https://www.figma.com/api/mcp/asset/a32d92b4-fcef-4a88-85fa-aad7e8b534c9";
const imgLogo1 = "https://www.figma.com/api/mcp/asset/b96a5a13-92b8-485f-9baf-f453fd973eb4";
const img6 = "https://www.figma.com/api/mcp/asset/09f058f2-54a5-4b87-9e65-b5dbab2558cd";
const img7 = "https://www.figma.com/api/mcp/asset/51c2cbc5-8838-4baa-b551-738ffe7816c9";
const imgFrame49 = "https://www.figma.com/api/mcp/asset/b5808827-8775-4100-9b66-e2d20dd37eeb";

// Icon Components with hover animations
function FigmaIcon({ className }: { className?: string }) {
  return (
    <motion.div 
      className={`relative ${className}`}
      whileHover={{ scale: 1.2, rotate: 10 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <Image src={imgVector} alt="Figma" fill className="object-contain" unoptimized />
    </motion.div>
  );
}

function DribbbleIcon({ className }: { className?: string }) {
  return (
    <motion.div 
      className={`relative ${className}`}
      whileHover={{ scale: 1.2, rotate: -10 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <Image src={imgVector1} alt="Dribbble" fill className="object-contain" unoptimized />
    </motion.div>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <motion.div 
      className={`relative ${className}`}
      whileHover={{ scale: 1.2, y: -5 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <Image src={imgVector2} alt="Github" fill className="object-contain" unoptimized />
    </motion.div>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <motion.div 
      className={`relative ${className}`}
      whileHover={{ scale: 1.2, rotate: 10 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <Image src={imgVector4} alt="Discord" fill className="object-contain" unoptimized />
    </motion.div>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <motion.div 
      className={`relative ${className}`}
      whileHover={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <Image src={imgVector3} alt="Email" fill className="object-contain" unoptimized />
    </motion.div>
  );
}

// Media sidebar with stagger animation
function MediaSidebar() {
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

// Animated Header component
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const { scrollY } = useScroll();
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(40, 44, 51, 0)", "rgba(40, 44, 51, 0.95)"]
  );
  const headerBlur = useTransform(scrollY, [0, 100], [0, 10]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleLang = () => setIsLangOpen(!isLangOpen);
  
  const selectLanguage = (lang: string) => {
    setCurrentLang(lang);
    setIsLangOpen(false);
  };

  const languages = ["EN", "RU", "UA"];

  const navItems = [
    { href: "/", label: "home", active: true },
    { href: "/projects", label: "works", active: false },
    { href: "/about", label: "about-me", active: false },
    { href: "/contacts", label: "contacts", active: false },
  ];

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50"
        style={{ 
          backgroundColor: headerBackground,
          backdropFilter: `blur(${headerBlur}px)`,
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4 md:py-8 flex items-center justify-between">
          <MagneticButton>
            <motion.a 
              href="#home" 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="relative w-4 h-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Image src={imgLogo} alt="Logo" fill className="object-contain" unoptimized />
              </motion.div>
              <span className="text-white font-bold text-base">Nipa</span>
            </motion.a>
          </MagneticButton>
          
          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden w-6 h-6 flex flex-col justify-center items-end gap-1.5 cursor-pointer"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <motion.div 
              className="w-6 h-0.5 bg-[#d9d9d9]"
              animate={isMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            />
            <motion.div 
              className="h-0.5 bg-[#d9d9d9]"
              animate={isMenuOpen ? { width: 24, rotate: -45, y: -4 } : { width: 16, rotate: 0, y: 0 }}
            />
          </motion.button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a 
                key={item.label}
                href={item.href} 
                className="flex text-base relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3 }}
                whileHover={{ y: -2 }}
              >
                <span className="text-[#c778dd]">#</span>
                <span className={item.active ? "text-white font-medium" : "text-[#abb2bf]"}>
                  {item.label}
                </span>
                <motion.span 
                  className="absolute -bottom-1 left-0 h-0.5 bg-[#c778dd]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
            
            {/* Language Dropdown */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                className="flex items-center gap-1 text-[#abb2bf] cursor-pointer"
                onClick={toggleLang}
                whileHover={{ scale: 1.05 }}
              >
                <span className="font-semibold">{currentLang}</span>
                <motion.svg
                  width="10"
                  height="5"
                  viewBox="0 0 10 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  animate={{ rotate: isLangOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M5 5L0 0H10L5 5Z" fill="#abb2bf" />
                </motion.svg>
              </motion.button>
              
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div 
                    className="absolute top-full left-0 mt-2 bg-[#282c33] border border-[#abb2bf] p-2 flex flex-col gap-2 overflow-hidden"
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {languages.filter(lang => lang !== currentLang).map((lang) => (
                      <motion.button
                        key={lang}
                        className="text-[#abb2bf] hover:text-white transition-colors text-left"
                        onClick={() => selectLanguage(lang)}
                        whileHover={{ x: 5, color: "#ffffff" }}
                      >
                        {lang}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-[#282c33] z-100 md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="px-4 py-4 flex items-center justify-between">
              <motion.a 
                href="#home" 
                className="flex items-center gap-2" 
                onClick={closeMenu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative w-4 h-4">
                  <Image src={imgLogo} alt="Logo" fill className="object-contain" unoptimized />
                </div>
                <span className="text-white font-bold text-base">Nipa</span>
              </motion.a>
              
              <motion.button
                className="w-6 h-6 relative cursor-pointer"
                onClick={closeMenu}
                whileTap={{ scale: 0.9, rotate: 90 }}
              >
                <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-[#d9d9d9] -translate-x-1/2 -translate-y-1/2 rotate-45" />
                <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-[#d9d9d9] -translate-x-1/2 -translate-y-1/2 -rotate-45" />
              </motion.button>
            </div>

            <nav className="px-4 pt-12 flex flex-col gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="flex text-[32px]"
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index + 0.2 }}
                  whileHover={{ x: 20 }}
                >
                  <span className="text-[#c778dd]">#</span>
                  <span className={item.active ? "text-white font-medium" : "text-[#abb2bf]"}>
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.div 
              className="absolute bottom-20 left-0 right-0 flex justify-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[GithubIcon, DribbbleIcon, FigmaIcon].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 flex items-center justify-center"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-10 h-10" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Animated Section Header
function SectionHeader({ title, showViewAll = false }: { title: string; showViewAll?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div 
      ref={ref}
      className="flex items-center justify-between gap-2 md:gap-4 mb-8 md:mb-12"
    >
      <div className="flex items-center gap-2 md:gap-4 flex-1">
        <motion.h2 
          className="text-2xl md:text-3xl font-medium whitespace-nowrap"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#c778dd]">#</span>
          <span className="text-white">{title}</span>
        </motion.h2>
        <motion.div 
          className="h-px bg-[#c778dd] flex-1"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ originX: 0 }}
        />
      </div>
      {showViewAll && (
        <motion.a 
          href="/projects" 
          className="text-white text-sm md:text-base font-medium whitespace-nowrap relative group"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4 }}
          whileHover={{ x: 5 }}
        >
          View all ~~&gt;
          <motion.span 
            className="absolute -bottom-1 left-0 h-0.5 bg-[#c778dd]"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.a>
      )}
    </motion.div>
  );
}

// Animated Project Card
function ProjectCard({
  image,
  technologies,
  title,
  description,
  liveLink,
  cachedLink,
  index = 0,
}: {
  image: string;
  technologies: string[];
  title: string;
  description: string;
  liveLink?: string;
  cachedLink?: string;
  index?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
      animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
    >
      <TiltCard className="h-full">
        <motion.div 
          className="border border-[#abb2bf] flex flex-col h-full bg-[#282c33] overflow-hidden group"
          whileHover={{ borderColor: "#c778dd" }}
          transition={{ duration: 0.2 }}
        >
          <div className="h-48 relative border-b border-[#abb2bf] overflow-hidden">
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <Image src={image} alt={title} fill className="object-cover" unoptimized />
            </motion.div>
            <motion.div 
              className="absolute inset-0 bg-linear-to-t from-[#282c33] to-transparent opacity-0 group-hover:opacity-60"
              transition={{ duration: 0.3 }}
            />
          </div>
          <motion.div 
            className="p-2 border-b border-[#abb2bf] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.2 }}
          >
            <p className="text-[#abb2bf] text-base flex gap-2 flex-wrap">
              {technologies.map((tech, i) => (
                <motion.span 
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.1 * i + 0.3 }}
                  whileHover={{ color: "#c778dd", scale: 1.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </p>
          </motion.div>
          <div className="p-4 flex flex-col gap-4 flex-1">
            <motion.h3 
              className="text-white text-2xl font-medium"
              whileHover={{ color: "#c778dd" }}
            >
              {title}
            </motion.h3>
            <p className="text-[#abb2bf] text-base">{description}</p>
            <div className="flex gap-4 mt-auto">
              {liveLink && (
                <MagneticButton>
                  <motion.a 
                    href={liveLink} 
                    className="border border-[#c778dd] px-4 py-2 text-white font-medium relative overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="absolute inset-0 bg-[#c778dd] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                    <span className="relative z-10">Live &lt;~&gt;</span>
                  </motion.a>
                </MagneticButton>
              )}
              {cachedLink && (
                <MagneticButton>
                  <motion.a 
                    href={cachedLink} 
                    className="border border-[#abb2bf] px-4 py-2 text-[#abb2bf] font-medium"
                    whileHover={{ scale: 1.05, borderColor: "#c778dd", color: "#ffffff" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cached &gt;=
                  </motion.a>
                </MagneticButton>
              )}
            </div>
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}

// Animated Skill Block
function SkillBlock({ title, skills, index = 0 }: { title: string; skills: string[][]; index?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div 
      ref={ref}
      className="border border-[#abb2bf] py-2 overflow-hidden"
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ borderColor: "#c778dd" }}
    >
      <motion.div 
        className="px-2 mb-2"
        initial={{ x: -20 }}
        animate={isInView ? { x: 0 } : {}}
        transition={{ delay: index * 0.1 + 0.1 }}
      >
        <p className="text-white font-semibold text-base">{title}</p>
      </motion.div>
      <motion.div 
        className="h-px bg-[#abb2bf] mb-2"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        style={{ originX: 0 }}
      />
      <div className="px-2 flex flex-col gap-2">
        {skills.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-2 flex-wrap">
            {row.map((skill, skillIdx) => (
              <motion.span 
                key={skill} 
                className="text-[#abb2bf] text-base cursor-default"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  delay: index * 0.1 + rowIdx * 0.1 + skillIdx * 0.05 + 0.3,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  color: "#c778dd", 
                  scale: 1.15,
                  transition: { duration: 0.2 }
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Footer component
function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.footer 
      ref={ref}
      className="border-t border-[#abb2bf] mt-16 md:mt-24"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-8 mb-8 md:mb-12">
          <ScrollReveal>
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="relative w-4 h-4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Image src={imgLogo} alt="Logo" fill className="object-contain" unoptimized />
                  </motion.div>
                  <span className="text-white font-medium text-base">Nipa</span>
                </div>
                <motion.a 
                  href="mailto:nipa@nipa-dev.ml" 
                  className="text-[#abb2bf] text-sm md:text-base"
                  whileHover={{ color: "#c778dd", x: 5 }}
                >
                  nipa@nipa-dev.ml
                </motion.a>
              </div>
              <p className="text-white text-sm md:text-base">Web designer and front-end developer</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col gap-2 md:gap-3">
              <h3 className="text-white text-xl md:text-2xl font-medium">Media</h3>
              <div className="flex gap-2">
                {[GithubIcon, FigmaIcon, DiscordIcon].map((Icon, i) => (
                  <motion.a 
                    key={i}
                    href="#" 
                    className="w-8 h-8 flex items-center justify-center"
                    whileHover={{ scale: 1.3, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
        
        <motion.p 
          className="text-[#abb2bf] text-sm md:text-base text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          © Copyright 2022. Made by Nipa
        </motion.p>
      </div>
    </motion.footer>
  );
}

// Main Home Component
export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const smoothHeroY = useSpring(heroY, { stiffness: 100, damping: 30 });

  return (
    <div className="bg-[#282c33] min-h-screen font-(family-name:--font-fira-code) overflow-hidden">
      {/* Animated background effects container */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <ParticleField count={40} className="opacity-40" />
        <MorphingBlob className="w-96 h-96 -top-20 -right-20" color="#c778dd" />
        <MorphingBlob className="w-80 h-80 top-[50%] -left-40" color="#61afef" />
        
        {/* Background gradient orbs */}
        <GradientOrb className="w-150 h-150 -top-48 -right-48" color="#c778dd" />
        <GradientOrb className="w-100 h-100 top-[60%] -left-32" color="#61afef" />
        <GradientOrb className="w-125 h-125 top-[120%] right-0" color="#c778dd" />
      </div>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        id="home" 
        className="pt-20 md:pt-32 lg:pt-40 pb-8 md:pb-16 relative"
        style={{ opacity: heroOpacity, scale: heroScale, y: smoothHeroY }}
      >
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-4 md:gap-8 lg:gap-16">
            <motion.div 
              className="flex-1 order-1 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1 
                className="text-[32px] md:text-3xl lg:text-4xl font-semibold text-white mb-4 md:mb-8 leading-tight"
              >
                <motion.span
                  className="inline-block text-[#c778dd] font-bold relative"
                  initial={{ opacity: 0, y: -50, rotate: -10 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 10,
                    delay: 0.3 
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.4 }
                  }}
                >
                  Nipa
                  <motion.span
                    className="absolute -bottom-1 left-0 h-1 bg-[#c778dd]"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                  />
                </motion.span>
                <AnimatedText text=" is a" delay={0.5} />
                {" "}
                <motion.span 
                  className="text-[#c778dd] inline-block"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <ScrambleText text="web designer" />
                </motion.span>
                {" "}
                <AnimatedText text="and" delay={1.1} />
                {" "}
                <motion.span 
                  className="text-[#c778dd] inline-block"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                >
                  <ScrambleText text="front-end developer" />
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-[#abb2bf] text-base mb-4 md:mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                She crafts responsive websites where technologies meet creativity
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 }}
              >
                <MagneticButton>
                  <motion.a
                    href="#contacts"
                    className="hidden md:inline-block border border-[#c778dd] px-4 py-2 text-white font-medium relative overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="absolute inset-0 bg-[#c778dd] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                    <span className="relative z-10">Contact me!! -&gt;</span>
                  </motion.a>
                </MagneticButton>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex-1 relative order-2 lg:order-2 w-full"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative">
                {/* Logo decoration */}
                <motion.div 
                  className="absolute -left-2 md:-left-8 top-12 md:top-20 w-24 md:w-40 h-24 md:h-40 z-0"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute bottom-0 left-0 w-1/2 h-3/4">
                    <Image src={img6} alt="" fill className="object-contain" unoptimized />
                  </div>
                  <div className="absolute top-0 right-0 w-1/2 h-3/4">
                    <Image src={img7} alt="" fill className="object-contain" unoptimized />
                  </div>
                </motion.div>
                
                {/* Main hero image */}
                <FloatingElement duration={4} distance={15}>
                  <div className="relative w-full h-64 md:h-80 lg:h-96 z-10">
                    <Image
                      src={imgImage1}
                      alt="Nipa"
                      fill
                      className="object-contain object-center"
                      unoptimized
                    />
                  </div>
                </FloatingElement>
                
                {/* Animated dots */}
                <AnimatedDots className="absolute right-0 md:-right-4 bottom-4 md:bottom-8" rows={5} cols={5} />
              </div>
              
              {/* Currently working on badge */}
              <motion.div 
                className="mt-4 border border-[#abb2bf] bg-[#282c33] p-2 flex items-center gap-2.5 w-full md:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9 }}
                whileHover={{ borderColor: "#c778dd", scale: 1.02 }}
              >
                <motion.div 
                  className="w-4 h-4 bg-[#c778dd] shrink-0"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <p className="text-[#abb2bf] text-base">
                  <span className="font-medium">Currently working on </span>
                  <motion.span 
                    className="font-semibold text-white"
                    animate={{ color: ["#ffffff", "#c778dd", "#ffffff"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Portfolio
                  </motion.span>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Quote Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <motion.div 
              className="relative border border-[#abb2bf] bg-[#282c33] p-6 md:p-8"
              whileHover={{ borderColor: "#c778dd" }}
            >
              {/* Quote marks */}
              <motion.div 
                className="absolute -top-4 left-2 w-8 md:w-10 h-6 md:h-7"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Image src={imgFrame49} alt="" fill className="object-contain" unoptimized />
              </motion.div>
              
              <motion.p 
                className="text-white text-lg md:text-xl lg:text-2xl font-medium text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                With great code power comes great bugs
              </motion.p>
              
              <motion.div 
                className="absolute -bottom-4 right-4 w-8 md:w-10 h-6 md:h-7"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Image src={imgFrame49} alt="" fill className="object-contain" unoptimized />
              </motion.div>
              
              {/* Author */}
              <motion.div 
                className="absolute -bottom-10 md:-bottom-12 right-0 border border-[#abb2bf] p-3 md:p-4 bg-[#282c33]"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                whileHover={{ borderColor: "#c778dd" }}
              >
                <p className="text-white text-lg md:text-xl lg:text-2xl">- Mr. Mohi</p>
              </motion.div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Marquee Tech Stack Section */}
      <section className="py-8 border-y border-[#abb2bf]/20 overflow-hidden">
        <MarqueeText 
          text="✦ React ✦ Next.js ✦ TypeScript ✦ Tailwind ✦ Node.js ✦ Python ✦ Figma ✦ UI/UX ✦ Web Design ✦ Frontend ✦" 
          className="text-2xl md:text-4xl font-bold text-[#abb2bf]/30"
          speed={30}
        />
      </section>

      {/* Projects Section */}
      <section id="works" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <SectionHeader title="projects" showViewAll />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProjectCard
              image={imgRectangle22}
              technologies={["HTML", "SCSS", "Python", "Flask"]}
              title="ChertNodes"
              description="Minecraft servers hosting"
              liveLink="#"
              cachedLink="#"
              index={0}
            />
            <ProjectCard
              image={img4}
              technologies={["React", "Express", "Discord.js", "Node.js"]}
              title="ProtectX"
              description="Discord anti-crash bot"
              liveLink="#"
              index={1}
            />
            <ProjectCard
              image={img5}
              technologies={["CSS", "Express", "Node.js"]}
              title="Kahoot Answers Viewer"
              description="Get answers to your kahoot quiz"
              liveLink="#"
              index={2}
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <SectionHeader title="skills" />
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Decorative elements */}
            <div className="hidden lg:flex flex-col gap-8 flex-1 relative">
              <AnimatedDots className="absolute top-8 left-8" rows={5} cols={5} />
              <AnimatedDots className="absolute top-32 left-48" rows={5} cols={5} />
              
              <ParallaxWrapper speed={0.3}>
                <motion.div 
                  className="absolute top-56 left-64 w-12 h-12 border border-[#abb2bf]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </ParallaxWrapper>
              
              <ParallaxWrapper speed={-0.2}>
                <motion.div 
                  className="absolute top-16 left-64 w-20 h-20 border border-[#abb2bf]"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
              </ParallaxWrapper>
              
              <FloatingElement duration={5} distance={10} className="relative w-28 h-28 mx-auto mt-48">
                <Image src={imgLogo1} alt="Logo" fill className="object-contain" unoptimized />
              </FloatingElement>
            </div>
            
            {/* Skills grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SkillBlock title="Languages" skills={[["TypeScript", "Lua"], ["Python", "JavaScript"]]} index={0} />
              <SkillBlock title="Databases" skills={[["SQLite", "PostgreSQL"], ["Mongo"]]} index={1} />
              <SkillBlock title="Other" skills={[["HTML", "CSS", "EJS", "SCSS"], ["REST", "Jinja"]]} index={2} />
              <SkillBlock title="Tools" skills={[["VSCode", "Neovim", "Linux"], ["Figma", "XFCE", "Arch"], ["Git", "Font Awesome"]]} index={3} />
              <SkillBlock title="Frameworks" skills={[["React", "Vue"], ["Disnake", "Discord.js"], ["Flask", "Express.js"]]} index={4} />
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about-me" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <SectionHeader title="about-me" />
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            <ScrollReveal className="flex-1" direction="left">
              <div className="text-[#abb2bf] text-base leading-relaxed space-y-4">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  Hello, i&apos;m <span className="text-[#c778dd] font-medium">Nipa</span>!
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  I&apos;m a self-taught front-end developer based in Kyiv, Ukraine. I can develop
                  responsive websites from scratch and raise them into modern user-friendly web
                  experiences.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Transforming my creativity and knowledge into a websites has been my passion for
                  over a year. I have been helping various clients to establish their presence
                  online. I always strive to learn about the newest technologies and frameworks.
                </motion.p>
              </div>
              
              <MagneticButton className="inline-block mt-8">
                <motion.a
                  href="/about"
                  className="border border-[#c778dd] px-4 py-2 text-white font-medium relative overflow-hidden inline-block group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="absolute inset-0 bg-[#c778dd] -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  <span className="relative z-10">Read more -&gt;</span>
                </motion.a>
              </MagneticButton>
            </ScrollReveal>
            
            <ScrollReveal className="flex-1 relative" direction="right" delay={0.2}>
              <FloatingElement duration={5} distance={15}>
                <div className="relative w-full h-96 lg:h-125">
                  <Image
                    src={imgImage}
                    alt="Nipa"
                    fill
                    className="object-contain object-center"
                    unoptimized
                  />
                </div>
              </FloatingElement>
              
              <AnimatedDots className="absolute top-8 -left-8 hidden lg:flex" rows={5} cols={5} />
              <AnimatedDots className="absolute bottom-16 right-0 hidden lg:flex" rows={4} cols={6} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <SectionHeader title="contacts" />
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <ScrollReveal className="max-w-lg">
              <p className="text-[#abb2bf] text-base">
                I&apos;m interested in freelance opportunities. However, if you have other request
                or question, don&apos;t hesitate to contact me
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <motion.div 
                className="border border-[#abb2bf] p-4 flex flex-col gap-4"
                whileHover={{ borderColor: "#c778dd" }}
              >
                <p className="text-white font-semibold text-base">Message me here</p>
                <div className="flex flex-col gap-2">
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ x: 10 }}
                  >
                    <DiscordIcon className="w-8 h-8" />
                    <span className="text-[#abb2bf] text-base">!Nipa#3519</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ x: 10 }}
                  >
                    <EmailIcon className="w-8 h-8" />
                    <span className="text-[#abb2bf] text-base">nipa@nipa.me</span>
                  </motion.div>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
