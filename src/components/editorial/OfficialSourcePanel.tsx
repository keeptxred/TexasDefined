export type OfficialSource = {
  label: string;
  href: string;
  description?: string;
};

export function OfficialSourcePanel({
  eyebrow = 'Official sources',
  title = 'Verify the details at the source',
  description,
  sources,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  sources: readonly OfficialSource[];
}) {
  if (!sources.length) return null;

  return (
    <aside className="mt-12 border-y border-border py-7" aria-label={title}>
      <p className="eyebrow text-primary">{eyebrow}</p>
      <h2 className="mt-2 font-display text-2xl">{title}</h2>
      {description ? <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{description}</p> : null}
      <ul className="mt-5 divide-y divide-border">
        {sources.map((source) => (
          <li key={source.href} className="py-4 first:pt-0 last:pb-0">
            <a href={source.href} target="_blank" rel="noreferrer noopener" className="group block">
              <span className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 group-hover:decoration-primary">{source.label} ↗</span>
              {source.description ? <span className="mt-1 block text-sm leading-6 text-muted-foreground">{source.description}</span> : null}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
