import { getCityAuthorityProfile } from '@/data/city-authority-profiles';
import { canonicalEntityPath, type RankedRelatedEntity } from '@/data/knowledge-graph/relationships';
import type { TexasEntityRecord } from '@/data/knowledge-graph/types';

const governmentKinds = new Set(['agency', 'appraisal-district', 'tax-office', 'county-clerk', 'dps-office']);
const eventKinds = new Set(['fair', 'rodeo', 'festival', 'holiday-event', 'sporting-event']);
const outdoorKinds = new Set(['state-park', 'national-park', 'natural-area', 'attraction', 'destination', 'river', 'lake', 'spring', 'cavern']);
const historyKinds = new Set(['historic-site', 'mission', 'battlefield', 'museum']);
const sportsKinds = new Set(['sports-venue', 'stadium', 'arena', 'ballpark', 'racetrack']);
const fishingKinds = new Set(['fishing-species', 'fish-species', 'fishing-lake', 'fishing']);
const CITY_RESOURCE_LINKS = [
  { href: '/moving-to-texas', label: 'Moving to Texas', copy: 'Relocation context, statewide systems and the decisions that apply before you narrow down to one city.' },
  { href: '/moving-to-texas-checklist', label: 'Moving checklist', copy: 'A practical checklist for licenses, vehicles, utilities, schools, records and other move-related tasks.' },
  { href: '/property-tax-guides', label: 'Property-tax guides', copy: 'Understand Texas appraisal, exemptions, protests, taxing units and the difference between valuation and collection.' },
  { href: '/property-tax-calculators', label: 'Property-tax calculators', copy: 'Use the TexasDefined calculator hub when comparing the property-tax side of a move or home purchase.' },
  { href: '/find-my-school-district', label: 'Find my school district', copy: 'Check the school-district lookup instead of assuming a city name determines the district serving an address.' },
  { href: '/texas-toll-tags', label: 'Texas toll tags', copy: 'Compare statewide toll-tag systems and understand where regional toll networks overlap.' },
  { href: '/texas-dmv', label: 'Texas DMV guide', copy: 'Start with the statewide vehicle reference for registration, titles and related Texas motor-vehicle tasks.' },
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
          <div className="border-y border-border py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">2020 Census population</p>
            <div className="mt-2 flex flex-wrap items-baseline justify-between gap-4">
              <strong className="font-display text-4xl">{cityProfile.population2020.toLocaleString('en-US')}</strong>
              <a className="text-sm font-semibold text-primary underline underline-offset-4" href={cityProfile.censusUrl} target="_blank" rel="noreferrer noopener">U.S. Census Bureau source ↗</a>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">TexasDefined uses the completed 2020 Census count here as a stable reference point instead of presenting a moving population estimate as a permanent city fact.</p>
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

    {entity.kind === 'city' ? <section className="border-b border-border py-12" aria-labelledby="city-resource-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Plan, move & live</p>
          <h2 id="city-resource-heading" className="mt-2 font-display text-4xl">Useful TexasDefined tools for {entity.name}</h2>
        </div>
        <div>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground">A city page should be a doorway into the practical systems readers use next. These links connect {entity.name} to TexasDefined's relocation, property, school, driving and trip-planning coverage without duplicating those statewide guides here.</p>
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
          <h2 id="entity-connections-heading" className="mt-2 font-display text-4xl">Related TexasDefined references</h2>
        </div>
        <div>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground">A useful Texas guide should connect the place, office or subject to the county, region and nearby resources that help explain it. These links are selected from the TexasDefined knowledge graph rather than added as unrelated filler.</p>
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
      `${entity.name} is a TexasDefined city reference built to connect the city with its county, region, nearby destinations and practical Texas-living guides. It is not intended to be a generic encyclopedia entry.`,
      countyName ? `${entity.name} is associated with ${countyName}. County boundaries matter for property records, courts, elections, appraisal districts and other local-government services even when a mailing address uses the city name.` : `City and county boundaries do not always align with mailing addresses, so verify the county when property, elections or local-government services are involved.`,
      `Use the related guides to move from the city overview into nearby places, property information, outdoor destinations and other TexasDefined coverage that is specific to the area.`,
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
  const locationAnswer = countyName
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

  if (entity.kind === 'city') answers.push({
    question: `Where should I start if I am considering a move to ${entity.name}?`,
    answer: `Start with the TexasDefined Moving to Texas guide and checklist linked above, then verify the exact county, school district, utility service area, property-tax jurisdictions and commute pattern for the address you are considering. The city name alone does not determine every local system that applies.`,
  });

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