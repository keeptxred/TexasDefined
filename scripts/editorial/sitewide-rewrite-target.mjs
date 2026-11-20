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
  if (!issue || issue.pull_request || issue.state !== 'open' ||
    (issue.labels || []).some(l => l.name === 'autonomous-rewrite-in-progress')) return false;
  if (!/source|freshness|visitor.fact|editorial|authority|review|fact drift|update needed/i.test(issue.title || '')) return false;
  return findPagePaths(issue.body).length > 0 && findOfficialSourceUrls(issue.body).length > 0;
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
  let selected = null;
  for (const issue of issues.slice(0, 35)) {
    const paths = findPagePaths(issue.body);
    const official = findOfficialSourceUrls(issue.body);
    const sources = (await Promise.all(official.map(async url => {
      try { return await officialExcerpt(url); }
      catch { return null; /* blocked source never counts as verified evidence */ }
    }))).filter(Boolean);
    if (!sources.length) continue;
    selected = {issue: issue.number, issueUrl: issue.html_url, title: issue.title,
      page: paths[0], pagesInIssue: paths.length, sources,
      issueContext: String(issue.body).slice(0, 6500),
      sourceRunAt: new Date().toISOString(), scheduledWorkflows: workflows.length};
    break;
  }
  fs.mkdirSync('.artifacts', {recursive: true});
  fs.writeFileSync('.artifacts/sitewide-rewrite-target.json', JSON.stringify({selected, scope: 'one-source-backed-page',
    scheduledWorkflows: workflows.length, totalOpenSourceReviewCandidates: issues.length, runLimit: RUN_LIMIT}, null, 2) + '\n');
  if (process.env.GITHUB_OUTPUT)
    fs.appendFileSync(process.env.GITHUB_OUTPUT, 'selected=' + Boolean(selected) + '\n');
  console.log(JSON.stringify({scheduledWorkflows: workflows.length, candidates: issues.length,
    selected: selected ? {issue: selected.issue, page: selected.page, sources: selected.sources.map(s => s.url)} : null}));
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main().catch(error => {
  console.error(error); process.exitCode = 1;
});
