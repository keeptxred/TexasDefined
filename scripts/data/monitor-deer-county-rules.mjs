#!/usr/bin/env node
/**
 * Monitor ALL 254 Texas counties for changes to official TPWD deer rules.
 * The canonical legal text stays at TPWD. Emit source URLs, season proof,
 * deer-specific SHA256 hashes and auditable per-county health results.
 */
import fs from 'node:fs';
import { mkdirSync, writeFileSync } from 'node:fs';
import crypto from 'node:crypto';
import { join } from 'node:path';
import data from '../../src/data/hunting/deer-season-dates.json' with { type: 'json' };

const raw = fs.readFileSync('src/data/texas-county-slugs.ts', 'utf8');
const list = raw.split('const COUNTY_NAMES = ')[1]?.split(".split('|')")[0];
if (!list || list.length < 1500) throw new Error('Cannot read all 254 official Texas county names');
const counties = list.slice(1, -1).split('|');
const toSlug = value => value.toLowerCase().replace(/[^a-z0-9]/g, '');
const allSlugs = counties.map(toSlug);
if (counties.length !== 254 || new Set(allSlugs).size !== 254) {
  throw new Error('Expected exactly 254 unique counties and TPWD URL slugs');
}
const shardCount = 7;
const shard = Number(process.env.DEER_COUNTY_SHARD ?? process.argv.find(x => x.startsWith('--shard='))?.split('=')[1] ?? '0');
if (!Number.isInteger(shard) || shard < 0 || shard >= shardCount) throw new Error('Invalid deer county shard');
const partition = counties.map((name, i) => ({ name, slug: allSlugs[i], index: i }))
  .filter(x => x.index % shardCount === shard);
const urlFor = slug => 'https://tpwd.texas.gov/regulations/outdoor-annual/regs/counties/' + slug + '/';
function visible(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(?:nbsp|#160);/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ').trim();
}
function extractDeerSection(html) {
  const matches = [...html.matchAll(/<h[23]\b[^>]*>([\s\S]*?)<\/h[23]>/gi)];
  const deer = matches.find(m => visible(m[1]).trim().toLowerCase() === 'white-tailed deer');
  if (!deer) return null;
  const start = deer.index + deer[0].length;
  const next = matches.find(m => m.index > deer.index && /^<h2\b/i.test(m[0]));
  return visible(html.slice(start, next?.index ?? html.length));
}
function parseCounty(item, html) {
  const text = visible(html);
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  const title = h1 ? visible(h1[1]) : '';
  const seasonMarker = data.startYear + '-' + (data.startYear+1) + ' Hunting Seasons';
  const foundIndex = title.indexOf(seasonMarker);
  if (foundIndex < 0 || toSlug(title.slice(0, foundIndex).trim()) !== item.slug) {
    throw new Error(item.name + ': official county heading/year/identity mismatch: ' + title.slice(0,110));
  }
  if (text.length < 350) throw new Error(item.name + ': official TPWD county page unexpectedly short');
  const section = extractDeerSection(html);
  if (section && section.length < 75) throw new Error(item.name + ': deer rules section unexpectedly short');
  return {
    county: item.name, slug: item.slug, url: urlFor(item.slug),
    seasonYear: data.seasonYear, hasDeerSection: !!section,
    deerRulesDigest: section ? crypto.createHash('sha256').update(section).digest('hex') : null,
    sourceExcerpt: section ? section.slice(0, 170) : '',
  };
}
async function getCounty(item) {
  const url = urlFor(item.slug);
  const delays = [0, 2500, 7000];
  let last;
  for (const delay of delays) {
    if (delay) await new Promise(resolve => setTimeout(resolve, delay));
    try {
      const r = await fetch(url, {
        headers: { accept: 'text/html', 'user-agent': 'TexasDefined-official-deer-county-monitor/1.0' },
        signal: AbortSignal.timeout(20000),
      });
      if (!r.ok) throw new Error(item.name + ': TPWD HTTP ' + r.status);
      if (new URL(r.url).hostname !== 'tpwd.texas.gov') {
        throw new Error(item.name + ': redirected away from official TPWD');
      }
      if (!(r.headers.get('content-type') || '').includes('text/html'))
        throw new Error(item.name + ': non-HTML official response');
      return parseCounty(item, await r.text());
    } catch (error) { last = error; }
  }
  throw last;
}
function selfTest() {
  const counts = Array.from({length:shardCount}, (_,i) =>
    counties.filter((_,j) => j % shardCount === i).length);
  if (counts.reduce((a,b)=>a+b,0) !== 254 || Math.min(...counts) < 36 ||
      toSlug('La Salle') !== 'lasalle' || toSlug('Fort Bend') !== 'fortbend') {
    throw new Error('Deer county enumeration or partition test failed');
  }
  const item = { name:'Tarrant', slug:'tarrant' };
  const html = '<h1>Tarrant ' + data.startYear + '-' + (data.startYear+1) + ' Hunting Seasons</h1>' +
    '<h2>White-tailed Deer</h2><p>Bag Limit 4 deer, no more than 2 bucks, and no more than 2 antlerless. ' +
    'Antler restrictions and all hunting means are county specific. More hunting regulation information. '.repeat(4) + '</p><h2>Wild Turkey</h2>';
  const actual = parseCounty(item, html);
  if (!actual.hasDeerSection || actual.sourceExcerpt.includes('Wild Turkey'))
    throw new Error('Deer-only section extraction failed');
  if (parseCounty(item, html.replace('White-tailed Deer', 'Mule Deer')).hasDeerSection)
    throw new Error('Missing deer section was not detected');
  try { parseCounty(item, html.replace(String(data.startYear), '1999')); throw new Error('Stale county year accepted'); }
  catch(e) { if (e.message === 'Stale county year accepted') throw e; }
  console.log('254 official county URLs, seven shards, deer-only extraction and invalid-year rejection verified offline.');
}
if (process.argv.includes('--self-test')) { selfTest(); process.exit(0); }
const output = { seasonYear: data.seasonYear, shard, checkedAt: new Date().toISOString(),
  checked: [], failures: [] };
const queue = partition.slice();
async function worker() {
  while (queue.length) {
    const item = queue.shift();
    try { const x = await getCounty(item); output.checked.push(x); console.log('Verified TPWD deer county: ' + item.name); }
    catch(e) { output.failures.push({ county: item.name, url:urlFor(item.slug), error:String(e).slice(0, 300) }); }
  }
}
await Promise.all([worker(),worker()]);
output.checked.sort((a,b)=>a.county.localeCompare(b.county));
mkdirSync('artifacts/deer-county-monitor', {recursive:true});
const target = join('artifacts/deer-county-monitor', 'shard-' + shard + '.json');
writeFileSync(target, JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({shard,checked:output.checked.length,failed:output.failures}));
if (output.failures.length || output.checked.length !== partition.length) process.exitCode = 1;
