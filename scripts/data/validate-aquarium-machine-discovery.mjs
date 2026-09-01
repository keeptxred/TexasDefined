import { readFile } from 'node:fs/promises';

const collectionSource = await readFile('src/data/aquarium-marine-collection.ts', 'utf8');
const hubSource = await readFile('src/routes/explore.aquariums.tsx', 'utf8');
const llmsSource = await readFile('src/routes/llms[.]txt.ts', 'utf8');
const machineIndex = JSON.parse(await readFile('public/aquariums.json', 'utf8'));
const citationIndex = JSON.parse(await readFile('public/citation-magnets.json', 'utf8'));

const AQUARIUM_HUB_URL = 'https://texasdefined.com/explore/aquariums';
const AQUARIUM_JSON_URL = 'https://texasdefined.com/aquariums.json';

const listMatch = collectionSource.match(/export const AQUARIUM_MARINE_SLUGS = \[([\s\S]*?)\] as const;/);
if (!listMatch) throw new Error('Could not locate AQUARIUM_MARINE_SLUGS in the canonical aquarium collection.');

const canonicalSlugs = [...listMatch[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);
const entries = Array.isArray(machineIndex.entries) ? machineIndex.entries : [];
const machineSlugs = entries.map((entry) => entry.slug);

if (canonicalSlugs.length !== 17) throw new Error(`Expected 17 canonical aquarium slugs, found ${canonicalSlugs.length}.`);
if (entries.length !== canonicalSlugs.length) throw new Error(`Machine index has ${entries.length} entries; canonical collection has ${canonicalSlugs.length}.`);
if (new Set(machineSlugs).size !== machineSlugs.length) throw new Error('Machine index contains duplicate aquarium slugs.');

for (let index = 0; index < canonicalSlugs.length; index += 1) {
  const slug = canonicalSlugs[index];
  const entry = entries[index];
  if (!entry || entry.slug !== slug) throw new Error(`Machine index position ${index + 1} must be ${slug}.`);
  if (entry.position !== index + 1) throw new Error(`Machine index ${slug} must use position ${index + 1}.`);
  const expectedUrl = `https://texasdefined.com/destination/${slug}`;
  if (entry.url !== expectedUrl) throw new Error(`Machine index ${slug} must use canonical URL ${expectedUrl}.`);
  if (typeof entry.name !== 'string' || !entry.name.trim()) throw new Error(`Machine index ${slug} is missing a name.`);
}

if (machineIndex.canonicalPage !== AQUARIUM_HUB_URL) throw new Error('Machine index canonicalPage is incorrect.');
if (!machineIndex.sourcePolicy?.includes('first-party visitor source')) throw new Error('Machine index must preserve first-party visitor-source precedence.');
if (!hubSource.includes('rel: "alternate", type: "application/json", href: "/aquariums.json"')) throw new Error('Aquarium hub must advertise /aquariums.json as an alternate application/json representation.');
if (!hubSource.includes('"@type": "ItemList"')) throw new Error('Aquarium hub must retain ItemList structured data.');

for (const url of [AQUARIUM_HUB_URL, AQUARIUM_JSON_URL]) {
  if (!llmsSource.includes(url)) throw new Error(`llms.txt must advertise aquarium discovery URL ${url}.`);
}

const citationResources = Array.isArray(citationIndex.resources) ? citationIndex.resources : [];
const aquariumHubCitation = citationResources.find((resource) => resource?.url === AQUARIUM_HUB_URL);
const aquariumJsonCitation = citationResources.find((resource) => resource?.url === AQUARIUM_JSON_URL);

if (!aquariumHubCitation) throw new Error('citation-magnets.json must advertise the canonical aquarium hub.');
if (!aquariumJsonCitation) throw new Error('citation-magnets.json must advertise the aquarium machine-readable JSON collection.');
if (!aquariumHubCitation.trust?.includes('first-party-visitor-source-precedence')) throw new Error('Aquarium hub citation must preserve first-party visitor-source precedence.');
if (!aquariumJsonCitation.trust?.includes('machine-readable')) throw new Error('Aquarium JSON citation must identify the collection as machine-readable.');
if (!aquariumJsonCitation.trust?.includes('canonical-page-link')) throw new Error('Aquarium JSON citation must preserve its canonical-page relationship.');

console.log(`Aquarium machine-discovery contract passed: ${entries.length} ordered canonical destinations, alternate JSON discovery, ItemList schema, first-party source precedence, and four global llms/citation references.`);
