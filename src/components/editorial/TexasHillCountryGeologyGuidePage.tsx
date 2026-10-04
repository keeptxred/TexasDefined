import { Link } from '@tanstack/react-router';

import hillCountryHero from '@/assets/generated/hill-country-identity.jpg';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Section, SectionHeader } from '@/components/editorial/SectionHeader';
import { Container } from '@/components/layout/Container';
import type { EnrichedLandscapeGuide } from '@/data/texas-landscape-guide-enrichment';

const VERIFIED_DATE = 'October 4, 2026';

const processSteps = [
  {
    number: '01',
    title: 'A shallow sea laid down the limestone',
    body: 'During the Cretaceous, warm shallow seas covered much of Central Texas. Carbonate mud, shells and reef material accumulated and hardened into thick limestone units. Those resistant layers became the bedrock platform later exposed across the Edwards Plateau and Hill Country.',
  },
  {
    number: '02',
    title: 'The plateau margin fractured and shifted',
    body: 'Normal faulting along the Balcones system broke and displaced Cretaceous rocks near the eastern and southeastern plateau edge. The faults did not create every hill, but they established a major structural and elevation transition that later erosion could exploit.',
  },
  {
    number: '03',
    title: 'Rivers cut down through the rock',
    body: 'The Guadalupe, Blanco, Pedernales, Llano, Frio, Nueces and their tributaries incised the elevated limestone. Valleys and canyons deepened while more resistant rock remained as ridges and uplands, turning a broad tableland into deeply dissected terrain.',
  },
  {
    number: '04',
    title: 'Groundwater dissolved the limestone from within',
    body: 'Rainwater moving through joints, bedding planes and faults slowly dissolves limestone. That karst process enlarges fractures, creates caves and sink features, and connects aquifers and springs to the same landscape-building system visible at the surface.',
  },
] as const;

const terrainBands = [
  {
    title: 'Eastern and southeastern Hill Country',
    label: 'Most dissected',
    body: 'Near Austin, San Marcos, New Braunfels and San Antonio, the plateau margin meets the Balcones fault-and-escarpment zone. Short, steep drainages and deeply cut limestone valleys make the relief feel especially abrupt.',
  },
  {
    title: 'Plateau interior',
    label: 'Broader uplands',
    body: 'Farther onto the Edwards Plateau, the surface is generally broader and less sharply dissected. River valleys can still be dramatic, but larger areas of rolling upland remain between them.',
  },
  {
    title: 'Llano Uplift / Central Mineral Region',
    label: 'Older rocks',
    body: 'Around Llano, Burnet, Mason and Enchanted Rock, granite, gneiss and other ancient rocks interrupt the limestone story. This is why parts of the central Hill Country look fundamentally different from the classic Edwards Plateau landscape.',
  },
] as const;

const fieldStops = [
  {
    title: 'Pedernales Falls State Park',
    eyebrow: 'River incision + exposed bedrock',
    href: '/destination/pedernales-falls-state-park',
    body: 'The river drops across exposed rock and makes the relationship between flowing water, resistant layers and valley cutting easy to see.',
  },
  {
    title: 'Enchanted Rock',
    eyebrow: 'Llano Uplift granite',
    href: '/destination/enchanted-rock-state-natural-area',
    body: 'A dramatic reminder that the Hill Country is not geologically uniform: the pink granite dome belongs to a much older Central Texas rock system.',
  },
  {
    title: 'Inks Lake country',
    eyebrow: 'Ancient basement rocks',
    href: '/destination/inks-lake-state-park',
    body: 'Gneiss, granite and surrounding limestone expose the deep-time geology of the Llano Uplift along the Colorado River corridor.',
  },
  {
    title: 'Guadalupe River corridor',
    eyebrow: 'Limestone valley + groundwater',
    href: '/article/texas-guadalupe-river-guide',
    body: 'Clear water, limestone walls, springs and steep valley sides show how surface drainage and groundwater interact across the region.',
  },
] as const;

function HillCountryCrossSection() {
  return <figure className="overflow-hidden rounded-sm border border-border bg-background">
    <div className="p-5 sm:p-8">
      <svg viewBox="0 0 900 420" role="img" aria-labelledby="hill-country-cross-section-title hill-country-cross-section-desc" className="h-auto w-full">
        <title id="hill-country-cross-section-title">Simplified cross section of the Texas Hill Country and Balcones margin</title>
        <desc id="hill-country-cross-section-desc">A simplified west-to-east diagram showing the Edwards Plateau, river incision, faulted limestone along the Balcones zone and lower plains to the east.</desc>
        <path d="M0 155 L130 150 L250 155 L360 165 L455 195 L535 245 L620 278 L720 300 L900 320 L900 420 L0 420 Z" fill="currentColor" className="text-primary" opacity="0.14" />
        <path d="M0 155 L130 150 L250 155 L360 165 L455 195 L535 245 L620 278 L720 300 L900 320" fill="none" stroke="currentColor" strokeWidth="4" className="text-foreground" />
        <path d="M430 193 L472 420 M470 214 L515 420 M505 233 L552 420" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary" opacity="0.75" />
        <path d="M250 156 C276 180 288 205 305 236 C322 267 340 281 362 292" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-primary" />
        <g fill="currentColor" className="text-foreground font-semibold" style={{ fontSize: '18px' }}>
          <text x="55" y="75">Edwards Plateau</text>
          <text x="435" y="95">Balcones fault zone</text>
          <text x="690" y="250">Lower plains</text>
        </g>
        <g fill="currentColor" className="text-muted-foreground" style={{ fontSize: '15px' }}>
          <text x="205" y="330">river-cut valley</text>
          <text x="475" y="350">fractured limestone</text>
          <text x="68" y="105">broad limestone upland</text>
        </g>
      </svg>
    </div>
    <figcaption className="border-t border-border p-5 text-sm leading-7 text-muted-foreground">
      <strong className="text-foreground">Simplified, not to scale.</strong> The Hill Country is best understood as an eroded limestone plateau margin rather than a chain of folded mountains. Faulting helped establish the structural break; streams, groundwater and erosion did most of the sculpting afterward.
    </figcaption>
  </figure>;
}

function SourceDesk({ sources }: { sources: EnrichedLandscapeGuide['sourceLinks'] }) {
  return <section className="border-t-2 border-foreground pt-7">
    <p className="eyebrow text-primary">Research desk</p>
    <h2 className="mt-3 font-display text-3xl">Sources, method and citation</h2>
    <div className="mt-6 grid gap-8 lg:grid-cols-2">
      <div>
        <p className="text-sm leading-7 text-muted-foreground">This guide synthesizes physical-geography, aquifer and park-geology material from Texas public agencies and the U.S. Geological Survey. The diagram is interpretive and intentionally simplified; it is not a geologic map or survey cross section.</p>
        <ul className="mt-6 space-y-3">{sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer" className="border-b border-primary pb-1 text-sm font-semibold text-primary">{source.label} →</a></li>)}</ul>
      </div>
      <aside className="border border-border bg-surface p-5 text-sm leading-7">
        <p><strong>Prepared by:</strong> Texas Defined Editorial Desk</p>
        <p><strong>Last verified:</strong> {VERIFIED_DATE}</p>
        <p className="mt-4 text-muted-foreground"><strong className="text-foreground">Recommended citation:</strong> Texas Defined Editorial Desk. “Why Is the Texas Hill Country So Hilly?” TexasDefined.com. Last verified {VERIFIED_DATE}.</p>
      </aside>
    </div>
  </section>;
}

export function TexasHillCountryGeologyGuidePage({ item }: { item: EnrichedLandscapeGuide }) {
  return <>
    <DepartmentHero current="Explore" eyebrow="Texas geology explained" title={item.title} description="The short answer: the Hill Country is a dissected limestone plateau margin shaped by faulting, river incision and groundwater dissolution — with the much older Llano Uplift interrupting the story in the center." />

    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-sm border border-border bg-surface">
              <img src={hillCountryHero} alt="Texas Hill Country limestone landscape with rugged hills and river-cut terrain" className="aspect-[16/9] w-full object-cover" fetchPriority="high" />
            </div>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">Texas Defined archive image. The region’s familiar relief comes primarily from erosion of an elevated limestone surface, not from a young mountain chain.</p>
          </div>
          <aside className="border-t-2 border-foreground pt-6">
            <p className="eyebrow text-primary">The answer in 30 seconds</p>
            <p className="mt-4 text-lg leading-9 text-muted-foreground">The Hill Country is hilly because streams have spent millions of years cutting into the eastern and southeastern edge of the Edwards Plateau. Faulting along the Balcones system fractured and displaced the rock, while groundwater dissolved limestone underground. What remains is a landscape of ridges, canyons, spring-fed valleys, caves and escarpments.</p>
            <dl className="mt-7 grid gap-5 sm:grid-cols-2">
              <div className="border-t border-border pt-3"><dt className="eyebrow text-muted-foreground">Landform</dt><dd className="mt-1 font-semibold">Dissected plateau</dd></div>
              <div className="border-t border-border pt-3"><dt className="eyebrow text-muted-foreground">Key rock</dt><dd className="mt-1 font-semibold">Cretaceous limestone</dd></div>
              <div className="border-t border-border pt-3"><dt className="eyebrow text-muted-foreground">Structural edge</dt><dd className="mt-1 font-semibold">Balcones fault zone</dd></div>
              <div className="border-t border-border pt-3"><dt className="eyebrow text-muted-foreground">Major exception</dt><dd className="mt-1 font-semibold">Llano Uplift</dd></div>
            </dl>
          </aside>
        </div>
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="How it formed" title="Four processes built the landscape Texans recognize" description="The hills are the visible result of a sequence: marine limestone first, structural deformation next, then prolonged river and groundwater erosion." />
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => <section key={step.number} className="border-t-2 border-foreground pt-5"><p className="eyebrow text-primary">{step.number}</p><h2 className="mt-3 font-display text-2xl leading-tight">{step.title}</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{step.body}</p></section>)}
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeader eyebrow="Read the terrain" title="The plateau edge matters more than the word ‘mountains’" description="A simple cross section explains why the land gets so broken and steep along the eastern Hill Country." />
        <div className="mt-8"><HillCountryCrossSection /></div>
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-primary">The important exception</p>
            <h2 className="mt-3 font-display text-4xl leading-tight">The Llano Uplift is a different geologic world inside the Hill Country</h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">The classic Hill Country story is dominated by Cretaceous limestone, but the central mineral region around Llano, Burnet and Gillespie counties exposes far older rocks. Texas Parks and Wildlife describes Precambrian igneous and metamorphic rocks here, including the granite landscapes associated with Enchanted Rock and the gneiss exposed around Inks Lake.</p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">That is why a drive through the central Hill Country can move from pale limestone shelves and cedar-covered ridges into pink granite domes, coarse sandy soils and exposed crystalline rock. The visual change is geologic, not just scenic.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/destination/enchanted-rock-state-natural-area" className="border border-border bg-background p-5 transition-colors hover:border-primary"><p className="eyebrow text-primary">Granite dome</p><h3 className="mt-2 font-display text-2xl">Enchanted Rock →</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">See the Llano Uplift at one of the most recognizable geologic landmarks in Texas.</p></Link>
            <Link to="/destination/inks-lake-state-park" className="border border-border bg-background p-5 transition-colors hover:border-primary"><p className="eyebrow text-primary">Ancient bedrock</p><h3 className="mt-2 font-display text-2xl">Inks Lake →</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Explore exposed gneiss and granite at the eastern edge of the uplift.</p></Link>
          </div>
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeader eyebrow="Why the water is so distinctive" title="Karst connects the caves, aquifers, springs and clear rivers" description="The same limestone that forms the hills also controls how water moves beneath them." />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <section className="border-t-2 border-foreground pt-5"><h3 className="font-display text-2xl">Fractures become plumbing</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Faults, joints and bedding planes give rainwater pathways into the limestone. Dissolution enlarges those openings over time and creates highly permeable karst aquifers.</p></section>
          <section className="border-t-2 border-foreground pt-5"><h3 className="font-display text-2xl">Aquifers feed springs</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">The Edwards (Balcones Fault Zone) Aquifer consists largely of partially dissolved limestone and feeds major springs including Comal and San Marcos. Spring discharge turns underground flow back into visible Hill Country water.</p></section>
          <section className="border-t-2 border-foreground pt-5"><h3 className="font-display text-2xl">Surface valleys keep cutting</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Once water reaches stream channels, gravity and flood events continue to deepen valleys and expose bedrock. The landscape above and drainage below are two expressions of the same rock-water relationship.</p></section>
        </div>
        <div className="mt-8 flex flex-wrap gap-3"><Link to="/explore/caverns" className="border border-border px-4 py-3 text-sm font-semibold hover:border-primary hover:text-primary">Explore Texas caverns →</Link><Link to="/explore/major-springs" className="border border-border px-4 py-3 text-sm font-semibold hover:border-primary hover:text-primary">Major Texas springs →</Link><Link to="/explore/lakes-rivers" className="border border-border px-4 py-3 text-sm font-semibold hover:border-primary hover:text-primary">Hill Country rivers →</Link></div>
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="Why one Hill Country drive can look completely different from another" title="The terrain changes across three geologic settings" />
        <div className="mt-10 grid gap-8 md:grid-cols-3">{terrainBands.map((band) => <section key={band.title} className="border-t-2 border-foreground pt-5"><p className="eyebrow text-primary">{band.label}</p><h3 className="mt-2 font-display text-2xl leading-tight">{band.title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{band.body}</p></section>)}</div>
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeader eyebrow="See the geology in person" title="Places where the explanation becomes visible" description="Use these landscapes as field examples instead of treating the geology as an abstract textbook story." />
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">{fieldStops.map((stop) => <Link key={stop.href} to={stop.href} className="border-t-2 border-foreground pt-5"><p className="eyebrow text-primary">{stop.eyebrow}</p><h3 className="mt-2 font-display text-2xl">{stop.title} →</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{stop.body}</p></Link>)}</div>
        <div className="mt-8 border-t border-border pt-5"><p className="eyebrow text-primary">Balcones corridor</p><h3 className="mt-2 font-display text-2xl">Austin → San Marcos → New Braunfels → San Antonio</h3><p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Even without a single overlook, the rapid change in relief along this urban corridor reflects the transition from the higher limestone plateau margin toward lower country east and southeast of the Balcones system.</p></div>
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <section>
            <p className="eyebrow text-primary">Geologic timeline</p>
            <h2 className="mt-3 font-display text-3xl">From ancient basement rock to modern river valleys</h2>
            <ol className="mt-6 space-y-5 text-sm leading-7">
              <li className="border-t border-border pt-4"><strong>Precambrian:</strong> ancient igneous and metamorphic rocks now exposed in the Llano Uplift formed long before the limestone plateau.</li>
              <li className="border-t border-border pt-4"><strong>Cretaceous:</strong> shallow marine environments deposited thick carbonate units across Central Texas.</li>
              <li className="border-t border-border pt-4"><strong>Later deformation:</strong> regional uplift and Balcones faulting fractured and displaced rock along the plateau margin.</li>
              <li className="border-t border-border pt-4"><strong>Ongoing erosion:</strong> rivers, floods, weathering and groundwater dissolution continue to deepen valleys and enlarge karst pathways today.</li>
            </ol>
          </section>
          <section>
            <p className="eyebrow text-primary">Common misconception</p>
            <h2 className="mt-3 font-display text-3xl">The Hill Country is not a miniature Rocky Mountains</h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">The region can feel mountainous because local relief is strong, roads repeatedly climb and drop, and limestone canyons produce dramatic walls. But most of the terrain is better described as an elevated and deeply dissected plateau margin. That distinction explains both the broad uplands and the sudden steep valleys.</p>
            <Link to="/explore/landscapes/edwards-plateau" className="mt-6 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Explore the Edwards Plateau landscape →</Link>
          </section>
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <SourceDesk sources={item.sourceLinks} />
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="Go deeper" title="Keep exploring the Texas Hill Country" />
        <div className="mt-8 flex flex-wrap gap-3">{item.related.map((link) => <Link key={link.href} to={link.href} className="border border-border bg-background px-4 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">{link.label} →</Link>)}</div>
        <Link to="/explore/landscapes" className="eyebrow mt-10 inline-block text-primary">← Back to all Texas landscapes</Link>
      </Container>
    </Section>
  </>;
}
