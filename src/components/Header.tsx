"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

const navLinks = [
  { href: "#hero", label: "Beranda" },
  { href: "#letter", label: "Surat" },
  { href: "#timeline", label: "Momen" },
  { href: "#wishes", label: "Harapan" },
  { href: "#gallery", label: "Galeri" },
  { href: "#final", label: "Penutup" },
];

export interface HeaderProps {
  title?: string;
}

export function Header({ title = "Happy Birthday" }: HeaderProps = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}
      className={`w-full transition-all duration-300 ${
        isScrolled
          ? "bg-cream/95 backdrop-blur-md shadow-sm border-b border-gold/10"
          : "bg-cream/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <nav className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <Heart className="w-5 h-5 text-pink-primary fill-pink-primary group-hover:scale-110 transition-transform" />
            <span className="font-serif italic text-lg text-charcoal">
              {title}
            </span>
            <span className="text-sm">🌸</span>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-brown-light hover:text-pink-primary transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://momeninvite.web.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1 rounded-full border border-pink-primary/30 text-pink-primary hover:bg-pink-primary hover:text-white transition-all font-medium flex items-center gap-1 shadow-sm"
              title="Kunjungi Platform Momen Invite"
            >
              <span>Momen Invite</span>
              <span className="text-[10px]">↗</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-0.5 bg-charcoal transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-charcoal transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-charcoal transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-80 pb-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-2 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-brown-light hover:text-pink-primary transition-colors py-2 text-left cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 mt-1 border-t border-gold/15 flex justify-start">
              <a
                href="https://momeninvite.web.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-brown-light hover:text-pink-primary transition-colors flex items-center gap-1.5 py-1 font-medium"
              >
                <span>Dibuat dengan</span>
                <span className="font-semibold text-pink-primary underline underline-offset-2">Momen Invite</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
