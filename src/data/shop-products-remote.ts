import type { Product, ProductVariant, Slug } from "./types";

type StoreProduct = {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  currency: string;
  imageUrl: string;
  productUrl?: string | null;
  tags?: string[];
  collections?: string[];
  colors?: string[];
  variants?: ProductVariant[];
};

const DEFAULT_COMMERCE_API = "https://keeptxred.com";

export function commerceApiBase() {
  const configured = import.meta.env.VITE_COMMERCE_API_BASE_URL as string | undefined;
  return (configured || DEFAULT_COMMERCE_API).replace(/\/$/, "");
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function toProduct(row: StoreProduct): Product {
  return {
    id: row.id,
    brandId: "texasdefined",
    slug: slugify(row.title) || row.id,
    name: row.title,
    maker: "Texas Defined",
    priceCents: Math.round(Number(row.price || 0) * 100),
    currency: "USD",
    image: { src: row.imageUrl, alt: row.title, width: 1200, height: 1200 },
    blurb: row.description?.trim() || "A Texas-inspired pick selected for the Texas Defined shop.",
    collectionSlugs: row.collections ?? [],
    madeInTexas: false,
    productUrl: `/shop/product/${encodeURIComponent(row.id)}`,
    colors: row.colors ?? [],
    variants: Array.isArray(row.variants) ? row.variants : [],
  };
}

export async function fetchAssignedShopProducts(params: { collection?: Slug; limit?: number; id?: string } = {}): Promise<Product[]> {
  // In the browser go through our own same-origin proxy route: the shared
  // storefront API only allows a fixed CORS origin list, so a direct call from
  // preview/custom domains fails with "Failed to fetch". On the server we can
  // call the upstream API directly.
  const base = typeof window === "undefined" ? commerceApiBase() : window.location.origin;
  const url = new URL("/api/public/store-products", base);
  url.searchParams.set("site", "texasdefined");
  if (params.collection) url.searchParams.set("collection", params.collection);
  if (params.limit) url.searchParams.set("limit", String(params.limit));
  if (params.id) url.searchParams.set("id", params.id);

  const response = await fetch(url, { headers: { accept: "application/json" }, signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error(`Commerce catalog unavailable (${response.status})`);
  const payload = await response.json() as { ok?: boolean; products?: StoreProduct[]; error?: string };
  if (!payload.ok) throw new Error(payload.error || "Commerce catalog unavailable");
  return (payload.products ?? []).filter((product) => product.imageUrl && product.title).map(toProduct);
}
