"use client";

import { useState } from "react";
import { testimonials } from "@/data/testimonials";

const GoogleIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-xl md:py-[100px] bg-surface-container-low overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-6 reveal">
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-4">
            Patient <span className="text-primary italic">Stories</span>
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Hear what our patients have to say about their experience.
          </p>
        </div>

        {/* Google Review Trust Badge */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 bg-white/60 backdrop-blur-sm border border-surface-container-high rounded-2xl px-6 py-4 max-w-2xl mx-auto shadow-sm reveal">
          <div className="flex items-center gap-3">
            <GoogleIcon />
            <div className="text-left">
              <h4 className="font-title-lg text-title-md text-on-surface font-bold leading-tight">Google Rating</h4>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-label-md text-label-md text-primary font-bold">4.9 / 5.0</span>
                <div className="flex items-center gap-0.5 text-[#F59E0B]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:block h-8 w-px bg-outline-variant/30"></div>
          <div className="text-center sm:text-left">
            <p className="font-body-md text-body-md text-on-surface-variant leading-tight">Verified Patient Reviews</p>
            <span className="font-caption text-caption text-primary font-semibold">Based on 350+ reviews</span>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative px-4 sm:px-8 max-w-3xl mx-auto reveal">
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {testimonials.map(({ quote, name, role, initial }) => (
                <div key={name} className="w-full flex-shrink-0 px-2 sm:px-4">
                  <div className="bg-white p-8 rounded-xl shadow-[0_10px_30px_rgba(15,110,86,0.05)] border border-surface-container-high relative flex flex-col justify-between h-full min-h-[220px]">
                    <div>
                      {/* Top row: Google Logo & Rating */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-1 text-[#F59E0B]">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                              star
                            </span>
                          ))}
                        </div>
                        <div className="bg-surface-container-low p-1.5 rounded-full shadow-sm flex items-center justify-center">
                          <GoogleIcon />
                        </div>
                      </div>

                      <p className="font-body-md text-body-md text-on-surface-variant mb-6 italic leading-relaxed">
                        &ldquo;{quote}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-title-lg font-bold">
                        {initial}
                      </div>
                      <div>
                        <h4 className="font-label-md text-label-md text-on-surface font-semibold">{name}</h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-caption text-caption text-on-surface-variant">{role}</span>
                          <span className="inline-block w-1 h-1 rounded-full bg-outline-variant"></span>
                          <span className="font-caption text-caption text-[#34A853] font-semibold flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 w-10 h-10 rounded-full bg-white shadow-md border border-surface-container-high flex items-center justify-center text-on-surface hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary z-10 cursor-pointer"
            aria-label="Previous slide"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 w-10 h-10 rounded-full bg-white shadow-md border border-surface-container-high flex items-center justify-center text-on-surface hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary z-10 cursor-pointer"
            aria-label="Next slide"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        {/* Indicator Dots */}
        <div className="flex justify-center gap-2 mt-8 reveal">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === i ? "bg-primary w-6" : "bg-outline-variant hover:bg-outline w-2.5"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
