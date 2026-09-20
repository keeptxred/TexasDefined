export const UNUSUAL_BUSINESS_ANALYTICS_KIND = "unusual-business-experiment";

const unusualBusinessTargets: Readonly<Record<string, string>> = {
  "/article/unusual-texas-businesses-services": "hub",
  "/article/bluebonnet-animal-preservation-athens": "bluebonnet-animal-preservation-athens",
  "/article/phenix-knives-bellville": "phenix-knives-bellville",
  "/article/horses-on-the-beach-corpus-christi": "horses-on-the-beach-corpus-christi",
  "/destination/whirlyball-hurst": "whirlyball-hurst",
};

export function unusualBusinessAnalyticsResource(href: string, placement: string) {
  const target = unusualBusinessTargets[href];
  if (!target) return undefined;
  return `unusual-business:${target}:${placement}`;
}
