const VIATOR_ORIGIN = "https://www.viator.com";

function affiliateParams() {
  const raw = (import.meta.env.VITE_VIATOR_AFFILIATE_PARAMS as string | undefined)?.trim();
  if (!raw) return new URLSearchParams();
  return new URLSearchParams(raw.replace(/^\?/, ""));
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

export function isViatorAffiliateConfigured() {
  const params = affiliateParams();
  return params.has("pid") && params.has("mcid");
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
