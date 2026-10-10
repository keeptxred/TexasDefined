import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { fetchPublishedTexasDefinedNewsArticle } from "@/data/articles-remote";
import { editorialDeskById } from "@/data/editorial-desks";
import { isArticleIndexReady } from "@/data/fixtures/texas-gateway-index-readiness";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

export const Route = createFileRoute("/news/$slug")({
  beforeLoad: async ({ params }) => {
    const { migratedEditorialSlugs } = await import("@/data/fixtures/lazy-migrated-editorial");
    if (migratedEditorialSlugs.includes(params.slug)) throw redirect({ href: `/article/${params.slug}`, statusCode: 301 });

    const article = await fetchPublishedTexasDefinedNewsArticle(params.slug).catch(() => null);
    if (!article) throw notFound();
    return { liveArticle: article };
  },
  head: ({ match, params }) => {
    const article = match.context.liveArticle;
    if (!article) return { meta: [{ title: "Story unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const canonicalPath = `/news/${params.slug}`;
    const canonicalUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
    const author = editorialDeskById(article.authorId);
    const authorUrl = author ? `${siteUrl}/authors/${author.id}` : null;
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: article.title,
        description: article.dek,
        type: "article",
        canonicalPath,
        image: article.hero.src,
        imageAlt: article.hero.alt,
        imageWidth: article.hero.width,
        imageHeight: article.hero.height,
        publishedTime: article.publishedAt,
        robots: isArticleIndexReady(article) ? undefined : "noindex, follow, max-image-preview:large",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      // Match evergreen attribution: institutional author identity and source
      // citations belong to the published page, not just the database row.
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "NewsArticle",
            "@id": `${canonicalUrl}#article`,
            url: canonicalUrl,
            mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
            headline: article.title,
            description: article.dek,
            inLanguage: texasDefinedBrand.identity.locale,
            datePublished: article.publishedAt,
            image: {
              "@type": "ImageObject",
              url: absoluteUrl(texasDefinedBrand, article.hero.src),
              width: article.hero.width,
              height: article.hero.height,
              caption: article.hero.alt,
              ...(article.hero.credit ? { creditText: article.hero.credit } : {}),
            },
            author: author && authorUrl ? {
              "@type": "Organization",
              "@id": `${authorUrl}#desk`,
              name: author.name,
              url: authorUrl,
            } : { "@id": `${siteUrl}/#organization` },
            publisher: { "@id": `${siteUrl}/#organization` },
            isAccessibleForFree: true,
            articleSection: article.category.replace(/-/g, " "),
            keywords: article.tags,
            ...(article.sourceUrl ? { citation: article.sourceUrl } : {}),
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${canonicalUrl}#breadcrumbs`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Front page", item: `${siteUrl}/` },
              { "@type": "ListItem", position: 2, name: "Texas right now", item: `${siteUrl}/news` },
              { "@type": "ListItem", position: 3, name: article.title, item: canonicalUrl },
            ],
          },
        ],
      })],
    };
  },
});
