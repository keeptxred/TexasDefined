-- TexasDefined TDI 2025 homeowners research source monitor: recovery installation.
-- Snapshot reflects verified Supabase functions as deployed Oct 10, 2026.
-- Read companion runbook before executing. This is a backup, NOT a pending migration.
-- TDI values pinned for 2025: premium 3489 USD; coverage 432800 USD.
-- No automatic changes to public research; all changed/final signals require review.
CREATE SCHEMA IF NOT EXISTS private;
CREATE TABLE IF NOT EXISTS private.tdi_homeowners_2025_checks (
 id bigint generated always as identity primary key,
 requested_at timestamptz not null default now(),
 checked_at timestamptz,
 request_id bigint not null unique,
 source_url text not null default 'https://www.tdi.texas.gov/general/texas-homeowners-insurance-market-overview.html',
 http_status integer,
 average_premium_usd integer,
 average_coverage_usd integer,
 image_premium_preliminary boolean,
 image_coverage_preliminary boolean,
 page_2025_preliminary boolean,
 outcome text not null default 'pending' check (outcome in ('pending','still_preliminary','changed_data','final_review','fetch_error','parse_error')),
 attention_needed boolean not null default false,
 details text
);
ALTER TABLE private.tdi_homeowners_2025_checks ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE private.tdi_homeowners_2025_checks FROM public, anon, authenticated;
REVOKE ALL ON SEQUENCE private.tdi_homeowners_2025_checks_id_seq FROM public, anon, authenticated;
CREATE OR REPLACE FUNCTION private.tdi_homeowners_2025_fetch()
 RETURNS bigint
 LANGUAGE plpgsql
 SET search_path TO 'pg_catalog', 'private', 'net'
AS $function$
declare rid bigint;
begin
 select net.http_get(
   url:='https://www.tdi.texas.gov/general/texas-homeowners-insurance-market-overview.html',
   timeout_milliseconds:=20000
 ) into rid;
 insert into private.tdi_homeowners_2025_checks(request_id) values (rid);
 return rid;
end;
$function$
;
CREATE OR REPLACE FUNCTION private.tdi_homeowners_2025_process()
 RETURNS integer
 LANGUAGE plpgsql
 SET search_path TO 'pg_catalog', 'private', 'net'
AS $function$
declare
 v record; r record;
 coverage_match text[]; premium_match text[];
 coverage integer; premium integer;
 coverage_prelim boolean; premium_prelim boolean; page_prelim boolean;
 outcome_text text; n integer:=0;
begin
 for v in select id,request_id,requested_at from private.tdi_homeowners_2025_checks
 where outcome='pending' and requested_at<now()-interval '10 seconds'
 order by id limit 20
 loop
  select id,status_code,error_msg,timed_out,content into r
  from net._http_response where id=v.request_id;
  if not found then
   if v.requested_at<now()-interval '30 minutes' then
    update private.tdi_homeowners_2025_checks
    set checked_at=now(),outcome='fetch_error',attention_needed=true,
    details='No pg_net response within 30 minutes'
    where id=v.id;
    n:=n+1;
   end if;
   continue;
  end if;
  if r.status_code is distinct from 200 or coalesce(r.timed_out,false) then
   update private.tdi_homeowners_2025_checks
   set checked_at=now(),http_status=r.status_code,outcome='fetch_error',attention_needed=true,
   details=left(coalesce(r.error_msg,'Non-200 response from TDI'),500) where id=v.id;
   n:=n+1;
   continue;
  end if;
  coverage_match:=regexp_match(r.content,'Chart showing average home coverage[^"]*2025[[:space:]]*[$]([0-9,]+)[^"]*"[^>]+src="([^"]+)"');
  premium_match:=regexp_match(r.content,'Chart showing average home insurance premium[^"]*2025[[:space:]]*[$]([0-9,]+)[^"]*"[^>]+src="([^"]+)"');
  if coverage_match is null or premium_match is null then
   update private.tdi_homeowners_2025_checks set checked_at=now(),http_status=200,
   outcome='parse_error',attention_needed=true,
   details='TDI chart alt text or image source has changed; inspect source' where id=v.id;
   n:=n+1;
   continue;
  end if;
  begin
   coverage:=replace(coverage_match[1],',','')::integer;
   premium:=replace(premium_match[1],',','')::integer;
  exception when invalid_text_representation or numeric_value_out_of_range then
   update private.tdi_homeowners_2025_checks set checked_at=now(),http_status=200,
   outcome='parse_error',attention_needed=true,
   details='TDI figures could not be converted to integers' where id=v.id;
   n:=n+1;
   continue;
  end;
  coverage_prelim:=strpos(lower(coverage_match[2]),'2025')>0 and strpos(lower(coverage_match[2]),'preliminary')>0;
  premium_prelim:=strpos(lower(premium_match[2]),'2025')>0 and strpos(lower(premium_match[2]),'preliminary')>0;
  page_prelim:=strpos(lower(r.content),'2025 preliminary')>0;
  outcome_text:=case
   when coverage<>432800 or premium<>3489 then 'changed_data'
   when not (coverage_prelim and premium_prelim and page_prelim) then 'final_review'
   else 'still_preliminary' end;
  update private.tdi_homeowners_2025_checks
  set checked_at=now(),http_status=200,average_premium_usd=premium,
      average_coverage_usd=coverage,image_premium_preliminary=premium_prelim,
      image_coverage_preliminary=coverage_prelim,page_2025_preliminary=page_prelim,
      outcome=outcome_text,attention_needed=(outcome_text<>'still_preliminary'),
      details=format('Premium %s; coverage %s; TDI preliminary labels: premium chart=%s, coverage chart=%s, page=%s',
      premium,coverage,premium_prelim,coverage_prelim,page_prelim)
  where id=v.id;
  n:=n+1;
 end loop;
 return n;
end;$function$
;
REVOKE ALL ON FUNCTION private.tdi_homeowners_2025_fetch() FROM public, anon, authenticated;
REVOKE ALL ON FUNCTION private.tdi_homeowners_2025_process() FROM public, anon, authenticated;
DO $cleanup$
BEGIN
 IF EXISTS (SELECT 1 FROM cron.job WHERE jobname='texasdefined-tdi-homeowners-2025-process-weekly') THEN
  PERFORM cron.unschedule('texasdefined-tdi-homeowners-2025-process-weekly');
 END IF;
END;
$cleanup$;
SELECT cron.schedule('texasdefined-tdi-homeowners-2025-fetch-weekly','2 12 * * 1',
 'select private.tdi_homeowners_2025_fetch();');
SELECT cron.schedule('texasdefined-tdi-homeowners-2025-process-hourly','12 * * * *',
 'select private.tdi_homeowners_2025_process();');
-- Inspect:
-- SELECT id,requested_at,checked_at,http_status,average_premium_usd,
-- average_coverage_usd,outcome,attention_needed,details
-- FROM private.tdi_homeowners_2025_checks ORDER BY id DESC LIMIT 10;
