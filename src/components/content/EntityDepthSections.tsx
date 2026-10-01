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
  { href: '/property-tax-guides', label: 'Texas property-tax guide', copy: 'Use the statewide hub for Texas appraisal, exemptions, protests, taxing units, rates, bills, deadlines and local tax research.' },
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
          {practicalItems.length ? <ul className="divide-y divide-border border-y border-border">{practicalItems.map((item) => <li key={item} className="py-4 text-sm leading-7 text-muted-foreground">{item}</li>)}</ul> : <p className="text-base leading-7 text-muted-foreground">Verify current hours, access rules, fees, closures and other time-sensitive details with the responsible official source before relying on them.</p>}
        </div>
      </div>
    </section>

    {entity.kind === 'city' && cityProfile ? <section className="border-b border-border py-12" aria-labelledby="city-relocation-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Moving research</p>
          <h2 id="city-relocation-heading" className="mt-2 font-display text-4xl">Research {entity.name} as a place to live</h2>
        </div>
        <div>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground">Citywide averages are only the first pass. For a serious move decision, verify the exact address, school district, utility territory, property-tax stack, insurance assumptions and recurring transportation costs before comparing {entity.name} with another Texas city.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {CITY_RELOCATION_LINKS.map((item) => <a key={item.href} href={item.href} className="border border-border p-5 hover:border-primary/60"><strong className="font-display text-xl leading-tight">{item.label}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.copy}</span><span className="mt-3 block text-sm font-semibold text-primary">Open tool →</span></a>)}
          </div>
          {cityRelocationHref ? <a href={cityRelocationHref} className="mt-6 inline-flex border-b border-primary pb-1 text-sm font-semibold text-primary">Save {entity.name} to My Texas Move →</a> : null}
        </div>
      </div>
    </section> : null}

    {entity.kind === 'city' ? <section className="border-b border-border py-12" aria-labelledby="city-resources-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Keep researching</p>
          <h2 id="city-resources-heading" className="mt-2 font-display text-4xl">Useful Texas resources after {entity.name}</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {CITY_RESOURCE_LINKS.map((item) => <a key={item.href} href={item.href} className="border border-border p-5 hover:border-primary/60"><strong className="font-display text-xl leading-tight">{item.label}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.copy}</span><span className="mt-3 block text-sm font-semibold text-primary">Continue →</span></a>)}
        </div>
      </div>
    </section> : null}

    {questions.length ? <section className="border-b border-border py-12" aria-labelledby="entity-questions-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Quick answers</p>
          <h2 id="entity-questions-heading" className="mt-2 font-display text-4xl">Questions people ask about {entity.name}</h2>
        </div>
        <div className="divide-y divide-border border-y border-border">
          {questions.map((question) => <details key={question.question} className="group py-5"><summary className="cursor-pointer list-none font-display text-xl leading-tight">{question.question}</summary><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{question.answer}</p></details>)}
        </div>
      </div>
    </section> : null}

    {relatedItems.length ? <section className="border-b border-border py-12" aria-labelledby="entity-related-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Keep exploring</p>
          <h2 id="entity-related-heading" className="mt-2 font-display text-4xl">Related TexasDefined guides</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {relatedItems.map((item) => <a key={item.entity.id} href={canonicalEntityPath(item.entity)} className="border border-border p-5 hover:border-primary/60"><strong className="font-display text-xl leading-tight">{item.entity.name}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.reason}</span><span className="mt-3 block text-sm font-semibold text-primary">Open guide →</span></a>)}
        </div>
      </div>
    </section> : null}
  </>;
}

function buildContextItems(entity: TexasEntityRecord, countyName: string | null, regionName: string | null) {
  const out: string[] = [];
  if (entity.kind === 'city') {
    if (countyName) out.push(`${entity.name} is associated with ${countyName}${regionName ? ` in ${regionName}` : ''}. City and mailing names do not always match county, school-district, utility or tax boundaries, so exact-address research matters for practical decisions.`);
    else out.push(`${entity.name} is a Texas city${regionName ? ` in ${regionName}` : ''}. Use local and official sources to verify boundaries, services and time-sensitive details.`);
  } else if (governmentKinds.has(entity.kind)) out.push(`${entity.name} is part of the local or statewide public-service system${countyName ? ` serving ${countyName}` : ''}. Use the official office for filing, account, deadline and eligibility questions.`);
  else if (eventKinds.has(entity.kind)) out.push(`${entity.name} is a Texas event. Dates, admissions, road closures, parking plans and operating details can change from one edition to the next.`);
  else if (outdoorKinds.has(entity.kind)) out.push(`${entity.name} is an outdoor or travel destination${countyName ? ` in ${countyName}` : ''}. Conditions, access, reservations and safety rules can change with weather, water level, fire risk and agency operations.`);
  else if (historyKinds.has(entity.kind)) out.push(`${entity.name} is a Texas history or museum destination${countyName ? ` in ${countyName}` : ''}. Use the site's own collections and official interpretation alongside broader historical context.`);
  else if (sportsKinds.has(entity.kind)) out.push(`${entity.name} is a Texas sports venue. Event calendars, entry policies, parking, bag rules and transportation plans depend on the event.`);
  else if (fishingKinds.has(entity.kind)) out.push(`${entity.name} belongs to the Texas fishing research system. Regulations and conditions can change, so pair technique and destination guidance with current Texas Parks and Wildlife rules.`);
  else out.push(`${entity.name} is part of the TexasDefined reference system${countyName ? ` and is associated with ${countyName}` : ''}${regionName ? ` in ${regionName}` : ''}. Use the linked official and related sources to verify details that change over time.`);
  if (entity.aliases?.length) out.push(`You may also see ${entity.name} referenced as ${entity.aliases.slice(0, 4).join(', ')}. TexasDefined groups those names under the same reference entity when they describe the same place, office or subject.`);
  return out;
}

function practicalChecklist(entity: TexasEntityRecord) {
  if (entity.kind === 'city') return ['Confirm the county for the exact address; city limits and postal city names can cross or obscure county lines.','Verify school-district assignment from the address rather than from the city name alone.','Check utilities, property-taxing units, insurance exposure and recurring transportation costs before comparing homes.','Use official local sources for current permits, elections, services, fees and office procedures.'];
  if (governmentKinds.has(entity.kind)) return ['Use the official office website or record system for account-specific information.','Verify deadlines and filing requirements for the current tax or calendar year.','Do not send sensitive account or identity information to an unofficial directory.'];
  if (eventKinds.has(entity.kind)) return ['Confirm the current event date and opening hours.','Check the organizer for tickets, admission rules, parking and prohibited items.','Review weather and transportation conditions before departure.'];
  if (outdoorKinds.has(entity.kind)) return ['Check current access, closures and reservation requirements.','Confirm water, fire, trail or weather conditions when they affect the visit.','Use the managing agency for current safety and regulation information.'];
  return ['Confirm current hours, access or service details with the responsible organization.','Use linked official sources for rules, filings, fees, schedules and other facts that can change.'];
}

function quickAnswers(entity: TexasEntityRecord, countyName: string | null, regionName: string | null) {
  const locationAnswer = countyName ? `${entity.name} is associated with ${countyName}${regionName ? ` in ${regionName}` : ''}. For property, school, voting or utility questions, verify the exact address because service boundaries do not necessarily follow city or postal labels.` : regionName ? `${entity.name} is in ${regionName}. Check the linked official source for a precise address or jurisdiction when that matters.` : '';
  const questions: Array<{ question: string; answer: string }> = [];
  if (locationAnswer) questions.push({ question: `Where is ${entity.name}?`, answer: locationAnswer });
  if (entity.kind === 'city') questions.push({ question: `What should I check before moving to ${entity.name}?`, answer: 'Start with the exact address. Verify county, school district, utilities, property-taxing units, insurance assumptions and transportation costs, then compare those address-level facts with your broader city preferences.' });
  if (governmentKinds.has(entity.kind)) questions.push({ question: `Should I use ${entity.name} for official records or filing?`, answer: 'Use the office’s official website or records system for account-specific work. TexasDefined can explain the process and route you to the right office, but the government source controls filings, records, eligibility and deadlines.' });
  if (eventKinds.has(entity.kind)) questions.push({ question: `How do I confirm the next ${entity.name}?`, answer: 'Use the organizer or venue for the current edition’s dates, admission, parking, operating hours and restrictions. Recurring Texas events can change schedules and procedures from year to year.' });
  if (outdoorKinds.has(entity.kind)) questions.push({ question: `What should I verify before visiting ${entity.name}?`, answer: 'Check the managing agency for current hours, closures, reservations, water or trail conditions, fire restrictions and safety notices. Conditions can change faster than evergreen travel guidance.' });
  return questions;
}

function title(value: string) {
  return value.split('-').map((part) => part ? part[0].toUpperCase() + part.slice(1) : part).join(' ');
}
