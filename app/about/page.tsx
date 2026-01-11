"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ScrollReveal,
  ParticleField,
  GradientOrb,
  MorphingBlob,
  SpotlightCursor,
  TiltCard,
} from "../components/AnimatedComponents";

// Asset URLs from Figma
const imgAboutImage = "https://www.figma.com/api/mcp/asset/a75b3544-afba-4cb6-85b8-ce2004d222e5";
const imgVector = "https://www.figma.com/api/mcp/asset/664768c4-7c1c-4836-a13f-3772910e1f41";
const imgVector1 = "https://www.figma.com/api/mcp/asset/3041f7a1-9dfe-4cdb-b987-fefae821187f";
const imgVector2 = "https://www.figma.com/api/mcp/asset/322cebf0-f011-446f-a548-0d8f1278e958";
const imgLogo = "https://www.figma.com/api/mcp/asset/cfcdfaa1-34a2-4e4d-a8c7-613688fb6dff";
const imgVector4 = "https://www.figma.com/api/mcp/asset/a32d92b4-fcef-4a88-85fa-aad7e8b534c9";
const imgLogo1 = "https://www.figma.com/api/mcp/asset/43779a12-ac02-4bf1-bb3e-64b21996ec7b";

// Icon Components
function FigmaIcon({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image src={imgVector} alt="Figma" fill className="object-contain" unoptimized />
    </div>
  );
}

function DribbbleIcon({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image src={imgVector1} alt="Dribbble" fill className="object-contain" unoptimized />
    </div>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image src={imgVector2} alt="Github" fill className="object-contain" unoptimized />
    </div>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image src={imgVector4} alt="Discord" fill className="object-contain" unoptimized />
    </div>
  );
}

// Dots pattern component
function Dots({ className, rows = 5, cols = 5 }: { className?: string; rows?: number; cols?: number }) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="flex gap-3">
          {Array.from({ length: cols }).map((_, colIdx) => (
            <div key={colIdx} className="w-1 h-1 rounded-full bg-[#abb2bf]" />
          ))}
        </div>
      ))}
    </div>
  );
}

// Media sidebar component
function MediaSidebar() {
  return (
    <div className="fixed left-4 top-0 h-full hidden lg:flex lg:flex-col items-center gap-2 z-50">
      <div className="w-px h-48 bg-[#abb2bf]" />
      <div className="flex flex-col gap-2">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity">
          <GithubIcon className="w-5 h-5" />
        </a>
        <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity">
          <DribbbleIcon className="w-5 h-5" />
        </a>
        <a href="https://figma.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity">
          <FigmaIcon className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}

// Header component with mobile menu
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleLang = () => setIsLangOpen(!isLangOpen);
  
  const selectLanguage = (lang: string) => {
    setCurrentLang(lang);
    setIsLangOpen(false);
  };

  const languages = ["EN", "RU", "UA"];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#282c33]">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4 md:py-8 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="relative w-4 h-4">
              <Image src={imgLogo} alt="Logo" fill className="object-contain" unoptimized />
            </div>
            <span className="text-white font-bold text-base">Nipa</span>
          </a>
          {/* Mobile hamburger menu button */}
          <button
            className="md:hidden w-6 h-6 flex flex-col justify-center items-end gap-1.5 cursor-pointer"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-0.5 bg-[#d9d9d9]" />
            <div className="w-4 h-0.5 bg-[#d9d9d9]" />
          </button>
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="flex text-base hover:text-white transition-colors">
              <span className="text-[#c778dd]">#</span>
              <span className="text-[#abb2bf]">home</span>
            </a>
            <a href="/projects" className="flex text-base hover:text-white transition-colors">
              <span className="text-[#c778dd]">#</span>
              <span className="text-[#abb2bf]">works</span>
            </a>
            <a href="/about" className="flex text-base">
              <span className="text-[#c778dd]">#</span>
              <span className="text-white font-medium">about-me</span>
            </a>
            <a href="/contacts" className="flex text-base hover:text-white transition-colors">
              <span className="text-[#c778dd]">#</span>
              <span className="text-[#abb2bf]">contacts</span>
            </a>
            {/* Desktop Language Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-1 text-[#abb2bf] cursor-pointer"
                onClick={toggleLang}
              >
                <span className="font-semibold">{currentLang}</span>
                <svg
                  width="10"
                  height="5"
                  viewBox="0 0 10 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`}
                >
                  <path d="M5 5L0 0H10L5 5Z" fill="#abb2bf" />
                </svg>
              </button>
              {isLangOpen && (
                <div className="absolute top-full left-0 mt-2 bg-[#282c33] border border-[#abb2bf] p-2 flex flex-col gap-2">
                  {languages
                    .filter((lang) => lang !== currentLang)
                    .map((lang) => (
                      <button
                        key={lang}
                        className="text-[#abb2bf] hover:text-white transition-colors text-left"
                        onClick={() => selectLanguage(lang)}
                      >
                        {lang}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#282c33] z-100 md:hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <div className="relative w-4 h-4">
              <Image src={imgLogo} alt="Logo" fill className="object-contain" unoptimized />
            </div>
            <span className="text-white font-bold text-base">Nipa</span>
          </a>
          <button
            className="w-6 h-6 relative cursor-pointer"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-[#d9d9d9] -translate-x-1/2 -translate-y-1/2 rotate-45" />
            <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-[#d9d9d9] -translate-x-1/2 -translate-y-1/2 -rotate-45" />
          </button>
        </div>

        <nav className="px-4 pt-12 flex flex-col gap-8">
          <a href="/" className="flex text-[32px]" onClick={closeMenu}>
            <span className="text-[#c778dd]">#</span>
            <span className="text-[#abb2bf]">home</span>
          </a>
          <a href="/projects" className="flex text-[32px]" onClick={closeMenu}>
            <span className="text-[#c778dd]">#</span>
            <span className="text-[#abb2bf]">works</span>
          </a>
          <a href="/about" className="flex text-[32px] font-medium" onClick={closeMenu}>
            <span className="text-[#c778dd]">#</span>
            <span className="text-white">about-me</span>
          </a>
          <a href="/contacts" className="flex text-[32px]" onClick={closeMenu}>
            <span className="text-[#c778dd]">#</span>
            <span className="text-[#abb2bf]">contacts</span>
          </a>
          <div className="relative">
            <button
              className="flex items-center gap-2 text-[#abb2bf] cursor-pointer"
              onClick={toggleLang}
            >
              <span className="font-semibold text-[32px]">{currentLang}</span>
              <svg
                width="14"
                height="7"
                viewBox="0 0 10 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`}
              >
                <path d="M5 5L0 0H10L5 5Z" fill="#abb2bf" />
              </svg>
            </button>
            {isLangOpen && (
              <div className="mt-4 bg-[#282c33] border border-[#abb2bf] p-3 flex flex-col gap-3">
                {languages
                  .filter((lang) => lang !== currentLang)
                  .map((lang) => (
                    <button
                      key={lang}
                      className="text-[#abb2bf] hover:text-white transition-colors text-left text-2xl"
                      onClick={() => selectLanguage(lang)}
                    >
                      {lang}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </nav>

        <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-16 h-16 flex items-center justify-center hover:opacity-70 transition-opacity">
            <GithubIcon className="w-10 h-10" />
          </a>
          <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="w-16 h-16 flex items-center justify-center hover:opacity-70 transition-opacity">
            <DribbbleIcon className="w-10 h-10" />
          </a>
          <a href="https://figma.com" target="_blank" rel="noopener noreferrer" className="w-16 h-16 flex items-center justify-center hover:opacity-70 transition-opacity">
            <FigmaIcon className="w-10 h-10" />
          </a>
        </div>
      </div>
    </>
  );
}

// Skill Block component
function SkillBlock({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div className="border border-[#abb2bf]">
      <div className="px-2 py-2">
        <p className="text-white font-semibold text-base">{title}</p>
      </div>
      <div className="h-px bg-[#abb2bf]" />
      <div className="px-2 py-2">
        <p className="text-[#abb2bf] text-base">{skills.join(' ')}</p>
      </div>
    </div>
  );
}

// Fun fact component
function FunFact({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-[#abb2bf] p-2 inline-block">
      <p className="text-[#abb2bf] text-base">{children}</p>
    </div>
  );
}

// Section Header component
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 mb-8 md:mb-12">
      <h2 className="text-2xl md:text-3xl font-medium whitespace-nowrap">
        <span className="text-[#c778dd]">#</span>
        <span className="text-white">{title}</span>
      </h2>
      <div className="h-px bg-[#c778dd] flex-1 max-w-md" />
    </div>
  );
}

// Footer component
function Footer() {
  return (
    <footer className="border-t border-[#abb2bf] mt-16 md:mt-24">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <div className="flex items-center gap-2">
                <div className="relative w-4 h-4">
                  <Image src={imgLogo} alt="Logo" fill className="object-contain" unoptimized />
                </div>
                <span className="text-white font-medium text-base">Nipa</span>
              </div>
              <a href="mailto:nipa@nipa-dev.ml" className="text-[#abb2bf] hover:text-white transition-colors text-sm md:text-base">
                nipa@nipa-dev.ml
              </a>
            </div>
            <p className="text-white text-sm md:text-base">Web designer and front-end developer</p>
          </div>
          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className="text-white text-xl md:text-2xl font-medium">Media</h3>
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity">
                <GithubIcon className="w-5 h-5" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity">
                <FigmaIcon className="w-5 h-5" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity">
                <DiscordIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <p className="text-[#abb2bf] text-sm md:text-base text-center">© Copyright 2022. Made by Nipa</p>
      </div>
    </footer>
  );
}

// Skills data
const skillsData = [
  { title: "Languages", skills: ["TypeScript", "Lua", "Python", "JavaScript"] },
  { title: "Other", skills: ["HTML", "CSS", "EJS", "SCSS", "REST", "Jinja"] },
  { title: "Tools", skills: ["VSCode", "Neovim", "Linux", "Figma", "XFCE", "Arch", "Git", "Font Awesome", "KDE", "fish"] },
  { title: "Databases", skills: ["SQLite", "PostgreSQL", "Mongo"] },
  { title: "Frameworks", skills: ["React", "Vue", "Disnake", "Discord.js", "Flask", "Express.js"] },
];

// Fun facts data
const funFacts = [
  "I like winter more than summer",
  "I often bike with my friends",
  <>I like <span className="text-white">pizza</span> and <span className="text-white">pasta</span></>,
  <>I was in <span className="text-white">Egypt</span>, <span className="text-white">Poland</span> and <span className="text-white">Turkey</span></>,
  <>My favorite movie is <span className="text-white">The Green Mile</span></>,
  "I am still in school",
  "I don't have any siblings",
];

// Main About Page Component
export default function AboutPage() {
  return (
    <div className="bg-[#282c33] min-h-screen font-(family-name:--font-fira-code) overflow-hidden">
      {/* Animated background effects container */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <ParticleField count={30} className="opacity-30" />
        <MorphingBlob className="w-80 h-80 -top-20 -right-20" color="#c778dd" />
        <MorphingBlob className="w-64 h-64 top-[60%] -left-32" color="#61afef" />
        <GradientOrb className="w-120 h-120 -top-40 -right-40" color="#c778dd" />
        <GradientOrb className="w-80 h-80 top-[70%] -left-24" color="#61afef" />
      </div>

      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        <div className="absolute -right-12 top-64 w-40 h-40 border border-[#abb2bf] hidden lg:block" />
        <div className="absolute -left-12 bottom-96 w-40 h-40 border border-[#abb2bf] hidden lg:block" />
        <Dots className="absolute -left-4 top-125 hidden lg:flex" rows={4} cols={5} />
        <Dots className="absolute right-4 bottom-150 hidden lg:flex" rows={5} cols={5} />
      </div>

      {/* Page Title Section */}
      <section className="pt-24 md:pt-32 pb-8 md:pb-12 relative z-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-4">
              <motion.h1 
                className="text-2xl md:text-3xl font-semibold"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-[#c778dd]">/</span>
                <span className="text-white">about-me</span>
              </motion.h1>
            </div>
            <motion.p 
              className="text-white text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Who am i?
            </motion.p>
          </ScrollReveal>
        </div>
      </section>

      {/* About Section */}
      <section className="py-8 md:py-12 relative z-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Text content */}
            <motion.div 
              className="flex-1 order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-[#abb2bf] text-base leading-relaxed space-y-4">
                <p>Hello, i&apos;m Nipa!</p>
                <p>
                  I&apos;m a self-taught front-end developer based in Kyiv, Ukraine. I can develop responsive websites from scratch and raise them into modern user-friendly web experiences.
                </p>
                <p>
                  Transforming my creativity and knowledge into a websites has been my passion for over a year. I have been helping various clients to establish their presence online. I always strive to learn about the newest technologies and frameworks.
                </p>
              </div>
            </motion.div>
            {/* Image */}
            <motion.div 
              className="flex-1 order-1 lg:order-2 relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <Dots className="absolute -left-8 top-8 hidden lg:flex" rows={5} cols={5} />
                <div className="relative w-full max-w-sm mx-auto h-96 lg:h-125">
                  <Image
                    src={imgAboutImage}
                    alt="About Nipa"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <Dots className="absolute -right-4 bottom-20 hidden lg:flex" rows={4} cols={5} />
                <div className="w-full max-w-sm mx-auto h-px bg-[#c778dd] mt-4" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-8 md:py-12 relative z-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <SectionHeader title="skills" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {skillsData.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <TiltCard>
                    <SkillBlock title={skill.title} skills={skill.skills} />
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="py-8 md:py-12 relative z-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <SectionHeader title="my-fun-facts" />
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="flex flex-wrap gap-4">
                  {funFacts.map((fact, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <FunFact>{fact}</FunFact>
                    </motion.div>
                  ))}
                </div>
              </div>
              {/* Decorative logo */}
              <motion.div 
                className="hidden lg:flex items-center justify-center"
                initial={{ opacity: 0, rotate: -10 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <Dots className="mb-4" rows={4} cols={4} />
                  <div className="relative w-28 h-28">
                    <Image src={imgLogo1} alt="" fill className="object-contain" unoptimized />
                  </div>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
