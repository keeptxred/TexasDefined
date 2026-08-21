import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { LakeConroeGuide } from "@/components/fishing/LakeConroeGuide";
import { LiveLakeLevelStrip } from "@/components/fishing/LiveLakeLevelStrip";
import { ShowcaseLakeGuide } from "@/components/fishing/ShowcaseLakeGuide";
import { Container } from "@/components/layout/Container";
import { getLakeConroePageData } from "@/data/fishing/lake-conroe-page-data.functions";
import { LAKE_CONROE_SLUG, lakeConroeCanonicalPath } from "@/data/fishing/lake-conroe-routing";
import { getLiveLakeLevel } from "@/data/fishing/live-lake-level.functions";
import { isShowcaseLakeSlug, showcaseLakeCanonicalPath } from "@/data/fishing/showcase-lake-routing";
import { getShowcaseLakesPageData } from "@/data/fishing/showcase-lakes-page-data.functions";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/fishing/lakes/$slug")({
  loader: async ({ context, params }) => {
    const { fishingBusinessesQuery, fishingGuidesQuery, fishingLakeQuery, fishingPlacementsQuery, fishingReportsQuery } = await import("@/data/fishing/queries");
    const lake = await context.queryClient.ensureQueryData(fishingLakeQuery(params.slug));
    if (!lake) throw notFound();
    if (params.slug === LAKE_CONROE_SLUG) {
      const pageData = await getLakeConroePageData();
      const [reports, guides, liveLakeLevel] = await Promise.all([
        context.queryClient.ensureQueryData(fishingReportsQuery({ lakeId: lake.id, limit: 20 })),
        context.queryClient.ensureQueryData(fishingGuidesQuery({ lakeId: lake.id, limit: 50 })),
        getLiveLakeLevel({ data: { sourceUrl: pageData.sources.liveLevel.url } }),
      ]);
      return { kind: "conroe" as const, lake, reports, guides, pageData, liveLakeLevel };
    }
    if (!isShowcaseLakeSlug(params.slug)) throw notFound();
    const allPageData = await getShowcaseLakesPageData();
    const pageData = allPageData[params.slug];
    if (!pageData) throw notFound();
    const [reports, guides, businesses, placements, liveLakeLevel] = await Promise.all([
      context.queryClient.ensureQueryData(fishingReportsQuery({ lakeId: lake.id, limit: 20 })),
      context.queryClient.ensureQueryData(fishingGuidesQuery({ lakeId: lake.id, limit: 50 })),
      context.queryClient.ensureQueryData(fishingBusinessesQuery({ lakeId: lake.id, limit: 50 })),
      context.queryClient.ensureQueryData(fishingPlacementsQuery({ lakeId: lake.id, limit: 20 })),
      getLiveLakeLevel({ data: { sourceUrl: pageData.sources.liveLevel.url } }),
    ]);
    return { kind: "showcase" as const, lake, reports, guides, businesses, placements, pageData, liveLakeLevel };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Fishing lake unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    if (loaderData.kind === "conroe") {
      const { overview, sources, verifiedAt } = loaderData.pageData;
      const canonicalPath = lakeConroeCanonicalPath();
      const url = `${siteUrl}${canonicalPath}`;
      const webPageSchema = { "@type": "WebPage", "@id": url, url, name: "Lake Conroe Fishing Guide", description: overview.summary, isPartOf: { "@id": `${siteUrl}/#website` }, mainEntity: { "@id": `${url}#reservoir` }, breadcrumb: { "@id": `${url}#breadcrumbs` }, dateModified: verifiedAt, citation: [sources.tpwdLake.url, sources.twdb.url, sources.sjra.url] };
      const reservoirSchema = { "@type": "Reservoir", "@id": `${url}#reservoir`, url, name: overview.name, description: overview.summary, containedInPlace: { "@type": "State", name: "Texas" }, sameAs: [sources.tpwdLake.url, sources.twdb.url, sources.sjra.url], additionalProperty: [{ "@type": "PropertyValue", name: "Surface area", value: `${overview.surfaceAcres} acres` }, { "@type": "PropertyValue", name: "Impounded", value: overview.impoundedYear }, { "@type": "PropertyValue", name: "River basin", value: overview.riverBasin }, { "@type": "PropertyValue", name: "Counties", value: overview.counties.join(", ") }] };
      const breadcrumbSchema = { "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` }, { "@type": "ListItem", position: 3, name: "Lake Conroe", item: url }] };
      return { meta: buildMeta(texasDefinedBrand, { title: "Lake Conroe Fishing Guide — Fish, Ramps, Rules & Reports", description: "Plan fishing Lake Conroe with verified lake facts, fish species, seasonal tactics, boat ramps, boating notes, regulations, camping, reports and guide listings.", canonicalPath }), links: [canonicalLink(texasDefinedBrand, canonicalPath)], scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [webPageSchema, reservoirSchema, breadcrumbSchema] }) }] };
    }
    const { pageData } = loaderData;
    const canonicalPath = showcaseLakeCanonicalPath(pageData.slug);
    const url = `${siteUrl}${canonicalPath}`;
    const sourceUrls = Object.values(pageData.sources).map((source) => source.url);
    const webPageSchema = { "@type": "WebPage", "@id": url, url, name: `${pageData.overview.name} Fishing Guide`, description: pageData.overview.summary, isPartOf: { "@id": `${siteUrl}/#website` }, mainEntity: { "@id": `${url}#reservoir` }, breadcrumb: { "@id": `${url}#breadcrumbs` }, dateModified: pageData.verifiedAt, citation: sourceUrls };
    const reservoirSchema = { "@type": "Reservoir", "@id": `${url}#reservoir`, url, name: pageData.overview.name, description: pageData.overview.summary, containedInPlace: pageData.overview.stateBorder ? pageData.overview.stateBorder.map((name) => ({ "@type": "State", name })) : { "@type": "State", name: "Texas" }, sameAs: [pageData.sources.tpwdLake.url], additionalProperty: [{ "@type": "PropertyValue", name: "Surface area", value: `${pageData.overview.surfaceAcres} acres` }, { "@type": "PropertyValue", name: "Maximum depth", value: `${pageData.overview.maxDepthFeet} feet` }, { "@type": "PropertyValue", name: "Impounded", value: pageData.overview.impoundedYear }, { "@type": "PropertyValue", name: "Counties", value: pageData.overview.counties.join(", ") }] };
    const breadcrumbSchema = { "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` }, { "@type": "ListItem", position: 3, name: pageData.overview.name, item: url }] };
    const faqSchema = { "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: [{ "@type": "Question", name: `What is ${pageData.overview.name} best known for?`, acceptedAnswer: { "@type": "Answer", text: pageData.identityAngle } }, { "@type": "Question", name: `How large is ${pageData.overview.name}?`, acceptedAnswer: { "@type": "Answer", text: `${pageData.overview.name} covers ${pageData.overview.surfaceAcres.toLocaleString("en-US")} acres and has a published maximum depth of ${pageData.overview.maxDepthFeet} feet.` } }, { "@type": "Question", name: `Where should I check ${pageData.overview.name} fishing rules?`, acceptedAnswer: { "@type": "Answer", text: "Check the current Texas Parks & Wildlife Department rules before harvesting fish; TexasDefined avoids freezing changeable bag limits into evergreen copy." } }] };
    return { meta: buildMeta(texasDefinedBrand, { title: `${pageData.overview.name} Fishing Guide — Fish, Ramps, Rules & Reports`, description: `Plan ${pageData.overview.name} fishing with source-backed lake facts, species, seasonal tactics, access, boating notes, regulations, reports and verified guide listings.`, canonicalPath }), links: [canonicalLink(texasDefinedBrand, canonicalPath)], scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [webPageSchema, reservoirSchema, breadcrumbSchema, faqSchema] }) }] };
  },
  notFoundComponent: () => <Container className="py-24"><p className="eyebrow text-primary">Texas fishing</p><h1 className="mt-3 font-display text-4xl">This lake guide is not published yet</h1><p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Browse the lakes already available in the <Link to="/fishing" className="border-b border-primary text-primary">Texas fishing guide</Link>.</p></Container>,
  component: FishingLakeOverviewRoute,
});

function FishingLakeOverviewRoute() {
  const data = Route.useLoaderData();
  if (data.kind === "conroe") return <>
    <LiveLakeLevelStrip lakeName={data.pageData.overview.name} sourceUrl={data.pageData.sources.liveLevel.url} snapshot={data.liveLakeLevel} />
    <LakeConroeGuide reports={data.reports} guides={data.guides} pageData={data.pageData} />
  </>;
  return <>
    <LiveLakeLevelStrip lakeName={data.pageData.overview.name} sourceUrl={data.pageData.sources.liveLevel.url} snapshot={data.liveLakeLevel} />
    <ShowcaseLakeGuide reports={data.reports} guides={data.guides} businesses={data.businesses} placements={data.placements} pageData={data.pageData} />
  </>;
}
