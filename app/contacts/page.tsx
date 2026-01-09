"use client";

import Image from "next/image";
import { useState } from "react";

// Asset URLs from Figma
const imgVector = "https://www.figma.com/api/mcp/asset/664768c4-7c1c-4836-a13f-3772910e1f41";
const imgVector1 = "https://www.figma.com/api/mcp/asset/3041f7a1-9dfe-4cdb-b987-fefae821187f";
const imgVector2 = "https://www.figma.com/api/mcp/asset/322cebf0-f011-446f-a548-0d8f1278e958";
const imgLogo = "https://www.figma.com/api/mcp/asset/cfcdfaa1-34a2-4e4d-a8c7-613688fb6dff";
const imgVector3 = "https://www.figma.com/api/mcp/asset/255509b5-1756-49c9-8aec-fe3e9be3223b";
const imgVector4 = "https://www.figma.com/api/mcp/asset/a32d92b4-fcef-4a88-85fa-aad7e8b534c9";

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

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
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
            <a href="/about" className="flex text-base hover:text-white transition-colors">
              <span className="text-[#c778dd]">#</span>
              <span className="text-[#abb2bf]">about-me</span>
            </a>
            <a href="/contacts" className="flex text-base">
              <span className="text-[#c778dd]">#</span>
              <span className="text-white font-medium">contacts</span>
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
        className={`fixed inset-0 bg-[#282c33] z-[100] md:hidden transition-transform duration-300 ease-in-out ${
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
          <a href="/about" className="flex text-[32px]" onClick={closeMenu}>
            <span className="text-[#c778dd]">#</span>
            <span className="text-[#abb2bf]">about-me</span>
          </a>
          <a href="/contacts" className="flex text-[32px] font-medium" onClick={closeMenu}>
            <span className="text-[#c778dd]">#</span>
            <span className="text-white">contacts</span>
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

// Contact card component
function ContactCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-[#abb2bf] p-4">
      <h3 className="text-white font-semibold text-base mb-4">{title}</h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

// Contact link component
function ContactLink({ icon: Icon, label, href }: { icon: React.ComponentType<{ className?: string }>; label: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-2">
      <Icon className="w-8 h-8 text-[#abb2bf]" />
      <span className="text-[#abb2bf] text-base">{label}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="hover:opacity-70 transition-opacity">
        {content}
      </a>
    );
  }

  return content;
}

// Main Contacts Page Component
export default function ContactsPage() {
  return (
    <div className="bg-[#282c33] min-h-screen font-[family-name:var(--font-fira-code)]">
      <Header />
      <MediaSidebar />

      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -right-12 top-64 w-40 h-40 border border-[#abb2bf] hidden lg:block" />
        <Dots className="absolute right-8 top-[400px] hidden lg:flex" rows={5} cols={5} />
      </div>

      {/* Page Title Section */}
      <section className="pt-24 md:pt-32 pb-8 md:pb-12">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="mb-4">
            <h1 className="text-2xl md:text-3xl font-semibold">
              <span className="text-[#c778dd]">/</span>
              <span className="text-white">contacts</span>
            </h1>
          </div>
          <p className="text-white text-base">Who am i?</p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Left side - description */}
            <div className="flex-1">
              <p className="text-[#abb2bf] text-base leading-relaxed">
                I&apos;m interested in freelance opportunities. However, if you have other request or question, don&apos;t hesitate to contact me
              </p>
            </div>

            {/* Right side - contact cards */}
            <div className="flex flex-col sm:flex-row gap-4">
              <ContactCard title="Support me here">
                <p className="text-[#abb2bf] text-base">4149500120690030</p>
              </ContactCard>

              <ContactCard title="Message me here">
                <ContactLink icon={DiscordIcon} label="Nipa#1234" />
                <ContactLink icon={EmailIcon} label="nipa@nipa-dev.ml" href="mailto:nipa@nipa-dev.ml" />
              </ContactCard>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <form className="flex flex-col gap-4 max-w-lg">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Name"
                className="flex-1 bg-transparent border border-[#abb2bf] p-2 text-white text-base placeholder:text-[#abb2bf] focus:outline-none focus:border-[#c778dd] transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="flex-1 bg-transparent border border-[#abb2bf] p-2 text-white text-base placeholder:text-[#abb2bf] focus:outline-none focus:border-[#c778dd] transition-colors"
              />
            </div>
            <input
              type="text"
              placeholder="Title"
              className="w-full bg-transparent border border-[#abb2bf] p-2 text-white text-base placeholder:text-[#abb2bf] focus:outline-none focus:border-[#c778dd] transition-colors"
            />
            <textarea
              placeholder="Message"
              rows={5}
              className="w-full bg-transparent border border-[#abb2bf] p-2 text-white text-base placeholder:text-[#abb2bf] focus:outline-none focus:border-[#c778dd] transition-colors resize-none"
            />
            <button
              type="submit"
              className="self-start border border-[#c778dd] px-4 py-2 text-white font-medium text-base hover:bg-[#c778dd]/10 transition-colors cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>
      </section>

      {/* All Media Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <SectionHeader title="all-media" />
          <div className="flex flex-wrap gap-4">
            <ContactLink icon={TwitterIcon} label="@elias" href="https://twitter.com/elias" />
            <ContactLink icon={TwitterIcon} label="@elias" href="https://twitter.com/elias" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
