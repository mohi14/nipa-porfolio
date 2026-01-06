"use client";

import Image from "next/image";
import { useState } from "react";

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

function EmailIcon({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image src={imgVector3} alt="Email" fill className="object-contain" unoptimized />
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
    <div className="fixed left-4 top-0 h-full flex flex-col items-center gap-2 z-50 hidden lg:flex">
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
          <a href="#home" className="flex items-center gap-2">
            <div className="relative w-4 h-4">
              <Image src={imgLogo} alt="Logo" fill className="object-contain" unoptimized />
            </div>
            <span className="text-white font-bold text-base">Elias</span>
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
            <a href="/" className="flex text-base">
              <span className="text-[#c778dd]">#</span>
              <span className="text-white font-medium">home</span>
            </a>
            <a href="/projects" className="flex text-base hover:text-white transition-colors">
              <span className="text-[#c778dd]">#</span>
              <span className="text-[#abb2bf]">works</span>
            </a>
            <a href="/about" className="flex text-base hover:text-white transition-colors">
              <span className="text-[#c778dd]">#</span>
              <span className="text-[#abb2bf]">about-me</span>
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
              {/* Desktop Dropdown Menu */}
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
        className={`fixed inset-0 bg-[#282c33] z-[100] md:hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="px-4 py-4 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2" onClick={closeMenu}>
            <div className="relative w-4 h-4">
              <Image src={imgLogo} alt="Logo" fill className="object-contain" unoptimized />
            </div>
            <span className="text-white font-bold text-base">Elias</span>
          </a>
          {/* Close button (X) */}
          <button
            className="w-6 h-6 relative cursor-pointer"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-[#d9d9d9] -translate-x-1/2 -translate-y-1/2 rotate-45" />
            <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-[#d9d9d9] -translate-x-1/2 -translate-y-1/2 -rotate-45" />
          </button>
        </div>

        {/* Mobile Menu Navigation */}
        <nav className="px-4 pt-12 flex flex-col gap-8">
          <a
            href="/"
            className="flex text-[32px] font-medium"
            onClick={closeMenu}
          >
            <span className="text-[#c778dd]">#</span>
            <span className="text-white">home</span>
          </a>
          <a
            href="/projects"
            className="flex text-[32px]"
            onClick={closeMenu}
          >
            <span className="text-[#c778dd]">#</span>
            <span className="text-[#abb2bf]">works</span>
          </a>
          <a
            href="/about"
            className="flex text-[32px]"
            onClick={closeMenu}
          >
            <span className="text-[#c778dd]">#</span>
            <span className="text-[#abb2bf]">about-me</span>
          </a>
          <a
            href="/contacts"
            className="flex text-[32px]"
            onClick={closeMenu}
          >
            <span className="text-[#c778dd]">#</span>
            <span className="text-[#abb2bf]">contacts</span>
          </a>
          {/* Mobile Language Switcher with Dropdown */}
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
            {/* Mobile Dropdown Menu */}
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

        {/* Mobile Menu Social Icons */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 flex items-center justify-center hover:opacity-70 transition-opacity"
          >
            <GithubIcon className="w-10 h-10" />
          </a>
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 flex items-center justify-center hover:opacity-70 transition-opacity"
          >
            <DribbbleIcon className="w-10 h-10" />
          </a>
          <a
            href="https://figma.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 flex items-center justify-center hover:opacity-70 transition-opacity"
          >
            <FigmaIcon className="w-10 h-10" />
          </a>
        </div>
      </div>
    </>
  );
}

// Section Header component
function SectionHeader({ title, showViewAll = false, fullWidth = false }: { title: string; showViewAll?: boolean; fullWidth?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2 md:gap-4 mb-8 md:mb-12">
      <div className={`flex items-center gap-2 md:gap-4 ${fullWidth ? 'flex-1' : ''}`}>
        <h2 className="text-2xl md:text-3xl font-medium whitespace-nowrap">
          <span className="text-[#c778dd]">#</span>
          <span className="text-white">{title}</span>
        </h2>
        <div className={`h-px bg-[#c778dd] ${fullWidth ? 'flex-1' : 'w-20 md:w-64 lg:w-96'}`} />
      </div>
      {showViewAll && (
        <a href="/projects" className="text-white text-sm md:text-base font-medium whitespace-nowrap hover:text-[#c778dd] transition-colors">
          View all ~~&gt;
        </a>
      )}
    </div>
  );
}

// Project Card component
function ProjectCard({
  image,
  technologies,
  title,
  description,
  liveLink,
  cachedLink,
}: {
  image: string;
  technologies: string[];
  title: string;
  description: string;
  liveLink?: string;
  cachedLink?: string;
}) {
  return (
    <div className="border border-[#abb2bf] flex flex-col">
      <div className="h-48 relative border-b border-[#abb2bf]">
        <Image src={image} alt={title} fill className="object-cover" unoptimized />
      </div>
      <div className="p-2 border-b border-[#abb2bf]">
        <p className="text-[#abb2bf] text-base">{technologies.join(' ')}</p>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <h3 className="text-white text-2xl font-medium">{title}</h3>
        <p className="text-[#abb2bf] text-base">{description}</p>
        <div className="flex gap-4">
          {liveLink && (
            <a href={liveLink} className="border border-[#c778dd] px-4 py-2 text-white font-medium hover:bg-[#c778dd]/20 transition-colors">
              Live &lt;~&gt;
            </a>
          )}
          {cachedLink && (
            <a href={cachedLink} className="border border-[#abb2bf] px-4 py-2 text-[#abb2bf] font-medium hover:bg-[#abb2bf]/10 transition-colors">
              Cached &gt;=
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Skill Block component
function SkillBlock({ title, skills }: { title: string; skills: string[][] }) {
  return (
    <div className="border border-[#abb2bf] py-2">
      <div className="px-2 mb-2">
        <p className="text-white font-semibold text-base">{title}</p>
      </div>
      <div className="h-px bg-[#abb2bf] mb-2" />
      <div className="px-2 flex flex-col gap-2">
        {skills.map((row, idx) => (
          <div key={idx} className="flex gap-2 flex-wrap">
            {row.map((skill) => (
              <span key={skill} className="text-[#abb2bf] text-base">{skill}</span>
            ))}
          </div>
        ))}
      </div>
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
                <span className="text-white font-medium text-base">Elias</span>
              </div>
              <a href="mailto:elias@elias-dev.ml" className="text-[#abb2bf] hover:text-white transition-colors text-sm md:text-base">
                elias@elias-dev.ml
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
        <p className="text-[#abb2bf] text-sm md:text-base text-center">© Copyright 2022. Made by Elias</p>
      </div>
    </footer>
  );
}

// Main Home Component
export default function Home() {
  return (
    <div className="bg-[#282c33] min-h-screen font-[family-name:var(--font-fira-code)]">
      <Header />
      <MediaSidebar />

      {/* Hero Section */}
      <section id="home" className="pt-20 md:pt-32 lg:pt-40 pb-8 md:pb-16">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-4 md:gap-8 lg:gap-16">
            <div className="flex-1 order-1 lg:order-1">
              <h1 className="text-[32px] md:text-3xl lg:text-4xl font-semibold text-white mb-4 md:mb-8 leading-tight">
                Elias is a <span className="text-[#c778dd]">web designer</span> and{" "}
                <span className="text-[#c778dd]">front-end developer</span>
              </h1>
              <p className="text-[#abb2bf] text-base mb-4 md:mb-8 leading-relaxed">
                He crafts responsive websites where technologies meet creativity
              </p>
              <a
                href="#contacts"
                className="hidden md:inline-block border border-[#c778dd] px-4 py-2 text-white font-medium hover:bg-[#c778dd]/20 transition-colors"
              >
                Contact me!!
              </a>
            </div>
            <div className="flex-1 relative order-2 lg:order-2 w-full">
              <div className="relative">
                {/* Logo decoration - visible on mobile and desktop */}
                <div className="absolute -left-2 md:-left-8 top-12 md:top-20 w-24 md:w-40 h-24 md:h-40 z-0">
                  <div className="absolute bottom-0 left-0 w-1/2 h-3/4">
                    <Image src={img6} alt="" fill className="object-contain" unoptimized />
                  </div>
                  <div className="absolute top-0 right-0 w-1/2 h-3/4">
                    <Image src={img7} alt="" fill className="object-contain" unoptimized />
                  </div>
                </div>
                {/* Main hero image */}
                <div className="relative w-full h-64 md:h-80 lg:h-96 z-10">
                  <Image
                    src={imgImage1}
                    alt="Elias"
                    fill
                    className="object-contain object-center"
                    unoptimized
                  />
                </div>
                {/* Dots decoration - visible on mobile too */}
                <Dots className="absolute right-0 md:-right-4 bottom-4 md:bottom-8" rows={5} cols={5} />
              </div>
              {/* Currently working on badge */}
              <div className="mt-4 border border-[#abb2bf] bg-[#282c33] p-2 flex items-center gap-2.5 w-full md:w-auto">
                <div className="w-4 h-4 bg-[#c778dd] shrink-0" />
                <p className="text-[#abb2bf] text-base">
                  <span className="font-medium">Currently working on </span>
                  <span className="font-semibold text-white">Portfolio</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="relative border border-[#abb2bf] bg-[#282c33] p-6 md:p-8">
            {/* Quote marks */}
            <div className="absolute -top-4 left-2 w-8 md:w-10 h-6 md:h-7">
              <Image src={imgFrame49} alt="" fill className="object-contain" unoptimized />
            </div>
            <p className="text-white text-lg md:text-xl lg:text-2xl font-medium text-center">
              With great code power comes great bugs
            </p>
            <div className="absolute -bottom-4 right-4 w-8 md:w-10 h-6 md:h-7">
              <Image src={imgFrame49} alt="" fill className="object-contain" unoptimized />
            </div>
            {/* Author */}
            <div className="absolute -bottom-10 md:-bottom-12 right-0 border border-[#abb2bf] p-3 md:p-4">
              <p className="text-white text-lg md:text-xl lg:text-2xl">- Mr. Mohi</p>
            </div>
          </div>
        </div>
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
            />
            <ProjectCard
              image={img4}
              technologies={["React", "Express", "Discord.js", "Node.js", "HTML", "SCSS", "Python", "Flask"]}
              title="ProtectX"
              description="Discord anti-crash bot"
              liveLink="#"
            />
            <ProjectCard
              image={img5}
              technologies={["CSS", "Express", "Node.js"]}
              title="Kahoot Answers Viewer"
              description="Get answers to your kahoot quiz"
              liveLink="#"
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
              <Dots className="absolute top-8 left-8" rows={5} cols={5} />
              <Dots className="absolute top-32 left-48" rows={5} cols={5} />
              <div className="absolute top-56 left-64 w-12 h-12 border border-[#abb2bf]" />
              <div className="absolute top-16 left-64 w-20 h-20 border border-[#abb2bf]" />
              <div className="relative w-28 h-28 mx-auto mt-48">
                <Image src={imgLogo1} alt="Logo" fill className="object-contain" unoptimized />
              </div>
            </div>
            {/* Skills grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SkillBlock title="Languages" skills={[["TypeScript", "Lua"], ["Python", "JavaScript"]]} />
              <SkillBlock title="Databases" skills={[["SQLite", "PostgreSQL"], ["Mongo"]]} />
              <SkillBlock title="Other" skills={[["HTML", "CSS", "EJS", "SCSS"], ["REST", "Jinja"]]} />
              <SkillBlock title="Tools" skills={[["VSCode", "Neovim", "Linux"], ["Figma", "XFCE", "Arch"], ["Git", "Font Awesome"]]} />
              <SkillBlock title="Frameworks" skills={[["React", "Vue"], ["Disnake", "Discord.js"], ["Flask", "Express.js"]]} />
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about-me" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <SectionHeader title="about-me" />
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            <div className="flex-1">
              <div className="text-[#abb2bf] text-base leading-relaxed space-y-4">
                <p>Hello, i&apos;m Elias!</p>
                <p>
                  I&apos;m a self-taught front-end developer based in Kyiv, Ukraine. I can develop
                  responsive websites from scratch and raise them into modern user-friendly web
                  experiences.
                </p>
                <p>
                  Transforming my creativity and knowledge into a websites has been my passion for
                  over a year. I have been helping various clients to establish their presence
                  online. I always strive to learn about the newest technologies and frameworks.
                </p>
              </div>
              <a
                href="#"
                className="inline-block mt-8 border border-[#c778dd] px-4 py-2 text-white font-medium hover:bg-[#c778dd]/20 transition-colors"
              >
                Read more -&gt;
              </a>
            </div>
            <div className="flex-1 relative">
              <div className="relative w-full h-96 lg:h-[500px]">
                <Image
                  src={imgImage}
                  alt="Elias"
                  fill
                  className="object-contain object-center"
                  unoptimized
                />
              </div>
              {/* Decorative dots */}
              <Dots className="absolute top-8 -left-8 hidden lg:flex" rows={5} cols={5} />
              <Dots className="absolute bottom-16 right-0 hidden lg:flex" rows={4} cols={6} />
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <SectionHeader title="contacts" />
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="max-w-lg">
              <p className="text-[#abb2bf] text-base">
                I&apos;m interested in freelance opportunities. However, if you have other request
                or question, don&apos;t hesitate to contact me
              </p>
            </div>
            <div className="border border-[#abb2bf] p-4 flex flex-col gap-4">
              <p className="text-white font-semibold text-base">Message me here</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <DiscordIcon className="w-8 h-8" />
                  <span className="text-[#abb2bf] text-base">!Elias#3519</span>
                </div>
                <div className="flex items-center gap-2">
                  <EmailIcon className="w-8 h-8" />
                  <span className="text-[#abb2bf] text-base">elias@elias.me</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
