export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 pb-10 lg:px-8">
      <div className="flex flex-col gap-6 rounded-[30px] border border-white/80 bg-white px-6 py-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <a href="#inicio" className="text-lg font-extrabold tracking-tight text-ink">
            FastDownloader
          </a>
          <p className="mt-3 text-sm text-slate-500">© 2026 FastDownloader. Todos los derechos reservados.</p>
        </div>

        <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-600">
          <a href="#!" className="transition hover:text-ink">
            Términos
          </a>
          <a href="#!" className="transition hover:text-ink">
            Privacidad
          </a>
          <a href="#!" className="transition hover:text-ink">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
}
