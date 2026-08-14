import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { LakeConroeGuide } from "@/components/fishing/LakeConroeGuide";
import { Container } from "@/components/layout/Container";
import { getLakeConroePageData } from "@/data/fishing/lake-conroe-page-data.functions";
import { LAKE_CONROE_SLUG, lakeConroeCanonicalPath } from "@/data/fishing/lake-conroe-routing";
import { fishingGuidesQuery, fishingLakeQuery, fishingReportsQuery } from "@/data/fishing/queries";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/fishing/lakes/$slug")({
  loader: async ({ context, params }) => {
    if (params.slug !== LAKE_CONROE_SLUG) throw notFound();
    const lake = await context.queryClient.ensureQueryData(fishingLakeQuery(params.slug));
    if (!lake) throw notFound();
    const [reports, guides, pageData] = await Promise.all([
      context.queryClient.ensureQueryData(fishingReportsQuery({ lakeId: lake.id, limit: 20 })),
      context.queryClient.ensureQueryData(fishingGuidesQuery({ lakeId: lake.id, limit: 50 })),
      getLakeConroePageData(),
    ]);
    return { lake, reports, guides, pageData };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Fishing lake unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { overview, sources, verifiedAt } = loaderData.pageData;
    const canonicalPath = lakeConroeCanonicalPath();
    const url = `${siteUrl}${canonicalPath}`;
    const webPageSchema = { "@type": "WebPage", "@id": url, url, name: "Lake Conroe Fishing Guide", description: overview.summary, isPartOf: { "@id": `${siteUrl}/#website` }, mainEntity: { "@id": `${url}#reservoir` }, breadcrumb: { "@id": `${url}#breadcrumbs` }, dateModified: verifiedAt, citation: [sources.tpwdLake.url, sources.twdb.url, sources.sjra.url] };
    const reservoirSchema = { "@type": "Reservoir", "@id": `${url}#reservoir`, url, name: overview.name, description: overview.summary, containedInPlace: { "@type": "State", name: "Texas" }, sameAs: [sources.tpwdLake.url, sources.twdb.url, sources.sjra.url], additionalProperty: [
      { "@type": "PropertyValue", name: "Surface area", value: `${overview.surfaceAcres} acres` },
      { "@type": "PropertyValue", name: "Impounded", value: overview.impoundedYear },
      { "@type": "PropertyValue", name: "River basin", value: overview.riverBasin },
      { "@type": "PropertyValue", name: "Counties", value: overview.counties.join(", ") },
    ] };
    const breadcrumbSchema = { "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
      { "@type": "ListItem", position: 3, name: "Lake Conroe", item: url },
    ] };
    return {
      meta: buildMeta(texasDefinedBrand, { title: "Lake Conroe Fishing Guide — Fish, Ramps, Rules & Reports", description: "Plan fishing Lake Conroe with verified lake facts, fish species, seasonal tactics, boat ramps, boating notes, regulations, camping, reports and guide listings.", canonicalPath }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [webPageSchema, reservoirSchema, breadcrumbSchema] }) }],
    };
  },
  notFoundComponent: () => <Container className="py-24"><p className="eyebrow text-primary">Texas fishing</p><h1 className="mt-3 font-display text-4xl">This lake guide is not published yet</h1><p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Browse the lakes already available in the <Link to="/fishing" className="border-b border-primary text-primary">Texas fishing guide</Link>.</p></Container>,
  component: LakeConroeOverviewRoute,
});

function LakeConroeOverviewRoute() { const { reports, guides, pageData } = Route.useLoaderData(); return <LakeConroeGuide reports={reports} guides={guides} pageData={pageData} />; }
