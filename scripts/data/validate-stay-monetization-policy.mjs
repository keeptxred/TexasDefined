import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync('public/expedia-travel.js', 'utf8');
const errors = [];

const requireText = (needle, label) => {
  if (!source.includes(needle)) errors.push(`${label}: missing ${needle}`);
};

try {
  new vm.Script(source, { filename: 'public/expedia-travel.js' });
} catch (error) {
  errors.push(`Expedia/Stay Nearby bootstrap does not parse: ${error.message}`);
}

for (const [needle, label] of [
  ['function isIndexabilityEligible(', 'separate indexability eligibility gate'],
  ['function isMonetizationEligible(', 'separate monetization eligibility gate'],
  ['hasNoindexDirective()', 'noindex fail-closed gate'],
  ['link[rel="canonical" i]', 'canonical eligibility gate'],
  ['canonical === normalizePath(pathname)', 'self-canonical requirement'],
  ['isIndexabilityEligible(pathname) && isTravelBookingSurface(pathname)', 'combined monetization policy'],
  ['if (!isMonetizationEligible())', 'runtime mount guard'],
  ['!isMonetizationEligible()) return', 'async recheck guard'],
  ['if (!isMonetizationEligible()) return false', 'explicit mount guard'],
  ['section.dataset.monetizationEligible = "true"', 'eligible-surface marker'],
  ['end-of-guide-fallback', 'fallback placement attribution'],
  ['contextual-slot', 'contextual placement attribution'],
  ['event = "affiliate_click"', 'click telemetry'],
  ['event: "affiliate_surface_impression"', 'surface-impression telemetry'],
  ['affiliate_module: "stay-nearby"', 'module attribution'],
  ['affiliate_partner: provider', 'provider attribution'],
  ['rel = "sponsored nofollow noopener noreferrer"', 'sponsored/nofollow affiliate link relationship'],
  ['link.dataset.commercialPartner = provider', 'first-party commercial partner attribution'],
  ['link.dataset.commercialPlacement = placement', 'first-party commercial placement attribution'],
  ['link.dataset.affiliatePartner = provider', 'affiliate partner metadata'],
  ['link.dataset.affiliatePlacement = placement', 'affiliate placement metadata'],
  ['isIndexabilityEligible,', 'public indexability policy API'],
  ['isMonetizationEligible,', 'public monetization policy API'],
]) requireText(needle, label);

if (source.includes('window.location =') || source.includes('window.location.href =')) {
  errors.push('Stay monetization must not force redirects.');
}

if (errors.length) {
  console.error('Stay monetization policy validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Stay monetization policy validation passed: indexability and monetization are separate fail-closed gates; noindex, missing/non-self canonicals and non-travel pages cannot mount Stay Nearby; contextual and end-of-guide placements remain available only on eligible pages; and provider/module click, sponsored/nofollow, first-party partner/placement attribution plus impression telemetry are enforced.');
