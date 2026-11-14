import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const factsPath = 'src/data/generated/texas-reference-facts-current.json';
const registryPath = 'src/data/texas-data-center.ts';
const officialSources = {
  homestead: 'https://comptroller.texas.gov/taxes/property-tax/exemptions/',
  txdot: 'https://www.txdot.gov/data-maps/traffic-count-maps.html',
};

function plain(html) {
  return html.replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(?:nbsp|#160);/gi, ' ')
    .replace(/&(?:dollar|#36);/gi, '$')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ').trim();
}

function uniqueNumber(matches, context) {
  const values = [...new Set(matches.map(match => Number(match[1].replaceAll(',', ''))))];
  if (values.length !== 1 || !Number.isInteger(values[0])) {
    throw new Error('Official ' + context + ' threshold was missing, contradictory or malformed');
  }
  return values[0];
}

export function parseOfficialFacts(homesteadHtml, trafficHtml) {
  const homesteadText = plain(homesteadHtml);
  const trafficText = plain(trafficHtml);
  const homestead = uniqueNumber(
    [...homesteadText.matchAll(/11\.13\(b\)[^.]{0,220}?requires school districts to provide a \$([\d,]+)\s+exemption/gi)],
    'school homestead exemption',
  );
  const shortTerm = uniqueNumber(
    [...trafficText.matchAll(/over\s+([\d,]+)\s+short-term traffic counts each year/gi)],
    'short-term traffic counts',
  );
  const stations = uniqueNumber(
    [...trafficText.matchAll(/over\s+([\d,]+)\s+continuous traffic count stations/gi)],
    'continuous traffic stations',
  );
  if (homestead < 25000 || homestead > 1000000 || homestead % 1000 !== 0 ||
      shortTerm < 25000 || shortTerm > 1000000 || stations < 100 || stations > 10000) {
    throw new Error('Official reference facts outside conservative safety bounds');
  }
  return { homestead, shortTerm, stations };
}

function guardChange(next, before, title) {
  if (!Number.isInteger(before) || before <= 0 ||
      next < before / 2 || next > before * 2) {
    throw new Error('Unusually large ' + title + ' change requires source investigation');
  }
}

function replaceSitemapDate(source, slug, date) {
  const needle = "{ slug: '" + slug + "', updated: '";
  const offset = source.indexOf(needle);
  if (offset < 0 || source.indexOf(needle, offset + 1) >= 0) {
    throw new Error('Missing or duplicate sitemap registry slug: ' + slug);
  }
  const end = source.indexOf("'", offset + needle.length);
  if (end < 0 || !/^\d{4}-\d{2}-\d{2}$/.test(source.slice(offset + needle.length, end))) {
    throw new Error('Malformed sitemap date for ' + slug);
  }
  return source.slice(0, offset + needle.length) + date + source.slice(end);
}

async function loadHtml(url) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(25000),
    headers: { accept: 'text/html' },
  });
  if (!response.ok) throw new Error('Official government reference source returned HTTP ' + response.status + ': ' + url);
  const body = await response.text();
  if (body.length < 1000) throw new Error('Official source unexpectedly short: ' + url);
  return body;
}

export async function refresh({
  fetchHtml = loadHtml,
  read = file => fs.readFile(file, 'utf8'),
  write = (file, body) => fs.writeFile(file, body),
  checkedAt = new Date().toISOString().slice(0, 10),
} = {}) {
  const previous = JSON.parse(await read(factsPath));
  if (previous.homestead?.sourceUrl !== officialSources.homestead ||
      previous.txdot?.sourceUrl !== officialSources.txdot ||
      !/^\d{4}-\d{2}-\d{2}$/.test(checkedAt)) throw new Error('Reference facts provenance malformed');

  const [homesteadHtml, trafficHtml] = await Promise.all([
    fetchHtml(officialSources.homestead), fetchHtml(officialSources.txdot),
  ]);
  const facts = parseOfficialFacts(homesteadHtml, trafficHtml);
  guardChange(facts.homestead, previous.homestead.generalSchoolUsd, 'homestead exemption');
  guardChange(facts.shortTerm, previous.txdot.shortTermCountsLowerBound, 'traffic count');
  guardChange(facts.stations, previous.txdot.continuousStationsLowerBound, 'traffic station');

  const homesteadChanged = facts.homestead !== previous.homestead.generalSchoolUsd;
  const trafficChanged = facts.shortTerm !== previous.txdot.shortTermCountsLowerBound ||
    facts.stations !== previous.txdot.continuousStationsLowerBound;
  if (!homesteadChanged && !trafficChanged) {
    console.log('Texas reference facts checked against both government sources; no change.');
    return false;
  }
  const registry = await read(registryPath);
  let nextRegistry = registry;
  if (homesteadChanged) nextRegistry = replaceSitemapDate(nextRegistry, 'homestead-exemption-history', checkedAt);
  if (trafficChanged) nextRegistry = replaceSitemapDate(nextRegistry, 'texas-traffic-monitoring-coverage', checkedAt);
  const next = {
    verifiedAt: checkedAt,
    homestead: { ...previous.homestead, generalSchoolUsd: facts.homestead },
    txdot: {
      ...previous.txdot,
      shortTermCountsLowerBound: facts.shortTerm,
      continuousStationsLowerBound: facts.stations,
    },
  };
  // Publish only after parsing both independent authorities and validating all limits.
  await write(factsPath, JSON.stringify(next, null, 2) + '\n');
  await write(registryPath, nextRegistry);
  console.log('Verified government reference facts changed; generated data ready for protected PR.');
  return true;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  refresh().catch(error => { console.error(error); process.exitCode = 1; });
}
