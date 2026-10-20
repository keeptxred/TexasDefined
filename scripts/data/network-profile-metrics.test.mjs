import test from 'node:test';
import assert from 'node:assert/strict';
import {summarizeNetworkOwnerMetrics,NETWORK_METRIC_ACTIONS} from '../../src/data/network-profile-metrics.ts';
const rows=[
 {observed_on:'2026-10-11',action:'profile_view',event_count:11},
 {observed_on:'2026-10-11',action:'website_click',event_count:'3'},
 {observed_on:'2026-10-11',action:'social_click',event_count:2},
 {observed_on:'2026-10-10',action:'profile_view',event_count:7},
 {observed_on:'2026-10-01',action:'phone_click',event_count:1},
 {observed_on:'2026-10-04',action:'profile_view',event_count:5},
];
test('Plus reports only straightforward 30-day aggregate observed views and actions',()=>{
 const report=summarizeNetworkOwnerMetrics(rows,'plus','2026-10-11');
 assert.equal(report.tier,'plus');
 assert.equal(report.views,23);
 assert.equal(report.contactActions,6);
 assert.equal('daily' in report,false);
 assert.equal('actionBreakdown' in report,false);
 assert.match(report.notice,/not unique people/);
});
test('Featured genuinely adds action category and 30-day timeline with current/prior comparison',()=>{
 const report=summarizeNetworkOwnerMetrics(rows,'featured','2026-10-11');
 assert.equal(report.tier,'featured');
 assert.equal(report.views,23);
 assert.equal(report.contactActions,6);
 assert.deepEqual(report.actionBreakdown,{website:3,social:2,phone:1});
 assert.equal(report.daily.length,30);
 assert.equal(report.daily[0].day,'2026-09-12');
 assert.equal(report.daily.at(-1).day,'2026-10-11');
 assert.equal(report.recentSevenDays,18);
 assert.equal(report.priorSevenDays,5);
 assert.equal(report.daily.at(-1).views,11);
 assert.equal(report.daily.at(-1).actions,5);
});
test('empty real reporting is zero, not a fabricated boost',()=>{
 const plus=summarizeNetworkOwnerMetrics([],'plus','2026-10-11');
 const featured=summarizeNetworkOwnerMetrics([],'featured','2026-10-11');
 assert.equal(plus.views,0);
 assert.equal(plus.contactActions,0);
 assert.equal(featured.daily.length,30);
 assert.equal(featured.recentSevenDays,0);
 assert.ok(featured.daily.every(x=>x.views===0&&x.actions===0));
});
test('malformed or out-of-window records do not produce deceptive business metrics',()=>{
 for(const row of [
  {observed_on:'2026-09-11',action:'profile_view',event_count:2},
  {observed_on:'2026-10-12',action:'profile_view',event_count:2},
  {observed_on:'2026-10-11',action:'alien_event',event_count:2},
  {observed_on:'2026-10-11',action:'profile_view',event_count:-1},
  {observed_on:'2026-10-11',action:'profile_view',event_count:1.5},
  {observed_on:'2026-10-11',action:'profile_view',event_count:100001},
  {observed_on:'2026-02-30',action:'profile_view',event_count:2},
  {observed_on:'2026-10-11',action:'profile_view',event_count:'infinite'},
 ]){
  assert.throws(()=>summarizeNetworkOwnerMetrics([row],'featured','2026-10-11'));
 }
 assert.throws(()=>summarizeNetworkOwnerMetrics([rows[0],rows[0]],'featured','2026-10-11'),/duplicate/);
 assert.throws(()=>summarizeNetworkOwnerMetrics([], 'featured','2026-12-99'));
 assert.deepEqual(NETWORK_METRIC_ACTIONS,['profile_view','website_click','social_click','phone_click']);
});
