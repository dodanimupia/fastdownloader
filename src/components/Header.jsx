import { navItems } from '../data/content';

export function Header() {
  return (
    <header className="sticky top-0 z-50 px-4 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-fit items-center gap-8 rounded-full border border-white/90 bg-white/95 px-6 py-3 shadow-panel backdrop-blur-xl">
        <a href="#inicio" className="text-base font-extrabold tracking-tight text-ink">
          FastDownloader
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-500 transition hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#analizador"
          className="inline-flex items-center rounded-2xl bg-mint px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-ink"
        >
          Ver inicio
        </a>
      </div>
    </header>
  );
}
