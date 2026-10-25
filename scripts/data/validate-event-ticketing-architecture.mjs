import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const failures = [];
const requireText = (source, needle, label) => { if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`); };

const contract = read("src/data/events/texas-event-record.ts");
const resolver = read("src/data/events/ticketing.ts");
const providerClassifier = read("src/data/events/ticket-provider.ts");
const curatedChristmas = read("src/data/events/christmas-performances-2026.server.ts");
const adapter = read("src/data/events/texas-event-records.server.ts");
const calendar = read("src/data/events/texas-event-calendar.server.ts");
const component = read("src/components/events/EventTicketCta.tsx");
const carousel = read("src/components/editorial/TexasEventCarousel.tsx");
const landing = read("src/components/events/EventsLandingPage.tsx");
const majorEventPage = read("src/data/major-event-page.server.ts");
const docs = read("docs/event-ticketing-provider-architecture.md");

for (const provider of ["official", "ticketmaster", "ticketweb", "live-nation", "etix", "axs", "eventbrite", "seatgeek", "vivid-seats", "other"]) requireText(contract, `\"${provider}\"`, "provider contract");
for (const field of ["provider: TexasEventTicketProvider", "officialTicketUrl?: string", "affiliateUrl?: string", "saleStatus: TexasEventTicketSaleStatus", "source: TexasEventTicketSource", "lastVerifiedAt: string", "officialExpiresAt?: string", "affiliateExpiresAt?: string"]) requireText(contract, field, "ticket-link contract");
for (const status of ["on-sale", "presale", "registration", "not-on-sale-yet", "sold-out", "off-sale", "cancelled", "unknown"]) requireText(contract, `\"${status}\"`, "sale-status contract");
for (const token of ["safeHttpsUrl", 'url.protocol === "https:"', "isExpired", "NON_ACTIONABLE_SALE_STATUSES", "rankedLinks", "affiliateExpiresAt", "officialExpiresAt", 'label: "Find Tickets →"', 'label: "Official Tickets →"', 'rel: "sponsored nofollow noopener noreferrer"', 'rel: "noopener noreferrer"', "resolveEventTicketCta"]) requireText(resolver, token, "ticket resolver");
for (const token of ["providerForVerifiedTicketUrl(url)", "uniqueTicketUrls", "new Set(offers.map((offer) => offer.url))", "officialTicketUrl: url", 'saleStatus: "unknown"', 'kind: "official-event"', "lastVerifiedAt", "priority: index"]) requireText(adapter, token, "official ticket normalization");
if (adapter.includes("affiliateUrl:")) failures.push("official-source adapter must not fabricate affiliate URLs");
for (const token of ['providerForVerifiedTicketUrl', 'ticketmaster.com', 'ticketweb.com', 'livenation.com', 'etix.com', 'axs.com', 'seatgeek.com', 'vividseats.com', 'eventbrite.com']) {
  requireText(providerClassifier, token, "provider-neutral checkout domain classification");
}
requireText(curatedChristmas, "providerForVerifiedTicketUrl(show.sourceUrl)", "Christmas show provider classification");

for (const token of ["resolveEventTicketCta", "ticketCta: resolveEventTicketCta(event.ticketing)"]) requireText(calendar, token, "calendar projection");
for (const token of [
  "target=\"_blank\"",
  "rel={cta.rel}",
  "cta.disclosure",
  "TexasDefined never owns ticket checkout",
  'const partner = cta.isAffiliate ? cta.provider : undefined',
  'data-affiliate-partner={partner}',
  'data-affiliate-placement={partner ? placement : undefined}',
  'data-commercial-partner={partner}',
  'data-commercial-placement={partner ? placement : undefined}',
  'trackAffiliateClick({ partner, label: cta.label, placement, module: "event-ticketing" })',
]) requireText(component, token, "ticket CTA component");
if (component.includes('data-commercial-partner={cta.provider}')) failures.push("official ticket CTAs must not be marked commercial; metadata must remain affiliate-gated");
for (const token of ["EventTicketCta", "event.ticketCta", "Official event site"]) requireText(carousel, token, "carousel integration");
for (const token of ["EventTicketCta", "event.ticketCta", "Official event site"]) requireText(landing, token, "calendar integration");
for (const token of ["loadTicketmasterEventsServer", "resolveEventTicketCta", "buildMajorEventTicketingMarkupServer", "actionable.length === 1", "actionable.length > 1", "major-event-guide-ticket", "Compare ticketed sessions →", "data-affiliate-partner", "cta.rel"]) requireText(majorEventPage, token, "major-event guide ticket integration");
for (const token of ["Calendar workstream", "Venue-page workstream", "Do not read raw ticketing.links in presentation components", "getSportsVenueUpcomingEvents", "buildTexasEventCarouselItemsServer", "Ticketmaster", "SeatGeek", "Vivid Seats", "No checkout", "environment/secrets manager", "deduplicated by destination URL", "validate-event-ticket-positive-path.mjs", "verify-event-ticketing-production.mjs"]) requireText(docs, token, "integration documentation");

const runtimeTest = String.raw`
import { resolveEventTicketCta } from './src/data/events/ticketing.ts';
import { providerForVerifiedTicketUrl } from './src/data/events/ticket-provider.ts';
const supported = {
 'https://www.ticketmaster.com/event/ABC123': 'ticketmaster',
 'https://www.ticketweb.com/event/holiday-concert/142347': 'ticketweb',
 'https://www.livenation.com/event/some-id/holiday-concert': 'live-nation',
 'https://www.etix.com/ticket/v/32639/crighton-theatre': 'etix',
 'https://www.axs.com/events/1234/verified-event': 'axs',
 'https://www.eventbrite.com/e/some-event-tickets-123': 'eventbrite',
 'https://seatgeek.com/events/some-event': 'seatgeek',
 'https://www.vividseats.com/concerts': 'vivid-seats',
 'https://www.hebcenter.com/events/detail/show': 'official',
};
for (const [url, provider] of Object.entries(supported)) {
  if(providerForVerifiedTicketUrl(url) !== provider) throw new Error('Wrong recognized provider: '+url);
}
for (const bad of [
 'https://www.ticketmaster.com.evil.test/event/ABC123',
 'https://ticketmaster.com@evil.test/event/ABC123',
 'http://www.ticketmaster.com/event/ABC123',
 'https://user:password@www.ticketmaster.com/event/ABC123',
 'https://www.ticketmaster.com:8443/event/ABC123',
 'javascript:alert(1)',
 'https://localhost:8080/test',
]) {
  const p = providerForVerifiedTicketUrl(bad);
  if (p !== null && p !== 'official' && bad.includes('evil.test')) throw new Error('Lookalike domain elevated: '+bad);
  if (bad.startsWith('http:') || bad.startsWith('javascript:') || bad.includes('password@') || bad.includes(':8443') || bad.includes('localhost:')) {
    if (p !== null) throw new Error('Unsafe URL was accepted: '+bad);
  }
}

const now = new Date('2026-09-11T21:00:00Z');
const source = { kind: 'official-event', name: 'Verified source' };
const base = { provider: 'ticketmaster', saleStatus: 'on-sale', source, lastVerifiedAt: '2026-09-11T20:00:00Z' };
const both = resolveEventTicketCta({ links: [{ ...base, officialTicketUrl: 'https://tickets.example.com/official', affiliateUrl: 'https://affiliate.example.com/deep' }], offers: [] }, now);
if (!both || both.label !== 'Find Tickets →' || !both.isAffiliate || both.href !== 'https://affiliate.example.com/deep') throw new Error('affiliate priority failed');
const expired = resolveEventTicketCta({ links: [{ ...base, officialTicketUrl: 'https://tickets.example.com/official', affiliateUrl: 'https://affiliate.example.com/deep', affiliateExpiresAt: '2026-09-11T20:30:00Z' }], offers: [] }, now);
if (!expired || expired.label !== 'Official Tickets →' || expired.isAffiliate) throw new Error('expired affiliate fallback failed');
const unsafe = resolveEventTicketCta({ links: [{ ...base, officialTicketUrl: 'https://tickets.example.com/official', affiliateUrl: 'javascript:alert(1)' }], offers: [] }, now);
if (!unsafe || unsafe.href !== 'https://tickets.example.com/official') throw new Error('unsafe affiliate fallback failed');
const soldOut = resolveEventTicketCta({ links: [{ ...base, saleStatus: 'sold-out', officialTicketUrl: 'https://tickets.example.com/official' }], offers: [] }, now);
if (soldOut !== null) throw new Error('sold-out suppression failed');
const prioritized = resolveEventTicketCta({ links: [
  { ...base, provider: 'seatgeek', affiliateUrl: 'https://seatgeek.example.com/deep', priority: 20 },
  { ...base, provider: 'vivid-seats', affiliateUrl: 'https://vivid.example.com/deep', priority: 10 },
], offers: [] }, now);
if (!prioritized || prioritized.provider !== 'vivid-seats') throw new Error('provider-neutral priority failed');
const credentialsLink = resolveEventTicketCta({ links: [{ ...base, officialTicketUrl: 'https://user:pw@tickets.example.com/buy' }], offers: [] }, now);
if (credentialsLink !== null) throw new Error('ticket URL credentials accepted');
const privateHost = resolveEventTicketCta({ links: [{ ...base, officialTicketUrl: 'https://localhost/buy' }], offers: [] }, now);
if (privateHost !== null) throw new Error('localhost ticket destination accepted');
const empty = resolveEventTicketCta({ links: [{ ...base }], offers: [] }, now);
if (empty !== null) throw new Error('empty CTA suppression failed');
`;
const runtime = spawnSync(process.execPath, ["--experimental-strip-types", "--input-type=module", "-e", runtimeTest], { cwd: root, encoding: "utf8" });
if (runtime.status !== 0) failures.push(`runtime resolver test failed: ${(runtime.stderr || runtime.stdout).trim()}`);

if (failures.length) {
  console.error("Event ticketing architecture validation failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("PASS: provider-neutral event ticketing resolves one safe outbound CTA with affiliate-first fallback, expiration/status suppression, deduplicated official destinations, disclosure semantics, affiliate-only first-party partner attribution, and shared calendar/venue integration.");
