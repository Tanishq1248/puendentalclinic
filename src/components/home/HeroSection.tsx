"use client";

import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* ── Background Image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="Serene Dental Clinic"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/10" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full py-24 flex flex-col md:flex-row items-center gap-12">

        {/* Left: Copy */}
        <div className="w-full md:w-[56%] text-white">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/30 backdrop-blur-sm text-white/90 text-sm mb-8 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping flex-shrink-0" />
            Clinical Excellence&nbsp;·&nbsp;Family Care
          </div>

          {/* Headline */}
          <h1
            className="text-white leading-[1.1] tracking-[-0.02em] mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
            }}
          >
            A Brighter Smile,{" "}
            <span
              className="block"
              style={{
                fontStyle: "italic",
                color: "#6ee7b7",
              }}
            >
              Designed for Comfort
            </span>
          </h1>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 mb-10 pb-8 border-b border-white/20">
            {[
              { value: "99.8%", label: "Success Rate" },
              { value: "15+ Yrs", label: "Experience" },
              { value: "FDA", label: "Approved Tech" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span
                  className="text-white font-bold"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1.7rem",
                    lineHeight: 1,
                  }}
                >
                  {value}
                </span>
                <span
                  className="text-white/60 text-xs uppercase tracking-widest mt-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-full hover:shadow-[0_10px_30px_rgba(15,110,86,0.45)] transition-all hover:-translate-y-0.5 active:translate-y-0 text-sm group"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Book Free Consultation
              <span
                className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                arrow_forward
              </span>
            </Link>

            <a
              href={SITE_CONFIG.contact.phoneHref}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white hover:border-white hover:bg-white/10 font-medium px-8 py-4 rounded-full transition-all text-sm backdrop-blur-sm"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              {SITE_CONFIG.contact.phone}
            </a>
          </div>
        </div>

        {/* Right: Floating Cards */}
        <div className="w-full md:w-[44%] hidden md:flex flex-col gap-4 items-end">
          {/* Availability pill */}
          <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md border border-white/30 px-5 py-3 rounded-2xl text-white shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Next Slot Today
              </p>
              <p className="text-white/60 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                4:00 PM – 5:00 PM
              </p>
            </div>
          </div>

          {/* Doctor card */}
          <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-5 max-w-[280px] shadow-xl">
            <div className="flex gap-3 items-center mb-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/50 flex-shrink-0">
                <Image
                  alt="Dr. Rahul Sharma"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3Zd-zD9HSNNrQE02a4OozHeVbbd8e0LnZorZmyS2t9H54iz2KGTbOPEixNPnkc8yAZeCwXKieVUiT1C6-gsk40tyFrmcyxLU_vyHd0eNbbflm0K6VX5TbdK0JDYdwS08p96BoUhJmouqxd7nfJ_PBqFIbDOHTrQH0SC54pRGCDrK6EGoSbSX_T53A28JzAxzAW6hrj5YZRnb3q4AyhxRBM7y2hFm2FXln8yPV5gOYSeL7gouhl9jW0R3Xk1OCXH7BLttcd0Lpo6M"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4
                  className="text-white font-semibold text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Dr. Rahul Sharma
                </h4>
                <p className="text-white/60 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Lead Prosthodontist
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className="material-symbols-outlined text-[#FBBF24] text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
              <span
                className="text-white/70 text-xs ml-1.5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                4.9 · 200+ reviews
              </span>
            </div>
          </div>

          {/* Quick stats pill */}
          <div className="inline-flex items-center gap-4 bg-white/15 backdrop-blur-md border border-white/25 px-6 py-4 rounded-2xl text-white shadow-xl">
            <span className="material-symbols-outlined text-green-400 text-[28px]">verified</span>
            <div>
              <p className="font-semibold text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                500+ Happy Patients
              </p>
              <p className="text-white/60 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Trusted since 2010
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom wave divider ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none">
          <path d="M0 60L1440 60L1440 30C1200 0 900 60 720 30C540 0 240 60 0 30L0 60Z" fill="#fbf9f8" />
        </svg>
      </div>
    </section>
  );
}
