#!/usr/bin/env node
/* One-time thin-content CANDIDATE audit. Never equate heuristics to Google's judgment. */
import fs from 'node:fs';
import path from 'node:path';
const [input, outputDir] = process.argv.slice(2);
if (!input || !outputDir) throw new Error('Usage: node report-thin-content-candidates.mjs AUDIT_JSON OUTPUT_DIR');
const audit = JSON.parse(fs.readFileSync(input, 'utf8'));
if (!Array.isArray(audit.results) || !audit.results.length) throw new Error('Refusing incomplete empty audit');
fs.mkdirSync(outputDir, { recursive: true });
function isUtility(url) {return /(?:^|\/)(?:search|shop|cart|checkout|privacy|terms|find-my-|browse|compare-texas-cities|.*-calculator|.*-estimator)(?:\/|$)/i.test(new URL(url).pathname);}
function qualify(row) {
 const pathName=new URL(row.url).pathname;
 const a=row.authority, family=a?.family || ('/'+(pathName.split('/').filter(Boolean)[0]||''));
 const mainWords=a?.mainWords??null, srcHosts=a?.identifiablePrimarySourceHosts??null, headings=a?.headings??null;
 const issues=new Set((row.issues||[]).map(x=>x.code)), flags=new Set(a?.reviewFlags||[]);
 const utility=isUtility(row.url), reasons=[], technical=[];
 const isHtml=row.status===200 && /text\/html/i.test(row.contentType||'');
 if(!isHtml) technical.push('HTML HTTP 200 not verified');
 for(const code of ['fetch-error','http-status','sitemap-url-noindex','canonical-mismatch','page-level-fallback-copy','missing-canonical'])
   if(issues.has(code)) technical.push(code);
 let risk='NOT_FLAGGED';
 if(technical.length) risk='TECHNICAL_REVIEW';
 else {
   const sourceGap=srcHosts===0, linksGap=flags.has('contextual-internal-discovery-review');
   if(issues.has('thin-render')||(mainWords!==null&&mainWords<120&&!utility)) {
     risk='HIGH';reasons.push('Very little visible main-page content');
   } else if(!utility&&mainWords!==null&&mainWords<260&&(sourceGap||linksGap||headings===0)) {
     risk='HIGH';reasons.push('Short main content and weak evidence/discovery signals');
   } else if(!utility&&mainWords!==null&&mainWords<340) {
     risk='MEDIUM';reasons.push('Limited main content for the topic');
   } else if(!utility&&mainWords!==null&&mainWords<550&&sourceGap&&linksGap) {
     risk='MEDIUM';reasons.push('Moderately short main content, no identifiable official sources, few internal links');
   }
   if(issues.has('duplicate-title')||issues.has('duplicate-description')){
     reasons.push('Duplicated title/description in crawl; check independent purpose');if(risk==='NOT_FLAGGED')risk='REVIEW';
   }
   if(!utility&&mainWords!==null&&row.words>600&&mainWords/row.words<0.18){
     reasons.push('Main content under 18% of page text; possible template dominance');if(risk==='NOT_FLAGGED')risk='REVIEW';
   }
   if(!utility&&mainWords!==null&&headings===0&&mainWords<700){
     reasons.push('No substantive subheadings in short main content');if(risk==='NOT_FLAGGED')risk='REVIEW';
   }
   if(srcHosts===0&&!utility){reasons.push('No identified official source host in visible main links (signal, not proof)');if(risk==='NOT_FLAGGED'&&mainWords!==null&&mainWords<500)risk='REVIEW';}
   if(utility&&mainWords!==null&&mainWords<120){reasons.push('Short tool page: validate functionality rather than word count');if(risk==='NOT_FLAGGED')risk='REVIEW';}
 }
 return {url:row.url,risk,family,status:row.status||0,mainWords,totalWords:row.words||0,sourceHosts:srcHosts,headings,title:row.title||'',reasons:[...new Set(reasons)].join('; '),technical:technical.join('; '),auditIssues:[...issues].join('; '),reviewFlags:[...flags].join('; ')};
}
const rows=audit.results.map(qualify), order={TECHNICAL_REVIEW:0,HIGH:1,MEDIUM:2,REVIEW:3,NOT_FLAGGED:4};
rows.sort((a,b)=>order[a.risk]-order[b.risk]||a.family.localeCompare(b.family)||a.url.localeCompare(b.url));
const fields=['url','risk','family','status','mainWords','totalWords','sourceHosts','headings','title','reasons','technical','auditIssues','reviewFlags'];
const cell=v=>'"'+String(v??'').replaceAll('"','""').replace(/[\r\n]+/g,' ')+'"';
function writeCsv(name,things){fs.writeFileSync(path.join(outputDir,name),[fields.join(','),...things.map(r=>fields.map(f=>cell(r[f])).join(','))].join('\n')+'\n');}
writeCsv('full-url-content-audit.csv',rows);
writeCsv('thin-content-review-candidates.csv',rows.filter(r=>r.risk!=='NOT_FLAGGED'));
const groups={},counts={};
for(const r of rows){counts[r.risk]=(counts[r.risk]||0)+1;const g=groups[r.family]??={pages:0,TECHNICAL_REVIEW:0,HIGH:0,MEDIUM:0,REVIEW:0,NOT_FLAGGED:0};g.pages++;g[r.risk]++;}
const table=Object.entries(groups).sort((a,b)=>b[1].HIGH-a[1].HIGH||b[1].MEDIUM-a[1].MEDIUM).map(([f,s])=>'| '+[f,s.pages,s.HIGH,s.MEDIUM,s.REVIEW,s.TECHNICAL_REVIEW].join(' | ')+' |');
const report=[
 '# TexasDefined — one-time thin-content candidate audit',
 '',
 '**This is a candidate list, NOT a list of pages Google has declared thin.**',
 'Audited: '+(audit.auditedAt||'unknown')+'; source commit: '+(audit.sourceSha||'unknown')+'; audit runtime: '+(audit.auditRuntime||'unspecified'),
 '',
 '## Coverage and totals','',
 '- Distinct sitemap URLs crawled: '+rows.length,
 '- Sitemap fetch failures: '+(audit.sitemapFailures||[]).length,
 '- TECHNICAL_REVIEW: '+(counts.TECHNICAL_REVIEW||0),
 '- HIGH: '+(counts.HIGH||0),
 '- MEDIUM: '+(counts.MEDIUM||0),
 '- REVIEW: '+(counts.REVIEW||0),
 '- NOT_FLAGGED: '+(counts.NOT_FLAGGED||0),
 '',
 '| Family | URLs | HIGH | MEDIUM | REVIEW | TECHNICAL |',
 '| --- | ---: | ---: | ---: | ---: |',
 ...table,'',
 '## Files','',
 '- full-url-content-audit.csv contains every discovered sitemap URL.',
 '- thin-content-review-candidates.csv contains every flagged URL and its concrete signals.',
 '- summary.json preserves machine-readable counts.',
 '',
 '## Important interpretation','',
 '- Main-content word counts and template dominance are heuristics, never Google determinations.',
 '- Useful calculators, comparisons, maps and data-driven pages can be valuable with little prose.',
 '- Missing external source links or low internal linking alone do not prove a page is thin.',
 '- A URL with no Google clicks is not necessarily thin.',
 '- Never bulk-delete, noindex, rewrite, add filler, or redirect based only on this report.',
 '- The one-time scan uses the existing local-built-Worker auditing framework and does not fetch thousands of production pages.',
 '- If required dynamic bindings cannot be reproduced locally, mark coverage incomplete rather than guessing.',
 '- Do not re-enable the previously disabled scheduled full-site workflows.'
];
fs.writeFileSync(path.join(outputDir,'SUMMARY.md'),report.join('\n')+'\n');
fs.writeFileSync(path.join(outputDir,'summary.json'),JSON.stringify({at:audit.auditedAt,sourceSha:audit.sourceSha,sitemaps:audit.sitemaps,sitemapFailures:audit.sitemapFailures,counts,groups},null,2)+'\n');
console.log(JSON.stringify({total:rows.length,counts,sitemapFailures:(audit.sitemapFailures||[]).length},null,2));