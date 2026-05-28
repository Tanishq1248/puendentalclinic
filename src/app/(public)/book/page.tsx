"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { createBookingRequest } from "@/lib/firestore/bookings";

function BookingForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    timeSlot: "",
    date: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Set default service from URL search parameters if available
  useEffect(() => {
    const reason = searchParams.get("reason");
    if (reason) {
      setFormData((prev) => ({ ...prev, service: reason }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date || !formData.timeSlot || !formData.service) {
      alert("Please fill in all required fields marked with *");
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await createBookingRequest(formData);
      setIsSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        timeSlot: "",
        date: "",
        service: "",
        message: "",
      });
    } catch (err) {
      console.error("Failed to submit booking request:", err);
      setSubmitError("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-surface-container-lowest rounded-xl custom-shadow p-lg border border-surface-container-lowest text-center py-xl animate-fade-in-up">
        <span
          className="material-symbols-outlined text-[64px] text-primary mb-md"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-sm">Request Submitted!</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg max-w-[480px] mx-auto">
          Thank you for requesting an appointment with Pune Dental Care. Our administrative team will contact you
          shortly to confirm your date and time slot.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="bg-primary text-on-primary rounded-lg px-xl py-[12px] font-label-md text-label-md hover:bg-surface-tint transition-all"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl custom-shadow p-lg border border-surface-container-lowest relative overflow-hidden">
      {/* Decorative subtle gradient blob for clinical warmth */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <h2 className="font-headline-md text-headline-md text-on-surface mb-md relative z-10">Request an Appointment</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-md relative z-10">
        {/* Name & Phone Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="name">
              Full Name *
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full bg-surface border border-outline-variant text-on-surface rounded-lg px-sm py-[10px] font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="phone">
              Phone Number *
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 00000 00000"
              className="w-full bg-surface border border-outline-variant text-on-surface rounded-lg px-sm py-[10px] font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Date & Time Slot Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="date">
              Preferred Date *
            </label>
            <input
              id="date"
              type="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-surface border border-outline-variant text-on-surface rounded-lg px-sm py-[10px] font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="timeSlot">
              Preferred Time Slot *
            </label>
            <div className="relative">
              <select
                id="timeSlot"
                required
                value={formData.timeSlot}
                onChange={handleChange}
                className="w-full bg-surface border border-outline-variant text-on-surface rounded-lg pl-sm pr-lg py-[10px] font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors appearance-none"
              >
                <option value="" disabled>
                  Select a time slot...
                </option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="05:00 PM">05:00 PM</option>
                <option value="06:00 PM">06:00 PM</option>
                <option value="07:00 PM">07:00 PM</option>
              </select>
              <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* Service Dropdown */}
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="service">
            Reason for Visit *
          </label>
          <div className="relative">
            <select
              id="service"
              required
              value={formData.service}
              onChange={handleChange}
              className="w-full bg-surface border border-outline-variant text-on-surface rounded-lg pl-sm pr-lg py-[10px] font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors appearance-none"
            >
              <option value="" disabled>
                Select a service...
              </option>
              <option value="consultation">General Consultation</option>
              <option value="cleaning">Teeth Cleaning</option>
              <option value="whitening">Teeth Whitening</option>
              <option value="orthodontics">Orthodontics / Braces</option>
              <option value="implants">Dental Implants</option>
              <option value="emergency">Emergency Care</option>
            </select>
            <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        {/* Message Area */}
        <div className="flex flex-col gap-xs">
          <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="message">
            Additional Message
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Please describe any specific concerns..."
            rows={4}
            className="w-full bg-surface border border-outline-variant text-on-surface rounded-lg px-sm py-sm font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* Submit Action */}
        <div className="mt-sm">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto bg-primary text-on-primary rounded-lg px-xl py-[12px] font-label-md text-label-md hover:bg-surface-tint transition-all shadow-sm hover:shadow-md active:scale-95 duration-200 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Request Appointment"}
          </button>
          <p className="font-caption text-caption text-on-surface-variant mt-sm md:inline-block md:ml-md md:mt-0 align-middle">
            <span className="material-symbols-outlined text-[14px] align-middle mr-xs">lock</span>
            Your information is secure and encrypted.
          </p>
          {submitError && (
            <p className="mt-sm font-body-sm text-body-sm text-error flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">error</span>
              {submitError}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default function BookPage() {
  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl md:py-[120px]">
      {/* Header Section */}
      <div className="mb-lg md:mb-xl text-center md:text-left">
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-base">
          Contact &amp; Booking
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          We're here to help you achieve your best smile. Reach out with any questions or schedule your visit today.
        </p>
      </div>

      {/* Split Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg lg:gap-xl items-start">
        {/* Left Side: Contact Information */}
        <div className="lg:col-span-5 flex flex-col gap-md">
          {/* Address Card */}
          <div className="bg-surface-container-lowest rounded-xl custom-shadow p-md border border-surface-container-high transition-all hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(15,110,86,0.08)]">
            <div className="flex items-start gap-sm mb-base">
              <span
                className="material-symbols-outlined text-primary animate-pulse"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                location_on
              </span>
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface mb-xs">Clinic Address</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Koregaon Park, Pune
                  <br />
                  Maharashtra, India 411001
                </p>
              </div>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-surface-container-lowest rounded-xl custom-shadow p-md border border-surface-container-high transition-all hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(15,110,86,0.08)]">
            <div className="flex items-start gap-sm mb-base">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                phone_in_talk
              </span>
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface mb-xs">Phone</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">+91 98765 43210</p>
              </div>
            </div>
          </div>

          {/* Hours Card */}
          <div className="bg-surface-container-lowest rounded-xl custom-shadow p-md border border-surface-container-high transition-all hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(15,110,86,0.08)]">
            <div className="flex items-start gap-sm mb-base">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                schedule
              </span>
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface mb-xs">Operating Hours</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Monday - Saturday: 9:00 AM - 8:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp Prominent CTA */}
          <a
            className="bg-whatsapp-green text-on-primary rounded-xl p-md flex items-center justify-between shadow-md hover:shadow-lg transition-all mt-sm"
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1', 'opsz' 28" }}>
                chat
              </span>
              <div>
                <h3 className="font-title-lg text-title-lg text-on-primary">WhatsApp Support</h3>
                <p className="font-body-md text-body-md text-on-primary opacity-90">Message us for quick replies</p>
              </div>
            </div>
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>

          {/* Google Maps Placeholder */}
          <div className="mt-sm rounded-xl overflow-hidden custom-shadow h-[250px] relative bg-surface-container group">
            <Image
              alt="Map location of clinic"
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxz3jpzUUzqjZgy-S1LsyxeXvSow9GBq8pw9rb18APlSoBQec88LwKoPOIq9BJAaCkaslAaxKhnkOa6v6QXnB6tJQ-JOC1ki-duiVeWB3dmqfoUDUUT5AYlr3ckZUR1nv5NeAzNXfmmdKvfCV3QtLdLgIBBVxz6Dge9RYsIfHhxgx03uCuxlcJa1MEheb1eeXzMTCnqwKjlViFYS0dLpDHC1Ost4eUjz_iao2jQ6DkcoppQfcjnV6x-WTem04PZDNOTez7Ejl8Rhw"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-surface/90 backdrop-blur-sm px-md py-sm rounded-full shadow-sm flex items-center gap-xs">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  location_on
                </span>
                <span className="font-label-md text-label-md text-primary">View on Map</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Booking Form Container */}
        <div className="lg:col-span-7">
          <Suspense fallback={<div>Loading form...</div>}>
            <BookingForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
