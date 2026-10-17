#!/usr/bin/env node
/**
 * Bounded, authorized-feed ingestion. No scraping, full-site crawling, or
 * inferred scores. Expected: { season:"2026", games:[complete game records] }.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const path = new URL('../../src/data/high-school-football/football-matchups.snapshot.json', import.meta.url);
const source = process.env.FOOTBALL_RESULTS_FEED_URL;
if (!source) {
  console.log('No authorized score feed configured; preserving verified snapshot.');
  process.exit(0);
}
const endpoint = new URL(source);
if (endpoint.protocol !== 'https:' || /^(localhost|127\.|0\.|10\.|192\.168\.|169\.254\.)/.test(endpoint.hostname)) {
  throw new Error('Score provider must be an approved public HTTPS endpoint.');
}
const existing = JSON.parse(readFileSync(path, 'utf8'));
const headers = { accept: 'application/json' };
if (process.env.FOOTBALL_RESULTS_FEED_TOKEN) headers.authorization = 'Bearer ' + process.env.FOOTBALL_RESULTS_FEED_TOKEN;
const response = await fetch(endpoint, { headers, signal: AbortSignal.timeout(12000), redirect: 'error' });
if (!response.ok) throw new Error('Score provider returned HTTP ' + response.status);
if (Number(response.headers.get('content-length') || 0) > 1500000) throw new Error('Score feed too large');
const raw = await response.text();
if (raw.length > 1500000) throw new Error('Score feed too large');
const incoming = JSON.parse(raw);
if (incoming.season !== existing.season || !Array.isArray(incoming.games) || incoming.games.length > 1500) {
  throw new Error('Wrong season or unbounded score feed');
}
const https = (s) => typeof s === 'string' && /^https:\/\/[^/\s]+\.[^/\s]+(?:\/|$)/.test(s);
const date = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && Number.isFinite(Date.parse(s + 'T00:00:00Z'));
const school = (s) => s && typeof s.name === 'string' && s.name.length > 1 && s.name.length < 110 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s.slug);
const validScore = (n) => Number.isInteger(n) && n >= 0 && n <= 200;
const rounds = new Set(['bi-district','area','regional','quarterfinal','semifinal','final']);
const seen = new Set();
const bySlug = new Map(existing.games.map((game) => [game.slug, game]));
for (const game of incoming.games) {
  if (!game || !/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$/.test(game.slug)
    || !date(game.date) || !game.slug.startsWith(game.date + '-')
    || !school(game.home) || !school(game.away) || game.home.slug === game.away.slug
    || !/^[1-6]A$/.test(game.classification) || typeof game.kickoff !== 'string' || game.kickoff.length > 60
    || !['regular','playoff'].includes(game.phase) || !['scheduled','final'].includes(game.status)
    || !https(game.sourceUrl) || !date(game.verifiedAt) || typeof game.sourceLabel !== 'string'
    || game.sourceLabel.length < 3 || game.sourceLabel.length > 180 || seen.has(game.slug)) {
    throw new Error('Invalid or duplicated score feed record: ' + String(game?.slug));
  }
  seen.add(game.slug);
  if (game.status === 'final' && (!validScore(game.homeScore) || !validScore(game.awayScore) || !https(game.resultSourceUrl)))
    throw new Error('Final score lacks verifiable source: ' + game.slug);
  if (game.status === 'scheduled' && (game.homeScore !== undefined || game.awayScore !== undefined))
    throw new Error('Scheduled game cannot have a final score: ' + game.slug);
  if (game.phase === 'playoff' && ((game.division !== 1 && game.division !== 2) || !rounds.has(game.round)))
    throw new Error('Playoff entry lacks division or round: ' + game.slug);
  if (game.venueSourceUrl && !https(game.venueSourceUrl)) throw new Error('Invalid venue URL: ' + game.slug);
  const old = bySlug.get(game.slug);
  if (old) {
    if (old.date !== game.date || old.home.slug !== game.home.slug || old.away.slug !== game.away.slug
      || old.classification !== game.classification || old.phase !== game.phase)
      throw new Error('Provider attempted to rewrite game identity: ' + game.slug);
    if (old.status === 'final' && (game.status !== 'final' || game.homeScore !== old.homeScore || game.awayScore !== old.awayScore))
      throw new Error('Conflicting final score requires manual reconciliation: ' + game.slug);
    if (game.verifiedAt < old.verifiedAt) throw new Error('Older provider verification: ' + game.slug);
  }
  bySlug.set(game.slug, game);
}
const games = [...bySlug.values()].sort((a,b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
if (games.length > 1500) throw new Error('Refusing an unbounded statewide import');
if (JSON.stringify(games) === JSON.stringify(existing.games)) {
  console.log('No new scores; no publication change.');
  process.exit(0);
}
writeFileSync(path, JSON.stringify({ ...existing, updatedAt: new Date().toISOString().slice(0,10), feed: 'approved verified provider', games }, null, 2) + '\n');
console.log('Updated verified football snapshot, games: ' + games.length);
