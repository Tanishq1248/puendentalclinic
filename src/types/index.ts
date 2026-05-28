/**
 * Shared TypeScript interfaces for the dental clinic project.
 */

export interface Service {
  title: string;
  desc: string;
  icon: string;
  bgColor: string;
  textColor: string;
  size: string;
  detailsLink: string;
  isLarge?: boolean;
  isEmergency?: boolean;
  borderLeft?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initial: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image: string;
  credentials: string[];
}

export interface NavLink {
  name: string;
  href: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
  category: string;
  span: string;
}
