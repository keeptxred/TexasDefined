import { countySeasonalLinks } from '@/data/county-seasonal-links';

export function CountySeasonalPlanning({ countySlug, countyName }: { countySlug: string; countyName: string }) {
  const links = countySeasonalLinks(countySlug);
  if (!links.length) return null;

  return <section className="border-b border-border py-12" aria-labelledby={`county-seasonal-${countySlug}`}>
    <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
      <div>
        <p className="eyebrow text-primary">Seasonal planning</p>
        <h2 id={`county-seasonal-${countySlug}`} className="mt-2 font-display text-4xl">When to plan {countyName}</h2>
      </div>
      <div>
        <p className="max-w-3xl text-base leading-7 text-muted-foreground">Use current seasonal reports and statewide planning guides before building a trip around wildflowers, fall color or holiday events. Conditions and event dates can change from year to year.</p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {links.map((link) => <a key={link.href} href={link.href} className="group border-t border-border pt-5">
            <strong className="block font-display text-2xl leading-tight group-hover:text-primary">{link.label}</strong>
            {link.description ? <span className="mt-3 block text-sm leading-6 text-muted-foreground">{link.description}</span> : null}
          </a>)}
        </div>
      </div>
    </div>
  </section>;
}
