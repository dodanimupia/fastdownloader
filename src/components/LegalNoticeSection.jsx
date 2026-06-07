import { SectionTitle } from './SectionTitle';

export function LegalNoticeSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="rounded-[36px] border border-white/80 bg-gradient-to-br from-[#f7f8ff] to-white p-8 shadow-panel sm:p-12">
        <SectionTitle
          eyebrow="Aviso legal"
          title="Uso permitido, claro y sin atajos"
          description="FastDownloader está diseñado únicamente para contenido propio, autorizado o libre de derechos. No debe utilizarse para infringir derechos de autor, restricciones de plataformas o términos de servicio."
        />
      </div>
    </section>
  );
}
