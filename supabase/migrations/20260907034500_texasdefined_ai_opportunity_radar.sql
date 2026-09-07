create or replace view public.td_ai_opportunity_radar
with (security_invoker = true)
as
with demand as (
  select
    coalesce(topic, 'texas-general') as topic,
    coalesce(intent, 'general') as intent,
    coalesce(location_scope, 'statewide') as location_scope,
    sum(impressions)::bigint as impressions,
    sum(clicks)::bigint as clicks,
    sum(coalesce(demand_score, 0))::numeric(14,3) as demand_score,
    max(observed_on) as last_observed_on,
    count(*)::bigint as demand_rows,
    array_remove(array_agg(distinct source), null) as demand_sources
  from public.td_ai_search_demand
  group by 1,2,3
), gaps as (
  select
    coalesce(topic, 'texas-general') as topic,
    coalesce(intent, 'general') as intent,
    coalesce(location_scope, 'statewide') as location_scope,
    sum(ask_count)::bigint as ask_count,
    max(last_seen_at) as last_asked_at,
    case
      when bool_or(coverage_status = 'none') then 'none'
      when bool_or(coverage_status = 'weak') then 'weak'
      else 'medium'
    end as coverage_status,
    case
      when bool_or(recommended_action = 'tool') then 'tool'
      when bool_or(recommended_action = 'build') then 'build'
      when bool_or(recommended_action = 'improve') then 'improve'
      else 'monitor'
    end as gap_action
  from public.td_ai_coverage_gaps
  where workflow_status in ('backlog','accepted','in-progress')
  group by 1,2,3
)
select
  coalesce(d.topic, g.topic) as topic,
  coalesce(d.intent, g.intent) as intent,
  coalesce(d.location_scope, g.location_scope) as location_scope,
  coalesce(d.impressions, 0) as impressions,
  coalesce(d.clicks, 0) as clicks,
  coalesce(g.ask_count, 0) as ask_count,
  coalesce(d.demand_score, 0) as external_demand_score,
  (coalesce(d.demand_score, 0) + coalesce(g.ask_count, 0) * 10)::numeric(14,3) as opportunity_score,
  coalesce(g.coverage_status, 'unknown') as coverage_status,
  case
    when g.gap_action is not null then g.gap_action
    when coalesce(d.impressions, 0) >= 25 and coalesce(d.clicks, 0) = 0 then 'improve'
    when coalesce(d.impressions, 0) > 0 then 'monitor'
    else 'monitor'
  end as recommended_action,
  d.demand_sources,
  d.last_observed_on,
  g.last_asked_at
from demand d
full outer join gaps g
  on g.topic = d.topic
 and g.intent = d.intent
 and g.location_scope = d.location_scope;

revoke all on public.td_ai_opportunity_radar from public, anon, authenticated;
grant select on public.td_ai_opportunity_radar to service_role;

comment on view public.td_ai_opportunity_radar is 'Service-role-only ranked TexasDefined opportunity radar combining external search demand with privacy-minimized Ask Texas AI coverage gaps.';
