import fs from 'node:fs';
import path from 'node:path';

const registryPath = path.resolve('src/data/county-series.ts');
const outputPath = process.argv[2] || '/tmp/county-profiles.tsv';
const registry = fs.readFileSync(registryPath, 'utf8');

const profilePattern = /profile\(\s*["']([^"']+)["']\s*,\s*["']([^"']+)["']\s*,\s*\(\)\s*=>\s*import\(\s*["']@\/data\/fixtures\/([^"']+)["']\s*\)\.then\(\(module\)\s*=>\s*module\.([A-Za-z0-9_]+)\)\s*\)/g;
const profiles = [];
for (const match of registry.matchAll(profilePattern)) {
  profiles.push({
    countySlug: match[1],
    articleSlug: match[2],
    fixturePath: match[3],
    exportName: match[4],
  });
}

if (!profiles.length) throw new Error('County series registry returned zero profiles');

const duplicate = (values) => values.find((value, index) => values.indexOf(value) !== index);
const duplicateCounty = duplicate(profiles.map((profile) => profile.countySlug));
if (duplicateCounty) throw new Error(`Duplicate canonical countySlug detected: ${duplicateCounty}`);
const duplicateArticle = duplicate(profiles.map((profile) => profile.articleSlug));
if (duplicateArticle) throw new Error(`Duplicate legacy county article slug detected: ${duplicateArticle}`);

const readStringField = (source, field) => {
  const match = source.match(new RegExp(`\\b${field}\\s*:\\s*["']([^"']+)["']`));
  return match?.[1] ?? null;
};

const readHeroSource = (source, heroBlock) => {
  const stringSrc = readStringField(heroBlock, 'src');
  if (stringSrc) return stringSrc;

  const identifierMatch = heroBlock.match(/\bsrc\s*:\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*[,\n]/);
  if (!identifierMatch) return null;

  const identifier = identifierMatch[1];
  const importPattern = new RegExp(`import\\s+${identifier}\\s+from\\s+["']([^"']+)["']`);
  const importMatch = source.match(importPattern);
  if (!importMatch) return null;

  return importMatch[1];
};

const rows = profiles
  .sort((a, b) => a.countySlug.localeCompare(b.countySlug))
  .map((profile) => {
    const fixture = path.resolve(`src/data/fixtures/${profile.fixturePath}.ts`);
    if (!fs.existsSync(fixture)) throw new Error(`Missing county fixture: ${fixture}`);
    const source = fs.readFileSync(fixture, 'utf8');
    if (!new RegExp(`export\\s+const\\s+${profile.exportName}\\b`).test(source)) {
      throw new Error(`Missing expected export ${profile.exportName} in ${fixture}`);
    }

    const id = readStringField(source, 'id');
    const slug = readStringField(source, 'slug');
    const title = readStringField(source, 'title');
    const heroBlock = source.match(/\bhero\s*:\s*\{([\s\S]*?)\n\s*\}/)?.[1] ?? '';
    const heroSrc = readHeroSource(source, heroBlock);

    if (!id || !slug || !title || !heroSrc) {
      throw new Error(`County profile is missing required publication metadata: ${profile.countySlug}`);
    }
    if (!id.startsWith('county-')) {
      throw new Error(`County article id must start with county-: ${id} (${profile.countySlug})`);
    }
    if (slug !== profile.articleSlug) {
      throw new Error(`County registry articleSlug does not match fixture: ${profile.countySlug} (${profile.articleSlug} != ${slug})`);
    }

    return { ...profile, id, slug, title, heroSrc };
  });

fs.writeFileSync(
  outputPath,
  rows.map((row) => `${row.countySlug}\t${row.slug}\t${row.title}`).join('\n') + '\n',
);

console.log(`Registered county profiles: ${rows.length}`);
for (const row of rows) {
  console.log(`${row.countySlug}\t/county/${row.countySlug}\t${row.slug}\t${row.title}`);
}
