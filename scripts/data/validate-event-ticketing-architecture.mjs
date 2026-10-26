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
const siteAnalytics = read("src/platform/analytics.ts");
requireText(siteAnalytics, "stepId: anchor.dataset.affiliateEventId", "first-party event-specific commercial click attribution");
const docs = read("docs/event-ticketing-provider-architecture.md");
const affiliateClick = read("src/lib/affiliate-click.ts");
requireText(affiliateClick, "affiliate_event_id: eventId", "event-specific affiliate click attribution");

for (const provider of ["official", "ticketmaster", "ticketweb", "live-nation", "etix", "axs", "eventbrite", "seatgeek", "vivid-seats", "other"]) requireText(contract, `\"${provider}\"`, "provider contract");
for (const field of ["provider: TexasEventTicketProvider", "officialTicketUrl?: string", "affiliateUrl?: string", "saleStatus: TexasEventTicketSaleStatus", "source: TexasEventTicketSource", "lastVerifiedAt: string", "officialExpiresAt?: string", "affiliateExpiresAt?: string"]) requireText(contract, field, "ticket-link contract");
for (const status of ["on-sale", "presale", "registration", "not-on-sale-yet", "sold-out", "off-sale", "cancelled", "unknown"]) requireText(contract, `\"${status}\"`, "sale-status contract");
for (const token of ["approvedAffiliateHref", "safeHttpsUrl", 'url.protocol === "https:"', "isExpired", "NON_ACTIONABLE_SALE_STATUSES", "rankedLinks", "affiliateExpiresAt", "officialExpiresAt", 'label: "Find Tickets →"', 'label: "Official Tickets →"', 'rel: "sponsored nofollow noopener noreferrer"', 'rel: "noopener noreferrer"', "resolveEventTicketCta"]) requireText(resolver, token, "ticket resolver");
for (const token of ["providerForVerifiedTicketUrl(url)", "uniqueTicketUrls", "new Set(offers.map((offer) => offer.url))", "officialTicketUrl: url", 'saleStatus: "unknown"', 'kind: "official-event"', "lastVerifiedAt", "priority: index"]) requireText(adapter, token, "official ticket normalization");
if (adapter.includes("affiliateUrl:")) failures.push("official-source adapter must not fabricate affiliate URLs");
for (const token of ['publicTicketHostname', 'providerForVerifiedTicketUrl', 'ticketmaster.com', 'ticketweb.com', 'livenation.com', 'etix.com', 'axs.com', 'seatgeek.com', 'vividseats.com', 'eventbrite.com']) {
  requireText(providerClassifier, token, "provider-neutral checkout domain classification");
}
for (const token of [
  'featuredTicketUrl: "https://cart.alleytheatre.org/10216/10226"',
  '"christmas-carol-houston-2026": "13:30"',
  "providerForVerifiedTicketUrl(show.featuredTicketUrl ?? show.sourceUrl)",
  "officialTicketUrl: show.featuredTicketUrl ?? show.sourceUrl",
  "!featuredDatePassed && show.featuredTicketUrl ? show.featuredTicketUrl : show.sourceUrl",
]) requireText(curatedChristmas, token, "date-aware safe Christmas show checkout classification");

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
  'trackAffiliateClick({ partner, label: cta.label, placement, module: "event-ticketing", eventId })',
  'data-affiliate-event-id={partner ? eventId : undefined}',
]) requireText(component, token, "ticket CTA component");
if (component.includes('data-commercial-partner={cta.provider}')) failures.push("official ticket CTAs must not be marked commercial; metadata must remain affiliate-gated");
for (const token of ["EventTicketCta", "event.ticketCta", "eventId={event.id}", "Official event site"]) requireText(carousel, token, "carousel integration");
for (const token of ["EventTicketCta", "event.ticketCta", "eventId={event.id}", "Official event site"]) requireText(landing, token, "calendar integration");
for (const token of ["loadTicketmasterEventsServer", "resolveEventTicketCta", "buildMajorEventTicketingMarkupServer", "actionable.length === 1", "actionable.length > 1", "major-event-guide-ticket", "data-affiliate-event-id", "Check ticket options", "Compare ticketed sessions →", "data-affiliate-partner", "cta.rel"]) requireText(majorEventPage, token, "major-event guide ticket integration");
for (const token of ["Calendar workstream", "Venue-page workstream", "Do not read raw ticketing.links in presentation components", "getSportsVenueUpcomingEvents", "buildTexasEventCarouselItemsServer", "Ticketmaster", "SeatGeek", "Vivid Seats", "No checkout", "environment/secrets manager", "deduplicated by destination URL", "validate-event-ticket-positive-path.mjs", "verify-event-ticketing-production.mjs"]) requireText(docs, token, "integration documentation");

const runtimeTest = String.raw`
import { resolveEventTicketCta } from './src/data/events/ticketing.ts';
import { providerForVerifiedTicketUrl, publicTicketHostname } from './src/data/events/ticket-provider.ts';
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
const source = { kind: 'provider', name: 'Ticketmaster' };
const official = 'https://www.ticketmaster.com/example/event/ABC123';
const impact = (target, campaign='264167') => 'https://ticketmaster.evyy.net/c/7758914/'+campaign+'/4272?subId1=texasdefined&u='+encodeURIComponent(target);
const base = { provider: 'ticketmaster', saleStatus: 'on-sale', source, lastVerifiedAt: '2026-09-11T20:00:00Z' };
const approved = impact(official);
const both = resolveEventTicketCta({ links: [{ ...base, officialTicketUrl: official, affiliateUrl: approved }], offers: [] }, now);
if (!both || both.label !== 'Find Tickets →' || !both.isAffiliate || both.href !== approved) throw new Error('authorized same-event Impact priority failed');
const expired = resolveEventTicketCta({ links: [{ ...base, officialTicketUrl: official, affiliateUrl: approved, affiliateExpiresAt: '2026-09-11T20:30:00Z' }], offers: [] }, now);
if (!expired || expired.label !== 'Official Tickets →' || expired.isAffiliate) throw new Error('expired affiliate fallback failed');
const unsafe = resolveEventTicketCta({ links: [{ ...base, officialTicketUrl: official, affiliateUrl: 'javascript:alert(1)' }], offers: [] }, now);
if (!unsafe || unsafe.href !== official || unsafe.isAffiliate) throw new Error('unsafe affiliate fallback failed');
const soldOut = resolveEventTicketCta({ links: [{ ...base, saleStatus: 'sold-out', officialTicketUrl: official, affiliateUrl: approved }], offers: [] }, now);
if (soldOut !== null) throw new Error('sold-out suppression failed');
const rankedA = impact(official,'264167');
const rankedB = impact(official,'264168');
const prioritized = resolveEventTicketCta({ links: [
  { ...base, officialTicketUrl: official, affiliateUrl: rankedA, priority: 20 },
  { ...base, officialTicketUrl: official, affiliateUrl: rankedB, priority: 10 },
], offers: [] }, now);
if (!prioritized || prioritized.href !== rankedA) throw new Error('wrong merchant ID must not override approved affiliate');
const ticketweb = 'https://www.ticketweb.com/event/holiday-show-tickets/14859023';
const ticketwebAffiliate = resolveEventTicketCta({ links: [{ ...base, officialTicketUrl: ticketweb, affiliateUrl: impact(ticketweb) }], offers: [] }, now);
if (!ticketwebAffiliate?.isAffiliate || ticketwebAffiliate.href !== impact(ticketweb)) throw new Error('authorized TicketWeb affiliate deep link rejected');
for (const invalid of [
  ['unapproved-host','https://affiliate.example.com/deep'],
  ['wrong-publisher','https://ticketmaster.evyy.net/c/9999999/264167/4272?u='+encodeURIComponent(official)],
  ['wrong-merchant-id','https://ticketmaster.evyy.net/c/7758914/264168/4272?u='+encodeURIComponent(official)],
  ['wrong-merchant','https://ticketmaster.evyy.net/c/7758914/264167/9999?u='+encodeURIComponent(official)],
  ['wrong-event',impact('https://www.ticketmaster.com/different/event/ZZZ999')],
  ['wrong-provider',impact('https://www.ticketmaster.com/example/event/ABC123')+'&u='+encodeURIComponent(official)],
  ['unsafe-embedded',impact('https://evil.example.net/event/ABC123')],
]) {
  const resolved = resolveEventTicketCta({ links: [{ ...base, officialTicketUrl: official, affiliateUrl: invalid[1] }], offers: [] }, now);
  if (!resolved || resolved.isAffiliate || resolved.href !== official) throw new Error(invalid[0]+' must fall back to verified official URL');
}
const unapprovedPartner = resolveEventTicketCta({ links: [{ ...base, provider: 'seatgeek', officialTicketUrl: 'https://seatgeek.com/event/123', affiliateUrl: 'https://seatgeek.com/aff/123' }], offers: [] }, now);
if (!unapprovedPartner || unapprovedPartner.isAffiliate) throw new Error('unapproved partner incorrectly marked sponsored');
const sourceSpoof = resolveEventTicketCta({ links: [{ ...base, source: { kind: 'manual-verified', name: 'Ticketmaster' }, officialTicketUrl: official, affiliateUrl: approved }], offers: [] }, now);
if (!sourceSpoof || sourceSpoof.isAffiliate) throw new Error('unqualified affiliate source accepted');
const credentialsLink = resolveEventTicketCta({ links: [{ ...base, officialTicketUrl: 'https://user:pw@tickets.example.com/buy' }], offers: [] }, now);
if (credentialsLink !== null) throw new Error('ticket URL credentials accepted');
const privateHost = resolveEventTicketCta({ links: [{ ...base, officialTicketUrl: 'https://localhost/buy' }], offers: [] }, now);
if (privateHost !== null) throw new Error('localhost ticket destination accepted');
for (const [host, isPublic] of [
  ['ticketmaster.com',true], ['events.dallasarboretum.org',true],
  ['127.0.0.1',false], ['192.168.1.80',false], ['10.0.0.8',false],
  ['[::1]',false], ['localhost',false], ['tickets.local',false],
  ['host.internal',false], ['foo.test',false], ['test.invalid',false],
  ['fake.example',false], ['foo.lan',false], ['ssh.onion',false],
  ['internal',false],
]) {
  if (publicTicketHostname(host) !== isPublic) throw new Error('wrong public checkout host classification: '+host);
}
for (const uri of [
  'https://127.0.0.1/event/ABC',
  'https://[::1]/event/ABC',
  'https://192.168.1.1/event/ABC',
  'https://10.0.0.2/event/ABC',
  'https://box.internal/event/ABC',
  'https://tickets.local/event/ABC',
  'https://fake.ticketmaster.com.evil.test/event/ABC',
]) {
  if (providerForVerifiedTicketUrl(uri) !== null) throw new Error('private/unsafe checkout provider accepted: '+uri);
  const cta = resolveEventTicketCta({ links: [{...base, officialTicketUrl:uri, affiliateUrl:uri}], offers: [] }, now);
  if (cta !== null) throw new Error('private/unsafe checkout CTA rendered: '+uri);
}
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
