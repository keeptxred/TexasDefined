import fs from 'node:fs';

const errors = [];
const required = [
  'src/platform/knowledge-graph-behavior.ts',
  'src/components/admin/KnowledgeGraphBehavior.tsx',
  'src/routes/api.knowledge-graph-behavior.ts',
  'src/routes/admin.knowledge-graph-behavior.tsx',
];
for (const path of required) if (!fs.existsSync(path)) errors.push(`Missing knowledge-graph behavior file: ${path}`);
if (errors.length) fail();

const behavior = fs.readFileSync(required[0], 'utf8');
const panel = fs.readFileSync(required[1], 'utf8');
const api = fs.readFileSync(required[2], 'utf8');
const page = fs.readFileSync(required[3], 'utf8');

requireSymbols(behavior, [
  'GRAPH_BEHAVIOR_THRESHOLDS',
  'simulateKnowledgeGraph',
  'connectedComponents',
  'averageReachableWithinThreeHops',
  'highlyConcentratedHubs',
  'scoreEntityAuthority',
  'scoreEntityCompleteness',
  'scoreGraphCompleteness',
  'canonicalPathForEntity',
  'canonicalPathsForGraph',
  'AI_RETRIEVAL_BENCHMARK',
  'runAiRetrievalBenchmark',
  'auditKnowledgeGraphBehavior',
  'maximumOrphanPercent',
  'maximumBrokenRelationshipPercent',
  'minimumAverageRelationships',
  'minimumAverageCompleteness',
  'minimumBenchmarkPassPercent',
], 'behavior engine');
for (const benchmark of ['Caddo Lake', 'state parks near Austin', 'property taxes in Travis County', 'best caverns in Texas']) {
  if (!behavior.includes(benchmark)) errors.push(`AI retrieval benchmark missing: ${benchmark}`);
}
requireSymbols(panel, ['KnowledgeGraphBehavior', 'Behavioral status', 'Orphan entities', 'Connected components', 'AI benchmark', 'Weakest entities', 'Highest authority'], 'admin panel');
requireSymbols(api, ["createFileRoute('/api/knowledge-graph-behavior')", 'auditKnowledgeGraphBehavior', 'status: report.healthy ? 200 : 503', 'no-store', 'noindex, nofollow'], 'behavior API');
requireSymbols(page, ["createFileRoute('/admin/knowledge-graph-behavior')", 'KnowledgeGraphBehavior', 'loadTexasKnowledgeGraph', 'noindex,nofollow', '/admin/platform-health'], 'behavior admin page');

if (errors.length) fail();
console.log('Knowledge-graph simulation, authority, canonical paths, completeness, regression thresholds, and AI retrieval benchmarks are protected.');

function requireSymbols(source, symbols, area) {
  for (const symbol of symbols) if (!source.includes(symbol)) errors.push(`${area} feature missing: ${symbol}`);
}
function fail() {
  console.error('Knowledge-graph behavioral validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
