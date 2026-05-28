import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery – Serene Dental Care | Pune",
  description:
    "Explore our state-of-the-art clinic spaces, patient smiles, and before & after treatment results at Serene Dental Care, Pune.",
};

const categories = ["All", "Clinic", "Smiles", "Technology", "Team"];

const galleryItems = [
  {
    src: "/dentalimplant.webp",
    alt: "Dental Implant Surgery",
    category: "Technology",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/teethwhitening.jpg",
    alt: "Teeth Whitening Procedure",
    category: "Smiles",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/reception.webp",
    alt: "Modern Clinic Reception",
    category: "Clinic",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1UoASc8IZxOY3ij77dgpvlgNxDpzfuoNkKT0ur_iGA7IYAhkfb4Q5RnKcg8hCFBDRYN-R4Aqa2PtoMISSAPSw_woUhz-comK6D2znVZ5KtN0PUwDC6EEqoPZFDADYrOQIIk9TH6GkZ7DCQ7ci89LQzM8oC9VkFhzcZ9fs3fqd7hcP-JHYD00NpK-G5jo4k-0OcasTrBIoqYCE8njpeoHYNiJ5RLqkhTA1lMV7yAOApF2-SutpY5eFLDbLOS6orWiAnDfsE2kI5UU",
    alt: "Dr. Rahul Sharma with Patient",
    category: "Team",
    span: "col-span-1 row-span-2",
  },
  {
    src: "/3dscan.jpg",
    alt: "3D Scanning Technology",
    category: "Technology",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/smiletranf.png",
    alt: "Patient Smile Transformation",
    category: "Smiles",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSnpOSdn2cbmCTkv8EysTEG3EXlQgv6_Zuqr4Zg3yNOsul0r0JTYJnQDTkOwF5bzJh-m6b93tYCI6DaPY7_80I3getGqS_Kd3E-OBQ4WBm3bq1Myi7vO7vYzuTd_HB5Xo9AINSqDcqgqhtZFVoiiAFDs1R42BQaofg-ivLRG2oK50Wz2SoZ6vOL0wr8NXZie1P2p3k13gQ5jnKRjTT2dnjNixsC2ckO2LHRcBU28K4Eiu0qpu_my2KdYfO7V7I_49sTRYbgPliSfc",
    alt: "Treatment Room",
    category: "Clinic",
    span: "col-span-2 row-span-1",
  },
];

export default function GalleryPage() {
  return (
    <>
      {/* ── Page Hero ── */}
      <section className="relative py-[100px] md:py-[140px] bg-surface-container-lowest overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl translate-y-1/3 translate-x-1/4" />
        </div>
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center">
          <span
            className="inline-block text-primary uppercase tracking-[0.18em] text-sm mb-4 font-medium"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Our Gallery
          </span>
          <h1
            className="text-on-surface leading-[1.06] tracking-[-0.03em] mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(2.8rem, 7vw, 5rem)",
            }}
          >
            A Glimpse Into
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container italic">
              Our World
            </span>
          </h1>
          <p
            className="text-on-surface-variant max-w-2xl mx-auto leading-relaxed"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
            }}
          >
            From our serene treatment rooms to brilliant smile transformations —
            see the Serene Dental Care difference.
          </p>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <section className="bg-background py-8 sticky top-[72px] z-30 border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  cat === "All"
                    ? "bg-primary text-on-primary shadow-[0_4px_14px_rgba(15,110,86,0.25)]"
                    : "bg-surface-container text-on-surface-variant hover:bg-primary/10 hover:text-primary"
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Masonry Grid ── */}
      <section className="py-[60px] md:py-[100px] bg-background">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[220px] gap-4">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-2xl group ${item.span}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span
                    className="text-white/70 text-xs uppercase tracking-widest mb-1"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.category}
                  </span>
                  <p
                    className="text-white font-semibold text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.alt}
                  </p>
                </div>
                {/* Category pill */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-primary text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {item.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Before & After Banner ── */}
      <section className="py-[80px] bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <span
            className="inline-block text-primary uppercase tracking-[0.18em] text-sm mb-3 font-medium"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Transformations
          </span>
          <h2
            className="text-on-surface mb-4 tracking-[-0.02em]"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
            }}
          >
            Real Results,{" "}
            <span className="text-primary italic">Real Smiles</span>
          </h2>
          <p
            className="text-on-surface-variant mb-10 max-w-xl mx-auto"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
            }}
          >
            Every smile tells a story. Explore our before &amp; after case studies
            and see the life-changing impact of our treatments.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Dental Implants", icon: "diamond" },
              { label: "Teeth Whitening", icon: "auto_awesome" },
              { label: "Invisalign", icon: "view_carousel" },
            ].map(({ label, icon }) => (
              <div
                key={label}
                className="bg-white rounded-2xl p-8 shadow-[0_8px_24px_rgba(15,110,86,0.05)] hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center gap-4"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[28px]">{icon}</span>
                </div>
                <h3
                  className="text-on-surface font-semibold"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1.05rem",
                  }}
                >
                  {label}
                </h3>
                <p
                  className="text-on-surface-variant text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  View before &amp; after cases
                </p>
                <button
                  className="mt-auto px-5 py-2 rounded-full border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-on-primary transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Explore
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
