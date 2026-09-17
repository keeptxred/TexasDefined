import fs from 'node:fs';

const ORIGIN = 'https://texasdefined.com';
const SNAPSHOT = 'ops/seo/gsc-discovered-2026-09-13.json';
const snapshot = JSON.parse(fs.readFileSync(SNAPSHOT, 'utf8'));
const submitted = snapshot?.manualSubmission?.['submittedOn2026-09-13'] ?? [];
const nextBatch = snapshot?.manualSubmission?.nextBatch ?? [];
const cohort = [...new Set([...submitted, ...nextBatch])];

if (submitted.length !== 10 || nextBatch.length !== 10 || cohort.length !== 20) {
  throw new Error(`Expected 10 submitted + 10 next-batch unique URLs; found ${submitted.length} + ${nextBatch.length}, ${cohort.length} unique.`);
}

const fetchText = async (url) => {
  const response = await fetch(url, {
    headers: { 'user-agent': 'TexasDefined-GSC-Priority-Cohort/1.0' },
    redirect: 'follow',
  });
  return { response, text: await response.text() };
};

const [primary, explore] = await Promise.all([
  fetchText(`${ORIGIN}/sitemap.xml`),
  fetchText(`${ORIGIN}/sitemap-explore.xml`),
]);
for (const [name, result] of [['primary', primary], ['explore', explore]]) {
  if (!result.response.ok) throw new Error(`${name} sitemap returned ${result.response.status}.`);
}

const failures = [];
const rows = [];
for (const path of cohort) {
  const url = `${ORIGIN}${path}`;
  const expectedSitemap = path.startsWith('/explore/') || path.startsWith('/destination/') ? explore.text : primary.text;
  const sitemapPresent = expectedSitemap.includes(`<loc>${url}</loc>`);
  let status = 0;
  let canonical = false;
  let noindex = false;
  let htmlBytes = 0;
  let error = '';
  try {
    const { response, text } = await fetchText(url);
    status = response.status;
    htmlBytes = Buffer.byteLength(text);
    const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    canonical = new RegExp(`<link[^>]+rel=["']canonical["'][^>]+href=["']${escaped}["']`, 'i').test(text)
      || new RegExp(`<link[^>]+href=["']${escaped}["'][^>]+rel=["']canonical["']`, 'i').test(text);
    noindex = /<meta[^>]+(?:name|property)=["']robots["'][^>]+content=["'][^"']*noindex/i.test(text)
      || /<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]+(?:name|property)=["']robots["']/i.test(text);
  } catch (caught) {
    error = caught instanceof Error ? caught.message : String(caught);
  }

  const ok = status === 200 && sitemapPresent && canonical && !noindex;
  rows.push({ path, status, sitemapPresent, canonical, noindex, htmlBytes, ok, error });
  if (!ok) failures.push(`${path}: status=${status} sitemap=${sitemapPresent} canonical=${canonical} noindex=${noindex}${error ? ` error=${error}` : ''}`);
}

console.table(rows);
console.log(`GSC priority cohort: ${rows.filter((row) => row.ok).length}/${rows.length} production-ready.`);
if (failures.length) {
  console.error('GSC priority cohort failures:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
