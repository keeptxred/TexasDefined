import { createFileRoute, Link } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/citation-guide';
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
const description = 'How to cite TexasDefined county, property-tax, data, travel, Painted Churches and sports reference pages, including canonical URLs, source precedence, date context and machine-readable resources.';

const GROUPS = [
  {
    title: 'Texas data & counties',
    description: 'County comparisons, city-to-county relationships and the Texas data catalog.',
    links: [
      ['Texas facts and figures', '/texas-data'],
      ['Texas county comparison', '/browse/counties'],
      ['City-to-county relationships', '/texas-data/city-county-relationships'],
    ],
  },
  {
    title: 'Property-tax references',
    description: 'Statewide explanations, county comparisons, appraisal districts, deadlines and action guides.',
    links: [
      ['How Texas property taxes work', '/learn/property-taxes'],
      ['Property tax by county', '/property-tax/counties'],
      ['Appraisal district directory', '/learn/appraisal-districts'],
      ['Property-tax protest guide', '/do/property-tax-protest'],
    ],
  },
  {
    title: 'Explore & relocation',
    description: 'Maintained comparison and authority layers for moving, parks, water destinations, small towns, road trips and attractions.',
    links: [
      ['Moving to Texas', '/moving-to-texas'],
      ['Texas state parks', '/explore/state-parks'],
      ['Texas lakes and rivers', '/explore/lakes-rivers'],
      ['Texas attractions comparison', '/explore/attractions-comparison'],
      ['Top 25 Texas attractions', '/explore/top-attractions'],
      ['Top 25 methodology', '/explore/top-attractions/methodology'],
      ['Top 25 road trips', '/explore/top-attractions/road-trips'],
    ],
  },
  {
    title: 'Painted Churches of Texas',
    description: 'A 27-church verified heritage-reference collection with canonical entity pages for decorative techniques, symbols, people, cultural communities, preservation, archives, routes and research methodology.',
    links: [
      ['Painted Churches of Texas', '/explore/painted-churches'],
      ['Research methodology & corrections', '/explore/painted-churches/methodology'],
      ['Master census', '/explore/painted-churches/census'],
      ['How many Painted Churches?', '/explore/painted-churches/how-many'],
      ['Compare all verified churches', '/explore/painted-churches/compare'],
      ['Interactive statewide map', '/explore/painted-churches/map'],
      ['Then & now archival comparisons', '/explore/painted-churches/then-and-now'],
      ['Decorative painting techniques', '/explore/painted-churches/techniques'],
      ['Symbols & iconography', '/explore/painted-churches/symbols'],
      ['Artists, architects & researchers', '/explore/painted-churches/people'],
      ['Cultural heritage', '/explore/painted-churches/heritage'],
      ['Preservation & authenticity', '/explore/painted-churches/preservation'],
      ['Knowledge graph', '/explore/painted-churches/knowledge-graph'],
      ['Harwood archive guide', '/explore/painted-churches/harwood-archive'],
      ['Routes & itineraries', '/explore/painted-churches/routes'],
      ['Documentary & oral-history library', '/explore/painted-churches/media'],
      ['Painted Churches citation guide', '/explore/painted-churches/cite'],
    ],
  },
  {
    title: 'Sports & game-day travel',
    description: 'Verified venue directories and comparison pages for Texas stadiums, arenas, ballparks, racetracks and sports-trip planning.',
    links: [
      ['Texas sports venues', '/sports-venues'],
      ['Compare Texas sports venues', '/sports-venues/compare'],
      ['Dallas–Fort Worth sports venues', '/sports-venues/dallas-fort-worth'],
      ['Texas football stadiums', '/sports-venues/football'],
      ['Texas motorsports venues', '/sports-venues/motorsports'],
    ],
  },
] as const;

export const Route = createFileRoute('/citation-guide')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'How to Cite TexasDefined References & Data', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'CollectionPage', '@id': `${pageUrl}#page`, url: pageUrl, name: 'How to Cite TexasDefined References & Data', description, isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` }, publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` } },
        { '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') }, { '@type': 'ListItem', position: 2, name: 'Citation guide', item: pageUrl }] },
      ],
    })],
  }),
  component: CitationGuidePage,
});

function CitationGuidePage() {
  return <>
    <DepartmentHero current="Citation Guide" eyebrow="Research & attribution" title="How to cite Texas Defined references" description={description} tone="surface" />
    <Container className="py-12 sm:py-16">
      <section className="grid gap-5 md:grid-cols-3" aria-labelledby="citation-rules-heading">
        <h2 id="citation-rules-heading" className="sr-only">Citation rules</h2>
        <Rule title="Use the canonical page" body="Cite the clean TexasDefined canonical URL rather than a search, filter, preview, tracking or download URL unless the downloadable file itself is the object of the citation." />
        <Rule title="Keep the original source attached" body="When a claim comes from a government record, agency, park authority, church or parish, venue, event organizer or public dataset, cite that controlling source alongside TexasDefined when the distinction matters." />
        <Rule title="Preserve date and scope" body="Include the page's source-check, verification or data-as-of context when facts can change. Keep any visible completeness, planning, designation or event-day caveat with the cited result." />
      </section>

      <section className="mt-12 border-y border-border py-8" aria-labelledby="format-heading">
        <p className="eyebrow text-primary">Suggested format</p>
        <h2 id="format-heading" className="mt-2 font-display text-3xl">A simple web citation</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Texas Defined, “Page title,” canonical page URL, verification or modification date when shown, accessed on your research date.</strong> For deadlines, eligibility, official boundaries, closures, fees, current government records, church access, event schedules, ticketing, parking or entry rules, include the linked official source as the controlling authority.</p>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">When a reference page offers a CSV, JSON or checklist distribution, use the canonical HTML page for context, methodology and caveats; use the downloadable file when you need the machine-readable or printable distribution itself.</p>
      </section>

      <section className="mt-12 border-y border-border py-8" aria-labelledby="top25-source-heading">
        <p className="eyebrow text-primary">Top-25 source hierarchy</p>
        <h2 id="top25-source-heading" className="mt-2 font-display text-3xl">Cite current operations differently from supporting context</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Rule title="Controlling visitor source" body="For current admission, reservations, hours, closures, accessibility, permits and operating rules, use the attraction operator or responsible public agency identified as the controlling source on the destination guide." />
          <Rule title="Supporting authority source" body="Government agencies, universities, UNESCO, preservation bodies, conservation programs and accountable institutional sources can support history, science, designation or other durable context, but they do not override the operator's current instructions." />
          <Rule title="TexasDefined synthesis" body="Visit length, effort, exposure, planning level, family fit, first-time value, itineraries and road-trip structures are labeled TexasDefined editorial assessments. Cite the methodology page when those fields are material to your use." />
        </div>
      </section>

      <section className="mt-12 border-y border-border py-8" aria-labelledby="painted-source-heading">
        <p className="eyebrow text-primary">Painted Churches source hierarchy</p>
        <h2 id="painted-source-heading" className="mt-2 font-display text-3xl">Cite the definition and entity you are actually using.</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-4">
          <Rule title="Formal designation" body="Use the linked Texas Historical Commission or National Register record when a claim depends on formal historic designation, reference number, architect, listed date or property identity." />
          <Rule title="Current church access" body="Use the responsible parish, congregation, diocese or official local tour source for current access, services, closures and visitor rules. Historic designation does not guarantee a church is open for sightseeing." />
          <Rule title="Broader research claims" body="Use the church-specific source trail plus the relevant technique, symbol, person, heritage or preservation authority page when a claim depends on TexasDefined's broader evidence graph rather than a formal designation." />
          <Rule title="Historic image claims" body="Use the Then & Now page and linked archival item when discussing visual change. The archival record controls historic-image provenance; a current Commons or other reusable image controls the modern image license." />
        </div>
        <p className="mt-6 max-w-4xl text-sm leading-7 text-muted-foreground">For statewide counts, use the dedicated count explainer; for inclusion/exclusion decisions, use the census; for artist or symbol questions, cite the canonical entity page rather than a generic church-list page. Do not collapse the Schulenburg touring cluster, the formal National Register decorative-interior group and the broader statewide tradition into one unlabeled number.</p>
      </section>

      <section className="mt-12" aria-labelledby="reference-families-heading">
        <p className="eyebrow text-primary">Maintained resources</p>
        <h2 id="reference-families-heading" className="mt-2 font-display text-4xl">Reference families built for research</h2>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {GROUPS.map((group) => <article key={group.title} className="border border-border p-6"><h3 className="font-display text-2xl">{group.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{group.description}</p><ul className="mt-5 space-y-3 text-sm font-semibold">{group.links.map(([label, href]) => <li key={href}><a href={href} className="border-b border-primary text-primary">{label} →</a></li>)}</ul></article>)}
        </div>
      </section>

      <section className="mt-12 border-y border-border py-8" aria-labelledby="machine-heading">
        <p className="eyebrow text-primary">Machine-readable discovery</p>
        <h2 id="machine-heading" className="mt-2 font-display text-3xl">Citation index and retrieval guidance</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">The citation manifest lists maintained canonical factual-reference targets and trust attributes. The llms.txt route describes TexasDefined's entity graph, retrieval rules and preferred reference resources. These are discovery aids; the human-readable page and its linked official sources remain the evidence layer.</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <a href="/citation-magnets.json" className="border-b border-primary text-primary">citation-magnets.json</a>
          <a href="/llms.txt" className="border-b border-primary text-primary">llms.txt</a>
          <Link to="/about" className="border-b border-primary text-primary">Editorial accountability</Link>
          <Link to="/explore/painted-churches" className="border-b border-primary text-primary">Painted Churches collection</Link>
          <Link to="/explore/painted-churches/census" className="border-b border-primary text-primary">Painted Churches census</Link>
          <Link to="/explore/painted-churches/then-and-now" className="border-b border-primary text-primary">Painted Churches Then & Now</Link>
          <Link to="/explore/painted-churches/knowledge-graph" className="border-b border-primary text-primary">Painted Churches knowledge graph</Link>
          <Link to="/explore/painted-churches/cite" className="border-b border-primary text-primary">Painted Churches citation guidance</Link>
          <a href="/painted-churches.csv" className="border-b border-primary text-primary">Painted Churches CSV</a>
          <a href="/painted-churches.json" className="border-b border-primary text-primary">Painted Churches JSON</a>
          <Link to="/explore/top-attractions" className="border-b border-primary text-primary">Top 25 Texas attractions</Link>
          <Link to="/sports-venues" className="border-b border-primary text-primary">Texas sports venues</Link>
        </div>
      </section>
    </Container>
  </>;
}

function Rule({ title, body }: { title: string; body: string }) {
  return <article className="border-t border-border pt-5"><h3 className="font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p></article>;
}
