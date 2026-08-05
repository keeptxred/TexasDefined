export const INDEXABLE_STATIC_PATHS = [
  "/",
  "/explore",
  "/sports",
  "/events",
  "/texas-history",
  "/moving-to-texas",
  "/moving-to-texas-checklist",
  "/home-garden",
  "/real-estate",
  "/guides",
  "/texas-living",
  "/texas-resources",
  "/texas-data",
  "/learn/property-taxes",
  "/learn/property-tax-payments",
  "/learn/appraisal-districts",
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
  "/texas-budget-planner",
  "/texas-closing-cost-calculator",
  "/texas-cost-of-living-calculator",
  "/texas-down-payment-assistance-calculator",
  "/texas-down-payment-calculator",
  "/texas-first-time-homebuyer-programs",
  "/texas-home-affordability-calculator",
  "/texas-home-equity-calculator",
  "/texas-home-equity-growth-calculator",
  "/texas-home-insurance-calculator",
  "/texas-homeownership-cost-calculator",
  "/texas-mortgage-calculator",
  "/texas-mortgage-payoff-calculator",
  "/texas-moving-cost-calculator",
  "/texas-refinance-savings-calculator",
  "/texas-rent-vs-buy-calculator",
  "/texas-salary-calculator",
  "/texas-salary-comparison-by-city",
  "/texas-sales-tax-explained",
  "/texas-utility-cost-calculator",
] as const;

export const REDIRECT_ONLY_PATHS = [
  "/tax-calculator",
  "/texas-financial-tools",
  "/texas-property-tax-increase-calculator",
  "/texas-property-tax-protest-guide",
] as const;

export const NON_INDEXABLE_PUBLIC_PATHS = ["/search", "/explore/search"] as const;

export function isIndexablePublicPath(path: string) {
  return !path.startsWith("/admin")
    && !path.startsWith("/api/")
    && !(REDIRECT_ONLY_PATHS as readonly string[]).includes(path)
    && !(NON_INDEXABLE_PUBLIC_PATHS as readonly string[]).includes(path);
}
