import { getCityAuthorityProfile } from '@/data/city-authority-profiles';
import { getCityIndustryPaths } from '@/data/city-industry-paths';
import { canonicalEntityPath, type RankedRelatedEntity } from '@/data/knowledge-graph/relationships';
import type { TexasEntityRecord } from '@/data/knowledge-graph/types';

const governmentKinds = new Set(['agency', 'appraisal-district', 'tax-office', 'county-clerk', 'dps-office']);
const eventKinds = new Set(['fair', 'rodeo', 'festival', 'holiday-event', 'sporting-event']);
const outdoorKinds = new Set(['state-park', 'national-park', 'natural-area', 'attraction', 'destination', 'river', 'lake', 'spring', 'cavern']);
const historyKinds = new Set(['historic-site', 'mission', 'battlefield', 'museum']);
const sportsKinds = new Set(['sports-venue', 'stadium', 'arena', 'ballpark', 'racetrack']);
const fishingKinds = new Set(['fishing-species', 'fish-species', 'fishing-lake', 'fishing']);
const CITY_RELOCATION_LINKS = [
  { href: '/compare-texas-cities', label: 'Compare Texas cities', copy: 'Put this city beside other Texas places using the same relocation research framework instead of comparing reputation alone.' },
  { href: '/texas-cost-of-living-calculator', label: 'Cost-of-living planner', copy: 'Replace broad averages with your household spending, housing assumptions, transportation and recurring local costs.' },
  { href: '/texas-salary-comparison-by-city', label: 'Salary planning', copy: 'Work backward from the household budget and compare income needs across the Texas places still on your shortlist.' },
  { href: '/find-my-school-district', label: 'School-district lookup', copy: 'Verify the district and campus from an exact address; a city or mailing label does not establish school assignment.' },
  { href: '/find-my-utilities', label: 'Utility lookup', copy: 'Verify electric, water and sewer service for the address instead of assuming every property in the city uses the same provider.' },
  { href: '/find-my-property-tax', label: 'Property-tax research', copy: 'Identify the appraisal district, tax office and local taxing-unit stack for the property you are considering.' },
  { href: '/texas-home-insurance-calculator', label: 'Home-insurance planning', copy: 'Estimate the insurance side of the housing budget, then replace planning assumptions with property-specific quotes.' },
  { href: '/moving-to-texas#address-research-desk', label: 'Exact-address research', copy: 'Resolve geography first, then verify schools, utilities, tax responsibility, flood context and other address-dependent questions.' },
] as const;

const CITY_RESOURCE_LINKS = [
  { href: '/moving-to-texas', label: 'Moving to Texas', copy: 'Relocation context, statewide systems and the decisions that apply before you narrow down to one city.' },
  { href: '/texas-industries', label: 'Texas industries', copy: 'Move from the city to the statewide industry system, then follow individual sectors, regional hubs and official source notes.' },
  { href: '/moving-to-texas-checklist', label: 'Moving checklist', copy: 'A practical checklist for licenses, vehicles, utilities, schools, records and other move-related tasks.' },
  { href: '/property-tax-guides', label: 'Property-tax guides', copy: 'Understand Texas appraisal, exemptions, protests, taxing units and the difference between valuation and collection.' },
  { href: '/property-tax-calculators', label: 'Property-tax calculators', copy: 'Use the TexasDefined calculator hub when comparing the property-tax side of a move or home purchase.' },
  { href: '/find-my-school-district', label: 'Find my school district', copy: 'Check the school-district lookup instead of assuming a city name determines the district serving an address.' },
  { href: '/texas-toll-tags', label: 'Texas toll tags', copy: 'Compare statewide toll-tag systems and understand where regional toll networks overlap.' },
  { href: '/texas-dmv', label: 'Texas DMV guide', copy: 'Start with the statewide vehicle reference for registration, titles and related Texas motor-vehicle tasks.' },
  { href: '/explore/food-bbq', label: 'Texas food & barbecue', copy: 'Use the verified food-destination hub to connect city planning with Texas restaurant history, regional food traditions and road-trip stops.' },
  { href: '/explore/trip-planner', label: 'Texas trip planner', copy: 'Turn the city into a travel base and discover destinations through the broader TexasDefined planning system.' },
] as const;

export function EntityDepthSections({ entity, related }: { entity: TexasEntityRecord; related: RankedRelatedEntity[] }) {
  if (entity.kind === 'county') return null;

  const countyName = entity.countySlug ? `${title(entity.countySlug)} County` : null;
  const regionName = entity.region ? title(entity.region) : null;
  const contextItems = buildContextItems(entity, countyName, regionName);
  const practicalItems = practicalChecklist(entity);
  const questions = quickAnswers(entity, countyName, regionName);
  const relatedItems = related.slice(0, 6);
  const cityProfile = entity.kind === 'city' ? getCityAuthorityProfile(entity.slug) : undefined;
  const cityIndustryPaths = entity.kind === 'city' ? getCityIndustryPaths(entity.slug) : [];
  const cityDiscoveryItems = entity.kind === 'city'
    ? related.filter(({ entity: candidate }) =>
        candidate.kind !== 'city'
        && candidate.kind !== 'county'
        && candidate.kind !== 'metro-area'
        && !governmentKinds.has(candidate.kind),
      ).slice(0, 6)
    : [];
  const cityRelocationHref = entity.kind === 'city' && cityProfile
    ? `/moving-to-texas?saveCity=${encodeURIComponent(entity.name)}#my-texas-move`
    : null;

  return <>
    <section className="border-b border-border py-12" aria-labelledby="entity-context-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Use this guide</p>
          <h2 id="entity-context-heading" className="mt-2 font-display text-4xl">What to know about {entity.name}</h2>
        </div>
        <div className="max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          {contextItems.map((item) => <p key={item}>{item}</p>)}
        </div>
      </div>
    </section>

    {cityProfile ? <section className="border-b border-border py-12" aria-labelledby="city-systems-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Local systems</p>
          <h2 id="city-systems-heading" className="mt-2 font-display text-4xl">{entity.name} systems at a glance</h2>
        </div>
        <div>
          {cityProfile.hero ? <figure className="mb-8 overflow-hidden border border-border bg-muted/20">
            <img src={cityProfile.hero.src} alt={cityProfile.hero.alt} className="aspect-[16/7] w-full object-cover" loading="lazy" decoding="async" />
            {(cityProfile.hero.credit || cityProfile.hero.sourceUrl) ? <figcaption className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-xs leading-5 text-muted-foreground">
              <span>{cityProfile.hero.alt}</span>
              {cityProfile.hero.sourceUrl ? <a href={cityProfile.hero.sourceUrl} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline underline-offset-4">{cityProfile.hero.credit ?? 'Image source'} ↗</a> : cityProfile.hero.credit}
            </figcaption> : null}
          </figure> : null}
          <div className="grid gap-px border-y border-border bg-border sm:grid-cols-2">
            <div className="bg-background py-5 pr-5 sm:pr-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">2020 Census population</p>
              <strong className="mt-2 block font-display text-4xl">{cityProfile.population2020.toLocaleString('en-US')}</strong>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Official decennial Census count, kept as the stable baseline for long-term comparisons.</p>
            </div>
            <div className="bg-background py-5 sm:pl-6">
              {cityProfile.populationEstimate ? <>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{cityProfile.populationEstimate.year} Census estimate</p>
                <strong className="mt-2 block font-display text-4xl">{cityProfile.populationEstimate.value.toLocaleString('en-US')}</strong>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">Population estimate as of {cityProfile.populationEstimate.asOf}; estimates are distinct from the decennial Census count.</p>
              </> : <>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Current population</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Use the Census source for the newest published estimate. This page does not invent a current number when a newer estimate has not been verified in the city profile.</p>
              </>}
              <a className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4" href={cityProfile.censusUrl} target="_blank" rel="noreferrer noopener">U.S. Census Bureau source ↗</a>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {cityProfile.systems.map((system) => <article key={system.title} className="border border-border p-5">
              <h3 className="font-display text-2xl leading-tight">{system.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{system.summary}</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {system.links.map((link) => link.href.startsWith('/')
                  ? <a key={link.href} className="text-sm font-semibold text-primary underline underline-offset-4" href={link.href}>{link.label} →</a>
                  : <a key={link.href} className="text-sm font-semibold text-primary underline underline-offset-4" href={link.href} target="_blank" rel="noreferrer noopener">{link.label} ↗</a>)}
              </div>
            </article>)}
          </div>
        </div>
      </div>
    </section> : null}

    {entity.kind === 'city' ? <section className="border-b border-border py-12" aria-labelledby="city-jurisdiction-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">County & jurisdiction</p>
          <h2 id="city-jurisdiction-heading" className="mt-2 font-display text-4xl">Know which local government applies</h2>
        </div>
        <div className="max-w-3xl">
          {cityProfile?.jurisdiction ? <>
            <p className="text-base leading-7 text-muted-foreground">{cityProfile.jurisdiction.note}</p>
            <div className="mt-5 flex flex-wrap gap-2" aria-label={`Counties containing parts of ${entity.name}`}>
              {cityProfile.jurisdiction.counties.map((county) => <span key={county} className="border border-border px-3 py-2 text-sm font-medium">{county}</span>)}
            </div>
            {cityProfile.jurisdiction.sourceUrl ? <a className="mt-5 inline-block text-sm font-semibold text-primary underline underline-offset-4" href={cityProfile.jurisdiction.sourceUrl} target="_blank" rel="noreferrer noopener">Official jurisdiction source ↗</a> : null}
          </> : <p className="text-base leading-7 text-muted-foreground">
            {countyName ? `${countyName} is the primary county context stored for this city page, but a city name or mailing address should not be treated as proof of county, school-district, appraisal-district or utility jurisdiction. Verify the exact address before using a local office, tax record, school boundary or service provider.` : `City, county, school-district, appraisal-district and utility boundaries are separate systems. Verify the exact address before relying on a local jurisdiction or service provider.`}
          </p>}
        </div>
      </div>
    </section> : null}

    {cityProfile?.districts?.length ? <section className="border-b border-border py-12" aria-labelledby="city-districts-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Neighborhoods & districts</p>
          <h2 id="city-districts-heading" className="mt-2 font-display text-4xl">How to read {entity.name}</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {cityProfile.districts.map((district) => <article key={district.name} className="border border-border p-5"><h3 className="font-display text-2xl leading-tight">{district.name}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{district.summary}</p></article>)}
        </div>
      </div>
    </section> : null}

    {cityProfile?.featured?.length ? <section className="border-b border-border py-12" aria-labelledby="city-featured-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Start here</p>
          <h2 id="city-featured-heading" className="mt-2 font-display text-4xl">Best first stops and planning guides</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cityProfile.featured.map((feature) => <a key={feature.href} href={feature.href} className="overflow-hidden border border-border hover:border-primary/60">
            {feature.image ? <img src={feature.image.src} alt={feature.image.alt} className="aspect-[4/3] w-full object-cover" loading="lazy" decoding="async" /> : null}
            <span className="block p-5">
              {feature.eyebrow ? <span className="eyebrow text-primary">{feature.eyebrow}</span> : null}
              <strong className="mt-2 block font-display text-2xl leading-tight">{feature.title}</strong>
              <span className="mt-3 block text-sm leading-6 text-muted-foreground">{feature.summary}</span>
              <span className="mt-4 block text-sm font-semibold text-primary">Open guide →</span>
            </span>
          </a>)}
        </div>
      </div>
    </section> : null}

    {cityDiscoveryItems.length ? <section className="border-b border-border py-12" aria-labelledby="city-discovery-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Explore nearby</p>
          <h2 id="city-discovery-heading" className="mt-2 font-display text-4xl">Places connected to {entity.name}</h2>
        </div>
        <div>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground">Use these place and attraction guides to turn the city page into an actual itinerary. The list favors verified nearby entities instead of unrelated statewide links.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cityDiscoveryItems.map(({ entity: candidate }) => <a key={candidate.id} href={canonicalEntityPath(candidate)} className="border border-border p-5 hover:border-primary/60"><span className="eyebrow text-primary">{title(candidate.kind)}</span><strong className="mt-2 block font-display text-xl leading-tight">{candidate.name}</strong><span className="mt-3 block text-sm font-semibold text-primary">Open guide →</span></a>)}
          </div>
        </div>
      </div>
    </section> : null}

    {cityIndustryPaths.length ? <section className="border-b border-border py-12" aria-labelledby="city-industries-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Jobs & industry</p>
          <h2 id="city-industries-heading" className="mt-2 font-display text-4xl">Industry pathways for {entity.name}</h2>
        </div>
        <div>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground">These links connect {entity.name} to statewide sector guides where the regional relationship is clear. They are research paths, not employer rankings: use the sector page for the larger Texas system and local sources to verify a specific company, facility or opening.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {cityIndustryPaths.map((industry) => <a key={industry.href} href={industry.href} className="border border-border p-5 hover:border-primary/60"><strong className="font-display text-xl leading-tight">{industry.label}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">{industry.context}</span><span className="mt-3 block text-sm font-semibold text-primary">Explore sector →</span></a>)}
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            <a href="/texas-industries" className="text-primary underline decoration-primary/40 underline-offset-4">View all Texas industries →</a>
            <a href="/article/texas-jobs-economy-industries" className="text-primary underline decoration-primary/40 underline-offset-4">Texas jobs & economy overview →</a>
            <a href="/made-in-texas" className="text-primary underline decoration-primary/40 underline-offset-4">Made in Texas directory →</a>
          </div>
        </div>
      </div>
    </section> : null}

    <section className="border-b border-border py-12" aria-labelledby="entity-practical-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Practical details</p>
          <h2 id="entity-practical-heading" className="mt-2 font-display text-4xl">What to verify before you go or act</h2>
        </div>
        <div>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground">TexasDefined separates durable reference information from details that can change quickly. Use the checklist below to confirm the information that matters for your specific visit, transaction or request.</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {practicalItems.map(({ title: itemTitle, copy }) => <li key={itemTitle} className="border border-border p-5"><strong className="font-display text-xl">{itemTitle}</strong><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></li>)}
          </ul>
        </div>
      </div>
    </section>

    {cityRelocationHref ? <section className="border-b border-border py-12" aria-labelledby="city-relocation-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Relocation snapshot</p>
          <h2 id="city-relocation-heading" className="mt-2 font-display text-4xl">Plan a move to {entity.name}</h2>
        </div>
        <div>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground">
            Start with {entity.name} as a candidate, then move from city-level context to the exact address before making a housing decision.
            {countyName ? ` Verify ${countyName} and every property-specific jurisdiction for the address.` : ''}
            {regionName ? ` Use the wider ${regionName} Texas context when comparing work corridors, airports and nearby communities.` : ''}
          </p>
          <a href={cityRelocationHref} className="mt-5 inline-block text-sm font-semibold text-primary underline underline-offset-4">Add {entity.name} to My Texas Move →</a>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {CITY_RELOCATION_LINKS.map((resource) => <a key={resource.href} href={resource.href} className="border border-border p-5 hover:border-primary/60"><strong className="font-display text-xl leading-tight">{resource.label}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">{resource.copy}</span><span className="mt-3 block text-sm font-semibold text-primary">Open tool →</span></a>)}
          </div>
        </div>
      </div>
    </section> : null}

    {entity.kind === 'city' ? <section className="border-b border-border py-12" aria-labelledby="city-resource-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Plan, move & live</p>
          <h2 id="city-resource-heading" className="mt-2 font-display text-4xl">Plan a move, home search or trip in {entity.name}</h2>
        </div>
        <div>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground">Use these tools when your question shifts from “What is {entity.name} like?” to a concrete decision about moving, housing costs, schools, driving or a trip. Address-level tools matter because city names do not determine every local jurisdiction or service boundary.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {CITY_RESOURCE_LINKS.map((resource) => <a key={resource.href} href={resource.href} className="border border-border p-5 hover:border-primary/60"><strong className="font-display text-xl leading-tight">{resource.label}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">{resource.copy}</span><span className="mt-3 block text-sm font-semibold text-primary">Open guide →</span></a>)}
          </div>
        </div>
      </div>
    </section> : null}

    {questions.length ? <section className="border-b border-border py-12" aria-labelledby="entity-answers-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Quick answers</p>
          <h2 id="entity-answers-heading" className="mt-2 font-display text-4xl">Common questions about {entity.name}</h2>
        </div>
        <div className="max-w-3xl divide-y divide-border border-y border-border">
          {questions.map(({ question, answer }) => <div key={question} className="py-6"><h3 className="font-display text-2xl">{question}</h3><p className="mt-3 text-base leading-7 text-muted-foreground">{answer}</p></div>)}
        </div>
      </div>
    </section> : null}

    {relatedItems.length ? <section className="border-b border-border py-12" aria-labelledby="entity-connections-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Build the picture</p>
          <h2 id="entity-connections-heading" className="mt-2 font-display text-4xl">Related guides and places</h2>
        </div>
        <div>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground">Continue with the county, region, nearby places and subject guides that add useful context to {entity.name}. These are supporting references for the next question, not a generic list of links.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedItems.map(({ entity: candidate }) => <a key={candidate.id} href={canonicalEntityPath(candidate)} className="border border-border p-5 hover:border-primary/60"><span className="eyebrow text-primary">{title(candidate.kind)}</span><strong className="mt-2 block font-display text-xl leading-tight">{candidate.name}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Open the related guide →</span></a>)}
          </div>
        </div>
      </div>
    </section> : null}
  </>;
}

function buildContextItems(entity: TexasEntityRecord, countyName: string | null, regionName: string | null) {
  const placeContext = [countyName, regionName ? `${regionName} Texas` : null].filter(Boolean).join(' in ');

  if (governmentKinds.has(entity.kind)) {
    return [
      `${entity.name} is included in TexasDefined as a practical public-service reference. The goal is to help readers understand what the office or agency handles, identify the official source, and move to the correct government website when they need to complete a transaction or verify a rule.`,
      entity.kind === 'appraisal-district'
        ? `Appraisal districts determine property values, maintain appraisal records, administer exemptions and operate the appraisal-review process. They do not generally serve the same role as the office that sends or collects a property-tax bill.`
        : entity.kind === 'tax-office'
          ? `County tax offices commonly handle property-tax collection and may also provide motor-vehicle or other assessor-collector services. The exact service mix varies by county, so use the official office link for the transaction you need.`
          : entity.kind === 'agency'
            ? `State-agency responsibilities can overlap with local governments, federal programs and other Texas agencies. Use this page to orient yourself, then rely on the linked official agency material for forms, eligibility, deadlines, fees and current rules.`
            : `Local-government responsibilities vary by office. TexasDefined keeps the official source visible so readers can distinguish an explanatory reference from the government system that actually controls records, filings or services.`,
      placeContext ? `${entity.name} is associated with ${placeContext}. That geographic context matters because local offices, taxing jurisdictions, service areas and nearby public resources can differ even within the same part of Texas.` : `When a service depends on residence, property location or county jurisdiction, verify that the office serves the exact address or account involved.`,
    ];
  }

  if (sportsKinds.has(entity.kind) || entity.kind === 'sports-venue') {
    return [
      `${entity.name} is part of TexasDefined's sports-travel reference collection. The page is meant to help readers place the venue geographically, understand the kind of trip it supports, and find the official source before buying tickets or traveling.`,
      placeContext ? `The venue is associated with ${placeContext}. For game-day planning, the surrounding city and county can matter as much as the building itself because parking, transit, lodging and event traffic extend beyond the venue footprint.` : `For game-day planning, check the surrounding area as well as the venue itself because parking, lodging and event traffic can extend beyond the property.`,
      `Schedules, ticket rules, parking procedures, bag policies and gate times can change by event. Treat those as live operational details and confirm them with the venue, team, school or event organizer before departure.`,
    ];
  }

  if (outdoorKinds.has(entity.kind)) {
    return [
      `${entity.name} belongs in TexasDefined's outdoor and trip-planning guide because the useful question is not only where it is, but what a visitor should verify before making the drive. Access, weather, water conditions, reservations and seasonal restrictions can all change the experience.`,
      placeContext ? `${entity.name} is associated with ${placeContext}. Use that location as a starting point for routing, nearby stops and weather checks rather than assuming the name alone identifies the correct entrance or access point.` : `Use the official location information when routing; parks, rivers, lakes and large natural areas may have multiple entrances, units or access points.`,
      `Texas conditions can change quickly. Heat, drought, flood flows, burn bans, storms, lake levels and trail closures may affect a trip even when the destination itself remains open.`,
    ];
  }

  if (historyKinds.has(entity.kind)) {
    return [
      `${entity.name} is included as a Texas history and place reference, connecting the site or institution to the larger geography and story around it rather than treating it as an isolated name on a list.`,
      placeContext ? `Its location in ${placeContext} provides useful context for nearby historic places, county history and trip planning.` : `Use the related guides on this page to connect the site with nearby historic places and regional context.`,
      `Hours, tours, exhibit access, admission and preservation work can change. Verify the official site before traveling, especially for small museums, seasonal sites and properties with limited public access.`,
    ];
  }

  if (eventKinds.has(entity.kind)) {
    return [
      `${entity.name} is a TexasDefined event reference. Event pages are most useful when they combine place context with a reminder that dates, ticketing, gates, parking and programming are live details controlled by the organizer.`,
      placeContext ? `The event is associated with ${placeContext}; use the location context to compare lodging, driving time and nearby stops.` : `Confirm the exact event location before traveling because recurring Texas events can use different grounds, entrances or parking plans over time.`,
      `Do not rely on an older article, social post or search snippet for this year's schedule. Confirm the current edition with the official organizer before making nonrefundable plans.`,
    ];
  }

  if (fishingKinds.has(entity.kind) || entity.kind.includes('fishing')) {
    return [
      `${entity.name} is part of TexasDefined's fishing reference system. A useful fishing page should connect species or water-body information with current regulations, access conditions and the larger lake or river context.`,
      placeContext ? `The reference is associated with ${placeContext}. Access points, guide services, ramps and local conditions can vary widely around a large reservoir or river system.` : `Access points and local conditions can vary widely around a large reservoir or river system, so verify where you plan to launch or fish.`,
      `Fishing regulations, harvest rules and license requirements can change. Confirm current Texas Parks and Wildlife Department rules before fishing rather than relying on a static summary.`,
    ];
  }

  if (entity.kind === 'city') {
    return [
      `${entity.name} is best understood through its own neighborhoods, major destinations, employment centers and regional setting rather than as a generic point inside a metro area. Use this guide to connect those parts of the city with practical trip and relocation decisions.`,
      countyName ? `${countyName} is the primary county context stored for ${entity.name}, but a city name is not proof that every address lies in that county. Municipal limits, county lines, school districts, appraisal districts and utility territories can cross or diverge, so verify the exact address before relying on a local jurisdiction.` : `City and county boundaries do not always align with mailing addresses, so verify the exact county, school district, appraisal district and utility territory when those systems matter.`,
      `Start with the city-specific places and local systems below, then use nearby destination, housing, school, tax and trip-planning links for the decision you are actually making.`,
    ];
  }

  return [
    `${entity.name} is part of the TexasDefined reference guide because it connects to a specific place, activity, institution or Texas story. This page combines the verified entity record with geographic and related-guide context so it does more than repeat a name and category.`,
    placeContext ? `The reference is associated with ${placeContext}, which helps connect it to nearby places and local resources.` : `Use the map and related references on this page to place it in a broader Texas context.`,
    entity.officialUrl ? `Where an official source exists, TexasDefined links to it directly so changing operational details can be checked at the source.` : `Operational details can change, so verify current hours, access, fees or rules with the responsible organization before acting on them.`,
  ];
}

function practicalChecklist(entity: TexasEntityRecord) {
  if (governmentKinds.has(entity.kind)) return [
    { title: 'Correct jurisdiction', copy: 'Confirm that the office or agency serves your county, property, account, license or program before starting a filing or payment.' },
    { title: 'Current forms and deadlines', copy: 'Use the official government website for forms, fees, filing windows, eligibility rules and deadline changes.' },
    { title: 'Online versus in-person service', copy: 'Check whether the transaction can be completed online and whether an appointment, identification or supporting document is required.' },
    { title: 'Official contact details', copy: 'Use the linked government source for the latest address, phone number, office hours and service notices.' },
  ];

  if (sportsKinds.has(entity.kind) || entity.kind === 'sports-venue') return [
    { title: 'Event schedule', copy: 'Confirm the date, start time and event status with the team, school, league or organizer.' },
    { title: 'Tickets and entry', copy: 'Check accepted ticket formats, gate opening times, re-entry rules and any age-specific admission policy.' },
    { title: 'Parking and transportation', copy: 'Review the official parking map, rideshare zones, transit options and event-day road closures.' },
    { title: 'Bag and accessibility rules', copy: 'Venue security and accessibility procedures can vary by event, so check the current policy before leaving home.' },
  ];

  if (outdoorKinds.has(entity.kind)) return [
    { title: 'Access and reservations', copy: 'Check entrance points, reservation requirements, day-use capacity and any seasonal or unit-specific closures.' },
    { title: 'Weather and hazards', copy: 'Review heat, storms, flood risk, fire restrictions and other conditions that can change quickly in Texas.' },
    { title: 'Water and trail conditions', copy: 'For swimming, paddling, hiking or boating, confirm current levels, closures and local safety notices.' },
    { title: 'Rules and fees', copy: 'Verify pets, camping, fishing, launch, permit, entrance and other activity-specific rules with the managing agency.' },
  ];

  if (historyKinds.has(entity.kind)) return [
    { title: 'Open hours', copy: 'Small museums and historic sites may have seasonal schedules, limited days or closures for preservation work.' },
    { title: 'Tours and admission', copy: 'Check whether tours require reservations and whether separate tickets apply to special exhibits or buildings.' },
    { title: 'Accessibility', copy: 'Historic structures can have physical constraints, so review current accessibility information before visiting.' },
    { title: 'Photography and site rules', copy: 'Confirm rules for tripods, commercial photography, events, pets and restricted preservation areas.' },
  ];

  if (entity.kind === 'city') return [
    { title: 'County and property systems', copy: 'Confirm the county for the exact address before using appraisal, property-tax, court, election or records systems; city names and county boundaries do not always line up.' },
    { title: 'Utilities and service areas', copy: 'Verify the electric, water, trash and other providers for the address itself. A city can contain multiple service territories or systems with different rules.' },
    { title: 'Transportation and tolls', copy: 'Check the local transit network, airport access, commute routes, toll roads and construction that matter for the part of the city you are considering.' },
    { title: 'Schools and local services', copy: 'Verify the school district, emergency-service jurisdiction and other address-based services instead of assuming they follow the municipal boundary.' },
  ];

  return [
    { title: 'Official source', copy: 'Use the official link on this page when current hours, fees, rules, schedules or transaction details matter.' },
    { title: 'Exact location', copy: 'Confirm the entrance, unit, office or access point rather than relying only on a general map pin or mailing address.' },
    { title: 'Timing', copy: 'Seasonality, event calendars, weather and government deadlines can all change whether a visit or task makes sense.' },
    { title: 'Nearby context', copy: 'Use the related TexasDefined pages to understand the county, region and other places connected to this reference.' },
  ];
}

function quickAnswers(entity: TexasEntityRecord, countyName: string | null, regionName: string | null) {
  const locationAnswer = entity.kind === 'city'
    ? countyName
      ? `${entity.name} is in ${regionName ? `the ${regionName} region of Texas` : 'Texas'}, with ${countyName} used here as the primary county context. Some Texas cities cross county lines, so use the exact address when county jurisdiction matters.`
      : regionName
        ? `${entity.name} is in the ${regionName} region of Texas. Verify the exact county and local jurisdiction for an address when that matters.`
        : `${entity.name} is in Texas. Verify the exact county and local jurisdiction for an address when property, schools, elections or services are involved.`
    : countyName
      ? `${entity.name} is associated with ${countyName}${regionName ? ` in the ${regionName} region` : ''}. Use the map link and official source for the exact entrance, office or service location when that matters.`
      : regionName
        ? `${entity.name} is associated with the ${regionName} region of Texas. Use the map link and official source for exact location details.`
        : `Use the map link or official source on this page for the exact location or service area.`;

  const answers = [
    { question: `Where is ${entity.name}?`, answer: locationAnswer },
  ];

  if (entity.officialUrl) answers.push({
    question: `Where should I verify current information for ${entity.name}?`,
    answer: `Use the official website linked on this page for current schedules, fees, forms, rules, hours or operational notices. TexasDefined is an independent guide and does not replace the responsible agency, venue, park, office or organizer.`,
  });

  if (entity.kind === 'city') {
    if (entity.description) answers.push({
      question: `What is ${entity.name} known for?`,
      answer: entity.description,
    });
    answers.push({
      question: `Where should I start if I am considering a move to ${entity.name}?`,
      answer: `Start with the moving, housing and address-level tools linked above, then verify the exact county, school district, utility service area, property-tax jurisdictions and commute pattern for the address you are considering. The city name alone does not determine every local system that applies.`,
    });
  }

  if (governmentKinds.has(entity.kind)) answers.push({
    question: `Is TexasDefined the official website for ${entity.name}?`,
    answer: `No. TexasDefined is an independent Texas reference. The official government source is linked on this page when it has been verified.`,
  });

  if (sportsKinds.has(entity.kind) || outdoorKinds.has(entity.kind) || historyKinds.has(entity.kind) || eventKinds.has(entity.kind)) answers.push({
    question: `Should I check details again before visiting ${entity.name}?`,
    answer: `Yes. Hours, reservations, event schedules, parking, weather closures, admission and access rules can change after a guide is published. Confirm the time-sensitive details with the official source before traveling.`,
  });

  return answers;
}

function title(value: string) {
  return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}