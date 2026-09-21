import { Link } from "@tanstack/react-router";

import { TexasExplainedContextLinks } from "@/components/editorial/TexasExplainedContextLinks";
import { Container } from "@/components/layout/Container";
import { fishingFoundationAnchor, isCompleteFishingLakeSlug } from "@/data/fishing/slugs";
import type { FishSpecies, FishingLake, LakeSpeciesProfile } from "@/data/fishing/types";

interface FishingHubProps {
  lakes: FishingLake[];
  species: FishSpecies[];
  lakeSpecies: LakeSpeciesProfile[];
}

export function FishingHub({ lakes, species, lakeSpecies }: FishingHubProps) {
  const speciesById = new Map(species.map((row) => [row.id, row]));
  const featuredSpecies = [...species]
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.commonName.localeCompare(b.commonName))
    .slice(0, 8);
  const featuredLakes = lakes.slice(0, 6);

  return <>
    <Container className="pt-8 sm:pt-10"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap items-center gap-2"><li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden>·</li><li aria-current="page">Fishing</li></ol></nav></Container>

    <section className="mt-5 border-b border-border bg-ink text-ink-foreground">
      <Container className="py-16 sm:py-24">
        <p className="eyebrow text-ink-foreground/70">Texas Defined Fishing</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.96] sm:text-7xl">Fishing in Texas starts with finding the right water.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/82">Find lakes by where you want to go and what you want to catch, then move into lake guides, fish-species pages, seasonal patterns, access, regulations and current reports.</p>
        <div className="mt-8 flex flex-wrap gap-5 text-sm">
          <Link to="/fishing/plan" className="border-b border-ink-foreground pb-1 font-semibold text-ink-foreground">Open the full lake finder →</Link>
          <Link to="/texas-fishing-license" className="border-b border-ink-foreground/50 pb-1 text-ink-foreground/75">Texas fishing license →</Link>
          <Link to="/fishing/regulations" className="border-b border-ink-foreground/50 pb-1 text-ink-foreground/75">Fishing regulations →</Link>
        </div>
      </Container>
    </section>

    <Container className="py-12 sm:py-16">
      <section aria-labelledby="lake-finder-heading" className="border-b border-border pb-14">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">Texas fishing lake finder</p>
          <h2 id="lake-finder-heading" className="mt-3 font-display text-4xl sm:text-5xl">Where would you like to go fishing?</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">Tell us where you want to be and what you want to catch. You can choose more than one fish.</p>
        </div>

        <form method="get" action="/fishing/plan" className="mt-8 border-y border-border py-8">
          <label className="block max-w-3xl">
            <span className="eyebrow text-muted-foreground">Lake, city, county or region</span>
            <input name="q" maxLength={80} placeholder="Lake Conroe, Houston, Travis County, Hill Country…" className="mt-3 w-full border border-border bg-background px-4 py-3 text-base" />
          </label>

          <fieldset className="mt-7">
            <legend className="eyebrow text-muted-foreground">What would you like to fish for? <span className="normal-case tracking-normal text-muted-foreground">(multi-select)</span></legend>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {species.map((fish) => <label key={fish.id} className="flex cursor-pointer items-center gap-3 border border-border px-3 py-2.5 text-sm hover:border-primary/60"><input type="checkbox" name="species" value={fish.slug} /><span>{fish.commonName}</span></label>)}
            </div>
          </fieldset>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <button type="submit" className="bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Find lakes</button>
            <label className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" name="match" value="all" /><span>Require every selected fish</span></label>
          </div>
        </form>
      </section>

      <section aria-labelledby="browse-species" className="py-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl"><p className="eyebrow text-primary">Fish of Texas</p><h2 id="browse-species" className="mt-3 font-display text-4xl sm:text-5xl">Start with the fish.</h2><p className="mt-4 text-base leading-7 text-muted-foreground">Every published fish record has its own Texas guide and connects back to lakes supported by verified lake-to-species data.</p></div>
          <Link to="/fishing/species" className="eyebrow border-b border-primary pb-1 text-primary">Browse every Texas fish guide →</Link>
        </div>
        <div className="mt-8 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {featuredSpecies.map((fish) => <article key={fish.id} className="border-b border-border py-6 sm:px-5 sm:first:pl-0"><p className="eyebrow text-primary">{fish.taxonKind === "group" ? "Fishing group" : "Fish species"}</p><h3 className="mt-2 font-display text-2xl"><a href={fishingFoundationAnchor("species", fish.slug)} className="hover:text-primary">{fish.commonName}</a></h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{fish.summary}</p><a href={`/fishing/plan?species=${fish.slug}`} className="mt-4 inline-block border-b border-primary pb-1 text-xs font-semibold text-primary">Find lakes for {fish.commonName} →</a></article>)}
        </div>
      </section>

      <section aria-labelledby="featured-lakes" className="border-t border-border py-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl"><p className="eyebrow text-primary">Explore fishing lakes</p><h2 id="featured-lakes" className="mt-3 font-display text-4xl sm:text-5xl">A few places to start.</h2><p className="mt-4 text-base leading-7 text-muted-foreground">Open a lake for its fish relationships and planning details, or use the finder when you already know the place or species you want.</p></div>
          <Link to="/fishing/lakes" className="eyebrow border-b border-primary pb-1 text-primary">Browse fishing lakes →</Link>
        </div>
        <div className="mt-8 grid gap-x-8 border-t border-border lg:grid-cols-2">
          {featuredLakes.map((lake) => {
            const targets = lakeSpecies
              .filter((relation) => relation.lakeId === lake.id)
              .map((relation) => ({ relation, fish: speciesById.get(relation.speciesId) }))
              .filter((row) => Boolean(row.fish))
              .slice(0, 4);
            return <article key={lake.id} className="border-b border-border py-7">
              <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow text-primary">{formatRegion(lake.region)}</p><h3 className="mt-2 font-display text-3xl"><a href={fishingFoundationAnchor("lake", lake.slug)} className="hover:text-primary">{lake.name}</a></h3></div><span className="text-xs text-muted-foreground">{isCompleteFishingLakeSlug(lake.slug) ? "Full fishing guide" : "Lake profile"}</span></div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{lake.summary}</p>
              {targets.length ? <div className="mt-5 flex flex-wrap gap-2">{targets.map(({ relation, fish }) => <span key={relation.id} className="border border-border px-3 py-1.5 text-xs">{fish?.commonName} · {titleCase(relation.quality)}</span>)}</div> : null}
              <a href={fishingFoundationAnchor("lake", lake.slug)} className="mt-5 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Open lake page →</a>
            </article>;
          })}
        </div>
      </section>

      <section className="border-t border-border py-14" aria-labelledby="fishing-resources">
        <p className="eyebrow text-primary">Fishing resources</p>
        <h2 id="fishing-resources" className="mt-3 font-display text-4xl">Go deeper when you need it.</h2>
        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Resource href="/fishing/compare" title="Compare fishing lakes" copy="Put up to three lake guides side by side." />
          <Resource href="/fishing/seasons" title="Fishing seasons" copy="Understand durable seasonal patterns without confusing them with today's bite." />
          <Resource href="/fishing/techniques" title="Fishing techniques" copy="Browse source-backed methods connected to Texas lakes and species." />
          <Resource href="/fishing/reports" title="Fishing reports" copy="Use dated reports when you need current-condition context." />
          <Resource href="/fishing/access" title="Fishing access" copy="Find verified ramps, marinas, shoreline access and launches." />
          <Resource href="/fishing/guides" title="Fishing guides" copy="Browse verified local guide profiles connected to the waters they serve." />
        </div>
      </section>

      <TexasExplainedContextLinks className="border-t border-border pt-10" />
    </Container>
  </>;
}

function Resource({ href, title, copy }: { href: string; title: string; copy: string }) {
  return <article className="border-t border-border pt-5"><h3 className="font-display text-2xl"><a href={href} className="hover:text-primary">{title}</a></h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{copy}</p><a href={href} className="mt-4 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Explore →</a></article>;
}

function formatRegion(value: string) {
  if (value === "prairies-lakes") return "Prairies & Lakes";
  return titleCase(value);
}

function titleCase(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase()); }
