import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { breweryCountySlug } from '@/data/breweries/roster';

export const Route = createLazyFileRoute('/explore/breweries/$slug')({component: BreweryLicenseProfile});

function BreweryLicenseProfile() {
  const brewery = Route.useLoaderData();
  const address = [brewery.address, brewery.city + ', TX ' + brewery.zip].filter(Boolean).join(', ');
  const countySlug = breweryCountySlug(brewery.county);
  return <main>
    <section className="border-b border-border bg-surface">
      <Container className="py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/">Home</Link> / <Link to="/explore">Explore</Link> / <Link to="/explore/breweries">Breweries</Link> / <span aria-current="page">{brewery.name}</span>
        </nav>
        <p className="eyebrow mt-9 text-primary">Texas licensed brewery reference · {brewery.county} County</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl sm:text-6xl">{brewery.name}</h1>
        <p className="mt-5 max-w-3xl text-lg text-muted-foreground">{brewery.city}, Texas · {brewery.licenseType === 'BW' ? 'Brewer’s License (BW)' : 'Brewpub subordinate (BP)'} · {brewery.licenseStatus}</p>
        <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">This is a TABC licensing record, not a confirmed public taproom or tour listing. We have not independently verified visitor access or opening hours for this facility.</p>
      </Container>
    </section>
    <Container className="py-12 sm:py-16">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,23rem)]">
        <article>
          <h2 className="font-display text-3xl">Location &amp; license details</h2>
          <dl className="mt-6 divide-y divide-border border-y border-border">
            {[
              ['Registered trade name', brewery.name],
              ['City', brewery.city],
              ['County', brewery.county + ' County'],
              ['Licensed address', address || 'Not provided in source'],
              ['Brewing authorization', brewery.licenseType === 'BW' ? 'BW — Brewer’s License' : 'BP — Brewpub License (subordinate to primary retail license)'],
              ['TABC primary license ID', brewery.licenseId],
              ['Primary license status', brewery.licenseStatus],
              ['License expiration', brewery.expirationDate || 'Check current TABC record'],
            ].map(([label, value]) => <div key={label} className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr]"><dt className="text-sm font-semibold">{label}</dt><dd className="text-sm text-muted-foreground">{value}</dd></div>)}
          </dl>
          <h2 className="mt-12 font-display text-3xl">Planning a visit</h2>
          <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">A Texas brewer's manufacturing license allows qualifying production activities, but does not guarantee a public tasting room, guided tours, on-site dining, retail hours or the current status of a physical storefront. Search for the brewery's official website or contact the operator before driving out.</p>
          <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">For additional stops, use the <a href={'/county/' + countySlug} className="text-primary underline">{brewery.county} County guide</a> to find nearby attractions, community guides and trip-planning context.</p>
        </article>
        <aside className="border-t-4 border-primary bg-surface p-7 self-start">
          <h2 className="font-display text-2xl">Verify before traveling</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">This record is imported from the public Texas Alcoholic Beverage Commission primary-license data. It is not a tourism certification or endorsement.</p>
          <a href="https://data.texas.gov/dataset/TABC-License-Information/7hf9-qc9f" target="_blank" rel="noopener noreferrer" className="mt-5 block text-sm font-semibold text-primary underline">Check the TABC source ↗</a>
          <Link to="/explore/breweries" className="mt-5 block text-sm font-semibold text-primary underline">Browse all Texas licensed breweries →</Link>
          <a href={'/county/' + countySlug} className="mt-5 block text-sm font-semibold text-primary underline">Explore {brewery.county} County →</a>
          <p className="mt-7 border-t border-border pt-5 text-xs leading-6 text-muted-foreground">Planning a brewery tour? Contact the business directly for age rules, accessibility, schedules, food service and reservations.</p>
        </aside>
      </div>
    </Container>
  </main>;
}
