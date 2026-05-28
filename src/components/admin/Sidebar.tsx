"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const links = [
    { name: "Appointments", href: "/admin/appointments", icon: "calendar_month" },
    { name: "Patients", href: "/admin/patients", icon: "group" },
    { name: "Services", href: "/admin/services", icon: "medical_services" },
  ];

  const renderNavItems = () => (
    <ul className="flex flex-col gap-sm flex-grow">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <li key={link.name}>
            <Link
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-md px-md py-sm rounded-lg transition-all duration-300 ease-in-out font-label-md text-label-md ${
                active
                  ? "bg-primary-container text-on-primary-container font-bold"
                  : "text-on-surface-variant hover:text-primary hover:bg-primary-container/20 transform hover:translate-x-1"
              }`}
            >
              <span className={`material-symbols-outlined ${active ? "fill" : ""}`}>
                {link.icon}
              </span>
              {link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  const renderFooterItems = () => (
    <div className="mt-auto">
      <Link
        href="/admin/appointments?new=true"
        onClick={() => setIsMobileOpen(false)}
        className="block w-full bg-primary text-on-primary rounded-lg py-sm text-center font-label-md text-label-md mb-lg shadow-sm hover:opacity-90 transition-opacity"
      >
        New Appointment
      </Link>
      <ul className="flex flex-col gap-sm">
      
        <li>
          <Link
            href="/"
            onClick={() => setIsMobileOpen(false)}
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary-container/20 transition-all duration-300 ease-in-out transform hover:translate-x-1 font-label-md text-label-md"
          >
            <span className="material-symbols-outlined">logout</span>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <>
      {/* Mobile Floating Hamburger Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-3 left-4 z-50 md:hidden bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/60 text-primary w-10 h-10 rounded-lg flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
        title="Toggle Sidebar Navigation"
      >
        <span className="material-symbols-outlined text-[24px]">
          {isMobileOpen ? "close" : "menu"}
        </span>
      </button>

      {/* Mobile Sidebar Slide-out Drawer Panel Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar Slide-out Drawer Panel Content */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-surface-container-lowest border-r border-outline-variant py-md px-sm z-40 md:hidden flex flex-col transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-lg px-sm pt-12">
          <h1 className="font-title-lg text-title-lg font-bold text-primary"> Dental</h1>
          <p className="font-caption text-caption text-on-surface-variant mt-xs">Admin Management</p>
        </div>
        {renderNavItems()}
        {renderFooterItems()}
      </aside>

      {/* Desktop Static Sidebar Layout */}
      <nav className="hidden md:flex flex-col h-full py-md px-sm border-r border-outline-variant bg-surface-container-lowest shadow-md h-screen w-60 shrink-0 fixed left-0 top-0 z-50">
        <div className="mb-lg px-sm">
          <h1 className="font-title-lg text-title-lg font-bold text-primary">Dental</h1>
          <p className="font-caption text-caption text-on-surface-variant mt-xs">Admin Management</p>
        </div>

        {renderNavItems()}
        {renderFooterItems()}
      </nav>
    </>
  );
}
