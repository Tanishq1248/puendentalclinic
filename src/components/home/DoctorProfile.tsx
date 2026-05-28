import Image from "next/image";
import Link from "next/link";

export default function DoctorProfile() {
  return (
    <section className="py-xl md:py-[120px] bg-background" id="about">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(15,110,86,0.06)] flex flex-col md:flex-row reveal">
          <div className="md:w-2/5 min-h-[400px] relative">
            <Image
              alt="Dr. Rahul Sharma"
              className="object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1UoASc8IZxOY3ij77dgpvlgNxDpzfuoNkKT0ur_iGA7IYAhkfb4Q5RnKcg8hCFBDRYN-R4Aqa2PtoMISSAPSw_woUhz-comK6D2znVZ5KtN0PUwDC6EEqoPZFDADYrOQIIk9TH6GkZ7DCQ7ci89LQzM8oC9VkFhzcZ9fs3fqd7hcP-JHYD00NpK-G5jo4k-0OcasTrBIoqYCE8njpeoHYNiJ5RLqkhTA1lMV7yAOApF2-SutpY5eFLDbLOS6orWiAnDfsE2kI5UU"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
            <span className="text-primary font-label-md text-label-md mb-2 tracking-wider uppercase">
              Meet Your Dentist
            </span>
            <h2 className="font-display-lg-mobile md:font-headline-md text-display-lg-mobile md:text-headline-md text-on-surface mb-2">
              Dr. Rahul Sharma
            </h2>
            <p className="font-title-lg text-title-lg text-primary mb-6">MDS (Prosthodontics), BDS</p>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
              With over 15 years of experience in restorative and cosmetic dentistry, Dr. Sharma is dedicated to
              providing pain-free, premium dental care. His philosophy centers on patient comfort and leveraging the
              latest FDA-approved technology to achieve perfect, natural-looking results.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Fellow of the Indian Society of Oral Implantologists",
                "Certified Invisalign Provider",
                "Specialized in Full-Mouth Rehabilitation",
              ].map((credential) => (
                <li key={credential} className="flex items-center gap-3 text-on-surface-variant font-body-md">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  {credential}
                </li>
              ))}
            </ul>
            <div>
              <Link
                href="/about"
                className="bg-primary-container text-on-primary-container font-label-md text-label-md px-6 py-3 rounded-full hover:bg-primary hover:text-white transition-colors inline-flex items-center gap-2"
              >
                Read Full Profile
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
