import fs from 'node:fs';
import vm from 'node:vm';

const root = fs.readFileSync('src/routes/__root.tsx', 'utf8');
const source = fs.readFileSync('public/stay-affiliate-options.js', 'utf8');
const errors = [];

const requireText = (text, needle, label) => {
  if (!text.includes(needle)) errors.push(`${label}: missing ${needle}`);
};

try {
  new vm.Script(source, { filename: 'public/stay-affiliate-options.js' });
} catch (error) {
  errors.push(`stay affiliate bootstrap does not parse: ${error.message}`);
}

for (const [needle, label] of [
  ['<script src="/stay-affiliate-options.js" defer />', 'root bootstrap'],
  ['"query-input": "required name=search_term_string"', 'SearchAction contract'],
]) requireText(root, needle, label);

const expediaPosition = root.indexOf('<script src="/expedia-travel.js" defer />');
const affiliatePosition = root.indexOf('<script src="/stay-affiliate-options.js" defer />');
if (expediaPosition < 0 || affiliatePosition < 0 || affiliatePosition < expediaPosition) {
  errors.push('Hotels.com/Vrbo bootstrap must load after the existing Expedia/Stay Nearby bootstrap.');
}

for (const [needle, label] of [
  ['const CJ_PUBLISHER_ID = "101876465"', 'TexasDefined CJ publisher ID'],
  ['https://www.anrdoezrs.net/links/${CJ_PUBLISHER_ID}/type/dlg/', 'CJ Deep Link Generator base'],
  ['https://www.hotels.com/', 'Hotels.com destination'],
  ['https://www.vrbo.com/', 'Vrbo traveler destination'],
  ['https://www.vrbo.com/en-us/list/lead', 'Vrbo owner onboarding destination'],
  ['link.href = buildCjDeepLink(destination)', 'tracked-link enforcement'],
  ['sponsored nofollow noopener noreferrer', 'affiliate relationship attributes'],
  ['Search Hotels.com', 'Hotels.com CTA'],
  ['Search Vrbo vacation rentals', 'Vrbo traveler CTA'],
  ['List a property on Vrbo', 'Vrbo owner CTA'],
  ['Affiliate disclosure: TexasDefined may earn a commission from qualifying Hotels.com or Vrbo activity', 'traveler affiliate disclosure'],
  ['Affiliate disclosure: TexasDefined may earn a referral commission when an eligible new Vrbo property listing goes live', 'owner affiliate disclosure'],
  ['HOTEL_FIRST_PATH', 'hotel-first route intent'],
  ['BOTH_PATH', 'combined lodging route intent'],
  ['OWNER_PATH = /^\\/real-estate\\/?$/', 'owner route guard'],
  ['OWNER_SECTION', 'owner article-section guard'],
  ['EXPEDIA_SURFACE_ID = "expedia-travel-surface"', 'existing Stay Nearby integration'],
  ['expediaSurface.prepend(choice)', 'contextual integration placement'],
  ['MutationObserver', 'SPA synchronization'],
]) requireText(source, needle, label);

if (/facebook\.com|twitter\.com|x\.com/i.test(source)) {
  errors.push('Hotels.com/Vrbo website affiliate bootstrap must not contain social-network promotion targets.');
}
if (source.includes('window.location =') || source.includes('window.location.href =')) {
  errors.push('Affiliate bootstrap must not force redirects; referrals must remain explicit visitor clicks.');
}

if (errors.length) {
  console.error('Hotels.com / Vrbo stay affiliate validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Hotels.com / Vrbo stay affiliate validation passed: CJ tracking is fail-closed through the TexasDefined publisher ID, hotel/vacation-rental intent is route-scoped, owner referrals use the current Vrbo onboarding URL, disclosures and sponsored-link attributes are present, and the existing Expedia/Stay Nearby surface remains the integration host.');
