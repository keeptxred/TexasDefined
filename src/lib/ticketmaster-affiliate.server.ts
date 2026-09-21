const TICKETMASTER_HOSTS = new Set(["ticketmaster.com", "www.ticketmaster.com"]);

function safeTicketmasterUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !TICKETMASTER_HOSTS.has(url.hostname.toLowerCase())) return null;
    return url;
  } catch {
    return null;
  }
}

function trackingTemplate() {
  const value = process.env["TICKETMASTER_IMPACT_TRACKING_TEMPLATE"]?.trim();
  if (!value || !value.includes("{url}")) return null;
  try {
    const probe = new URL(value.replaceAll("{url}", encodeURIComponent("https://www.ticketmaster.com/")).replaceAll("{campaign}", "texasdefined"));
    return probe.protocol === "https:" ? value : null;
  } catch {
    return null;
  }
}

export function isTicketmasterUrl(value: string) {
  return Boolean(safeTicketmasterUrl(value));
}

/**
 * Convert a verified Ticketmaster destination into the approved Impact tracking
 * URL. The Impact template is deployment configuration rather than source data.
 *
 * Example template shape:
 * https://<approved-impact-host>/...?...&u={url}&subId1={campaign}
 *
 * The exact partner/campaign identifiers must come from TexasDefined's approved
 * Ticketmaster program account. If configuration is absent or malformed, return
 * null so callers retain the verified official Ticketmaster URL as a safe
 * non-affiliate fallback.
 */
export function buildTicketmasterAffiliateUrl(target: string, campaign = "event-ticketing") {
  const ticketmasterUrl = safeTicketmasterUrl(target);
  const template = trackingTemplate();
  if (!ticketmasterUrl || !template) return null;

  const candidate = template
    .replaceAll("{url}", encodeURIComponent(ticketmasterUrl.toString()))
    .replaceAll("{campaign}", encodeURIComponent(campaign));

  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:") return null;
    if (TICKETMASTER_HOSTS.has(url.hostname.toLowerCase())) return null;
    return url.toString();
  } catch {
    return null;
  }
}
