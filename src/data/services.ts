import type { Service } from "@/types";

/**
 * Specialized dental services shown on the Services page.
 */
export const specializedServices: Service[] = [
  {
    title: "Dental Implants",
    desc: "Permanent, natural-looking tooth replacements that restore full function and aesthetics to your smile using titanium fixtures.",
    icon: "surgical",
    bgColor: "bg-primary-fixed/30",
    textColor: "text-primary",
    size: "col-span-12 md:col-span-8",
    detailsLink: "/book?reason=implants",
    isLarge: true,
  },
  {
    title: "Teeth Whitening",
    desc: "Professional-grade brightening treatments to safely remove deep stains and enhance your natural smile.",
    icon: "sentiment_satisfied",
    bgColor: "bg-secondary-fixed/40",
    textColor: "text-secondary",
    size: "col-span-12 sm:col-span-6 md:col-span-4",
    detailsLink: "/book?reason=whitening",
  },
  {
    title: "Orthodontics",
    desc: "Clear aligners and traditional braces for precise structural correction and optimal bite alignment.",
    icon: "health_and_safety",
    bgColor: "bg-primary-container/10",
    textColor: "text-primary-container",
    size: "col-span-12 sm:col-span-6 md:col-span-4",
    detailsLink: "/book?reason=orthodontics",
  },
  {
    title: "Root Canal Therapy",
    desc: "Pain-free endodontic procedures to save infected teeth and alleviate severe dental discomfort.",
    icon: "medical_services",
    bgColor: "bg-error-container/40",
    textColor: "text-on-error-container",
    size: "col-span-12 sm:col-span-6 md:col-span-4",
    detailsLink: "/book?reason=emergency",
  },
  {
    title: "Pediatric Dentistry",
    desc: "Gentle, preventive care designed specifically to ensure children have a positive, anxiety-free dental experience.",
    icon: "child_care",
    bgColor: "bg-surface-container-highest",
    textColor: "text-tertiary",
    size: "col-span-12 sm:col-span-6 md:col-span-4",
    detailsLink: "/book?reason=consultation",
  },
  {
    title: "Emergency Care",
    desc: "Immediate attention for severe pain, trauma, or unexpected dental crises to restore health quickly.",
    icon: "emergency",
    bgColor: "bg-error/10",
    textColor: "text-error",
    size: "col-span-12 sm:col-span-6 md:col-span-4",
    detailsLink: "/book?reason=emergency",
    borderLeft: "border-l-4 border-error",
    isEmergency: true,
  },
];
