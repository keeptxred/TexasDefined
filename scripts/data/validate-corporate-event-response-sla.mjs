import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { summarizeCorporateEventResponseTimes, isCorporateEventLeadOverdue } from '../../src/data/corporate-event-response-sla.ts';

const now = new Date('2026-10-24T12:00:00.000Z');
const twoDays = new Date(now.getTime() - 49 * 3600000).toISOString();
const newLead = (hoursAgo, status, firstContactHoursAfterCreated=null) => {
  const createdAt = new Date(now.getTime()-hoursAgo*3600000);
  return {
    created_at: createdAt.toISOString(),
    status,
    first_contacted_at: firstContactHoursAfterCreated == null
      ? null : new Date(createdAt.getTime()+firstContactHoursAfterCreated*3600000).toISOString(),
  };
};
const leads=[
  newLead(49,'new'), newLead(47,'reviewing'), newLead(72,'closed'),
  newLead(24,'contacted',4),newLead(70,'contacted',60),
  newLead(130,'reviewing',3),newLead(80,'spam'),
];
const stats=summarizeCorporateEventResponseTimes(leads,now);
assert.equal(stats.awaitingFirstContact,2);
assert.equal(stats.overdueFirstContact,1);
assert.equal(stats.contactedWithinTarget,2);
assert.equal(stats.contactedAfterTarget,1);
assert.equal(stats.recordedContacts,3);
assert.equal(stats.averageFirstContactHours,22.3);
assert(isCorporateEventLeadOverdue({created_at:twoDays,status:'new',first_contacted_at:null},now));
assert(!isCorporateEventLeadOverdue(newLead(49,'contacted',4),now));
assert(!isCorporateEventLeadOverdue(newLead(49,'spam'),now));
assert(!isCorporateEventLeadOverdue(newLead(47,'reviewing'),now));
assert.equal(summarizeCorporateEventResponseTimes([],now).averageFirstContactHours,null);

const read=(path)=>readFileSync(path,'utf8');
const server=read('src/data/corporate-events.admin.server.ts');
const panel=read('src/components/events/CorporateEventOpsPanel.tsx');
const migration=read('supabase/migrations/20261024004500_group_event_first_contact_sla.sql');
assert(migration.includes('first_contacted_at timestamptz'),'First-contact timestamp must be private and nullable');
assert(migration.includes('No email is sent'), 'Do not claim automatic delivery');
assert(server.includes("'id,first_contacted_at'"),'Server must inspect prior timestamp before status edit');
assert(server.includes("status === 'contacted' && !existing.first_contacted_at"),'Only first explicit contact should stamp once');
assert(server.includes("first_contacted_at: new Date().toISOString()"),'Timestamp must be server-generated');
assert(server.includes('provider_outreach_consented_at,first_contacted_at'), 'Protected inbox must load timing data');
assert(panel.includes('awaiting first contact') || panel.includes('Awaiting first contact'), 'Staff queue must show overdue count');
assert(panel.includes("isCorporateEventLeadOverdue(lead)"),'Operator must see which leads need review');
assert(panel.includes("status === 'contacted' && !window.confirm("),'Operator must confirm contact actually happened');
assert(panel.includes('not proof of delivery'), 'No delivery receipts or automatic sending implied');
console.log('Corporate-event first-contact timestamps, 48-hour internal follow-up and privacy checks PASS.');
