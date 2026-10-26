type AffiliateAnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

export type AffiliateClickDetail = {
  partner: string;
  label: string;
  placement: string;
  module?: string;
  eventId?: string;
};

export function trackAffiliateClick({ partner, label, placement, module, eventId }: AffiliateClickDetail) {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as AffiliateAnalyticsWindow;
  const detail = {
    event: "affiliate_click",
    affiliate_partner: partner,
    affiliate_label: label,
    affiliate_placement: placement,
    ...(module ? { affiliate_module: module } : {}),
    ...(eventId ? { affiliate_event_id: eventId } : {}),
    page_path: window.location.pathname,
    device_class: window.matchMedia?.("(max-width: 767px)").matches ? "mobile" : "desktop",
  };
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.dataLayer.push(detail);
  window.dispatchEvent(new CustomEvent("texasdefined:affiliate-click", { detail }));
}

/**
 * Visible, consent-respecting module impression (not a server-side booking or a conversion).
 * The caller fires only after an IntersectionObserver confirms the offer appeared onscreen.
 */
export function trackAffiliateImpression({ partner, label, placement, module, eventId }: AffiliateClickDetail) {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as AffiliateAnalyticsWindow;
  const detail = {
    event: "affiliate_impression",
    affiliate_partner: partner,
    affiliate_label: label,
    affiliate_placement: placement,
    ...(module ? { affiliate_module: module } : {}),
    ...(eventId ? { affiliate_event_id: eventId } : {}),
    page_path: window.location.pathname,
    device_class: window.matchMedia?.("(max-width: 767px)").matches ? "mobile" : "desktop",
  };
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.dataLayer.push(detail);
  window.dispatchEvent(new CustomEvent("texasdefined:affiliate-impression", { detail }));
}
