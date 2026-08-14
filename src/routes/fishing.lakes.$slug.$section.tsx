import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { LakeConroeGuide } from "@/components/fishing/LakeConroeGuide";
import { Container } from "@/components/layout/Container";
import { getLakeConroePageData } from "@/data/fishing/lake-conroe-page-data.functions";
import { LAKE_CONROE_SLUG, isLakeConroeSection, lakeConroeCanonicalPath, type LakeConroeSection } from "@/data/fishing/lake-conroe-routing";
import { buildMeta, canonicalLink } from "@/lib/seo";

type LakeConroeSources = Awaited<ReturnType<typeof getLakeConroePageData>>["sources"];
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/fishing/lakes/$slug/$section")({
  loader: async ({ context, params }) => {
    if (params.slug !== LAKE_CONROE_SLUG || !isLakeConroeSection(params.section)) throw notFound();
    const { fishingGuidesQuery, fishingLakeQuery, fishingReportsQuery } = await import("@/data/fishing/queries");
    const lake = await context.queryClient.ensureQueryData(fishingLakeQuery(params.slug));
    if (!lake) throw notFound();
    const [reports, guides, pageData] = await Promise.all([
      context.queryClient.ensureQueryData(fishingReportsQuery({ lakeId: lake.id, limit: 20 })),
      context.queryClient.ensureQueryData(fishingGuidesQuery({ lakeId: lake.id, limit: 50 })),
      getLakeConroePageData(),
    ]);
    return { lake, reports, guides, pageData, section: params.section };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Fishing guide unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { section, pageData } = loaderData;
    const page = pageData.sections.find((item) => item.slug === section);
    if (!page) return { meta: [{ title: "Fishing guide unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const canonicalPath = lakeConroeCanonicalPath(section);
    const url = `${siteUrl}${canonicalPath}`;
    const overviewUrl = `${siteUrl}${lakeConroeCanonicalPath()}`;
    const webPageSchema = { "@type": "WebPage", "@id": url, url, name: page.title, description: page.description, isPartOf: { "@id": `${siteUrl}/#website` }, about: { "@id": `${overviewUrl}#reservoir` }, breadcrumb: { "@id": `${url}#breadcrumbs` }, dateModified: pageData.verifiedAt, citation: sectionCitations(section, pageData.sources) };
    const breadcrumbSchema = { "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
      { "@type": "ListItem", position: 3, name: pageData.overview.name, item: overviewUrl },
      { "@type": "ListItem", position: 4, name: page.label, item: url },
    ] };
    return { meta: buildMeta(texasDefinedBrand, { title: page.title, description: page.description, canonicalPath }), links: [canonicalLink(texasDefinedBrand, canonicalPath)], scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [webPageSchema, breadcrumbSchema] }) }] };
  },
  notFoundComponent: () => <Container className="py-24"><p className="eyebrow text-primary">Lake fishing guide</p><h1 className="mt-3 font-display text-4xl">This Lake Conroe section is not available</h1><p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Return to the <Link to={lakeConroeCanonicalPath()} className="border-b border-primary text-primary">Lake Conroe fishing guide</Link>.</p></Container>,
  component: LakeConroeSectionRoute,
});

function LakeConroeSectionRoute() { const { section, reports, guides, pageData } = Route.useLoaderData(); return <LakeConroeGuide section={section} reports={reports} guides={guides} pageData={pageData} />; }

function sectionCitations(section: LakeConroeSection, sources: LakeConroeSources) {
  if (section === "access") return [sources.tpwdAccess.url, sources.usfsCagle.url, sources.usfsScottsRidge.url, sources.usfsStubblefield.url];
  if (section === "regulations") return [sources.tpwdRegulations.url, sources.tpwdLake.url];
  if (section === "boating") return [sources.tpwdLake.url, sources.liveLevel.url, sources.sjra.url];
  if (section === "camping") return [sources.usfsCagle.url, sources.usfsScottsRidge.url, sources.usfsStubblefield.url];
  if (section === "reports") return [sources.tpwdReport.url, sources.tpwdLake.url];
  if (section === "fish") return [sources.tpwdLake.url, sources.tpwdHabitat.url];
  return [sources.tpwdLake.url, sources.twdb.url];
}
