/**
 * Free scheduled source monitor: only notify when the original organization
 * changes the official status of the statue's name. Never infer a winner.
 */
const url='https://www.budaedc.com/wiener-dog-statue/';
const response=await fetch(url,{headers:{'User-Agent':'TexasDefined-OfficialSourceMonitor/1.0'},signal:AbortSignal.timeout(25000)});
if (!response.ok) throw new Error('Buda EDC source unavailable: HTTP '+response.status);
const html=await response.text();
if (!html.toLowerCase().includes('wiener dog')) throw new Error('Official Buda EDC page lost expected context; requires source audit');
const waiting=/voting polls are now closed/i.test(html) && /name reveal/i.test(html);
console.log(JSON.stringify({source:url,status:response.status,awaitingOfficialName:waiting,observedAt:new Date().toISOString()}));
if (waiting) process.exit(0);

// Changed-page wording is not sufficient to declare a winner. Route to a
// source-research issue, and do not rewrite a live authority page from HTML.
if (process.env.GITHUB_EVENT_NAME!=='schedule' && process.env.GITHUB_EVENT_NAME!=='workflow_dispatch') {
  throw new Error('Buda statue naming source changed; inspect official announcement before updating the guide.');
}
const owner=process.env.GITHUB_REPOSITORY;
const token=process.env.GITHUB_TOKEN;
if (!owner || !token) throw new Error('GitHub issue notification requires repository identity and workflow token.');
const api='https://api.github.com/repos/'+owner+'/issues';
const headers={Authorization:'Bearer '+token,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'};
const list=await fetch(api+'?state=open&per_page=100',{headers,signal:AbortSignal.timeout(15000)});
if (!list.ok) throw new Error('Cannot check existing Buda naming issue: HTTP '+list.status);
const issues=await list.json();
const prefix='[source change] Buda wiener dog statue naming';
if (issues.some(issue=>String(issue.title??'').startsWith(prefix))) {
  console.log('A Buda statue official-name verification issue is already open.');
  process.exit(0);
}
const body=[
  'The official Buda EDC naming source no longer contains its prior November 10, 2026 wording indicating voting is closed and the name reveal is pending.',
  '',
  'Original: '+url,
  'Current canonical TexasDefined city guide: https://texasdefined.com/city/buda',
  'Original installation evidence: https://www.budaedc.com/news/the-buda-edc-celebrates-25th-anniversary-with-larger-than-life-sculpture/',
  '',
  '**Research and verify the actual newly announced name directly with Buda EDC before editing public copy.**',
  'Do not take HTML changes alone as confirmation of a name or invent a 2027 race date.',
  'Update the permanent city authority block and source-check date only after corroboration, validate CI and live SSR; retain park visiting directions.',
].join('\n');
const created=await fetch(api,{method:'POST',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({title:prefix+' — verify official announcement',body}),signal:AbortSignal.timeout(15000)});
if (!created.ok) throw new Error('Unable to file official-source-change issue: HTTP '+created.status);
console.log('Opened official source change issue: '+(await created.json()).html_url);
