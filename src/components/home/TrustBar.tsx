export default function TrustBar() {
  const stats = [
    { icon: "sentiment_very_satisfied", value: "500+", label: "Happy Patients", delay: "0s" },
    { icon: "workspace_premium", value: "10+ Years", label: "Experience", delay: "0.1s" },
    { icon: "biotech", value: "Advanced", label: "US-FDA Tech", delay: "0.2s" },
    { icon: "support_agent", value: "24/7", label: "Emergency Support", delay: "0.3s" },
  ];

  return (
    <section className="bg-surface-container-low border-y border-outline-variant/30 py-8">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(({ icon, value, label, delay }) => (
            <div key={label} className="reveal" style={{ transitionDelay: delay }}>
              <div className="text-primary mb-2 flex justify-center">
                <span className="material-symbols-outlined text-[36px]">{icon}</span>
              </div>
              <h4 className="font-headline-md-mobile text-headline-md-mobile text-on-surface">
                {value}
              </h4>
              <p className="font-caption text-caption text-on-surface-variant uppercase tracking-wider mt-1">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
