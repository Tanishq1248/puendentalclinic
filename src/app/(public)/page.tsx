"use client";

import { useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import HowItWorks from "@/components/home/HowItWorks";
import DoctorProfile from "@/components/home/DoctorProfile";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import HomeCTA from "@/components/home/HomeCTA";

export default function Homepage() {
  // Scroll reveal logic
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      const elementVisible = 100;
      reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesGrid />
      <HowItWorks />
      <DoctorProfile />
      <Testimonials />
      <FAQ />
      <HomeCTA />
    </>
  );
}
