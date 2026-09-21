import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { getFishingPlannerData } from "@/data/fishing/planner-data.functions";
import { FISHING_LAKE_COMPARE_PATH, FISHING_TRIP_PLANNER_PATH } from "@/data/fishing/planner-routing";
import type { FishSpecies, FishingLake } from "@/data/fishing/types";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const description = "Find a Texas fishing lake by place and target species. Select multiple fish, compare verified fishery fit, and open the lake guide or profile that matches your trip.";
type PlannerSearch = { q?: string; species?: string[]; match?: "all" };

const GROUP_MEMBER_SLUGS: Readonly<Record<string, readonly string[]>> = {
  catfish: ["catfish", "blue-catfish", "channel-catfish", "flathead-catfish"],
  crappie: ["crappie", "black-crappie", "white-crappie"],
  sunfish: ["sunfish", "bluegill"],
};

export const Route = createFileRoute("/fishing/plan")({
  validateSearch: (search: Record<string, unknown>): PlannerSearch => ({
    q: cleanText(search.q) ?? cleanText(search.region),
    species: cleanSlugs(search.species),
    match: search.match === "all" ? "all" : undefined,
  }),
  loader: () => getFishingPlannerData(),
  head: ({ loaderData }) => {
    const rows = loaderData?.rows ?? [];
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebPage", url: `${siteUrl}${FISHING_TRIP_PLANNER_PATH}`, name: "Texas Fishing Lake Finder", description },
        { "@type": "ItemList", numberOfItems: rows.length, itemListElement: rows.map((row, index) => ({ "@type": "ListItem", position: index + 1, name: row.lake.name, url: `${siteUrl}${row.href}` })) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
          { "@type": "ListItem", position: 3, name: "Lake finder", item: `${siteUrl}${FISHING_TRIP_PLANNER_PATH}` },
        ] },
      ],
    };
    return { meta: buildMeta(texasDefinedBrand, { title: "Texas Fishing Lake Finder — Search by Place & Fish Species", description, canonicalPath: FISHING_TRIP_PLANNER_PATH }), links: [canonicalLink(texasDefinedBrand, FISHING_TRIP_PLANNER_PATH)], scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] };
  },
  component: FishingTripPlannerPage,
});

function FishingTripPlannerPage() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const selectedSpecies = (search.species ?? []).map((slug) => data.species.find((fish) => fish.slug === slug)).filter((fish): fish is FishSpecies => Boolean(fish));
  const locationQuery = search.q?.trim() ?? "";

  const ranked = data.rows.map((row) => {
    const matches = selectedSpecies.map((fish) => {
      const acceptableSlugs = new Set(fish.taxonKind === "group" ? (GROUP_MEMBER_SLUGS[fish.slug] ?? [fish.slug]) : [fish.slug]);
      const target = row.targets
        .filter((candidate) => candidate.species && acceptableSlugs.has(candidate.species.slug))
        .sort((a, b) => scoreTarget(b.relation.quality) - scoreTarget(a.relation.quality))[0];
      return { fish, target, score: scoreTarget(target?.relation.quality) };
    });
    const matchCount = matches.filter((item) => item.target).length;
    const speciesScore = matches.reduce((total, item) => total + item.score, 0);
    const location = scoreLocation(row.lake, locationQuery);
    return { ...row, matches, matchCount, speciesScore, location };
  })
    .filter((row) => {
      const speciesPass = selectedSpecies.length === 0 || (search.match === "all" ? row.matchCount === selectedSpecies.length : row.matchCount > 0);
      const locationPass = !locationQuery || row.location.score > 0;
      return speciesPass && locationPass;
    })
    .sort((a, b) =>
      b.matchCount - a.matchCount
      || b.speciesScore - a.speciesScore
      || b.location.score - a.location.score
      || Number(b.fullGuide) - Number(a.fullGuide)
      || a.lake.name.localeCompare(b.lake.name));

  return <>
    <Container className="pt-8 sm:pt-10"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><a href="/">Front page</a> · <a href="/fishing">Fishing</a> · Lake finder</nav></Container>
    <header className="mt-5 border-y border-border bg-ink text-ink-foreground"><Container className="py-14 sm:py-20"><p className="eyebrow text-ink-foreground/65">Texas Defined Fishing</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Find the Texas lake that fits the way you want to fish.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">Search by lake, city, county or Texas region, then select one or several fish species. Results use verified lake-to-species relationships rather than popularity or paid placement.</p><div className="mt-8 flex flex-wrap gap-5 text-sm"><a href={FISHING_LAKE_COMPARE_PATH} className="border-b border-ink-foreground pb-1 font-semibold">Compare lakes side by side →</a><a href="/fishing/species" className="border-b border-ink-foreground/50 pb-1">Browse Texas fish →</a></div></Container></header>

    <Container className="py-12 sm:py-16">
      <form method="get" action={FISHING_TRIP_PLANNER_PATH} className="border-b border-border pb-10" aria-label="Texas fishing lake finder">
        <div className="grid gap-7 lg:grid-cols-[1fr_1.35fr]">
          <label className="block">
            <span className="eyebrow text-primary">Where would you like to go fishing?</span>
            <span className="mt-2 block text-sm text-muted-foreground">Enter a lake, city, county or region.</span>
            <input name="q" defaultValue={search.q ?? ""} maxLength={80} placeholder="Lake Conroe, Houston, Travis County, Hill Country…" className="mt-4 w-full border border-border bg-background px-4 py-3 text-base" />
          </label>
          <fieldset>
            <legend className="eyebrow text-primary">What would you like to fish for?</legend>
            <p className="mt-2 text-sm text-muted-foreground">Select as many as you want. Group choices such as Catfish include their listed Texas species.</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {data.species.map((fish) => <label key={fish.id} className="flex cursor-pointer items-center gap-3 border border-border px-3 py-2.5 text-sm hover:border-primary/60"><input type="checkbox" name="species" value={fish.slug} defaultChecked={(search.species ?? []).includes(fish.slug)} /><span>{fish.commonName}</span></label>)}
            </div>
          </fieldset>
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-5">
          <button type="submit" className="bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Find fishing lakes</button>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="match" value="all" defaultChecked={search.match === "all"} /><span>Require every selected fish</span></label>
          {(search.q || (search.species?.length ?? 0) > 0) ? <a href={FISHING_TRIP_PLANNER_PATH} className="border-b border-border pb-1 text-sm text-muted-foreground">Clear search</a> : null}
        </div>
      </form>

      <section className="py-10">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><p className="eyebrow text-primary">Lake finder results</p><h2 className="mt-2 font-display text-4xl">{ranked.length} matching lake{ranked.length === 1 ? "" : "s"}</h2></div>
          <p className="max-w-xl text-xs leading-5 text-muted-foreground">{data.policy.coverage}</p>
        </div>

        <div className="mt-6 grid gap-x-8 lg:grid-cols-2">
          {ranked.map((row) => {
            const currentReport = row.reports.current[0];
            const positiveCoverage = [
              row.guides.length ? `${row.guides.length} verified guide${row.guides.length === 1 ? "" : "s"}` : null,
              row.access.length ? `${row.access.length} verified access site${row.access.length === 1 ? "" : "s"}` : null,
              row.services.length ? `${row.services.length} verified local service${row.services.length === 1 ? "" : "s"}` : null,
            ].filter(Boolean);
            const displayTargets = selectedSpecies.length
              ? row.matches.filter((item) => item.target).map((item) => ({ name: item.fish.commonName, quality: item.target!.relation.quality }))
              : row.targets.slice(0, 4).map((item) => ({ name: item.species!.commonName, quality: item.relation.quality }));
            return <article key={row.lake.id} className="border-t border-border py-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2"><p className="eyebrow text-primary">{formatRegion(row.lake.region)}</p><span className="border border-border px-2 py-0.5 text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">{row.fullGuide ? "Full fishing guide" : "Lake profile"}</span></div>
                  <h3 className="mt-2 font-display text-3xl"><a href={row.href} className="hover:text-primary">{row.lake.name}</a></h3>
                </div>
                {selectedSpecies.length > 0 ? <span className="text-xs font-semibold text-muted-foreground">{row.matchCount} of {selectedSpecies.length} selected fish</span> : null}
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{row.lake.summary}</p>

              <div className="mt-6">
                <p className="eyebrow text-muted-foreground">Why this matches</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {displayTargets.map((target) => <span key={target.name} className="border border-border px-3 py-1.5 text-xs"><strong>{target.name}</strong> · {titleCase(target.quality)}</span>)}
                  {locationQuery && row.location.label ? <span className="border border-primary/40 px-3 py-1.5 text-xs text-primary">{row.location.label}</span> : null}
                </div>
              </div>

              <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                {row.lake.counties.length ? <Fact label="County" value={row.lake.counties.join(", ")} /> : null}
                {row.lake.nearestCities.length ? <Fact label="Near" value={row.lake.nearestCities.join(", ")} /> : null}
                {row.lake.surfaceAcres ? <Fact label="Surface area" value={`${row.lake.surfaceAcres.toLocaleString("en-US")} acres`} /> : null}
                {row.lake.maxDepthFeet ? <Fact label="Maximum depth" value={`${row.lake.maxDepthFeet} ft`} /> : null}
              </dl>

              {positiveCoverage.length ? <p className="mt-5 text-xs leading-5 text-muted-foreground">{positiveCoverage.join(" · ")}</p> : null}
              {currentReport ? <div className="mt-5 border-l-2 border-primary pl-4"><p className="eyebrow text-primary">Current report</p><p className="mt-2 text-sm font-semibold"><a href={currentReport.href}>{currentReport.report.title}</a></p><p className="mt-1 text-xs text-muted-foreground">Published {currentReport.report.publishedAt.slice(0, 10)}.</p></div> : null}
              <a href={row.href} className="mt-6 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Open {row.fullGuide ? "fishing guide" : "lake profile"} →</a>
            </article>;
          })}
        </div>

        {!ranked.length ? <div className="border-y border-border py-12"><h3 className="font-display text-3xl">No lake matches those choices yet.</h3><p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">Try removing the “require every selected fish” option, broadening the location, or selecting fewer species. A missing result means the published fishing dataset does not currently support that combination; it is not a claim that the fish cannot occur there.</p></div> : null}
      </section>

      <section className="border-y border-border py-10"><p className="eyebrow text-primary">Before you go</p><h2 className="mt-2 font-display text-3xl">Fishery fit is not today's conditions.</h2><p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">{data.policy.conditions} Before travel, verify regulations, lake levels, access, weather and closures with current official sources.</p></section>
    </Container>
  </>;
}

function cleanText(value: unknown) {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim().replace(/\s+/g, " ").slice(0, 80);
  return normalized || undefined;
}

function cleanSlugs(value: unknown) {
  const raw = Array.isArray(value) ? value : typeof value === "string" ? value.split(",") : [];
  const valid = raw.filter((item): item is string => typeof item === "string" && /^[a-z0-9-]+$/.test(item));
  return [...new Set(valid)].slice(0, 12);
}

function scoreTarget(quality?: string) { return quality === "excellent" ? 4 : quality === "good" ? 3 : quality === "fair" ? 2 : quality === "poor" ? 1 : 0; }

function scoreLocation(lake: FishingLake, query: string) {
  if (!query) return { score: 0, label: "" };
  const normalized = query.toLowerCase().replace(/\s+/g, " ").trim();
  const values = [
    lake.name,
    ...(lake.aliases ?? []),
    lake.region,
    formatRegion(lake.region),
    ...lake.counties,
    ...lake.counties.map((county) => `${county} county`),
    ...lake.nearestCities,
  ].map((value) => value.toLowerCase());
  const haystack = values.join(" ");
  const tokens = normalized.split(" ").filter(Boolean);
  if (!tokens.every((token) => haystack.includes(token))) return { score: 0, label: "" };
  const exact = values.find((value) => value === normalized);
  if (exact) return { score: 6, label: `Location match: ${titleCase(exact)}` };
  const starts = values.find((value) => value.startsWith(normalized));
  if (starts) return { score: 4, label: `Location match: ${titleCase(starts)}` };
  return { score: 2, label: `Matches “${query}”` };
}

function formatRegion(value: string) {
  if (value === "prairies-lakes") return "Prairies & Lakes";
  return titleCase(value);
}

function titleCase(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase()); }
function Fact({ label, value }: { label: string; value: string }) { return <div><dt className="eyebrow text-muted-foreground">{label}</dt><dd className="mt-1">{value}</dd></div>; }
