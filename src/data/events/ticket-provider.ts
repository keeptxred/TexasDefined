import type { TexasEventTicketProvider } from "./texas-event-record";

/**
 * An outbound vendor is not an affiliate partnership or a claim of inventory.
 * Classify known checkout/event-ticket hosts; unknown HTTPS organizer URLs
 * remain "official" so their verified links can still be used safely.
 * Never accept lookalike hosts, URL credentials or arbitrary protocols.
 */
const TICKET_HOSTS: ReadonlyArray<readonly [string, TexasEventTicketProvider]> = [
  ["ticketmaster.com", "ticketmaster"],
  ["ticketweb.com", "ticketweb"],
  ["livenation.com", "live-nation"],
  ["etix.com", "etix"],
  ["axs.com", "axs"],
  ["seatgeek.com", "seatgeek"],
  ["vividseats.com", "vivid-seats"],
  ["eventbrite.com", "eventbrite"],
];

/** Ticket CTAs must never target an IP literal, local hostname or reserved test TLD. */
export function publicTicketHostname(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  if (!host || !host.includes(".") || host.startsWith("[")
    || /^\d+\.\d+\.\d+\.\d+$/.test(host)
    || /\.(?:local|localhost|internal|lan|test|invalid|example|onion)$/.test(host)) return false;
  return !host.split(".").some((part) => !part || !/^[a-z0-9-]+$/.test(part) || part.startsWith("-") || part.endsWith("-"));
}

/**
 * A provider/organizer homepage, venue directory, school catalog, or event
 * search is not admission for an identified performance. Keep it available
 * through the separate "Official event site" link, not as "Official Tickets".
 * This is a conservative negative gate: passing does not prove seats, prices
 * or even a live provider checkout.
 */
export function isEventSpecificTicketDestination(value: string): boolean {
  let url: URL;
  try { url = new URL(value); }
  catch { return false; }
  if (url.protocol !== "https:" || !publicTicketHostname(url.hostname)
    || url.username || url.password || url.port) return false;
  const host = url.hostname.toLowerCase();
  const path = url.pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return false;
  const on = (domain: string) => host === domain || host.endsWith("." + domain);
  if (on("gofan.co") && /^\/(?:app\/school|school|app\/search|search)(?:\/|$)/i.test(path)) return false;
  if (on("etix.com") && /^\/ticket\/v(?:\/|$)/i.test(path)) return false;
  if (on("ticketmaster.com") && /^\/(?:browse|venue|artist|search)(?:\/|$)/i.test(path)) return false;
  if (on("ticketweb.com") && /^\/(?:browse|venue|search)(?:\/|$)/i.test(path)) return false;
  if (on("eventbrite.com") && /^\/(?:o|d|organizer)(?:\/|$)/i.test(path)) return false;
  if (on("axs.com") && /^\/(?:venues|artists|browse|search)(?:\/|$)/i.test(path)) return false;
  if (on("livenation.com") && /^\/(?:venue|artist|search)(?:\/|$)/i.test(path)) return false;
  if (on("seatgeek.com") && /^\/(?:venues|performers|cities)(?:\/|$)/i.test(path)) return false;
  if (on("vividseats.com") && (/^\/(?:concerts|sports|theater)$/i.test(path)
    || /^\/venues(?:\/|$)/i.test(path))) return false;
  return true;
}

export function providerForVerifiedTicketUrl(value: string): TexasEventTicketProvider | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port) return null;
    const host = url.hostname.toLowerCase();
    if (!publicTicketHostname(host)) return null;
    for (const [domain, provider] of TICKET_HOSTS) {
      if (host === domain || host.endsWith("." + domain)) return provider;
    }
    return "official";
  } catch {
    return null;
  }
}
