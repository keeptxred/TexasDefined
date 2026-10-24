import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const sql = readFileSync('supabase/migrations/20261024031000_group_event_evidence_dedup.sql', 'utf8');
const server = readFileSync('src/data/corporate-event-outcomes.server.ts', 'utf8');
const functions = readFileSync('src/data/corporate-event-outcomes.functions.ts', 'utf8');
const panel = readFileSync('src/components/events/CorporateEventOutcomePanel.tsx', 'utf8');
const oldLedger = readFileSync('supabase/migrations/20261024020500_group_event_outcome_evidence_ledger.sql', 'utf8');

for (const rule of [
  'add column if not exists evidence_key text',
  'create unique index if not exists td_group_event_source_evidence_once',
  '(venue_slug, outcome_type, upper(evidence_key))',
  'before insert on public.texasdefined_group_event_outcome_events',
  'new.evidence_key := upper(btrim(new.evidence_key))',
  "new.venue_slug is null or new.venue_slug !~",
  'security invoker',
  'revoke all on function public.texasdefined_group_event_require_external_evidence_key()',
]) assert(sql.includes(rule),'Real outcome receipt/quote duplicate protection missing: '+rule);

assert(sql.includes('evidence_key is null'), 'Older private history must not be fabricated to satisfy a new ID rule');
assert(oldLedger.includes('revoke update, delete, truncate'), 'Evidence history remains append-only');
assert(server.includes('const evidenceKey = input.evidenceKey.trim().toUpperCase()')
  && server.includes('evidence_key: evidenceKey'), 'Server must validate and persist a normalized genuine reference');
assert(server.includes("'revenue_verified'") && server.includes("verifiedReceivedCents"),
  'Do not replace receipt-only revenue logic with click-based monetization');
assert(functions.includes("evidenceKey: z.string().trim().min(6).max(120).regex(")
  && functions.includes('evidenceKey: data.evidenceKey'),
  'Typed server action must validate and forward the evidence ID');
assert(panel.includes('name="evidenceKey"') && panel.includes('Reusing the same evidence ID')
  && panel.includes('not net of any later refunds'),
  'Staff UI must communicate dedup, sensitive-field avoidance and gross cash receipt scope');
assert(!server.includes('sendMail(') && !server.includes('stripe.'),
  'Duplicate verification must never send messages or charge a provider/customer');
console.log('Corporate event outcome provider document deduplication and truthful gross-receipts reporting PASS');
