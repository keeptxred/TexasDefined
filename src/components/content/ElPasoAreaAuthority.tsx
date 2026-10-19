/**
 * El Paso-area editorial navigation. Keep geography scoped to verified El Paso
 * destinations; the generic West Texas region is not a proximity signal.
 * These URLs correspond to published TexasDefined guides.
 */
type LinkRecord = { href: string; label: string; copy: string };
const core: LinkRecord[] = [
  { href: '/metro-area/el-paso-metro', label: 'El Paso metropolitan area', copy: 'Two-county statistical metro, regional travel and transportation context.' },
  { href: '/city/el-paso', label: 'El Paso city guide', copy: 'Explore districts, municipal systems and places within the city.' },
  { href: '/county/el-paso', label: 'El Paso County guide', copy: 'County history, communities, records and local destinations.' },
  { href: '/county/hudspeth', label: 'Hudspeth County guide', copy: 'The second Texas county in the federally defined El Paso metro.' },
  { href: '/article/moving-to-el-paso-guide', label: 'Moving to El Paso', copy: 'Compare the mountain corridors, utilities, schools and daily commutes.' },
  { href: '/article/el-camino-real-de-tierra-adentro-national-historic-trail', label: 'El Camino Real de Tierra Adentro', copy: 'Understand the historic El Paso mission and trade corridor.' },
];
const outdoors: LinkRecord[] = [
  { href: '/destination/franklin-mountains-state-park', label: 'Franklin Mountains State Park', copy: 'Desert trails and overlooks above the city.' },
  { href: '/destination/hueco-tanks-state-park-and-historic-site', label: 'Hueco Tanks State Park', copy: 'Protected rock art, climbing and advance-planning rules east of El Paso.' },
];
const heritage: LinkRecord[] = [
  { href: '/destination/chamizal-national-memorial', label: 'Chamizal National Memorial', copy: 'International boundary history and cultural programs.' },
  { href: '/destination/magoffin-home', label: 'Magoffin Home', copy: 'Adobe architecture and El Paso borderlands history.' },
  { href: '/destination/old-socorro-mission', label: 'Old Socorro Mission', copy: 'Historic mission landscape in Socorro and the Lower Valley.' },
  { href: '/destination/hotel-paso-del-norte', label: 'Hotel Paso del Norte', copy: 'The historic downtown hotel and its restored dome.' },
  { href: '/destination/ysleta-del-sur-pueblo-cultural-center-museum-el-paso', label: 'Ysleta del Sur Pueblo Cultural Center', copy: 'Living Tigua cultural interpretation and history.' },
];
const museums: LinkRecord[] = [
  { href: '/destination/el-paso-museum-of-art', label: 'El Paso Museum of Art', copy: 'Downtown galleries and changing exhibitions.' },
  { href: '/destination/el-paso-museum-of-archaeology', label: 'El Paso Museum of Archaeology', copy: 'Indigenous history and desert trails near the Franklin Mountains.' },
];
const guideSources = [
  { label: 'HUD: 2025 El Paso housing-market analysis', href: 'https://www.huduser.gov/portal/publications/pdf/ElPasoTX-CHMA-25.pdf' },
  { label: 'U.S. Census: El Paso County', href: 'https://www.census.gov/quickfacts/fact/table/elpasocountytexas/PST045225' },
  { label: 'U.S. Census: Hudspeth County', href: 'https://www.census.gov/quickfacts/fact/table/hudspethcountytexas/POP815224' },
  { label: 'El Paso MPO: about the planning area', href: 'https://www.elpasompo.org/AboutUs' },
  { label: 'Sun Metro: routes and trip planning', href: 'https://sunmetro.net/how-to/plan-your-trip' },
];

function GuideCards({ items }: { items: readonly LinkRecord[] }) {
  return <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((item) => <a key={item.href} href={item.href} className="border border-border p-5 transition-colors hover:border-primary/60">
      <strong className="block font-display text-xl leading-tight">{item.label}</strong>
      <span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.copy}</span>
      <span className="mt-4 block text-sm font-semibold text-primary">Explore guide →</span>
    </a>)}
  </div>;
}

/** Dedicated metro editorial content: never replace this with generic entity filler. */
export function ElPasoMetroGuide() {
  return <>
    <section className="border-b border-border py-12" aria-labelledby="el-paso-metro-geography">
      <p className="eyebrow text-primary">Metro geography, explained</p>
      <h2 id="el-paso-metro-geography" className="mt-3 font-display text-4xl">What counts as the El Paso metro?</h2>
      <p className="mt-5 max-w-4xl text-base leading-8 text-muted-foreground">
        El Paso is a borderland metropolitan area at the western tip of Texas, between the Franklin Mountains,
        the Rio Grande, New Mexico and Ciudad Juárez. It is in the Mountain Time Zone, unlike most of Texas.
        The federally defined El Paso, TX Metropolitan Statistical Area (MSA) includes <strong>El Paso County and
        Hudspeth County</strong>. The counties counted 865,657 and 3,202 people respectively in the 2020
        Census—a combined <strong>868,859 people in 2020</strong>, not a current population estimate.
      </p>
      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <article className="border-l-2 border-primary bg-surface p-6">
          <h3 className="font-display text-2xl">Metropolitan Statistical Area</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Federal statistics and economic data: El Paso and Hudspeth counties in Texas. Use this definition
            when comparing population, housing or employment figures across U.S. metros.
          </p>
          <a href="https://www.huduser.gov/portal/publications/pdf/ElPasoTX-CHMA-25.pdf" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-primary underline">HUD area definition ↗</a>
        </article>
        <article className="border-l-2 border-primary bg-surface p-6">
          <h3 className="font-display text-2xl">El Paso MPO planning area</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            A different transportation-planning geography: El Paso County plus southern Doña Ana County
            and a small portion of Otero County in New Mexico. This is <strong>not</strong> the same
            boundary as the Texas statistical metro.
          </p>
          <a href="https://www.elpasompo.org/AboutUs" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-primary underline">Official MPO description ↗</a>
        </article>
      </div>
    </section>
    <section className="border-b border-border py-12" aria-labelledby="el-paso-metro-communities">
      <p className="eyebrow text-primary">Across the valley</p>
      <h2 id="el-paso-metro-communities" className="mt-3 font-display text-4xl">Cities, towns and counties</h2>
      <p className="mt-4 max-w-4xl leading-8 text-muted-foreground">
        The city of El Paso is the urban core. Elsewhere in El Paso County, the Lower Valley and
        surrounding communities include Socorro, San Elizario and Clint; Horizon City lies to the east,
        while Anthony and Vinton sit northwest toward the New Mexico line. These are separate municipal
        jurisdictions, not El Paso city neighborhoods. Hudspeth County extends far to the east and is
        much more rural. Neighboring Las Cruces and Ciudad Juárez are essential to the broader binational
        region but are <strong>not</strong> Texas counties within the El Paso MSA.
      </p>
      <GuideCards items={core.slice(1, 4)} />
    </section>
    <section className="border-b border-border py-12" aria-labelledby="el-paso-metro-visit">
      <p className="eyebrow text-primary">Plan a real itinerary</p>
      <h2 id="el-paso-metro-visit" className="mt-3 font-display text-4xl">Where to explore in and around El Paso</h2>
      <p className="mt-4 max-w-4xl leading-8 text-muted-foreground">
        Combine sites by geography rather than treating Far West Texas as a compact urban district.
        Downtown museums and borderlands history make one cluster; the Franklin Mountains and Hueco Tanks
        require their own outdoor planning. The Lower Valley mission corridor is another distinct outing.
        Always confirm weather, park permits and the relevant site's current access rules.
      </p>
      <h3 className="mt-9 font-display text-2xl">Mountains and desert</h3>
      <GuideCards items={outdoors} />
      <h3 className="mt-10 font-display text-2xl">History, architecture and the mission corridor</h3>
      <GuideCards items={heritage} />
      <h3 className="mt-10 font-display text-2xl">Museums</h3>
      <GuideCards items={museums} />
    </section>
    <section className="border-b border-border py-12" aria-labelledby="el-paso-metro-living">
      <p className="eyebrow text-primary">Daily life and getting around</p>
      <h2 id="el-paso-metro-living" className="mt-3 font-display text-4xl">Transportation, employment and moving</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <article>
          <h3 className="font-display text-2xl">Mountains shape the commute</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            I-10, US 54, Loop 375 and the mountain passes organize east-west and north-south travel.
            Start with the actual destination—Fort Bliss, UTEP, the airport, a hospital or a worksite—
            and test a commute at the hour you would travel. Cross-border port-of-entry waits vary
            independently of local road conditions.
          </p>
        </article>
        <article>
          <h3 className="font-display text-2xl">Use live transit information</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Sun Metro operates city bus services and the downtown/uptown streetcar. Timetables, service
            areas and detours change, so use its trip planner rather than assuming a metro-wide
            rail network or a direct bus to every surrounding town.
          </p>
          <a href="https://sunmetro.net/how-to/plan-your-trip" className="mt-3 inline-block text-sm font-semibold text-primary underline" target="_blank" rel="noopener noreferrer">Sun Metro trip planner ↗</a>
        </article>
        <article>
          <h3 className="font-display text-2xl">Economy and jobs</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Fort Bliss, health care, education, logistics, cross-border commerce and tourism are
            important parts of the regional economy. Use published BLS data for unemployment and
            employment trends; do not mistake jobs in the international borderplex for jobs inside
            the U.S. statistical metro.
          </p>
          <a href="https://www.bls.gov/regions/southwest/data/employmentandunemploymentandwages_elpaso_table.htm" className="mt-3 inline-block text-sm font-semibold text-primary underline" target="_blank" rel="noopener noreferrer">BLS El Paso data ↗</a>
        </article>
        <article>
          <h3 className="font-display text-2xl">Choose the address, not just the metro</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            City limits, schools, electric and water service, county offices and property-tax jurisdictions
            are separate systems. Verify them for the specific property before using a cost or service
            estimate. Outdoor cooling needs and desert water use belong in a relocation budget.
          </p>
          <a href="/article/moving-to-el-paso-guide" className="mt-3 inline-block text-sm font-semibold text-primary underline">Moving to El Paso guide →</a>
        </article>
      </div>
    </section>
    <section className="border-b border-border py-12" aria-labelledby="el-paso-metro-sources">
      <p className="eyebrow text-primary">Sources and boundaries</p>
      <h2 id="el-paso-metro-sources" className="mt-3 font-display text-3xl">Official data used for this guide</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        County population figures are the 2020 decennial Census baseline, not a projected 2026 total.
        Administrative, planning and cross-border regions are not interchangeable.
      </p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {guideSources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary underline underline-offset-4">{source.label} ↗</a></li>)}
      </ul>
    </section>
  </>;
}

export function ElPasoAreaCrossLinks({ kind, slug }: { kind: string; slug: string }) {
  const path = '/' + kind + '/' + slug;
  const isMetro = kind === 'metro-area' && slug === 'el-paso-metro';
  const isCounty = kind === 'county' && (slug === 'el-paso' || slug === 'hudspeth');
  const isCity = kind === 'city' && slug === 'el-paso';
  const isRelevantArticle = kind === 'article' && (slug.includes('el-paso') || slug === 'el-camino-real-de-tierra-adentro-national-historic-trail' || slug === 'texas-borderlands-historic-sites-guide');
  const isRelevantDestination = kind === 'destination';
  if (!isMetro && !isCounty && !isCity && !isRelevantArticle && !isRelevantDestination) return null;

  const isOutdoor = /franklin|hueco|mountain|tank|park/.test(slug);
  const isHistoric = /mission|chamizal|magoffin|hotel|ysleta|camino|borderland/.test(slug);
  const ordered = isMetro
    ? [core[1], core[2], core[3], core[4], core[5]]
    : isCounty || isCity
      ? [...core, ...(isCounty && slug === 'hudspeth' ? outdoors : heritage.slice(0, 2))]
      : [core[0], core[1], core[2], isRelevantArticle ? core[4] : core[5],
        ...(isOutdoor ? outdoors : isHistoric ? heritage : museums), ...(isRelevantArticle ? outdoors : [])];

  const items = [...new Map(ordered.filter((item) => item.href !== path).map((item) => [item.href, item])).values()].slice(0, isMetro ? 5 : 7);
  if (!items.length) return null;
  return <nav className="border-b border-border py-10" aria-label="Explore the El Paso area on Texas Defined">
    <p className="eyebrow text-primary">Explore the El Paso area</p>
    <h2 className="mt-2 font-display text-3xl">Connected El Paso guides</h2>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
      Continue to the matching city, county, metro, visitor and relocation guide. Geography is
      intentional: local destinations are not selected simply because they share the broad West Texas label.
    </p>
    <GuideCards items={items} />
  </nav>;
}
