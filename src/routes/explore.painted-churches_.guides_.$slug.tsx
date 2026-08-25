import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/explore/painted-churches/guides/$slug")({
  loader: async ({ params }) => {
    const { paintedChurchSearchGuideBySlug } = await import("@/data/painted-church-search-guides");
    const guide = paintedChurchSearchGuideBySlug.get(params.slug);
    if (!guide) throw notFound();
    return { guide };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Painted Churches guide unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { guide } = loaderData;
    const canonicalPath = `/explore/painted-churches/guides/${params.slug}`;
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: guide.title,
        description: guide.description,
        modifiedTime: "2026-08-18T23:30:00-05:00",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            "@id": `${pageUrl}#article`,
            url: pageUrl,
            headline: guide.title,
            description: guide.description,
            dateModified: "2026-08-18",
            mainEntityOfPage: pageUrl,
            isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/explore/painted-churches/guides")}#collection` },
            publisher: { "@id": `${siteUrl}/#organization` },
            about: guide.relatedChurchSlugs.map((slug) => ({ "@id": `${absoluteUrl(texasDefinedBrand, `/explore/painted-churches/${slug}`)}#church` })),
          },
          {
            "@type": "FAQPage",
            "@id": `${pageUrl}#faq`,
            mainEntity: guide.faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
              { "@type": "ListItem", position: 2, name: "Painted Churches", item: `${siteUrl}/explore/painted-churches` },
              { "@type": "ListItem", position: 3, name: "Search Guide", item: `${siteUrl}/explore/painted-churches/guides` },
              { "@type": "ListItem", position: 4, name: guide.searchIntent, item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  notFoundComponent: () => <Container className="py-24"><p className="eyebrow text-primary">Painted Churches search guide</p><h1 className="mt-3 font-display text-4xl">That guide isn’t available.</h1><p className="mt-4 text-muted-foreground"><Link to="/explore/painted-churches/guides" className="border-b border-primary text-primary">Browse all popular Painted Churches searches.</Link></p></Container>,
});
