import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { fishingFoundationAnchor } from "@/data/fishing/slugs";
import { getFishSpeciesDirectoryData } from "@/data/fishing/species-directory-data.functions";
import { FISHING_SPECIES_DIRECTORY_PATH, FISHING_SPECIES_DIRECTORY_EDITORIAL_UPDATED_AT } from "@/data/fishing/species-routing";
import { buildMeta, canonicalLink } from "@/lib/seo";

const FishSpeciesDirectory = lazy(() => import("@/components/fishing/FishSpeciesDirectory").then((module) => ({ default: module.FishSpeciesDirectory })));
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/fishing/species")({
  loader: () => getFishSpeciesDirectoryData(),
  head: ({ loaderData }) => {
    const canonicalPath = FISHING_SPECIES_DIRECTORY_PATH;
    const url = `${siteUrl}${canonicalPath}`;
    const rows = loaderData?.groups.flatMap((group) => group.species) ?? [];
    const itemList = rows.map((row, index) => ({ "@type": "ListItem", position: index + 1, name: row.commonName, url: `${siteUrl}${fishingFoundationAnchor("species", row.slug)}` }));
    const webPage = { "@type": "CollectionPage", "@id": url, url, name: "Texas Freshwater Fish Species", description: "Identify Texas freshwater fish, compare lookalikes, and explore official fishing opportunities and stocking information.", isPartOf: { "@id": `${siteUrl}/#website` }, dateModified: FISHING_SPECIES_DIRECTORY_EDITORIAL_UPDATED_AT, mainEntity: { "@type": "ItemList", numberOfItems: rows.length, itemListElement: itemList } };
    const breadcrumb = { "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
      { "@type": "ListItem", position: 3, name: "Fish species", item: url },
    ] };
    return {
      meta: buildMeta(texasDefinedBrand, { title: "Texas Fish Species Guide — Bass, Crappie, Catfish, Gar & Trout", description: "Identify Texas freshwater fish by illustrations and markings. Compare bass, crappie, catfish, gar, sunfish and trout, then find fishing guidance and official sources.", canonicalPath }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [webPage, breadcrumb] }) }],
    };
  },
  component: FishSpeciesDirectoryRoute,
});

function FishSpeciesDirectoryRoute() {
  const pageData = Route.useLoaderData();
  return (
    <>
      <Container className="pt-8 sm:pt-10">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-foreground">Front page</Link></li>
            <li aria-hidden>·</li>
            <li><Link to="/fishing" className="hover:text-foreground">Fishing</Link></li>
            <li aria-hidden>·</li>
            <li aria-current="page">Fish species</li>
          </ol>
        </nav>
      </Container>

      <section className="mt-5 border-b border-border bg-ink text-ink-foreground">
        <Container className="py-16 sm:py-24">
          <p className="eyebrow text-ink-foreground/70">Texas fish species</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.96] sm:text-7xl">Texas Fish Species</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/82">Compare fish illustrations, scientific names and field markings, then explore practical fishing advice and documented Texas waters. Separate historical records from current fishery conditions.</p>
          <div className="mt-8 flex flex-wrap gap-5 text-sm">
            <Link to="/fishing/species/largemouth-bass" className="border-b border-ink-foreground pb-1 font-semibold text-ink-foreground">Open largemouth bass guide →</Link>
            <Link to="/fishing/lakes" className="border-b border-ink-foreground/50 pb-1 text-ink-foreground/75">Browse Texas fishing lakes →</Link>
            <Link to="/fishing" className="border-b border-ink-foreground/50 pb-1 text-ink-foreground/75">Back to all Texas fishing →</Link>
          </div>
          <dl className="mt-10 grid gap-5 border-t border-ink-foreground/20 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Published records" value={pageData.totalSpecies} />
            <Stat label="Standalone guides" value={pageData.completeSpeciesGuides} />
            <Stat label="Complete lake guides" value={pageData.completeLakeGuides} />
            <Stat label="Directory categories" value={pageData.groups.length} />
          </dl>
        </Container>
      </section>

      <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-12 text-sm text-muted-foreground" role="status">Loading Texas fish species…</div>}>
        <FishSpeciesDirectory pageData={pageData} />
      </Suspense>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) { return <div><dt className="eyebrow text-ink-foreground/55">{label}</dt><dd className="mt-2 font-display text-3xl">{value}</dd></div>; }
