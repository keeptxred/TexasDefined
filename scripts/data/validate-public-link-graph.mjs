import fs from 'node:fs';

const auditPath='scripts/ci/audit-production-link-graph.mjs';
const workflowPath='.github/workflows/audit-whole-site-production.yml';
const packagePath='package.json';
for(const path of [auditPath,workflowPath,packagePath]) if(!fs.existsSync(path)) throw new Error(`Public link graph validation failed: missing ${path}`);

const audit=fs.readFileSync(auditPath,'utf8');
const workflow=fs.readFileSync(workflowPath,'utf8');
const pkg=JSON.parse(fs.readFileSync(packagePath,'utf8'));
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
  '/tmp/texasdefined-link-graph.json',
  '/tmp/texasdefined-link-graph.tsv',
]) requireText(audit,token,`production link graph audit missing ${token}`);

if(!audit.includes('if (sitemapFailures.length || fetchFailures.length || brokenInternalLinks.length) process.exit(1);')) failures.push('Link graph audit must fail only on sitemap/page fetch failures or genuinely broken internal targets.');
if(audit.includes('orphanPages.length) process.exit(1)')||audit.includes('weakPages.length) process.exit(1)')) failures.push('Orphan/weak legacy debt must remain report-only until explicit thresholds are approved.');

for(const token of [
  'npm run production:link-graph:audit',
  '/tmp/texasdefined-link-graph.json',
  '/tmp/texasdefined-link-graph.tsv',
  'texasdefined-public-link-graph',
]) requireText(workflow,token,`whole-site workflow missing link-graph contract ${token}`);

if(pkg.scripts?.['production:link-graph:audit']!=='node scripts/ci/audit-production-link-graph.mjs') failures.push('package script production:link-graph:audit missing or changed.');
if(pkg.scripts?.['public-link-graph:validate']!=='node scripts/data/validate-public-link-graph.mjs') failures.push('package script public-link-graph:validate missing or changed.');
if(!pkg.scripts?.['data:validate']?.includes('npm run public-link-graph:validate')) failures.push('public-link-graph:validate is not wired into data:validate.');

if(failures.length){
  console.error('Public link graph validation failed:');
  for(const failure of failures) console.error('- '+failure);
  process.exit(1);
}
console.log('Public link graph validation passed: scheduled/PR whole-site crawling reports orphan, weak, redirected and broken internal-link targets with durable JSON/TSV artifacts.');
