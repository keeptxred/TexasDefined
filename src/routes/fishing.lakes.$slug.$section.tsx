import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { LakeConroeGuide } from "@/components/fishing/LakeConroeGuide";
import { Container } from "@/components/layout/Container";
import {
  LAKE_CONROE_SLUG,
  LAKE_CONROE_VERIFIED_AT,
  isLakeConroeSection,
  lakeConroeCanonicalPath,
  lakeConroeOverview,
  lakeConroeSectionMeta,
  lakeConroeSources,
} from "@/data/fishing/lake-conroe-prototype";
import { fishingGuidesQuery, fishingLakeQuery, fishingReportsQuery } from "@/data/fishing/queries";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/fishing/lakes/$slug/$section")({
  loader: async ({ context, params }) => {
    if (params.slug !== LAKE_CONROE_SLUG || !isLakeConroeSection(params.section)) throw notFound();
    const lake = await context.queryClient.ensureQueryData(fishingLakeQuery(params.slug));
    if (!lake) throw notFound();
    const [reports, guides] = await Promise.all([
      context.queryClient.ensureQueryData(fishingReportsQuery({ lakeId: lake.id, limit: 20 })),
      context.queryClient.ensureQueryData(fishingGuidesQuery({ lakeId: lake.id, limit: 50 })),
    ]);
    return { lake, reports, guides, section: params.section };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Fishing guide unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { section } = loaderData;
    const page = lakeConroeSectionMeta[section];
    const canonicalPath = lakeConroeCanonicalPath(section);
    const url = `${siteUrl}${canonicalPath}`;
    const overviewUrl = `${siteUrl}${lakeConroeCanonicalPath()}`;
    const webPageSchema = {
      "@type": "WebPage",
      "@id": url,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${overviewUrl}#reservoir` },
      breadcrumb: { "@id": `${url}#breadcrumbs` },
      dateModified: LAKE_CONROE_VERIFIED_AT,
      citation: sectionCitations(section),
    };
    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
        { "@type": "ListItem", position: 3, name: lakeConroeOverview.name, item: overviewUrl },
        { "@type": "ListItem", position: 4, name: page.label, item: url },
      ],
    };
    return {
      meta: buildMeta(texasDefinedBrand, { title: page.title, description: page.description, canonicalPath }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [webPageSchema, breadcrumbSchema] }) }],
    };
  },
  notFoundComponent: () => <Container className="py-24"><p className="eyebrow text-primary">Lake fishing guide</p><h1 className="mt-3 font-display text-4xl">This Lake Conroe section is not available</h1><p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Return to the <Link to={lakeConroeCanonicalPath()} className="border-b border-primary text-primary">Lake Conroe fishing guide</Link>.</p></Container>,
  component: LakeConroeSectionRoute,
});

function LakeConroeSectionRoute() {
  const { section, reports, guides } = Route.useLoaderData();
  return <LakeConroeGuide section={section} reports={reports} guides={guides} />;
}

function sectionCitations(section: keyof typeof lakeConroeSectionMeta) {
  if (section === "access") return [lakeConroeSources.tpwdAccess.url, lakeConroeSources.usfsCagle.url, lakeConroeSources.usfsScottsRidge.url, lakeConroeSources.usfsStubblefield.url];
  if (section === "regulations") return [lakeConroeSources.tpwdRegulations.url, lakeConroeSources.tpwdLake.url];
  if (section === "boating") return [lakeConroeSources.tpwdLake.url, lakeConroeSources.liveLevel.url, lakeConroeSources.sjra.url];
  if (section === "camping") return [lakeConroeSources.usfsCagle.url, lakeConroeSources.usfsScottsRidge.url, lakeConroeSources.usfsStubblefield.url];
  if (section === "reports") return [lakeConroeSources.tpwdReport.url, lakeConroeSources.tpwdLake.url];
  if (section === "fish") return [lakeConroeSources.tpwdLake.url, lakeConroeSources.tpwdHabitat.url];
  return [lakeConroeSources.tpwdLake.url, lakeConroeSources.twdb.url];
}
