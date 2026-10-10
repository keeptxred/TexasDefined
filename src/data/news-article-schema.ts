import type { Article } from "./types";
import { editorialDeskById } from "./editorial-desks";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl } from "@/lib/seo";

/** Article-specific graph is fetched only when a published news story loads. */
export function buildPublishedNewsArticleSchema(article: Article) {
  const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
  const canonicalUrl = `${siteUrl}/news/${article.slug}`;
  const author = editorialDeskById(article.authorId);
  const authorUrl = author ? `${siteUrl}/authors/${author.id}` : null;
  return {
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
      };
}
