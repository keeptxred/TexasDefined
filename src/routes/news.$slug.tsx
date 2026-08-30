import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { fetchPublishedTexasDefinedNewsArticle } from "@/data/articles-remote";
import { isArticleIndexReady } from "@/data/fixtures/texas-gateway-index-readiness";
import { migratedEditorialSlugs } from "@/data/fixtures/lazy-migrated-editorial";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/news/$slug")({
  beforeLoad: async ({ params }) => {
    if (migratedEditorialSlugs.includes(params.slug)) throw redirect({ href: `/article/${params.slug}`, statusCode: 301 });
    const article = await fetchPublishedTexasDefinedNewsArticle(params.slug);
    if (!article) throw notFound();
    return { liveArticle: article };
  },
  head: ({ match, params }) => {
    const article = match.context.liveArticle;
    if (!article) return { meta: [{ title: "Story unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const canonicalPath = `/news/${params.slug}`;
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
    };
  },
});
