/** Bounded, on-demand Viator marketplace feed. This is NOT a product ingestion catalog. */
export const VIATOR_LIVE_DESTINATION_IDS: Readonly<Record<string, string>> = {
  austin: "5021",
  "san-antonio": "910",
  dallas: "918",
  "fort-worth": "33749",
  houston: "5186",
  galveston: "4385",
  fredericksburg: "50796",
  waco: "50076",
  "corpus-christi": "28078",
  "port-aransas": "50797",
  "south-padre-island": "22446",
  "el-paso": "50135",
  "big-bend-terlingua": "50795",
  "amarillo-palo-duro": "29045",
};

export interface ViatorLiveProduct {
  productCode: string;
  title: string;
  url: string;
  imageUrl?: string;
}

export interface ViatorLiveMarketResponse {
  source: "viator";
  market: string;
  refreshedAt: string;
  products: ViatorLiveProduct[];
}

const PARTNER_PID = "P00318227";
const PARTNER_MCID = "42383";
const EXCLUDE_TITLE = /\b(?:airport transfer|airport shuttle|private transfer|scavenger hunt|self-guided scavenger|vehicle rental)\b/i;

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function productImage(value: unknown): string | undefined {
  const items = Array.isArray(value) ? value : [];
  const cover = items.find((item) => asRecord(item)?.isCover === true) ?? items[0];
  const variants = asRecord(cover)?.variants;
  if (!Array.isArray(variants)) return undefined;
  const ordered = [...variants].sort((a, b) => {
    const aWidth = Number(asRecord(a)?.width ?? 0);
    const bWidth = Number(asRecord(b)?.width ?? 0);
    return Math.abs(aWidth - 480) - Math.abs(bWidth - 480);
  });
  for (const variant of ordered) {
    const raw = asRecord(variant)?.url;
    if (typeof raw !== "string") continue;
    try {
      const url = new URL(raw);
      if (url.protocol === "https:" && !url.username && !url.password) return url.toString();
    } catch { /* skip invalid image variant */ }
  }
  return undefined;
}

/**
 * Viator Affiliate API's productUrl is already tracked. Retain its attribution
 * unchanged, adding approved attribution only when the returned URL lacks it.
 * Refuse mismatched partner IDs rather than diverting commission.
 */
function trackedProductUrl(value: unknown, market: string): string | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password ||
        (url.hostname !== "viator.com" && !url.hostname.endsWith(".viator.com"))) return null;
    const pid = url.searchParams.get("pid");
    const mcid = url.searchParams.get("mcid");
    if ((pid && pid !== PARTNER_PID) || (mcid && mcid !== PARTNER_MCID)) return null;
    if (!pid) url.searchParams.set("pid", PARTNER_PID);
    if (!mcid) url.searchParams.set("mcid", PARTNER_MCID);
    if (!url.searchParams.has("medium")) url.searchParams.set("medium", "api");
    if (!url.searchParams.has("campaign")) url.searchParams.set("campaign", `texasdefined-api-${market}`);
    return url.toString();
  } catch {
    return null;
  }
}

export function normalizeViatorMarketProducts(payload: unknown, market: string): ViatorLiveProduct[] {
  const items = asRecord(payload)?.products;
  if (!Array.isArray(items)) throw new Error("Viator product search returned no product array");
  const products: ViatorLiveProduct[] = [];
  const seen = new Set<string>();
  for (const item of items) {
    const record = asRecord(item);
    const productCode = record?.productCode;
    const title = record?.title;
    if (typeof productCode !== "string" || !/^[A-Za-z0-9_-]{1,64}$/.test(productCode) ||
        typeof title !== "string" || title.trim().length < 7 || title.length > 180 ||
        EXCLUDE_TITLE.test(title) || seen.has(productCode)) continue;
    const url = trackedProductUrl(record.productUrl, market);
    if (!url) continue;
    seen.add(productCode);
    const imageUrl = productImage(record.images);
    products.push({ productCode, title: title.trim(), url, ...(imageUrl ? { imageUrl } : {}) });
    if (products.length === 4) break;
  }
  return products;
}
