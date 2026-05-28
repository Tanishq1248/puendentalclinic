const steps = [
  {
    number: "1",
    icon: "calendar_month",
    title: "Book Online",
    desc: "Schedule your appointment easily through our website or give us a quick call.",
    delay: undefined,
  },
  {
    number: "2",
    icon: "stethoscope",
    title: "Consultation",
    desc: "Meet with our experts for a comprehensive examination and personalized treatment plan.",
    delay: "0.1s",
  },
  {
    number: "3",
    icon: "medical_services",
    title: "Treatment",
    desc: "Receive premium, anxiety-free care using state-of-the-art technology.",
    delay: "0.2s",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-xl md:py-[100px] bg-surface-container-lowest" id="how-it-works">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16 reveal">
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-4">
            Your Journey to a <span className="text-primary italic">Perfect Smile</span>
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            A simple, transparent process designed around your comfort and care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-primary/20 z-0" />

          {steps.map(({ number, icon, title, desc, delay }) => (
            <div
              key={number}
              className="relative z-10 flex flex-col items-center text-center reveal"
              style={delay ? { transitionDelay: delay } : undefined}
            >
              <div className="w-24 h-24 rounded-full bg-white border-4 border-surface shadow-[0_10px_30px_rgba(15,110,86,0.08)] flex items-center justify-center mb-6 text-primary relative">
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white font-label-md text-label-md flex items-center justify-center border-2 border-white">
                  {number}
                </span>
                <span className="material-symbols-outlined text-[40px]">{icon}</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-on-surface mb-3">{title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
