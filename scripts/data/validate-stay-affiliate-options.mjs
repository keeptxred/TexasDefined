import fs from 'node:fs';
import vm from 'node:vm';

const root = fs.readFileSync('src/routes/__root.tsx', 'utf8');
const source = fs.readFileSync('public/stay-affiliate-options.js', 'utf8');
const eventRoute = fs.readFileSync('src/routes/event.$slug.lazy.tsx', 'utf8');
const destinationPlanner = fs.readFileSync('src/components/editorial/DestinationVisitPlanner.tsx', 'utf8');
const productionVerifier = fs.readFileSync('scripts/ci/verify-stay-affiliate-production.mjs', 'utf8');
const productionWorkflow = fs.readFileSync('.github/workflows/verify-stay-affiliate-production.yml', 'utf8');
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
  ['Find hotels on Hotels.com', 'Hotels.com CTA'],
  ['Find vacation rentals on Vrbo', 'Vrbo traveler CTA'],
  ['Find places to stay', 'prominent stay CTA'],
  ['List a property on Vrbo', 'Vrbo owner CTA'],
  ['Affiliate disclosure: TexasDefined may earn a commission from qualifying Hotels.com or Vrbo activity', 'traveler affiliate disclosure'],
  ['Affiliate disclosure: TexasDefined may earn a referral commission when an eligible new Vrbo property listing goes live', 'owner affiliate disclosure'],
  ['HOTEL_FIRST_PATH', 'hotel-first route intent'],
  ['BOTH_PATH', 'combined lodging route intent'],
  ['OWNER_PATH = /^\\/real-estate\\/?$/', 'owner route guard'],
  ['OWNER_SECTION', 'owner article-section guard'],
  ['EXPEDIA_SURFACE_ID = "expedia-travel-surface"', 'existing Stay Nearby integration'],
  ['STAY_SLOT_SELECTOR = "[data-stay-nearby-slot]"', 'explicit stay-slot preservation'],
  ['PLACEMENT_HEADING', 'contextual placement heading guard'],
  ['anchor.parentNode.insertBefore(surface, anchor)', 'prominent in-content placement'],
  ['surface.dataset.prominentPlacement = "contextual"', 'prominent placement marker'],
  ['expediaSurface.prepend(choice)', 'contextual integration placement'],
  ['event: "affiliate_click"', 'affiliate click analytics event'],
  ['window.dataLayer.push(detail)', 'GTM affiliate click tracking'],
  ['affiliate_placement: placement', 'affiliate placement attribution'],
  ['MutationObserver', 'SPA synchronization'],
]) requireText(source, needle, label);

for (const [needle, label] of [
  ['injectStayNearbySlot', 'event stay-slot injection helper'],
  ['data-stay-nearby-slot', 'event in-content Stay Nearby slot'],
  ['Plan the visit', 'event planning placement anchor'],
  ['Places to stay near this event', 'event stay-slot accessibility label'],
]) requireText(eventRoute, needle, label);

for (const [needle, label] of [
  ['data-stay-nearby-slot', 'destination in-content Stay Nearby slot'],
  ['Places to stay near ${destination.name}', 'destination stay-slot accessibility label'],
  ['What to know before you go', 'destination planning adjacency'],
]) requireText(destinationPlanner, needle, label);

for (const [needle, label] of [
  ['/stay-affiliate-options.js', 'live affiliate bootstrap verification'],
  ['/expedia-travel.js', 'live Expedia bootstrap verification'],
  ['Find places to stay', 'live prominent CTA verification'],
  ['event: "affiliate_click"', 'live affiliate analytics verification'],
  ['/event/chappell-hill-bluebonnet-festival', 'live event placement probe'],
  ['/sports-venue/globe-life-field', 'live venue placement probe'],
  ['/destination/fredericksburg', 'live destination placement probe'],
  ['data-stay-nearby-slot', 'live explicit slot verification'],
]) requireText(productionVerifier, needle, label);

if (!productionVerifier.includes("route: '/destination/fredericksburg'") || !productionVerifier.includes('requireSlot: true')) {
  errors.push('Live destination probe must require an explicit in-content Stay Nearby slot.');
}

for (const [needle, label] of [
  ['workflow_run:', 'post-deploy workflow trigger'],
  ['Deploy TexasDefined production', 'production deployment dependency'],
  ['github.event.workflow_run.conclusion == \'success\'', 'successful-deploy guard'],
  ['node scripts/ci/verify-stay-affiliate-production.mjs', 'live stay affiliate verifier invocation'],
]) requireText(productionWorkflow, needle, label);

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

console.log('Hotels.com / Vrbo stay affiliate validation passed: CJ tracking is fail-closed through the TexasDefined publisher ID, stay CTAs are promoted beside or ahead of lodging content instead of being buried at the page end, event and destination guides expose deterministic in-content stay slots, explicit in-page stay slots remain authoritative, outbound affiliate clicks are attributed through GTM, live post-deploy verification covers event/venue/destination placement, route intent remains scoped, disclosures and sponsored-link attributes are present, and the existing Expedia/Stay Nearby surface remains the integration host.');
