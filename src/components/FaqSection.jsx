import { faqItems } from '../data/content';
import { SectionTitle } from './SectionTitle';

export function FaqSection() {
  return (
    <section id="preguntas" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div>
        <SectionTitle
          eyebrow="Preguntas frecuentes"
          title="Respuestas directas sobre el alcance real de FastDownloader"
          description="La interfaz no evade restricciones ni accede a videos privados. Solo muestra una experiencia visual responsable."
        />

        <div className="mt-12 space-y-4">
          {faqItems.map((item) => (
            <article key={item.question} className="rounded-[30px] border border-line bg-white p-7 shadow-sm">
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-ink">{item.question}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-500">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
