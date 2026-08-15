import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { getFishingSeasonData } from "@/data/fishing/season-data.functions";
import { FISHING_SEASON_FILTERS, FISHING_SEASONS_PATH, isFishingSeasonFilter, type FishingSeasonFilter } from "@/data/fishing/season-routing";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const description = "Explore source-backed spring, summer, fall and winter fishing patterns across TexasDefined's complete fishing-lake guides, with matching species and techniques kept separate from live fishing reports.";
type SeasonSearch = { season?: FishingSeasonFilter; species?: string };

const faq = [
  { question: "Is this a live Texas fishing forecast?", answer: "No. This guide organizes durable, source-backed seasonal patterns from complete TexasDefined lake guides. Live fishing reports and current conditions remain separate." },
  { question: "What does year-round mean here?", answer: "Year-round means the verified fishery opportunity is not limited to one named season. It does not mean conditions or catch rates are equally good every day." },
  { question: "Does TexasDefined rank the best fishing season?", answer: "No. Results are alphabetical by lake and species. Seasonal patterns explain when a source identifies a useful pattern; sponsorship never changes the order or guidance." },
];

export const Route = createFileRoute("/fishing/seasons")({
  validateSearch: (search: Record<string, unknown>): SeasonSearch => ({
    season: isFishingSeasonFilter(search.season) ? search.season : undefined,
    species: slug(search.species),
  }),
  loader: () => getFishingSeasonData(),
  head: ({ loaderData }) => {
    const lakes = [...new Map((loaderData?.entries ?? []).map((entry) => [entry.lake.id, entry.lake])).values()];
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", url: `${siteUrl}${FISHING_SEASONS_PATH}`, name: "Texas Fishing Seasons", description, mainEntity: { "@id": `${siteUrl}${FISHING_SEASONS_PATH}#lakes` } },
        { "@type": "ItemList", "@id": `${siteUrl}${FISHING_SEASONS_PATH}#lakes`, numberOfItems: lakes.length, itemListElement: lakes.map((lake, index) => ({ "@type": "ListItem", position: index + 1, name: lake.name, url: `${siteUrl}/fishing/lakes/${lake.slug}` })) },
        { "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
          { "@type": "ListItem", position: 3, name: "Fishing seasons", item: `${siteUrl}${FISHING_SEASONS_PATH}` },
        ] },
      ],
    };
    return { meta: buildMeta(texasDefinedBrand, { title: "Texas Fishing Seasons — Spring, Summer, Fall & Winter Patterns", description, canonicalPath: FISHING_SEASONS_PATH }), links: [canonicalLink(texasDefinedBrand, FISHING_SEASONS_PATH)], scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] };
  },
  component: FishingSeasonsPage,
});

function FishingSeasonsPage() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const selectedSpecies = data.species.find((fish) => fish.slug === search.species);
  const entries = data.entries
    .filter((entry) => !selectedSpecies || entry.species.id === selectedSpecies.id)
    .filter((entry) => !search.season || matchesSeason(entry.relation.seasonalPatterns, search.season));

  return <>
    <Container className="pt-8 sm:pt-10"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><a href="/">Front page</a> · <a href="/fishing">Fishing</a> · Fishing seasons</nav></Container>
    <header className="mt-5 border-y border-border bg-ink text-ink-foreground"><Container className="py-14 sm:py-20"><p className="eyebrow text-ink-foreground/65">Texas Defined Fishing</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Texas fishing by season — patterns, not promises.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">Explore source-backed seasonal patterns across complete lake guides, then use fresh reports and official sources for what is happening on the water now.</p><div className="mt-8 flex flex-wrap gap-5 text-sm"><a href="/fishing/reports" className="border-b border-ink-foreground pb-1 font-semibold">Current fishing reports →</a><a href="/fishing/plan" className="border-b border-ink-foreground/50 pb-1">Trip planner →</a><a href="/fishing/regulations" className="border-b border-ink-foreground/50 pb-1">Regulations →</a></div></Container></header>

    <Container className="py-12 sm:py-16">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Fishing seasons">{FISHING_SEASON_FILTERS.map((season) => <a key={season} href={`${FISHING_SEASONS_PATH}?season=${season}`} className={`border p-5 ${search.season === season ? "border-primary" : "border-border"}`}><p className="eyebrow text-primary">{titleCase(season)}</p><p className="mt-2 font-display text-3xl">{data.seasonCounts[season]}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">verified lake/species relationships with {season} or year-round guidance</p></a>)}</section>

      <form method="get" action={FISHING_SEASONS_PATH} className="mt-10 grid gap-6 border-y border-border py-8 md:grid-cols-[1fr_1fr_auto] md:items-end" aria-label="Fishing season filters">
        <label className="text-sm"><span className="eyebrow text-muted-foreground">Season</span><select name="season" defaultValue={search.season ?? ""} className="mt-2 w-full border border-border bg-background px-3 py-3"><option value="">All seasonal patterns</option>{FISHING_SEASON_FILTERS.map((season) => <option key={season} value={season}>{titleCase(season)}</option>)}</select></label>
        <label className="text-sm"><span className="eyebrow text-muted-foreground">Species</span><select name="species" defaultValue={search.species ?? ""} className="mt-2 w-full border border-border bg-background px-3 py-3"><option value="">Any species with verified seasonal guidance</option>{data.species.map((fish) => <option key={fish.id} value={fish.slug}>{fish.commonName}</option>)}</select></label>
        <button type="submit" className="border border-primary px-5 py-3 text-sm font-semibold text-primary">Update</button>
      </form>

      <section className="py-10" aria-labelledby="season-results"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow text-primary">Seasonal guide</p><h2 id="season-results" className="mt-2 font-display text-4xl">{entries.length} source-backed lake/species match{entries.length === 1 ? "" : "es"}</h2></div><p className="max-w-xl text-xs leading-6 text-muted-foreground">{data.policy.ranking}</p></div>
        <div className="mt-7 grid gap-x-8 lg:grid-cols-2">{entries.map((entry) => {
          const patterns = entry.relation.seasonalPatterns.filter((pattern) => !search.season || pattern.season === search.season || pattern.season === "year-round");
          const techniques = entry.techniques.filter((row) => !search.season || row.profile.seasons.includes(search.season) || row.profile.seasons.includes("year-round"));
          return <article key={entry.id} className="border-t border-border py-8"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow text-primary">{entry.lake.name}</p><h3 className="mt-2 font-display text-3xl">{entry.species.commonName}</h3></div><span className="border border-border px-3 py-1.5 text-xs">{entry.relation.quality} · {entry.relation.prominence}</span></div>
            <div className="mt-5 space-y-4">{patterns.map((pattern, index) => <div key={`${pattern.season}-${index}`} className="border-l-2 border-primary pl-4"><p className="eyebrow text-primary">{titleCase(pattern.season)}</p><p className="mt-2 text-sm leading-7 text-muted-foreground">{pattern.summary}</p>{pattern.habitats?.length ? <p className="mt-2 text-xs text-muted-foreground"><strong className="text-foreground">Habitat:</strong> {pattern.habitats.join(", ")}</p> : null}{pattern.methods?.length ? <p className="mt-1 text-xs text-muted-foreground"><strong className="text-foreground">Methods:</strong> {pattern.methods.join(", ")}</p> : null}{pattern.depthGuidance ? <p className="mt-1 text-xs text-muted-foreground"><strong className="text-foreground">Depth context:</strong> {pattern.depthGuidance}</p> : null}</div>)}</div>
            {techniques.length ? <div className="mt-6"><p className="eyebrow text-muted-foreground">Related verified techniques</p><ul className="mt-3 flex flex-wrap gap-2">{techniques.map((row) => <li key={row.profile.id} className="border border-border px-3 py-1.5 text-xs" title={row.profile.summary}>{row.technique?.name}</li>)}</ul></div> : null}
            <a href={entry.href} className="mt-6 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Open {entry.lake.name} fishing guide →</a>
          </article>;
        })}</div>
        {!entries.length ? <div className="border-y border-border py-12"><h3 className="font-display text-3xl">No verified seasonal pattern matches both filters.</h3><p className="mt-3 text-sm text-muted-foreground">That means the complete-guide catalog does not currently contain a source-backed relationship for this combination; it is not evidence that the fish cannot be caught then.</p></div> : null}
      </section>

      <section className="grid gap-8 border-y border-border py-10 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Read the labels</p><h2 className="mt-2 font-display text-3xl">Seasonal guidance is not today's bite.</h2></div><div className="max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground"><p>{data.policy.conditions}</p><p>{data.policy.yearRound}</p><p>For a trip happening now, check <a href="/fishing/reports" className="border-b border-primary text-primary">fresh fishing reports</a>, <a href="/fishing/regulations" className="border-b border-primary text-primary">current regulations</a>, weather, lake levels, access and closures before travel.</p><p className="text-xs">Fishing season source relationships reviewed through {data.verifiedAt}.</p></div></section>

      <section className="py-12" aria-labelledby="season-faq"><p className="eyebrow text-primary">Quick answers</p><h2 id="season-faq" className="mt-2 font-display text-4xl">Texas fishing seasons FAQ</h2><div className="mt-7 grid gap-6 lg:grid-cols-3">{faq.map((item) => <article key={item.question} className="border-t border-border pt-5"><h3 className="font-display text-xl">{item.question}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p></article>)}</div></section>
    </Container>
  </>;
}

function slug(value: unknown) { return typeof value === "string" && /^[a-z0-9-]+$/.test(value) ? value : undefined; }
function matchesSeason(patterns: Array<{ season: string }>, season: FishingSeasonFilter) { return patterns.some((pattern) => pattern.season === season || pattern.season === "year-round"); }
function titleCase(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase()); }
