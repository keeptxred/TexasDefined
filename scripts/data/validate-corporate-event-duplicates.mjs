import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { findCorporatePlannerDuplicates } from '../../src/data/corporate-event-duplicate-review.ts';
const lead = (id, changes={}) => ({
  id, email: 'planner@example.com', company: 'Example Co', city: 'Houston',
  group_size: 45, event_category: 'team-building', event_date: '2026-12-10',
  created_at: '2026-10-23T14:00:00Z', ...changes,
});
const repeated = findCorporatePlannerDuplicates([
  lead('a'), lead('b', {created_at:'2026-10-23T15:00:00Z'}),
  lead('c', {event_date:'2027-01-10'}),
  lead('d', {email:'other@example.com'}),
  lead('e', {created_at:'2026-10-30T15:00:00Z'}),
]);
assert.equal(repeated.get('a')?.similarCount,1);
assert.equal(repeated.get('b')?.similarCount,1);
assert.deepEqual(repeated.get('a')?.otherIds,['b']);
assert.equal(repeated.has('c'),false,'Different event date must remain independent');
assert.equal(repeated.has('d'),false,'Different planner email must remain independent');
assert.equal(repeated.has('e'),false,'Separate week must not be treated as duplicate');
const caseVariants=findCorporatePlannerDuplicates([
  lead('one', { email:'PLANNER@example.com ',company:' Example  Co '}),
  lead('two', { email:'planner@example.com',company:'example co'}),
]);
assert.equal(caseVariants.size,2,'Normalization should catch casing/spacing changes');
assert.equal(findCorporatePlannerDuplicates([lead('solo')]).size,0);
const src=readFileSync('src/data/corporate-event-duplicate-review.ts','utf8');
const panel=readFileSync('src/components/events/CorporateEventOpsPanel.tsx','utf8');
assert(!src.includes('supabaseAdmin'), 'Duplicate detection must not add a public query');
assert(panel.includes('findCorporatePlannerDuplicates(data?.leads ?? [])'),'Only private authorized lead snapshot can be matched');
assert(panel.includes('Confirm directly with the planner before merging work'),'Human review required');
assert(panel.includes('Nothing was automatically deleted.'),'No automatic suppression of legitimate inquiries');
console.log('Corporate planner duplicate flags: private, non-destructive, narrow same-event matching PASS.');
