import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { getFishingPlannerData } from "@/data/fishing/planner-data.functions";
import { FISHING_LAKE_COMPARE_PATH, FISHING_TRIP_PLANNER_PATH } from "@/data/fishing/planner-routing";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const description = "Compare complete Texas fishing lake guides side by side by verified fishery strengths, geography, size, current-report availability, and verified guide, access and service coverage.";

type CompareSearch = { lake1?: string; lake2?: string; lake3?: string };

export const Route = createFileRoute("/fishing/compare")({
  validateSearch: (search: Record<string, unknown>): CompareSearch => ({
    lake1: cleanLakeSlug(search.lake1),
    lake2: cleanLakeSlug(search.lake2),
    lake3: cleanLakeSlug(search.lake3),
  }),
  loader: () => getFishingPlannerData(),
  head: ({ loaderData }) => {
    const rows = loaderData?.rows ?? [];
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebPage", "@id": `${siteUrl}${FISHING_LAKE_COMPARE_PATH}#page`, url: `${siteUrl}${FISHING_LAKE_COMPARE_PATH}`, name: "Texas Fishing Lake Comparison", description, isPartOf: { "@id": `${siteUrl}/#website` } },
        { "@type": "ItemList", "@id": `${siteUrl}${FISHING_LAKE_COMPARE_PATH}#lakes`, name: "Comparable complete Texas fishing lake guides", numberOfItems: rows.length, itemListElement: rows.map((row, index) => ({ "@type": "ListItem", position: index + 1, name: row.lake.name, url: `${siteUrl}${row.href}` })) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
          { "@type": "ListItem", position: 3, name: "Compare lakes", item: `${siteUrl}${FISHING_LAKE_COMPARE_PATH}` },
        ] },
      ],
    };
    return { meta: buildMeta(texasDefinedBrand, { title: "Compare Texas Fishing Lakes — Fishery, Access & Trip Planning", description, canonicalPath: FISHING_LAKE_COMPARE_PATH }), links: [canonicalLink(texasDefinedBrand, FISHING_LAKE_COMPARE_PATH)], scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] };
  },
  component: FishingLakeComparePage,
});

function FishingLakeComparePage() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const requested = [search.lake1, search.lake2, search.lake3].filter((value): value is string => Boolean(value));
  const selectedSlugs = requested.length ? [...new Set(requested)] : data.rows.slice(0, 3).map((row) => row.lake.slug);
  const selected = selectedSlugs.map((slug) => data.rows.find((row) => row.lake.slug === slug)).filter((row): row is (typeof data.rows)[number] => Boolean(row)).slice(0, 3);
  const defaults = selected.map((row) => row.lake.slug);

  return <>
    <Container className="pt-8 sm:pt-10"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap items-center gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/fishing">Fishing</Link></li><li aria-hidden>·</li><li aria-current="page">Compare lakes</li></ol></nav></Container>
    <header className="mt-5 border-y border-border bg-ink text-ink-foreground"><Container className="py-14 sm:py-20"><p className="eyebrow text-ink-foreground/65">Texas Defined Fishing</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Compare fishing lakes without pretending there is one “best.”</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">Select up to three complete lake guides. Compare durable, verified facts and coverage signals side by side; current reports remain a separate freshness-controlled layer.</p><a href={FISHING_TRIP_PLANNER_PATH} className="mt-8 inline-block border-b border-ink-foreground pb-1 text-sm font-semibold">Build a species-first trip →</a></Container></header>

    <Container className="py-12 sm:py-16">
      <section className="border-b border-border pb-10" aria-labelledby="choose-lakes"><p className="eyebrow text-primary">Choose up to three</p><h2 id="choose-lakes" className="mt-2 font-display text-4xl">Lake comparison set</h2>
        <form method="get" action={FISHING_LAKE_COMPARE_PATH} className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
          {["lake1", "lake2", "lake3"].map((name, index) => <label key={name} className="text-sm"><span className="eyebrow text-muted-foreground">Lake {index + 1}</span><select name={name} defaultValue={defaults[index] ?? ""} className="mt-2 w-full border border-border bg-background px-3 py-3"><option value="">None</option>{data.rows.map((row) => <option key={row.lake.id} value={row.lake.slug}>{row.lake.name}</option>)}</select></label>)}
          <button type="submit" className="border border-primary px-5 py-3 text-sm font-semibold text-primary">Compare lakes</button>
        </form><p className="mt-4 text-xs leading-5 text-muted-foreground">Selection changes the comparison view only; it does not create an editorial ranking.</p></section>

      {selected.length ? <section className="py-10 overflow-x-auto" aria-labelledby="comparison-heading"><div className="min-w-[760px]"><div className="grid border-y border-border" style={{ gridTemplateColumns: `12rem repeat(${selected.length}, minmax(12rem, 1fr))` }}><div className="p-4"><p className="eyebrow text-primary">Compare</p><h2 id="comparison-heading" className="mt-2 font-display text-3xl">Verified lake signals</h2></div>{selected.map((row) => <div key={row.lake.id} className="border-l border-border p-4"><p className="eyebrow text-primary">{titleCase(row.lake.region)}</p><h3 className="mt-2 font-display text-2xl"><a href={row.href} className="hover:text-primary">{row.lake.name}</a></h3></div>)}
          <CompareRow label="Surface area" rows={selected.map((row) => row.lake.surfaceAcres ? `${row.lake.surfaceAcres.toLocaleString("en-US")} acres` : "Not published")} />
          <CompareRow label="Maximum depth" rows={selected.map((row) => row.lake.maxDepthFeet ? `${row.lake.maxDepthFeet} ft` : "Not published")} />
          <CompareRow label="Counties" rows={selected.map((row) => row.lake.counties.join(", ") || "Not published")} />
          <CompareRow label="Nearby cities" rows={selected.map((row) => row.lake.nearestCities.join(", ") || "Not published")} />
          <CompareRow label="Top verified targets" rows={selected.map((row) => row.targets.slice(0, 4).map((target) => `${target.species?.commonName} (${target.relation.quality})`).join(" · ") || "No verified target relationships")} />
          <CompareRow label="Current reports" rows={selected.map((row) => row.reports.current.length ? String(row.reports.current.length) : "None published")} />
          <CompareRow label="Verified guides" rows={selected.map((row) => row.guides.length ? String(row.guides.length) : "None published")} />
          <CompareRow label="Verified access" rows={selected.map((row) => row.access.length ? String(row.access.length) : "None published")} />
          <CompareRow label="Verified services" rows={selected.map((row) => row.services.length ? String(row.services.length) : "None published")} />
        </div></div></section> : <p className="py-12 text-sm text-muted-foreground">Select at least one lake to begin comparing.</p>}

      <section className="border-y border-border py-10"><p className="eyebrow text-primary">Comparison policy</p><h2 className="mt-2 font-display text-3xl">Coverage is not a quality score.</h2><div className="mt-5 grid gap-5 text-sm leading-7 text-muted-foreground md:grid-cols-3"><p>Guide, ramp or local-service counts measure verified TexasDefined inventory. A zero does not mean those businesses or facilities do not exist.</p><p>{data.policy.conditions}</p><p>{data.policy.ranking} The comparison engine does not accept paid weighting.</p></div></section>
    </Container>
  </>;
}

function CompareRow({ label, rows }: { label: string; rows: string[] }) { return <><div className="border-t border-border p-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</div>{rows.map((value, index) => <div key={`${label}-${index}`} className="border-l border-t border-border p-4 text-sm leading-6">{value}</div>)}</>; }
function cleanLakeSlug(value: unknown) { return typeof value === "string" && /^[a-z0-9-]+$/.test(value) ? value : undefined; }
function titleCase(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase()); }
