import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { LakeConroeGuide } from "@/components/fishing/LakeConroeGuide";
import { LiveLakeLevelStrip } from "@/components/fishing/LiveLakeLevelStrip";
import { ShowcaseLakeGuide } from "@/components/fishing/ShowcaseLakeGuide";
import { Container } from "@/components/layout/Container";
import { getLakeConroePageData } from "@/data/fishing/lake-conroe-page-data.functions";
import { LAKE_CONROE_SLUG, isLakeConroeSection, lakeConroeCanonicalPath, type LakeConroeSection } from "@/data/fishing/lake-conroe-routing";
import { isShowcaseLakeSection, isShowcaseLakeSlug, showcaseLakeCanonicalPath, type ShowcaseLakeSection } from "@/data/fishing/showcase-lake-routing";
import { getShowcaseLakesPageData } from "@/data/fishing/showcase-lakes-page-data.functions";
import { buildMeta, canonicalLink } from "@/lib/seo";

type LakeConroeSources = Awaited<ReturnType<typeof getLakeConroePageData>>["sources"];
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/fishing/lakes/$slug/$section")({
  loader: async ({ context, params }) => {
    const { fishingBusinessesQuery, fishingGuidesQuery, fishingLakeQuery, fishingPlacementsQuery, fishingReportsQuery } = await import("@/data/fishing/queries");
    const lake = await context.queryClient.ensureQueryData(fishingLakeQuery(params.slug));
    if (!lake) throw notFound();
    if (params.slug === LAKE_CONROE_SLUG) {
      if (!isLakeConroeSection(params.section)) throw notFound();
      const pageData = await getLakeConroePageData();
      const [reports, guides] = await Promise.all([
        context.queryClient.ensureQueryData(fishingReportsQuery({ lakeId: lake.id, limit: 20 })),
        context.queryClient.ensureQueryData(fishingGuidesQuery({ lakeId: lake.id, limit: 50 })),
      ]);
      return { kind: "conroe" as const, lake, reports, guides, pageData, section: params.section, liveLakeLevel: pageData.liveLakeLevel };
    }
    if (!isShowcaseLakeSlug(params.slug) || !isShowcaseLakeSection(params.section)) throw notFound();
    const allPageData = await getShowcaseLakesPageData();
    const pageData = allPageData[params.slug];
    if (!pageData) throw notFound();
    const [reports, guides, businesses, placements] = await Promise.all([
      context.queryClient.ensureQueryData(fishingReportsQuery({ lakeId: lake.id, limit: 20 })),
      context.queryClient.ensureQueryData(fishingGuidesQuery({ lakeId: lake.id, limit: 50 })),
      context.queryClient.ensureQueryData(fishingBusinessesQuery({ lakeId: lake.id, limit: 50 })),
      context.queryClient.ensureQueryData(fishingPlacementsQuery({ lakeId: lake.id, limit: 20 })),
    ]);
    return { kind: "showcase" as const, lake, reports, guides, businesses, placements, pageData, section: params.section, liveLakeLevel: pageData.liveLakeLevel };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Fishing guide unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    if (loaderData.kind === "conroe") {
      const { section, pageData } = loaderData;
      const page = pageData.sections.find((item) => item.slug === section);
      if (!page) return { meta: [{ title: "Fishing guide unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
      const canonicalPath = lakeConroeCanonicalPath(section);
      const url = `${siteUrl}${canonicalPath}`;
      const overviewUrl = `${siteUrl}${lakeConroeCanonicalPath()}`;
      const webPageSchema = { "@type": "WebPage", "@id": url, url, name: page.title, description: page.description, isPartOf: { "@id": `${siteUrl}/#website` }, about: { "@id": `${overviewUrl}#reservoir` }, breadcrumb: { "@id": `${url}#breadcrumbs` }, dateModified: pageData.verifiedAt, citation: sectionCitations(section, pageData.sources) };
      const breadcrumbSchema = { "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` }, { "@type": "ListItem", position: 3, name: pageData.overview.name, item: overviewUrl }, { "@type": "ListItem", position: 4, name: page.label, item: url }] };
      return { meta: buildMeta(texasDefinedBrand, { title: page.title, description: page.description, canonicalPath }), links: [canonicalLink(texasDefinedBrand, canonicalPath)], scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [webPageSchema, breadcrumbSchema] }) }] };
    }
    const { section, pageData } = loaderData;
    const page = pageData.sections.find((item) => item.slug === section);
    if (!page) return { meta: [{ title: "Fishing guide unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const canonicalPath = showcaseLakeCanonicalPath(pageData.slug, section);
    const url = `${siteUrl}${canonicalPath}`;
    const overviewUrl = `${siteUrl}${showcaseLakeCanonicalPath(pageData.slug)}`;
    const webPageSchema = { "@type": "WebPage", "@id": url, url, name: page.title, description: page.description, isPartOf: { "@id": `${siteUrl}/#website` }, about: { "@id": `${overviewUrl}#reservoir` }, breadcrumb: { "@id": `${url}#breadcrumbs` }, dateModified: pageData.verifiedAt, citation: showcaseSectionCitations(section, pageData.sources) };
    const breadcrumbSchema = { "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` }, { "@type": "ListItem", position: 3, name: pageData.overview.name, item: overviewUrl }, { "@type": "ListItem", position: 4, name: page.label, item: url }] };
    return { meta: buildMeta(texasDefinedBrand, { title: page.title, description: page.description, canonicalPath }), links: [canonicalLink(texasDefinedBrand, canonicalPath)], scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [webPageSchema, breadcrumbSchema] }) }] };
  },
  notFoundComponent: () => <Container className="py-24"><p className="eyebrow text-primary">Lake fishing guide</p><h1 className="mt-3 font-display text-4xl">This fishing section is not available</h1><p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Return to the <Link to="/fishing" className="border-b border-primary text-primary">Texas fishing guide</Link>.</p></Container>,
  component: FishingLakeSectionRoute,
});

function FishingLakeSectionRoute() {
  const data = Route.useLoaderData();
  if (data.kind === "conroe") return <>
    <LiveLakeLevelStrip lakeName={data.pageData.overview.name} sourceUrl={data.pageData.sources.liveLevel.url} snapshot={data.liveLakeLevel} />
    <LakeConroeGuide section={data.section} reports={data.reports} guides={data.guides} pageData={data.pageData} />
  </>;
  return <>
    <LiveLakeLevelStrip lakeName={data.pageData.overview.name} sourceUrl={data.pageData.sources.liveLevel.url} snapshot={data.liveLakeLevel} />
    <ShowcaseLakeGuide section={data.section} reports={data.reports} guides={data.guides} businesses={data.businesses} placements={data.placements} pageData={data.pageData} />
  </>;
}

function sectionCitations(section: LakeConroeSection, sources: LakeConroeSources) {
  if (section === "access") return [sources.tpwdAccess.url, sources.usfsCagle.url, sources.usfsScottsRidge.url, sources.usfsStubblefield.url];
  if (section === "regulations") return [sources.tpwdRegulations.url, sources.tpwdLake.url];
  if (section === "boating") return [sources.tpwdLake.url, sources.liveLevel.url, sources.sjra.url];
  if (section === "camping") return [sources.usfsCagle.url, sources.usfsScottsRidge.url, sources.usfsStubblefield.url];
  if (section === "reports") return [sources.tpwdReport.url, sources.tpwdLake.url];
  if (section === "fish") return [sources.tpwdLake.url, sources.tpwdHabitat.url];
  return [sources.tpwdLake.url, sources.twdb.url];
}

function showcaseSectionCitations(section: ShowcaseLakeSection, sources: Record<string, { url: string }>) {
  if (section === "access") return [sources.tpwdAccess.url, sources.tpwdLake.url];
  if (section === "regulations") return [sources.tpwdRegulations.url, sources.tpwdLake.url];
  if (section === "boating") return [sources.liveLevel.url, sources.tpwdLake.url];
  return [sources.tpwdLake.url];
}
