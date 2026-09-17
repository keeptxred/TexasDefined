type AffiliateAnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

export type AffiliateClickDetail = {
  partner: string;
  label: string;
  placement: string;
  module?: string;
};

export function trackAffiliateClick({ partner, label, placement, module }: AffiliateClickDetail) {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as AffiliateAnalyticsWindow;
  const detail = {
    event: "affiliate_click",
    affiliate_partner: partner,
    affiliate_label: label,
    affiliate_placement: placement,
    ...(module ? { affiliate_module: module } : {}),
    page_path: window.location.pathname,
  };
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.dataLayer.push(detail);
  window.dispatchEvent(new CustomEvent("texasdefined:affiliate-click", { detail }));
}
