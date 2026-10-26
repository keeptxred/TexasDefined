import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { corporateEventProviders } from '../../src/data/corporate-events.ts';
import { corporateEventPublicOperatorChannel, corporateEventPublicOperatorChannels } from '../../src/data/corporate-event-public-operator-channels.ts';

const channels = corporateEventPublicOperatorChannels;
assert(channels.length >= 14, 'Retain at least fourteen verified official Houston event inquiry paths');
assert.equal(new Set(channels.map(item => item.venueSlug)).size, channels.length, 'One independently evidenced path per venue');
const bySlug = new Map(corporateEventProviders.map(venue => [venue.slug, venue]));
for (const row of channels) {
  const provider = bySlug.get(row.venueSlug);
  assert(provider && provider.city === 'Houston', 'Contact pathway must match a real Houston-city venue: ' + row.venueSlug);
  const urls = [row.url, row.evidenceUrl, provider.officialUrl].map(value => new URL(value));
  for (const url of urls) {
    assert.equal(url.protocol, 'https:', 'No insecure operator links');
    assert(!url.username && !url.password && !url.port, 'No credentials or non-standard ports');
    assert(!url.search && !url.hash, 'No contact identifiers or tracking parameters in the shared venue path');
  }
  const officialHost = urls[2].hostname.replace(/^www\./, '').toLowerCase();
  for (const url of urls.slice(0, 2)) {
    const host = url.hostname.replace(/^www\./, '').toLowerCase();
    assert(host === officialHost || host.endsWith('.' + officialHost),
      'Only current official venue-owned hostname/subdomain may be used for staff path: ' + row.venueSlug);
  }
  assert(/^\d{4}-\d{2}-\d{2}$/.test(row.reviewedOn)
    && new Date(row.reviewedOn + 'T12:00:00Z').toISOString().slice(0, 10) === row.reviewedOn
    && row.reviewedOn <= new Date().toISOString().slice(0, 10),
    'Each official source must have a valid, nonfuture review date');
  assert.equal(corporateEventPublicOperatorChannel(row.venueSlug)?.url, row.url);
}
assert.equal(corporateEventPublicOperatorChannel('unknown-business'), null);
const monitoring = readFileSync('scripts/data/audit-corporate-event-sources.mjs','utf8');
for (const expected of [
  'corporateEventPublicOperatorChannels.map((channel) => channel.url)',
  'operatorChannelReports',
  'operatorChannelsNeedingReview',
  'ageDays === null || ageDays >= 60',
  "status?.state !== 'reachable'",
  "redirect: 'manual'",
]) assert(monitoring.includes(expected), 'Weekly read-only official contact-path review must not go unmonitored: ' + expected);
assert(!monitoring.includes("contactSent: true") && !monitoring.includes("venueVerified: true"),
  'HEAD source reachability is not proof of any outreach or commercial verification');
const staff = readFileSync('src/components/events/CorporateEventSourceReviewPanel.tsx','utf8');
assert(staff.includes('corporateEventPublicOperatorChannel(item.provider.slug)'));
const invitation = readFileSync('src/components/events/CorporateEventPartnerInvitationKit.tsx','utf8');
assert(invitation.includes('corporateEventPublicOperatorChannel(provider.slug)')
  && invitation.includes('href={officialChannel?.url ?? draft.officialUrl}'),
  'Staff invitation composer must prefer verified venue inquiry paths without sending planner data');
assert(!invitation.includes('form.submit(') && !invitation.includes('fetch(officialChannel'),
  'Link is manually opened only, never automatically submitted or fetched with private data');
assert(staff.includes('Review public event inquiry'));
assert(staff.includes('No inquiry has been submitted, no planner details shared'),
  'Staff contact-path directory must never claim completed external outreach');
assert(!staff.includes('window.location.assign') && !staff.includes('fetch(item.provider'),
  'No automatic outbound business contact, scraper, or planner-data transfer');
console.log('Corporate events: '+channels.length+' verified operator-owned public inquiry paths, staff links only, zero contact or commercial claims PASS.');
