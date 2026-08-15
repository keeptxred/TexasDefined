import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { getFishingTechniqueDirectoryData } from "@/data/fishing/technique-data.functions";
import { FISHING_TECHNIQUES_DIRECTORY_PATH } from "@/data/fishing/technique-routing";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const description = "Browse source-backed Texas fishing techniques and see the complete lakes, target species and seasons where each method has a verified relationship in TexasDefined's fishing catalog.";
type TechniqueSearch = { category?: string; species?: string; season?: string };

const faq = [
  { question: "Are these live fishing recommendations?", answer: "No. Technique pages organize durable, source-backed lake relationships. Check fresh fishing reports and current conditions before a trip." },
  { question: "Does TexasDefined recommend specific tackle brands?", answer: "No. The technique directory explains verified methods and lake applications without product rankings, affiliate weighting or sponsor influence." },
  { question: "Why are some fishing techniques not listed?", answer: "A public technique page requires a verified technique record plus at least one verified application on a complete TexasDefined lake guide. Missing coverage is not a judgment that another method does not work." },
];

export const Route = createFileRoute("/fishing/techniques")({
  validateSearch: (search: Record<string, unknown>): TechniqueSearch => ({
    category: slug(search.category),
    species: slug(search.species),
    season: slug(search.season),
  }),
  loader: () => getFishingTechniqueDirectoryData(),
  head: ({ loaderData }) => {
    const entries = loaderData?.entries ?? [];
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", url: `${siteUrl}${FISHING_TECHNIQUES_DIRECTORY_PATH}`, name: "Texas Fishing Techniques", description, mainEntity: { "@id": `${siteUrl}${FISHING_TECHNIQUES_DIRECTORY_PATH}#techniques` } },
        { "@type": "ItemList", "@id": `${siteUrl}${FISHING_TECHNIQUES_DIRECTORY_PATH}#techniques`, numberOfItems: entries.length, itemListElement: entries.map((entry, index) => ({ "@type": "ListItem", position: index + 1, name: entry.technique.name, url: `${siteUrl}${entry.canonicalPath}` })) },
        { "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
          { "@type": "ListItem", position: 3, name: "Fishing techniques", item: `${siteUrl}${FISHING_TECHNIQUES_DIRECTORY_PATH}` },
        ] },
      ],
    };
    return { meta: buildMeta(texasDefinedBrand, { title: "Texas Fishing Techniques — Source-Backed Methods by Lake & Species", description, canonicalPath: FISHING_TECHNIQUES_DIRECTORY_PATH }), links: [canonicalLink(texasDefinedBrand, FISHING_TECHNIQUES_DIRECTORY_PATH)], scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] };
  },
  component: FishingTechniquesPage,
});

function FishingTechniquesPage() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const selectedSpecies = data.species.find((fish) => fish.slug === search.species);
  const entries = data.entries
    .filter((entry) => !search.category || entry.technique.category === search.category)
    .filter((entry) => !selectedSpecies || entry.species.some((fish) => fish.id === selectedSpecies.id))
    .filter((entry) => !search.season || entry.seasons.includes(search.season));

  return <>
    <Container className="pt-8 sm:pt-10"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><a href="/">Front page</a> · <a href="/fishing">Fishing</a> · Fishing techniques</nav></Container>
    <header className="mt-5 border-y border-border bg-ink text-ink-foreground"><Container className="py-14 sm:py-20"><p className="eyebrow text-ink-foreground/65">Texas Defined Fishing</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Fishing techniques tied to real Texas lake relationships.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">Browse methods only when the fishing catalog can connect them to a complete lake guide, target species and verified source relationship.</p><div className="mt-8 flex flex-wrap gap-5 text-sm"><a href="/fishing/seasons" className="border-b border-ink-foreground pb-1 font-semibold">Fishing seasons →</a><a href="/fishing/plan" className="border-b border-ink-foreground/50 pb-1">Trip planner →</a><a href="/fishing/reports" className="border-b border-ink-foreground/50 pb-1">Fresh reports →</a></div></Container></header>

    <Container className="py-12 sm:py-16">
      <section className="grid gap-6 border-y border-border py-8 lg:grid-cols-[15rem_1fr]" aria-labelledby="technique-policy"><div><p className="eyebrow text-primary">Publication standard</p><h2 id="technique-policy" className="mt-2 font-display text-3xl">No generic tackle encyclopedia.</h2></div><div className="grid gap-4 text-sm leading-7 text-muted-foreground md:grid-cols-3"><p>{data.policy.sourcing}</p><p>{data.policy.conditions}</p><p>{data.policy.commerce}</p></div></section>

      <form method="get" action={FISHING_TECHNIQUES_DIRECTORY_PATH} className="grid gap-5 border-b border-border py-8 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end" aria-label="Fishing technique filters">
        <label className="text-sm"><span className="eyebrow text-muted-foreground">Category</span><select name="category" defaultValue={search.category ?? ""} className="mt-2 w-full border border-border bg-background px-3 py-3"><option value="">All categories</option>{data.categories.map((category) => <option key={category} value={category}>{titleCase(category)}</option>)}</select></label>
        <label className="text-sm"><span className="eyebrow text-muted-foreground">Species</span><select name="species" defaultValue={search.species ?? ""} className="mt-2 w-full border border-border bg-background px-3 py-3"><option value="">Any verified species</option>{data.species.map((fish) => <option key={fish.id} value={fish.slug}>{fish.commonName}</option>)}</select></label>
        <label className="text-sm"><span className="eyebrow text-muted-foreground">Season</span><select name="season" defaultValue={search.season ?? ""} className="mt-2 w-full border border-border bg-background px-3 py-3"><option value="">Any verified season</option>{["spring", "summer", "fall", "winter", "year-round"].map((season) => <option key={season} value={season}>{titleCase(season)}</option>)}</select></label>
        <button type="submit" className="border border-primary px-5 py-3 text-sm font-semibold text-primary">Update</button>
      </form>

      <section className="py-10" aria-labelledby="technique-results"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow text-primary">Technique directory</p><h2 id="technique-results" className="mt-2 font-display text-4xl">{entries.length} source-backed technique{entries.length === 1 ? "" : "s"}</h2></div><p className="max-w-xl text-xs leading-6 text-muted-foreground">Directory order is alphabetical. Sponsorship, gear brands and product prices never change technique placement.</p></div>
        <div className="mt-7 grid gap-x-8 lg:grid-cols-2">{entries.map((entry) => <article key={entry.technique.id} className="border-t border-border py-8"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow text-primary">{titleCase(entry.technique.category)}</p><h3 className="mt-2 font-display text-3xl"><a href={entry.canonicalPath} className="hover:text-primary">{entry.technique.name}</a></h3></div><span className="border border-border px-3 py-1.5 text-xs">{entry.lakes.length} lake{entry.lakes.length === 1 ? "" : "s"}</span></div><p className="mt-4 text-sm leading-7 text-muted-foreground">{entry.technique.summary}</p><div className="mt-5 grid gap-4 sm:grid-cols-2"><div><p className="eyebrow text-muted-foreground">Verified species</p><p className="mt-2 text-sm">{entry.species.map((fish) => fish.commonName).join(", ")}</p></div><div><p className="eyebrow text-muted-foreground">Verified seasons</p><p className="mt-2 text-sm">{entry.seasons.map(titleCase).join(", ")}</p></div></div><a href={entry.canonicalPath} className="mt-6 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Open technique guide →</a></article>)}</div>
        {!entries.length ? <div className="border-y border-border py-12"><h3 className="font-display text-3xl">No verified technique matches all filters.</h3><p className="mt-3 text-sm text-muted-foreground">That reflects the current complete-guide catalog, not a claim that another method cannot work.</p></div> : null}
      </section>

      <section className="grid gap-8 border-y border-border py-10 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Before you fish</p><h2 className="mt-2 font-display text-3xl">Method is only one part of the trip.</h2></div><div className="max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground"><p>Use the technique pages to understand verified lake applications, then check <a href="/fishing/reports" className="border-b border-primary text-primary">fresh fishing reports</a>, <a href="/fishing/regulations" className="border-b border-primary text-primary">current regulations</a>, weather, lake levels, access and closures before travel.</p><p className="text-xs">Technique source relationships reviewed through {data.verifiedAt}.</p></div></section>

      <section className="py-12" aria-labelledby="technique-faq"><p className="eyebrow text-primary">Quick answers</p><h2 id="technique-faq" className="mt-2 font-display text-4xl">Texas fishing techniques FAQ</h2><div className="mt-7 grid gap-6 lg:grid-cols-3">{faq.map((item) => <article key={item.question} className="border-t border-border pt-5"><h3 className="font-display text-xl">{item.question}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p></article>)}</div></section>
    </Container>
  </>;
}

function slug(value: unknown) { return typeof value === "string" && /^[a-z0-9-]+$/.test(value) ? value : undefined; }
function titleCase(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase()); }
