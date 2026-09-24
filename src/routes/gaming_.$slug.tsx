import { createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

export const Route = createFileRoute("/gaming/$slug")({
  loader: async ({ params }) => {
    const { getTexasGamingPage } = await import("@/data/texas-gaming-authority");
    const page = getTexasGamingPage(params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const canonicalPath = `/gaming/${loaderData.slug}`;
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const graph: Record<string, unknown>[] = [
      { "@type": "WebPage", "@id": `${pageUrl}#page`, url: pageUrl, name: loaderData.title, description: loaderData.description, dateModified: "2026-09-24", articleSection: loaderData.articleSections, isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` }, publisher: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` }, breadcrumb: { "@id": `${pageUrl}#breadcrumb` } },
      { "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") }, { "@type": "ListItem", position: 2, name: "Gaming & Esports", item: absoluteUrl(texasDefinedBrand, "/gaming") }, { "@type": "ListItem", position: 3, name: loaderData.h1, item: pageUrl }] },
    ];
    if (loaderData.faq?.length) graph.push({ "@type": "FAQPage", "@id": `${pageUrl}#faq`, mainEntity: loaderData.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) });
    return {
      meta: buildMeta(texasDefinedBrand, { title: loaderData.title, description: loaderData.description, canonicalPath }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({ "@context": "https://schema.org", "@graph": graph })],
    };
  },
});
