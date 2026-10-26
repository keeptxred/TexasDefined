import fs from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const OUTPUT = 'src/data/generated/tdi-homeowners-current.json';
const SOURCE = 'https://www.tdi.texas.gov/general/texas-homeowners-insurance-market-overview.html';

export function extractTdiRows(html) {
  if (!/Texas homeowners insurance market overview/i.test(html) ||
      !/Texas Statistical Plan for Residential Risks/i.test(html) ||
      !/Types of policies:\s*Homeowners/i.test(html.replace(/<[^>]+>/g, ' '))) {
    throw new Error('Official TDI page/coverage definition missing');
  }
  const imgTags = [...html.matchAll(/<img\b[^>]*>/gi)].map(m => m[0]);
  function chart(label) {
    const matches = imgTags.map(tag => tag.match(/\balt=(["'])([\s\S]*?)\1/i)?.[2] ?? '')
      .filter(alt => alt.toLowerCase().includes(label.toLowerCase()));
    if (matches.length !== 1) throw new Error('Expected exactly one official TDI ' + label + ' chart');
    const result = [...matches[0].matchAll(/\b(20\d{2})\s*\$\s*([\d,]+)/g)]
      .map(m => [Number(m[1]), Number(m[2].replaceAll(',', ''))]);
    if (result.length < 10 || result.some(([year, value]) => !Number.isInteger(value) || value <= 0)) {
      throw new Error('TDI chart annual observations missing/invalid: ' + label);
    }
    const map = new Map(result);
    if (map.size !== result.length || result[0][0] !== 2016 ||
        result.some(([year], i) => year !== 2016 + i)) {
      throw new Error('TDI chart annual series not continuous since 2016: ' + label);
    }
    return map;
  }
  const premium = chart('Chart showing average home insurance premium');
  const coverage = chart('Chart showing average home coverage');
  if (premium.size !== coverage.size ||
      [...premium.keys()].some(year => !coverage.has(year))) {
    throw new Error('TDI homeowners premium and coverage years differ');
  }
  return [...premium].map(([year, value]) => ({
    year, premium: value, coverage: coverage.get(year),
  }));
}

export function validateTdiSeries(rows, previous, checkedAt) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(checkedAt) ||
      Number.isNaN(Date.parse(checkedAt + 'T00:00:00Z'))) throw new Error('Invalid TDI verification date');
  const years = rows.map(r => r.year);
  if (rows.length < 10 || rows.length > previous.rows.length + 1 ||
      years[0] !== 2016 || years.at(-1) < previous.sourceYear ||
      years.at(-1) > new Date(checkedAt + 'T00:00:00Z').getUTCFullYear() ||
      years.some((year, i) => year !== i + 2016)) throw new Error('TDI source vintage changed unexpectedly');
  for (const r of rows) {
    if (!Number.isInteger(r.premium) || !Number.isInteger(r.coverage) ||
        r.premium < 500 || r.premium > 100_000 || r.coverage < 100_000 || r.coverage > 5_000_000) {
      throw new Error('TDI reported implausible annual premium or coverage: ' + r.year);
    }
    const old = previous.rows.find(row => row.year === r.year);
    if (old && (Math.abs(r.premium - old.premium) / old.premium > 0.35 ||
       Math.abs(r.coverage - old.coverage) / old.coverage > 0.35)) {
      throw new Error('TDI revision beyond unattended safety bound: ' + r.year);
    }
  }
}
export async function refresh({ fetchHtml = async () => {
  const response = await fetch(SOURCE, { signal: AbortSignal.timeout(25_000), headers: { accept: 'text/html' } });
  if (response.status !== 200) throw new Error('TDI official source HTTP ' + response.status);
  return response.text();
}, read = p => fs.readFile(p, 'utf8'), write = (p, data) => fs.writeFile(p, data),
checkedAt = new Date().toISOString().slice(0, 10) } = {}) {
  const previous = JSON.parse(await read(OUTPUT));
  if (previous.sourceUrl !== SOURCE) throw new Error('Untrusted previous TDI source URL');
  const rows = extractTdiRows(await fetchHtml());
  validateTdiSeries(rows, previous, checkedAt);
  const preserved = rows.map(r => ({
    ...r,
    // A missing finality label does not establish that a preliminary estimate
    // has become final. Preserve prior flags and conservatively mark new years.
    preliminary: previous.rows.find(old => old.year === r.year)?.preliminary ?? true,
  }));
  const same = preserved.length === previous.rows.length &&
    preserved.every((r, i) => JSON.stringify(r) === JSON.stringify(previous.rows[i]));
  if (same) {
    console.log('Official TDI premiums and coverage verified unchanged through ' + previous.sourceYear);
    return false;
  }
  const next = { sourceUrl: SOURCE, verifiedAt: checkedAt,
    sourceYear: rows.at(-1).year, rows: preserved };
  await write(OUTPUT, JSON.stringify(next, null, 2) + '\n');
  console.log('Updated TDI premium/coverage verified rolling series through ' + next.sourceYear);
  return true;
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  refresh().catch(error => { console.error(error); process.exitCode = 1; });
}
