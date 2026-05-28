import { faqs } from "@/data/faq";

export default function FAQ() {
  return (
    <section className="py-xl md:py-[100px] bg-background" id="faq">
      <div className="max-w-[800px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-12 reveal">
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-4">
            Frequently Asked <span className="text-primary italic">Questions</span>
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Everything you need to know about your visit.
          </p>
        </div>

        <div className="space-y-4 reveal">
          {faqs.map(({ question, answer }) => (
            <details
              key={question}
              className="group bg-white rounded-xl shadow-[0_5px_15px_rgba(15,110,86,0.03)] border border-outline-variant/20 overflow-hidden [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex justify-between items-center font-title-lg text-title-lg text-on-surface cursor-pointer p-6 hover:bg-surface-container-lowest transition-colors">
                {question}
                <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform duration-300">
                  keyboard_arrow_down
                </span>
              </summary>
              <div className="px-6 pb-6 text-on-surface-variant font-body-md border-t border-outline-variant/10 pt-4">
                {answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
