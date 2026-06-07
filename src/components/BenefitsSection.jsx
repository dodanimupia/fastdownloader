import { benefits } from '../data/content';
import { SectionTitle } from './SectionTitle';

export function BenefitsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <SectionTitle
        eyebrow="Beneficios"
        title="Bloques simples con una presentación más cuidada"
        description="La referencia apunta a una mezcla de lujo ligero y claridad funcional. Estos beneficios siguen esa línea."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {benefits.map((benefit, index) => (
          <article key={benefit.title} className="rounded-[30px] border border-line bg-white p-7 shadow-sm">
            <span className="text-sm font-medium text-slate-400">/0{index + 1}</span>
            <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em] text-ink">{benefit.title}</h3>
            <p className="mt-4 text-sm leading-6 text-slate-500">{benefit.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
