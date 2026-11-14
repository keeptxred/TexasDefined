import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const eagerRoute = read('src/routes/index.tsx');
const lazyRoutePath = path.join(root, 'src/routes/index.lazy.tsx');
const lazyRoute = fs.existsSync(lazyRoutePath) ? fs.readFileSync(lazyRoutePath, 'utf8') : '';
const route = `${eagerRoute}\n${lazyRoute}`;
const featureHero = read('src/components/editorial/FeatureHero.tsx');
const homepageContent = read('src/content/homepage.ts');
const rootRoute = read('src/routes/__root.tsx');
const aboutEagerRoute = read('src/routes/about.tsx');
const aboutLazyRoutePath = path.join(root, 'src/routes/about.lazy.tsx');
const aboutLazyRoute = fs.existsSync(aboutLazyRoutePath) ? fs.readFileSync(aboutLazyRoutePath, 'utf8') : '';
const aboutRoute = `${aboutEagerRoute}\n${aboutLazyRoute}`;
const robots = read('public/robots.txt');
const correctionsPolicy = read('src/routes/corrections-policy.tsx');
const editorialPolicy = read('src/routes/editorial-policy.tsx');
const errors = [];
const guideFixtures = read('src/data/fixtures/texas.ts');
const guideLinks = read('src/data/guide-links.ts');
for (const [slug, title, summaryPhrase, expectedHref] of [
  ['property-tax-estimator', 'Texas Property Tax Estimator', 'separate school and other exemptions', '/texas-property-tax-estimator'],
  ['cost-of-living-comparison', 'Cost of Living Comparison', 'current-area and Texas-area cost indexes', '/texas-cost-of-living-calculator'],
  ['state-park-reservation-playbook', 'Texas State Parks Guide', 'confirm availability with TPWD before booking', '/explore/state-parks'],
]) {
  const marker = 'slug: "' + slug + '",';
  const start = guideFixtures.indexOf(marker);
  const end = start < 0 ? -1 : guideFixtures.indexOf('\n  },', start);
  const card = start >= 0 && end > start ? guideFixtures.slice(start, end) : '';
  if (!card.includes('title: "' + title + '"') || !card.includes(summaryPhrase) || !card.includes('status: "available"')) {
    errors.push('Homepage guide card does not accurately describe its available destination: ' + slug + '.');
  }
  if (!guideLinks.includes('"' + slug + '": "' + expectedHref + '"')) {
    errors.push('Homepage guide card must link to its actual functionality: ' + slug + ' -> ' + expectedHref + '.');
  }
}
if (guideFixtures.includes('The booking windows, release times and backup parks that get you in on a spring Saturday.')) {
  errors.push('Homepage must not advertise an unimplemented state-park reservation playbook.');
}

if (!correctionsPolicy.includes('mailto:admin@texasdefined.com?subject=Texas%20Defined%20editorial%20correction') ||
    !correctionsPolicy.includes('Share a firsthand Texas update') ||
    correctionsPolicy.includes('to="/partner-with-us"')) {
  errors.push('Corrections must reach the editorial inbox, not the advertising sales form.');
}
if (!aboutRoute.includes('to="/corrections-policy"') || !editorialPolicy.includes('to="/corrections-policy"')) {
  errors.push('Trust and editorial policy pages must direct reader corrections to the editorial instructions.');
}


for (const feature of [
  'const pageTitle = "Texas Travel, Culture & Practical Living Guides"',
  '"@type": "WebPage"',
  '"@type": "ItemList"',
  'numberOfItems: curatedItems.length',
  'selectHomepageEditorPicks(featured, latest)',
  '...selectedArticles.map((article) =>',
  'destinations.filter((item) => item.featured).slice(0, 4)',
  '`${siteUrl}/article/${article.slug}`',
  '`${siteUrl}/destination/${destination.slug}`',
  'absoluteUrl(texasDefinedBrand, article.hero.src)',
  'absoluteUrl(texasDefinedBrand, destination.hero.src)',
  'isPartOf: { "@id": `${siteUrl}/#website` }',
  'about: { "@id": `${siteUrl}/#organization` }',
  'to="/texas-resources"',
  'Texas Resources &amp; State Agencies',
  'Open Start Here →',
]) {
  if (!route.includes(feature)) errors.push(`Homepage SEO feature missing: ${feature}.`);
}

for (const feature of [
  '<h1 className="mt-3',
  'The places, stories & life of Texas',
  'Explore Texas destinations, local traditions, history, events and practical guides',
  '<nav aria-label="Explore Texas Defined"',
  'homepageEntryPoints.map((item)',
]) {
  if (!lazyRoute.includes(feature)) errors.push(`Homepage answer-layer feature missing: ${feature}.`);
}

if (lazyRoute.includes('<dt><h3 className=')) {
  errors.push('Homepage FAQ answer layer must not skip from the page H1 directly to H3 headings.');
}

for (const [title, href] of [
  ['Texas Outdoors & Wildlife', '/explore/outdoors'],
  ['Rio Grande River Guide', '/article/texas-rio-grande-river-guide'],
  ['Texas Cities & Regions', '/article/texas-major-cities-regional-differences'],
  ['Texas Lakes & Reservoirs', '/article/texas-lakes-reservoirs-explained'],
]) {
  if (!lazyRoute.includes(`title: "${title}"`) || !lazyRoute.includes(`to: "${href}"`)) {
    errors.push(`Homepage GSC discovery link missing: ${title} -> ${href}.`);
  }
}

if (!featureHero.includes('<h2 className="mt-5 max-w-[10.5em]')) {
  errors.push('Split homepage feature must remain an H2 beneath the stable homepage H1.');
}

for (const feature of [
  'title: "Explore Texas"',
  'title: "Events & Festivals"',
  'title: "Texas Living"',
  'title: "Guides & Tools"',
]) {
  if (!homepageContent.includes(feature)) errors.push(`Homepage evergreen discovery link missing: ${feature}.`);
}
if (eagerRoute.includes('"@type": "FAQPage"') || lazyRoute.includes('homepageFaqs')) {
  errors.push('Homepage must not publish redundant generic FAQ markup or FAQPage schema.');
}
if (!route.includes('homepageEventsQuery()')) {
  errors.push('Homepage verified event query missing.');
}
if (route.includes('eventsQuery({ limit: 4 })')) {
  errors.push('Homepage must not cap the stale three-row generated feed at four events.');
}
// Keep editorial diversity and the shorter reader journey protected,
// while retaining discoverable links to evergreen and regional guides.
for (const feature of [
  'selectHomepageEditorPicks(featured, latest)',
  'selectHomepageMoreStories(latest, featured, editorPicks)',
  'popularTexasSearches.slice(0, 8)',
  'popularTexasSearches.slice(8)',
  '<details className=',
  'uniqueLatest.map((article)',
]) {
  if (!lazyRoute.includes(feature)) errors.push('Homepage compact editorial layout missing: ' + feature);
}
if (lazyRoute.includes('uniqueLatest.slice(0, 8)') || lazyRoute.includes('Need a Texas answer, not another destination?')) {
  errors.push('Homepage must not restore duplicate story grid or redundant Start Here band.');
}
if (!lazyRoute.includes('Share a correction or firsthand Texas tip →') || !lazyRoute.includes('to="/corrections-policy"')) errors.push('Homepage must offer an editorial correction/firsthand tip link.');
if (!lazyRoute.includes('Texas Resources &amp; State Agencies — Open Start Here →')) {
  errors.push('Resources CTA must remain accessible inside compact guide section.');
}


for (const feature of [
  'contactPoint: [{',
  '"@type": "ContactPoint"',
  'contactType: "editorial, corrections and general inquiries"',
  'url: `${siteUrl}/corrections-policy`',
  'email: "admin@texasdefined.com"',
  'publishingPrinciples: `${siteUrl}/editorial-policy`',
  'areaServed: { "@type": "State", name: "Texas" }',
]) {
  if (!rootRoute.includes(feature)) errors.push(`Organization identity feature missing: ${feature}.`);
}

for (const feature of [
  '"@type": "AboutPage"',
  '"@type": "ContactPage"',
  '<address id="contact"',
  '<strong className="text-foreground">Contact Texas Defined.</strong>',
  'For corrections or reader updates',
  'texasDefinedBrand.identity.social.map((profile, index)',
  'A street address is published only when there is a verified public business location to list.',
]) {
  if (!aboutRoute.includes(feature)) errors.push(`Public contact feature missing: ${feature}.`);
}

for (const crawler of [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Googlebot',
  'Google-Extended',
  'Bingbot',
  'Applebot-Extended',
  'Amazonbot',
  'Meta-ExternalAgent',
  'CCBot',
]) {
  if (!robots.includes(`User-agent: ${crawler}`)) errors.push(`AI/search crawler is not explicitly declared in robots.txt: ${crawler}.`);
}

if (!robots.includes('User-agent: *\nAllow: /\nDisallow: /admin')) {
  errors.push('Fallback crawler policy must allow public pages while protecting /admin.');
}

const adminBlocks = robots.match(/^Disallow: \/admin$/gm) ?? [];
if (adminBlocks.length !== 5) {
  errors.push('Crawler policy must preserve exactly five governed groups with /admin blocked.');
}

const duplicatesGlobalOrganization = route.includes('"@type": "Organization", "@id": `${siteUrl}/#organization`');
const duplicatesGlobalWebsite = route.includes('"@type": "WebSite", "@id": `${siteUrl}/#website`');
if (duplicatesGlobalOrganization || duplicatesGlobalWebsite) {
  errors.push('Homepage duplicates the global Organization or WebSite entities.');
}

if (errors.length) {
  console.error('Homepage SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Homepage identity, evergreen discovery navigation, official event selection, editorial/contact accountability, crawler access, curated ItemList, GSC discovery links and Start Here validation passed.');
