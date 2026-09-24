import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = 'src';
const sharedTrackerPath = path.normalize('src/lib/affiliate-click.ts');
const outcomeClientPath = path.normalize('src/platform/analytics.ts');
const publicRoot = 'public';
const sourceExtensions = new Set(['.js', '.jsx', '.json', '.ts', '.tsx']);
const failures = [];
const deactivatedAffiliateMarkers = [
  ['golf direct now', 'Golf Direct Now advertiser name'],
  ['golfdirectnow', 'Golf Direct Now domain/slug'],
  ['6323402', 'Golf Direct Now CJ advertiser ID'],
];

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    else if (sourceExtensions.has(path.extname(entry.name))) files.push(path.normalize(fullPath));
  }
  return files;
}

function validateDeactivatedAffiliateReferences(file, source) {
  const normalized = source.toLowerCase();
  for (const [marker, label] of deactivatedAffiliateMarkers) {
    if (normalized.includes(marker)) {
      failures.push(`${file} contains deactivated affiliate reference ${label}; Golf Direct Now must not be published while CJ advertiser 6323402 is inactive.`);
    }
  }
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

function validateKnownAffiliateNetworkMetadata(file, source) {
  const knownNetworkMarkers = [
    'anrdoezrs.net',
    'email.cj.com',
    '7eer.net',
    'P00318227',
  ];
  const rendersLink = source.includes('<a')
    || source.includes('createElement("a")')
    || source.includes("createElement('a')")
    || source.includes('.innerHTML');

  if (!rendersLink || !knownNetworkMarkers.some((marker) => source.includes(marker))) return;

  for (const required of ['data-commercial-partner', 'data-commercial-placement']) {
    if (!source.includes(required) && !source.includes(`.dataset.${required === 'data-commercial-partner' ? 'commercialPartner' : 'commercialPlacement'}`)) {
      failures.push(`${file} renders a known affiliate-network destination but is missing ${required}; untagged affiliate links would disappear from first-party referral reporting.`);
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
  ["trackTexasDefinedOutcome('partner_referral_shown'", 'single first-party partner referral impression outcome'],
  ["trackTexasDefinedOutcome('partner_referral_clicked'", 'single first-party partner referral outcome'],
]) {
  if (!outcomeClient.includes(needle)) failures.push(`Central outcome client is missing ${label}.`);
}

if (sharedTracker.includes('partner_referral_clicked') || sharedTracker.includes('partner_referral_shown') || sharedTracker.includes('trackTexasDefinedOutcome(')) {
  failures.push('Shared affiliate marketing tracker must not write first-party partner_referral_shown or partner_referral_clicked outcomes; the delegated platform listener owns those counts.');
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

  validateDeactivatedAffiliateReferences(file, source);
  validateAffiliateAnchorMetadata(file, source);
  validateDomAffiliateMetadata(file, source);
  validateKnownAffiliateNetworkMetadata(file, source);
}

if (fs.existsSync(publicRoot)) {
  for (const file of walk(publicRoot)) {
    const source = fs.readFileSync(file, 'utf8');
    validateDeactivatedAffiliateReferences(file, source);
    if (path.extname(file) !== '.js') continue;
    for (const outcome of ['partner_referral_shown', 'partner_referral_clicked']) {
      if (source.includes(outcome)) {
        failures.push(`${file} writes ${outcome} directly; public affiliate bootstraps must rely on the centralized delegated commercial-link listener to avoid double counting.`);
      }
    }
    validateAffiliateAnchorMetadata(file, source);
    validateDomAffiliateMetadata(file, source);
    validateKnownAffiliateNetworkMetadata(file, source);
  }
}

if (failures.length) {
  console.error('Shared affiliate tracker governance failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Shared affiliate tracker governance passed: affiliate marketing emitters are centralized, first-party partner referral impression and click counting remain single-path through src/platform/analytics.ts, public bootstraps cannot write either outcome directly, every affiliate-tagged source/public link retains commercial partner and placement metadata, rendered source/public links using known CJ/CityPASS/Viator affiliate-network identifiers cannot silently bypass private reporting, and the deactivated Golf Direct Now CJ advertiser cannot re-enter source/public assets while advertiser 6323402 remains inactive.');
