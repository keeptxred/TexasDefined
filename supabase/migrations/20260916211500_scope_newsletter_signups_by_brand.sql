-- Allow the shared subscriber store to keep independent subscriptions for
-- Keep TX Red and Texas Defined while preserving existing KTR inserts.

alter table public.newsletter_signups
  add column if not exists brand_id text not null default 'keeptxred';

alter table public.newsletter_signups
  drop constraint if exists newsletter_signups_brand_id_check;

alter table public.newsletter_signups
  add constraint newsletter_signups_brand_id_check
  check (brand_id in ('keeptxred', 'texasdefined'));

alter table public.newsletter_signups
  drop constraint if exists newsletter_signups_source_page_length_check;

alter table public.newsletter_signups
  add constraint newsletter_signups_source_page_length_check
  check (source_page is null or length(source_page) <= 300);

drop index if exists public.newsletter_signups_email_lower_idx;
create unique index if not exists newsletter_signups_brand_email_lower_idx
  on public.newsletter_signups (brand_id, lower(email));

-- The legacy KTR subscribe action still writes with a publishable key, so keep
-- public INSERT only. RLS continues to reject reads, updates and deletes.
revoke all privileges on table public.newsletter_signups from anon, authenticated;
grant insert on table public.newsletter_signups to anon, authenticated;
grant select, insert, update, delete on table public.newsletter_signups to service_role;

drop policy if exists "Anyone can subscribe with a valid email" on public.newsletter_signups;
create policy "Anyone can subscribe to a supported newsletter"
  on public.newsletter_signups
  for insert
  to anon, authenticated
  with check (
    brand_id in ('keeptxred', 'texasdefined')
    and email is not null
    and length(email) between 5 and 254
    and email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    and (source_page is null or length(source_page) <= 300)
  );
