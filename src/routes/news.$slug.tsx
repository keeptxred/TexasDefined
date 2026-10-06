import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { fetchPublishedTexasDefinedNewsArticle } from "@/data/articles-remote";
import { isArticleIndexReady } from "@/data/fixtures/texas-gateway-index-readiness";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/news/$slug")({
  beforeLoad: async ({ params }) => {
    const { migratedEditorialSlugs } = await import("@/data/fixtures/lazy-migrated-editorial");
    if (migratedEditorialSlugs.includes(params.slug)) throw redirect({ href: `/article/${params.slug}`, statusCode: 301 });

    // A remote publication backend outage must not escape this route as an SSR/gateway 5xx.
    // Missing stories and temporarily unreachable remote stories both fail closed here; the
    // news index already uses the same resilient remote-fetch boundary.
    const article = await fetchPublishedTexasDefinedNewsArticle(params.slug).catch((error) => {
      console.error(`[news/$slug] Remote article lookup failed for ${params.slug}`, error);
      return null;
    });
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
