import Image from "next/image";
import Link from "next/link";

const services = [
  {
    type: "large",
    image: "/3dscan.jpg",
    badge: "Specialty",
    title: "Dental Implants",
    href: "/services",
  },
  {
    type: "small",
    icon: "auto_awesome",
    title: "Teeth Whitening",
    desc: "Professional, safe laser whitening for a brilliantly brighter smile in just one session.",
    href: "/services",
    delay: undefined,
  },
  {
    type: "small",
    icon: "view_carousel",
    title: "Invisalign & Braces",
    desc: "Discreet clear aligners and modern orthodontics for perfectly straight teeth.",
    href: "/services",
    delay: "0.1s",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-xl md:py-[120px] bg-background" id="services">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16 reveal">
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-4">
            Comprehensive <span className="text-primary">Care</span>
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            From routine checkups to complex full-mouth rehabilitations, we offer a complete spectrum of premium
            dental services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {/* Large Card */}
          <div className="md:col-span-2 md:row-span-2 bg-white rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(15,110,86,0.05)] hover:shadow-[0_15px_40px_rgba(15,110,86,0.1)] transition-all group relative reveal">
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent z-10" />
            <Image
              alt="Dental Implants"
              className="w-full h-full object-fit group-hover:scale-105 transition-transform duration-700"
              src="/dentalimplant.webp"
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <div className="absolute bottom-0 left-0 p-8 z-20">
              <span className="bg-primary/90 text-white font-caption text-caption px-3 py-1 rounded-full mb-3 inline-block">
                Specialty
              </span>
              <h3 className="font-headline-md text-headline-md text-white mb-2">Dental Implants</h3>
              <Link
                href="/services"
                className="text-primary-fixed inline-flex items-center gap-1 font-label-md text-label-md hover:underline"
              >
                Learn more{" "}
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Small Card 1 */}
          <div className="bg-white rounded-xl p-6 shadow-[0_10px_30px_rgba(15,110,86,0.05)] hover:-translate-y-1 transition-all reveal relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[80px] text-primary">auto_awesome</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center mb-6 text-primary">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <h3 className="font-title-lg text-title-lg text-on-surface mb-2">Teeth Whitening</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">
              Professional, safe laser whitening for a brilliantly brighter smile in just one session.
            </p>
            <Link
              href="/services"
              className="text-primary inline-flex items-center gap-1 font-label-md text-label-md mt-auto absolute bottom-6"
            >
              Explore{" "}
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          {/* Small Card 2 */}
          <div
            className="bg-white rounded-xl p-6 shadow-[0_10px_30px_rgba(15,110,86,0.05)] hover:-translate-y-1 transition-all reveal relative overflow-hidden group"
            style={{ transitionDelay: "0.1s" }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[80px] text-primary">view_carousel</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center mb-6 text-primary">
              <span className="material-symbols-outlined">view_carousel</span>
            </div>
            <h3 className="font-title-lg text-title-lg text-on-surface mb-2">Invisalign &amp; Braces</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">
              Discreet clear aligners and modern orthodontics for perfectly straight teeth.
            </p>
            <Link
              href="/services"
              className="text-primary inline-flex items-center gap-1 font-label-md text-label-md mt-auto absolute bottom-6"
            >
              Explore{" "}
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          {/* View All CTA Card */}
          <div
            className="bg-primary-container rounded-xl p-6 shadow-[0_10px_30px_rgba(15,110,86,0.05)] hover:-translate-y-1 transition-all reveal flex flex-col justify-center items-center text-center text-on-primary-container"
            style={{ transitionDelay: "0.2s" }}
          >
            <h3 className="font-title-lg text-title-lg mb-2">View All Services</h3>
            <p className="font-body-md text-body-md mb-6 opacity-80">Discover our full range of treatments.</p>
            <Link
              href="/services"
              className="bg-white text-primary font-label-md text-label-md px-6 py-2 rounded-full hover:bg-surface transition-colors"
            >
              See Catalogue
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
