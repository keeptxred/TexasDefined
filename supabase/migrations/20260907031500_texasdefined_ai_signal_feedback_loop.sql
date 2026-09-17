create or replace function public.td_ai_process_question_signal()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  action_value text;
  topic_value text;
  location_value text;
begin
  topic_value := coalesce(new.topics[1], 'texas-general');
  location_value := coalesce(nullif(new.texas_place, ''), 'statewide');

  insert into public.td_ai_search_demand (
    observed_on, source, query_pattern, topic, intent, location_scope,
    impressions, clicks, demand_score, coverage_status, recommended_action, metadata
  ) values (
    (new.occurred_at at time zone 'America/Chicago')::date,
    'ask-texas-ai', new.cluster_key, topic_value, new.intent, location_value,
    1, 0, 1, new.coverage_status,
    case
      when new.coverage_status = 'none' and new.intent in ('nearby','plan') then 'tool'
      when new.coverage_status = 'none' then 'build'
      when new.coverage_status = 'weak' then 'improve'
      else 'monitor'
    end,
    jsonb_build_object('freshnessClass', new.freshness_class, 'answerStatus', new.answer_status)
  )
  on conflict (source, observed_on, query_pattern, location_scope)
  do update set
    impressions = public.td_ai_search_demand.impressions + 1,
    demand_score = coalesce(public.td_ai_search_demand.demand_score, 0) + 1,
    coverage_status = excluded.coverage_status,
    recommended_action = excluded.recommended_action,
    metadata = excluded.metadata,
    updated_at = now();

  if new.coverage_status in ('weak', 'none') then
    action_value := case
      when new.intent in ('nearby','plan') and new.coverage_status = 'none' then 'tool'
      when new.coverage_status = 'none' then 'build'
      else 'improve'
    end;

    insert into public.td_ai_coverage_gaps (
      cluster_key, topic, intent, location_scope, ask_count,
      first_seen_at, last_seen_at, coverage_status, recommended_action, metadata
    ) values (
      new.cluster_key, topic_value, new.intent, location_value, 1,
      new.occurred_at, new.occurred_at, new.coverage_status, action_value,
      jsonb_build_object('freshnessClass', new.freshness_class, 'answerStatus', new.answer_status)
    )
    on conflict (cluster_key)
    do update set
      ask_count = public.td_ai_coverage_gaps.ask_count + 1,
      last_seen_at = greatest(public.td_ai_coverage_gaps.last_seen_at, excluded.last_seen_at),
      coverage_status = excluded.coverage_status,
      recommended_action = excluded.recommended_action,
      metadata = excluded.metadata,
      updated_at = now();
  end if;

  return new;
end;
$$;

drop trigger if exists td_ai_question_signal_feedback on public.td_ai_question_signals;
create trigger td_ai_question_signal_feedback
after insert on public.td_ai_question_signals
for each row execute function public.td_ai_process_question_signal();

revoke all on function public.td_ai_process_question_signal() from public, anon, authenticated;
grant execute on function public.td_ai_process_question_signal() to service_role;

comment on function public.td_ai_process_question_signal() is 'Aggregates privacy-minimized Ask Texas AI signals into demand and coverage-gap backlogs without storing raw visitor questions.';
