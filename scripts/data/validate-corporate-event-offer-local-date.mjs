import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { corporateEventTexasToday } from '../../src/data/corporate-event-dates.ts';
const lateTexasEvening = new Date('2026-10-24T02:00:00Z');
assert.equal(corporateEventTexasToday(lateTexasEvening), '2026-10-23', 'Local Texas offer date must not roll over with UTC');
assert.equal(corporateEventTexasToday(new Date('2026-10-24T16:00:00Z')), '2026-10-24');
for (const path of [
  'src/data/corporate-events-offers.server.ts',
  'src/data/corporate-events.admin.server.ts',
  'src/components/events/CorporateEventOpsPanel.tsx',
]) {
  const s = readFileSync(path,'utf8');
  assert(s.includes('corporateEventTexasToday()'), path + ' must use explicit Texas date');
  assert(/import \{[^}]*\bcorporateEventTexasToday\b[^}]*\} from ['"]@\/data\/corporate-event-dates['"]/.test(s),
    path + ' must import Texas calendar helpers even when commercial date validation shares that import');
  assert(!s.includes("new Date().toISOString().slice(0, 10)"), path + ' may not accidentally use UTC for offer eligibility');
}
console.log('Texas-local partner offer start/end dates and staff counters PASS.');
