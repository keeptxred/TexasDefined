import { Container } from "@/components/layout/Container";
import { FISHING_SPECIES_DIRECTORY_PATH } from "@/data/fishing/species-routing";
import type { FishingSpeciesProfileData } from "@/data/fishing/species-guide-data.server";

export function FishingSpeciesProfile({ data }: { data: FishingSpeciesProfileData }) {
  const { species } = data;
  const finderHref = `/fishing/plan?species=${species.slug}`;

  return <>
    <Container className="pt-8 sm:pt-10">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
        <a href="/">Front page</a> · <a href="/fishing">Fishing</a> · <a href={FISHING_SPECIES_DIRECTORY_PATH}>Fish species</a> · {species.commonName}
      </nav>
    </Container>

    <header className="mt-5 border-y border-border bg-ink text-ink-foreground">
      <Container className="py-14 sm:py-20">
        <p className="eyebrow text-ink-foreground/65">{species.taxonKind === "group" ? "Texas fishing group" : "Texas fish species"}</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">{species.commonName} fishing in Texas</h1>
        {species.scientificName && <p className="mt-4 text-sm italic text-ink-foreground/60">{species.scientificName}</p>}
        <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">{species.summary}</p>
        <div className="mt-8 flex flex-wrap gap-5 text-sm">
          <a href={finderHref} className="border-b border-ink-foreground pb-1 font-semibold">Find lakes for {species.commonName} →</a>
          <a href="/fishing/lakes" className="border-b border-ink-foreground/50 pb-1">Browse fishing lakes →</a>
          <a href="/fishing/regulations" className="border-b border-ink-foreground/50 pb-1">Current regulations →</a>
        </div>
      </Container>
    </header>

    <Container className="py-12 sm:py-16">
      <section className="grid gap-6 border-y border-border py-8 sm:grid-cols-2 lg:grid-cols-4" aria-label="Species coverage">
        <Stat label="Linked lake profiles" value={data.lakes.length} />
        <Stat label="Season patterns" value={data.seasonalPatterns.length} />
        <Stat label="Techniques listed" value={data.relatedTechniques.length} />
        <Stat label="Source pages" value={data.sources.length} />
      </section>

      <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-2" aria-labelledby="species-range-habitat">
        <div>
          <p className="eyebrow text-primary">Texas range & habitat</p>
          <h2 id="species-range-habitat" className="mt-3 font-display text-4xl">Where the verified Texas records put {species.commonName.toLowerCase()}.</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">This is a fishing-planning view of the published TexasDefined lake relationships, not a biological range map. It shows only regions and habitat signals supported by the verified lake records behind this page.</p>
          {data.regions.length ? <div className="mt-6"><p className="eyebrow text-muted-foreground">Regions represented</p><div className="mt-3 flex flex-wrap gap-2">{data.regions.map((region) => <span key={region} className="border border-border px-3 py-1.5 text-xs">{formatRegion(region)}</span>)}</div></div> : null}
        </div>
        <div>
          <p className="eyebrow text-muted-foreground">Habitat signals in the lake data</p>
          {data.habitats.length ? <div className="mt-3 flex flex-wrap gap-2">{data.habitats.map((habitat) => <span key={habitat} className="border border-border px-3 py-1.5 text-xs">{habitat}</span>)}</div> : <p className="mt-3 text-sm leading-7 text-muted-foreground">No habitat labels are published in the verified lake relationships yet. TexasDefined leaves that gap visible instead of generalizing from unrelated waters.</p>}
        </div>
      </section>

      <section className="border-b border-border py-12" aria-labelledby="species-seasonal">
        <p className="eyebrow text-primary">Seasonal behavior in the lake records</p>
        <h2 id="species-seasonal" className="mt-3 font-display text-4xl">How the verified patterns change through the year</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These are durable seasonal observations attached to specific lakes. They are not a live bite forecast.</p>
        {data.seasonalPatterns.length ? <div className="mt-8 grid gap-x-8 lg:grid-cols-2">{data.seasonalPatterns.slice(0, 12).map((pattern, index) => <article key={`${pattern.lake.id}-${pattern.season}-${index}`} className="border-t border-border py-6"><div className="flex flex-wrap items-start justify-between gap-4"><h3 className="font-display text-2xl">{titleCase(pattern.season)}</h3><a href={pattern.href} className="text-xs text-primary hover:underline">{pattern.lake.name}</a></div><p className="mt-3 text-sm leading-7 text-muted-foreground">{pattern.summary}</p>{pattern.habitats?.length ? <p className="mt-3 text-xs leading-5 text-muted-foreground"><strong className="text-foreground">Habitat:</strong> {pattern.habitats.join(" · ")}</p> : null}{pattern.methods?.length ? <p className="mt-2 text-xs leading-5 text-muted-foreground"><strong className="text-foreground">Methods:</strong> {pattern.methods.join(" · ")}</p> : null}</article>)}</div> : <p className="mt-7 max-w-3xl text-sm leading-7 text-muted-foreground">No verified seasonal pattern is attached to this species yet.</p>}
      </section>

      <section className="py-12" aria-labelledby="where-to-fish">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">Where to fish</p>
          <h2 id="where-to-fish" className="mt-3 font-display text-4xl sm:text-5xl">Where to catch {species.commonName} in Texas</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">These lakes appear only when a source supports the connection to this species. They are not a statewide popularity ranking and do not imply that unlisted waters lack this fish.</p>
        </div>

        {data.lakes.length ? <div className="mt-8 grid gap-x-8 lg:grid-cols-2">
          {data.lakes.map((row) => <article key={row.relation.id} className="border-t border-border py-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-primary">{row.fullGuide ? "Full fishing guide" : "Lake profile"}</p>
                <h3 className="mt-2 font-display text-3xl"><a href={row.href} className="hover:text-primary">{row.lake.name}</a></h3>
              </div>
              <span className="border border-border px-3 py-1.5 text-xs">{titleCase(row.relation.quality)} · {titleCase(row.relation.prominence)}</span>
            </div>
            {row.relation.notes && <p className="mt-4 text-sm leading-7 text-muted-foreground">{row.relation.notes}</p>}
            {row.relation.seasonalPatterns.length > 0 && <div className="mt-5">
              <p className="eyebrow text-muted-foreground">Seasonal patterns</p>
              <ul className="mt-3 space-y-3">{row.relation.seasonalPatterns.map((pattern, index) => <li key={`${pattern.season}-${index}`} className="text-sm leading-6"><span className="font-semibold">{titleCase(pattern.season)}:</span> <span className="text-muted-foreground">{pattern.summary}</span></li>)}</ul>
            </div>}
            <a href={row.href} className="mt-6 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Read {row.lake.name} guide →</a>
          </article>)}
        </div> : <div className="mt-8 border-y border-border py-9">
          <h3 className="font-display text-2xl">No lake-guide match is available for this fish yet.</h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">This species guide still covers identification and statewide fishing context. We won’t invent lake recommendations; more matches will appear as source-backed lake connections are added.</p>
          <a href={finderHref} className="mt-5 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Check the lake finder →</a>
        </div>}
      </section>

      <section className="border-y border-border py-12" aria-labelledby="species-techniques">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">How to fish for them</p>
          <h2 id="species-techniques" className="mt-3 font-display text-4xl">Techniques used for this fish</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">Methods appear only when source-backed lake guidance explicitly includes {species.commonName.toLowerCase()}. This keeps generic tackle advice separate from sourced lake guidance.</p>
        </div>
        {data.techniqueApplications.length > 0 ? <div className="mt-8 grid gap-x-8 lg:grid-cols-2">
          {data.techniqueApplications.map((row) => <article key={row.profile.id} className="border-t border-border py-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h3 className="font-display text-2xl"><a href={`/fishing/techniques/${row.technique.slug}`} className="hover:text-primary">{row.technique.name}</a></h3>
              <span className="text-xs text-muted-foreground">{row.lake.name}</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{row.profile.summary}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.12em] text-muted-foreground">{row.profile.seasons.map(titleCase).join(" · ")}</p>
          </article>)}
        </div> : <p className="mt-7 max-w-3xl text-sm leading-7 text-muted-foreground">No source-backed technique match is available for this fish yet. We leave that gap visible rather than inventing a generic recommendation.</p>}
      </section>

      <section className="border-b border-border py-12" aria-labelledby="species-methods">
        <p className="eyebrow text-primary">Tackle & approach</p>
        <h2 id="species-methods" className="mt-3 font-display text-4xl">Methods actually represented in the source-backed lake data</h2>
        {data.methods.length ? <div className="mt-6 flex flex-wrap gap-2">{data.methods.map((method) => <span key={method} className="border border-border px-3 py-1.5 text-sm">{method}</span>)}</div> : <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">No method labels are published in the verified seasonal relationships yet. Use the technique applications above where available.</p>}
        <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined does not turn these method labels into universal rod, line or lure prescriptions. Cover, water clarity, depth, weather and the individual lake should drive tackle choices.</p>
      </section>

      <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-2" aria-labelledby="species-regulations">
        <div>
          <p className="eyebrow text-primary">Regulations</p>
          <h2 id="species-regulations" className="mt-3 font-display text-4xl">Check the current rule before you fish.</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">Bag limits, length limits, legal methods and waterbody-specific exceptions can change. TexasDefined links to the current TPWD fishing rules instead of freezing a numeric limit into an evergreen species guide.</p>
          <div className="mt-5 flex flex-wrap gap-5 text-sm"><a href="/fishing/regulations" className="border-b border-primary pb-1 font-semibold text-primary">Texas fishing regulations →</a><a href="/texas-fishing-license" className="border-b border-primary pb-1 font-semibold text-primary">Fishing licenses →</a></div>
        </div>
        <div>
          <p className="eyebrow text-muted-foreground">Related fish to compare</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">These links are based on shared verified lake relationships, not a claim of biological similarity.</p>
          {data.relatedSpecies.length ? <div className="mt-5 divide-y divide-border border-y border-border">{data.relatedSpecies.map((row) => <a key={row.species.id} href={row.href} className="flex items-center justify-between gap-4 py-3 text-sm hover:text-primary"><span className="font-semibold">{row.species.commonName}</span><span className="text-xs text-muted-foreground">{row.sharedLakeCount} shared lake{row.sharedLakeCount === 1 ? "" : "s"}</span></a>)}</div> : <p className="mt-5 text-sm text-muted-foreground">No other published species currently shares a verified lake relationship in this dataset.</p>}
        </div>
      </section>

      <section className="grid gap-8 py-12 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">Plan the trip</p><h2 className="mt-2 font-display text-3xl">Use durable species guidance, then verify current conditions.</h2></div>
        <div className="max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground">
          <p>{data.policy.sourcing}</p>
          <p>{data.policy.conditions}</p>
          <p>Before a trip, check <a href="/fishing/reports" className="border-b border-primary text-primary">fresh reports</a>, weather and water conditions, access status, and <a href="/fishing/regulations" className="border-b border-primary text-primary">current TPWD regulations</a>.</p>
          <a href={finderHref} className="inline-block border-b border-primary pb-1 font-semibold text-primary">Find Texas lakes for {species.commonName} →</a>
        </div>
      </section>

      <section className="border-t border-border py-12" aria-labelledby="species-sources">
        <p className="eyebrow text-primary">Sources</p>
        <h2 id="species-sources" className="mt-2 font-display text-4xl">Sources behind this page</h2>
        <div className="mt-7 grid gap-5 md:grid-cols-2">{data.sources.map((source) => <article key={source.url} className="border-t border-border pt-5">
          <h3 className="font-display text-xl">{source.name}</h3>
          <p className="mt-2 text-xs text-muted-foreground">Checked {source.checkedAt}</p>
          <a href={source.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">View source ↗</a>
        </article>)}</div>
      </section>

      <section className="border-t border-border py-10"><a href={FISHING_SPECIES_DIRECTORY_PATH} className="border-b border-primary pb-1 text-sm font-semibold text-primary">← Browse all Texas fish species</a></section>
    </Container>
  </>;
}

function Stat({ label, value }: { label: string; value: number }) { return <div><p className="eyebrow text-muted-foreground">{label}</p><p className="mt-2 font-display text-4xl">{value}</p></div>; }
function titleCase(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase()); }
function formatRegion(value: string) { return value === "prairies-lakes" ? "Prairies & Lakes" : titleCase(value); }
