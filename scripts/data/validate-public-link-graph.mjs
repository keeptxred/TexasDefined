import fs from 'node:fs';

const auditPath='scripts/ci/audit-production-link-graph.mjs';
const workflowPath='.github/workflows/audit-whole-site-production.yml';
for(const path of [auditPath,workflowPath]) if(!fs.existsSync(path)) throw new Error(`Public link graph validation failed: missing ${path}`);

const audit=fs.readFileSync(auditPath,'utf8');
const workflow=fs.readFileSync(workflowPath,'utf8');
const failures=[];
const requireText=(source,token,label)=>{if(!source.includes(token)) failures.push(label);};

for(const token of [
  'collectUrls()',
  'extractInternalTargets',
  'const inbound=new Map',
  'const outbound=new Map',
  'const orphanPages=rows.filter((row)=>row.inboundCount===0)',
  'const weakPages=rows.filter((row)=>row.inboundCount>0&&row.inboundCount<=WEAK_INBOUND_THRESHOLD)',
  'familySummary',
  'redirectedInternalLinks',
  'brokenInternalLinks',
  'LINK_GRAPH_WEAK_INBOUND_THRESHOLD',
  'LINK_GRAPH_MAX_PAGE_FETCH_FAILURES',
  'MAX_PAGE_FETCH_FAILURES',
  '/tmp/texasdefined-link-graph.json',
  '/tmp/texasdefined-link-graph.tsv',
]) requireText(audit,token,`production link graph audit missing ${token}`);

if(!audit.includes('if (sitemapFailures.length || fetchFailures.length > MAX_PAGE_FETCH_FAILURES || brokenInternalLinks.length) process.exit(1);')) failures.push('Link graph audit must fail on sitemap failures, genuinely broken internal targets, or page-fetch failures above the explicit bounded threshold.');
if(audit.includes('orphanPages.length) process.exit(1)')||audit.includes('weakPages.length) process.exit(1)')) failures.push('Orphan/weak legacy debt must remain report-only until explicit thresholds are approved.');

for(const token of [
  'node scripts/data/validate-public-link-graph.mjs',
  'node scripts/ci/audit-production-link-graph.mjs',
  '/tmp/texasdefined-link-graph.json',
  '/tmp/texasdefined-link-graph.tsv',
  'texasdefined-public-link-graph',
]) requireText(workflow,token,`whole-site workflow missing link-graph contract ${token}`);

if(failures.length){
  console.error('Public link graph validation failed:');
  for(const failure of failures) console.error('- '+failure);
  process.exit(1);
}
console.log('Public link graph validation passed: scheduled/PR whole-site crawling reports orphan, weak, redirected and broken internal-link targets with durable JSON/TSV artifacts and a bounded transient-fetch failure threshold.');
