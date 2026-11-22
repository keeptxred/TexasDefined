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
const RUN_LIMIT = 1;
const ISSUE_LIMIT = 100;
const MAX_OPEN_ISSUE_PAGES = 25; // Fail closed rather than quietly exclude older refresh alerts.
const SOURCE_LIMIT = 3;
const MAX_HTML = 850_000;
const PAGE_PATTERN = /https:\/\/texasdefined\.com(\/[a-z0-9][a-z0-9\/-]{4,125})|(?:^|[\s\u0060(])(\/[a-z][a-z0-9-]{2,}(?:\/[a-z0-9-]+)*)/g;
const URL_PATTERN = /https:\/\/[a-zA-Z0-9.-]+(?:\/[^\s<>"'\u0060)\\]*)?/g;
// Public first-party military sites and these curator-registered organizer hosts
// also appear in the permanent event source inventory.
const TRUSTED_HOST = /(?:\.gov|\.edu|\.org|\.com|\.mil)$|^(?:www\.)?(?:austinpowwow\.net|texasstaterailroad\.net|sabiff\.tv)$/i;
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
/**
 * Every scheduled invocation must advance across unreviewed source/page pairs,
 * including when a source was reachable but no actual correction was justified.
 * Round-robin reduces no-op paid drafting loops without dropping any source
 * incident or implying that an HTTP 200 warrants rewriting the page.
 */
export function rotateCandidates(rows, runNumber) {
  if (!Array.isArray(rows)) throw Error('Invalid refresh queue');
  if (!rows.length) return [];
  const ordinal = Number(runNumber);
  if (!Number.isSafeInteger(ordinal) || ordinal < 1)
    throw Error('Valid monotonically increasing workflow run number required');
  const offset = (ordinal - 1) % rows.length;
  return [...rows.slice(offset), ...rows.slice(0, offset)];
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
/**
 * Review the COMPLETE open GitHub issue backlog rather than searching four
 * keywords and silently ignoring anything beyond the latest 45 matches.
 * Individual monitors own their issues; the editorial eligibility filter
 * below still rejects unrelated tickets, PRs, and missing official evidence.
 * GitHub's issue list includes PRs, so those are explicitly excluded.
 */
export async function loadIssues(fetcher = fetch, headers = githubHeaders()) {
  const unique = new Map();
  for (let page = 1; page <= MAX_OPEN_ISSUE_PAGES; page++) {
    const response = await fetcher(API + '/repos/' + REPO +
      '/issues?state=open&per_page=' + ISSUE_LIMIT + '&page=' + page, {
      headers, signal: AbortSignal.timeout(16000),
    });
    if (!response.ok) throw Error('GitHub open issue backlog page ' + page +
      ' HTTP ' + response.status);
    const items = await response.json();
    if (!Array.isArray(items)) throw Error('Invalid GitHub open issue response at page ' + page);
    for (const issue of items) if (!issue.pull_request) unique.set(issue.number, issue);
    if (items.length < ISSUE_LIMIT)
      return [...unique.values()].sort((a,b) =>
        String(b.updated_at).localeCompare(String(a.updated_at)) ||
        Number(b.number) - Number(a.number));
  }
  throw Error('Open issue backlog exceeds ' + (MAX_OPEN_ISSUE_PAGES * ISSUE_LIMIT) +
    ' records; refuse truncated sitewide source refresh');
}
/** Do not pay for a second rewrite while the first is undergoing protected
 * source checks, CI, auto-merge or a fail-closed source-conflict review. */
export function pendingSourceIssueIds(pulls) {
  const issues = new Set();
  for (const pr of pulls || []) {
    const match = /^Source-verified editorial refresh for issue #(\d+)$/.exec(pr.title || '');
    if (pr.state !== 'open' || !match ||
        !/^automation\/sitewide-editorial-\d+$/.test(pr.head?.ref || '')) continue;
    issues.add(Number(match[1]));
  }
  return issues;
}
async function loadPendingSourceIssues(fetcher = fetch) {
  const resp = await fetcher(API + '/repos/' + REPO + '/pulls?state=open&per_page=100', {
    headers: githubHeaders(), signal: AbortSignal.timeout(16000),
  });
  if (!resp.ok) throw Error('Open source-verified PR discovery HTTP ' + resp.status);
  return pendingSourceIssueIds(await resp.json());
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
  const [openIssues, pending] = await Promise.all([loadIssues(), loadPendingSourceIssues()]);
  const issues = openIssues.filter(issue => sourceReviewEligible(issue) && !pending.has(issue.number));
  const reviewed = priorEditorialRewrites();
  const unseen = [], previouslyReviewed = [];
  for (const issue of issues) {
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
  const runNumber = Number(process.env.GITHUB_RUN_NUMBER || 1);
  const candidates = rotateCandidates(unseen, runNumber);
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
    scheduledWorkflows: workflows.length, totalOpenSourceReviewCandidates: issues.length, pendingProtectedIssueCount: pending.size,
    unreviewedSourcePagePairs: unseen.length, previouslyRewrittenPairs: previouslyReviewed.length,
    attempted, queueRunNumber: runNumber, rotationOffset: unseen.length ? (runNumber - 1) % unseen.length : 0,
    runLimit: RUN_LIMIT}, null, 2) + '\n');
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
