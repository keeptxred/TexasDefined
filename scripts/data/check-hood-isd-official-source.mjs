import { readFileSync } from 'node:fs';

const evidence = JSON.parse(readFileSync(new URL('../../src/data/property/hood-cad-isd-adopted.json', import.meta.url), 'utf8'));
const url = evidence.sourceUrl;
const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(20000), headers: { 'user-agent': 'TexasDefined-ISD-Authority-Source-Check/1.0' } });
if (!response.ok) throw new Error(`Hood CAD source returned HTTP ${response.status}`);
const html = await response.text();
function plain(value) {
  return value.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, ' ').replace(/&nbsp;|&#160;/gi, ' ').replace(/&amp;/gi, '&').replace(/\s+/g, ' ').trim();
}
function tableRows(table) {
  return [...table.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map((m) =>
    [...m[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((cell) => plain(cell[1])));
}
const tables = [...html.matchAll(/<table\b[^>]*>[\s\S]*?<\/table>/gi)];
const rows = tables.map((t) => tableRows(t[0])).find((table) =>
  table.some((row) => row.includes('Tolar ISD') && row.includes('Granbury ISD')) &&
  table.some((row) => row[0] === 'Adopted Rate'));
if (!rows) throw new Error('Could not safely parse the newest school-district rate table; inspect the official Hood CAD source');
const heading = rows.find((row) => row.includes('Tolar ISD') && row.includes('Granbury ISD'));
const adopted = rows.find((row) => row[0] === 'Adopted Rate');
const mo = rows.find((row) => row[0] === 'M&O Rate');
const debt = rows.find((row) => row[0] === 'Debt Rate');
if (!heading || !adopted || !mo || !debt) throw new Error('Hood CAD rate table is missing a required official row');
const issues = [];
for (const [slug, expected] of Object.entries(evidence.districts)) {
  const col = heading.indexOf(expected.name);
  if (col < 0) { issues.push(`${slug}: district column missing`); continue; }
  const columns = [adopted, mo, debt];
  const expectedRates = [expected.totalRate, expected.maintenanceOperationsRate, expected.debtServiceRate];
  columns.forEach((row, index) => {
    const observed = Number(row[col]?.replace(/[$,]/g, ''));
    if (!Number.isFinite(observed) || Math.abs(observed - expectedRates[index]) > 0.000002) {
      issues.push(`${slug}: ${['total', 'M&O', 'debt'][index]} changed or shifted (observed ${row[col] ?? 'missing'}, tracked ${expectedRates[index]})`);
    }
  });
}
if (issues.length) throw new Error(`Official adopted-rate change requires a verified source update:\n${issues.join('\n')}`);
console.log(`Verified ${Object.keys(evidence.districts).length} adopted ISD records against ${url} on ${new Date().toISOString()}. No automatic source override.`);
