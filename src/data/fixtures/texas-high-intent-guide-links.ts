import { destinationInboundHighIntentGuides } from "./texas-high-intent-authority-evidence";

export const HIGH_INTENT_GUIDE_ROUTES: Record<number, { slug: string; label: string; category: string }> = {
  106: { slug: "best-fishing-lakes-in-texas", label: "Best fishing lakes in Texas", category: "lakes-rivers" },
  107: { slug: "best-rv-parks-in-texas", label: "Best Texas RV parks", category: "rv-parks" },
  108: { slug: "best-small-towns-to-visit-in-texas", label: "Best small towns to visit", category: "small-towns" },
  109: { slug: "best-state-parks-for-camping-in-texas", label: "Best state parks for camping", category: "state-parks" },
  110: { slug: "best-lakes-for-swimming-in-texas", label: "Best Texas lakes for swimming", category: "lakes-rivers" },
  111: { slug: "best-rivers-for-tubing-in-texas", label: "Best rivers for tubing", category: "lakes-rivers" },
  112: { slug: "best-towns-for-antiquing-in-texas", label: "Best Texas towns for antiquing", category: "small-towns" },
  113: { slug: "best-scenic-drives-in-texas", label: "Best scenic drives in Texas", category: "road-trips" },
  114: { slug: "best-museums-in-texas", label: "Best museums in Texas", category: "historic-sites" },
  115: { slug: "best-weekend-getaways-in-texas", label: "Best weekend getaways in Texas", category: "road-trips" },
};
export const highIntentGuideLinksForDestination = (slug: string) => destinationInboundHighIntentGuides(slug).map((number) => ({
  ...HIGH_INTENT_GUIDE_ROUTES[number],
  href: `/article/${HIGH_INTENT_GUIDE_ROUTES[number].slug}`,
}));
export const HIGH_INTENT_GUIDE_SLUGS = new Set(Object.values(HIGH_INTENT_GUIDE_ROUTES).map((row) => row.slug));
