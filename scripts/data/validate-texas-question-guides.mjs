import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';

const read = (path) => readFileSync(path, 'utf8');
const slugs = ['texas-jobs-without-four-year-degree','texas-career-training-options','texas-cities-nature-jobs'];
const routes = new Map(slugs.map(slug => [slug, {
  source: read('src/routes/' + slug + '.tsx'),
  body: read('src/routes/' + slug + '.lazy.tsx'),
}]));
const publicRoutes = read('src/lib/public-routes.ts');
const sitemap = read('src/routes/sitemap[.]xml.ts');
const moving = read('src/routes/moving-to-texas.lazy.tsx');
const industries = read('src/routes/texas-industries.lazy.tsx');
const resources = read('src/routes/texas-resources.lazy.tsx');

for (const [slug,{source,body}] of routes) {
  const path = '/' + slug;
  assert(source.includes('createFileRoute("' + path + '")'), slug + ': literal metadata route missing');
  assert(source.includes('canonicalLink(texasDefinedBrand, path)'), slug + ': canonical missing');
  assert(source.includes('"@type": "BreadcrumbList"'), slug + ': breadcrumb LD missing');
  assert(source.includes('"@type": "Article"'), slug + ': article LD missing');
  assert(source.includes('dateModified: "2026-11-10"'), slug + ': publication provenance missing');
  assert(body.includes('createLazyFileRoute("' + path + '")'), slug + ': lazy route missing or mismatched');
  assert(body.includes('<h1'), slug + ': visible H1 missing');
  assert(body.includes('November 10, 2026'), slug + ': dated source review missing');
  assert((body.match(/<h1\b/g) || []).length === 1, slug + ': multiple H1s');
  assert(body.length > 8000, slug + ': not enough research-backed practical depth');
  const linked = [...body.matchAll(/(?:\bto|href)="(\/[^"#?]+)"/g)].map(match => match[1]);
  assert(new Set(linked).size >= 4, slug + ': fewer than four relevant internal navigation links');
  for(const href of linked) {
    const pathName = href.slice(1);
    const suffix = pathName.replace(/\//g,'.');
    const known = [
      publicRoutes.includes('"' + href + '"'),
      existsSync('src/routes/' + pathName + '.tsx'),
      existsSync('src/routes/' + suffix + '.tsx'),
      existsSync('src/routes/' + suffix + '.lazy.tsx'),
      slugs.includes(pathName),
      href === '/explore/state-parks' && existsSync('src/routes/explore.$category.tsx'),
    ].some(Boolean);
    assert(known, slug + ': unknown linked route ' + href);
  }
  assert(publicRoutes.includes('"' + path + '"'), slug + ': missing indexable static allowlist path');
  assert(sitemap.includes('"' + path + '": "2026-11-10"'), slug + ': sitemap lastmod not aligned to actual content');
  assert(moving.includes('"' + path + '"'), slug + ': no reciprocal moving-to-texas hub link');
  assert(resources.includes("'" + path + "'"), slug + ': no reciprocal Texas resources hub link');
  assert(/https:\/\/(?:www\.)?(?:bls\.gov|twc\.texas\.gov|tdlr\.texas\.gov|tpwd\.texas\.gov|apprenticeship\.gov|tsbpe\.texas\.gov|lmi\.twc\.texas\.gov)/.test(body), slug + ': official sources not represented');
  assert(!/guaranteed rank|guaranteed (job|funding)|#1 ranked city/i.test(body), slug + ': unsupported promises');
  console.log('PASS ' + path + ' — substantial original source-led content, canonical, dated sources, cross-links');
}
assert(industries.includes('/texas-jobs-without-four-year-degree'), 'Industry hub missing non-degree career link');
assert(industries.includes('/texas-career-training-options'), 'Industry hub missing career training link');

const jobs = routes.get('texas-jobs-without-four-year-degree').body;
const nature = routes.get('texas-cities-nature-jobs').body;
const training = routes.get('texas-career-training-options').body;
for (const value of ['27.41','30.38','24.26','14.70','27.03','29.86','24.17','15.74','27.53','29.54','21.90','16.50','25.94','28.18','21.23','15.02']) {
  assert(jobs.includes(value), 'Missing official May 2025 BLS wage datum ' + value);
}
for (const value of ['35.85','33.96','32.51','29.39','6.46']) {
  assert(nature.includes(value), 'Missing verified May 2025 BLS all occupation wage/comparison ' + value);
}
assert((nature.match(/tpwd\.texas\.gov\/state-parks\/nearby/g) || []).length === 4, 'Nature page missing one or more TPWD regional sources');
assert((jobs.match(/bls\.gov\/regions\/southwest\/news-release/g) || []).length === 4, 'Jobs page missing one or more May 2025 metro releases');
for (const agency of ['twc.texas.gov','apprenticeship.gov','tdlr.texas.gov','tsbpe.texas.gov']) {
  assert(training.includes(agency), 'Training page must cite agency ' + agency);
}
assert(/not universally free|not a blanket tuition waiver/.test(training), 'Training must not promise funding to all applicants');
assert(/not a measure of walkability|not a geospatial travel-time study|not a drive-time measure/.test(nature), 'Nature must not invent travel times');
console.log('PASS facts — BLS source datum regression checks, official TPWD/TWC/Apprenticeship/licensing citations and limitations');
