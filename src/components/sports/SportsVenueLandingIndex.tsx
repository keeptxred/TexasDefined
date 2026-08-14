import { SPORTS_VENUE_LANDINGS } from '@/data/sports-venue-landings';

export function SportsVenueLandingIndex({ compact = false }: { compact?: boolean }) {
  const markets = SPORTS_VENUE_LANDINGS.filter((landing) => landing.kind === 'market');
  const themes = SPORTS_VENUE_LANDINGS.filter((landing) => landing.kind === 'theme');

  return <section className={compact ? 'border-t border-border pt-8' : 'border-b border-border py-12'} aria-labelledby="sports-venue-discovery-heading">
    <div className="grid gap-10 lg:grid-cols-[15rem_1fr]">
      <div>
        <p className="eyebrow text-primary">Find the right venue</p>
        <h2 id="sports-venue-discovery-heading" className="mt-2 font-display text-3xl leading-tight">Browse Texas sports by market or sport</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">Use a local sports market when planning a trip, a sport-specific index for a statewide view, or compare all verified venue guides in one table.</p>
        <a href="/sports-venues/compare" className="mt-5 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Compare all Texas sports venues →</a>
      </div>
      <div className="grid gap-8 xl:grid-cols-2">
        <LandingGroup label="Texas sports markets" items={markets} />
        <LandingGroup label="Sports and venue types" items={themes} />
      </div>
    </div>
  </section>;
}

function LandingGroup({ label, items }: { label: string; items: readonly { slug: string; title: string }[] }) {
  return <div>
    <h3 className="font-display text-2xl">{label}</h3>
    <div className="mt-4 grid sm:grid-cols-2">
      {items.map((item) => <a key={item.slug} href={`/sports-venues/${item.slug}`} className="border-t border-border py-3 pr-4 text-sm font-semibold leading-6 hover:text-primary">
        {item.title} →
      </a>)}
    </div>
  </div>;
}
