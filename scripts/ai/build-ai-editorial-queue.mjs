import fs from 'node:fs';
import path from 'node:path';

const INPUT_PATH = 'ops/ai/texas-defined-ai-demand.generated.json';
const OUTPUT_PATH = 'ops/ai/texas-defined-ai-editorial-queue.generated.json';
const MAX_ITEMS = 20;

if (!fs.existsSync(INPUT_PATH)) {
  if (fs.existsSync(OUTPUT_PATH)) fs.rmSync(OUTPUT_PATH);
  console.log('Texas Defined AI editorial queue: no demand report is present; no editorial queue created.');
  process.exit(0);
}

let report;
try {
  report = JSON.parse(fs.readFileSync(INPUT_PATH, 'utf8'));
} catch {
  console.error('Texas Defined AI editorial queue: demand report is not valid JSON.');
  process.exit(1);
}

if (!Array.isArray(report.opportunities)) {
  console.error('Texas Defined AI editorial queue: demand report opportunities must be an array.');
  process.exit(1);
}

function recommendedAction(opportunity) {
  const surface = opportunity.topExistingSurface;
  const gap = Number(opportunity.coverage?.gap) || 0;
  const partial = Number(opportunity.coverage?.partial) || 0;
  const strong = Number(opportunity.coverage?.strong) || 0;
  const weak = gap + partial;

  if (!surface?.href) return 'research-new-surface';
  if (weak > 0 && weak >= strong) return 'improve-existing-surface';
  return 'review-existing-surface';
}

const items = report.opportunities.slice(0, MAX_ITEMS).map((opportunity, index) => ({
  rank: index + 1,
  topic: opportunity.topic,
  category: opportunity.category,
  demandScore: opportunity.demandScore,
  askCount: opportunity.askCount,
  trendDelta: opportunity.trendDelta,
  coverage: opportunity.coverage,
  commercialIntent: Boolean(opportunity.commercialIntent),
  recommendedAssetType: opportunity.recommendedAssetType,
  recommendedAction: recommendedAction(opportunity),
  target: opportunity.topExistingSurface ?? null,
  authoritativeSources: opportunity.authoritativeSources,
  publicationStatus: 'research-and-review-required',
}));

if (!items.length) {
  if (fs.existsSync(OUTPUT_PATH)) fs.rmSync(OUTPUT_PATH);
  console.log('Texas Defined AI editorial queue: no reviewable demand opportunities are present; no queue created.');
  process.exit(0);
}

const queue = {
  schemaVersion: 1,
  generatedAt: report.generatedAt ?? new Date().toISOString(),
  source: INPUT_PATH,
  privacy: 'Aggregated generalized topics only. Raw or sanitized user questions are never written to this queue.',
  publicationBoundary: 'This queue recommends research or page improvements for human review only; it may not publish or auto-merge content.',
  actionDefinitions: {
    'improve-existing-surface': 'Demand is landing on an existing TexasDefined surface while gap or partial coverage is material; review that page for researched improvements.',
    'review-existing-surface': 'An existing TexasDefined surface appears relevant and coverage is comparatively strong; verify whether a targeted refresh is warranted before creating anything new.',
    'research-new-surface': 'No existing TexasDefined surface is consistently associated with the demand cluster; research whether a new guide, directory, planner, explainer or structured-data surface is justified.',
  },
  items,
};

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(queue, null, 2)}\n`, 'utf8');
console.log(`Texas Defined AI editorial queue: wrote ${items.length} ranked review-only actions to ${OUTPUT_PATH}.`);
