import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { corporateEventProviders } from '../../src/data/corporate-events.ts';
import { corporateEventPublicOperatorChannel, corporateEventPublicOperatorChannels } from '../../src/data/corporate-event-public-operator-channels.ts';

const channels = corporateEventPublicOperatorChannels;
assert.equal(channels.length, 10, 'Initial official Houston contact-path verification batch must be ten venues');
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
  assert.equal(row.reviewedOn, '2026-10-24', 'Preserve actual public-source review date');
  assert.equal(corporateEventPublicOperatorChannel(row.venueSlug)?.url, row.url);
}
assert.equal(corporateEventPublicOperatorChannel('unknown-business'), null);
const staff = readFileSync('src/components/events/CorporateEventSourceReviewPanel.tsx','utf8');
assert(staff.includes('corporateEventPublicOperatorChannel(item.provider.slug)'));
assert(staff.includes('Review public event inquiry'));
assert(staff.includes('No inquiry has been submitted, no planner details shared'),
  'Staff contact-path directory must never claim completed external outreach');
assert(!staff.includes('window.location.assign') && !staff.includes('fetch(item.provider'),
  'No automatic outbound business contact, scraper, or planner-data transfer');
console.log('Corporate events: ten verified operator-owned public inquiry paths, staff links only, zero contact or commercial claims PASS.');
