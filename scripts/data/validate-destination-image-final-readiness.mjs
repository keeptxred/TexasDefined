import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const audit = read('src/data/destination-audit.ts');
const governance = read('docs/site-image-governance.md');
const rvGenerator = read('scripts/data/enforce-rv-park-hero-location-policy.mjs');
const failures = [];

for (const marker of [
  'const TEMPORARY_REPRESENTATIVE_AI_MARKER = /AI-generated representative editorial image/i',
  'function usesTemporaryRepresentativeAiHero(destination: Destination)',
  'code: "hero-representative-ai", severity: "error"',
  'rights-cleared exact-location image or a photorealistic AI depiction grounded in verified facts about the named place before indexing',
]) {
  if (!audit.includes(marker)) failures.push(`Destination representative-AI fail-closed guard missing: ${marker}`);
}

for (const marker of [
  'generic regional AI scene',
  'grounded in verified visual facts about the named place/event',
  'generic or merely regional representative AI image is remediation-only',
  'must not make the page indexable or sitemap-eligible',
  'generic representative scene and count that as final success',
]) {
  if (!governance.includes(marker)) failures.push(`Site image governance final-readiness rule missing: ${marker}`);
}

// The current RV backlog may retain representative AI temporarily while exact-place
// remediation continues. It must stay explicitly labeled so destination-audit can
// fail it closed; never relabel these assets as final/compliant without replacing
// the generation contract with verified place-specific grounding.
for (const marker of [
  'This is a representative image because no rights-cleared documentary photograph passed strict exact-property and Texas-location verification.',
  'AI-generated representative editorial image',
  'subjectScope: "representative"',
  'sourceKind: "generated-representative"',
]) {
  if (!rvGenerator.includes(marker)) failures.push(`RV temporary representative-image labeling changed without migration: ${marker}`);
}

if (failures.length) {
  console.error(`Destination final image readiness validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Destination final image readiness passed: generic/representative AI remains temporary and fail-closed; only exact-location reusable media or verified-place-grounded photorealistic AI can satisfy final image readiness.');
