import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');
const footer = read('src/components/layout/Footer.tsx');
const signup = read('src/components/editorial/NewsletterSignup.tsx');
const serverAction = read('src/lib/newsletter.functions.ts');
const migration = read('supabase/migrations/20260916211500_scope_newsletter_signups_by_brand.sql');

const failures = [];
const requireText = (source, needle, message) => {
  if (!source.includes(needle)) failures.push(message);
};
const forbidText = (source, needle, message) => {
  if (source.includes(needle)) failures.push(message);
};

requireText(footer, 'brand.features.newsletter && (', 'Footer must render the newsletter whenever the brand newsletter feature is enabled.');
forbidText(footer, 'VITE_TEXASDEFINED_NEWSLETTER_SIGNUP_URL', 'Newsletter visibility must not depend on an external signup URL environment variable.');

requireText(signup, 'useServerFn', 'Newsletter form must use a server action.');
requireText(signup, 'subscribeTexasDefinedNewsletter', 'Newsletter form must call the governed Texas Defined subscribe action.');
requireText(signup, 'window.location.pathname', 'Newsletter signup must retain source-page attribution.');
requireText(signup, 'Unsubscribe anytime', 'Newsletter signup must state unsubscribe availability.');
requireText(signup, 'href="/privacy"', 'Newsletter signup must link to the privacy policy.');

requireText(serverAction, "await import('@/integrations/supabase/client.server')", 'Supabase service credentials must remain behind a dynamic server-only import.');
requireText(serverAction, "brand_id: 'texasdefined'", 'Texas Defined signups must be explicitly scoped to the texasdefined brand.');
requireText(serverAction, "source_page: sourcePage", 'Texas Defined signups must store source-page attribution.');
requireText(serverAction, "error.code === '23505'", 'Duplicate subscriptions must remain idempotent.');

requireText(migration, "default 'keeptxred'", 'Shared newsletter schema must preserve KTR backward compatibility.');
requireText(migration, "('keeptxred', 'texasdefined')", 'Shared newsletter schema must allow both governed brands.');
requireText(migration, 'newsletter_signups_brand_email_lower_idx', 'Subscriber dedupe must remain brand-scoped.');
requireText(migration, 'on public.newsletter_signups (brand_id, lower(email))', 'Subscriber dedupe must key on brand plus normalized email.');
requireText(migration, 'revoke all privileges on table public.newsletter_signups from anon, authenticated', 'Public newsletter table grants must remain fail-closed before INSERT is re-granted.');
requireText(migration, 'grant insert on table public.newsletter_signups to anon, authenticated', 'Public roles must retain INSERT-only signup access.');
forbidText(migration, 'grant select on table public.newsletter_signups to anon', 'Anonymous users must never receive subscriber read access.');

if (failures.length) {
  console.error('Newsletter repeat-traffic validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Newsletter repeat-traffic validation passed.');
