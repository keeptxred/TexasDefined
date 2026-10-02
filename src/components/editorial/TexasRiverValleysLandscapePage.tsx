import { Link } from '@tanstack/react-router';

import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Section, SectionHeader } from '@/components/editorial/SectionHeader';
import { Container } from '@/components/layout/Container';
import type { LandscapeCatalogItem } from '@/data/texas-landscape-catalog';
import type { EnrichedLandscapeRecord } from '@/data/texas-landscape-profile-enrichment';

const TWDB_BASIN_MAP = 'https://www.twdb.texas.gov/mapping/doc/maps/Major_River_Basins_8x11.pdf';

const rivers = [
  { name: 'Rio Grande', region: 'West Texas & the border', href: '/article/texas-rio-grande-river-guide', image: '/images/explore/lakes-rivers/amistad-national-recreation-area.jpg', description: 'A desert, canyon and international river system that forms much of the Texas–Mexico border.' },
  { name: 'Brazos River', region: 'West & Central Texas', href: '/article/texas-brazos-river-guide', image: '/images/explore/lakes-rivers/lake-somerville-birch-creek-unit.jpg', description: 'A long cross-state system linking the plains, major reservoirs, agricultural country and the Gulf.' },
  { name: 'Colorado River', region: 'Central Texas', href: '/article/texas-colorado-river-guide', image: '/images/explore/lakes-rivers/pedernales-falls-state-park.jpg', description: 'The Texas Colorado runs through the Highland Lakes and Austin before crossing the coastal plain.' },
  { name: 'Guadalupe River', region: 'Hill Country & Gulf Coast', href: '/article/texas-guadalupe-river-guide', image: '/images/editorial/texas-guadalupe-river.jpg', description: 'Spring-influenced Hill Country water, limestone reaches, cypress-lined banks and a broad lower basin.' },
  { name: 'Trinity River', region: 'North Texas & Gulf Coast', href: '/article/texas-trinity-river-guide', image: '/images/editorial/texas-trinity-river.jpg', description: 'A major urban and water-supply river system that drains Dallas–Fort Worth and reaches Trinity Bay.' },
] as const;

const regions = [
  { title: 'Hill Country rivers', rivers: 'Guadalupe · Frio · Nueces · Llano · Blanco · Pedernales', body: 'Limestone, springs and aquifers help create some of Texas’s clearest and most recognizable river corridors. Bald cypress, gravel bars and exposed bedrock are common visual clues.' },
  { title: 'East Texas rivers', rivers: 'Sabine · Neches · Angelina · Cypress', body: 'Higher rainfall, forests and lower gradients produce broader floodplains, sloughs, bottomland hardwoods and slower-moving water than most central and western rivers.' },
  { title: 'Prairie and plains rivers', rivers: 'Brazos · Colorado · Trinity · Red · Canadian', body: 'These systems cross large open landscapes, carry sediment over long distances and are heavily shaped by reservoirs, flood-control projects and urban water demand.' },
  { title: 'Desert and border rivers', rivers: 'Rio Grande · Pecos · Devils', body: 'Low rainfall makes dependable water especially conspicuous. Canyons, spring-fed tributaries and dramatic changes in flow define the river landscapes of far West Texas.' },
] as const;

const landforms = [
  { title: 'Floodplain', body: 'The low ground beside a river that is periodically inundated. Floodplains store sediment, support riparian forests and often widen dramatically in lower river reaches.' },
  { title: 'Terrace', body: 'An older floodplain left above the modern river after the channel cut downward. Terraces can appear as step-like benches along a valley.' },
  { title: 'Oxbow', body: 'A curved former river channel cut off when a meander is abandoned. Oxbows are especially common on broad, low-gradient floodplains.' },
  { title: 'Bottomland', body: 'Low, fertile land associated with river floodplains. In East Texas, bottomland hardwood forests can form some of the richest river habitat in the state.' },
] as const;

function RiverMap() {
  return <figure className="overflow-hidden rounded-sm border border-border bg-surface">
    <div className="grid lg:grid-cols-2 lg:items-stretch">
      <div className="p-4 sm:p-6 lg:p-8">
        <svg viewBox="0 0 620 500" role="img" aria-labelledby="river-valleys-map-title river-valleys-map-desc" className="mx-auto h-auto w-full max-w-3xl">
          <title id="river-valleys-map-title">Orientation map of major Texas river systems</title>
          <desc id="river-valleys-map-desc">A simplified Texas outline with approximate paths for the Rio Grande, Brazos, Colorado, Guadalupe, Trinity, Red, Sabine, Neches and Nueces river systems.</desc>
          <path d="M126 38H292V99H357L383 119L447 123L471 145L516 151L536 185L548 229L538 273L553 312L532 352L502 367L476 394L446 409L420 447L380 458L350 438L319 410L280 390L241 362L201 332L172 299L144 263L116 233L86 213L67 177L73 133L103 110Z" fill="currentColor" className="text-primary" opacity="0.15" stroke="currentColor" strokeWidth="3" />
          <path d="M77 191C96 219 121 248 145 279C170 312 194 340 223 364C259 395 303 422 347 443" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-primary" />
          <path d="M156 102C195 127 237 151 278 184C318 216 347 252 375 294C399 331 423 362 458 393" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary" opacity="0.85" />
          <path d="M125 132C177 150 216 173 252 205C285 234 306 270 336 306C365 341 390 372 421 407" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary" opacity="0.75" />
          <path d="M245 208C274 229 297 250 318 281C340 313 358 343 386 374" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary" opacity="0.7" />
          <path d="M354 148C383 171 404 198 420 228C437 259 451 291 475 324" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary" opacity="0.8" />
          <path d="M292 80C357 96 422 102 492 126" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary" opacity="0.7" />
          <path d="M476 148C487 180 494 214 500 252C505 282 510 310 520 338" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary" opacity="0.7" />
          <path d="M455 159C465 193 469 224 473 258C478 286 483 309 492 337" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-primary" opacity="0.6" />
          <path d="M260 250C277 270 292 296 306 323C320 346 335 364 352 382" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-primary" opacity="0.65" />
          <g className="fill-foreground font-semibold" style={{ fontSize: '13px' }}>
            <text x="92" y="248">Rio Grande</text><text x="198" y="176">Colorado</text><text x="288" y="198">Brazos</text><text x="324" y="300">Guadalupe</text><text x="397" y="216">Trinity</text><text x="351" y="90">Red</text><text x="489" y="201">Sabine</text><text x="454" y="245">Neches</text><text x="248" y="337">Nueces</text>
          </g>
        </svg>
      </div>
      <figcaption className="border-t border-border p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
        <p className="eyebrow text-primary">Texas river basins</p>
        <h2 className="mt-2 font-display text-3xl">One state, very different river systems</h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">Texas Water Development Board identifies 15 major river basins plus eight coastal basins. This simplified map is for orientation; use the official TWDB map for exact basin boundaries.</p>
        <a href={TWDB_BASIN_MAP} target="_blank" rel="noreferrer" className="mt-6 inline-block text-sm font-semibold text-primary underline">Open the official TWDB basin map ↗</a>
      </figcaption>
    </div>
  </figure>;
}

export function TexasRiverValleysLandscapePage({ item, nearby }: { item: EnrichedLandscapeRecord; nearby: Pick<LandscapeCatalogItem, 'slug' | 'name' | 'dek'>[] }) {
  return <>
    <DepartmentHero current="Explore" eyebrow="Water-shaped Texas" title="Texas Rivers & River Valleys" description="From spring-fed limestone rivers to broad coastal floodplains, Texas river valleys reveal how geology, rainfall, groundwater and elevation reshape the state." />

    <Section><Container>
      <div className="overflow-hidden rounded-sm border border-border bg-surface"><img src="/images/editorial/texas-guadalupe-river.jpg" alt="Clear Guadalupe River flowing through a cypress-lined Texas river valley" className="aspect-video w-full object-cover" fetchPriority="high" /></div>
      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <div className="max-w-3xl"><p className="eyebrow text-primary">How water shapes Texas</p><p className="mt-4 text-lg leading-9 text-muted-foreground">{item.intro} The same named river can begin as a narrow headwater stream, widen across prairie or ranch country, pass through reservoirs and cities, and finish in a broad floodplain or estuary. Understanding the valley around the water is what makes the system make sense.</p></div>
        <aside className="border-t-2 border-foreground pt-6"><h2 className="font-display text-2xl">At a glance</h2><dl className="mt-5 space-y-5 text-sm leading-7"><div><dt className="eyebrow text-muted-foreground">Where</dt><dd className="mt-1">Statewide, from Panhandle headwaters and West Texas desert rivers to East Texas forests and Gulf Coast estuaries.</dd></div><div><dt className="eyebrow text-muted-foreground">What changes</dt><dd className="mt-1">Rainfall, bedrock, elevation, groundwater, dams, vegetation and distance from the coast.</dd></div><div><dt className="eyebrow text-muted-foreground">Look for</dt><dd className="mt-1">Cypress corridors, gravel bars, terraces, oxbows, bottomlands, canyon reaches and broad coastal floodplains.</dd></div></dl></aside>
      </div>
    </Container></Section>

    <Section tone="surface"><Container><SectionHeader eyebrow="See the systems" title="Texas Rivers, Region by Region" description="The map is the fastest way to understand why a river in the Hill Country looks nothing like one in East Texas or Big Bend." /><div className="mt-8"><RiverMap /></div></Container></Section>

    <Section><Container><SectionHeader eyebrow="Major river systems" title="Five rivers that show how different Texas can be" description="These systems cross very different landscapes and connect to deeper Texas Defined river guides." /><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">{rivers.map((river) => <Link key={river.href} to={river.href} className="group overflow-hidden rounded-sm border border-border bg-background transition-colors hover:border-primary"><div className="aspect-[4/3] overflow-hidden bg-surface"><img src={river.image} alt={`${river.name} landscape in Texas`} loading="lazy" decoding="async" className="h-full w-full object-cover" /></div><div className="p-4"><p className="eyebrow text-primary">{river.region}</p><h3 className="mt-2 font-display text-2xl group-hover:text-primary">{river.name}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{river.description}</p></div></Link>)}</div></Container></Section>

    <Section tone="surface"><Container><SectionHeader eyebrow="Why they look different" title="Rainfall, geology and groundwater change the river" description="Texas rivers do not follow one visual template. Their character changes as the surrounding landscape changes." /><div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2 lg:grid-cols-4">{regions.map((region) => <section key={region.title} className="bg-background p-6"><h3 className="font-display text-2xl">{region.title}</h3><p className="mt-3 text-xs font-semibold uppercase tracking-wide text-primary">{region.rivers}</p><p className="mt-4 text-sm leading-7 text-muted-foreground">{region.body}</p></section>)}</div><div className="mt-10 grid gap-8 lg:grid-cols-2"><section className="border-t-2 border-foreground pt-5"><h2 className="font-display text-3xl">Spring-fed vs. runoff-driven rivers</h2><p className="mt-4 text-base leading-8 text-muted-foreground">In limestone country, groundwater emerging from springs can sustain clear baseflow even between rain events. Elsewhere, flow depends more heavily on rainfall, tributaries and reservoir releases. That difference affects water clarity, temperature, habitat and how dependable a river feels through the year.</p></section><section className="border-t-2 border-foreground pt-5"><h2 className="font-display text-3xl">Rivers change from headwaters to coast</h2><p className="mt-4 text-base leading-8 text-muted-foreground">Upstream reaches are often narrower, steeper and rockier. Farther downstream, channels generally flatten and meander across broader valleys, carrying more sediment and building floodplains before reaching bays, estuaries or the Gulf.</p></section></div></Container></Section>

    <Section><Container><SectionHeader eyebrow="Read the landscape" title="Four river-valley features worth knowing" description="These plain-language terms help explain what you are actually seeing beside a Texas river." /><div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{landforms.map((feature) => <section key={feature.title} className="border-t-2 border-foreground pt-5"><h3 className="font-display text-2xl">{feature.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{feature.body}</p></section>)}</div></Container></Section>

    <Section tone="surface"><Container><SectionHeader eyebrow="Experience the landscape" title="Where rivers become places to go" description="Use the geography as a starting point, then move into swimming, paddling, fishing, parks and destination guides." /><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Link to="/explore/lakes-rivers" className="border border-border bg-background p-5 transition-colors hover:border-primary"><p className="eyebrow text-primary">Water destinations</p><h3 className="mt-2 font-display text-2xl">Lakes & Rivers →</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Find river corridors, reservoirs and places built around the water.</p></Link><Link to="/fishing" className="border border-border bg-background p-5 transition-colors hover:border-primary"><p className="eyebrow text-primary">On the water</p><h3 className="mt-2 font-display text-2xl">Texas Fishing →</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Move from landscape context to species, techniques and fishing destinations.</p></Link><Link to="/explore/state-parks" className="border border-border bg-background p-5 transition-colors hover:border-primary"><p className="eyebrow text-primary">Public access</p><h3 className="mt-2 font-display text-2xl">State Parks →</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Explore parks where rivers, canyons, bottomlands and springs shape the visit.</p></Link><Link to="/explore/road-trips" className="border border-border bg-background p-5 transition-colors hover:border-primary"><p className="eyebrow text-primary">See the change</p><h3 className="mt-2 font-display text-2xl">Road Trips →</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Follow the transition from one river landscape and Texas region to another.</p></Link></div></Container></Section>

    <Section><Container><section className="border-t-2 border-foreground pt-7"><p className="eyebrow text-primary">Sources</p><h2 className="mt-3 font-display text-3xl">Authoritative river and basin references</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">River conditions and access can change quickly. These agencies support the physical-geography and basin context; check current park access, river flow, water quality and closures before travel.</p><ul className="mt-6 grid gap-3 sm:grid-cols-2"><li><a href="https://www.twdb.texas.gov/surfacewater/rivers/river_basins/index.asp" target="_blank" rel="noreferrer" className="font-semibold text-primary underline">Texas Water Development Board — River basins ↗</a></li><li><a href="https://tpwd.texas.gov/landwater/water/habitats/rivers/" target="_blank" rel="noreferrer" className="font-semibold text-primary underline">Texas Parks & Wildlife — Rivers ↗</a></li><li><a href="https://waterdata.usgs.gov/tx/nwis/rt" target="_blank" rel="noreferrer" className="font-semibold text-primary underline">USGS — Texas real-time water data ↗</a></li><li><a href="https://www.nps.gov/rigr/index.htm" target="_blank" rel="noreferrer" className="font-semibold text-primary underline">National Park Service — Rio Grande Wild & Scenic River ↗</a></li></ul></section></Container></Section>

    <Section tone="surface"><Container><SectionHeader eyebrow="Keep exploring" title="Other Texas landscapes" /><ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">{nearby.map((landscape) => <li key={landscape.slug} className="border-t border-border pt-4"><Link to="/explore/landscapes/$slug" params={{ slug: landscape.slug }} className="group block"><h3 className="font-display text-2xl group-hover:text-primary">{landscape.name}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{landscape.dek}</p></Link></li>)}</ul><Link to="/explore/landscapes" className="eyebrow mt-10 inline-block text-primary">See all Texas landscapes →</Link></Container></Section>
  </>;
}
