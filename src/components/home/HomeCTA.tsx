import Link from "next/link";

export default function HomeCTA() {
  return (
    <section className="py-xl bg-surface-container-lowest border-t border-outline-variant/20 text-center">
      <div className="max-w-[800px] mx-auto px-margin-mobile">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
          Ready for a brighter smile?
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-8">
          Schedule your free consultation today and take the first step towards perfect dental health.
        </p>
        <Link
          href="/book"
          className="bg-primary text-on-primary font-label-md text-label-md px-8 py-4 rounded-full hover:shadow-lg transition-all transform hover:-translate-y-1 inline-block"
        >
          Book Your Appointment Now
        </Link>
      </div>
    </section>
  );
}
