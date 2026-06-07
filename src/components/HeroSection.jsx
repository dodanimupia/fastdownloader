import { HeroPreviewCard } from './HeroPreviewCard';

export function HeroSection({
  url,
  onUrlChange,
  onAnalyze,
  analyzerStatus,
  analyzerResult,
  analyzerError,
  selectedQuality,
  onSelectQuality,
  downloadStatus,
  downloadMessage,
}) {
  const statusText = {
    idle: 'Usa esta herramienta solo con videos propios, autorizados o libres de derechos.',
    loading: 'Preparando descarga...',
    success: 'Enlace validado',
    error: analyzerError || 'No se pudo analizar el enlace.',
  };

  return (
    <section id="inicio" className="relative overflow-hidden px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[40px] border border-white/90 bg-haze shadow-panel">
        <div className="relative overflow-hidden rounded-[40px] px-6 pb-16 pt-8 sm:px-8 lg:px-14 lg:pb-24 lg:pt-10">
          <div className="pointer-events-none absolute inset-0 bg-glow" />
          <div className="pointer-events-none absolute inset-y-0 left-[9%] w-px bg-slate-200/60" />
          <div className="pointer-events-none absolute inset-y-0 right-[9%] w-px bg-slate-200/60" />
          <div className="relative mx-auto max-w-5xl text-center">
            <span className="inline-flex items-center gap-3 rounded-full border border-white/90 bg-white px-4 py-2 text-sm font-medium text-slate-500 shadow-sm">
              <span className="rounded-full bg-[#111015] px-3 py-1 text-xs font-semibold text-white">Nuevo</span>
              Descargas visuales para contenido autorizado
            </span>
            <h1 className="mx-auto mt-8 max-w-5xl text-5xl font-extrabold tracking-[-0.08em] text-ink sm:text-7xl lg:text-[5.7rem] lg:leading-[0.94]">
              Descarga tus videos con una experiencia{' '}
              <span className="inline-block rounded-[26px] border border-[#bdece0] bg-[#def8f0] px-5 py-2 text-mint shadow-sm">
                segura
              </span>
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-500">
              Pega el enlace de tu video, confirma que tienes permiso para descargarlo y obtén una
              experiencia visual moderna, clara y rápida.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#analizador"
                className="inline-flex items-center rounded-2xl bg-mint px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-ink"
              >
                Descargar video
              </a>
              <a
                href="#plataformas"
                className="inline-flex items-center rounded-2xl border border-white/90 bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-0.5"
              >
                Ver plataformas
              </a>
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-14 max-w-5xl">
            <div
              id="analizador"
              className="rounded-[34px] border border-white/90 bg-white/95 p-5 shadow-soft sm:p-6"
            >
              <div className="rounded-[30px] border border-line bg-[#fcfcfe] p-5 sm:p-7">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-white">
                    Q
                  </span>
                  <div>
                    <p className="text-xl font-semibold tracking-[-0.04em] text-ink">Pega tu enlace</p>
                    <p className="text-sm text-slate-500">
                      Solo pega el link y descarga contenido publico autorizado.
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex flex-col gap-3 md:flex-row">
                  <input
                    type="url"
                    value={url}
                    onChange={(event) => onUrlChange(event.target.value)}
                    placeholder="https://ejemplo.com/mi-video"
                    className="h-16 flex-1 rounded-full border border-line bg-white px-6 text-base outline-none transition placeholder:text-slate-400 focus:border-accent"
                  />
                  <button
                    type="button"
                    onClick={onAnalyze}
                    className="h-16 rounded-full bg-ink px-8 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-mint disabled:cursor-not-allowed disabled:bg-slate-300"
                    disabled={downloadStatus === 'loading'}
                  >
                    {downloadStatus === 'loading' ? 'Descargando...' : 'Pegar y descargar'}
                  </button>
                </div>

                <div className="mt-6 grid gap-3 text-sm text-slate-500 sm:grid-cols-3">
                  <div className="rounded-full border border-line bg-white px-4 py-3">Plataformas múltiples</div>
                  <div className="rounded-full border border-line bg-white px-4 py-3">Mejor calidad por defecto</div>
                  <div className="rounded-full border border-line bg-white px-4 py-3">Uso autorizado</div>
                </div>

                <p
                  className={`mt-5 text-sm ${
                    analyzerStatus === 'error' ? 'text-red-500' : 'text-slate-500'
                  }`}
                >
                  {statusText[analyzerStatus]}
                </p>

                {analyzerResult ? (
                  <div className="mt-5 rounded-[28px] border border-line bg-white p-5">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex flex-1 gap-5">
                        {analyzerResult.thumbnail ? (
                          <img
                            src={analyzerResult.thumbnail}
                            alt={`Portada de ${analyzerResult.title}`}
                            className="h-28 w-44 rounded-[20px] object-cover shadow-sm"
                          />
                        ) : null}
                        <div>
                        <p className="text-sm font-semibold text-mint">Video encontrado</p>
                          <h3 className="mt-1 text-2xl font-bold tracking-[-0.04em] text-ink">
                            {analyzerResult.title}
                          </h3>
                          <p className="mt-2 text-sm text-slate-500">
                            {analyzerResult.platform}
                            {' · '}
                            {analyzerResult.uploader}
                          </p>
                        </div>
                      </div>
                      <span className="rounded-full border border-line bg-[#fbfbfe] px-4 py-2 text-sm font-medium text-slate-700">
                        {selectedQuality}
                      </span>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      {analyzerResult.qualities.map((quality) => (
                        <button
                          type="button"
                          key={quality}
                          onClick={() => onSelectQuality(quality)}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                            selectedQuality === quality
                              ? 'border-accent bg-accent text-white'
                              : 'border-line bg-[#fbfbfe] text-slate-700 hover:border-accent'
                          }`}
                        >
                          {quality}
                        </button>
                      ))}
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-500">
                      Descarga habilitada solo para contenido autorizado. La opcion MP3 puede requerir ffmpeg en el sistema.
                    </p>
                    {downloadMessage ? (
                      <p
                        className={`mt-3 text-sm ${
                          downloadStatus === 'error' ? 'text-red-500' : 'text-mint'
                        }`}
                      >
                        {downloadMessage}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-10">
              <HeroPreviewCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
