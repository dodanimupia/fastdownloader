export function PlatformCard({ badge, name, description, tone = 'light' }) {
  const dark = tone === 'dark';

  return (
    <article
      className={`group flex min-h-[280px] flex-col rounded-[32px] border p-7 transition duration-300 hover:-translate-y-1 hover:shadow-soft ${
        dark ? 'border-[#19181f] bg-[#141318] text-white' : 'border-line bg-white text-ink'
      }`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold ${
          dark ? 'bg-white text-ink' : 'bg-[#f5f5fb] text-ink'
        }`}
      >
        {badge}
      </div>
      <h3 className={`mt-8 text-[2rem] font-semibold tracking-[-0.05em] ${dark ? 'text-white' : 'text-ink'}`}>
        {name}
      </h3>
      <p className={`mt-auto pt-16 text-sm leading-6 ${dark ? 'text-slate-300' : 'text-slate-500'}`}>
        {description}
      </p>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex -space-x-2">
          {['bg-accent', 'bg-mist', 'bg-mint', 'bg-white'].map((color) => (
            <span
              key={color}
              className={`h-9 w-9 rounded-full border-2 ${dark ? 'border-[#141318]' : 'border-white'} ${color}`}
            />
          ))}
        </div>
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-full border text-lg ${
            dark ? 'border-white/10 text-white/70' : 'border-line text-slate-500'
          }`}
        >
          ↗
        </span>
      </div>
    </article>
  );
}
