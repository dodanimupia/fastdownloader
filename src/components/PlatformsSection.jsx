import { platforms } from '../data/content';
import { PlatformCard } from './PlatformCard';
import { SectionTitle } from './SectionTitle';

export function PlatformsSection() {
  return (
    <section id="plataformas" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <SectionTitle
        eyebrow="Plataformas"
        title="Explora plataformas compatibles con un estilo más editorial"
        description="Tarjetas más amplias, limpias y visuales para presentar las fuentes compatibles sin romper el enfoque responsable."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {platforms.map((platform) => (
          <PlatformCard key={platform.name} {...platform} />
        ))}
      </div>
    </section>
  );
}
