#!/usr/bin/env node
// Bounded, non-invasive outbound-link probes. A 2xx response verifies only
// that an official event URL responded; it NEVER proves seats, price or checkout.
import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const catalogPath = 'src/data/generated/ticketmaster-events.json';
const ledgerPath = 'ops/editorial/event-ticketing-verification-ledger.json';
const LIMIT = 40;
const ALLOWED_HOSTS = new Set([
  'ticketmaster.com', 'www.ticketmaster.com',
  'ticketweb.com', 'www.ticketweb.com',
]);

export function publicTicketUrl(value) {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || !ALLOWED_HOSTS.has(url.hostname.toLowerCase())
      || url.username || url.password || (url.port && url.port !== '443')) return null;
    if (!/\/event\/[^/]+/i.test(url.pathname)) return null;
    return url;
  } catch { return null; }
}

export function classifyTicketLinkResponse(status, source, redirectTarget) {
  if (status >= 200 && status < 300) return 'REACHABLE_NO_INVENTORY_CLAIM';
  if (status >= 300 && status < 400) {
    let next;
    try { next = redirectTarget ? new URL(redirectTarget, source) : null; }
    catch { return 'REVIEW_UNSAFE_OR_MISSING_REDIRECT'; }
    if (!next || !publicTicketUrl(next.href)) return 'REVIEW_UNSAFE_OR_MISSING_REDIRECT';
    if (next.origin !== source.origin || next.pathname !== source.pathname) return 'REVIEW_DIFFERENT_DESTINATION';
    return 'REDIRECT_SAME_EVENT_PATH';
  }
  if (status === 404 || status === 410) return 'REVIEW_NOT_FOUND';
  if (status === 403 || status === 429 || status === 401) return 'ACCESS_RESTRICTED_INCONCLUSIVE';
  if (status >= 500) return 'PROVIDER_SERVER_ERROR_INCONCLUSIVE';
  return 'HTTP_' + status + '_INCONCLUSIVE';
}

export async function probePublicTicketUrl(href, fetcher = fetch) {
  const source = publicTicketUrl(href);
  if (!source) return { probeStatus: 'REVIEW_INVALID_OR_UNAPPROVED_URL', httpStatus: null };
  try {
    const opts = { method: 'HEAD', redirect: 'manual', signal: AbortSignal.timeout(7000) };
    let response = await fetcher(source.href, opts);
    // A normal GET is permitted for sites that do not implement HEAD;
    // never work around a 401, CAPTCHA, 403, 429 or bot challenge.
    if (response.status === 405) {
      response.body?.cancel?.();
      response = await fetcher(source.href, { ...opts, method: 'GET' });
    }
    const probeStatus = classifyTicketLinkResponse(response.status, source, response.headers?.get?.('location'));
    response.body?.cancel?.();
    return { probeStatus, httpStatus: response.status };
  } catch (error) {
    return { probeStatus: 'NETWORK_INCONCLUSIVE', httpStatus: null, reason: String(error?.name || 'network-error').slice(0, 40) };
  }
}

/**
 * The public calendar already excludes non-admission Discovery products.
 * Apply a conservative admission gate to the OUTBOUND verification queue too:
 * otherwise branded garage/VIP products consume one of only 40 daily probes,
 * although visitors cannot buy event admission through those URLs.
 * This does not mark any other event verified or confer affiliate eligibility.
 */
export function primaryAdmissionProbeCandidate(event) {
  const title = String(event?.name ?? '').trim().toLowerCase().replace(/[–—]/g, '-');
  if (!title) return false;
  if (/^(?:(?:fifth|5th)\s+third\s+)?garage\s*[:\-]/.test(title)
    || /^(?:fifth|5th)\s+third\s+garage\b/.test(title)
    || /^(?:[a-z0-9&' ]+\s+)?(?:parking\s+garage|parking\s+lot|garage\s+parking)\s*[:\-]/.test(title)) return false;
  if (/\b(?:not a (?:concert|event) ticket|event ticket not included|ticket not included)\b/.test(title)) return false;
  if (/\b(?:parking\s+(?:pass(?:es)?|tickets?|only)|vip\s+(?:upgrades?|add-?ons?)|fast\s+lane\s+pass(?:es)?|quick\s+pass(?:es)?|express\s+entry|club\s+access|suite\s+(?:pass(?:es)?|tickets?)|meet\s*(?:&|and)\s*greet\s+(?:add-?ons?|upgrades?)|signed\s+poster\s+add-?ons?)\b/.test(title)) return false;
  if (/(?:^|[\s:\-])parking\s*$/.test(title)
    || /\b(?:parking|vip|fast lane|suite)\s+only\b/.test(title)) return false;
  return !/^(?:parking(?:\s+pass)?|(?:reserved|premium|premier|general)\s+parking(?:\s+pass)?|suites?|vip\s+(?:upgrade|add-?on)|fast\s+lane(?:\s+pass)?|quick\s+pass|express\s+entry|club\s+access|meet\s*(?:&|and)\s*greet|signed\s+poster\s+add-?on)\s*[:\-]/.test(title);
}

export function chooseBatch(events, cursor, size = LIMIT, history = null, now = new Date()) {
  const localParts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const localPart = (name) => localParts.find((part) => part.type === name)?.value ?? '00';
  const texasToday = [localPart('year'), localPart('month'), localPart('day')].join('-');
  const eligible = events.filter((event) => event && event.id && event.officialUrl
    && event.startDate && /^\d{4}-\d{2}-\d{2}$/.test(event.startDate) && event.startDate >= texasToday
    && primaryAdmissionProbeCandidate(event)
    && !['cancelled', 'postponed', 'rescheduled', 'offsale', 'soldout'].includes(event.status));
  eligible.sort((a, b) => a.startDate.localeCompare(b.startDate)
    || String(a.id).localeCompare(String(b.id)));
  if (!eligible.length) return { candidates: [], nextCursor: 0, total: 0 };
  // On scheduled refreshes choose upcoming events never checked at this exact
  // date/URL before. A shifting daily event catalog must not cause numeric
  // cursor drift to skip soon-to-expire admissions or repeat yesterday's 40.
  // Recheck inconclusive links only after 14 days or when event identity changes.
  const staleAt = now.getTime() - 14 * 86400000;
  const pending = history ? eligible.filter((event) => {
    const old = history[event.id];
    if (!old || old.date !== event.startDate || old.officialUrl !== event.officialUrl) return true;
    const checkedAt = Date.parse(old.checkedAt ?? '');
    return !Number.isFinite(checkedAt) || checkedAt <= staleAt;
  }) : eligible;
  const start = history ? 0 : Math.max(0, Number.isInteger(cursor) ? cursor : 0) % eligible.length;
  const candidates = history ? pending.slice(0, size)
    : Array.from({ length: Math.min(size, eligible.length) }, (_, index) => eligible[(start + index) % eligible.length]);
  return { candidates, nextCursor: (Math.max(0, cursor) + candidates.length) % eligible.length,
    total: eligible.length, pendingToCheck: pending.length };
}

/** Report actual provider and HTTP outcomes; a bot block is NOT a broken link. */
export function summarizeProviderProbeOutcomes(candidates, history) {
  const outcomes = {};
  for (const event of candidates) {
    const host = publicTicketUrl(event.officialUrl)?.hostname.toLowerCase() ?? '';
    const provider = host.endsWith('ticketweb.com') ? 'ticketweb'
      : host.endsWith('ticketmaster.com') ? 'ticketmaster' : 'invalid-provider-url';
    const reason = history[event.id]?.probeStatus ?? 'NOT_RECORDED_INCONCLUSIVE';
    const counts = outcomes[provider] ?? (outcomes[provider] = {});
    counts[reason] = (counts[reason] ?? 0) + 1;
  }
  return outcomes;
}

/**
 * Deterministic full-snapshot integrity validation, separate from the
 * 40-per-day HTTP probes. This checks source/provider identities and exact
 * Impact deep-link destinations, NOT sale inventory, pricing or commissions.
 * A security failure aborts the generated refresh; last good catalog stays.
 */
export function auditCatalogIntegrity(events) {
  if (!Array.isArray(events)) throw new Error('Expected Ticketmaster catalog event array');
  const ids = new Set();
  const errors = [];
  const counts = {
    rows: events.length, uniqueEventIds: 0, validOfficialEventLinks: 0,
    validAuthorizedImpactDeepLinks: 0, ticketmaster: 0, ticketweb: 0,
    filteredNonAdmissionProductNames: 0, missingVenueNames: 0,
    cancelledPostponedOrRescheduled: 0, offSaleOrSoldOut: 0,
    incompleteSaleStatus: 0, structuralErrors: 0,
  };
  const invalid = (id, why) => {
    counts.structuralErrors++;
    if (errors.length < 12) errors.push(String(id || 'missing-ID') + ':' + why);
  };
  for (const event of events) {
    const id = typeof event?.id === 'string' ? event.id.trim() : '';
    if (!id) invalid(id, 'missing-id');
    else if (ids.has(id)) invalid(id, 'duplicate-provider-id');
    else ids.add(id);
    if (typeof event?.name !== 'string' || !event.name.trim()) invalid(id, 'missing-name');
    if (typeof event?.city !== 'string' || !event.city.trim()) invalid(id, 'missing-city');
    const localDate = event?.startDate;
    if (typeof localDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(localDate)
      || Number.isNaN(Date.parse(localDate + 'T12:00:00Z'))
      || new Date(localDate + 'T12:00:00Z').toISOString().slice(0, 10) !== localDate) {
      invalid(id, 'invalid-local-date');
    }
    if (!event?.venue?.trim?.()) counts.missingVenueNames++;
    if (!primaryAdmissionProbeCandidate(event)) counts.filteredNonAdmissionProductNames++;
    if (['cancelled','postponed','rescheduled'].includes(event?.status)) counts.cancelledPostponedOrRescheduled++;
    if (['offsale','soldout'].includes(event?.status)) counts.offSaleOrSoldOut++;
    if (!event?.status || event.status === 'unknown') counts.incompleteSaleStatus++;

    const official = publicTicketUrl(event?.officialUrl);
    if (!official) { invalid(id, 'invalid-official-admission-url'); continue; }
    counts.validOfficialEventLinks++;
    if (official.hostname.endsWith('ticketweb.com')) counts.ticketweb++;
    else counts.ticketmaster++;
    let impact;
    try { impact = new URL(event?.affiliateUrl); }
    catch { invalid(id, 'invalid-affiliate-wrapper'); continue; }
    if (impact.protocol !== 'https:' || impact.hostname !== 'ticketmaster.evyy.net'
      || impact.username || impact.password || impact.port
      || !/^\/c\/7758914\/264167\/4272\/?$/.test(impact.pathname)
      || impact.searchParams.size !== 4
      || impact.searchParams.getAll('u').length !== 1
      || impact.searchParams.get('u') !== official.href
      || impact.searchParams.getAll('subId1').length !== 1
      || impact.searchParams.get('subId1') !== 'texasdefined'
      || impact.searchParams.getAll('partnerpropertyid').length !== 1
      || impact.searchParams.get('partnerpropertyid') !== '8837726'
      || impact.searchParams.getAll('MediaPartnerPropertyId').length !== 1
      || impact.searchParams.get('MediaPartnerPropertyId') !== '8837726') {
      invalid(id, 'unauthorized-or-wrong-event-impact-deep-link');
    } else counts.validAuthorizedImpactDeepLinks++;
  }
  counts.uniqueEventIds = ids.size;
  return { ...counts, errorExamples: errors, httpLinksProbed: false,
    seatsVerified: false, commissionsVerified: false };
}

async function main() {
  const [catalog, ledger] = await Promise.all([
    readFile(catalogPath, 'utf8').then(JSON.parse),
    readFile(ledgerPath, 'utf8').then(JSON.parse),
  ]);
  if (!Array.isArray(catalog.events) || !ledger.statewide) throw new Error('Expected managed event snapshot and authoritative ledger.');
  const catalogIntegrity = auditCatalogIntegrity(catalog.events);
  if (catalogIntegrity.structuralErrors) {
    throw new Error('Ticketmaster provider-catalog integrity failed closed: ' +
      catalogIntegrity.structuralErrors + ' structural errors (' +
      catalogIntegrity.errorExamples.join(', ') + '). Last verified catalog preserved.');
  }

  const history = ledger.statewide.ticketLinkProbes ?? {};
  const cursor = ledger.statewide.ticketLinkProbeCursor ?? 0;
  const { candidates, nextCursor, total, pendingToCheck } = chooseBatch(catalog.events, cursor, LIMIT, history);
  const checkedAt = new Date().toISOString();
  // Max 4 independent public HEAD requests, each capped at seven seconds.
  for (let index = 0; index < candidates.length; index += 4) {
    await Promise.all(candidates.slice(index, index + 4).map(async (event) => {
      const result = await probePublicTicketUrl(event.officialUrl);
      history[event.id] = {
        status: 'IN_PROGRESS', // an HTTP probe alone must never be VERIFIED
        eventId: event.id,
        eventName: event.name,
        city: event.city,
        venue: event.venue,
        date: event.startDate,
        officialUrl: event.officialUrl,
        checkedAt,
        ...result,
        seatInventory: 'NOT_VERIFIED',
        purchasePrice: 'NOT_VERIFIED',
      };
    }));
  }
  const providerOutcomes = summarizeProviderProbeOutcomes(candidates, history);
  ledger.statewide.ticketLinkProbes = history;
  ledger.statewide.ticketLinkProbeCursor = nextCursor;
  ledger.statewide.ticketLinkProbeLatestRun = {
    checkedAt, count: candidates.length, totalEligible: total, nextCursor, pendingToCheck,
    httpReachabilityOnly: true, inventoryVerified: false, providerOutcomes, catalogIntegrity,
  };
  ledger.updatedAt = checkedAt.slice(0, 10);
  await writeFile(ledgerPath, JSON.stringify(ledger, null, 2) + '\n', 'utf8');
  const attention = candidates.filter((event) => history[event.id].probeStatus.startsWith('REVIEW_'));
  const reachable = candidates.filter((event) => history[event.id].probeStatus === 'REACHABLE_NO_INVENTORY_CLAIM');
  console.log('Full Ticketmaster catalog identity and affiliate integrity: ' + JSON.stringify(catalogIntegrity) +
    '. Structural, NOT inventory verification.');
  console.log('Ticket outbound URL audit: ' + candidates.length + '/' + total
    + ' events in deterministic rotating batch. HTTP reachable=' + reachable.length
    + ', review=' + attention.length + ', providerOutcomes=' + JSON.stringify(providerOutcomes)
    + '. Never infer seat inventory or live price.');
  const inconclusiveCount = candidates.filter((event) => /(?:INCONCLUSIVE|NOT_RECORDED)/.test(history[event.id].probeStatus)).length;
  if (candidates.length && inconclusiveCount === candidates.length) {
    console.log('::notice title=Provider-level ticket probes inconclusive::All '+candidates.length+
      ' responses are access restrictions, server failures or network errors; no URLs were proven broken or inventory available.');
  }
  if (attention.length) console.warn('::warning title=Ticket link review required::'
    + attention.map((event) => event.id + ': ' + history[event.id].probeStatus).join(', ').slice(0, 1500));
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
