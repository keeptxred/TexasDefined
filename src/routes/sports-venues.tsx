import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { entitiesByKind } from '@/data/knowledge-graph';
import { applyCurrentEntityCorrections } from '@/data/knowledge-graph/current-entity-corrections';
import { canonicalEntityPath, isIndexableEntityPage } from '@/data/knowledge-graph/relationships';
import type { TexasEntityRecord } from '@/data/knowledge-graph/types';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'Browse major Texas stadiums, arenas, racetracks, golf courses, ballparks, high-school football landmarks, rodeo grounds and tournament complexes, including professional, college, motorsports and regional visitor draws.';

export const Route = createFileRoute('/sports-venues')({
  loader: () => entitiesByKind('sports-venue')
    .filter(isIndexableEntityPage)
    .map(applyCurrentEntityCorrections)
    .sort((a, b) => a.name.localeCompare(b.name)),
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      title: 'Texas Stadiums, Arenas, Racetracks, Golf & Sports Venues',
      description,
      canonicalPath: '/sports-venues',
    }),
    links: [canonicalLink(texasDefinedBrand, '/sports-venues')],
  }),
  component: SportsVenuesPage,
});

function SportsVenuesPage() {
  const venues = Route.useLoaderData();
  const groups = groupVenues(venues);
  const motorsports = venues.filter((venue) => venue.tags?.includes('motorsports')).length;
  const college = venues.filter((venue) => venue.tags?.includes('college')).length;
  const professional = venues.filter((venue) => venue.tags?.includes('professional')).length;
  const golf = venues.filter((venue) => venue.tags?.includes('golf')).length;
  const highSchool = venues.filter((venue) => venue.tags?.includes('high-school')).length;

  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
    <main className="mx-auto max-w-6xl">
      <header className="border-b border-border pb-10">
        <p className="eyebrow text-primary">Texas Sports Destinations</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Stadiums, arenas, racetracks and sports destinations worth traveling for</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">Every curated venue guide includes verified trip details such as event-day planning, parking or access guidance, arrival strategy, nearby trip ideas and official planning links.</p>
        <dl className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <Stat label="Venue guides" value={venues.length} />
          <Stat label="Professional" value={professional} />
          <Stat label="College" value={college} />
          <Stat label="Motorsports" value={motorsports} />
          <Stat label="Golf" value={golf} />
          <Stat label="High school" value={highSchool} />
        </dl>
      </header>

      {groups.map((group) => <section key={group.key} className="border-b border-border py-12 last:border-b-0">
        <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
          <div>
            <p className="eyebrow text-primary">{group.eyebrow}</p>
            <h2 className="mt-2 font-display text-3xl leading-tight">{group.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{group.description}</p>
          </div>
          <div className="grid gap-x-7 sm:grid-cols-2 xl:grid-cols-3">
            {group.venues.map((venue) => <a key={venue.id} href={canonicalEntityPath(venue)} className="group border-t border-border py-5">
              <span className="eyebrow text-primary">{venueLabel(venue)}</span>
              <strong className="mt-2 block font-display text-2xl leading-tight group-hover:text-primary">{venue.name}</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">{venueLocation(venue)}</span>
              <span className="mt-3 inline-block border border-primary/30 px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-primary">Verified trip details</span>
              <span className="mt-3 block text-sm font-semibold text-primary">Open venue guide →</span>
            </a>)}
          </div>
        </div>
      </section>)}

      <aside className="mt-12 grid gap-7 border-y border-border py-8 lg:grid-cols-[1fr_auto] lg:items-center" aria-labelledby="sports-partnership-heading">
        <div>
          <p className="eyebrow text-primary">Business partnerships</p>
          <h2 id="sports-partnership-heading" className="mt-2 font-display text-3xl">Serve travelers coming to Texas sports destinations?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Texas Defined is building useful visitor guides around stadiums, race tracks, golf destinations and tournament venues. Hotels, restaurants, attractions, transportation providers and other local visitor businesses can ask about clearly disclosed sponsorship opportunities. Paid relationships do not change editorial rankings or factual recommendations.</p>
        </div>
        <a href="/partner-with-us?type=sports-travel&source=%2Fsports-venues#partnership-form-heading" className="inline-flex min-h-11 items-center justify-center border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground">Explore partnership options →</a>
      </aside>
    </main>
  </Container>;
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="border-t border-border pt-3">
    <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
    <dd className="mt-1 font-display text-3xl">{value}</dd>
  </div>;
}

function groupVenues(venues: TexasEntityRecord[]) {
  const buckets = {
    motorsports: [] as TexasEntityRecord[],
    western: [] as TexasEntityRecord[],
    professional: [] as TexasEntityRecord[],
    college: [] as TexasEntityRecord[],
    golf: [] as TexasEntityRecord[],
    highSchool: [] as TexasEntityRecord[],
    regional: [] as TexasEntityRecord[],
  };

  for (const venue of venues) {
    const tags = new Set(venue.tags ?? []);
    if (tags.has('motorsports') || tags.has('horse-racing')) buckets.motorsports.push(venue);
    else if (tags.has('golf')) buckets.golf.push(venue);
    else if (tags.has('high-school')) buckets.highSchool.push(venue);
    else if (tags.has('rodeo') || tags.has('equestrian') || tags.has('western-sports')) buckets.western.push(venue);
    else if (tags.has('professional')) buckets.professional.push(venue);
    else if (tags.has('college')) buckets.college.push(venue);
    else buckets.regional.push(venue);
  }

  const alphabetize = (items: TexasEntityRecord[]) => items.sort((a, b) => a.name.localeCompare(b.name));

  return [
    { key: 'professional', eyebrow: 'Big league Texas', title: 'Professional stadiums and major arenas', description: 'NFL, MLB, NBA, NHL, MLS, WNBA and major multi-use venues that anchor sports trips and event weekends.', venues: alphabetize(buckets.professional) },
    { key: 'college', eyebrow: 'College traditions', title: 'College stadiums, arenas and ballparks', description: 'Major football, basketball, baseball and aquatic venues where Texas college traditions become destination events.', venues: alphabetize(buckets.college) },
    { key: 'high-school', eyebrow: 'Friday night lights', title: 'Texas high-school football landmarks', description: 'Large and culturally significant district stadiums that draw visiting families, playoff crowds and fans who treat Texas high-school football as part of the trip.', venues: alphabetize(buckets.highSchool) },
    { key: 'motorsports', eyebrow: 'Racing Texas', title: 'Motorsports and racing destinations', description: 'Formula racing, stock cars, drag racing, road courses, track days and live horse-racing venues that draw visitors from well beyond their home cities.', venues: alphabetize(buckets.motorsports) },
    { key: 'golf', eyebrow: 'Championship golf', title: 'Tournament and destination golf venues', description: 'Courses associated with major championships, PGA TOUR and LPGA events, resort golf and spectator weekends worth planning a Texas trip around.', venues: alphabetize(buckets.golf) },
    { key: 'western', eyebrow: 'Western sports', title: 'Rodeo and equestrian venues', description: 'Historic rodeo grounds and large equestrian complexes where Western sports, livestock shows and championship events are part of the Texas visitor experience.', venues: alphabetize(buckets.western) },
    { key: 'regional', eyebrow: 'More sports trips', title: 'Tournament complexes and distinctive sports destinations', description: 'Minor-league ballparks, shooting sports, surf parks, youth tournament centers and other venues that can anchor family trips, competition weekends and specialized sports travel.', venues: alphabetize(buckets.regional) },
  ].filter((group) => group.venues.length > 0);
}

function venueLabel(venue: TexasEntityRecord) {
  const tags = new Set(venue.tags ?? []);
  if (tags.has('motorsports')) return 'Motorsports';
  if (tags.has('horse-racing')) return 'Horse racing';
  if (tags.has('golf')) return 'Golf destination';
  if (tags.has('high-school')) return 'High-school football';
  if (tags.has('rodeo') || tags.has('equestrian') || tags.has('western-sports')) return 'Western sports';
  if (tags.has('professional')) return 'Professional venue';
  if (tags.has('college-baseball')) return 'College baseball';
  if (tags.has('college')) return 'College venue';
  if (tags.has('minor-league')) return 'Minor league';
  if (tags.has('shooting-sports')) return 'Shooting sports';
  if (tags.has('action-sports')) return 'Action sports';
  if (tags.has('tournament-complex')) return 'Tournament complex';
  return 'Sports venue';
}

function venueLocation(venue: TexasEntityRecord) {
  const county = venue.countySlug ? `${title(venue.countySlug)} County` : undefined;
  const region = venue.region ? title(venue.region) : undefined;
  return [county, region].filter(Boolean).join(' · ');
}

function title(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}
