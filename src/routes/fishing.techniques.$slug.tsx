import { createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { getFishingTechniqueProfileData } from "@/data/fishing/technique-data.functions";
import { fishingTechniqueLakeHref, fishingTechniqueSpeciesHref } from "@/data/fishing/technique-data.server";
import { FISHING_TECHNIQUES_DIRECTORY_PATH } from "@/data/fishing/technique-routing";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/fishing/techniques/$slug")({
  loader: async ({ params }) => {
    const pageData = await getFishingTechniqueProfileData({ data: { slug: params.slug } });
    if (!pageData) throw notFound();
    return pageData;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex, nofollow" }] };
    const { technique, canonicalPath, lakes, species, sources } = loaderData;
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const description = `${technique.name} fishing in Texas: source-backed lake applications, target species and seasonal context drawn from TexasDefined's complete fishing-lake guides.`;
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebPage", url: `${origin}${canonicalPath}`, name: `${technique.name} Fishing in Texas`, description, dateModified: technique.verifiedAt, about: { "@type": "Thing", name: technique.name, description: technique.summary }, citation: sources.map((source) => source.url), mainEntity: { "@id": `${origin}${canonicalPath}#lake-applications` } },
        { "@type": "ItemList", "@id": `${origin}${canonicalPath}#lake-applications`, numberOfItems: lakes.length, itemListElement: lakes.map((lake, index) => ({ "@type": "ListItem", position: index + 1, name: `${technique.name} — ${lake.name}`, url: `${origin}${fishingTechniqueLakeHref(lake.slug)}` })) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: origin },
          { "@type": "ListItem", position: 2, name: "Fishing", item: `${origin}/fishing` },
          { "@type": "ListItem", position: 3, name: "Fishing techniques", item: `${origin}${FISHING_TECHNIQUES_DIRECTORY_PATH}` },
          { "@type": "ListItem", position: 4, name: technique.name, item: `${origin}${canonicalPath}` },
        ] },
        { "@type": "Thing", name: technique.name, description: technique.summary, subjectOf: `${origin}${canonicalPath}`, keywords: species.map((fish) => fish.commonName).join(", ") },
      ],
    };
    return { meta: buildMeta(texasDefinedBrand, { title: `${technique.name} Fishing in Texas — Lakes, Species & Seasons`, description, canonicalPath }), links: [canonicalLink(texasDefinedBrand, canonicalPath)], scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] };
  },
  component: FishingTechniqueProfilePage,
  notFoundComponent: () => <div className="mx-auto max-w-3xl px-6 py-20"><h1 className="font-display text-4xl">Verified fishing technique not found</h1><p className="mt-4 text-muted-foreground">TexasDefined only publishes technique profiles after the method has a verified application on at least one complete fishing-lake guide.</p><a href={FISHING_TECHNIQUES_DIRECTORY_PATH} className="mt-6 inline-block border-b border-primary pb-1 font-semibold text-primary">Browse fishing techniques →</a></div>,
});

function FishingTechniqueProfilePage() {
  const data = Route.useLoaderData();
  const { technique } = data;
  return <>
    <Container className="pt-8 sm:pt-10"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><a href="/">Front page</a> · <a href="/fishing">Fishing</a> · <a href={FISHING_TECHNIQUES_DIRECTORY_PATH}>Fishing techniques</a> · {technique.name}</nav></Container>
    <header className="mt-5 border-y border-border bg-ink text-ink-foreground"><Container className="py-14 sm:py-20"><p className="eyebrow text-ink-foreground/65">{titleCase(technique.category)} technique</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">{technique.name} fishing in Texas.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">{technique.summary}</p><div className="mt-8 flex flex-wrap gap-5 text-sm"><a href="/fishing/seasons" className="border-b border-ink-foreground pb-1 font-semibold">Fishing seasons →</a><a href="/fishing/reports" className="border-b border-ink-foreground/50 pb-1">Fresh reports →</a><a href="/fishing/regulations" className="border-b border-ink-foreground/50 pb-1">Current regulations →</a></div></Container></header>

    <Container className="py-12 sm:py-16">
      <section className="grid gap-6 border-y border-border py-8 sm:grid-cols-3" aria-label="Technique coverage"><div><p className="eyebrow text-muted-foreground">Complete lakes</p><p className="mt-2 font-display text-4xl">{data.lakes.length}</p></div><div><p className="eyebrow text-muted-foreground">Verified species</p><p className="mt-2 font-display text-4xl">{data.species.length}</p></div><div><p className="eyebrow text-muted-foreground">Season labels</p><p className="mt-2 font-display text-4xl">{data.seasons.length}</p></div></section>

      <section className="py-12" aria-labelledby="lake-applications"><div className="max-w-3xl"><p className="eyebrow text-primary">Where this method is sourced</p><h2 id="lake-applications" className="mt-3 font-display text-4xl sm:text-5xl">Verified lake applications, not a universal ranking.</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Each entry below comes from a lake-technique relationship already attached to a complete TexasDefined fishing guide. A lake missing from this page is simply not yet covered by this verified technique dataset.</p></div>
        <div className="mt-8 grid gap-x-8 lg:grid-cols-2">{data.profiles.map((row) => <article key={row.profile.id} className="border-t border-border py-8"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow text-primary">Complete lake guide</p><h3 className="mt-2 font-display text-3xl"><a href={fishingTechniqueLakeHref(row.lake.slug)} className="hover:text-primary">{row.lake.name}</a></h3></div><span className="border border-border px-3 py-1.5 text-xs">{row.profile.seasons.map(titleCase).join(" · ")}</span></div><p className="mt-4 text-sm leading-7 text-muted-foreground">{row.profile.summary}</p><div className="mt-5"><p className="eyebrow text-muted-foreground">Target species in this relationship</p><ul className="mt-3 flex flex-wrap gap-2">{row.species.map((fish) => <li key={fish.id}><a href={fishingTechniqueSpeciesHref(fish.slug)} className="inline-block border border-border px-3 py-1.5 text-xs hover:border-primary hover:text-primary">{fish.commonName}</a></li>)}</ul></div><a href={fishingTechniqueLakeHref(row.lake.slug)} className="mt-6 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Open {row.lake.name} fishing guide →</a></article>)}</div>
      </section>

      <section className="grid gap-8 border-y border-border py-10 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">What this page means</p><h2 className="mt-2 font-display text-3xl">Durable method context, not today's answer.</h2></div><div className="max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground"><p>This page does not claim that {technique.name.toLowerCase()} is productive today, that it is the best technique statewide, or that a particular product or brand should be purchased.</p><p>For a trip happening now, pair this durable relationship data with <a href="/fishing/reports" className="border-b border-primary text-primary">fresh reports</a>, weather, water conditions, access information and <a href="/fishing/regulations" className="border-b border-primary text-primary">current regulations</a>.</p><p>Season labels here describe the seasons explicitly attached to the verified lake-technique relationship. A “year-round” label does not promise equal conditions or catch rates every day.</p></div></section>

      <section className="py-12" aria-labelledby="technique-sources"><p className="eyebrow text-primary">Sources</p><h2 id="technique-sources" className="mt-2 font-display text-4xl">Source relationships behind this page</h2><div className="mt-7 grid gap-5 md:grid-cols-2">{data.sources.map((source) => <article key={source.url} className="border-t border-border pt-5"><h3 className="font-display text-xl">{source.name}</h3><p className="mt-2 text-xs text-muted-foreground">Checked {source.checkedAt}</p><a href={source.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Open official/source page ↗</a></article>)}</div></section>

      <section className="border-t border-border py-10"><a href={FISHING_TECHNIQUES_DIRECTORY_PATH} className="border-b border-primary pb-1 text-sm font-semibold text-primary">← Browse all verified fishing techniques</a></section>
    </Container>
  </>;
}

function titleCase(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase()); }
