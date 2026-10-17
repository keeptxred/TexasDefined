import type { WaterParkGuide } from '@/data/texas-water-parks';

type WaterParkSummary = Pick<WaterParkGuide, 'slug' | 'name' | 'city' | 'setting' | 'kind' | 'admission'>;

/**
 * Reverse discovery on canonical /county/{slug} pages.
 * The server county loader selects records; this component never imports the entire
 * statewide registry, preserving the initial browser bundle and county SSR cost.
 */
export function CountyWaterParks({ countySlug, countyName, parks }: {
  countySlug: string;
  countyName: string;
  parks: readonly WaterParkSummary[];
}) {
  if (!parks.length) return null;
  const displayed = parks.slice(0, 12);
  return <section className="border-b border-border py-10" aria-labelledby="county-water-parks-heading" data-county-water-parks={countySlug}>
    <p className="eyebrow text-primary">Water parks &amp; family aquatics</p>
    <h2 id="county-water-parks-heading" className="mt-2 font-display text-3xl">Water parks in {countyName}</h2>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
      {parks.length} recorded indoor, outdoor or resort water-play {parks.length === 1 ? 'facility' : 'facilities'} in this county.
      Most outdoor venues operate seasonally and resort access may be restricted. Confirm the official schedule,
      admission eligibility and rides directly before visiting.
    </p>
    <ul className="mt-6 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
      {displayed.map((park) => <li key={park.slug} className="border-t border-border py-4">
        <a className="font-semibold text-primary underline underline-offset-4" href={`/explore/water-parks/${park.slug}`}>{park.name}</a>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{park.city} · {park.setting === 'Both' ? 'Indoor & outdoor' : park.setting} · {park.kind}</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{park.admission}</p>
      </li>)}
    </ul>
    <a href="/explore/water-parks" className="mt-5 inline-block text-sm font-semibold text-primary underline">Compare all Texas water parks →</a>
  </section>;
}
