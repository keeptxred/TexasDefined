export const UNUSUAL_BUSINESS_ANALYTICS_KIND = "unusual-business-experiment";

const unusualBusinessTargets: Readonly<Record<string, string>> = {
  "/article/unusual-texas-businesses-services": "hub",
  "/article/bluebonnet-animal-preservation-athens": "bluebonnet-animal-preservation-athens",
  "/article/phenix-knives-bellville": "phenix-knives-bellville",
  "/article/horses-on-the-beach-corpus-christi": "horses-on-the-beach-corpus-christi",
  "/article/mum-queen-spring-texas-homecoming-mums": "mum-queen-spring-texas-homecoming-mums",
  "/destination/whirlyball-hurst": "whirlyball-hurst",
};

export function unusualBusinessAnalyticsResource(href: string, placement: string) {
  const target = unusualBusinessTargets[href];
  if (!target) return undefined;
  return `unusual-business:${target}:${placement}`;
}

export function unusualBusinessAnalyticsAttributes(href: string, placement: string) {
  const resourceId = unusualBusinessAnalyticsResource(href, placement);
  return resourceId
    ? {
        "data-entity-id": resourceId,
        "data-entity-kind": UNUSUAL_BUSINESS_ANALYTICS_KIND,
      }
    : {};
}

export function unusualBusinessPageResource(pathname: string) {
  return unusualBusinessAnalyticsResource(pathname, "page-view");
}
