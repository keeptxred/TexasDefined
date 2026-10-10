import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const root = process.cwd();
const read = p => readFileSync(join(root, p), 'utf8');
const registry = JSON.parse(read('docs/football-authority/REGISTRY.json'));
const editorial = read('src/data/high-school-football/program-editorial.ts');
const roster = ['arp','aspermont','athens','atlanta','aubrey','austin','austin-achieve','austin-akins','austin-anderson','austin-bowie','austin-crockett','austin-eastside','austin-johnson','austin-lake-travis','austin-lasa','austin-mccallum','austin-navarro','austin-northeast','austin-travis','austin-vandegrift','austin-westlake','avalon','axtell','azle','baird'];
const problems = [];
const check = (ok, reason) => { if (!ok) problems.push(reason); };
const active = registry.batch;
const batch = active?.number === 4 ? active : registry.completedBatches?.find(b => b.number === 4);
check(Boolean(batch), 'Batch 004 missing from active/completed registry');
check(JSON.stringify(batch?.slugs) === JSON.stringify(roster), 'Batch 004 roster/order corrupted');
check(registry.counts?.total === 1292, 'school registry total changed');
check(new Set(roster).size === 25, 'Batch 004 duplicate schools');
const records = registry.schoolRecords ?? [];
for (const slug of roster) {
  const matches = records.filter(x => x.slug === slug);
  check(matches.length === 1, slug + ': registry missing or duplicate');
  const item = matches[0];
  check(item?.batch === 4, slug + ': wrong batch');
  check(['IMPLEMENTED','MERGED','DEPLOYED','NEEDS_FOLLOWUP','BLOCKED','VERIFIED'].includes(item?.status), slug + ': unexpected status');
  check(new RegExp('^  "' + slug + '": \\{', 'm').test(editorial), slug + ': missing editorial profile');
  const audit = 'docs/football-authority/schools/' + slug + '.md';
  check(existsSync(join(root,audit)), slug + ': individual audit missing');
  if (existsSync(join(root,audit))) {
    const body = read(audit);
    check(body.length >= 360, slug + ': audit too short');
    check(/https:\/\//.test(body), slug + ': audit without source');
  }
  if (item?.status === 'VERIFIED') {
    check(item.actualProductionVerified === true, slug + ': VERIFIED without live check');
    check(Boolean(item.productionVerifiedAt), slug + ': VERIFIED without timestamp');
    check(Boolean(item.deployment?.dedicatedBrowserRunId), slug + ': VERIFIED without Chrome workflow run');
    check(Boolean(item.deployment?.screenshotArtifactId), slug + ': VERIFIED without screenshot evidence');
  }
}
// Structural reciprocal-link checks only; deployed rendering needs independent browser QA.
const countyRoute = read('src/routes/$kind.$slug.lazy.tsx');
const footballRoute = read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
const inbound = countyRoute.split('const batch002FootballCountyLinks:')[1]?.split('const siteUrl')[0] ?? '';
const outbound = footballRoute.split('const researchedCampusCounty:')[1]?.split('const batch002CityGuide:')[0] ?? '';
const evidence = read('docs/football-authority/BATCH004_CAMPUS_LINK_EVIDENCE.md');
const linked = { arp:'smith', aspermont:'stonewall', athens:'henderson', atlanta:'cass', aubrey:'denton', 'austin-vandegrift':'travis', avalon:'ellis', axtell:'mclennan', baird:'callahan', 'austin':'travis', 'austin-achieve':'travis', 'austin-akins':'travis', 'austin-anderson':'travis', 'austin-bowie':'travis', 'austin-crockett':'travis', 'austin-eastside':'travis', 'austin-johnson':'travis', 'austin-lake-travis':'travis', 'austin-lasa':'travis', 'austin-mccallum':'travis', 'austin-navarro':'travis', 'austin-northeast':'travis', 'austin-travis':'travis', 'austin-westlake':'travis', azle:'tarrant' };
for (const [slug, county] of Object.entries(linked)) {
  const rec = records.find(x => x.slug === slug);
  check(Boolean(rec?.inboundLinks?.includes('/county/' + county)), slug + ': registry inbound county missing');
  check(outbound.includes("'" + slug + "': '" + county + "'") || outbound.includes(slug + ": '" + county + "'"), slug + ': football page missing outbound county');
  check(inbound.includes("slug: '" + slug + "'"), slug + ': county index missing school card');
  check(evidence.includes('`' + slug + '`'), slug + ': documented campus evidence missing');
}
// Parse only the 25 individually authored JSON-style editorial records.
// Every entry must have its own substantive summary, distinct SEO, and school-specific FAQ.
const titles = new Set();
for (const slug of roster) {
  const marker = '  "' + slug + '": ';
  const start = editorial.indexOf(marker);
  if (start < 0) continue;
  const next = editorial.indexOf('\n  "', start + marker.length);
  check(next > start, slug + ': cannot isolate editorial record');
  if (next <= start) continue;
  let obj;
  try {
    const raw = editorial.slice(start + marker.length, next).trim().replace(/,$/, '');
    obj = JSON.parse(raw);
  } catch (error) {
    check(false, slug + ': cannot parse authored editorial record as JSON: ' + error.message);
    continue;
  }
  check(obj.slug === slug, slug + ': editorial slug mismatch');
  check(obj.seo?.title?.length >= 35, slug + ': short SEO title');
  check(obj.seo?.description?.length >= 75, slug + ': thin SEO description');
  check(!titles.has(obj.seo?.title), slug + ': reused SEO title');
  titles.add(obj.seo?.title);
  check(Array.isArray(obj.overview) && obj.overview.length >= 2 &&
        obj.overview.some(x => x.length >= 110), slug + ': thin editorial overview');
  check(Array.isArray(obj.faq) && obj.faq.length >= 2, slug + ': missing individual FAQ');
  check(Array.isArray(obj.milestones) && obj.milestones.length >= 1,
        slug + ': school-specific milestone missing');
  check(Boolean(obj.development?.body && obj.development.body.length >= 140),
        slug + ': insufficient program-specific development');
  for (const source of [obj.development, obj.schedule, obj.coach, obj.campus, ...(obj.milestones ?? [])]) {
    if (source) check(/^https:\/\//.test(source.sourceUrl ?? ''), slug + ': unsafe/missing source URL');
  }
  if (obj.photo) {
    check(/^https:\/\//.test(obj.photo.sourceUrl ?? ''), slug + ': photo needs verifiable source');
    check(Boolean(obj.photo.license && obj.photo.licenseUrl), slug + ': no photo reuse license evidence');
  }
}
const prior = records.filter(r => r.status === 'VERIFIED' && r.batch !== 4);
check(prior.length >= 55, 'Previously VERIFIED school count regressed below 55');
check((batch?.individuallyVerified ?? -1) === records.filter(r => r.batch === 4 && r.status === 'VERIFIED').length, 'Batch 004 count inconsistent');
if (problems.length) {
  console.error('Batch 004 structural pre-acceptance FAIL:\n' + problems.map(s => '- ' + s).join('\n'));
  process.exitCode = 1;
} else {
  console.log('Batch 004 structural pre-acceptance PASS: 25 registry entries, individual dossiers, editorial objects, previous 55 VERIFIED preserved.');
  console.log('NOT production acceptance: real sources, license, internal links, mobile/browser, deployment and screenshots require separate proof.');
}
