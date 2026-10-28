import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  marketplaceOccasions, marketplaceActivities, marketplaceAmenities,
} from '../../src/data/group-event-marketplace-foundation.ts';

const sql = readFileSync('supabase/migrations/20261028220000_group_event_marketplace_foundation.sql','utf8');
const tables = [
  'texasdefined_group_event_provider_locations',
  'texasdefined_group_event_experiences',
  'texasdefined_group_event_packages',
  'texasdefined_group_event_experience_tags',
];
for (const table of tables) {
  assert(sql.includes('CREATE TABLE IF NOT EXISTS public.' + table),
    'Missing additive relationship table ' + table);
  assert(sql.includes('ALTER TABLE public.' + table + ' ENABLE ROW LEVEL SECURITY;'),
    'New public schema table must have RLS enabled: ' + table);
  assert(sql.includes('REVOKE ALL ON public.' + table + ' FROM anon, authenticated;'),
    'No public or signed-in user may directly read or modify group-event records: ' + table);
  assert(sql.includes('GRANT SELECT, INSERT, UPDATE ON public.' + table + ' TO service_role;'),
    'Private management must be server-only: ' + table);
}
for (const ref of [
  'REFERENCES public.explore_entities(id)',
  'REFERENCES public.explore_locations(id)',
  'REFERENCES public.explore_media(id)',
  'REFERENCES public.explore_tags(id)',
  'REFERENCES public.texasdefined_group_event_partner_applications(id)',
]) {
  assert(sql.includes(ref), 'Reuse established Explore records; no new parallel business/location/media/tag tables: ' + ref);
}
assert(!/\b(DROP\s+TABLE|TRUNCATE\s+|DELETE\s+FROM|GRANT\s+ALL\s+ON\s+.*TO\s+anon|GRANT\s+SELECT\s+ON\s+.*TO\s+anon)\b/i.test(sql),
  'Build 1 must not delete data or open public access');
for (const [category, values] of [
  ['occasion', marketplaceOccasions],
  ['activity', marketplaceActivities],
  ['amenity', marketplaceAmenities],
]) {
  assert(sql.includes("SELECT '" + category + "', unnest(ARRAY["),
    'Missing typed controlled-vocabulary migration for ' + category);
  for (const key of values) {
    assert(sql.includes("'" + key + "'"), 'Missing controlled group-event tag from SQL: ' + key);
  }
}
const route = readFileSync('src/routes/corporate-events.tsx', 'utf8');
assert(route.includes("const canonicalPath = '/corporate-events'"),
  'Preserve the indexed corporate-events canonical route');
const oldDirectory = readFileSync('src/data/corporate-events.ts','utf8');
assert(oldDirectory.includes('corporateEventProviders'),
  'Keep existing independent venue directory as compatible source of record');
console.log('Marketplace Build 1 schema/RLS, shared Explore references, controlled taxonomy, and legacy route contract PASS.');
