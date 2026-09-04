const VIATOR_ORIGIN = "https://www.viator.com";
const APPROVED_AFFILIATE_PARAMS = "pid=P00318227&mcid=42383";

function affiliateParams() {
  const raw = (import.meta.env?.VITE_VIATOR_AFFILIATE_PARAMS as string | undefined)?.trim();
  const params = new URLSearchParams((raw || APPROVED_AFFILIATE_PARAMS).replace(/^\?/, ""));
  return params.get("pid") && params.get("mcid") ? params : new URLSearchParams(APPROVED_AFFILIATE_PARAMS);
}

function safeViatorUrl(value: string) {
  try {
    const url = new URL(value, VIATOR_ORIGIN);
    if (url.protocol !== "https:" || url.hostname !== "www.viator.com") return null;
    return url;
  } catch {
    return null;
  }
}

export function buildViatorAffiliateUrl(target: string, campaign?: string) {
  const url = safeViatorUrl(target) ?? new URL(VIATOR_ORIGIN);
  const params = affiliateParams();
  params.forEach((value, key) => {
    if (!url.searchParams.has(key)) url.searchParams.set(key, value);
  });
  if (campaign && !url.searchParams.has("campaign")) url.searchParams.set("campaign", campaign);
  return url.toString();
}
