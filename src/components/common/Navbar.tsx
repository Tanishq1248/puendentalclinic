"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/config/site";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-surface/90 backdrop-blur-md sticky top-0 z-50 w-full shadow-sm shadow-[0_10px_30px_rgba(15,110,86,0.05)] transition-all duration-300">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-md max-w-7xl mx-auto">
        {/* Brand Logo */}
        <Link
          href="/"
          className="font-headline-md-mobile md:font-headline-md text-headline-md-mobile md:text-headline-md font-bold text-primary flex items-center gap-2"
        >
          <span
            className="material-symbols-outlined text-[32px] text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            dentistry
          </span>
          {SITE_CONFIG.name}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-lg items-center">
          {SITE_CONFIG.navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-title-lg text-title-lg px-3 py-2 rounded-md transition-all duration-200 ${
                  active
                    ? "text-primary border-b-2 border-primary font-bold pb-1"
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-sm">
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            className="md:hidden text-primary p-2 focus:outline-none hover:bg-surface-container-low rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[28px]">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>

          <Link
            href="/book"
            className="bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-full hover:shadow-[0_10px_30px_rgba(15,110,86,0.3)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 hidden md:block"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-outline-variant bg-surface px-margin-mobile py-md flex flex-col gap-md shadow-md animate-fade-in-up">
          {SITE_CONFIG.navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-title-lg text-title-lg py-sm px-md rounded-lg transition-colors ${
                  active
                    ? "bg-primary-container/20 text-primary font-bold"
                    : "text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/book"
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-primary text-on-primary font-label-md text-label-md py-sm rounded-lg text-center shadow-md hover:bg-primary-container hover:text-on-primary-container transition-colors"
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
