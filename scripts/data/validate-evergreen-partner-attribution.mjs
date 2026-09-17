import fs from 'node:fs';

const source = fs.readFileSync('src/components/monetization/EvergreenNextSteps.tsx', 'utf8');
const errors = [];

for (const [needle, label] of [
  ['rel="sponsored nofollow noopener noreferrer"', 'affiliate relationship attributes'],
  ['data-affiliate-partner={partner.id}', 'affiliate partner metadata'],
  ['data-affiliate-placement={commercialPlacement}', 'affiliate placement metadata'],
  ['data-commercial-partner={partner.id}', 'commercial partner metadata'],
  ['data-commercial-placement={commercialPlacement}', 'commercial placement metadata'],
  ['const commercialPlacement = `evergreen-next-steps-${kind}`', 'funnel-specific placement identity'],
  ['trackAffiliateClick({ partner: partner.id, label: partner.label, placement: commercialPlacement, module: "evergreen-next-steps" })', 'first-party affiliate click telemetry'],
  ['url.protocol === "https:"', 'HTTPS partner URL guard'],
  ['Texas Defined may receive compensation', 'visible compensation disclosure'],
]) {
  if (!source.includes(needle)) errors.push(`${label}: missing ${needle}`);
}

if (/window\.location\s*=|window\.location\.href\s*=/.test(source)) errors.push('Evergreen partner links must not force redirects.');

if (errors.length) {
  console.error('Evergreen partner attribution validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Evergreen partner attribution validation passed: configured partner links remain HTTPS-only, disclosed and sponsored/nofollow while emitting partner, funnel placement and first-party affiliate click attribution without forced redirects.');
