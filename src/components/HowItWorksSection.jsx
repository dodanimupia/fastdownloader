import { steps } from '../data/content';
import { SectionTitle } from './SectionTitle';

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionTitle
          eyebrow="Feature"
          title="Un flujo corto que prioriza claridad antes que ruido visual"
          description="Los pasos están planteados como bloques premium: más aire, más contraste y textos breves."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-[30px] border border-line bg-white p-7 shadow-sm">
              <span className="text-sm font-medium text-slate-400">
                0{index + 1}
              </span>
              <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em] text-ink">{step.title}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-500">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
