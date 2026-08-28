import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const eagerRoute = read('src/routes/index.tsx');
const lazyRoutePath = path.join(root, 'src/routes/index.lazy.tsx');
const route = fs.existsSync(lazyRoutePath) ? `${eagerRoute}\n${fs.readFileSync(lazyRoutePath, 'utf8')}` : eagerRoute;
const featureHero = read('src/components/editorial/FeatureHero.tsx');
const homepageContent = read('src/content/homepage.ts');
const rootRoute = read('src/routes/__root.tsx');
const aboutRoute = read('src/routes/about.tsx');
const robots = read('public/robots.txt');
const errors = [];

for (const feature of [
  'const pageTitle = "Texas Travel, Culture & Practical Living Guides"',
  '"@type": "WebPage"',
  '"@type": "ItemList"',
  '"@type": "FAQPage"',
  'numberOfItems: curatedItems.length',
  'featured.slice(0, 4)',
  'destinations.filter((item) => item.featured).slice(0, 4)',
  '`${siteUrl}/article/${article.slug}`',
  '`${siteUrl}/destination/${destination.slug}`',
  'absoluteUrl(texasDefinedBrand, article.hero.src)',
  'absoluteUrl(texasDefinedBrand, destination.hero.src)',
  'isPartOf: { "@id": `${siteUrl}/#website` }',
  'about: { "@id": `${siteUrl}/#organization` }',
  '{ "@id": `${siteUrl}/#faq` }',
  'mainEntity: homepageFaqs.map((item)',
  'to="/texas-resources"',
  'Texas Resources &amp; State Agencies',
  'Open Start Here →',
]) {
  if (!route.includes(feature)) errors.push(`Homepage SEO feature missing: ${feature}.`);
}

for (const feature of [
  'homepageIntro.eyebrow',
  'homepageIntro.title',
  'homepageIntro.description',
  '<h1 className="mt-4',
  '<h2 className="mt-3 max-w-[15em]',
  '<dt><h3 className=',
  'homepageFaqs.map((item)',
  'aria-labelledby="texas-defined-faq"',
  'href="/about#contact"',
  'Contact Texas Defined',
]) {
  if (!featureHero.includes(feature)) errors.push(`Homepage answer-layer feature missing: ${feature}.`);
}

for (const feature of [
  'title: "The places, stories & life of Texas"',
  'Texas Defined is a guide to Texas places, culture, food, history, travel and practical living',
  'question: "What is Texas Defined?"',
  'question: "What does Texas Defined cover?"',
  'question: "Who is Texas Defined for?"',
  'question: "Where should I start?"',
]) {
  if (!homepageContent.includes(feature)) errors.push(`Homepage GEO content missing: ${feature}.`);
}

for (const feature of [
  'contactPoint: [{',
  '"@type": "ContactPoint"',
  'contactType: "editorial and general inquiries"',
  'url: `${siteUrl}/about#contact`',
  'publishingPrinciples: `${siteUrl}/about`',
  'areaServed: { "@type": "State", name: "Texas" }',
]) {
  if (!rootRoute.includes(feature)) errors.push(`Organization identity feature missing: ${feature}.`);
}

for (const feature of [
  'id="contact"',
  'eyebrow="Contact Texas Defined"',
  'Corrections, source updates and general questions',
  'texasDefinedBrand.identity.social.map((profile)',
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

console.log('Homepage identity, answer layer, FAQ schema, public contact signals, crawler access, curated ItemList and Start Here validation passed.');
