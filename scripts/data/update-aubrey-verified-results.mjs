#!/usr/bin/env node
/**
 * Aubrey-only, rights-respecting score sync. Consumes TWO independently
 * authorized JSON feeds. Never scrapes MaxPreps/UIL/third-party websites.
 * Only posts finals on matches present in the current editorial schedule.
 */
import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = new URL('../../', import.meta.url);
const SNAPSHOT = new URL('../../src/data/high-school-football/aubrey-auto-results.snapshot.json', import.meta.url);
const EDITORIAL = new URL('../../src/data/high-school-football/program-editorial.ts', import.meta.url);
const iso = (value) => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
  && new Date(value + 'T00:00:00Z').toISOString().startsWith(value);
const score = (value) => Number.isInteger(value) && value >= 0 && value <= 200;
const validUrl = (value) => {
  if (typeof value !== 'string' || value.length > 500) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password && !url.port
      && !/^(?:localhost|127\.|10\.|0\.|192\.168\.|169\.254\.|172\.(?:1[6-9]|2\d|3[01])\.|.*\.local$)/i.test(url.hostname);
  } catch { return false; }
};
const texasToday = (clock = new Date()) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(clock);
  const part = (type) => parts.find((item) => item.type === type)?.value;
  return [part('year'), part('month'), part('day')].join('-');
};
function aubreyEditorial(source) {
  const start = source.indexOf('  "aubrey": {');
  const end = source.indexOf('\n  "', start + 14);
  if (start < 0 || end <= start) throw new Error('Cannot locate the authored Aubrey season');
  const parsed = JSON.parse('{' + source.slice(start, end).trim().replace(/,\s*$/, '') + '}').aubrey;
  if (!parsed.season?.games || parsed.season.games.length !== 10) throw new Error('Unexpected Aubrey schedule shape');
  return parsed;
}
function validateFeed(feed, hostname, today) {
  if (feed?.season !== '2026' || feed?.teamSlug !== 'aubrey' || !Array.isArray(feed.games)
    || feed.games.length > 16) throw new Error('Score provider returned wrong team/season or unbounded games');
  const seen = new Set();
  const map = new Map();
  for (const row of feed.games) {
    if (!iso(row?.date) || !row.date.startsWith('2026-') || row.date >= today
      || row.status !== 'final' || typeof row.opponent !== 'string'
      || row.opponent.length < 3 || row.opponent.length > 110
      || !score(row.aubreyScore) || !score(row.opponentScore)
      || row.aubreyScore === row.opponentScore || !validUrl(row.sourceUrl)
      || new URL(row.sourceUrl).hostname !== hostname || seen.has(row.date)) {
      throw new Error('Invalid, future, duplicate or unverifiable Aubrey final in provider response');
    }
    seen.add(row.date);
    map.set(row.date, row);
  }
  return map;
}
export function reconcileAubreyResults({ editorial, snapshot, primary, secondary, primaryHost, secondaryHost, today }) {
  if (!primaryHost || !secondaryHost || primaryHost === secondaryHost) {
    throw new Error('Aubrey score providers must have separate independent hostnames');
  }
  if (snapshot.teamSlug !== 'aubrey' || snapshot.season !== '2026'
    || !Array.isArray(snapshot.verifiedResults) || snapshot.verifiedResults.length > 10) {
    throw new Error('Invalid Aubrey published-score snapshot');
  }
  const first = validateFeed(primary, primaryHost, today);
  const second = validateFeed(secondary, secondaryHost, today);
  const known = new Map(editorial.season.games.map((row) => [row.date, row]));
  const published = new Map(snapshot.verifiedResults.map((row) => [row.date, row]));
  const merged = [...published.values()];
  const pending = [];
  let added = 0;
  for (const game of editorial.season.games) {
    if (game.result || game.date >= today) continue;
    const a = first.get(game.date), b = second.get(game.date);
    if (!a || !b) {
      pending.push(game.date + ' / ' + game.opponent + ': independent confirmation missing');
      continue;
    }
    if (a.opponent !== game.opponent || b.opponent !== game.opponent
      || a.aubreyScore !== b.aubreyScore || a.opponentScore !== b.opponentScore) {
      throw new Error('Conflicting team, opponent or final score for ' + game.date);
    }
    const candidate = {
      date: game.date, opponent: game.opponent,
      aubreyScore: a.aubreyScore, opponentScore: a.opponentScore,
      district: Boolean(game.district),
      primarySourceUrl: a.sourceUrl, secondarySourceUrl: b.sourceUrl,
      verifiedAt: today,
    };
    const old = published.get(game.date);
    if (old) {
      for (const key of ['opponent','aubreyScore','opponentScore','district']) {
        if (old[key] !== candidate[key]) throw new Error('A published Aubrey result was revised: ' + game.date);
      }
    } else {
      merged.push(candidate);
      added++;
    }
  }
  for (const row of merged) {
    const game = known.get(row.date);
    if (!game || game.opponent !== row.opponent || Boolean(game.district) !== row.district
      || !score(row.aubreyScore) || !score(row.opponentScore) || !validUrl(row.primarySourceUrl)
      || !validUrl(row.secondarySourceUrl)) throw new Error('Published Aubrey snapshot mismatches authored fixture');
    const result = (row.aubreyScore > row.opponentScore ? 'W ' : 'L ') + row.aubreyScore + '–' + row.opponentScore;
    if (game.result && game.result !== result) throw new Error('Conflicting locked historical final: ' + game.date);
  }
  return {
    snapshot: { season: '2026', teamSlug: 'aubrey',
      verifiedResults: merged.sort((a,b) => a.date.localeCompare(b.date)) },
    added, pending,
  };
}
async function fetchFeed(url, token) {
  if (!validUrl(url)) throw new Error('Authorized feed must be HTTPS on a public DNS name without embedded credentials');
  const headers = { accept: 'application/json' };
  if (token) headers.authorization = 'Bearer ' + token;
  const response = await fetch(url, { headers, redirect: 'error', signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error('Licensed provider returned HTTP ' + response.status);
  if (Number(response.headers.get('content-length') || 0) > 200000) throw new Error('Provider response exceeds bounded limit');
  const body = await response.text();
  if (body.length > 200000) throw new Error('Provider response exceeds bounded limit');
  return JSON.parse(body);
}
async function main() {
  const primaryUrl = process.env.AUBREY_SCORE_FEED_PRIMARY_URL;
  const secondaryUrl = process.env.AUBREY_SCORE_FEED_SECONDARY_URL;
  if (!primaryUrl || !secondaryUrl) {
    throw new Error('BLOCKED: configure two independent authorized Aubrey score feed URLs; no scraping or fictional scores allowed');
  }
  if (!validUrl(primaryUrl) || !validUrl(secondaryUrl)) throw new Error('Unapproved Aubrey provider URL');
  const primaryHost = new URL(primaryUrl).hostname;
  const secondaryHost = new URL(secondaryUrl).hostname;
  if (primaryHost === secondaryHost) throw new Error('Two separately hosted independent authorized feeds are required');
  const [primary, secondary] = await Promise.all([
    fetchFeed(primaryUrl, process.env.AUBREY_SCORE_FEED_PRIMARY_TOKEN),
    fetchFeed(secondaryUrl, process.env.AUBREY_SCORE_FEED_SECONDARY_TOKEN),
  ]);
  const editorial = aubreyEditorial(readFileSync(EDITORIAL,'utf8'));
  const snapshot = JSON.parse(readFileSync(SNAPSHOT, 'utf8'));
  const result = reconcileAubreyResults({
    editorial, snapshot, primary, secondary, primaryHost, secondaryHost, today: texasToday(),
  });
  if (result.added) {
    writeFileSync(SNAPSHOT, JSON.stringify(result.snapshot,null,2) + '\n');
    console.log('Added ' + result.added + ' independently corroborated Aubrey finals.');
  } else console.log('No new independently corroborated Aubrey finals.');
  for (const row of result.pending) console.log('REVIEW NEEDED: ' + row);
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, 'changed=' + (result.added > 0) + '\n');
    appendFileSync(process.env.GITHUB_OUTPUT, 'needs_review=' + (result.pending.length > 0) + '\n');
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(fileURLToPath(new URL(process.argv[1], 'file://' + process.cwd() + '/'))).href) {
  await main();
}
