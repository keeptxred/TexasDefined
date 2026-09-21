import { Container } from "@/components/layout/Container";
import { fishingFoundationAnchor } from "@/data/fishing/slugs";
import type { FishSpecies, FishingAccessPoint, FishingBusiness, FishingGuide, FishingLake, FishingReport, LakeSpeciesProfile } from "@/data/fishing/types";

export function GenericFishingLakeGuide({
  lake,
  species,
  relationships,
  reports,
  guides,
  access,
  businesses,
}: {
  lake: FishingLake;
  species: FishSpecies[];
  relationships: LakeSpeciesProfile[];
  reports: FishingReport[];
  guides: FishingGuide[];
  access: FishingAccessPoint[];
  businesses: FishingBusiness[];
}) {
  const speciesById = new Map(species.map((fish) => [fish.id, fish]));
  const targets = relationships
    .filter((row) => Boolean(row.verifiedAt) && row.sources.length > 0)
    .map((relation) => ({ relation, fish: speciesById.get(relation.speciesId) }))
    .filter((row): row is { relation: LakeSpeciesProfile; fish: FishSpecies } => Boolean(row.fish))
    .sort((a, b) => qualityRank(a.relation.quality) - qualityRank(b.relation.quality) || a.fish.commonName.localeCompare(b.fish.commonName));

  return <>
    <Container className="pt-8 sm:pt-10">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><a href="/">Front page</a> · <a href="/fishing">Fishing</a> · <a href="/fishing/lakes">Fishing lakes</a> · {lake.name}</nav>
    </Container>

    <header className="mt-5 border-y border-border bg-ink text-ink-foreground">
      <Container className="py-14 sm:py-20">
        <p className="eyebrow text-ink-foreground/65">Texas fishing lake profile · {formatRegion(lake.region)}</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">{lake.name} fishing</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">{lake.summary}</p>
        <div className="mt-8 flex flex-wrap gap-5 text-sm">
          <a href={`/fishing/plan?q=${encodeURIComponent(lake.name)}`} className="border-b border-ink-foreground pb-1 font-semibold">Find fish at {lake.name} →</a>
          <a href="/fishing/compare" className="border-b border-ink-foreground/50 pb-1">Compare fishing lakes →</a>
          <a href="/fishing/regulations" className="border-b border-ink-foreground/50 pb-1">Fishing regulations →</a>
        </div>
      </Container>
    </header>

    <Container className="py-12 sm:py-16">
      <section className="grid gap-10 border-b border-border pb-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-primary">At a glance</p>
          <h2 className="mt-3 font-display text-4xl">Plan around the water first.</h2>
          <dl className="mt-7 grid gap-5 border-t border-border pt-6 sm:grid-cols-2">
            {lake.surfaceAcres ? <Fact label="Surface area" value={`${lake.surfaceAcres.toLocaleString("en-US")} acres`} /> : null}
            {lake.maxDepthFeet ? <Fact label="Maximum depth" value={`${lake.maxDepthFeet} ft`} /> : null}
            {lake.primaryWaterway ? <Fact label="Primary waterway" value={lake.primaryWaterway} /> : null}
            {lake.riverBasin ? <Fact label="River basin" value={lake.riverBasin} /> : null}
            {lake.counties.length ? <Fact label="Counties" value={lake.counties.join(", ")} /> : null}
            {lake.nearestCities.length ? <Fact label="Nearest cities" value={lake.nearestCities.join(", ")} /> : null}
            {lake.controllingAuthorities.length ? <Fact label="Managing authority" value={lake.controllingAuthorities.join(", ")} /> : null}
            {lake.impoundedYear ? <Fact label="Impounded" value={String(lake.impoundedYear)} /> : null}
          </dl>
        </div>
        <aside className="border-t-2 border-foreground pt-5">
          <p className="eyebrow text-primary">Explore the area</p>
          {lake.counties.length ? <div className="mt-5"><p className="text-sm text-muted-foreground">County guides</p><div className="mt-3 flex flex-wrap gap-3">{lake.counties.map((county) => <a key={county} href={`/county/${slugify(county)}`} className="border-b border-primary pb-1 text-sm font-semibold text-primary">{county} County →</a>)}</div></div> : null}
          {lake.coordinates ? <a href={`https://www.google.com/maps/search/?api=1&query=${lake.coordinates.lat},${lake.coordinates.lng}`} target="_blank" rel="noreferrer noopener" className="mt-6 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Open map →</a> : null}
        </aside>
      </section>

      <section className="py-12" aria-labelledby="lake-fish-heading">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><p className="eyebrow text-primary">Fish this lake</p><h2 id="lake-fish-heading" className="mt-3 font-display text-4xl">Fish recorded for {lake.name}</h2></div>
          <a href="/fishing/species" className="border-b border-primary pb-1 text-sm font-semibold text-primary">Browse all Texas fish →</a>
        </div>
        {targets.length ? <div className="mt-8 grid gap-x-8 border-t border-border md:grid-cols-2">
          {targets.map(({ relation, fish }) => <article key={relation.id} className="border-b border-border py-7">
            <div className="flex flex-wrap items-start justify-between gap-4"><h3 className="font-display text-2xl"><a href={fishingFoundationAnchor("species", fish.slug)} className="hover:text-primary">{fish.commonName}</a></h3><span className="border border-border px-3 py-1.5 text-xs">{titleCase(relation.quality)}</span></div>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{relation.notes || fish.summary}</p>
            {relation.seasonalPatterns.length ? <div className="mt-5 space-y-3">{relation.seasonalPatterns.slice(0, 2).map((pattern, index) => <p key={`${pattern.season}-${index}`} className="text-sm leading-6"><strong>{titleCase(pattern.season)}:</strong> <span className="text-muted-foreground">{pattern.summary}</span></p>)}</div> : null}
            <div className="mt-5 flex flex-wrap gap-4"><a href={fishingFoundationAnchor("species", fish.slug)} className="border-b border-primary pb-1 text-sm font-semibold text-primary">{fish.commonName} guide →</a><a href={`/fishing/plan?species=${fish.slug}`} className="border-b border-border pb-1 text-sm text-muted-foreground">Find other lakes →</a></div>
          </article>)}
        </div> : <p className="mt-7 max-w-3xl text-sm leading-7 text-muted-foreground">No verified lake-to-species relationship is published for this water yet. TexasDefined does not infer fish presence from nearby lakes.</p>}
      </section>

      {(access.length || guides.length || businesses.length) ? <section className="border-y border-border py-12">
        <p className="eyebrow text-primary">Local planning</p>
        <h2 className="mt-3 font-display text-4xl">Verified services attached to this lake</h2>
        <div className="mt-7 grid gap-6 md:grid-cols-3">
          {access.length ? <Summary title="Access" value={access.length} copy="Verified ramps, marinas or shoreline access records." href="/fishing/access" /> : null}
          {guides.length ? <Summary title="Fishing guides" value={guides.length} copy="Verified guide profiles that list this lake." href="/fishing/guides" /> : null}
          {businesses.length ? <Summary title="Local services" value={businesses.length} copy="Verified lake-area fishing businesses and services." href="/fishing/services" /> : null}
        </div>
      </section> : null}

      {reports.length ? <section className="py-12">
        <p className="eyebrow text-primary">Dated fishing reports</p>
        <h2 className="mt-3 font-display text-4xl">Recent published context</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Reports are shown with publication dates because conditions change. Always verify current weather, levels, access and regulations before travel.</p>
        <div className="mt-7 grid gap-x-8 md:grid-cols-2">{reports.slice(0, 4).map((report) => <article key={report.id} className="border-t border-border py-6"><p className="eyebrow text-primary">{formatDate(report.publishedAt)}</p><h3 className="mt-2 font-display text-2xl">{report.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{report.summary}</p></article>)}</div>
      </section> : null}

      <section className="border-t border-border py-12">
        <p className="eyebrow text-primary">Sources</p>
        <h2 className="mt-3 font-display text-3xl">Verify before the trip</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Lake levels, access, regulations, closures and fishing conditions can change after this profile is reviewed.</p>
        {lake.sources.length ? <div className="mt-6 flex flex-wrap gap-5">{lake.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="border-b border-primary pb-1 text-sm font-semibold text-primary">{source.name} ↗</a>)}</div> : null}
      </section>
    </Container>
  </>;
}

function Fact({ label, value }: { label: string; value: string }) { return <div><dt className="eyebrow text-muted-foreground">{label}</dt><dd className="mt-1 text-sm">{value}</dd></div>; }
function Summary({ title, value, copy, href }: { title: string; value: number; copy: string; href: string }) { return <article className="border-t border-border pt-5"><p className="font-display text-3xl">{value}</p><h3 className="mt-1 font-display text-xl">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p><a href={href} className="mt-4 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Browse →</a></article>; }
function qualityRank(value: string) { return value === "excellent" ? 0 : value === "good" ? 1 : value === "fair" ? 2 : value === "poor" ? 3 : 4; }
function formatRegion(value: string) { return value === "prairies-lakes" ? "Prairies & Lakes" : titleCase(value); }
function titleCase(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase()); }
function slugify(value: string) { return value.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
function formatDate(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date); }
