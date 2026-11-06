import type { Guide } from "./types";

const GUIDE_HREFS: Record<string, string> = {
  "property-tax-estimator": "/texas-property-tax-estimator",
  "cost-of-living-comparison": "/texas-cost-of-living-calculator",
  "state-park-reservation-playbook": "/explore/state-parks",
  "texas-regions-explained": "/explore",
  "first-year-in-texas-checklist": "/moving-to-texas-checklist",
};

export function guideHref(guide: Pick<Guide, "slug">): string | undefined {
  return GUIDE_HREFS[guide.slug];
}

export function guideIsAvailable(guide: Pick<Guide, "slug" | "status">): boolean {
  return guide.status === "available" || Boolean(guideHref(guide));
}
