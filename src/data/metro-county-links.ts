import { TEXAS_COUNTY_SLUGS } from "./texas-county-slugs.ts";

/** Never turn an unverified free-text county name into a /county/ route. */
export function countySlug(value: string): string | null {
  const plain = value.replace(/\s+County$/i, "").trim();
  const slug = plain.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return TEXAS_COUNTY_SLUGS.has(slug) ? slug : null;
}

export function countyNames(value: string): string[] {
  return [...new Set(value.replace(/\s+Count(?:y|ies)$/i, "")
    .split(/\s*(?:,|\/|&|\band\b)\s*/i)
    .map((part) => part.replace(/\s+County$/i, "").trim())
    .filter((part) => countySlug(part) !== null))];
}
