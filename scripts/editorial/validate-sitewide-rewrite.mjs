#!/usr/bin/env node
/**
 * Independent fail-closed acceptance of an AI-proposed editorial-only refresh.
 * Scheduled evidence is DATA, never permission to edit source or public copy.
 * This is a preflight in addition to the site's canonical protected Merge Gate.
 */
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const git = (...args) => execFileSync('git', args, {encoding: 'utf8', maxBuffer: 8 * 1024 * 1024}).trim();
const target = readJson('.artifacts/sitewide-rewrite-target.json').selected;
if (!target || !Number.isSafeInteger(target.issue) || target.issue < 1 ||
    !/^\/[a-z][a-z0-9/-]+$/.test(target.page) ||
    !Array.isArray(target.sources) || !target.sources.length)
  throw Error('Missing selected source-backed page');
const expectedEvidence = 'ops/editorial/auto-rewrite-evidence/issue-' + target.issue +
  '--' + target.page.slice(1).replaceAll('/', '--') + '.json';
const evidenceFile = target.evidencePath || 'ops/editorial/auto-rewrite-evidence/issue-' + target.issue + '.json';
if (evidenceFile !== expectedEvidence &&
    evidenceFile !== 'ops/editorial/auto-rewrite-evidence/issue-' + target.issue + '.json')
  throw Error('Evidence file does not match selected canonical page and issue');
if (!fs.existsSync(evidenceFile)) throw Error('No independently reviewable claim/evidence ledger');
const ledger = readJson(evidenceFile);
if (ledger.issue !== target.issue || ledger.page !== target.page ||
    !Array.isArray(ledger.facts) || ledger.facts.length < 1 || ledger.facts.length > 8)
  throw Error('Evidence must cover exactly the selected page and issue');
const base = process.argv.find(arg => arg.startsWith('--base='))?.slice('--base='.length) || 'HEAD';
const paths = git('diff','--name-only','--diff-filter=ACMR',base).split('\n').filter(Boolean);
const allowed = p => /^src\/(?:data|routes|components)\/[a-zA-Z0-9/_.$-]+\.(?:json|ts|tsx|md)$/.test(p);
const pageFiles = paths.filter(p => p !== evidenceFile);
if (!paths.includes(evidenceFile) || pageFiles.length < 1 || pageFiles.length > 5 ||
    pageFiles.some(p => !allowed(p)))
  throw Error('Unexpected file modification: ' + paths.join(', '));
git('diff','--check',base);
// Untracked page files must not bypass the audited Git patch by being staged later.
const untracked = git('ls-files','--others','--exclude-standard').split('\n').filter(Boolean);
if (untracked.some(p => p !== evidenceFile && !p.startsWith('.artifacts/')))
  throw Error('Unreviewed untracked file in editorial workspace: ' + untracked.join(', '));
const stat = git('diff','--numstat',base).split('\n');
let added = 0, removed = 0;
for (const line of stat) {
  const [a,b] = line.split('\t');
  if (!/^\d+$/.test(a) || !/^\d+$/.test(b)) throw Error('Binary or nontext changed file');
  added += Number(a); removed += Number(b);
}
if (added > 350 || removed > 200) throw Error('Unbounded automated rewrite; split into smaller verified batches');
const patch = git('diff','--unified=0',base);
const risky = [
  /(?:process\.env|eval\s*\(|new\s+Function|child_process|execSync|require\s*\(|import\s*\()/i,
  /(?:dangerouslySetInnerHTML|<script|robots.*noindex|noindex.*robots|sitemap.*lastmod)/i,
  /(?:cloudflare.*token|supabase.*key|github.*token|api[_-]?key)/i,
  /(?:sourceCheckedAt|sourceReviewedAt|lastVerifiedAt|lastFactReviewAt|reviewedAt|publishedAt|dateModified|lastReviewedAt|verifiedAt)\s*[:=]/i,
];
for (const line of patch.split('\n')) {
  if (!line.startsWith('+') || line.startsWith('+++')) continue;
  if (risky.some(regex => regex.test(line))) throw Error('Automated patch touches prohibited code/security/indexing surface');
}
const additions = patch.split('\n').filter(line => line.startsWith('+') && !line.startsWith('+++')).join('\n');
const sourceMap = new Map(target.sources.map(x => [x.url, String(x.excerpt || '')]));
let copy = '';
for (const file of pageFiles) copy += fs.readFileSync(file, 'utf8') + '\n';
for (const [index, fact] of ledger.facts.entries()) {
  if (!fact || typeof fact !== 'object' ||
      typeof fact.sourceUrl !== 'string' || !sourceMap.has(fact.sourceUrl) ||
      typeof fact.sourceQuote !== 'string' || fact.sourceQuote.length < 35 ||
      fact.sourceQuote.length > 200 || !sourceMap.get(fact.sourceUrl).includes(fact.sourceQuote) ||
      typeof fact.newCopy !== 'string' || fact.newCopy.length < 18 ||
      fact.newCopy.length > 200 || !copy.includes(fact.newCopy) || !additions.includes(fact.newCopy))
    throw Error('Fact #' + (index + 1) + ' is not directly grounded in captured official source and actual changed page copy');
}
if (ledger.updatedAt && (Number.isNaN(Date.parse(ledger.updatedAt)) ||
    Math.abs(Date.now() - Date.parse(ledger.updatedAt)) > 3 * 86400000))
  throw Error('Stale or invented editorial update date');
console.log(JSON.stringify({ok:true, page:target.page, issue:target.issue,
  files:pageFiles, added, removed, verifiedFacts:ledger.facts.length,
  sources:[...new Set(ledger.facts.map(x=>x.sourceUrl))]},null,2));

if (process.argv.includes('--live-sources')) {
  const tags = [...new Set(ledger.facts.map(x=>x.sourceUrl))];
  for (const url of tags) {
    const u = new URL(url);
    if (u.protocol !== 'https:' || u.username || u.password || !/^[a-z0-9.-]+\.(gov|edu|org|com)$/i.test(u.hostname))
      throw Error('Source host rejected: ' + url);
    const resp = await fetch(url,{redirect:'manual',headers:{Accept:'text/html,text/plain',
      'User-Agent':'TexasDefinedEditorialProvenance/1.0'},signal:AbortSignal.timeout(16000)});
    if (resp.status !== 200 || !/text\/html|text\/plain/i.test(resp.headers.get('content-type')||''))
      throw Error('Official source no longer verifiable: ' + url + ' HTTP ' + resp.status);
    const raw = await resp.text();
    if (Buffer.byteLength(raw,'utf8') > 850000) throw Error('Official evidence exceeds safety cap');
    const plain = raw.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ')
      .replace(/<[^>]+>/g,' ').replace(/&nbsp;|&#160;/g,' ')
      .replace(/&amp;/g,'&').replace(/&quot;/g,'"')
      .replace(/\s+/g,' ').trim();
    for (const item of ledger.facts.filter(x=>x.sourceUrl===url)) {
      if (!plain.includes(item.sourceQuote)) throw Error('Published official source no longer contains claimed evidence: '+url);
    }
  }
  console.log('All current official-source quotes independently revalidated');
}
