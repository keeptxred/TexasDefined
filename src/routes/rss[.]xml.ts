import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { platform, scope } from "@/data";
import { isLegacyCountySeriesArticle } from "@/data/county-series";
import { isArticleIndexReady } from "@/data/fixtures/texas-gateway-index-readiness";

const origin = `https://${texasDefinedBrand.identity.domain}`;
const feedUrl = `${origin}/rss.xml`;
const webSubHub = "https://pubsubhubbub.appspot.com/";
const RSS_LIMIT = 50;
const PINNED_DISCOVERY_SLUGS = new Set([
  "history-of-the-texas-flag",
  "texas-flag-etiquette-display-guide",
]);

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: async () => {
        const eligibleArticles = (await platform.articles.list(scope))
          .filter((article) => !isLegacyCountySeriesArticle(article.slug) && isArticleIndexReady(article));
        const pinnedArticles = eligibleArticles.filter((article) => PINNED_DISCOVERY_SLUGS.has(article.slug));
        const recentArticles = eligibleArticles
          .filter((article) => !PINNED_DISCOVERY_SLUGS.has(article.slug))
          .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
          .slice(0, Math.max(0, RSS_LIMIT - pinnedArticles.length));
        const articles = [...pinnedArticles, ...recentArticles]
          .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));

        const lastBuildDate = toRfc822(articles[0]?.publishedAt) ?? new Date().toUTCString();
        const items = articles.map((article) => {
          const url = `${origin}/article/${article.slug}`;
          const pubDate = toRfc822(article.publishedAt) ?? lastBuildDate;
          return [
            "    <item>",
            `      <title>${escapeXml(article.title)}</title>`,
            `      <link>${escapeXml(url)}</link>`,
            `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
            `      <pubDate>${escapeXml(pubDate)}</pubDate>`,
            `      <description>${escapeXml(article.dek)}</description>`,
            `      <category>${escapeXml(article.category)}</category>`,
            "    </item>",
          ].join("\n");
        }).join("\n");

        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>${escapeXml(texasDefinedBrand.identity.name)}</title>\n    <link>${escapeXml(origin)}</link>\n    <description>${escapeXml(texasDefinedBrand.seo.defaultDescription)}</description>\n    <language>${escapeXml(texasDefinedBrand.identity.locale)}</language>\n    <lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>\n    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />\n    <atom:link href="${escapeXml(webSubHub)}" rel="hub" />\n${items}\n  </channel>\n</rss>`;

        return new Response(body, {
          headers: {
            "content-type": "application/rss+xml; charset=utf-8",
            "cache-control": "public, max-age=900, s-maxage=1800, stale-while-revalidate=86400",
          },
        });
      },
    },
  },
});

function toRfc822(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toUTCString();
}

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  })[character] ?? character);
}
