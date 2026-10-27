import assert from 'node:assert/strict';
import test from 'node:test';
import {loadCompletedDays,upsertPrivateImpact,run,configuredImpactDays} from './sync-impact-private-performance.mjs';

const env={
  IMPACT_ACCOUNT_SID:'IR123456',IMPACT_AUTH_TOKEN:'secret',
  SUPABASE_URL:'https://ftkznprjljkhymknvhye.supabase.co',
  SUPABASE_SERVICE_ROLE_KEY:'safely-test-only',
};
test('three completed Texas days read in deterministic order without raw financial values',async()=>{
  let count=0;
  const fake=async(url,options)=>{
    assert.equal(options.method,'GET');
    count++;
    const day=new URL(url).searchParams.get('START_DATE');
    assert.equal(new URL(url).searchParams.get('END_DATE'),day);
    return {ok:true,status:200,headers:{get:()=>null},text:async()=>JSON.stringify({'@numpages':1,Records:[{
      date_display:day,Clicks:'5',Actions:'0',Impressions:'12',Sales:'0',Total_Cost:'100.00',
      user_email:'private',
    }]})};
  };
  const rows=await loadCompletedDays({env,fetcher:fake,now:new Date('2026-10-27T21:00:00Z')});
  assert.equal(count,3);
  assert.deepEqual(rows.map(x=>x.metric_date),['2026-10-24','2026-10-25','2026-10-26']);
  assert.ok(rows.every(x=>x.reported_total_cost===null&&x.currency_code===null&&x.reported_clicks===5));
  assert.doesNotMatch(JSON.stringify(rows),/private|100\.00/);
});
test('persists only to service-role Supabase REST endpoint; no public analytics result',async()=>{
  let seen=false;
  const mock=async(url,options)=>{
    seen=true;
    assert.ok(url.startsWith('https://ftkznprjljkhymknvhye.supabase.co/rest/v1/texasdefined_impact_performance_daily'));
    assert.equal(options.method,'POST');
    assert.equal(options.headers.apikey,env.SUPABASE_SERVICE_ROLE_KEY);
    assert.equal(options.headers.Authorization,'Bearer '+env.SUPABASE_SERVICE_ROLE_KEY);
    const data=JSON.parse(options.body);
    assert.equal(data.length,1);
    assert.equal(data[0].reported_clicks,4);
    assert.equal(data[0].reported_total_cost,null);
    return {ok:true,status:204,body:null};
  };
  const r=await upsertPrivateImpact([{metric_date:'2026-10-26',reported_clicks:4,reported_total_cost:null}],{env,fetcher:mock});
  assert.deepEqual(r,{saved:true});
  assert.equal(seen,true);
  assert.deepEqual(await upsertPrivateImpact([],{env,fetcher:()=>{throw Error('should not hit network')}}),{saved:false});
});
test('errors do not echo private response bodies, never accept unsafe origin',async()=>{
  await assert.rejects(upsertPrivateImpact([{metric_date:'2026-10-26'}],{env:{...env,SUPABASE_URL:'https://example.com/'},fetcher:()=>{throw Error('not called')}}),/Unexpected private Supabase/);
  await assert.rejects(upsertPrivateImpact([{metric_date:'2026-10-26'}],{env,fetcher:async()=>({ok:false,status:401})}),err=>{
    assert.match(err.message,/HTTP 401/);
    assert.doesNotMatch(err.message,/safely-test-only/);
    return true;
  });
});

test('initial history backfill is explicitly opt-in, bounded to 30 completed Texas days',async()=>{
  assert.equal(configuredImpactDays(env),3);
  assert.equal(configuredImpactDays({...env,IMPACT_BACKFILL_DAYS:'30'}),30);
  for(const unsafe of ['0','31','180','-1','NaN','3.5',' 30 ',''])assert.throws(()=>configuredImpactDays({...env,IMPACT_BACKFILL_DAYS:unsafe}));
  let queried=0,first='',last='';
  const fake=async(url,options)=>{
    queried++;
    assert.equal(options.method,'GET');
    const date=new URL(url).searchParams.get('START_DATE');
    if(!first)first=date;
    last=date;
    return {ok:true,status:200,headers:{get:()=>null},text:async()=>JSON.stringify({Records:[{
      date_display:date,Clicks:'3',Actions:'0',Impressions:'4',Sales:'0',Total_Cost:'987.65'
    }]})};
  };
  const rows=await loadCompletedDays({env,fetcher:fake,days:30,now:new Date('2026-10-27T21:00:00Z')});
  assert.equal(queried,30);
  assert.equal(first,'2026-09-27');
  assert.equal(last,'2026-10-26');
  assert.equal(rows.length,30);
  assert.ok(rows.every(r=>r.currency_code===null&&r.reported_total_cost===null));
  assert.doesNotMatch(JSON.stringify(rows),/987.65/);
});

test('empty historical provider pages are skipped and never stored as zero clicks',async()=>{
  let requests=0;
  const fake=async(url,options)=>{
    requests++;
    const day=new URL(url).searchParams.get('START_DATE');
    assert.equal(options.method,'GET');
    return {ok:true,status:200,headers:{get:()=>null},text:async()=>JSON.stringify(
      {'@numpages':0,'@total':0,Records:[]})};
  };
  const rows=await loadCompletedDays({env,fetcher:fake,days:3,now:new Date('2026-10-27T21:00:00Z')});
  assert.equal(requests,3);
  assert.deepEqual(rows,[]);
});
