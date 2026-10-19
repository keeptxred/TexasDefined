/**
 * Targeted weekly watch: four official Texas live-racing operators only.
 * Never publishes dates; opens a de-duplicated review issue when newly dated
 * future race announcements need official TXRC confirmation.
 */
import { createHash } from 'node:crypto';

export const SOURCES = [
  { id: 'lone-star-park', name: 'Lone Star Park', url: 'https://www.lonestarpark.com/live-racing/', known: [] },
  { id: 'sam-houston-race-park', name: 'Sam Houston Race Park', url: 'https://www.shrp.com/', known: ['december 18, 2026', 'april 3, 2027', 'april 15, 2027', 'june 12, 2027'] },
  { id: 'retama-park', name: 'Retama Park', url: 'https://www.retamapark.com/horseracing/live-racing', known: [] },
  { id: 'gillespie-county-fairgrounds', name: 'Gillespie County Fairgrounds', url: 'https://gillespiefair.com/pari-mutuel-horse-racing', known: [] },
];

export function stripPage(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<\/(?:p|div|li|h[1-6])>/gi, '. ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&').replace(/\s+/g, ' ').trim();
}

const DATES = /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:st|nd|rd|th)?(?:\s*[-–]\s*\d{1,2})?,?\s+20(?:2[7-9]|3\d)\b/gi;
const RACING = /horse\s*racing|live\s*racing|quarter\s*horse|thoroughbred|meet|race\s*dates|first\s*post|pari-?mutuel/i;

export function newRaceDateContexts(html, source, nowYear = new Date().getUTCFullYear()) {
  const body = stripPage(html);
  const found = [];
  for (const match of body.matchAll(DATES)) {
    const date = match[0].toLowerCase().replace(/(\d)(st|nd|rd|th)\b/g, '$1').replace(/,?\s*20/, ', 20');
    const year = Number(date.match(/20\d{2}/)?.[0]);
    if (!year || year < nowYear || source.known.some(k => date.includes(k))) continue;
    const sentenceStart = Math.max(body.lastIndexOf('.', match.index - 1) + 1, match.index - 130, 0);
    const sentenceEnd = body.indexOf('.', match.index);
    const context = body.slice(sentenceStart, Math.min(body.length, sentenceEnd < 0 ? match.index + 140 : sentenceEnd));
    if (!RACING.test(context)) continue;
    found.push({ date: match[0], context: context.slice(0, 280) });
  }
  return [...new Map(found.map(row => [row.date.toLowerCase(), row])).values()].slice(0, 10);
}

async function api(path, options = {}) {
  const repo = process.env.GITHUB_REPOSITORY;
  const token = process.env.GITHUB_TOKEN;
  if (!token || !/^[\w.-]+\/[\w.-]+$/.test(repo || '')) throw Error('Missing GitHub issue permissions');
  const response = await fetch('https://api.github.com' + path.replace('{repo}', repo), {
    ...options,
    headers: { Accept: 'application/vnd.github+json', Authorization: 'Bearer ' + token, 'User-Agent': 'TexasDefined-racing-calendar', ...(options.headers || {}) },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw Error('GitHub ' + response.status);
  return response.json();
}

export async function run() {
  const checked = [];
  const alerts = [];
  for (const src of SOURCES) {
    try {
      const response = await fetch(src.url, { headers: { 'User-Agent': 'TexasDefined-racing-calendar-review/1.0' }, signal: AbortSignal.timeout(12000) });
      if (!response.ok) { checked.push({ source: src.id, status: response.status }); continue; }
      const dates = newRaceDateContexts((await response.text()).slice(0, 1_000_000), src);
      checked.push({ source: src.id, candidateDates: dates.map(x => x.date) });
      if (!dates.length) continue;
      const title = 'Texas horse racing schedule review: ' + src.name + ' ' + (new Date().getUTCFullYear() + 1) + '+';
      const q = encodeURIComponent('repo:' + process.env.GITHUB_REPOSITORY + ' is:issue in:title "' + title + '"');
      const existing = await api('/search/issues?q=' + q + '&per_page=30');
      if (existing.items?.some(issue => issue.title === title)) { alerts.push({ source: src.id, status: 'previously-alerted' }); continue; }
      const digest = createHash('sha256').update(JSON.stringify(dates)).digest('hex').slice(0, 12);
      const body = [
        'A source page now contains future race-date language that needs editorial verification. No calendar is automatically published.',
        '', 'Official source: ' + src.url, 'Checked: ' + new Date().toISOString().slice(0, 10), 'Content fingerprint: ' + digest, '',
        ...dates.map(row => '- ' + row.date + ': ' + row.context),
        '', 'Review the operator calendar against current Texas Racing Commission approvals. Only after verification update the TexasDefined calendar and venue guide. Simulcast hours are not live race days.',
      ].join('\n');
      const created = await api('/repos/{repo}/issues', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, body }) });
      alerts.push({ source: src.id, status: 'issue-created', issue: created.html_url });
    } catch (e) { checked.push({ source: src.id, status: 'unavailable', error: String(e).slice(0, 150) }); }
  }
  return { checked, alerts };
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1])) console.log(JSON.stringify(await run(), null, 2));
