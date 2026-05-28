import Image from "next/image";
import Link from "next/link";
import { specializedServices } from "@/data/services";

export default function ServicesPage() {
  return (
    <main className="flex-grow flex flex-col items-center w-full">
      {/* Hero Banner */}
      <section className="w-full relative py-xl md:py-[120px] px-margin-mobile md:px-margin-desktop bg-surface-container-low overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-fixed-dim/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-fixed/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto relative z-10 bento-grid">
          <div className="col-span-12 md:col-span-8 flex flex-col justify-center">
            <span className="font-label-md text-label-md text-primary tracking-widest uppercase mb-4 block">
              Our Expertise
            </span>
            <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-6">
              Complete Dental Care
              <br />
              <span className="text-on-surface-variant">Under One Roof.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-8">
              Experience world-class dentistry designed around your comfort. From routine checkups to complex
              restorations, we blend advanced technology with a gentle, patient-first approach in a serene environment.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book"
                className="px-8 py-4 bg-primary text-on-primary rounded-full font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-md text-center"
              >
                Schedule a Consultation
              </Link>
              <Link
                href="/book"
                className="px-8 py-4 bg-surface text-primary border-2 border-primary/20 rounded-full font-label-md text-label-md hover:border-primary transition-colors text-center"
              >
                View Pricing Options
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hidden md:flex col-span-4 relative rounded-2xl overflow-hidden clinical-shadow h-[400px]">
            <Image
              alt="Modern dental clinic interior"
              className="object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsQ2iQavnK9kMPmlm7cJy7LfBsDU4rd8XyJE_7YHlixglw-fXOnYRisxnnZm2Go5L_0Ry9AAOCcwOzgLCs_KG_g_yQG7fopHCLnpVAiK6AxpbRhqY7yXV7iiTxDlzycJHZXluoWiRivr8Nya39caaUo99_W_2_CiizX3dgoSd8D2aLTlIGcm0DHlq5KWm4Z8lkRz34WVKDGWHEK_MGAekyTCxuyzdoEFjLl5NYLpcHXSmj2FHkmPpz2dk23uRiWXh5bUegfeK0iwo"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute bottom-0 left-0 right-0 glass-panel p-4 m-4 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface m-0 leading-tight">State-of-the-art</p>
                  <p className="font-caption text-caption text-on-surface-variant m-0">Advanced Diagnostic Tech</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="w-full max-w-7xl mx-auto py-xl px-margin-mobile md:px-margin-desktop">
        <div className="mb-lg text-center md:text-left">
          <h2 className="font-headline-md-mobile text-headline-md-mobile md:font-headline-md md:text-headline-md text-primary mb-4">
            Specialized Treatments
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
            Tailored dental solutions utilizing the latest advancements in clinical dentistry, delivered with compassion
            and precision.
          </p>
        </div>

        <div className="bento-grid">
          {specializedServices.map((service, idx) => {
            if (service.isLarge) {
              return (
                <div
                  key={idx}
                  className={`${service.size} bg-surface rounded-2xl p-8 clinical-shadow hover:shadow-[0_15px_40px_rgba(15,110,86,0.08)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group cursor-pointer flex flex-col justify-between min-h-[300px]`}
                >
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                  <div className="relative z-10 flex items-start gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-xl ${service.bgColor} flex items-center justify-center ${service.textColor}`}>
                      <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {service.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-title-lg text-title-lg text-on-surface mb-2">{service.title}</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">{service.desc}</p>
                    </div>
                  </div>
                  <div className="relative z-10 mt-auto flex items-center justify-between border-t border-outline-variant/30 pt-4">
                    <Link href={service.detailsLink} className="font-label-md text-label-md text-primary">
                      Learn More
                    </Link>
                    <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={idx}
                className={`${service.size} bg-surface rounded-2xl p-6 clinical-shadow hover:shadow-[0_15px_40px_rgba(15,110,86,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col group cursor-pointer ${service.borderLeft ?? ""}`}
              >
                <div className={`w-12 h-12 rounded-lg ${service.bgColor} flex items-center justify-center ${service.textColor} mb-4`}>
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {service.icon}
                  </span>
                </div>
                <h3 className="font-title-lg text-title-lg text-on-surface mb-2">{service.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">{service.desc}</p>
                <Link
                  href={service.detailsLink}
                  className={`flex items-center font-label-md text-label-md mt-auto ${
                    service.isEmergency ? "text-error" : "text-primary"
                  }`}
                >
                  {service.isEmergency ? "Get Help Now" : "Learn More"}{" "}
                  <span className="material-symbols-outlined text-sm ml-1 group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>
            );
          })}

          {/* Cosmetic Dentistry */}
          <div className="col-span-12 md:col-span-8 bg-surface rounded-2xl p-6 clinical-shadow hover:shadow-[0_15px_40px_rgba(15,110,86,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-6 group cursor-pointer">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">face_retouching_natural</span>
            </div>
            <div className="flex-grow">
              <h3 className="font-title-lg text-title-lg text-on-surface mb-2">Cosmetic Dentistry</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-2">
                Comprehensive aesthetic transformations including veneers, bonding, and full smile makeovers tailored to
                your facial structure.
              </p>
            </div>
            <Link
              href="/book?reason=whitening"
              className="flex-shrink-0 flex items-center text-primary font-label-md text-label-md mt-4 md:mt-0 px-4 py-2 rounded-full border border-primary/20 group-hover:bg-primary/5 transition-colors"
            >
              Explore Options <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
            </Link>
          </div>

          {/* Preventive Care */}
          <div className="col-span-12 sm:col-span-6 md:col-span-6 bg-surface rounded-2xl p-6 clinical-shadow hover:shadow-[0_15px_40px_rgba(15,110,86,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col group cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-outline-variant/30 flex items-center justify-center text-on-surface-variant mb-4">
              <span className="material-symbols-outlined text-2xl">clean_hands</span>
            </div>
            <h3 className="font-title-lg text-title-lg text-on-surface mb-2">Preventive Care</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">
              Routine cleanings, comprehensive exams, and oral cancer screenings to maintain long-term dental health.
            </p>
            <Link href="/book?reason=cleaning" className="flex items-center text-primary font-label-md text-label-md mt-auto">
              Learn More{" "}
              <span className="material-symbols-outlined text-sm ml-1 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Oral Surgery */}
          <div className="col-span-12 sm:col-span-6 md:col-span-6 bg-surface rounded-2xl p-6 clinical-shadow hover:shadow-[0_15px_40px_rgba(15,110,86,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col group cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-primary-fixed-dim/30 flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                surgical
              </span>
            </div>
            <h3 className="font-title-lg text-title-lg text-on-surface mb-2">Oral Surgery</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">
              Expert extractions, including wisdom teeth removal, performed with advanced sedation for minimal discomfort.
            </p>
            <Link href="/book?reason=consultation" className="flex items-center text-primary font-label-md text-label-md mt-auto">
              Learn More{" "}
              <span className="material-symbols-outlined text-sm ml-1 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
