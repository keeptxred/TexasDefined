import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { getFishingPlannerData } from "@/data/fishing/planner-data.functions";
import { FISHING_LAKE_COMPARE_PATH, FISHING_TRIP_PLANNER_PATH } from "@/data/fishing/planner-routing";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const description = "Plan a Texas fishing trip by target species and region using verified lake-to-species relationships, current-report safeguards, and verified guide, access and local-service coverage.";

type PlannerSearch = { species?: string; region?: string };

export const Route = createFileRoute("/fishing/plan")({
  validateSearch: (search: Record<string, unknown>): PlannerSearch => ({
    species: typeof search.species === "string" && /^[a-z0-9-]+$/.test(search.species) ? search.species : undefined,
    region: typeof search.region === "string" && /^[a-z0-9-]+$/.test(search.region) ? search.region : undefined,
  }),
  loader: () => getFishingPlannerData(),
  head: ({ loaderData }) => {
    const rows = loaderData?.rows ?? [];
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebPage", "@id": `${siteUrl}${FISHING_TRIP_PLANNER_PATH}#page`, url: `${siteUrl}${FISHING_TRIP_PLANNER_PATH}`, name: "Texas Fishing Trip Planner", description, isPartOf: { "@id": `${siteUrl}/#website` } },
        { "@type": "ItemList", "@id": `${siteUrl}${FISHING_TRIP_PLANNER_PATH}#lakes`, name: "Fishing trip planning lake set", numberOfItems: rows.length, itemListElement: rows.map((row, index) => ({ "@type": "ListItem", position: index + 1, name: row.lake.name, url: `${siteUrl}${row.href}` })) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
          { "@type": "ListItem", position: 3, name: "Trip planner", item: `${siteUrl}${FISHING_TRIP_PLANNER_PATH}` },
        ] },
      ],
    };
    return { meta: buildMeta(texasDefinedBrand, { title: "Texas Fishing Trip Planner — Choose a Lake by Species & Region", description, canonicalPath: FISHING_TRIP_PLANNER_PATH }), links: [canonicalLink(texasDefinedBrand, FISHING_TRIP_PLANNER_PATH)], scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] };
  },
  component: FishingTripPlannerPage,
});

function FishingTripPlannerPage() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: FISHING_TRIP_PLANNER_PATH });
  const selectedSpecies = data.species.find((fish) => fish.slug === search.species);
  const filtered = data.rows
    .filter((row) => !search.region || row.lake.region === search.region)
    .filter((row) => !selectedSpecies || row.targets.some((target) => target.species?.id === selectedSpecies.id))
    .map((row) => ({ ...row, fit: selectedSpecies ? scoreTarget(row.targets.find((target) => target.species?.id === selectedSpecies.id)?.relation.quality) : 0 }))
    .sort((a, b) => b.fit - a.fit || a.lake.name.localeCompare(b.lake.name));

  const setSearch = (patch: PlannerSearch) => navigate({ search: (previous) => ({ ...previous, ...patch }), replace: true });

  return <>
    <Container className="pt-8 sm:pt-10"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap items-center gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/fishing">Fishing</Link></li><li aria-hidden>·</li><li aria-current="page">Trip planner</li></ol></nav></Container>
    <header className="mt-5 border-y border-border bg-ink text-ink-foreground"><Container className="py-14 sm:py-20"><p className="eyebrow text-ink-foreground/65">Texas Defined Fishing</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Build a Texas fishing trip around the fish, not the hype.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">Choose a target species and region. The planner narrows only complete, source-backed lake guides and shows current-report context separately from durable fishery information.</p><div className="mt-8 flex flex-wrap gap-5 text-sm"><a href={FISHING_LAKE_COMPARE_PATH} className="border-b border-ink-foreground pb-1 font-semibold">Compare lakes side by side →</a><Link to="/fishing/reports" className="border-b border-ink-foreground/50 pb-1 text-ink-foreground/75">Fishing reports →</Link></div></Container></header>

    <Container className="py-12 sm:py-16">
      <section className="grid gap-6 border-b border-border pb-10 md:grid-cols-2" aria-label="Trip planner filters">
        <label className="text-sm"><span className="eyebrow text-muted-foreground">Target species</span><select value={search.species ?? ""} onChange={(event) => setSearch({ species: event.target.value || undefined })} className="mt-2 w-full border border-border bg-background px-3 py-3"><option value="">Any verified target</option>{data.species.map((fish) => <option key={fish.id} value={fish.slug}>{fish.commonName}</option>)}</select></label>
        <label className="text-sm"><span className="eyebrow text-muted-foreground">Region</span><select value={search.region ?? ""} onChange={(event) => setSearch({ region: event.target.value || undefined })} className="mt-2 w-full border border-border bg-background px-3 py-3"><option value="">Any region</option>{data.regions.map((region) => <option key={region} value={region}>{titleCase(region)}</option>)}</select></label>
      </section>

      <section className="py-10" aria-labelledby="planner-results"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow text-primary">Planner results</p><h2 id="planner-results" className="mt-2 font-display text-4xl">{filtered.length} lake{filtered.length === 1 ? "" : "s"} match the verified filters</h2></div><p className="max-w-xl text-xs leading-5 text-muted-foreground">{data.policy.ranking}</p></div>
        <div className="mt-6 grid gap-x-8 lg:grid-cols-2">{filtered.map((row) => {
          const target = selectedSpecies ? row.targets.find((item) => item.species?.id === selectedSpecies.id) : undefined;
          const currentReport = row.reports.current[0];
          return <article key={row.lake.id} className="border-t border-border py-8"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow text-primary">{titleCase(row.lake.region)}</p><h3 className="mt-2 font-display text-3xl"><a href={row.href} className="hover:text-primary">{row.lake.name}</a></h3></div>{target ? <span className="border border-border px-3 py-1.5 text-xs">{selectedSpecies?.commonName} · {target.relation.quality}</span> : null}</div><p className="mt-4 text-sm leading-7 text-muted-foreground">{row.lake.summary}</p>
            <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2"><Fact label="Verified guides" value={countLabel(row.guides.length)} /><Fact label="Verified access sites" value={countLabel(row.access.length)} /><Fact label="Verified local services" value={countLabel(row.services.length)} /><Fact label="Current reports" value={countLabel(row.reports.current.length)} /></dl>
            {currentReport ? <div className="mt-6 border-l-2 border-primary pl-4"><p className="eyebrow text-primary">Current report context</p><p className="mt-2 text-sm font-semibold"><a href={currentReport.href} className="hover:text-primary">{currentReport.report.title}</a></p><p className="mt-1 text-xs leading-5 text-muted-foreground">Published {formatDate(currentReport.report.publishedAt)}. This report may inform current context because it passes the platform freshness gate.</p></div> : <p className="mt-6 text-xs leading-5 text-muted-foreground">No current verified fishing report is published for this lake. The planner does not infer today's bite from seasonal guidance or an older report.</p>}
            <div className="mt-6 flex flex-wrap gap-5 text-sm"><a href={row.href} className="border-b border-primary pb-1 font-semibold text-primary">Open complete lake guide →</a>{row.reports.older.length ? <Link to="/fishing/reports" className="border-b border-border pb-1 text-muted-foreground">Older reports remain separate →</Link> : null}</div></article>;
        })}</div>
        {!filtered.length ? <div className="border-y border-border py-12"><h3 className="font-display text-3xl">No complete lake currently matches both filters.</h3><p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">That does not mean the species is absent elsewhere in Texas. It means the current complete-guide catalog does not have a verified match for this combination yet.</p></div> : null}
      </section>

      <section className="border-y border-border py-10"><p className="eyebrow text-primary">Freshness rules</p><h2 className="mt-2 font-display text-3xl">Evergreen fishery fit and today's conditions are different products.</h2><div className="mt-5 grid gap-5 text-sm leading-7 text-muted-foreground md:grid-cols-3"><p>{data.policy.conditions}</p><p>{data.policy.local}</p><p>Before travel, verify regulations, lake levels, access status, weather and closures with the official managing agency. The planner is a decision aid, not a live safety or regulatory feed.</p></div></section>
    </Container>
  </>;
}

function scoreTarget(quality?: string) { return quality === "excellent" ? 4 : quality === "good" ? 3 : quality === "fair" ? 2 : quality === "poor" ? 1 : 0; }
function countLabel(value: number) { return value ? String(value) : "None published"; }
function titleCase(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase()); }
function formatDate(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date); }
function Fact({ label, value }: { label: string; value: string }) { return <div><dt className="eyebrow text-muted-foreground">{label}</dt><dd className="mt-1">{value}</dd></div>; }
