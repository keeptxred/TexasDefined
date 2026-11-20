#!/usr/bin/env node
/**
 * Choose one *actual* source-review problem emitted by existing GitHub refresh
 * schedules. Never re-date pages on a successful HTTP fetch; never invent work.
 * Source alerts are untrusted data, not instructions to the writing agent.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const API = 'https://api.github.com';
const REPO = process.env.GITHUB_REPOSITORY || 'keeptxred/TexasDefined';
const ISSUE_TERMS = ['source', 'freshness', 'editorial', 'authority'];
const RUN_LIMIT = 1;
const ISSUE_LIMIT = 100;
const SOURCE_LIMIT = 3;
const MAX_HTML = 850_000;
const PAGE_PATTERN = /https:\/\/texasdefined\.com(\/[a-z0-9][a-z0-9\/-]{4,125})|(?:^|[\s\u0060(])(\/[a-z][a-z0-9-]{2,}(?:\/[a-z0-9-]+)*)/g;
const URL_PATTERN = /https:\/\/[a-zA-Z0-9.-]+(?:\/[^\s<>"'\u0060)\\]*)?/g;
const TRUSTED_HOST = /(?:\.gov|\.edu|\.org|\.com)$/i;
const REJECT_HOST = /(?:^|\.)((?:github|google|texasdefined|cloudflare|openai|localhost)\.(?:com|org|dev)|(?:example|invalid)\.(?:com|org))$/i;

export function findPagePaths(value) {
  return [...new Set([...String(value || '').matchAll(PAGE_PATTERN)]
    .map(m => (m[1] || m[2]).replace(/[.,;:]+$/, ''))
    .filter(p => p.length > 6 && p.length < 125))];
}
/**
 * Some mature source monitors list official URL drift but not the public route.
 * Recover only identities already represented in trusted, curated catalogs;
 * never infer a destination from a third-party issue's arbitrary domain name.
 */
export function findScheduledOperatorPages(value, root = ROOT) {
  const input = String(value || '');
  const mapped = [];
  const monitor = fs.readFileSync(path.join(root, 'scripts/data/authority/monitor-operator-sources.mjs'), 'utf8');
  const section = monitor.split('export const heritageDestinationMonitorRows = [')[1]?.split('];')[0] || '';
  for (const match of section.matchAll(/\{ id: "([a-z0-9-]+)", sourceUrl: "(https:[^"]+)"/g)) {
    if (input.includes(match[2])) mapped.push('/destination/' + match[1]);
  }
  const reviewed = fs.readFileSync(path.join(root,'src/data/reviewed-attraction-authorities.ts'),'utf8');
  const marker='export const reviewedAttractionDestinations: Destination[] = ';
  const pos=reviewed.indexOf(marker);
  if (pos >= 0) {
    const literal = reviewed.slice(pos + marker.length).trimStart();
    if (!literal.startsWith('[')) throw Error('Reviewed attraction registry is no longer a literal array');
    let depth = 0, quoted = false, escaped = false, end = -1;
    for (let i = 0; i < literal.length; i++) {
      const ch = literal[i];
      if (quoted) {
        if (escaped) escaped = false;
        else if (ch === '\\') escaped = true;
        else if (ch === '"') quoted = false;
      } else if (ch === '"') quoted = true;
      else if (ch === '[') depth++;
      else if (ch === ']' && --depth === 0) { end = i + 1; break; }
    }
    if (end < 1) throw Error('Cannot find closed reviewed attraction literal array');
    const records = JSON.parse(literal.slice(0,end));
    for (const record of records) {
      const urls=[record.officialUrl, ...(record.authorityGuide?.sources || []).map(x=>x.url),
        ...(record.visitorFaqs || []).map(x=>x.sourceUrl),
        ...(record.visitorFacts || []).map(x=>x.sourceUrl)].filter(Boolean);
      if (urls.some(url => input.includes(url))) mapped.push('/destination/'+record.slug);
    }
  }
  return [...new Set(mapped)];
}
export function findIssuePages(value) {
  const declared = findPagePaths(value);
  return declared.length ? declared : findScheduledOperatorPages(value);
}
export function findOfficialSourceUrls(value) {
  return [...new Set([...String(value || '').matchAll(URL_PATTERN)]
    .map(m => m[0].replace(/[.,;:]+$/, ''))
    .filter(s => {
      try {
        const url = new URL(s);
        return url.protocol === 'https:' && !url.username && !url.password &&
          TRUSTED_HOST.test(url.hostname) && !REJECT_HOST.test(url.hostname) &&
          !/^[\d.]+$/.test(url.hostname) && !/^(?:10|127|172|192|169)\./.test(url.hostname) &&
          !/\/(?:actions|pull|issues|commit|blob)\//.test(url.pathname);
      } catch { return false; }
    }))].slice(0, SOURCE_LIMIT);
}
export function sourceReviewEligible(issue) {
  if (!issue || issue.pull_request || issue.state !== 'open') return false;
  if (!/source|freshness|visitor.fact|editorial|authority|review|fact drift|update needed/i.test(issue.title || '')) return false;
  return issuePageSourcePairs(issue.body).length > 0;
}

/** Match the canonical URL to the SAME source-bearing row, not a different
 * event's organizer from an umbrella issue containing hundreds of pages. */
export function issuePageSourcePairs(body) {
  const rows = [], seen = new Set();
  for (const line of String(body || '').split(/\r?\n/)) {
    const pages = findIssuePages(line);
    const sources = findOfficialSourceUrls(line);
    for (const page of pages) for (const sourceUrl of sources) {
      const key = page + '\t' + sourceUrl;
      if (seen.has(key)) continue;
      seen.add(key);
      rows.push({page, sourceUrl, context: line.trim().slice(0, 900)});
    }
  }
  // Single-page prose sometimes describes official links in a different
  // paragraph from the canonical. Multiple-page issues must be line-matched.
  if (rows.length === 0) {
    const pages = findIssuePages(body), sources = findOfficialSourceUrls(body);
    if (pages.length === 1 && sources.length === 1)
      rows.push({page: pages[0], sourceUrl: sources[0],
        context: String(body).slice(0, 800)});
  }
  return rows;
}
export function evidencePathFor(issueNumber, page) {
  if (!Number.isSafeInteger(issueNumber) || issueNumber < 1 ||
      !/^\/[a-z0-9][a-z0-9/-]*$/.test(page)) throw Error('Invalid issue/page identity');
  return 'ops/editorial/auto-rewrite-evidence/issue-' + issueNumber +
    '--' + page.slice(1).replaceAll('/', '--') + '.json';
}
export function priorEditorialRewrites(root = ROOT) {
  const dir = path.join(root, 'ops/editorial/auto-rewrite-evidence');
  const reviewed = new Set();
  if (!fs.existsSync(dir)) return reviewed;
  for (const name of fs.readdirSync(dir)) {
    if (!/^issue-\d+(?:--[a-z0-9-]+)?\.json$/.test(name)) continue;
    try {
      const ledger = JSON.parse(fs.readFileSync(path.join(dir,name),'utf8'));
      if (Number.isSafeInteger(ledger.issue) && /^\/[a-z0-9/-]+$/.test(ledger.page) &&
          Array.isArray(ledger.facts) && ledger.facts.length)
        reviewed.add(ledger.issue + '\t' + ledger.page);
    } catch { throw Error('Malformed committed rewrite evidence: ' + name); }
  }
  return reviewed;
}
export function scheduledWorkflowInventory(root = ROOT) {
  const dir = path.join(root, '.github/workflows');
  return fs.readdirSync(dir).filter(file => /\.ya?ml$/.test(file))
    .filter(file => {
      const src = fs.readFileSync(path.join(dir, file), 'utf8');
      const onBlock = src.match(/(?:^|\n)on:[^\n]*\n([\s\S]*?)(?=\n[^\s#][^\n]*:|$)/)?.[1] || '';
      return /^  schedule:\s*$/m.test(onBlock);
    }).sort();
}
function githubHeaders() {
  if (!process.env.GH_TOKEN && !process.env.GITHUB_TOKEN) throw Error('GitHub read token required');
  return {Authorization: 'Bearer ' + (process.env.GH_TOKEN || process.env.GITHUB_TOKEN),
    Accept: 'application/vnd.github+json', 'User-Agent': 'TexasDefined-Source-Backed-Refresh'};
}
async function loadIssues(fetcher = fetch) {
  const groups = await Promise.all(ISSUE_TERMS.map(async term => {
    const query = encodeURIComponent('repo:' + REPO + ' is:issue is:open in:title,body ' + term);
    const response = await fetcher(API + '/search/issues?q=' + query +
      '&sort=updated&order=desc&per_page=' + ISSUE_LIMIT, {
      headers: githubHeaders(), signal: AbortSignal.timeout(16000),
    });
    if (!response.ok) throw Error('GitHub issue search (' + term + ') HTTP ' + response.status);
    return (await response.json()).items || [];
  }));
  const unique = new Map(groups.flat().map(issue => [issue.number, issue]));
  return [...unique.values()].sort((a,b) =>
    String(b.updated_at).localeCompare(String(a.updated_at)));
}
function sourceText(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ').trim();
}
async function officialExcerpt(url, fetcher = fetch) {
  const response = await fetcher(url, {
    headers: {Accept: 'text/html,text/plain', 'User-Agent': 'TexasDefinedEditorialRefresh/1.0'},
    redirect: 'manual', signal: AbortSignal.timeout(12000),
  });
  if (response.status !== 200 || !/text\/html|text\/plain/i.test(response.headers.get('content-type') || '')) return null;
  if (Number(response.headers.get('content-length') || 0) > MAX_HTML) return null;
  const html = await response.text();
  if (Buffer.byteLength(html, 'utf8') > MAX_HTML) return null;
  const excerpt = sourceText(html).slice(0, 7000);
  return excerpt.length >= 250 ? {url, excerpt} : null;
}
async function main() {
  const workflows = scheduledWorkflowInventory();
  if (workflows.length < 20) throw Error('Scheduled workflow inventory truncated; refuse false sitewide coverage');
  const issues = (await loadIssues()).filter(sourceReviewEligible);
  const reviewed = priorEditorialRewrites();
  const unseen = [], previouslyReviewed = [];
  for (const issue of issues.slice(0, 45)) {
    for (const pair of issuePageSourcePairs(issue.body)) {
      const row = {...pair, issue: issue.number, issueUrl: issue.html_url,
        title: issue.title, issueUpdatedAt: issue.updated_at};
      if (reviewed.has(row.issue + '\t' + row.page)) previouslyReviewed.push(row);
      else unseen.push(row);
    }
  }
  // Always give fresh, unhandled pages priority. A global source-monitor issue
  // MUST remain open after the first page is repaired. Avoid repeating the
  // first event from a 151-page overdue list every day.
  const candidates = unseen.length ? unseen : [];
  let selected = null, attempted = 0;
  for (let i = 0; i < Math.min(candidates.length, 60); i += 5) {
    const batch = candidates.slice(i, i + 5);
    const possible = await Promise.all(batch.map(async row => {
      try { return {...row, evidence: await officialExcerpt(row.sourceUrl)}; }
      catch { return {...row, evidence: null}; }
    }));
    attempted += batch.length;
    const viable = possible.find(item => item.evidence);
    if (!viable) continue;
    selected = {
      issue: viable.issue, issueUrl: viable.issueUrl, title: viable.title,
      page: viable.page, pagesInIssue: issuePageSourcePairs(
        issues.find(issue => issue.number === viable.issue)?.body || '').length,
      sources: [viable.evidence],
      evidencePath: evidencePathFor(viable.issue,viable.page),
      issueContext: viable.context,
      sourceRunAt: new Date().toISOString(),
      scheduledWorkflows: workflows.length,
    };
    break;
  }
  fs.mkdirSync('.artifacts', {recursive: true});
  fs.writeFileSync('.artifacts/sitewide-rewrite-target.json', JSON.stringify({selected, scope: 'one-source-backed-page',
    scheduledWorkflows: workflows.length, totalOpenSourceReviewCandidates: issues.length,
    unreviewedSourcePagePairs: unseen.length, previouslyRewrittenPairs: previouslyReviewed.length,
    attempted, runLimit: RUN_LIMIT}, null, 2) + '\n');
  if (process.env.GITHUB_OUTPUT)
    fs.appendFileSync(process.env.GITHUB_OUTPUT, 'selected=' + Boolean(selected) + '\n');
  console.log(JSON.stringify({scheduledWorkflows: workflows.length, candidates: issues.length,
    unreviewedSourcePagePairs: unseen.length, previouslyRewrittenPairs: previouslyReviewed.length,
    attempted, selected: selected ?
      {issue:selected.issue, page:selected.page, sources:selected.sources.map(s=>s.url)} : null}));
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main().catch(error => {
  console.error(error); process.exitCode = 1;
});
