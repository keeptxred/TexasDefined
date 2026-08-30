import type { Article, ArticleBlock, CategorySlug, TexasRegion } from "./types";
import { DEFAULT_EDITORIAL_DESK_ID } from "./editorial-desks";
import { remoteEvergreenInternalLinks } from "./remote-evergreen-internal-links";

const supabaseUrl = String(import.meta.env.VITE_TEXASDEFINED_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
const supabaseKey = String(import.meta.env.VITE_TEXASDEFINED_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "");
const ARTICLE_SELECT = "id,slug,title,dek,category,region,hero_url,hero_alt,hero_credit,author_id,published_at,tags,body_json,related_collections,related_destinations,source_name,source_url";
const SITEMAP_PAGE_SIZE = 200;
const SITEMAP_MAX_ROWS = 10_000;

type RemoteArticleKind = "all" | "evergreen" | "news";

function headers(): HeadersInit {
  return { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}`, Accept: "application/json" };
}

const VALID_CATEGORIES = new Set<CategorySlug>([
  "lakes-rivers","major-springs","state-parks","national-parks","caverns","beaches-coast",
  "historic-sites","road-trips","small-towns","food-bbq","outdoors","sports","events",
  "texas-history","moving-to-texas","home-garden","real-estate","guides",
]);
const VALID_REGIONS = new Set<TexasRegion>([
  "hill-country","gulf-coast","big-bend","panhandle","piney-woods","prairies-lakes","south-texas",
]);

function text(value: unknown): string { return typeof value === "string" ? value.trim() : ""; }
function strings(value: unknown): string[] { return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string" && Boolean(v.trim())) : []; }
function category(value: unknown): CategorySlug {
  const candidate = text(value) as CategorySlug;
  return VALID_CATEGORIES.has(candidate) ? candidate : "guides";
}
function region(value: unknown): TexasRegion | undefined {
  const candidate = text(value) as TexasRegion;
  return VALID_REGIONS.has(candidate) ? candidate : undefined;
}
function body(value: unknown): ArticleBlock[] {
  if (!Array.isArray(value)) return [];
  return value.filter((block): block is ArticleBlock => {
    if (!block || typeof block !== "object") return false;
    const type = (block as { type?: unknown }).type;
    if (type === "list") return Array.isArray((block as { items?: unknown }).items);
    if (["paragraph","heading","quote"].includes(String(type))) return typeof (block as { text?: unknown }).text === "string";
    if (type === "image") {
      const image = (block as { image?: unknown }).image;
      if (!image || typeof image !== "object") return false;
      const candidate = image as { src?: unknown; alt?: unknown; width?: unknown; height?: unknown; credit?: unknown };
      const caption = (block as { caption?: unknown }).caption;
      return typeof candidate.src === "string"
        && typeof candidate.alt === "string"
        && typeof candidate.width === "number"
        && Number.isFinite(candidate.width)
        && candidate.width > 0
        && typeof candidate.height === "number"
        && Number.isFinite(candidate.height)
        && candidate.height > 0
        && (candidate.credit === undefined || typeof candidate.credit === "string")
        && (caption === undefined || typeof caption === "string");
    }
    if (type === "shop") return typeof (block as { collectionSlug?: unknown }).collectionSlug === "string";
    return false;
  });
}

function mapRow(row: Record<string, unknown>): Article | null {
  const slug = text(row.slug);
  const title = text(row.title);
  const heroUrl = text(row.hero_url);
  const blocks = body(row.body_json);
  if (!slug || !title || !heroUrl || blocks.length === 0) return null;
  const mappedRegion = region(row.region);
  const internalLinks = remoteEvergreenInternalLinks[slug];
  return {
    id: `remote-${String(row.id || slug)}`,
    brandId: "texasdefined",
    slug,
    title,
    dek: text(row.dek),
    category: category(row.category),
    ...(mappedRegion ? { region: mappedRegion } : {}),
    hero: { src: heroUrl, alt: text(row.hero_alt) || title, width: 1600, height: 900, credit: text(row.hero_credit) || undefined },
    authorId: text(row.author_id) || DEFAULT_EDITORIAL_DESK_ID,
    publishedAt: text(row.published_at) || new Date().toISOString(),
    readingMinutes: Math.max(1, Math.ceil(JSON.stringify(blocks).split(/\s+/).length / 220)),
    tags: strings(row.tags),
    body: blocks,
    relatedCollections: strings(row.related_collections),
    relatedDestinations: strings(row.related_destinations),
    ...(internalLinks ? { internalLinks: [...internalLinks] } : {}),
    sourceName: text(row.source_name) || undefined,
    sourceUrl: text(row.source_url) || undefined,
  };
}

async function requestRows(params: URLSearchParams): Promise<Record<string, unknown>[]> {
  if (!supabaseUrl || !supabaseKey) return [];
  const response = await fetch(`${supabaseUrl}/rest/v1/texasdefined_articles?${params}`, { headers: headers() });
  if (!response.ok) throw new Error(`TexasDefined articles request failed: ${response.status}`);
  const value = await response.json();
  if (!Array.isArray(value)) return [];
  return value.filter((row): row is Record<string, unknown> => Boolean(row) && typeof row === "object");
}

function mapRows(rows: Record<string, unknown>[]): Article[] {
  return rows.map((row) => mapRow(row)).filter((row): row is Article => Boolean(row));
}

async function request(params: URLSearchParams): Promise<Article[]> {
  return mapRows(await requestRows(params));
}

async function requestAllForSitemap(params: URLSearchParams): Promise<Article[]> {
  const articles: Article[] = [];
  for (let offset = 0; offset < SITEMAP_MAX_ROWS; offset += SITEMAP_PAGE_SIZE) {
    const pageParams = new URLSearchParams(params);
    pageParams.set("limit", String(SITEMAP_PAGE_SIZE));
    pageParams.set("offset", String(offset));
    const rows = await requestRows(pageParams);
    articles.push(...mapRows(rows));
    if (rows.length < SITEMAP_PAGE_SIZE) return articles;
  }
  throw new Error(`TexasDefined sitemap article inventory exceeded guarded ${SITEMAP_MAX_ROWS}-row limit`);
}

function publishedParams(options: { category?: string; limit?: number } = {}, kind: RemoteArticleKind = "all") {
  const params = new URLSearchParams({
    select: ARTICLE_SELECT,
    status: "eq.published",
    order: "published_at.desc",
    limit: String(Math.max(1, Math.min(options.limit ?? 100, 200))),
  });
  if (options.category) params.set("category", `eq.${options.category}`);
  if (kind === "evergreen") params.set("source_feed_id", "is.null");
  if (kind === "news") params.set("source_feed_id", "not.is.null");
  return params;
}

function publishedSlugParams(slug: string, kind: RemoteArticleKind = "all") {
  const params = new URLSearchParams({
    select: ARTICLE_SELECT,
    status: "eq.published",
    slug: `eq.${slug}`,
    limit: "1",
  });
  if (kind === "evergreen") params.set("source_feed_id", "is.null");
  if (kind === "news") params.set("source_feed_id", "not.is.null");
  return params;
}

export async function fetchPublishedTexasDefinedArticles(options: { category?: string; limit?: number } = {}): Promise<Article[]> {
  return request(publishedParams(options));
}

export async function fetchPublishedTexasDefinedArticle(slug: string): Promise<Article | null> {
  return (await request(publishedSlugParams(slug)))[0] ?? null;
}

export async function fetchPublishedTexasDefinedEvergreenArticles(options: { category?: string; limit?: number } = {}): Promise<Article[]> {
  return request(publishedParams(options, "evergreen"));
}

export async function fetchPublishedTexasDefinedEvergreenArticle(slug: string): Promise<Article | null> {
  return (await request(publishedSlugParams(slug, "evergreen")))[0] ?? null;
}

export async function fetchPublishedTexasDefinedNewsArticles(options: { category?: string; limit?: number } = {}): Promise<Article[]> {
  return request(publishedParams(options, "news"));
}

export async function fetchPublishedTexasDefinedNewsArticle(slug: string): Promise<Article | null> {
  return (await request(publishedSlugParams(slug, "news")))[0] ?? null;
}

export async function fetchPublishedTexasDefinedEvergreenArticlesForSitemap(): Promise<Article[]> {
  return requestAllForSitemap(publishedParams({}, "evergreen"));
}

export async function fetchPublishedTexasDefinedNewsArticlesForSitemap(): Promise<Article[]> {
  return requestAllForSitemap(publishedParams({}, "news"));
}
