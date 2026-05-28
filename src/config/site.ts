/**
 * Site-wide configuration constants.
 * Single source of truth for clinic name, contact details, and navigation.
 */

export const SITE_CONFIG = {
  name: "Pune Dental Care",
  adminName: "HealthSmile Dental",
  tagline: "Premium Dentistry, Pune",
  description:
    "Experience world-class dentistry designed around your comfort. From routine checkups to complex restorations, we blend advanced technology with a gentle, patient-first approach in a serene environment.",

  contact: {
    phone: "+91 98765 43210",
    phoneHref: "tel:+919876543210",
    whatsapp: "https://wa.me/919876543210",
    address: "Koregaon Park, Pune",
    addressFull: "Koregaon Park, Pune\nMaharashtra, India 411001",
    mapsUrl: "https://maps.google.com/?q=Koregaon+Park,+Pune",
  },

  hours: {
    weekdays: "Monday - Saturday: 9:00 AM - 8:00 PM",
    sunday: "Sunday: Closed",
  },

  navLinks: [
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/book" },
  ],

  social: {
    facebook: "#",
    instagram: "#",
  },
} as const;
