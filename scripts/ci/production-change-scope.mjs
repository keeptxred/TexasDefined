import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, appendFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

export const PAGE_BUDGET = 40;
export const REPRESENTATIVE_PATHS = ['/', '/explore', '/texas-history', '/sports', '/fishing', '/events', '/shop', '/city/houston', '/article/bluebonnet-season-field-guide', '/destination/flat-creek-estate', '/county/travis'];
const sharedPattern = /^(?:package(?:-lock)?\.json|vite\.config\.|wrangler\.|src\/(?:worker|server|styles|index\.css|components\/layout|routes\/__root|lib\/(?:seo|public-routes|public-route-tokens)))/;
const groups = {
  images: /discover|hero|public\/images|materialize/,
  sports: /sports|venue|football/,
  foliage: /east-texas-fall-colors|fall-foliage/,
  discovery: /public-routes|sitemap|routeTree|discovery|indexing/,
  events: /events?|ticketmaster/,
  financial: /financial|mortgage|insurance|salary|cost-of-living|property-tax|calculators/,
  advertiser: /advertis|partner-inquiry|sponsor/,
};
const publicPath = value => typeof value === 'string' && /^\/(?!\/|api(?:\/|$)|admin(?:\/|$))[^\s?#$]*$/.test(value) && !/\.(?:png|jpe?g|webp|svg|js|css|json|xml|txt|csv|pdf)$/.test(value);

function records(source) {
  const file = ts.createSourceFile('source.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const result = new Map();
  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const props = new Map(node.properties.filter(ts.isPropertyAssignment).map(p => [p.name.getText(file).replace(/^['"]|['"]$/g, ''), p.initializer]));
      for (const key of ['slug', 'canonicalPath', 'path', 'routePath']) {
        const value = props.get(key);
        if (value && ts.isStringLiteralLike(value)) {
          const id = `${key}:${value.text}`;
          result.set(id, { key, value: value.text, text: node.getText(file) });
          break;
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  return result;
}

function articleLinkRegistry(source) {
  const file = ts.createSourceFile('link-registry.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const records = new Map();
  function visit(node) {
    if (ts.isPropertyAssignment(node) && ts.isStringLiteralLike(node.name)
      && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(node.name.text)
      && ts.isArrayLiteralExpression(node.initializer)) {
      const hrefs = [];
      for (const item of node.initializer.elements) {
        if (!ts.isObjectLiteralExpression(item)) continue;
        const href = item.properties.find(p => ts.isPropertyAssignment(p) && p.name.getText(file).replace(/^['"]|['"]$/g, '') === 'href');
        if (href && ts.isStringLiteralLike(href.initializer) && publicPath(href.initializer.text)) hrefs.push(href.initializer.text);
      }
      records.set(node.name.text, { text: node.initializer.getText(file), hrefs });
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  return records;
}

export function buildChangePlan({ changedFiles, sources = {}, baseline = null, head = null }) {
  const shared = baseline === null || changedFiles.some(p => sharedPattern.test(p));
  const candidates = new Set(shared ? REPRESENTATIVE_PATHS : []);
  const expectedHrefsByPage = {};
  // Retest the two precisely identified owners missed by the pre-fix planner
  // whenever this planner changes. No full-site scan or recurring follower.
  if (changedFiles.includes('scripts/ci/production-change-scope.mjs')) {
    const regressionEdges = {
      '/article/texas-regions-explained': ['/article/texas-gulf-coast-erosion-shoreline-retreat-guide'],
      '/article/texas-cultural-regions-explained': ['/article/texas-oil-boom-wichita-falls-west-texas-rigs'],
    };
    for (const [page, hrefs] of Object.entries(regressionEdges)) {
      candidates.add(page);
      expectedHrefsByPage[page] = hrefs;
    }
  }
  // The McAllen collection is a dynamic route, so ordinary route-name detection
  // cannot infer its public URL. Verify this one affected page and its two
  // editorial cross-links whenever its source/data or regional matcher changes.
  // Never expand this to an automatic full metro or statewide crawl.
  if (changedFiles.some(path =>
    /^src\/routes\/explore\.near\.\$metro\.\$collection(?:\.lazy)?\.tsx$/.test(path)
    || ['src/data/metro-county-links.ts', 'src/data/viator-market-match.ts', 'src/data/national-wildlife-refuge-destinations.ts'].includes(path)
  )) {
    const path = '/explore/near/mcallen/day-trips';
    candidates.add(path);
    expectedHrefsByPage[path] = [
      '/destination/santa-ana-national-wildlife-refuge',
      '/destination/museum-south-texas-history-edinburg',
    ];
  }
  let contentFallback = false;
  for (const path of changedFiles) {
    const { before = '', after = '' } = sources[path] || {};
    if (path.startsWith('src/routes/')) {
      for (const match of after.matchAll(/createFileRoute\(["']([^"']+)["']\)/g)) {
        const route = match[1].split('/').map(p => p.replace(/_$/, '')).join('/');
        if (publicPath(route)) candidates.add(route);
      }
    }
    if (!/^src\/(?:data|components|routes|lib)\//.test(path)) continue;
    if (/^src\/data\/(?:article-internal-links|remote-evergreen-internal-links)\.ts$/.test(path)) {
      const previous = articleLinkRegistry(before);
      const current = articleLinkRegistry(after);
      for (const slug of new Set([...previous.keys(), ...current.keys()])) {
        const oldBlock = previous.get(slug), newBlock = current.get(slug);
        if (oldBlock?.text === newBlock?.text) continue;
        const page = '/article/' + slug;
        candidates.add(page);
        const added = newBlock?.hrefs.filter(href => !oldBlock?.hrefs.includes(href)) ?? [];
        if (added.length) expectedHrefsByPage[page] = [...new Set(added)];
      }
    }
    const oldRecords = records(before);
    for (const [id, record] of records(after)) {
      if (oldRecords.get(id)?.text === record.text) continue;
      if (record.key !== 'slug' && publicPath(record.value)) candidates.add(record.value);
      if (record.key === 'slug' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.value)) {
        if (/articles?|core-articles/.test(path)) candidates.add(`/article/${record.value}`);
        else if (/destination/.test(path)) candidates.add(`/destination/${record.value}`);
      }
    }
    contentFallback = true;
  }
  if (!candidates.size && contentFallback) for (const p of REPRESENTATIVE_PATHS) candidates.add(p);
  const allPaths = [...candidates].sort();
  // A deploy smoke is explicitly a bounded sample, never a full-content certification.
  const selectedPaths = [...new Set([...REPRESENTATIVE_PATHS.filter(p => candidates.has(p)), ...allPaths])].slice(0, PAGE_BUDGET);
  const selectedExpectedHrefs = Object.fromEntries(selectedPaths.filter(p => expectedHrefsByPage[p]).map(p => [p, expectedHrefsByPage[p]]));
  return { baseline, head, changedFiles, shared, selectedPaths, expectedHrefsByPage: selectedExpectedHrefs, candidateCount: allPaths.length,
    omittedCount: Math.max(0, allPaths.length - selectedPaths.length), pageBudget: PAGE_BUDGET,
    coverage: allPaths.length > PAGE_BUDGET ? 'representative sample; full coverage belongs to weekly local audits' : 'identified changed pages and representative dependencies',
    groups: Object.fromEntries(Object.entries(groups).map(([name, pattern]) => [name, shared || changedFiles.some(p => pattern.test(p))])),
  };
}

const git = args => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 32 * 1024 * 1024 });
export async function baselineFromLedger({ repo = process.env.GITHUB_REPOSITORY, token = process.env.GH_TOKEN, fetchImpl = fetch } = {}) {
  if (!/^[\w.-]+\/[\w.-]+$/.test(repo || '') || !token) throw new Error('Repository and GH_TOKEN are required for verified baseline lookup');
  async function get(path) {
    const r = await fetchImpl(`https://api.github.com/repos/${repo}${path}`, { headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}`, 'User-Agent': 'TexasDefined-Change-Scope' }, signal: AbortSignal.timeout(20000) });
    if (!r.ok) throw new Error(`Verified baseline lookup failed: HTTP ${r.status}`);
    return r.json();
  }
  const deployments = await get('/deployments?environment=texasdefined-verified-worker&per_page=30');
  if (!Array.isArray(deployments)) throw new Error('Malformed verified deployments response');
  for (const deployment of deployments) {
    const statuses = await get(`/deployments/${deployment.id}/statuses?per_page=1`);
    if (!Array.isArray(statuses)) throw new Error('Malformed verified status response');
    if (statuses[0]?.state !== 'success') continue;
    if (!/^[a-f0-9]{40}$/i.test(deployment.sha || '')) throw new Error('Invalid verified baseline SHA');
    return deployment.sha;
  }
  return null;
}

async function main() {
  const head = process.env.GITHUB_SHA || git(['rev-parse', 'HEAD']).trim();
  if (!/^[a-f0-9]{40}$/i.test(head)) throw new Error('Invalid target SHA');
  const baseline = await baselineFromLedger();
  const changedFiles = (baseline ? git(['diff', '--name-only', baseline, head]) : git(['ls-files'])).trim().split('\n').filter(Boolean);
  const sources = {};
  for (const path of changedFiles.filter(p => /^src\//.test(p) && /\.[cm]?[jt]sx?$/.test(p))) {
    let after = '';
    try { after = git(['show', `${head}:${path}`]); } catch {}
    let before = '';
    if (baseline) { try { before = git(['show', `${baseline}:${path}`]); } catch {} }
    sources[path] = { before, after };
  }
  const plan = buildChangePlan({ baseline, head, changedFiles, sources });
  mkdirSync('.artifacts', { recursive: true });
  writeFileSync('.artifacts/production-change-plan.json', JSON.stringify(plan, null, 2));
  if (process.env.GITHUB_OUTPUT) for (const [group, value] of Object.entries(plan.groups)) appendFileSync(process.env.GITHUB_OUTPUT, `${group}=${value}\n`);
  console.log(`Deployment smoke: ${changedFiles.length} changed files since ${baseline || 'unknown baseline'}, ${plan.selectedPaths.length}/${plan.candidateCount} candidate pages; ${plan.omittedCount} left to weekly local audits.`);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n### Change-scoped deployment smoke\nBaseline: ${baseline || 'unavailable; conservative shared checks'}. Pages: ${plan.selectedPaths.length}/${plan.candidateCount}. Omitted: ${plan.omittedCount}.\nThis is deployment smoke coverage, not a complete site audit.\n`);
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
