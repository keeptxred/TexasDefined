import { guideHref, guideIsAvailable } from "@/data/guide-links";
import { shouldNoindexTexasGatewayArticle } from "@/data/fixtures/texas-gateway-index-readiness";
import { fixtureArticles, fixtureGuides } from "@/data/fixtures/repositories";
import type { Article, CategorySlug, Guide } from "@/data/types";
import type {
  TexasSocialEvergreenCategory,
  TexasSocialEvergreenPost,
} from "@/data/texas-social-evergreen";

function normalizeDateKey(date: Date | string): string {
  const value = typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)
    ? `${date}T12:00:00Z`
    : date;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) throw new Error(`Invalid date: ${String(date)}`);
  return parsed.toISOString().slice(0, 10);
}

function articleCategory(category: CategorySlug): TexasSocialEvergreenCategory {
  if (category === "food-bbq") return "food";
  if (category === "road-trips") return "road-trip";
  if (category === "small-towns") return "small-town";
  if (category === "home-garden" || category === "real-estate") return "home";
  if (
    category === "state-parks" ||
    category === "national-parks" ||
    category === "caverns" ||
    category === "beaches-coast" ||
    category === "lakes-rivers" ||
    category === "major-springs" ||
    category === "outdoors"
  ) return "road-trip";
  return "texas-life";
}

function guideCategory(guide: Guide): TexasSocialEvergreenCategory {
  const value = `${guide.topic} ${guide.title}`.toLowerCase();
  if (/food|barbecue|bbq|restaurant/.test(value)) return "food";
  if (/road|trip|park|travel|outdoor/.test(value)) return "road-trip";
  if (/home|property|house|yard|garden/.test(value)) return "home";
  if (/town|city|community/.test(value)) return "small-town";
  return "texas-life";
}

function articleToPost(article: Article): TexasSocialEvergreenPost {
  return {
    id: `article-${article.slug}`,
    category: articleCategory(article.category),
    text: article.title,
    prompt: article.dek,
    link: `/article/${article.slug}`,
  };
}

function guideToPost(guide: Guide): TexasSocialEvergreenPost | null {
  if (!guideIsAvailable(guide)) return null;
  const href = guideHref(guide);
  if (!href) return null;
  return {
    id: `guide-${guide.slug}`,
    category: guideCategory(guide),
    text: guide.title,
    prompt: guide.summary,
    link: href,
  };
}

/**
 * Returns TexasDefined's durable editorial pool for social use.
 *
 * Publication age is intentionally NOT an eligibility condition. A list,
 * guide, history article, road-trip article, or other evergreen page remains
 * eligible no matter when it was originally published. The date is used only
 * to prevent future-dated content from entering the queue early.
 *
 * The same explicit gateway noindex boundary used by the production article
 * route is honored here, so staged acquisition drafts cannot leak into social.
 */
export async function loadTexasSocialDurablePosts(
  asOf: Date | string = new Date(),
): Promise<TexasSocialEvergreenPost[]> {
  const dateKey = normalizeDateKey(asOf);
  const [articles, guides] = await Promise.all([
    fixtureArticles.list({ brandId: "texasdefined" }),
    fixtureGuides.list({ brandId: "texasdefined" }),
  ]);

  const articlePosts = articles
    .filter((article) => article.publishedAt.slice(0, 10) <= dateKey)
    .filter((article) => !shouldNoindexTexasGatewayArticle(article))
    .map(articleToPost);

  const guidePosts = guides
    .map(guideToPost)
    .filter((post): post is TexasSocialEvergreenPost => Boolean(post));

  // Prefer canonical article candidates when a guide resolves to the same URL.
  // This also prevents duplicate links from consuming multiple rotation slots.
  const byLink = new Map<string, TexasSocialEvergreenPost>();
  for (const post of [...articlePosts, ...guidePosts]) {
    const key = post.link ?? `id:${post.id}`;
    if (!byLink.has(key)) byLink.set(key, post);
  }
  return [...byLink.values()];
}
