import fs from 'node:fs';

const failures = [];
const read = (file) => fs.readFileSync(file, 'utf8');
const requireText = (content, token, label) => { if (!content.includes(token)) failures.push(`${label} missing ${token}`); };

const manifest = JSON.parse(read('src/data/painted-church-preindex-manifest.json'));
const readiness = read('src/data/painted-church-preindex-readiness.ts');
const readinessRoute = read('src/routes/explore.painted-churches.preindex-readiness.tsx');
const acquisition = read('src/data/painted-church-image-acquisition.ts');
const contributorIndex = read('src/data/painted-church-contributor-index.ts');
const deepContributors = read('src/data/painted-church-contributors-preindex-deep.ts');
const mapPreindex = read('src/data/painted-church-map-points-preindex.ts');
const countConcordance = read('src/data/painted-church-count-concordance.ts');
const deploy = read('.github/workflows/deploy-production.yml');

if (manifest.verifiedChurchCount !== 33) failures.push(`Authority floor expects 33 verified churches during this audit; found ${manifest.verifiedChurchCount}.`);
if (manifest.publicationState !== 'pre-index-review') failures.push('Authority floor requires publicationState=pre-index-review.');
if (manifest.requirements?.searchIndexingEnabled !== false) failures.push('Authority floor requires search indexing disabled.');
if (manifest.requirements?.preservationChronologyTracked !== true) failures.push('Manifest must require preservation chronology tracking.');

requireText(readiness, 'id: "preservation-chronology"', 'Readiness preservation gate');
requireText(readiness, 'label: "Church-specific preservation chronology"', 'Readiness preservation gate');
requireText(readiness, 'requiredForIndexLaunch: true', 'Readiness preservation gate');
requireText(readiness, 'Launch blocker: no sourced preservation/alteration/stewardship chronology', 'Readiness preservation disclosure');
requireText(readinessRoute, 'rights-cleared current photography, and a sourced preservation/alteration/stewardship chronology', 'Readiness launch-floor explanation');
requireText(readinessRoute, 'Authority audit refreshed August 21, 2026.', 'Readiness freshness');

for (const slug of ['waco-st-francis-on-the-brazos', 'san-antonio-immaculate-heart-of-mary', 'mason-st-joseph-catholic-church']) {
  requireText(acquisition, `churchSlug: "${slug}"`, `Image acquisition transparency for ${slug}`);
  requireText(acquisition, 'fieldwork-needed', 'Image acquisition fieldwork fallback');
}
requireText(acquisition, 'all-rights-reserved', 'Image rights refusal state');
requireText(acquisition, 'permission-needed', 'Image permission workflow');

requireText(contributorIndex, 'paintedChurchPreindexDeepContributors', 'Deep contributor graph');
for (const token of ['rev-louis-netardus', 'dr-oidtmann-studios']) requireText(deepContributors, token, 'Deep contributor authority');
requireText(deepContributors, 'Do not attribute every later Praha decorative element', 'Netardus attribution boundary');
requireText(deepContributors, 'Individual young German painters employed on the 1936 project remain unidentified', 'Oidtmann attribution boundary');

requireText(mapPreindex, '29.41972', 'IHM exact GNIS map point');
requireText(mapPreindex, 'USGS/GNIS Immaculate Heart of Mary Church feature coordinate', 'IHM map provenance');
requireText(countConcordance, '33 verified churches', 'Published-count concordance');
requireText(countConcordance, 'historic-thematic-fifteen', '15-church historical reconciliation');
requireText(countConcordance, 'thc-current-mps', '14-entry current THC reconciliation');

requireText(deploy, 'PUBLIC_INDEXING_ENABLED', 'Index-release flag');
requireText(deploy, "env.PUBLIC_INDEXING_ENABLED == 'true'", 'IndexNow release condition');

if (failures.length) {
  console.error(`Painted Churches strict authority-floor validation failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('Painted Churches strict authority floor protected: 33-church pre-index state, preservation as a launch gate, image-rights transparency, deeper contributor attribution, exact IHM map provenance, count reconciliation, and explicit search-release control.');
