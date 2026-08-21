import fs from 'node:fs';

const failures = [];
const read = (file) => fs.readFileSync(file, 'utf8');
const requireText = (content, token, label) => { if (!content.includes(token)) failures.push(`${label} missing ${token}`); };

const chronology = read('src/data/painted-church-preservation-chronology.ts');
const chronologyUi = read('src/components/editorial/PaintedChurchPreservationChronology.tsx');
const knowledgeLinks = read('src/components/editorial/PaintedChurchKnowledgeLinks.tsx');
const preservationHub = read('src/routes/explore.painted-churches.preservation.tsx');
const ledger = read('src/data/painted-church-evidence-ledger.ts');
const registry = read('src/data/painted-church-source-registry.ts');
const readiness = read('src/data/painted-church-preindex-readiness.ts');
const contributorIndex = read('src/data/painted-church-contributor-index.ts');
const contributorRelations = read('src/data/painted-church-contributors-relations.ts');

for (const token of [
  'paintedChurchPreservationEvents',
  'paintedChurchPreservationEventsBySlug',
  'paintedChurchPreservationChronologyGaps',
  'dubina-1950s-whitewash',
  'sweet-home-1967-tornado',
  'ihm-1991-arson',
  'mason-1989-rediscovery',
  'galveston-ghf-stewardship',
]) requireText(chronology, token, 'Preservation chronology');

requireText(chronologyUi, 'How the visible interior reached the present day', 'Church preservation UI');
requireText(chronologyUi, 'That is a documented research gap, not evidence that the interior has never changed.', 'Preservation gap disclosure');
requireText(knowledgeLinks, 'PaintedChurchPreservationChronology', 'Church authority integration');
requireText(preservationHub, 'paintedChurchPreservationChronologyGaps', 'Statewide preservation hub');
requireText(preservationHub, 'Statewide fabric chronology', 'Statewide preservation hub');
requireText(ledger, 'category: "preservation"', 'Claim-level preservation provenance');
requireText(ledger, 'paintedChurchPreservationEventsBySlug', 'Claim-level preservation provenance');
requireText(registry, 'paintedChurchPreservationEventsBySlug', 'Source-registry preservation provenance');
requireText(readiness, 'id: "preservation-chronology"', 'Pre-index authority stretch model');

requireText(contributorIndex, 'paintedChurchRelationshipContributors', 'Cross-church contributor graph');
for (const token of ['ferdinand-stockert', 'hermann-kern', 'san-antonio-st-joseph-catholic-church']) requireText(contributorRelations, token, 'Stockert/Kern St. Joseph relationship');

if (failures.length) {
  console.error(`Painted Churches preservation authority validation failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('Painted Churches preservation authority protected: intervention chronology, gap disclosure, church UI, source/evidence integration, readiness scoring, and Stockert/Kern cross-church relationships.');
