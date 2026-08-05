import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const rootRoute = fs.readFileSync(path.join(root, 'src/routes/__root.tsx'), 'utf8');
const exploreSearchRoute = fs.readFileSync(path.join(root, 'src/routes/explore.search.tsx'), 'utf8');
const errors = [];

if (!rootRoute.includes('"@type": "SearchAction"')) errors.push('WebSite schema is missing SearchAction.');
if (!rootRoute.includes('/explore/search?q={search_term_string}')) errors.push('WebSite SearchAction does not target the real Explore search route.');
if (rootRoute.includes('`${siteUrl}/search?q={search_term_string}`')) errors.push('WebSite SearchAction still advertises the nonexistent /search route.');
if (!exploreSearchRoute.includes('createFileRoute("/explore/search")')) errors.push('Explore search route is missing.');
if (!exploreSearchRoute.includes('name="q"')) errors.push('Explore search form does not accept the SearchAction query parameter.');

if (errors.length) {
  console.error('WebSite search-action validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('WebSite SearchAction validation passed.');
