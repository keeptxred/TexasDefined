import test from 'node:test';
import assert from 'node:assert/strict';
import { validateSid, performanceCandidates, safeMeta, reportUrl, impactGet, diagnose } from './impact-reporting-discovery.mjs';

test('SID is strictly constrained and URLs cannot target arbitrary endpoints', () => {
  assert.equal(validateSid('IR123456'), 'IR123456');
  for (const bad of ['', 'x', 'abc/Actions', 'IR1000?x=1', 'secret:token', 'IN\nJECT']) assert.throws(() => validateSid(bad));
  assert.equal(reportUrl('IR123456', ''), 'https://api.impact.com/Mediapartners/IR123456/Reports');
  assert.throws(() => reportUrl('IR123456', '/../Actions'));
});

test('report catalog distinguishes actual API eligibility and candidate types', () => {
  const c = performanceCandidates({ Reports: [
    { Id:'mp_daily', Name:'Performance by Day', ApiAccessible:true },
    { Id:'mp_brand', Name:'Performance by Brand', ApiAccessible:true },
    { Id:'mp_actions', Name:'Advanced Action Listing', ApiAccessible:true },
    { Id:'mp_ui_only', Name:'Performance by Day', ApiAccessible:false },
    { Id:'../secret', Name:'Performance by Brand', ApiAccessible:true },
  ] });
  assert.deepEqual([c.total,c.accessible,c.daily.length,c.program.length,c.action.length], [5,3,1,1,1]);
});

test('only metadata names are extracted, not any report values or identity data', () => {
  const m = safeMeta({Attributes:[{Name:'Clicks',Value:'500'}, {Name:'Payout',Value:'123.00'}, {Name:'unsafe\ninject'}], Filters:[{Name:'StartDate'}], Records:[{CustomerName:'Private'}]});
  assert.deepEqual(m.columns,['Clicks','Payout']);
  assert.deepEqual(m.filters,['StartDate']);
  assert.equal(JSON.stringify(m).includes('Private'),false);
});

test('all API requests are read-only GET to fixed Impact origin with Basic auth', async () => {
  let calls = 0;
  const mock = async (url, options) => {
    calls++;
    assert.ok(url.startsWith('https://api.impact.com/Mediapartners/IR123456/Reports'));
    assert.equal(options.method,'GET');
    assert.equal(options.redirect,'error');
    assert.equal(options.headers.Authorization,'Basic '+Buffer.from('IR123456:token').toString('base64'));
    return {ok:true,status:200,headers:{get:()=>null},text:async()=>calls===1
      ? JSON.stringify({Reports:[{Id:'mp_daily',Name:'Performance by Day',ApiAccessible:true}]})
      : JSON.stringify({Attributes:[{Name:'Clicks'},{Name:'Actions'}],Filters:[{Name:'StartDate'}]})};
  };
  const result = await diagnose({IMPACT_ACCOUNT_SID:'IR123456',IMPACT_AUTH_TOKEN:'token'},mock);
  assert.equal(result.status,'AUTHENTICATED_READ_ONLY');
  assert.equal(result.inspected[0].type,'daily');
  assert.equal(calls,2);
});

test('HTTP auth rejection is sanitized; no secret/response body leaks', async () => {
  const mocked = async()=>({ok:false,status:401,headers:{get:()=>null},text:async()=>'{ "token": "leaked" }'});
  await assert.rejects(impactGet(reportUrl('IR123456',''), 'IR123456','ultra-private',mocked),e=>{
    assert.match(e.message,/HTTP 401/);
    assert.doesNotMatch(e.message,/ultra-private|leaked/);
    return true;
  });
});

test('finance-report discovery is metadata-only and bounded, including reports with currency fields', async()=>{
  const sample=performanceCandidates({Reports:[
    {Id:'mp_finance_cash',Category:'Finance',Name:'Account Payout History',ApiAccessible:true},
    {Id:'mp_payment_detail',Category:'Operations',Name:'Payment History',ApiAccessible:true},
    {Id:'mp_ui_only',Category:'Finance',Name:'Payment History',ApiAccessible:false},
  ]});
  assert.equal(sample.finance.length,2);
  let calls=0;
  const fetcher=async(url, options)=>{
    calls++;
    assert.equal(options.method,'GET');
    assert.doesNotMatch(url,/RecordExport|Actions|Customers/);
    return {ok:true,status:200,headers:{get:()=>null},text:async()=>{
      if(calls===1)return JSON.stringify({Reports:[
        {Id:'mp_finance_cash',Category:'Finance',Name:'Account Payout History',ApiAccessible:true},
        {Id:'mp_payment_detail',Category:'Operations',Name:'Payment History',ApiAccessible:true},
      ]});
      return JSON.stringify({Attributes:[{Name:'Currency'},{Name:'Amount'},{Name:'PaymentStatus'}],
        Records:[{Currency:'USD',Amount:'4250.00',PaymentStatus:'paid'}]});
    }};
  };
  const diag=await diagnose({IMPACT_ACCOUNT_SID:'IR123456',IMPACT_AUTH_TOKEN:'secret'},fetcher);
  assert.equal(calls,3);
  assert.equal(diag.financeCandidates,2);
  assert.equal(diag.inspected.length,2);
  assert.ok(diag.inspected.every(r=>r.type==='finance'));
  assert.ok(diag.inspected.every(r=>r.columns.includes('Currency')));
  assert.doesNotMatch(JSON.stringify(diag),/4250|paid|secret/);
});
