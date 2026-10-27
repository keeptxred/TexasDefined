import assert from 'node:assert/strict';
import path from 'node:path';
import { createServer } from 'vite';

// Validate the LIVE canonical, provider-enriched editorial registry, not just
// Ticketmaster's separate 3,000+ Discovery snapshot. Never fetch restricted
// inventory, infer price or mark an HTTP link as available admission.
const server = await createServer({
  configFile: false, appType: 'custom', logLevel: 'error',
  resolve: { alias: { '@': path.resolve(process.cwd(), 'src') } },
  server: { middlewareMode: true },
});
const findings = [];
const fail = (event, message) => findings.push(event.id + ': ' + message);
try {
  const { loadTexasEventRecordsServer } = await server.ssrLoadModule('/src/data/events/texas-event-records.server.ts');
  const { buildTexasEventCarouselItemsServer, buildGlobalEventCalendarServer } = await server.ssrLoadModule('/src/data/events/texas-event-calendar.server.ts');
  const { isEventSpecificTicketDestination } = await server.ssrLoadModule('/src/data/events/ticket-provider.ts');
  const now = new Date();
  const texas = new Intl.DateTimeFormat('en-US', { timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit' }).formatToParts(now);
  const part = (key) => texas.find((p) => p.type === key)?.value ?? '00';
  const today = [part('year'),part('month'),part('day')].join('-');
  const all = loadTexasEventRecordsServer();
  const items = all.filter((event) => !event.id.startsWith('ticketmaster:')
    && (event.endDate ?? event.startDate) >= today
    && (event.ticketing?.links?.length ?? 0) > 0)
    .sort((a,b)=>a.startDate.localeCompare(b.startDate)||a.id.localeCompare(b.id));
  if (!items.length) throw new Error('No active source-qualified editorial ticket records: examine event intake before publication');
  const identities = new Set();
  const sameExactPerformance = new Map();
  const normalized = (value) => String(value ?? '').toLowerCase().normalize('NFKD')
    .replace(/[^a-z0-9]+/g, ' ').trim();
  let actionable = 0, authorizedAffiliate = 0, safeOfficial = 0, withheld = 0, nonScheduled = 0;
  const sharedTargets = new Map();
  const withheldCases = [];
  let batches = 0;
  for (let first = 0; first < items.length; first += 50) {
    const batch = items.slice(first, first + 50);
    batches++;
    const cards = buildTexasEventCarouselItemsServer(batch);
    for (let index = 0; index < batch.length; index++) {
      const event = batch[index];
      const cta = cards[index]?.ticketCta ?? null;
      if (identities.has(event.id)) fail(event, 'duplicate editorial source event identity');
      identities.add(event.id);
      // Distinct source IDs cannot create two competing cards for the same
      // dated show, venue, time and primary-source event URL.
      const exactIdentity = [event.startDate, event.startTime ?? '',
        normalized(event.title), normalized(event.city), normalized(event.venueName),
        event.officialEventUrl].join('|');
      const existingId = sameExactPerformance.get(exactIdentity);
      if (existingId) fail(event, 'duplicate exact dated performance already represented by ' + existingId);
      else sameExactPerformance.set(exactIdentity, event.id);
      if (!event.officialEventUrl?.startsWith('https://')) fail(event, 'missing secure official organizer event source');
      if (!event.lastVerifiedAt || !Number.isFinite(Date.parse(event.lastVerifiedAt))) fail(event, 'missing source verification timestamp');
      const links = event.ticketing?.links ?? [];
      for (const link of links) {
        if (!link.lastVerifiedAt || !link.source?.name) fail(event, 'ticket offer is missing source provenance');
      }
      if (event.status !== 'scheduled') {
        nonScheduled++;
        if (cta !== null) fail(event, event.status+' event still renders purchase button');
      }
      if (!cta) {
        withheld++;
        // Explicit dispositions let an editor resolve genuine missing checkout
        // IDs without mistaking a source page, expired offer or restricted
        // seller inventory for confirmed event-specific admission.
        withheldCases.push({
          eventId:event.id, title:event.title, date:event.startDate,
          status:event.status, city:event.city, venue:event.venueName,
          officialEventUrl:event.officialEventUrl,
          reasons:links.map(link => ({
            provider:link.provider, saleStatus:link.saleStatus,
            hasOfficial:Boolean(link.officialTicketUrl),
            hasAffiliate:Boolean(link.affiliateUrl),
            officialExpiresAt:link.officialExpiresAt ?? null,
            affiliateExpiresAt:link.affiliateExpiresAt ?? null,
          })),
        });
        continue;
      }
      actionable++;
      if (!cta.href.startsWith('https://') || !isEventSpecificTicketDestination(cta.href)) {
        fail(event, 'general directory or unsafe URL masquerades as exact checkout');
      }
      if (cta.isAffiliate) {
        authorizedAffiliate++;
        const wrapper = new URL(cta.href);
        const original = event.ticketing.links.find((link) => link.affiliateUrl === cta.href);
        if (wrapper.hostname !== 'ticketmaster.evyy.net'
          || !/^\/c\/7758914\/264167\/4272\/?$/.test(wrapper.pathname)
          || wrapper.searchParams.size !== 4
          || wrapper.searchParams.getAll('subId1').length !== 1
          || wrapper.searchParams.get('subId1') !== 'texasdefined'
          || wrapper.searchParams.getAll('partnerpropertyid').length !== 1
          || wrapper.searchParams.get('partnerpropertyid') !== '8837726'
          || wrapper.searchParams.getAll('MediaPartnerPropertyId').length !== 1
          || wrapper.searchParams.get('MediaPartnerPropertyId') !== '8837726'
          || wrapper.searchParams.getAll('u').length !== 1
          || wrapper.searchParams.get('u') !== original?.officialTicketUrl
          || !cta.rel.includes('sponsored')) fail(event, 'unapproved or mismatched affiliate event deep link');
      } else {
        safeOfficial++;
        if (cta.rel.includes('sponsored')) fail(event, 'nonaffiliate event checkout misclassified sponsored');
      }
      const duplicate = sharedTargets.get(cta.href) ?? [];
      duplicate.push([event.id,event.startDate,event.venueName??'']);
      sharedTargets.set(cta.href, duplicate);
      // Prove the date-filtered calendar resolves the SAME safe CTA and the
      // same lifecycle state, not a separate provider-specific purchase branch.
      const view = buildGlobalEventCalendarServer([event], {
        featured:'', location:'', start:event.startDate, end:event.startDate, category:'', venue:'',
      });
      if (view.results.length !== 1 || view.results[0].ticketCta?.href !== cta.href) {
        fail(event, 'shared calendar purchase URL diverges from event carousel');
      }
    }
  }
  const repeatDestinations = [...sharedTargets.entries()]
    .filter(([,rows])=>new Set(rows.map((row)=>row[1]+':'+row[2])).size>1);
  console.log(JSON.stringify({
    audit:'editorial-upcoming-paid-events',date:today,records:items.length,batches,
    batchSize:50,actionable,authorizedAffiliate,safeOfficial,withheld,nonScheduled,
    sharedExactTargetsForSourceReview:repeatDestinations.length,
    targetExamples:repeatDestinations.slice(0,8).map(([url,rows])=>({url,records:rows.slice(0,4)})),
    withheldCases,
    inventoryVerified:false,pricesVerified:false,commissionsVerified:false,
  }));
  assert.deepEqual(findings.slice(0,20), [],
    findings.length+' unsafe editorial ticket record(s) in statewide cohorts. First findings: '+findings.slice(0,20).join(' | '));
} finally { await server.close(); }
console.log('PASS: all upcoming editorial paid-event records tested in deterministic 50-event cohorts; calendar and carousel share identity, source, lifecycle and safe admission resolver. No seat inventory claimed.');
