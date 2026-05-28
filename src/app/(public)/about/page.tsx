import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us – Serene Dental Care | Pune",
  description:
    "Meet the team behind Pune's most trusted dental clinic. Learn about our story, philosophy, and the specialists who are passionate about your smile.",
};

const team = [
  {
    name: "Dr. Rahul Sharma",
    title: "Lead Prosthodontist · MDS, BDS",
    bio: "With 15+ years mastering restorative and cosmetic dentistry, Dr. Sharma's philosophy centres on pain-free, precision care powered by FDA-approved technology.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1UoASc8IZxOY3ij77dgpvlgNxDpzfuoNkKT0ur_iGA7IYAhkfb4Q5RnKcg8hCFBDRYN-R4Aqa2PtoMISSAPSw_woUhz-comK6D2znVZ5KtN0PUwDC6EEqoPZFDADYrOQIIk9TH6GkZ7DCQ7ci89LQzM8oC9VkFhzcZ9fs3fqd7hcP-JHYD00NpK-G5jo4k-0OcasTrBIoqYCE8njpeoHYNiJ5RLqkhTA1lMV7yAOApF2-SutpY5eFLDbLOS6orWiAnDfsE2kI5UU",
    credentials: [
      "Fellow – Indian Society of Oral Implantologists",
      "Certified Invisalign Provider",
      "Specialised in Full-Mouth Rehabilitation",
    ],
  },
  {
    name: "Dr. Priya Nair",
    title: "Senior Orthodontist · MDS",
    bio: "Dr. Nair brings 10 years of orthodontic expertise, helping patients of all ages achieve perfectly aligned smiles with the latest clear-aligner techniques.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA3Zd-zD9HSNNrQE02a4OozHeVbbd8e0LnZorZmyS2t9H54iz2KGTbOPEixNPnkc8yAZeCwXKieVUiT1C6-gsk40tyFrmcyxLU_vyHd0eNbbflm0K6VX5TbdK0JDYdwS08p96BoUhJmouqxd7nfJ_PBqFIbDOHTrQH0SC54pRGCDrK6EGoSbSX_T53A28JzAxzAW6hrj5YZRnb3q4AyhxRBM7y2hFm2FXln8yPV5gOYSeL7gouhl9jW0R3Xk1OCXH7BLttcd0Lpo6M",
    credentials: [
      "Board-Certified Orthodontist",
      "Invisalign Diamond Provider",
      "Paediatric Orthodontic Specialist",
    ],
  },
];

const values = [
  {
    icon: "favorite",
    title: "Patient-First Always",
    desc: "Every decision we make starts with one question: what is best for the patient?",
  },
  {
    icon: "biotech",
    title: "Science-Driven Care",
    desc: "We invest in cutting-edge diagnostic and treatment technology so you get the best outcome.",
  },
  {
    icon: "handshake",
    title: "Transparent & Honest",
    desc: "No hidden fees, no unnecessary treatments — just clear communication at every step.",
  },
  {
    icon: "spa",
    title: "Comfort-Centred",
    desc: "From soothing interiors to painless protocols, every visit is designed around your comfort.",
  },
];

export default function AboutPage() {
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
            Our Story
          </span>
          <h1
            className="text-on-surface leading-[1.06] tracking-[-0.03em] mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(2.8rem, 7vw, 5rem)",
            }}
          >
            Crafted with Care,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container italic">
              Built on Trust
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
            For over a decade, Serene Dental Care has been Pune&apos;s most
            trusted destination for advanced, anxiety-free dentistry. We believe
            a healthy smile can transform a life.
          </p>
        </div>
      </section>

      {/* ── Our Values ── */}
      <section className="py-[80px] md:py-[120px] bg-background">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-14">
            <span
              className="inline-block text-primary uppercase tracking-[0.18em] text-sm mb-3 font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              What We Stand For
            </span>
            <h2
              className="text-on-surface leading-tight tracking-[-0.02em]"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4.5vw, 3rem)",
              }}
            >
              Our Core&nbsp;
              <span className="text-primary italic">Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-8 shadow-[0_8px_24px_rgba(15,110,86,0.05)] hover:-translate-y-1 transition-transform duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 text-primary">
                  <span className="material-symbols-outlined text-[24px]">{icon}</span>
                </div>
                <h3
                  className="text-on-surface mb-2 font-semibold"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1.05rem",
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </h3>
                <p
                  className="text-on-surface-variant text-sm leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet the Team ── */}
      <section className="py-[80px] md:py-[120px] bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-14">
            <span
              className="inline-block text-primary uppercase tracking-[0.18em] text-sm mb-3 font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              The Specialists
            </span>
            <h2
              className="text-on-surface leading-tight tracking-[-0.02em]"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4.5vw, 3rem)",
              }}
            >
              Meet Your&nbsp;
              <span className="text-primary italic">Dentists</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_12px_36px_rgba(15,110,86,0.07)] flex flex-col sm:flex-row"
              >
                <div className="relative w-full sm:w-[200px] flex-shrink-0 h-60 sm:h-auto">
                  <Image
                    alt={member.name}
                    src={member.image}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 200px"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3
                    className="text-on-surface mb-1"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontWeight: 700,
                      fontSize: "1.5rem",
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="text-primary text-sm mb-4 font-medium"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {member.title}
                  </p>
                  <p
                    className="text-on-surface-variant text-sm leading-relaxed mb-5"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {member.bio}
                  </p>
                  <ul className="space-y-1.5">
                    {member.credentials.map((c) => (
                      <li
                        key={c}
                        className="flex items-start gap-2 text-xs text-on-surface-variant"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        <span className="material-symbols-outlined text-primary text-[16px] mt-0.5">
                          check_circle
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section className="py-16 bg-primary text-on-primary">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Happy Patients" },
              { value: "15+", label: "Years of Excellence" },
              { value: "99.8%", label: "Success Rate" },
              { value: "24/7", label: "Emergency Support" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div
                  className="text-on-primary mb-1"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                  }}
                >
                  {value}
                </div>
                <p
                  className="text-on-primary/80 text-xs uppercase tracking-widest"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-[80px] bg-background text-center">
        <div className="max-w-[700px] mx-auto px-margin-mobile">
          <h2
            className="text-on-surface mb-4 leading-tight tracking-[-0.02em]"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            }}
          >
            Ready to experience the difference?
          </h2>
          <p
            className="text-on-surface-variant mb-8"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
            }}
          >
            Book a free consultation and start your journey to a confident smile.
          </p>
          <Link
            href="/book"
            className="bg-primary text-on-primary font-label-md text-label-md px-8 py-4 rounded-full hover:shadow-[0_10px_30px_rgba(15,110,86,0.3)] transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
          >
            Book Consultation
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </section>
    </>
  );
}
