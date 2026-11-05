// Guarded refresh of one specifically identified ESD's public local-rate record.
// No mutation of Comptroller imports, Supabase local supplements, or parcel calculators.
// Publication requires TWO primary sources: Austin CAD's rate table AND the district's
// signed yearly adoption resolution, with reconciled M&O and debt components.
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const RECORD_PATH = resolve('src/data/property/austin-county-esd3-adopted.json');
const normalize = (html) => String(html).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
  .replace(/<[^>]*>/g, ' ').replace(/&nbsp;|&#160;/gi, ' ')
  .replace(/&amp;/gi, '&').replace(/\s+/g, ' ').trim();

export function parseAustinCadRateTable(html) {
  const tables = String(html).match(/<table\b[\s\S]*?<\/table>/gi) ?? [];
  const matches = [];
  for (const table of tables) {
    const rows = table.match(/<tr\b[\s\S]*?<\/tr>/gi) ?? [];
    const values = rows.map((row) => [...row.matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((cell) => normalize(cell[1])));
    const header = values.find((cells) => cells.filter((cell) => /^20\d{2}$/.test(cell)).length >= 2);
    const unit = values.find((cells) => /^Austin County ESD\s*#?\s*3$/i.test(cells[0] ?? ''));
    if (!header || !unit || header.length !== unit.length) continue;
    for (let i = 1; i < header.length; i++) {
      if (!/^20\d{2}$/.test(header[i]) || !/^\$?\s*\.?\d+(?:\.\d+)?$/.test(unit[i])) continue;
      const year = Number(header[i]), rate = Number(unit[i].replace('$',''));
      if (year >= 2026 && year <= 2100 && Number.isFinite(rate) && rate > 0 && rate < 0.25) matches.push({ year, rate });
    }
  }
  const seen = new Map();
  for (const row of matches) {
    if (seen.has(row.year) && Math.abs(seen.get(row.year) - row.rate) > 0.0000001) throw new Error('Austin CAD table has conflicting ESD #3 rate rows for '+row.year);
    seen.set(row.year, row.rate);
  }
  if (!seen.size) throw new Error('Could not identify an official Austin County ESD #3 row with a year header');
  return [...seen].map(([year,rate])=>({year,rate})).sort((a,b)=>b.year-a.year);
}

export function parseDistrictResolutionUrl(html, year, baseUrl) {
  const rows = String(html).match(/<tr\b[\s\S]*?<\/tr>/gi) ?? [];
  for (const row of rows) {
    const columns = [...row.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map((m)=>m[1]);
    if (columns.length < 2 || normalize(columns[0]) !== String(year)) continue;
    const anchor = [...columns[1].matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
      .find((m)=>normalize(m[2])===String(year));
    if (!anchor) continue;
    const url = new URL(anchor[1].replace(/&amp;/g,'&'), baseUrl);
    if (url.protocol !== 'https:' || !['austincountyesd3.org','www.austincountyesd3.org'].includes(url.hostname) || !/\.pdf$/i.test(url.pathname)) {
      throw new Error('District resolution does not point to its official HTTPS PDF');
    }
    return url.href;
  }
  throw new Error('No year-specific signed district resolution link for '+year+'; retaining last verified record');
}

export function parseSignedResolution(text, year) {
  // pypdf sometimes separates a decorative first letter from the remainder:
  // "O n September" and "P ASSED AND APPROVED" in this official resolution.
  const normalized = String(text).replace(/\\s+/g,' ')
    .replace(/\\bO\\s+n (?=[A-Z][a-z]+\\s+\\d{1,2})/g, 'On ')
    .replace(/\\bP\\s+ASSED AND APPROVED\\b/g, 'PASSED AND APPROVED');
  if (!new RegExp('RESOLUTION\\s+ADOPTING\\s+THE\\s+'+year+'\\s+AD\\s+VALOREM', 'i').test(normalized)
    || !/AUSTIN\s+COUNTY\s+EMERGENCY\s+SERVICES\s+DISTRICT\s+NO\.?\s*3/i.test(normalized)) {
    throw new Error('Signed resolution does not identify the expected year and taxing district');
  }
  function component(label) {
    const m = label.exec(normalized);
    if (!m) throw new Error('Resolution component not found: '+label);
    const next = normalized.slice(m.index+m[0].length,m.index+m[0].length+85).match(/(?:\$\s*)?(0?\.\d{4,8})\s*\/\s*\$?\s*100/i);
    if (!next) throw new Error('Rate unreadable beside '+m[0]);
    return Number(next[1]);
  }
  const maintenanceOperationsRate = component(/Maintenance\s+and\s+Operation(?:s)?\s+Rate/i);
  const debtServiceRate = component(/Debt\s+Service\s+Rate/i);
  const totalRate = component(/Total\s+of\s+Adopted\s+Tax\s+Rates?/i);
  if (Math.abs(maintenanceOperationsRate+debtServiceRate-totalRate)>0.0000001) throw new Error('Signed resolution components do not add to the total');
  // The published PDF can extract its adoption date either as "On September
  // 21, 2026" or as "PASSED AND APPROVED this the 21st day of September 2026".
  // Require an adoption-context date, not an unrelated date elsewhere in PDF.
  const month = '(January|February|March|April|May|June|July|August|September|October|November|December)';
  const adoption = normalized.match(new RegExp('\\bOn\\s+'+month+'\\s+(\\d{1,2}),?\\s*'+year+'\\b','i'));
  const approved = normalized.match(new RegExp('PASSED\\s+AND\\s+APPROVED[^.]{0,100}?\\b(\\d{1,2})(?:st|nd|rd|th)?\\s+day\\s+of\\s+'+month+'\\s*,?\\s*'+year+'\\b','i'));
  if (!adoption && !approved) throw new Error('No verifiable adoption date in the signed '+year+' ESD resolution');
  const dateString = adoption ? adoption[1]+' '+adoption[2]+', '+year : approved[2]+' '+approved[1]+', '+year;
  const ms = Date.parse(dateString);
  if (!Number.isFinite(ms) || new Date(ms).getUTCFullYear() !== year) throw new Error('Invalid adoption date');
  return {totalRate,maintenanceOperationsRate,debtServiceRate,adoptedOn:new Date(ms).toISOString().slice(0,10)};
}

async function get(url, pdf=false) {
  const response = await fetch(url,{headers:{'User-Agent':'TexasDefined-local-tax-verifier/1.0 (+https://texasdefined.com/sourcing)'} ,signal:AbortSignal.timeout(20000)});
  if (!response.ok) throw new Error('Official source unavailable: '+new URL(url).hostname+' HTTP '+response.status);
  return pdf ? new Uint8Array(await response.arrayBuffer()) : await response.text();
}

async function pdfToText(buffer) {
  if (Buffer.from(buffer).subarray(0,4).toString() !== '%PDF') throw new Error('Official resolution did not return a PDF');
  const folder = await mkdtemp(join(tmpdir(),'esd3-resolution-'));
  const path = join(folder,'resolution.pdf');
  try {
    await writeFile(path,buffer);
    return execFileSync('python3',['-c','import sys; from pypdf import PdfReader; print("\\n".join(page.extract_text() or "" for page in PdfReader(sys.argv[1]).pages))',path],{encoding:'utf8',timeout:15000});
  } finally {await rm(folder,{recursive:true,force:true});}
}

export async function refresh() {
  const original = await readFile(RECORD_PATH,'utf8');
  const data = JSON.parse(original);
  if (data.unitSlug !== 'austin-county-esd-3' || !Array.isArray(data.rates) || !data.rates.length) throw new Error('Unexpected local data identity or empty evidence history');
  const cad = parseAustinCadRateTable(await get(data.sourceRateTable));
  const current = cad[0];
  const newestStored = data.rates.at(-1);
  if (current.year < newestStored.year) throw new Error('Austin CAD no longer publishes the latest previously verified rate year');
  if (current.year > new Date().getUTCFullYear()) throw new Error('Unexpected future tax year on CAD table');
  for (const stored of data.rates) {
    const comparable = cad.find((row)=>row.year===stored.year);
    if (comparable && Math.abs(comparable.rate-stored.totalRate)>0.0000001) {
      throw new Error('Austin CAD revised previously verified '+stored.year+' rate; keep prior verified record pending source reconciliation');
    }
  }
  const resolutionUrl = parseDistrictResolutionUrl(await get(data.sourceResolutionIndex),current.year,data.sourceResolutionIndex);
  const signed = parseSignedResolution(await pdfToText(await get(resolutionUrl,true)),current.year);
  if (Math.abs(signed.totalRate-current.rate)>0.0000001) throw new Error('Austin CAD and signed district resolution disagree on '+current.year+' rate');
  const existing = data.rates.find((item)=>item.year===current.year);
  if (existing) {
    for (const key of ['totalRate','maintenanceOperationsRate','debtServiceRate']) {
      if (Math.abs(existing[key]-signed[key])>0.0000001) throw new Error('Changed official '+current.year+' '+key+'; manual source reconciliation required');
    }
    if (existing.adoptedOn!==signed.adoptedOn) throw new Error('Official adoption date changed; retain historical evidence pending review');
    if (existing.resolutionUrl!==resolutionUrl) throw new Error('Resolution URL changed; verify document migration before updating evidence record');
    console.log(current.year+': independent Austin CAD and signed district sources agree; no publication change');
    return false;
  }
  if (current.year!==newestStored.year+1) throw new Error('Nonconsecutive new tax year; refuse automatic backfill');
  data.rates.push({...signed,year:current.year,verifiedOn:new Date().toISOString().slice(0,10),sourceAgency:'Austin County Appraisal District; Austin County ESD #3',resolutionUrl});
  await writeFile(RECORD_PATH,JSON.stringify(data,null,2)+'\n');
  console.log('Verified and added newly published local adopted rate for '+current.year+'; ready for review/CI');
  return true;
}

if (process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  refresh().catch((error)=>{console.error('::error::ESD #3 official local rate verification failed: '+error.message);process.exitCode=1;});
}
