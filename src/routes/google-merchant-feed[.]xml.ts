import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { fetchAssignedShopProducts } from "@/data/shop-products-remote";
import type { Product, ProductVariant } from "@/data/types";
import { merchantImageUrl } from "@/lib/merchant-image-url";

const XML_HEADER = '<?xml version="1.0" encoding="UTF-8"?>';
const BASE_URL = "https://texasdefined.com";
const BRAND = "Texas Defined";
const TITLE_LIMIT = 150;
const DESCRIPTION_LIMIT = 5000;
const STANDARD_SHIPPING_PRICE_USD = 6.99;
const FREE_SHIPPING_THRESHOLD_USD = 35;

type MerchantItem = {
  id: string;
  mpn: string;
  itemGroupId?: string;
  title: string;
  description: string;
  link: string;
  canonicalLink: string;
  imageLink: string;
  price: number;
  currency: string;
  color?: string;
  size?: string;
  category?: string;
  apparel: boolean;
};

function escapeXml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function plainText(value: string): string {
  return value
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function limitText(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return value.slice(0, maxLength).replace(/\s+\S*$/, "").trim();
}

function productCategory(product: Product): { category?: string; apparel: boolean } {
  const haystack = [product.name, ...(product.collectionSlugs ?? [])].join(" ").toLowerCase();
  if (/\b(t-?shirt|tee|shirt|sweatshirt|hoodie|tank top|long sleeve)\b/.test(haystack)) return { category: "212", apparel: true };
  if (/\b(hat|cap|beanie|headwear)\b/.test(haystack)) return { category: "173", apparel: true };
  if (/\b(sticker|decal)\b/.test(haystack)) return { category: "4054", apparel: false };
  if (/\btumbler\b/.test(haystack)) return { category: "2951", apparel: false };
  if (/\bmug\b/.test(haystack)) return { category: "2169", apparel: false };
  if (/\b(cup|drinkware)\b/.test(haystack)) return { category: "674", apparel: false };
  if (/\b(poster|print|wall art|canvas)\b/.test(haystack)) return { category: "500044", apparel: false };
  if (/\btote\b/.test(haystack)) return { category: "5608", apparel: false };
  if (/\bbag\b/.test(haystack)) return { category: "5181", apparel: false };
  return { apparel: false };
}

function variantSize(variant: ProductVariant, apparel: boolean): string | undefined {
  const title = variant.title.trim();
  if (!title) return undefined;
  const parts = title.split(/\s*\/\s*|\s*\|\s*|\s+-\s+/).map((part) => part.trim()).filter(Boolean);
  const knownSize = parts.find((part) => /^(?:XXS|XS|S|M|L|XL|2XL|XXL|3XL|XXXL|4XL|XXXXL|5XL|6XL|OS|OSFA|OSFM|ONE\s*SIZE|ONE\s*SIZE\s*FITS\s*(?:ALL|MOST)|\d+(?:\.\d+)?\s*(?:in|inch|inches|cm|oz)?|\d+(?:\.\d+)?\s*[x×]\s*\d+(?:\.\d+)?)$/i.test(part));
  if (knownSize) return knownSize;
  if (apparel && parts.length >= 2) return parts[parts.length - 1];
  return undefined;
}

function variantAttributes(product: Product, variant: ProductVariant, apparel: boolean) {
  const rawColor = variant.color?.trim() || undefined;
  const parsedSize = variantSize(variant, apparel);
  const dimensionFirstProduct = /\b(sticker|decal|poster|print|canvas)\b/.test(product.name.toLowerCase());
  const optionLooksLikeDimensions = rawColor != null && /\d+(?:\.\d+)?\s*(?:in|inch|inches|cm|["″])?\s*[x×]\s*\d+(?:\.\d+)?/i.test(rawColor);
  if (!apparel && dimensionFirstProduct && optionLooksLikeDimensions) return { size: rawColor, color: undefined };
  return { color: rawColor, size: parsedSize };
}

function merchantItems(product: Product): MerchantItem[] {
  const description = limitText(plainText(product.blurb), DESCRIPTION_LIMIT);
  const canonicalLink = `${BASE_URL}/shop/product/${encodeURIComponent(product.id)}`;
  const { category, apparel } = productCategory(product);
  const enabledVariants = (product.variants ?? []).filter((variant) => variant.is_enabled !== false);

  if (!description) return [];

  if (enabledVariants.length === 0) {
    const imageLink = merchantImageUrl(product.image.src);
    const price = product.priceCents / 100;
    if (!imageLink || !Number.isFinite(price) || price <= 0 || apparel) return [];
    return [{
      id: product.id,
      mpn: product.id,
      title: limitText(plainText(product.name), TITLE_LIMIT),
      description,
      link: canonicalLink,
      canonicalLink,
      imageLink,
      price,
      currency: product.currency || "USD",
      category,
      apparel,
      color: product.colors?.length === 1 ? product.colors[0]?.trim() || undefined : undefined,
    }];
  }

  return enabledVariants.flatMap((variant) => {
    const imageLink = merchantImageUrl(variant.image || variant.images?.[0] || product.image.src);
    const price = Number(variant.price || product.priceCents / 100);
    const { color, size } = variantAttributes(product, variant, apparel);
    const finalColor = color || (product.colors?.length === 1 ? product.colors[0]?.trim() : undefined);
    if (!imageLink || !Number.isFinite(price) || price <= 0) return [];
    if (apparel && (!finalColor || !size)) return [];
    const id = `${product.id}-${variant.id}`;
    const link = `${canonicalLink}?variant=${encodeURIComponent(String(variant.id))}`;
    const optionSuffix = [finalColor, size].filter(Boolean).join(" / ");
    return [{
      id,
      mpn: id,
      itemGroupId: product.id,
      title: limitText(plainText(optionSuffix ? `${product.name} - ${optionSuffix}` : product.name), TITLE_LIMIT),
      description,
      link,
      canonicalLink,
      imageLink,
      price,
      currency: product.currency || "USD",
      color: finalColor,
      size,
      category,
      apparel,
    }];
  });
}

function renderItem(item: MerchantItem): string {
  const optional = [
    item.itemGroupId ? `      <g:item_group_id>${escapeXml(item.itemGroupId)}</g:item_group_id>` : "",
    item.color ? `      <g:color>${escapeXml(item.color)}</g:color>` : "",
    item.size ? `      <g:size>${escapeXml(item.size)}</g:size>` : "",
    item.apparel ? "      <g:age_group>adult</g:age_group>" : "",
    item.apparel ? "      <g:gender>unisex</g:gender>" : "",
    item.apparel && item.size ? "      <g:size_system>US</g:size_system>" : "",
    item.category ? `      <g:google_product_category>${escapeXml(item.category)}</g:google_product_category>` : "",
    item.currency.toUpperCase() === "USD" ? `      <g:shipping>\n        <g:country>US</g:country>\n        <g:service>Standard</g:service>\n        <g:price>${STANDARD_SHIPPING_PRICE_USD.toFixed(2)} USD</g:price>\n      </g:shipping>` : "",
    item.currency.toUpperCase() === "USD" ? `      <g:free_shipping_threshold>\n        <g:country>US</g:country>\n        <g:price_threshold>${FREE_SHIPPING_THRESHOLD_USD.toFixed(2)} USD</g:price_threshold>\n      </g:free_shipping_threshold>` : "",
  ].filter(Boolean).join("\n");

  return `    <item>\n      <g:id>${escapeXml(item.id)}</g:id>\n      <title>${escapeXml(item.title)}</title>\n      <description>${escapeXml(item.description)}</description>\n      <link>${escapeXml(item.link)}</link>\n      <g:canonical_link>${escapeXml(item.canonicalLink)}</g:canonical_link>\n      <g:image_link>${escapeXml(item.imageLink)}</g:image_link>\n      <g:availability>in_stock</g:availability>\n      <g:condition>new</g:condition>\n      <g:price>${escapeXml(item.price.toFixed(2))} ${escapeXml(item.currency)}</g:price>\n      <g:brand>${escapeXml(BRAND)}</g:brand>\n      <g:mpn>${escapeXml(item.mpn)}</g:mpn>\n${optional}\n    </item>`;
}

function renderFeed(items: MerchantItem[]): string {
  return `${XML_HEADER}\n<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">\n  <channel>\n    <title>Texas Defined Product Catalog</title>\n    <link>${escapeXml(`${BASE_URL}/shop`)}</link>\n    <description>Texas-inspired apparel, gifts and goods from Texas Defined.</description>\n${items.map(renderItem).join("\n")}\n  </channel>\n</rss>`;
}

function response(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": status === 200
        ? "public, max-age=900, s-maxage=3600, stale-while-revalidate=86400"
        : "no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}

export const Route = createFileRoute("/google-merchant-feed.xml")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const products = await fetchAssignedShopProducts();
          const items = products.flatMap(merchantItems);
          return response(renderFeed(items));
        } catch (error) {
          console.error("google-merchant-feed: live catalog unavailable", error);
          return response("Merchant catalog temporarily unavailable.", 503);
        }
      },
    },
  },
});
