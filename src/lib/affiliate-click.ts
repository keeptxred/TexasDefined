type AffiliateAnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

export type AffiliateClickDetail = {
  partner: string;
  label: string;
  placement: string;
  module?: string;
};

function pushAffiliateEvent(event: "affiliate_click" | "affiliate_surface_impression", { partner, label, placement, module }: AffiliateClickDetail) {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as AffiliateAnalyticsWindow;
  const detail = {
    event,
    affiliate_partner: partner,
    affiliate_label: label,
    affiliate_placement: placement,
    ...(module ? { affiliate_module: module } : {}),
    page_path: window.location.pathname,
  };
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.dataLayer.push(detail);
  window.dispatchEvent(new CustomEvent(event === "affiliate_click" ? "texasdefined:affiliate-click" : "texasdefined:affiliate-impression", { detail }));
}

export function trackAffiliateClick(detail: AffiliateClickDetail) {
  pushAffiliateEvent("affiliate_click", detail);
}

export function trackAffiliateImpression(detail: AffiliateClickDetail) {
  pushAffiliateEvent("affiliate_surface_impression", detail);
}
