-- Private CJ publisher reporting snapshot. No transaction IDs, shopper SIDs,
-- orders, API responses, tokens, or other PII are stored.
-- CJ estimates are provider-reported deltas, NOT settled payouts.
create table if not exists public.texasdefined_cj_account_sync (
  id text primary key check (id = 'current'),
  observed_at timestamptz not null,
  window_start timestamptz not null,
  window_before timestamptz not null,
  publisher_cid text not null check (publisher_cid = '8062457'),
  payload_complete boolean not null check (payload_complete = true),
  commission_record_count integer not null check (commission_record_count >= 0),
  commission_delta_usd numeric(22,4) not null,
  closed_or_locked_record_count integer not null check (closed_or_locked_record_count >= 0),
  palestine_hotels_record_count integer not null check (palestine_hotels_record_count >= 0),
  palestine_hotels_delta_usd numeric(22,4) not null,
  hotels_records_missing_sid boolean not null default false,
  rgs_contract_status text not null check (rgs_contract_status in
    ('ACTIVE', 'PENDING', 'INACTIVE', 'NO_MATCH', 'UNVERIFIED')),
  rgs_contracts_checked integer not null check (rgs_contracts_checked >= 0),
  rgs_terms_verified boolean not null default false,
  constraint cj_window_bounded check (
    window_before > window_start
    and window_before <= window_start + interval '31 days'
  ),
  constraint cj_palestine_is_subset check (
    palestine_hotels_record_count <= commission_record_count
    and closed_or_locked_record_count <= commission_record_count
  )
);
comment on table public.texasdefined_cj_account_sync is
  'PRIVATE. Account-scoped CJ publisher Commission Detail API delta summary and Really Good Stuff relationship status. Values are provider observations, not earned or settled payouts. No raw shopper/transaction records.';
alter table public.texasdefined_cj_account_sync enable row level security;
revoke all on table public.texasdefined_cj_account_sync from public, anon, authenticated;
grant select, insert, update, delete on table public.texasdefined_cj_account_sync to service_role;
