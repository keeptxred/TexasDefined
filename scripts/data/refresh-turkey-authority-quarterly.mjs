import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { fetchTPWD, visible } from './refresh-turkey-season-calendar.mjs';

// Editorially approved regulation text and season years are NOT rewritten here.
// This task may only refresh corroborated, structured TPWD draw and survey facts.
export const factsFile = 'src/data/hunting/turkey-quarterly-facts.json';
const months = 'Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec';
const dateRange = new RegExp('\\b(?:' + months + ')\\s+\\d{1,2},\\s+20\\d{2}\\s*[-–]\\s*(?:' + months + ')\\s+\\d{1,2},\\s+20\\d{2}\\b', 'g');
const officialSources = {
  category: 'https://tpwd.texas.gov/huntwild/hunt/public/public_hunt_drawing/hunt-category-details.phtml?OCat=NTS',
  hagerman: 'https://tpwd.texas.gov/huntwild/hunt/public/public_hunt_drawing/hunt-area-details.phtml?OArea=UP',
  eastLake: 'https://tpwd.texas.gov/huntwild/hunt/public/public_hunt_drawing/hunt-area-details.phtml?OArea=UE',
  survey: 'https://tpwd.texas.gov/huntwild/wild/game_management/turkey/turkeyData.phtml'
};
function requireMatch(source, re, label) {
  const m = source.match(re);
  if (!m) throw Error('Official TPWD ' + label + ' changed or missing; refusing automatic publication');
  return m;
}
function number(source, re, label) { return Number(requireMatch(source, re, label)[1]); }
function cleaned(html) { return visible(html).replace(/\s+/g, ' ').trim(); }
function amountsAndDates(block, kind) {
  requireMatch(block, /\bBaiting\s+Not allowed\b/i, kind + ' bait rule');
  const huntDates = requireMatch(block, /Hunt Dates\s+(.+?)\s+Bag Limit\b/i, kind + ' hunt dates')[1];
  const dates = [...huntDates.matchAll(dateRange)].map(m => m[0].replace(/\s*[-–]\s*/, ' – '));
  if (dates.length !== (kind === 'hagerman' ? 1 : 2)) throw Error('TPWD ' + kind + ' date count changed');
  const expectedLegal = kind === 'hagerman'
    ? [/One Turkey;\s*Gobbler Only/i, /All Archery Equipment/i, /Shotguns with Birdshot/i, /non-toxic shot/i, /no larger than #4/i]
    : [/One Turkey;\s*Gobbler or Bearded Hen/i, /Shotguns with Birdshot/i];
  for (const re of expectedLegal) requireMatch(block, re, kind + ' legal-method or bag wording');
  return {
    dates,
    permits: number(block, /Available:\s*(\d+)\b/i, kind + ' permits'),
    permitFeeUsd: number(block, /Fee per adult:\s*\$\s*(\d+)(?:\.00)?\b/i, kind + ' permit fee'),
    applicationFeeUsd: number(block, /\$\s*(\d+)(?:\.00)?\s*\/adult\b/i, kind + ' application fee')
  };
}
export function parseDraw(categoryHtml, hagermanHtml, eastLakeHtml, expectedSeason) {
  const cat = cleaned(categoryHtml), hagerman = cleaned(hagermanHtml), east = cleaned(eastLakeHtml);
  const season = expectedSeason.replace('–', ' - 20');
  if (!/^20\d{2} - 20\d{2}$/.test(season)) throw Error('Unexpected stored turkey season');
  for (const txt of [cat, hagerman, east])
    requireMatch(txt, new RegExp('Texas Public Hunt System\\s+' + season.replace(/ /g, '\\s*')), 'public hunt season rollover');
  requireMatch(cat, /NATIONAL REFUGE SPRING TURKEY/i, 'draw category');
  const first = cat.indexOf('Hagerman NWR Download Hagerman NWR Brochure');
  const second = cat.indexOf('Lower Rio Grande Valley NWR - East Lake Download Lower Rio Grande Valley NWR - East Lake Brochure');
  if (first < 0 || second < first) throw Error('Official draw category layout changed; no speculative listing');
  const h = amountsAndDates(cat.slice(first, second), 'hagerman');
  const e = amountsAndDates(cat.slice(second), 'eastLake');
  const ah = amountsAndDates(hagerman.slice(hagerman.lastIndexOf('National Refuge Spring Turkey')), 'hagerman');
  const ae = amountsAndDates(east.slice(east.lastIndexOf('National Refuge Spring Turkey')), 'eastLake');
  assert.deepEqual(ah, h, 'Hagerman category and area details disagree');
  assert.deepEqual(ae, e, 'East Lake category and area details disagree');
  if (h.permitFeeUsd !== e.permitFeeUsd || h.applicationFeeUsd !== e.applicationFeeUsd) throw Error('TPWD draw fees differ; editorial update required');
  const deadline = requireMatch(cat, /Application Deadline(?: Expired)?:\s*([A-Za-z]+ \d{2}, 20\d{2})\b/i, 'draw deadline')[1];
  for (const [txt, label] of [[hagerman, 'Hagerman'], [east, 'East Lake']]) {
    if (!txt.includes(deadline)) throw Error(label + ' area application deadline disagrees with category');
  }
  const expectedYear = 2000 + Number(expectedSeason.split('–')[1]);
  for (const day of [...h.dates, ...e.dates]) {
    if (!day.includes(String(expectedYear))) throw Error('Draw year rollover needs legal review');
  }
  const out = {
    deadline, applicationFeeUsd: h.applicationFeeUsd, permitFeeUsd: h.permitFeeUsd,
    hagermanPermits: h.permits, hagermanDates: h.dates,
    eastLakePermits: e.permits, eastLakeDates: e.dates
  };
  if (out.applicationFeeUsd < 1 || out.applicationFeeUsd > 50 || out.permitFeeUsd < 1 || out.permitFeeUsd > 500 || h.permits < 1 || e.permits < 1) throw Error('Unexpected TPWD amount');
  return out;
}
export function parseSurvey(html) {
  const txt = cleaned(html);
  requireMatch(txt, /Summer Turkey Survey Results/i, 'summer survey');
  requireMatch(txt, /Statewide Mandatory Wild Turkey Harvest Data/i, 'mandatory harvest provenance');
  const year = number(txt, /\b(20\d{2}) Summer Turkey Survey Results by Wildlife Region\b/, 'survey year');
  const poultsPerHen = number(txt, /\bTotal\s+[\d,]+\s+(\d+(?:\.\d+)?)\s+\d+(?:\.\d+)?\b/i, 'statewide poults per hen');
  if (!txt.includes(poultsPerHen + ' PPH')) throw Error('TPWD statewide survey table and narrative disagree');
  const trend = requireMatch(txt, /from\s+(\d+(?:\.\d+)?)\s+Wild Turkeys Per 1,000 miles in\s+(20\d{2})\s+to\s+(\d+(?:\.\d+)?)\s+Wild Turkeys Per 1,000 miles in\s+(20\d{2})/i, 'observation trend');
  const priorObservationsPerThousand = Number(trend[1]), priorYear = Number(trend[2]), observationsPerThousand = Number(trend[3]);
  if (Number(trend[4]) !== year || priorYear !== year - 1 || [poultsPerHen, priorObservationsPerThousand, observationsPerThousand].some(x => x <= 0 || x > 100)) throw Error('Unexpected official turkey survey year or figures');
  return {year, poultsPerHen, observationsPerThousand, priorYear, priorObservationsPerThousand};
}
export function updatedFacts(stored, draw, survey, today) {
  assert.deepEqual(stored.sources, officialSources, 'Source URLs altered; editorial approval required');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(today) || Number.isNaN(Date.parse(today))) throw Error('Invalid checkedAt date');
  if (survey.year < 2026 || survey.year > Number(today.slice(0, 4))) throw Error('Invalid survey reporting year');
  if (today < stored.checkedAt) throw Error('Refusing to backdate official-source review');
  return {...stored, checkedAt: today, draw, survey};
}
export async function run(args = process.argv.slice(2), fetcher = fetchTPWD) {
  const stored = JSON.parse(fs.readFileSync(factsFile, 'utf8'));
  assert.deepEqual(stored.sources, officialSources, 'Unexpected official-source configuration');
  const [c, h, e, s] = await Promise.all(Object.values(officialSources).map(url => fetcher(url)));
  const draw = parseDraw(c, h, e, stored.seasonYear);
  const survey = parseSurvey(s);
  const checked = updatedFacts(stored, draw, survey, new Date().toISOString().slice(0, 10));
  if (args.includes('--check-only')) {
    // Revalidate contents, not just a previously logged date, immediately before auto-merge.
    assert.deepEqual(checked.draw, stored.draw, 'Quarterly draw facts changed during protected verification');
    assert.deepEqual(checked.survey, stored.survey, 'Quarterly survey facts changed during protected verification');
    console.log('Quarterly TPWD data matches BOTH area/category records and current published source values.');
    return;
  }
  if (JSON.stringify(checked) === JSON.stringify(stored)) { console.log('Quarterly TPWD facts already checked today'); return; }
  fs.writeFileSync(factsFile, JSON.stringify(checked, null, 2) + '\n');
  console.log('Prepared verified TPWD drawn-hunt and summer-survey update; existing legal advice unchanged.');
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await run();
}
