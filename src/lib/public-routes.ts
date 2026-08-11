export const INDEXABLE_STATIC_PATHS = [
  "/",
  "/explore",
  "/explore/trip-planner",
  "/sports",
  "/events",
  "/texas-history",
  "/moving-to-texas",
  "/moving-to-texas-checklist",
  "/home-garden",
  "/real-estate",
  "/property",
  "/guides",
  "/texas-living",
  "/texas-resources",
  "/texas-data",
  "/county",
  "/property-tax-guides",
  "/property-tax-calculators",
  "/property-tax/counties",
  "/learn/property-taxes",
  "/learn/property-tax-payments",
  "/learn/appraisal-districts",
  "/learn/agricultural-valuation",
  "/learn/wildlife-management-valuation",
  "/learn/disabled-veteran-property-tax-benefits",
  "/learn/over-65-property-tax-guide",
  "/learn/mud-taxes-explained",
  "/learn/property-tax-deadlines",
  "/learn/property-tax-appeals-arbitration",
  "/learn/homebuyer-property-tax-checklist",
  "/decide/property-taxes",
  "/decide/financial-tools",
  "/do/homestead-exemption",
  "/do/property-tax-protest",
  "/browse/counties",
  "/browse/cities",
  "/find-my-dmv",
  "/find-my-school-district",
  "/shop",
  "/about",
  "/texas-agricultural-valuation-calculator",
  "/texas-budget-planner",
  "/texas-closing-cost-calculator",
  "/texas-cost-of-living-calculator",
  "/texas-disabled-veteran-property-tax-calculator",
  "/texas-down-payment-assistance-calculator",
  "/texas-down-payment-calculator",
  "/texas-first-time-homebuyer-programs",
  "/texas-home-affordability-calculator",
  "/texas-home-equity-calculator",
  "/texas-home-equity-growth-calculator",
  "/texas-home-insurance-calculator",
  "/texas-homeownership-cost-calculator",
  "/texas-homestead-savings-calculator",
  "/texas-mortgage-calculator",
  "/texas-mortgage-payoff-calculator",
  "/texas-moving-cost-calculator",
  "/texas-over-65-property-tax-calculator",
  "/texas-property-tax-county-comparison-calculator",
  "/texas-property-tax-escrow-calculator",
  "/texas-property-tax-protest-savings-calculator",
  "/texas-refinance-savings-calculator",
  "/texas-rent-vs-buy-calculator",
  "/texas-salary-calculator",
  "/texas-salary-comparison-by-city",
  "/texas-sales-tax-explained",
  "/texas-utility-cost-calculator",
] as const;

// Public routes whose indexability depends on live content at request time.
// These must never be published unconditionally by a sitemap.
export const CONDITIONAL_INDEXABLE_PUBLIC_PATHS = [
  "/news",
] as const;

export const REDIRECT_ONLY_PATHS = [
  "/tax-calculator",
  "/texas-financial-tools",
  "/texas-property-tax-increase-calculator",
  "/texas-property-tax-protest-guide",
  "/explore/texas-state-parks-guide",
  "/explore/texas-lakes-guide",
  "/explore/texas-camping-guide",
  "/explore/texas-scenic-drives",
  "/explore/texas-wildflower-seasons",
  "/explore/national-wildlife-refuges",
  "/explore/wildlife-management-areas",
  "/explore/lighthouses",
  "/explore/spring-fed-swimming",
  "/explore/hill-country-springs",
  "/explore/spring-conservation-and-education",
] as const;

export const NON_INDEXABLE_PUBLIC_PATHS = [
  "/search",
  "/explore/search",
  "/shop/cart",
  "/shop/checkout-return",
] as const;

const NON_INDEXABLE_PREFIXES = ["/admin", "/api/"] as const;

/**
 * Normalize an internal pathname before it is considered for canonical or
 * sitemap publication. Query strings, fragments, protocol-relative URLs and
 * malformed paths are deliberately rejected rather than normalized into a
 * crawlable URL.
 */
export function normalizePublicPath(path: string) {
  const value = path.trim();
  if (!value || !value.startsWith("/") || value.startsWith("//")) return null;
  if (value.includes("?") || value.includes("#") || /[\u0000-\u001F\u007F]/.test(value)) return null;
  if (value === "/") return value;
  return value.replace(/\/{2,}/g, "/").replace(/\/+$/, "");
}

export function isIndexablePublicPath(path: string) {
  const normalized = normalizePublicPath(path);
  if (!normalized) return false;

  return !NON_INDEXABLE_PREFIXES.some((prefix) => normalized === prefix.replace(/\/$/, "") || normalized.startsWith(prefix))
    && !(REDIRECT_ONLY_PATHS as readonly string[]).includes(normalized)
    && !(NON_INDEXABLE_PUBLIC_PATHS as readonly string[]).includes(normalized);
}
