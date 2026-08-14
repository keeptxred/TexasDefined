import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { fishingFoundationAnchor, isCompleteFishingLakeSlug } from "@/data/fishing/slugs";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const canonicalPath = "/fishing/lakes";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
const description = "Compare the five complete TexasDefined fishing-lake guides by region, size, counties, nearby cities and verified fishery strengths, then open each lake for fish, access, boating, rules, reports and guide planning.";

export const Route = createFileRoute("/fishing/lakes")({
  loader: async ({ context }) => {
    const { fishSpeciesQuery, fishingLakesQuery, lakeSpeciesProfilesQuery } = await import("@/data/fishing/queries");
    const [allLakes, species, lakeSpecies] = await Promise.all([
      context.queryClient.ensureQueryData(fishingLakesQuery({ limit: 100 })),
      context.queryClient.ensureQueryData(fishSpeciesQuery({ limit: 100 })),
      context.queryClient.ensureQueryData(lakeSpeciesProfilesQuery()),
    ]);
    const lakes = allLakes.filter((lake) => isCompleteFishingLakeSlug(lake.slug));
    const speciesById = new Map(species.map((row) => [row.id, row]));
    const targetsByLake = new Map<string, { name: string; quality: string; prominence: string }[]>();
    for (const relation of lakeSpecies) {
      if (!lakes.some((lake) => lake.id === relation.lakeId)) continue;
      const fish = speciesById.get(relation.speciesId);
      if (!fish) continue;
      const current = targetsByLake.get(relation.lakeId) ?? [];
      current.push({ name: fish.commonName, quality: relation.quality, prominence: relation.prominence });
      targetsByLake.set(relation.lakeId, current);
    }
    const rows = lakes
      .map((lake) => ({
        lake,
        targets: (targetsByLake.get(lake.id) ?? [])
          .sort((left, right) => prominenceRank(left.prominence) - prominenceRank(right.prominence) || qualityRank(left.quality) - qualityRank(right.quality) || left.name.localeCompare(right.name)),
      }))
      .sort((left, right) => left.lake.name.localeCompare(right.lake.name));
    const latestReview = lakes.map((lake) => lake.verifiedAt).filter(Boolean).sort().at(-1);
    return { rows, latestReview };
  },
  head: ({ loaderData }) => {
    const rows = loaderData?.rows ?? [];
    const quickAnswers = buildQuickAnswers(rows.length);
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${canonicalUrl}#page`,
          url: canonicalUrl,
          name: "Texas Fishing Lakes",
          description,
          isPartOf: { "@id": `${siteUrl}/#website` },
          mainEntity: { "@id": `${canonicalUrl}#lakes` },
        },
        {
          "@type": "ItemList",
          "@id": `${canonicalUrl}#lakes`,
          name: "Complete TexasDefined fishing lake guides",
          numberOfItems: rows.length,
          itemListElement: rows.map(({ lake }, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: lake.name,
            url: `${siteUrl}${fishingFoundationAnchor("lake", lake.slug)}`,
          })),
        },
        {
          "@type": "FAQPage",
          "@id": `${canonicalUrl}#answers`,
          mainEntity: quickAnswers.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${canonicalUrl}#breadcrumbs`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Front page", item: siteUrl },
            { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
            { "@type": "ListItem", position: 3, name: "Fishing lakes", item: canonicalUrl },
          ],
        },
      ],
    };
    return {
      meta: buildMeta(texasDefinedBrand, { title: "Texas Fishing Lakes — Compare 5 Complete Lake Guides", description, canonicalPath }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
    };
  },
  component: FishingLakesPage,
});

function FishingLakesPage() {
  const { rows, latestReview } = Route.useLoaderData();
  const quickAnswers = buildQuickAnswers(rows.length);

  return <>
    <Container className="pt-8 sm:pt-10"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap items-center gap-2"><li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden>·</li><li><Link to="/fishing" className="hover:text-foreground">Fishing</Link></li><li aria-hidden>·</li><li aria-current="page">Fishing lakes</li></ol></nav></Container>

    <header className="mt-5 border-y border-border bg-ink text-ink-foreground"><Container className="py-14 sm:py-20"><p className="eyebrow text-ink-foreground/65">Texas Defined Fishing</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Texas fishing lakes</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">Five lake guides have cleared TexasDefined's complete-guide standard. Compare their verified lake facts and fishery strengths here, then open the lake-specific guide for the details that matter on the water.</p><div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link to="/fishing" className="border-b border-ink-foreground pb-1 font-semibold text-ink-foreground">Statewide fishing guide →</Link><Link to="/fishing/species" className="border-b border-ink-foreground/50 pb-1 text-ink-foreground/75">Fish species directory →</Link></div></Container></header>

    <Container className="py-12 sm:py-16">
      <section className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[15rem_1fr]" aria-labelledby="lake-answers-heading"><div><p className="eyebrow text-primary">Quick answers</p><h2 id="lake-answers-heading" className="mt-2 font-display text-3xl">What this directory covers</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">This is a directory of completed TexasDefined lake guides, not a claim that these are the only or universally “best” fishing lakes in Texas.</p></div><div className="grid gap-x-8 md:grid-cols-2">{quickAnswers.map((item) => <article key={item.question} className="border-t border-border py-5"><h3 className="font-display text-2xl leading-tight">{item.question}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p></article>)}</div></section>

      <section className="py-12" aria-labelledby="lake-directory-heading"><div className="flex flex-wrap items-end justify-between gap-5 border-b border-border pb-5"><div><p className="eyebrow text-primary">Complete lake guides</p><h2 id="lake-directory-heading" className="mt-2 font-display text-4xl">Compare before you choose the water</h2></div>{latestReview ? <p className="text-xs leading-5 text-muted-foreground">Lake records reviewed through {formatDate(latestReview)}.</p> : null}</div>
        <div className="grid gap-x-8 lg:grid-cols-2">{rows.map(({ lake, targets }) => <article key={lake.id} className="border-b border-border py-8"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow text-primary">{titleCase(lake.region)}</p><h3 className="mt-2 font-display text-3xl"><a href={fishingFoundationAnchor("lake", lake.slug)} className="hover:text-primary">{lake.name}</a></h3></div><p className="text-sm text-muted-foreground">{lake.surfaceAcres ? `${lake.surfaceAcres.toLocaleString("en-US")} acres` : "Size not listed"}</p></div><p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{lake.summary}</p><dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2"><Fact label="Counties" value={lake.counties.length ? lake.counties.join(", ") : undefined} /><Fact label="Nearby cities" value={lake.nearestCities.length ? lake.nearestCities.join(", ") : undefined} /><Fact label="Maximum depth" value={lake.maxDepthFeet ? `${lake.maxDepthFeet} ft` : undefined} /><Fact label="Primary waterway" value={lake.primaryWaterway} /></dl>{targets.length ? <div className="mt-6"><p className="eyebrow text-muted-foreground">Verified fishing targets</p><ul className="mt-3 flex flex-wrap gap-2">{targets.slice(0, 6).map((target) => <li key={target.name} className="border border-border px-3 py-1.5 text-xs">{target.name} · {target.quality}</li>)}</ul></div> : null}<a href={fishingFoundationAnchor("lake", lake.slug)} className="eyebrow mt-6 inline-block border-b border-primary pb-1 text-primary">Open complete lake guide →</a></article>)}</div>
      </section>

      <section className="border-y border-border py-10"><div className="grid gap-8 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">How to use it</p><h2 className="mt-2 font-display text-3xl">Lake facts are durable. Conditions are not.</h2></div><div className="max-w-4xl space-y-4 text-sm leading-7 text-muted-foreground"><p>The directory compares source-backed identity and fishery information. Individual lake guides go deeper into seasonal patterns, access, boating, camping and local planning.</p><p>Fishing reports, lake levels, ramp usability, regulations and closures can change after these records are reviewed. Use the official fisheries and managing-agency links inside each lake guide before relying on a current condition or rule.</p><p>TexasDefined expands this directory only when another lake has enough verified information to clear the complete-guide standard; unfinished lake records are not exposed here as thin pages.</p></div></div></section>
    </Container>
  </>;
}

function buildQuickAnswers(count: number) {
  return [
    { question: "How many complete Texas fishing lake guides are here?", answer: `TexasDefined currently publishes ${count} complete fishing-lake guides in this directory: Lake Conroe, Lake Fork, Sam Rayburn Reservoir, Lake Livingston and Lake Texoma.` },
    { question: "Are these ranked as the best fishing lakes in Texas?", answer: "No. This directory compares completed, source-backed TexasDefined guides. It does not claim a universal best-lake ranking, and the collection will expand as more lake profiles clear the same verification standard." },
    { question: "Can I compare what fish each lake is known for?", answer: "Yes. Each lake card shows the strongest verified lake-to-species relationships currently in the fishing catalog, while the full lake guide explains seasonal patterns and techniques without presenting them as a live fishing report." },
    { question: "Where should I check current regulations and lake conditions?", answer: "Open the individual lake guide and follow its official source links. TexasDefined keeps current regulations, water levels, access restrictions and fishing reports separate from durable lake facts because those details can change." },
  ];
}

function Fact({ label, value }: { label: string; value?: string }) {
  return value ? <div><dt className="eyebrow text-muted-foreground">{label}</dt><dd className="mt-1">{value}</dd></div> : null;
}

function prominenceRank(value: string) { return value === "primary" ? 0 : value === "secondary" ? 1 : 2; }
function qualityRank(value: string) { return value === "excellent" ? 0 : value === "good" ? 1 : value === "fair" ? 2 : 3; }
function titleCase(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase()); }
function formatDate(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date); }
