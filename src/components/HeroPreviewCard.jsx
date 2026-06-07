const previewCards = [
  {
    eyebrow: 'LO HACEMOS SIMPLE',
    title: 'Pega el enlace y valida tu video en segundos.',
    description: 'Flujo limpio, rápido y sin fricción para contenido permitido.',
    accent: 'bg-mint',
    rotate: '-rotate-3',
  },
  {
    eyebrow: 'TE ESCUCHAMOS',
    title: 'La interfaz muestra estados visuales y resultados claros.',
    description: 'Analizando, video encontrado y opciones de descarga en un mismo bloque.',
    accent: 'bg-accent',
    rotate: 'rotate-1',
  },
  {
    eyebrow: 'TE DAMOS CONTROL',
    title: 'Calidades reales para una experiencia profesional.',
    description: '720p, 1080p y Audio MP3 con limites claros para contenido publico y autorizado.',
    accent: 'bg-white',
    rotate: '-rotate-2',
  },
];

export function HeroPreviewCard() {
  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-3">
      {previewCards.map((card) => (
        <article
          key={card.title}
          className={`rounded-[34px] border border-white/90 bg-white p-5 shadow-soft ${card.rotate}`}
        >
          <div className="rounded-[28px] border border-line bg-[#fcfcfe] p-6">
            <div className="flex items-center justify-between">
              <span className={`h-14 w-14 rounded-[18px] ${card.accent} shadow-sm`} />
              <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-slate-400">
                panel
              </span>
            </div>

            <div className="mt-14">
              <p className="text-xs font-semibold tracking-[0.18em] text-slate-400">{card.eyebrow}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-ink">{card.title}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-500">{card.description}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
