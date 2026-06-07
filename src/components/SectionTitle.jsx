export function SectionTitle({ eyebrow, title, description, center = false }) {
  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <span className="inline-flex rounded-full border border-line bg-white px-4 py-1.5 text-xs font-medium text-slate-500 shadow-sm">
        {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-ink sm:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-500 sm:text-lg">{description}</p>
    </div>
  );
}
