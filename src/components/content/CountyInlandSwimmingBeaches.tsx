import { inlandSwimmingBeaches } from"@/data/inland-beach-authority";

/** Reciprocal county links are based on stated county attribution, not a lake's entire watershed. */
export function CountyInlandSwimmingBeaches({ countySlug, countyName }: { countySlug: string; countyName: string }) {
  const beaches = inlandSwimmingBeaches.filter((beach) => beach.county.split(" /").some(
    (name) => name.trim().toLowerCase().replace(/\s+/g,"-") === countySlug,
  ));
  if (!beaches.length) return null;

  return <section className="border-b border-border py-10" aria-labelledby="county-inland-beaches">
    <p className="eyebrow text-primary">Freshwater swimming destinations</p>
    <h2 id="county-inland-beaches" className="mt-2 font-display text-3xl">Documented swimming beaches in {countyName}</h2>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">These swimming beaches have direct managing-agency evidence. A swimming beach within a lake or state park is distinct from ordinary boat launches and shoreline access. Check current water conditions, park alerts and reservations before visiting.</p>
    <ul className="mt-6 grid gap-4 sm:grid-cols-2">
      {beaches.map((beach) => <li key={beach.slug} className="border-t border-border pt-4">
        <a className="font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary" href={`/explore/inland-beaches/${beach.slug}`}>{beach.name} →</a>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{beach.lake} · {beach.evidence}</p>
      </li>)}
    </ul>
    <a href="/explore/inland-beaches" className="mt-6 inline-block text-sm font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary">All documented Texas inland swimming beaches →</a>
  </section>;
}
