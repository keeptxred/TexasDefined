import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dueLatestCorporateVenueFollowups } from '../../src/data/corporate-event-partner-followups.ts';

const row = (id, provider_slug, occurred_at, followup_on, contact_kind='initial_contact', recorded_at=occurred_at) =>
  ({id,provider_slug,occurred_at,followup_on,contact_kind,recorded_at});
const yesterday = '2026-10-23';
const today = '2026-10-24';
const tomorrow = '2026-10-25';
const october21 = '2026-10-21T12:00:00.000Z';
const october22 = '2026-10-22T12:00:00.000Z';
const october23 = '2026-10-23T12:00:00.000Z';

const cases = [
  row('initial-a','venue-a',october21,yesterday),
  row('reply-a','venue-a',october22,null,'partner_reply'), // supersedes old reminder
  row('initial-b','venue-b',october22,yesterday),
  row('declined-b','venue-b',october23,null,'declined'),  // declines clear earlier reminder
  row('initial-c','venue-c',october21,tomorrow),        // upcoming is not due
  row('new-c','venue-c',october23,today,'meeting_held'), // newer due today
  row('due-d','venue-d',october22,yesterday),
  row('late-recorded-d','venue-d',october21,null,'partner_reply','2026-10-24T15:00:00.000Z'), // old happened, newer recorded
  row('due-e','venue-e',october22,today),
];
const reversed=dueLatestCorporateVenueFollowups([...cases].reverse(),today);
const forward=dueLatestCorporateVenueFollowups(cases,today);
assert.deepEqual(forward.map(e=>e.id),['due-d','new-c','due-e'].sort((id1,id2)=>{
  const day={ 'due-d':yesterday,'new-c':today,'due-e':today};
  const venue={ 'due-d':'venue-d','new-c':'venue-c','due-e':'venue-e'};
  return day[id1].localeCompare(day[id2]) || venue[id1].localeCompare(venue[id2]);
}), 'One due entry per venue, ordered by due date and then venue');
assert.deepEqual(forward,reversed,'Recent recorded order cannot change which historical event supersedes reminders');
assert(!forward.some(e=>e.provider_slug==='venue-a'||e.provider_slug==='venue-b'),'Replies and declines clear stale followup reminders');
assert.deepEqual(dueLatestCorporateVenueFollowups([
  row('older','venue-z',october22,today,'initial_contact','2026-10-24T12:00:00.000Z'),
  row('newer','venue-z',october22,tomorrow,'meeting_held','2026-10-24T14:00:00.000Z'),
],today),[], 'Tie on occurred time uses last recorded event as authoritative follow-up');
assert.deepEqual(dueLatestCorporateVenueFollowups([],today),[]);

const server=readFileSync('src/data/corporate-event-partner-outreach.server.ts','utf8');
const panel=readFileSync('src/components/events/CorporateEventPartnerOutreachPanel.tsx','utf8');
const canonical=readFileSync('scripts/ci/run-premerge-validation.mjs','utf8');
assert(server.includes('dueLatestCorporateVenueFollowups(events, today)') &&
  server.includes('dueFollowupEventIds: dueFollowups.map(event => event.id)') &&
  server.includes('followupsDueInVisibleRows: dueFollowups.length'),
  'Staff server must not count all historical due dates after later responses');
assert(panel.includes('const dueFollowupIds = new Set(snapshot?.dueFollowupEventIds??[])') &&
  panel.includes("show==='followup' && dueFollowupIds.has(row.id)"),
  'Staff due-view filter must use latest-evidence due list, not raw outdated row followup dates');
assert(panel.includes('latest venue interaction') && server.includes('Truncation can hide older tasks'),
  'Do not claim incomplete 120-row evidence is a full historical follow-up queue');
assert(canonical.includes('validate-corporate-event-partner-followups.mjs'),
  'Future releases must run the stable deterministic latest-evidence followup regression');
console.log('Corporate event due followups: old reminders cleared after genuine newer interactions; bounded, deduped and deterministic PASS.');
