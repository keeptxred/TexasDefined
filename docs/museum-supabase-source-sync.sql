
-- Extends EXISTING TexasDefined authority verification tables and pg_cron jobs.
-- Reads the published museum source manifest. It does not claim editorial fact checks.
create table if not exists td_maintenance.museum_source_manifest_runs (
 id bigint generated always as identity primary key,
 request_id bigint not null unique,
 requested_at timestamptz not null default now(),
 processed_at timestamptz,
 status text not null default 'queued' check (status in ('queued','processed','failed')),
 museum_count integer not null default 0,
 source_count integer not null default 0,
 error_note text
);
revoke all on td_maintenance.museum_source_manifest_runs from public,anon,authenticated;
create or replace function td_maintenance.queue_museum_source_manifest(
 p_url text default 'https://texasdefined.com/museum-verification-manifest.json'
) returns bigint language plpgsql set search_path to '' as $fn$
declare v_id bigint;
begin
 if p_url <> 'https://texasdefined.com/museum-verification-manifest.json'
    and p_url <> 'https://raw.githubusercontent.com/keeptxred/TexasDefined/feature/museum-authority-network-20261012/public/museum-verification-manifest.json' then
   raise exception 'Unapproved museum authority manifest URL';
 end if;
 if exists (select 1 from td_maintenance.museum_source_manifest_runs where status='queued' and requested_at > now()-interval '12 hours') then
   return null;
 end if;
 v_id := net.http_get(url:=p_url,headers:='{"Accept":"application/json"}'::jsonb,timeout_milliseconds:=25000);
 insert into td_maintenance.museum_source_manifest_runs(request_id) values(v_id);
 return v_id;
end $fn$;
create or replace function td_maintenance.collect_museum_source_manifest() returns jsonb
language plpgsql set search_path to '' as $fn$
declare rec record; v_json jsonb; v_museum jsonb; v_src jsonb; v_path text; v_url text; v_label text; v_cadence integer;
v_museums integer:=0; v_sources integer:=0; v_processed integer:=0; v_failed integer:=0;
begin
 for rec in
  select q.id,q.request_id,q.requested_at,r.status_code,r.content,r.error_msg
  from td_maintenance.museum_source_manifest_runs q
  left join net._http_response r on r.id=q.request_id
  where q.processed_at is null and (r.id is not null or q.requested_at<now()-interval '45 minutes')
  order by q.id limit 3
 loop
  begin
   if rec.status_code <> 200 or rec.content is null then
     raise exception 'Manifest fetch HTTP %, %',rec.status_code,coalesce(rec.error_msg,'no response');
   end if;
   v_json:=rec.content::jsonb;
   if v_json->>'schemaVersion' <> '1' or jsonb_typeof(v_json->'museums') <> 'array'
     or jsonb_array_length(v_json->'museums') > 500 then
     raise exception 'Invalid museum source manifest version or cardinality';
   end if;
   v_museums:=0;v_sources:=0;
   for v_museum in select value from jsonb_array_elements(v_json->'museums') loop
     v_path:=v_museum->>'path';
     v_cadence:=coalesce((v_museum->>'cadenceDays')::integer,30);
     if v_path is null or v_path !~ '^/destination/[a-z0-9-]{3,200}$'
       or v_cadence not between 1 and 90 or jsonb_typeof(v_museum->'sources') <> 'array'
       or jsonb_array_length(v_museum->'sources') not between 1 and 100 then
       raise exception 'Invalid path, cadence or source list in museum manifest';
     end if;
     insert into public.td_authority_verification_registry(path,topic,cadence_days,status,next_review_at,discovered_from)
       values(v_path,'museum-visitor-guide',v_cadence,'awaiting_editorial_verification',now(),'museum-verified-manifest')
       on conflict(path) do update set cadence_days=least(public.td_authority_verification_registry.cadence_days,excluded.cadence_days),
         topic='museum-visitor-guide',updated_at=now();
     for v_src in select value from jsonb_array_elements(v_museum->'sources') loop
       v_url:=coalesce(v_src->>'fetchUrl',v_src->>'sourceUrl');
       v_label:=left(coalesce(nullif(v_src->>'label',''),'Official visitor information'),140);
       if v_url is null or length(v_url)>1024
        or v_url !~ '^https://[A-Za-z0-9][A-Za-z0-9.-]*\.[A-Za-z]{2,63}(/|\?|$)' then
         raise exception 'Invalid public HTTPS museum source for %',v_path;
       end if;
       insert into public.td_authority_verification_sources(path,source_url,label,next_check_at,result)
       values(v_path,v_url,v_label,now(),'new')
       on conflict(path,source_url) do update set label=excluded.label;
       v_sources:=v_sources+1;
     end loop;
     v_museums:=v_museums+1;
   end loop;
   update td_maintenance.museum_source_manifest_runs set processed_at=now(),status='processed',
     museum_count=v_museums,source_count=v_sources where id=rec.id;
   v_processed:=v_processed+1;
  exception when others then
   update td_maintenance.museum_source_manifest_runs set processed_at=now(),status='failed',
     error_note=left(sqlerrm,400) where id=rec.id;
   v_failed:=v_failed+1;
  end;
 end loop;
 return jsonb_build_object('processed',v_processed,'failed',v_failed);
end $fn$;
revoke all on function td_maintenance.queue_museum_source_manifest(text) from public,anon,authenticated;
revoke all on function td_maintenance.collect_museum_source_manifest() from public,anon,authenticated;
select cron.schedule('td-authority-import-museum-sources','49 4 * * *','select td_maintenance.queue_museum_source_manifest();');
select cron.schedule('td-authority-collect-museum-sources','13,43 * * * *','select td_maintenance.collect_museum_source_manifest();');
