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

export function providerForVerifiedTicketUrl(value: string): TexasEventTicketProvider | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port) return null;
    const host = url.hostname.toLowerCase();
    if (!host || host === "localhost" || host.endsWith(".localhost")) return null;
    for (const [domain, provider] of TICKET_HOSTS) {
      if (host === domain || host.endsWith("." + domain)) return provider;
    }
    return "official";
  } catch {
    return null;
  }
}
