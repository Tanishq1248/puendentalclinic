import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-surface-container-highest mt-auto border-t flex-wrap border-outline-variant">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-xl w-full max-w-7xl mx-auto">
        <div className="col-span-1 md:col-span-2">
          <div className="font-headline-md text-headline-md text-primary mb-4 flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[28px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              dentistry
            </span>
            {SITE_CONFIG.name}
          </div>
         
          <div className="font-body-md text-body-md text-on-surface">
            © 2024 {SITE_CONFIG.name}. All rights reserved.
          </div>
        </div>

        <div className="col-span-1">
          <h4 className="font-title-lg text-title-lg text-on-surface mb-4">
            Contact
          </h4>
          <ul className="space-y-3 font-body-md text-body-md">
            <li>
              <a
                className="text-on-surface-variant hover:text-primary transition-colors rounded flex items-start gap-2"
                href={SITE_CONFIG.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[20px] mt-1">
                  location_on
                </span>
                Address: {SITE_CONFIG.contact.address}
              </a>
            </li>
            <li>
              <a
                className="text-on-surface-variant hover:text-primary transition-colors rounded flex items-center gap-2"
                href={SITE_CONFIG.contact.phoneHref}
              >
                <span className="material-symbols-outlined text-[20px]">
                  call
                </span>
                Phone: {SITE_CONFIG.contact.phone}
              </a>
            </li>
            <li>
              <a
                className="text-on-surface-variant hover:text-primary transition-colors rounded flex items-center gap-2"
                href={SITE_CONFIG.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  chat
                </span>
                WhatsApp Support
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="font-title-lg text-title-lg text-on-surface mb-4">
            Quick Links
          </h4>
          <ul className="space-y-3 font-body-md text-body-md">
            <li>
              <Link
                href="/services"
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                Our Services
              </Link>
            </li>
            <li>
              <Link
                href="/book"
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                Book Appointment
              </Link>
            </li>
            <li>
              <Link
                href="/admin/appointments"
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                Admin Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
