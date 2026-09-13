import { useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { TEXAS_CITIES, TEXAS_COUNTIES } from '@/data/texas-places';
import { COUNTY_PROPERTY_RECORDS } from '@/data/property/county-property-data';

export type RelocationFinderKind =
  | 'county'
  | 'school'
  | 'utilities'
  | 'voter'
  | 'homestead'
  | 'property-tax'
  | 'emergency';

type FinderConfig = {
  eyebrow: string;
  title: string;
  intro: string;
  searchLabel: string;
  searchPlaceholder: string;
  caution: string;
};

const CONFIG: Record<RelocationFinderKind, FinderConfig> = {
  county: {
    eyebrow: 'Address research',
    title: 'Find your Texas county',
    intro: 'Search a Texas city or county name to identify the county context you should verify before handling local taxes, vehicle registration, voting, schools or property records.',
    searchLabel: 'Texas city or county',
    searchPlaceholder: 'Try Katy, Austin, Bexar or Collin',
    caution: 'City boundaries and mailing addresses can cross county lines. Use this as an orientation tool, then verify the exact street address with the appropriate official source.',
  },
  school: {
    eyebrow: 'Schools and communities',
    title: 'Find the school district that serves an address',
    intro: 'Start with a Texas city or county to establish local context, then use the Texas Education Agency district locator for the exact address. TexasDefined does not guess school boundaries from a ZIP code or mailing city.',
    searchLabel: 'Texas city or county',
    searchPlaceholder: 'Try Houston, Frisco, Williamson or El Paso',
    caution: 'School-district and attendance-zone boundaries can change and do not necessarily follow city, county or ZIP-code lines. Confirm the exact address with TEA and the district before signing a lease or purchase contract.',
  },
  utilities: {
    eyebrow: 'Set up the house',
    title: 'Find the utilities that serve a Texas address',
    intro: 'Use a city or county search to establish local context, then move to the Public Utility Commission address tools for the exact electric, water and sewer service territory. Retail electricity choice also varies by service area.',
    searchLabel: 'Texas city or county',
    searchPlaceholder: 'Try Round Rock, Houston, Denton or Comal',
    caution: 'A city name is not enough to determine a utility provider. Municipal utilities, electric cooperatives, investor-owned utilities, MUDs and water systems can all cross or ignore familiar city boundaries.',
  },
  voter: {
    eyebrow: 'Civic setup',
    title: 'Find your Texas voter-registration path',
    intro: 'Search your Texas city or county, then use the Secretary of State tools to check registration status and registration requirements. County residence matters for voter registration and local elections.',
    searchLabel: 'Texas city or county',
    searchPlaceholder: 'Try Dallas, Fort Bend, Travis or Lubbock',
    caution: 'TexasDefined does not determine voter eligibility or registration status. Use the Texas Secretary of State and your county election office for the official record.',
  },
  homestead: {
    eyebrow: 'Property-tax setup',
    title: 'Find where to file a Texas homestead exemption',
    intro: 'Search the county where the home is located. The local appraisal district is the office that handles residence-homestead exemption applications and determines eligibility.',
    searchLabel: 'Texas city or county',
    searchPlaceholder: 'Try Harris, Austin, Frisco or Bexar',
    caution: 'Homestead eligibility and local optional exemptions depend on law and the property facts. File with the appraisal district for the county where the property is located and rely on its current instructions.',
  },
  'property-tax': {
    eyebrow: 'Property research',
    title: 'Find the property-tax offices for a Texas address',
    intro: 'Search a city or county to reach the local appraisal district, property-search tools and tax office. Texas property tax is locally appraised and locally administered.',
    searchLabel: 'Texas city or county',
    searchPlaceholder: 'Try Montgomery, San Antonio, Katy or Travis',
    caution: 'A mailing city can sit in more than one county and a parcel can be served by multiple taxing units. Confirm the parcel and taxing-unit stack before relying on a tax estimate.',
  },
  emergency: {
    eyebrow: 'Local safety and help',
    title: 'Find Texas emergency and community services',
    intro: 'Search a Texas city or county for local context, then use official emergency and community-service resources. For immediate life-threatening emergencies, call 911.',
    searchLabel: 'Texas city or county',
    searchPlaceholder: 'Try Waco, Brazoria, El Paso or Smith',
    caution: 'Emergency response districts, fire districts and service areas can differ from city limits. For an active emergency call 911; for non-emergency community assistance use 2-1-1 Texas and local official sources.',
  },
};

const OFFICIAL = {
  schoolLocator: 'https://tea2.tea.texas.gov/families-and-students/school-district-locator/school-district-locator',
  teaDirectory: 'https://tea.texas.gov/school-and-district-information',
  pucWater: 'https://www.puc.texas.gov/WaterSearch/SearchAddress/Find',
  pucWaterMap: 'https://www.puc.texas.gov/industry/water/utilities/map.aspx',
  powerToChoose: 'https://www.powertochoose.org/',
  voterPortal: 'https://teamrv-mvp.sos.texas.gov/MVP/mvp.do',
  voterRegistration: 'https://www.sos.state.tx.us/elections/vr/index.shtml',
  comptrollerCounty: 'https://comptroller.texas.gov/taxes/property-tax/county-directory/',
  comptrollerExemptions: 'https://comptroller.texas.gov/taxes/property-tax/exemptions/',
  texas211: 'https://www.211texas.org/',
} as const;

function normalizeCountyName(value: string) {
  return value.replace(/ County$/i, '').trim().toLowerCase();
}

function externalButton(label: string, href: string) {
  return <a href={href} target="_blank" rel="noreferrer noopener" className="inline-flex min-h-11 items-center justify-center border border-foreground px-4 py-2 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background">{label} ↗</a>;
}

export function RelocationServiceFinder({ kind }: { kind: RelocationFinderKind }) {
  const config = CONFIG[kind];
  const [query, setQuery] = useState('');
  const normalized = query.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!normalized) return { cities: [], counties: [] };
    return {
      cities: TEXAS_CITIES.filter((city) => `${city.name} ${city.county} ${city.region}`.toLowerCase().includes(normalized)).slice(0, 8),
      counties: TEXAS_COUNTIES.filter((county) => county.name.toLowerCase().includes(normalized)).slice(0, 8),
    };
  }, [normalized]);

  const matchedCountyNames = useMemo(() => {
    const values = new Set<string>();
    for (const county of matches.counties) values.add(normalizeCountyName(county.name));
    for (const city of matches.cities) values.add(city.county.toLowerCase());
    return values;
  }, [matches]);

  const countyRecords = useMemo(() => COUNTY_PROPERTY_RECORDS.filter((record) => matchedCountyNames.has(normalizeCountyName(record.name))).slice(0, 8), [matchedCountyNames]);

  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
    <article className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/moving-to-texas">Moving to Texas</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page" className="text-foreground">{config.title}</span>
      </nav>

      <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div><p className="eyebrow text-primary">{config.eyebrow}</p><h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{config.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{config.intro}</p></div>
        <p className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">{config.caution}</p>
      </header>

      <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]" aria-labelledby="finder-search-heading">
        <div><p className="eyebrow text-primary">Start local</p><h2 id="finder-search-heading" className="mt-2 font-display text-3xl">Search TexasDefined</h2></div>
        <div>
          <label htmlFor={`finder-${kind}`} className="text-sm font-semibold">{config.searchLabel}</label>
          <input id={`finder-${kind}`} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={config.searchPlaceholder} className="mt-2 min-h-12 w-full border border-border bg-background px-4 text-base outline-none focus:border-primary" />
          {!normalized && <p className="mt-3 text-sm leading-6 text-muted-foreground">Type at least part of a city or county name. The finder keeps the first step local and sends exact-address questions to the authoritative agency.</p>}

          {normalized && matches.cities.length === 0 && matches.counties.length === 0 && <div className="mt-6 border-y border-border py-5"><p className="font-semibold">No local directory match yet.</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Try the county name, a major nearby city, or go straight to the official address-level source below.</p></div>}

          {matches.cities.length > 0 && <div className="mt-6"><h3 className="font-display text-2xl">City matches</h3><div className="mt-3 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">{matches.cities.map((city) => <div key={city.slug} className="bg-background p-4"><strong>{city.name}</strong><span className="mt-1 block text-sm text-muted-foreground">{city.county} County · {city.region}</span></div>)}</div></div>}

          {countyRecords.length > 0 && <div className="mt-8"><h3 className="font-display text-2xl">County research paths</h3><div className="mt-3 divide-y divide-border border-y border-border">{countyRecords.map((record) => <CountyResult key={record.slug} kind={kind} record={record} />)}</div></div>}
        </div>
      </section>

      <OfficialActions kind={kind} />

      <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">Next steps</p><h2 className="mt-2 font-display text-3xl">Keep the move connected</h2></div>
        <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          <Link to="/moving-to-texas-checklist" className="group bg-background p-5"><strong className="font-display text-xl group-hover:text-primary">Moving-to-Texas checklist</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Keep paperwork, services, housing and first-month tasks in one sequence.</span></Link>
          <Link to="/browse/cities" className="group bg-background p-5"><strong className="font-display text-xl group-hover:text-primary">Browse Texas cities</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Compare city and county context before narrowing to an address.</span></Link>
          <Link to="/browse/counties" className="group bg-background p-5"><strong className="font-display text-xl group-hover:text-primary">Browse all 254 counties</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Open the statewide county reference layer.</span></Link>
          <Link to="/decide/financial-tools" className="group bg-background p-5"><strong className="font-display text-xl group-hover:text-primary">Texas financial tools</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Model the recurring budget after the address research is done.</span></Link>
        </div>
      </section>
    </article>
  </Container>;
}

function CountyResult({ kind, record }: { kind: RelocationFinderKind; record: (typeof COUNTY_PROPERTY_RECORDS)[number] }) {
  const localLinks: Array<[string, string]> = [];
  if (kind === 'county') localLinks.push(['Open county guide', `/county/${record.slug}`]);
  if (kind === 'homestead') {
    localLinks.push(['TexasDefined homestead guide', '/do/homestead-exemption']);
    if (record.links.exemptionUrl) localLinks.push(['County exemption page', record.links.exemptionUrl]);
    else if (record.appraisalDistrict.websiteUrl) localLinks.push(['Appraisal district website', record.appraisalDistrict.websiteUrl]);
  }
  if (kind === 'property-tax') {
    localLinks.push(['County property-tax guide', `/property-tax/county/${record.slug}`]);
    if (record.links.propertySearchUrl) localLinks.push(['Property search', record.links.propertySearchUrl]);
    if (record.appraisalDistrict.websiteUrl) localLinks.push(['Appraisal district', record.appraisalDistrict.websiteUrl]);
    if (record.taxOffice.websiteUrl) localLinks.push(['County tax office', record.taxOffice.websiteUrl]);
  }
  if (kind === 'voter' || kind === 'emergency' || kind === 'utilities' || kind === 'school') localLinks.push(['Open county guide', `/county/${record.slug}`]);

  return <div className="py-5">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><h4 className="font-display text-2xl">{record.name}</h4><p className="mt-1 text-sm text-muted-foreground">FIPS {record.fips ?? '—'}{record.majorCities.length ? ` · ${record.majorCities.slice(0, 4).join(', ')}` : ''}</p></div>{record.lastVerifiedAt && <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Local property sources checked {record.lastVerifiedAt}</span>}</div>
    <div className="mt-4 flex flex-wrap gap-2">{localLinks.map(([label, href]) => href.startsWith('http') ? <a key={`${label}-${href}`} href={href} target="_blank" rel="noreferrer noopener" className="border border-border px-3 py-2 text-sm font-semibold hover:border-primary">{label} ↗</a> : <a key={`${label}-${href}`} href={href} className="border border-border px-3 py-2 text-sm font-semibold hover:border-primary">{label} →</a>)}</div>
  </div>;
}

function OfficialActions({ kind }: { kind: RelocationFinderKind }) {
  let title = 'Finish with the official source';
  let copy = 'TexasDefined helps organize the research. The agency or local office remains the source of record for address-level service boundaries, eligibility and registration status.';
  let actions: Array<ReturnType<typeof externalButton>> = [];

  if (kind === 'school') actions = [externalButton('Open TEA district locator', OFFICIAL.schoolLocator), externalButton('School & district information', OFFICIAL.teaDirectory)];
  if (kind === 'utilities') actions = [externalButton('Find water / sewer by address', OFFICIAL.pucWater), externalButton('Open PUCT water & sewer map', OFFICIAL.pucWaterMap), externalButton('Shop electricity where available', OFFICIAL.powerToChoose)];
  if (kind === 'voter') actions = [externalButton('Check My Voter Portal', OFFICIAL.voterPortal), externalButton('Texas voter-registration rules', OFFICIAL.voterRegistration)];
  if (kind === 'homestead') actions = [externalButton('Texas property-tax exemptions', OFFICIAL.comptrollerExemptions), externalButton('County appraisal-directory lookup', OFFICIAL.comptrollerCounty)];
  if (kind === 'property-tax') actions = [externalButton('Texas county property-tax directory', OFFICIAL.comptrollerCounty)];
  if (kind === 'emergency') {
    title = 'Immediate emergency or community help';
    copy = 'For a life-threatening or active emergency, call 911. For food, health, housing, disaster recovery and other community assistance, 2-1-1 Texas provides ZIP-based resource search.';
    actions = [externalButton('Search 2-1-1 Texas', OFFICIAL.texas211)];
  }
  if (kind === 'county') actions = [externalButton('Texas county websites directory', 'https://www.texas.gov/texas-county-websites.html')];

  return <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
    <div><p className="eyebrow text-primary">Source of record</p><h2 className="mt-2 font-display text-3xl">{title}</h2></div>
    <div><p className="max-w-3xl text-sm leading-7 text-muted-foreground">{copy}</p><div className="mt-5 flex flex-wrap gap-3">{actions}</div></div>
  </section>;
}
