import { lazy, Suspense, useEffect } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { AutoEntityLinks } from '@/components/content/AutoEntityLinks';
import { CountyCoastalPlaces } from '@/components/content/CountyCoastalPlaces';
import { CountyGuideSections } from '@/components/content/CountyGuideSections';
import { EntityDepthSections } from '@/components/content/EntityDepthSections';
import { WildlifeDepthSections } from '@/components/content/WildlifeDepthSections';
import { Container } from '@/components/layout/Container';
import { CountySportsDestinations } from '@/components/sports/CountySportsDestinations';
import {
  canonicalEntityPath,
  type RankedRelatedEntity,
} from '@/data/knowledge-graph/relationships';
import type { TexasEntityRecord } from '@/data/knowledge-graph/types';

const CityPassContextualCallout = lazy(() =>
  import('@/components/monetization/CityPassContextualCallout').then((module) => ({
    default: module.CityPassContextualCallout,
  })),
);
const EntityFoodDestinations = lazy(() =>
  import('@/components/content/EntityFoodDestinations').then((module) => ({
    default: module.EntityFoodDestinations,
  })),
);
const CountyHighSchoolFootball = lazy(() =>
  import('@/components/sports/CountyHighSchoolFootball').then((module) => ({
    default: module.CountyHighSchoolFootball,
  })),
);

// Independently sourced municipal associations, only for Batch 002 programs
// with confirmed campus city and an existing canonical TexasDefined city guide.
const batch002FootballCityLinks: Record<string, { name: string; slug: string; context: string }[]> = {
  houston: [
    { name: 'Alief Elsik Rams', slug: 'alief-elsik', context: 'Houston Alief ISD football, with sourced 2026 program and postseason history.' },
    { name: 'Alief Hastings Fighting Bears', slug: 'alief-hastings', context: 'The Houston program’s verified 1997 state-final appearance and current district context.' },
    { name: 'Alief Taylor Lions', slug: 'alief-taylor', context: 'Houston Alief ISD campus, current UIL placement and dated team results.' },
  ],
  'fort-worth': [
    { name: 'All Saints Episcopal Saints', slug: 'all-saints-fort-worth', context: 'Fort Worth school and McNair Stadium, with sourced TAPPS championship history.' },
  ],
};

// Exactly five independently researched football authority entries; campus county, not postal city or school-district footprint.
const batch001FootballCountyLinks: Record<string, { name: string; href: string; description: string; campusCountySource: string }> = {
  'van-zandt': {
    name: 'Wills Point Tigers',
    href: '/texas-high-school-football-teams/wills-point',
    description: 'Explore the Tigers’ 1965 state championship, James Boxley coaching record and Ken Autry Davis Field.',
    campusCountySource: 'https://nces.ed.gov/globallocator/index.asp?CS=2DB804E&College=1&Library=1&PrivSchool=1&School=1&State=&city=&itemname=poi&miles=&search=1&sortby=name&zipcode=',
  },
  hill: {
    name: 'Abbott Panthers',
    href: '/texas-high-school-football-teams/abbott',
    description: 'Follow Abbott’s six-man state finals, 2015 championship and the archival football story of alumnus Willie Nelson.',
    campusCountySource: 'https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=480738000006',
  },
  'fort-bend': {
    name: 'Katy Tigers',
    href: '/texas-high-school-football-teams/katy',
    description: 'Katy High School’s campus is in Fort Bend County; explore nine football state titles and verified 2026 team resources.',
    campusCountySource: 'https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=482517002809',
  },
  'jeff-davis': {
    name: 'Fort Davis Indians',
    href: '/texas-high-school-football-teams/fort-davis',
    description: 'Read the 2003 six-man championship-game history and the district’s announced cancellation of its 2026 season.',
    campusCountySource: 'https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?DistrictID=4820100&ID=482010001962&Search=1',
  },
  taylor: {
    name: 'Abilene High Eagles',
    href: '/texas-high-school-football-teams/abilene',
    description: 'Explore Abilene High’s seven state football titles, historic 49-game winning streak and Shotwell Stadium visitor information.',
    campusCountySource: 'https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=480744000010',
  },
  nueces: {
    name: 'Agua Dulce Longhorns',
    href: '/texas-high-school-football-teams/agua-dulce',
    description: 'Read the Longhorns’ 2026 coaching, recent playoffs and state-registered football-field improvement research before planning a game-day visit.',
    campusCountySource: 'https://www.tdlr.texas.gov/TABS/Search/Print/TABS2026016320',
  },
  harris: {
    name: 'Alief Elsik Rams',
    href: '/texas-high-school-football-teams/alief-elsik',
    description: 'Explore Elsik’s 1990s UIL postseason record, 2026 coaching research and Alief district football.',
    campusCountySource: 'https://www.maxpreps.com/tx/houston/alief-elsik-rams/football/schedule/',
  },
  'jim-wells': {
    name: 'Alice Coyotes',
    href: '/texas-high-school-football-teams/alice',
    description: 'Explore Alice’s September 2026 Memorial Stadium, Joe Castellano and current district competition.',
    campusCountySource: 'https://www.tdlr.texas.gov/TABS/Search/Project/TABS2025013898',
  },
  parker: {
    name: 'Aledo Bearcats',
    href: '/texas-high-school-football-teams/aledo',
    description: 'Discover twelve UIL titles, the 2026 Class 6A transition and Tim Buchanan Stadium.',
    campusCountySource: 'https://ahs.aledoisd.org/parents-students/aledo-high-school-graduation-information/class-of-2026-graduation',
  },
  shackelford: {
    name: 'Albany Lions',
    href: '/texas-high-school-football-teams/albany',
    description: 'Research Albany’s four championships, coach Denney Faith and Robert Nail Stadium.',
    campusCountySource: 'https://rptsvr1.tea.texas.gov/cgi/sas/broker?_debug=0&_program=perfrept.perfmast.sas&_service=marykay&ccyy=2026&dds_report=D9&id=209901001&lev=C&prgopt=reports%2Facct%2Fdistinctions.sas',
  },
  wood: {
    name: 'Alba-Golden Panthers',
    href: '/texas-high-school-football-teams/alba-golden',
    description: 'Read about the Panthers’ 2023 seven-win season, Drew Webster and 2026 district.',
    campusCountySource: 'https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?County=Wood+County&ID=480765000053&Search=1&State=48',
  },
  dawson: {
    name: 'Ackerly Sands Mustangs',
    href: '/texas-high-school-football-teams/ackerly-sands',
    description: 'Discover the Ackerly Sands six-man tradition, 2025 area-round heartbreak, 2026 Billy Grumbles coaching change and UIL Division I opponents.',
    campusCountySource: 'https://nces.ed.gov/ccd/districtsearch/district_detail.asp?ID2=4839120&Miles=20&Search=1&Zip=79749',
  },
  hale: {
    name: 'Abernathy Antelopes',
    href: '/texas-high-school-football-teams/abernathy',
    description: 'Explore Abernathy’s historic 1980s district-title streak, 2016 state-semifinal run and 2026 Antelopes leadership.',
    campusCountySource: 'https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=480741000008',
  },
  tarrant: {
    name: 'Southlake Carroll Dragons',
    href: '/texas-high-school-football-teams/southlake-carroll',
    description: 'Research eight actual state titles, the disputed 2003 UIL summary and the Dragons’ 2026 leadership.',
    campusCountySource: 'https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=481302000791',
  },
};

// Additional independently researched Batch 002 school links. Lists retain
// multiple teams in the same county rather than replacing an existing card.
const batch002FootballCountyLinks: Record<string, Array<{ name: string; slug: string; context: string }>> = {
  harris: [{ name: 'Alief Taylor Lions', slug: 'alief-taylor', context: '2026 District 20 opening streak and documented Elsik and Hastings games' }],
  tarrant: [{ name: "Fort Worth All Saints' Episcopal Saints", slug: 'all-saints-fort-worth', context: 'Back-to-back 2024–25 undefeated TAPPS Division II champions at McNair Stadium' }],
  collin: [{ name: 'Allen Eagles', slug: 'allen', context: 'Five UIL state titles, historic Kyler Murray era and 2026 Eagle Stadium visitor guidance' }],
  brewster: [{ name: 'Alpine Bucks', slug: 'alpine', context: 'Big Bend-area Bucks football, current alignment and Buck Stadium research' }],
  colorado: [{ name: 'Rice Consolidated Raiders', slug: 'altair-rice', context: 'Altair Raiders playoff tradition and 2026 District 14 games' }],
  cherokee: [{ name: 'Alto Yellowjackets', slug: 'alto', context: '2006 and 2007 consecutive UIL football state champions' }],
  johnson: [{ name: 'Alvarado Indians', slug: 'alvarado', context: '2024 and 2025 playoff seasons and current District 4 football' }],
  brazoria: [
    { name: 'Alvin Yellowjackets', slug: 'alvin', context: 'Alvin High football history and 2026 Class 6A District 19' },
    { name: 'Iowa Colony Pioneers', slug: 'alvin-iowa-colony', context: 'Three consecutive twelve-win seasons from 2023 to 2025' },
    { name: 'Shadow Creek Sharks', slug: 'alvin-shadow-creek', context: '2018 state runner-up and 2019 UIL football state champions' },
  ],
  wise: [{ name: 'Alvord Bulldogs', slug: 'alvord', context: '2025 undefeated district run and 2026 home ticket details' }],
  randall: [{ name: 'Amarillo High Sandies', slug: 'amarillo', context: 'Four UIL state titles and the documented Sandies–Tascosa football series' }],
};

const siteUrl = 'https://texasdefined.com';
const localGovernmentKinds = new Set(['county', 'appraisal-district', 'tax-office', 'county-clerk', 'dps-office']);
const referenceKinds = new Set([...localGovernmentKinds, 'agency']);

export const Route = createLazyFileRoute('/$kind/$slug')({ component: EntityPage });

function EntityPage() {
  const { entity, related, countyProfile, localGovernment, countySeriesArticle, countySportsVenues, foodDestinations } = Route.useLoaderData();
  // All canonical city and county routes wait for React hydration before
  // first-party affiliate scripts modify the route's DOM. Preserve the
  // established readiness signal for backward compatibility with county QA.
  useEffect(() => {
    if (entity.kind !== 'county' && entity.kind !== 'city') return;
    document.documentElement.dataset.tdFootballCountyHydrated = '1';
    window.dispatchEvent(new Event('texasdefined:county-hydrated'));
    return () => { delete document.documentElement.dataset.tdFootballCountyHydrated; };
  }, [entity.kind, entity.slug]);
  const visibleRelated = relatedForDisplay(entity, related);
  const batch001FootballLink = entity.kind === 'county' ? batch001FootballCountyLinks[entity.slug] : undefined;
  const relatedEntities = visibleRelated.map((item) => item.entity);
  const description = entity.kind === 'county' && countySeriesArticle?.dek ? countySeriesArticle.dek : pageDescription(entity);
  const canonicalPath = canonicalEntityPath(entity);
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const incomplete = !entity.description;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': schemaType(entity.kind),
        '@id': `${canonicalUrl}#entity`,
        name: entity.name,
        alternateName: entity.aliases.length ? entity.aliases : undefined,
        description,
        url: canonicalUrl,
        sameAs: entity.officialUrl ? [entity.officialUrl] : undefined,
        geo: entity.coordinates ? { '@type': 'GeoCoordinates', latitude: entity.coordinates.latitude, longitude: entity.coordinates.longitude } : undefined,
        containedInPlace: entity.kind === 'city'
          ? entity.region ? { '@type': 'AdministrativeArea', name: title(entity.region) } : undefined
          : entity.countySlug ? { '@type': 'AdministrativeArea', name: `${title(entity.countySlug)} County` } : entity.region ? { '@type': 'Place', name: title(entity.region) } : undefined,
        ...(entity.kind === 'county' && countyProfile ? {
          additionalProperty: [
            countyProfile.countySeat ? { '@type': 'PropertyValue', name: 'County seat', value: countyProfile.countySeat } : undefined,
            countyProfile.population2020 != null ? { '@type': 'PropertyValue', name: '2020 Census population', value: countyProfile.population2020 } : undefined,
            countyProfile.landAreaSquareMiles != null ? { '@type': 'PropertyValue', name: 'Land area (square miles)', value: Math.round(countyProfile.landAreaSquareMiles) } : undefined,
          ].filter(Boolean),
        } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: breadcrumbSection(entity.kind), item: `${siteUrl}/explore` },
          { '@type': 'ListItem', position: 3, name: entity.name, item: canonicalUrl },
        ],
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <a href="/" className="hover:text-foreground">Front page</a>
          <span aria-hidden="true" className="mx-2">/</span>
          <a href="/explore" className="hover:text-foreground">{breadcrumbSection(entity.kind)}</a>
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-foreground">{entity.name}</span>
        </nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">{readerLabel(entity.kind)}</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{entity.name}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              <AutoEntityLinks text={description} entities={relatedEntities} maxLinks={4} policy={{ excludedEntityIds: [entity.id] }} />
            </p>
          </div>
          <dl className="border-y border-border py-4 text-sm lg:border-y-0 lg:border-l lg:py-0 lg:pl-6">
            <Fact label={entity.kind === 'county' ? 'Guide type' : entity.kind === 'city' ? 'Primary county context' : 'County'} value={entity.kind === 'county' ? 'Texas county guide' : entity.countySlug ? `${title(entity.countySlug)} County` : undefined} />
            {entity.kind === 'county' && countyProfile?.countySeat && <Fact label="County seat" value={countyProfile.countySeat} />}
            <Fact label="Part of Texas" value={entity.region ? title(entity.region) : undefined} />
            <Fact label="Source check" value={sourceStatus(entity)} />
            {entity.sourceCheckedAt && <Fact label="Last reviewed" value={formatCheckedDate(entity.sourceCheckedAt)} />}
          </dl>
        </header>

        {incomplete ? <section className="grid gap-6 border-b border-border py-8 lg:grid-cols-[14rem_1fr]">
          <div>
            <p className="eyebrow text-primary">{entity.kind === 'county' ? 'County reference' : 'Verified information'}</p>
            <h2 className="mt-3 font-display text-3xl">{statusHeading(entity)}</h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-base leading-7 text-muted-foreground">{statusMessage(entity)}</p>
          </div>
        </section> : null}

        <div className="flex flex-wrap gap-x-7 gap-y-3 border-b border-border py-5 text-sm font-semibold">
          {entity.officialUrl && <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href={entity.officialUrl} target="_blank" rel="noreferrer">{officialLinkLabel(entity.kind)} ↗</a>}
          {entity.coordinates && <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href={`https://www.google.com/maps/search/?api=1&query=${entity.coordinates.latitude},${entity.coordinates.longitude}`} target="_blank" rel="noreferrer">Open in maps ↗</a>}
        </div>

        {entity.kind === 'city' ? <Suspense fallback={null}><CityPassContextualCallout surface="city" slug={entity.slug} /></Suspense> : null}
        {entity.kind === 'county' && countyProfile && localGovernment ? <CountyGuideSections entity={entity} profile={countyProfile} localGovernment={localGovernment} related={related} countySeriesArticle={countySeriesArticle} /> : null}
        {(entity.kind === 'city' || entity.kind === 'county') && foodDestinations.length ? <Suspense fallback={null}><EntityFoodDestinations entity={entity} destinations={foodDestinations} /></Suspense> : null}
        {entity.kind === 'county' ? <CountyCoastalPlaces county={entity} /> : null}
        {entity.kind === 'county' ? <CountySportsDestinations county={entity} venues={countySportsVenues} /> : null}
        {entity.kind === 'county' ? <Suspense fallback={null}><CountyHighSchoolFootball county={entity} /></Suspense> : null}
        {entity.kind === 'county' && batch002FootballCountyLinks[entity.slug] ? <section aria-label="Independent football histories from this county" className="border-b border-border py-9">
          <p className="eyebrow text-primary">Researched local football programs</p>
          <h2 className="mt-2 font-display text-3xl">Football history connected to {entity.name}</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {batch002FootballCountyLinks[entity.slug].map((school) => <li key={school.slug} className="rounded-lg border border-border p-4">
              <a className="font-semibold text-primary underline underline-offset-4" href={`/texas-high-school-football-teams/${school.slug}`}>{school.name} football authority guide →</a>
              <p className="mt-2 text-sm text-muted-foreground">{school.context}</p>
            </li>)}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">Independent editorial guides. Game sites and district boundaries may span county lines; each listed school is linked by its campus county.</p>
        </section> : null}
        {entity.kind === 'city' && batch002FootballCityLinks[entity.slug] ? <section aria-label="Individually researched local high school football" className="border-b border-border py-9">
          <p className="eyebrow text-primary">Researched local football programs</p>
          <h2 className="mt-2 font-display text-3xl">Football history in {entity.name}</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {batch002FootballCityLinks[entity.slug].map((school) => <li key={school.slug} className="rounded-lg border border-border p-4">
              <a className="font-semibold text-primary underline underline-offset-4" href={`/texas-high-school-football-teams/${school.slug}`}>{school.name} football profile →</a>
              <p className="mt-2 text-sm text-muted-foreground">{school.context}</p>
            </li>)}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">Campus-city links do not certify game-day stadium entrances or district-wide service areas.</p>
        </section> : null}
        {batch001FootballLink ? <section aria-label="Researched high school football history from this county" className="grid gap-6 border-b border-border py-10 lg:grid-cols-[14rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Local football history</p>
            <h2 className="mt-2 font-display text-3xl">A researched school program</h2>
          </div>
          <div className="max-w-3xl">
            <a href={batch001FootballLink.href} className="text-lg font-semibold text-primary underline underline-offset-4">{batch001FootballLink.name} football profile →</a>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{batch001FootballLink.description}</p>
            <p className="mt-2 text-xs text-muted-foreground">Campus county checked against <a href={batch001FootballLink.campusCountySource} target="_blank" rel="noreferrer noopener" className="underline underline-offset-4">federal school records ↗</a>. This independent football guide is not an official school website.</p>
            {entity.kind === 'county' && entity.slug === 'harris' && <div className="mt-6 border-t border-border pt-5">
              <a href="/texas-high-school-football-teams/alief-hastings" className="text-lg font-semibold text-primary underline underline-offset-4">Alief Hastings Fighting Bears football history →</a>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">Explore Hastings’ documented 1997 5A Division II state-final appearance, coach Michael Carter, 2026 District 20 and Crump Stadium visitor resources.</p>
              <p className="mt-2 text-xs text-muted-foreground">Separate Alief ISD program from neighboring Alief Elsik and Alief Taylor. <a className="underline underline-offset-4" href="https://www.uiltexas.org/historical-archives/athletics/archives/football/champions.html" target="_blank" rel="noreferrer noopener">UIL final record ↗</a></p>
            </div>}
            {entity.kind === 'county' && entity.slug === 'taylor' && <div className="mt-6 border-t border-border pt-5">
              <a href="/texas-high-school-football-teams/abilene-wylie" className="text-lg font-semibold text-primary underline underline-offset-4">Abilene Wylie Bulldogs football profile →</a>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">Follow the Bulldogs' 2004 football state title, four UIL title-game appearances, Clay Martin and Hugh Sandifer Stadium at the Wylie High campus.</p>
              <p className="mt-2 text-xs text-muted-foreground">The Wylie High campus is independently documented in Taylor County by <a href="https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=484650005293" target="_blank" rel="noreferrer noopener" className="underline underline-offset-4">NCES official 2025–26 school records ↗</a>. Independent coverage, not a school website.</p>
            </div>}
            {entity.kind === 'county' && entity.slug === 'taylor' && <div className="mt-6 border-t border-border pt-5">
              <a href="/texas-high-school-football-teams/abilene-texas-leadership" className="text-lg font-semibold text-primary underline underline-offset-4">Texas Leadership of Abilene Eagles football →</a>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">Explore Abilene's younger public-charter program, the fifth season of eleven-man football and 2026 head coach Webb Murphy.</p>
              <p className="mt-2 text-xs text-muted-foreground">The <a href="https://www.texasleadershipabilene.com/campus/secondary-campus" target="_blank" rel="noreferrer noopener" className="underline underline-offset-4">official secondary campus</a> is in Abilene, Taylor County; the network's San Angelo headquarters must not be confused with the Abilene football school.</p>
            </div>}
            {entity.kind === 'county' && entity.slug === 'taylor' && <div className="mt-6 border-t border-border pt-5">
              <a href="/texas-high-school-football-teams/abilene-cooper" className="text-lg font-semibold text-primary underline underline-offset-4">Abilene Cooper Cougars football profile →</a>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">Discover the Cougars' 1967 and 1996 state-final appearances, the 1961-origin Crosstown Showdown and 2026 head coach Scott Stewart.</p>
              <p className="mt-2 text-xs text-muted-foreground">Cooper's Taylor County campus confirmed by <a href="https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=480744000016" target="_blank" rel="noreferrer noopener" className="underline underline-offset-4">NCES school record ↗</a>. Independent editorial, not an official athletic department.</p>
            </div>}
          </div>
        </section> : null}
        {entity.kind === 'wildlife-species' ? <WildlifeDepthSections entity={entity} related={visibleRelated} /> : entity.kind !== 'county' ? <EntityDepthSections entity={entity} related={visibleRelated} /> : null}

        {entity.kind !== 'county' && entity.tags?.length ? <section className="grid gap-6 border-b border-border py-10 lg:grid-cols-[14rem_1fr]">
          <div>
            <p className="eyebrow text-primary">{notesEyebrow(entity.kind)}</p>
            <h2 className="mt-2 font-display text-3xl">{notesHeading(entity)}</h2>
          </div>
          <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {entity.tags.map((tag) => <li key={tag} className="border-t border-border py-3 text-sm font-medium">{title(tag)}</li>)}
          </ul>
        </section> : null}

      </article>
    </Container>
  </>;
}

function relatedForDisplay(entity: TexasEntityRecord, related: RankedRelatedEntity[]) {
  if (!localGovernmentKinds.has(entity.kind)) return related;
  const explicitTargets = new Set(entity.relationships.map((relationship) => relationship.targetId));
  return related.filter(({ entity: candidate }) =>
    explicitTargets.has(candidate.id)
    || candidate.relationships.some((relationship) => relationship.targetId === entity.id)
    || Boolean(entity.countySlug && (candidate.countySlug === entity.countySlug || (candidate.kind === 'county' && candidate.slug === entity.countySlug)))
    || (entity.kind === 'county' && (candidate.countySlug === entity.slug || explicitTargets.has(candidate.id))),
  ).slice(0, 6);
}

function pageDescription(entity: TexasEntityRecord) {
  if (entity.description) return entity.description;
  if (entity.kind === 'county') return `${entity.name} county guide from Texas Defined, combining verified geography, communities, Census facts and official local resources.`;
  if (entity.kind === 'appraisal-district') return `${entity.name} property appraisal reference from Texas Defined. Office details and service links are published only as they are verified against authoritative sources.`;
  if (entity.kind === 'tax-office') return `${entity.name} county tax office reference from Texas Defined. Taxpayer and vehicle-service details are published only after source verification.`;
  if (entity.kind === 'county-clerk') return `${entity.name} county clerk reference from Texas Defined. Public-service details are added after they are checked against authoritative local sources.`;
  if (entity.kind === 'dps-office') return `${entity.name} public-service reference from Texas Defined. Location and service information is added only after it is verified.`;
  return `${entity.name} is part of the Texas Defined reference guide. We are adding verified details before expanding this page into a full guide.`;
}

function statusHeading(entity: TexasEntityRecord) {
  if (entity.kind === 'county') return `About ${countyDisplayName(entity.name)}`;
  if (entity.kind === 'appraisal-district') return 'Verified appraisal-district information';
  if (entity.kind === 'tax-office') return 'Verified tax-office information';
  if (localGovernmentKinds.has(entity.kind)) return 'Verified public-service information';
  return 'What we can verify';
}

function statusMessage(entity: TexasEntityRecord) {
  if (entity.kind === 'county') return `Use this ${countyDisplayName(entity.name)} reference for the verified county facts, communities, official resources and local links currently available on Texas Defined. Additional local history and destination coverage appears only after it has been checked against reliable sources.`;
  if (entity.kind === 'appraisal-district') return `Use this ${entity.name} reference for the official contact and property-appraisal resources Texas Defined has verified. Details that cannot yet be confirmed are omitted.`;
  if (entity.kind === 'tax-office') return `Use this ${entity.name} reference for taxpayer, registration and local-service information verified against official sources. Unconfirmed details are omitted.`;
  if (localGovernmentKinds.has(entity.kind)) return `This public-service reference includes information verified against authoritative local sources. Details that have not been confirmed are intentionally left out.`;
  return `This reference includes the details Texas Defined can currently verify from reliable sources. Unverified details are intentionally omitted rather than replaced with generic information.`;
}

function countyDisplayName(value: string) {
  return / County$/i.test(value) ? value : `${value} County`;
}

function sourceStatus(entity: TexasEntityRecord) {
  if (entity.status === 'pending-source-verification') return 'Still being checked';
  if (entity.sourceConfidence === 'official') return 'Official source checked';
  if (entity.sourceConfidence === 'high') return 'Source checked';
  return 'Additional source';
}

function officialLinkLabel(kind: string) {
  if (kind === 'county') return 'Official county website';
  if (kind === 'agency') return 'Official agency website';
  if (kind === 'appraisal-district') return 'Official appraisal district';
  if (kind === 'tax-office') return 'Official tax office';
  if (kind === 'county-clerk') return 'Official county clerk';
  if (kind === 'dps-office') return 'Official DPS information';
  if (kind === 'wildlife-species') return 'TPWD species information';
  return 'Official information';
}

function notesEyebrow(kind: string) { return referenceKinds.has(kind) ? 'Guide notes' : 'Field notes'; }
function notesHeading(entity: TexasEntityRecord) {
  if (entity.kind === 'county') return 'What defines this county';
  if (entity.kind === 'agency') return 'What this agency handles';
  if (localGovernmentKinds.has(entity.kind)) return 'What this office handles';
  return `What defines ${entity.name}`;
}
function breadcrumbSection(kind: string) { return referenceKinds.has(kind) ? 'Texas reference' : 'Explore'; }

function Fact({ label, value }: { label: string; value?: string }) {
  return value ? <div className="border-b border-border py-3 last:border-b-0 lg:first:pt-0 lg:last:pb-0"><dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div> : null;
}
function title(value: string) { return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase()); }
function formatCheckedDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
function readerLabel(kind: string) {
  const labels: Record<string, string> = {
    county: 'County Guide', city: 'City Guide', region: 'Around the State', 'metro-area': 'City Life',
    agency: 'Texas State Agency',
    'appraisal-district': 'Property Appraisal', 'tax-office': 'County Tax Office', 'county-clerk': 'County Clerk', 'dps-office': 'DPS Office',
    museum: 'Museum Guide', 'historic-site': 'Then & Now', mission: 'Texas History', battlefield: 'Texas History',
    attraction: 'Worth the Drive', fair: 'Texas Calendar', rodeo: 'Texas Calendar', festival: 'Texas Calendar',
    'holiday-event': 'Seasonal Guide', 'sporting-event': 'The Texas Game', 'wildlife-species': 'Texas Wildlife',
  };
  return labels[kind] ?? title(kind);
}
function schemaType(kind: string) {
  if (kind === 'agency') return 'GovernmentOrganization';
  if (kind === 'city') return 'City';
  if (['county','region','metro-area'].includes(kind)) return 'AdministrativeArea';
  if (kind === 'museum') return 'Museum';
  if (['historic-site','mission','battlefield','attraction'].includes(kind)) return 'TouristAttraction';
  if (kind === 'wildlife-species') return 'Taxon';
  // Generic knowledge-graph records do not carry occurrence dates/locations.
  // Reserve Schema.org Event for dedicated /event/:slug pages with verified occurrence data.
  if (['fair','rodeo','festival','holiday-event','sporting-event'].includes(kind)) return 'Thing';
  return 'Place';
}
