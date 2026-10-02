import fs from 'node:fs';

const source = fs.readFileSync('src/routes/texas-state-fair.tsx', 'utf8');
const failures = [];
const requireText = (needle, message) => {
  if (!source.includes(needle)) failures.push(message);
};

for (const [needle, message] of [
  ['const canonicalUrl = `https://texasdefined.com${canonicalPath}`;', 'State Fair schema must use the TexasDefined canonical leaf URL.'],
  ['Date.parse("2026-10-19T00:00:00-05:00")', 'State Fair lifecycle must expire at Texas-local midnight immediately after the verified 2026 end date.'],
  ['startDate: "2026-09-25"', 'State Fair lifecycle must retain the verified 2026 start date.'],
  ['endDate: "2026-10-18"', 'State Fair lifecycle must retain the verified 2026 end date.'],
  ['"@type": "WebPage"', 'Expired State Fair content must downgrade to evergreen WebPage schema.'],
  ['"@type": "Thing"', 'Expired State Fair content must remain described as an evergreen Thing.'],
  ['"@type": "Event"', 'Current/upcoming State Fair occurrence must retain Event schema.'],
  ['eventStatus: "https://schema.org/EventScheduled"', 'Current State Fair occurrence must retain EventScheduled status.'],
  ['url: canonicalUrl', 'State Fair Event URL must point at the TexasDefined leaf page.'],
  ['sameAs: "https://bigtex.com/"', 'State Fair schema must retain the official site as sameAs rather than the Event URL.'],
  ['streetAddress: "3809 Grand Avenue"', 'State Fair PostalAddress must include Fair Park street address.'],
  ['postalCode: "75210"', 'State Fair PostalAddress must include Fair Park postal code.'],
]) requireText(needle, message);

if (failures.length) {
  console.error('State Fair Event lifecycle validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('State Fair Event lifecycle protected: canonical Event URL, detailed Fair Park PostalAddress, Texas-local expiry, and evergreen post-event fallback are present.');