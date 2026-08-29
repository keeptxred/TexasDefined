import fs from 'node:fs/promises';

const read = (path) => fs.readFile(path, 'utf8');
const [policies, history, articleBody, articleRoute, rodeoArticle, footballArticle, landings, sportsRoute] = await Promise.all([
  read('src/platform/internal-link-policies.ts'),
  read('src/platform/internal-link-policy-history.ts'),
  read('src/components/editorial/ArticleBody.tsx'),
  read('src/routes/article.$slug.tsx'),
  read('src/data/fixtures/rodeo-101.ts'),
  read('src/data/fixtures/high-school-football-newcomers.ts'),
  read('src/data/sports-venue-landings.ts'),
  read('src/routes/sports.tsx'),
]);

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

assert(policies.includes("INTERNAL_LINK_POLICY_VERSION = '2.1.0'"), 'Sports editorial authority release must be governed by internal-link policy 2.1.0.');
assert(policies.includes("INTERNAL_LINK_POLICY_REVIEWED_AT = '2026-08-14'"), 'Sports editorial authority policy review date must be recorded.');
assert(policies.includes("'fair','sports-venue'"), 'Article internal-link policy must prefer verified sports-venue entities.');
assert(policies.includes("pageBudget: 14, blockBudget: 4"), 'Article sports-venue preference must not widen the existing article link budgets.');
assert(history.includes("version: '2.1.0'"), 'Internal-link history must preserve release 2.1.0.');
assert(history.includes("changeType: 'minor'"), 'Sports-venue article preference must remain a minor governed policy release.');
assert(history.includes("fingerprint: 'fnv1a-174e941d'"), 'Internal-link release 2.1.0 immutable fingerprint is missing or changed.');
assert(history.includes("Current governed policies differ from release ${current.version}"), 'Policy history must validate the active policy against the current immutable release generically.');

assert(articleBody.includes("<AutoEntityLinks text={text} entities={candidates}"), 'Article body must continue to use governed contextual entity linking.');
assert(articleBody.includes("policyForSurface('article')"), 'Article entity links must continue to use the governed article policy.');
assert(articleRoute.includes('<ArticleBody blocks={article.body} entities={graph} />'), 'Article route must supply the verified knowledge graph to contextual body linking.');

for (const marker of [
  'const description = "Texas sports guide to high school and college football, pro teams, major stadiums, rodeo, motorsports and game-day traditions across the state.";',
  'const seoTitle = "Texas Sports: Football, Stadiums, Teams, Rodeo & Traditions";',
  'canonicalPath: "/sports"',
  'title: seoTitle',
  'description,',
  'buildMeta(texasDefinedBrand, { title: seoTitle, description, canonicalPath: "/sports" })',
]) {
  assert(sportsRoute.includes(marker), `Sports GSC metadata contract missing: ${marker}`);
}

const rodeoPath = '/sports-venues/rodeo-western';
const footballPath = '/sports-venues/high-school-football';
assert(rodeoArticle.includes(`href:\"${rodeoPath}\"`), 'Rodeo evergreen guide must link to the relevant verified Western-sports venue collection.');
assert(footballArticle.includes(`href:\"${footballPath}\"`), 'High-school football evergreen guide must link to the relevant verified stadium collection.');
assert(landings.includes("slug: 'rodeo-western'"), 'Rodeo editorial link target must remain a registered sports-venue landing.');
assert(landings.includes("slug: 'high-school-football'"), 'High-school football editorial link target must remain a registered sports-venue landing.');

for (const source of [rodeoArticle, footballArticle]) {
  assert(!source.includes('Sponsored'), 'Editorial sports authority links must not be presented as sponsored placements.');
  assert(!source.includes('sponsor'), 'Editorial sports authority links must remain independent from sponsor logic.');
}

if (errors.length) {
  console.error('Sports editorial authority validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('Sports editorial authority validated: GSC-focused statewide sports metadata, governed article linking, verified venue collections, unchanged link budgets, and editorial/sponsorship separation are protected.');
