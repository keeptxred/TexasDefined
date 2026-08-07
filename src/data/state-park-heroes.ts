import type { Destination, ImageRef } from "./types";

const PLACEHOLDER_MARKERS = [
  "texasdefined-destination-placeholder",
  "texasdefined-placeholder",
  "data:image/svg+xml",
];

const COMMONS_API = "https://commons.wikimedia.org/w/api.php";
const ALLOWED_LICENSES = [
  "cc0",
  "public domain",
  "cc by",
  "cc-by",
  "cc by-sa",
  "cc-by-sa",
];

function cleanHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function textTokens(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/state park|state natural area|state historic site|state park & historic site/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter((token) => token.length > 2 && !["the", "and", "texas", "unit"].includes(token));
}

function isJpegUrl(src: string): boolean {
  if (!src) return false;
  if (PLACEHOLDER_MARKERS.some((marker) => src.includes(marker))) return false;
  return /\.jpe?g(?:$|\?)/i.test(src) || /upload\.wikimedia\.org\/.+\.jpe?g/i.test(src);
}

function pageLooksSpecific(pageTitle: string, destination: Destination): boolean {
  const title = pageTitle.toLowerCase();
  const tokens = textTokens(destination.name);
  if (!tokens.length) return true;
  const matches = tokens.filter((token) => title.includes(token)).length;
  return matches >= Math.min(2, tokens.length);
}

function allowedLicense(metadata: Record<string, { value?: string }> | undefined): boolean {
  const license = cleanHtml(metadata?.LicenseShortName?.value || metadata?.UsageTerms?.value).toLowerCase();
  return ALLOWED_LICENSES.some((allowed) => license.includes(allowed));
}

function creditFor(metadata: Record<string, { value?: string }> | undefined): string {
  const artist = cleanHtml(metadata?.Artist?.value || metadata?.Credit?.value || "Wikimedia Commons contributor");
  const license = cleanHtml(metadata?.LicenseShortName?.value || metadata?.UsageTerms?.value || "free license");
  return `${artist} · ${license} · Wikimedia Commons`;
}

type CommonsImageInfo = {
  mime?: string;
  url?: string;
  thumburl?: string;
  descriptionurl?: string;
  extmetadata?: Record<string, { value?: string }>;
};

type CommonsPage = {
  title?: string;
  imageinfo?: CommonsImageInfo[];
};

const heroCache = new Map<string, ImageRef | null>();

async function commonsHero(destination: Destination, used: Set<string>): Promise<ImageRef | null> {
  if (heroCache.has(destination.slug)) {
    const cached = heroCache.get(destination.slug) ?? null;
    return cached && !used.has(cached.src) ? cached : null;
  }

  const query = `${destination.name} Texas`;
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: query,
    gsrnamespace: "6",
    gsrlimit: "15",
    prop: "imageinfo",
    iiprop: "url|mime|extmetadata",
    iiurlwidth: "1600",
    format: "json",
    origin: "*",
  });

  try {
    const response = await fetch(`${COMMONS_API}?${params.toString()}`);
    if (!response.ok) throw new Error(`Commons image search failed: ${response.status}`);
    const payload = await response.json() as { query?: { pages?: Record<string, CommonsPage> } };
    const pages = Object.values(payload.query?.pages ?? {});

    for (const page of pages) {
      const info = page.imageinfo?.[0];
      const src = info?.thumburl || info?.url || "";
      if (!info || info.mime !== "image/jpeg" || !src || used.has(src)) continue;
      if (!allowedLicense(info.extmetadata)) continue;
      if (!pageLooksSpecific(page.title || "", destination)) continue;

      const hero: ImageRef = {
        src,
        alt: `${destination.name} in Texas`,
        width: 1600,
        height: 900,
        credit: creditFor(info.extmetadata),
      };
      heroCache.set(destination.slug, hero);
      return hero;
    }
  } catch (error) {
    console.error(`Unable to resolve a free JPEG hero for ${destination.name}`, error);
  }

  heroCache.set(destination.slug, null);
  return null;
}

/**
 * Preserve real park-specific JPEGs. For any state-park result without one,
 * resolve a freely licensed, park-specific JPEG from Wikimedia Commons.
 * Existing and resolved URLs must be unique within the collection.
 */
export async function hydrateUniqueStateParkHeroes(destinations: Destination[]): Promise<Destination[]> {
  const used = new Set<string>();
  const output: Destination[] = [];

  for (const destination of destinations) {
    if (destination.category !== "state-parks") {
      output.push(destination);
      continue;
    }

    if (isJpegUrl(destination.hero.src) && !used.has(destination.hero.src)) {
      used.add(destination.hero.src);
      output.push(destination);
      continue;
    }

    const resolved = await commonsHero(destination, used);
    if (resolved) {
      used.add(resolved.src);
      output.push({ ...destination, hero: resolved });
      continue;
    }

    // Do not synthesize SVGs or reuse another park's photograph. Leave the
    // current fallback in place only when Commons has no acceptable JPEG.
    output.push(destination);
  }

  return output;
}

export async function hydrateStateParkHero(destination: Destination): Promise<Destination> {
  if (destination.category !== "state-parks" || isJpegUrl(destination.hero.src)) return destination;
  const resolved = await commonsHero(destination, new Set());
  return resolved ? { ...destination, hero: resolved } : destination;
}

export function auditStateParkHeroes(destinations: Destination[]) {
  const parks = destinations.filter((destination) => destination.category === "state-parks");
  const jpegParks = parks.filter((destination) => isJpegUrl(destination.hero.src));
  const duplicateUrls = [...new Set(jpegParks.map((destination) => destination.hero.src).filter((src, index, all) => all.indexOf(src) !== index))];
  return {
    total: parks.length,
    jpeg: jpegParks.length,
    missingJpeg: parks.filter((destination) => !isJpegUrl(destination.hero.src)).map((destination) => destination.slug),
    duplicateUrls,
  };
}
