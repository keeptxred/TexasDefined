import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = 'src';
const sharedTrackerPath = path.normalize('src/lib/affiliate-click.ts');
const outcomeClientPath = path.normalize('src/platform/analytics.ts');
const publicRoot = 'public';
const sourceExtensions = new Set(['.js', '.jsx', '.ts', '.tsx']);
const failures = [];

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    else if (sourceExtensions.has(path.extname(entry.name))) files.push(path.normalize(fullPath));
  }
  return files;
}

function validateAffiliateAnchorMetadata(file, source) {
  let offset = 0;
  const marker = 'data-affiliate-partner';
  while (true) {
    const index = source.indexOf(marker, offset);
    if (index < 0) break;
    const start = source.lastIndexOf('<a', index);
    const end = source.indexOf('</a>', index);
    if (start < 0 || end < 0) {
      failures.push(`${file} contains ${marker} outside a complete anchor; affiliate metadata cannot be verified.`);
      offset = index + marker.length;
      continue;
    }
    const anchor = source.slice(start, end + 4);
    for (const required of ['data-affiliate-placement', 'data-commercial-partner', 'data-commercial-placement']) {
      if (!anchor.includes(required)) {
        failures.push(`${file} affiliate anchor with ${marker} is missing ${required}; first-party referral reporting would be incomplete.`);
      }
    }
    offset = index + marker.length;
  }
}

function validateDomAffiliateMetadata(file, source) {
  if (!source.includes('.dataset.affiliatePartner')) return;
  for (const required of [
    '.dataset.affiliatePlacement',
    '.dataset.commercialPartner',
    '.dataset.commercialPlacement',
  ]) {
    if (!source.includes(required)) {
      failures.push(`${file} builds affiliate links with .dataset.affiliatePartner but is missing ${required}; first-party referral reporting would be incomplete.`);
    }
  }
}

if (!fs.existsSync(sharedTrackerPath)) {
  console.error(`Missing shared affiliate tracker: ${sharedTrackerPath}`);
  process.exit(1);
}

const sharedTracker = fs.readFileSync(sharedTrackerPath, 'utf8');
if (!fs.existsSync(outcomeClientPath)) {
  failures.push(`Missing centralized first-party outcome client: ${outcomeClientPath}.`);
}
const outcomeClient = fs.existsSync(outcomeClientPath) ? fs.readFileSync(outcomeClientPath, 'utf8') : '';
for (const [pattern, label] of [
  [/event\s*:\s*["'`]affiliate_click["'`]/, 'shared affiliate_click payload'],
  [/new\s+CustomEvent\s*\(\s*["'`]texasdefined:affiliate-click["'`]/, 'shared browser event dispatch'],
]) {
  if (!pattern.test(sharedTracker)) failures.push(`Shared tracker is missing ${label}.`);
}

for (const [needle, label] of [
  ["const commercialPartner = anchor.dataset.commercialPartner;", 'delegated commercial-link detection'],
  ["trackTexasDefinedOutcome('partner_referral_clicked'", 'single first-party partner referral outcome'],
]) {
  if (!outcomeClient.includes(needle)) failures.push(`Central outcome client is missing ${label}.`);
}

if (sharedTracker.includes('partner_referral_clicked') || sharedTracker.includes('trackTexasDefinedOutcome(')) {
  failures.push('Shared affiliate marketing tracker must not write first-party partner_referral_clicked outcomes; the delegated platform listener owns that count.');
}

for (const file of walk(sourceRoot)) {
  if (file === sharedTrackerPath) continue;
  const source = fs.readFileSync(file, 'utf8');

  if (/event\s*:\s*["'`]affiliate_click["'`]/.test(source)) {
    failures.push(`${file} defines affiliate_click locally; use src/lib/affiliate-click.ts instead.`);
  }

  if (/new\s+CustomEvent\s*\(\s*["'`]texasdefined:affiliate-click["'`]/.test(source)) {
    failures.push(`${file} dispatches texasdefined:affiliate-click locally; use src/lib/affiliate-click.ts instead.`);
  }

  validateAffiliateAnchorMetadata(file, source);
  validateDomAffiliateMetadata(file, source);
}

if (fs.existsSync(publicRoot)) {
  for (const file of walk(publicRoot)) {
    if (path.extname(file) !== '.js') continue;
    const source = fs.readFileSync(file, 'utf8');
    if (source.includes('partner_referral_clicked')) {
      failures.push(`${file} writes partner_referral_clicked directly; public affiliate bootstraps must rely on the centralized delegated commercial-link listener to avoid double counting.`);
    }
    validateAffiliateAnchorMetadata(file, source);
    validateDomAffiliateMetadata(file, source);
  }
}

if (failures.length) {
  console.error('Shared affiliate tracker governance failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Shared affiliate tracker governance passed: affiliate marketing emitters are centralized, first-party partner referral counting remains single-path through src/platform/analytics.ts, and every affiliate-tagged source/public link retains commercial partner and placement metadata for private reporting.');
