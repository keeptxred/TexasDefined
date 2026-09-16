import fs from 'node:fs';
import vm from 'node:vm';

const root = fs.readFileSync('src/routes/__root.tsx', 'utf8');
const source = fs.readFileSync('public/stay-affiliate-options.js', 'utf8');
const stayRegistry = JSON.parse(fs.readFileSync('public/stay-nearby-hotels.json', 'utf8'));
const analytics = fs.readFileSync('src/platform/analytics.ts', 'utf8');
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

try {
  const sandbox = {
    window: {
      location: { pathname: '/' },
      dataLayer: [],
      addEventListener() {},
      dispatchEvent() {},
      requestAnimationFrame() {},
    },
    document: {
      readyState: 'loading',
      addEventListener() {},
      querySelectorAll() { return []; },
    },
    URL,
    CustomEvent: class CustomEvent {},
    console,
  };
  vm.runInNewContext(source, sandbox, { filename: 'public/stay-affiliate-options.js' });
  const api = sandbox.window.TexasDefinedStayAffiliateOptions;
  if (!api || typeof api.bookingIntent !== 'function' || typeof api.ownerEligible !== 'function' || typeof api.buildCjDeepLink !== 'function' || typeof api.exactPropertyDestination !== 'function') {
    errors.push('stay affiliate bootstrap must expose bookingIntent, ownerEligible, buildCjDeepLink and exactPropertyDestination for policy verification.');
  } else {
    const bookingCases = [
      ['/event/chappell-hill-bluebonnet-festival', 'hotel-first'],
      ['/sports-venue/globe-life-field', 'hotel-first'],
      ['/destination/fredericksburg', 'both'],
      ['/city/austin', 'both'],
      ['/county/travis', 'both'],
      ['/explore/painted-churches', 'both'],
      ['/best-places-to-go-camping-in-texas', 'both'],
      ['/texas-college-towns', 'both'],
      ['/texas-tailgating-guide', 'both'],
      ['/texas-unique-lodging', 'both'],
      ['/texas-music-venues', 'both'],
      ['/texas-roadside-oddities', 'both'],
    ];
    for (const [pathname, expected] of bookingCases) {
      const actual = api.bookingIntent(pathname);
      if (actual !== expected) errors.push(`booking intent regression for ${pathname}: expected ${expected}, received ${actual}.`);
    }
    if (!api.ownerEligible('/real-estate')) errors.push('Vrbo owner referral must remain eligible on /real-estate.');
    if (api.ownerEligible('/city/austin')) errors.push('Vrbo owner referral must not appear merely because a page is a city travel guide.');

    const hotelsDeepLink = api.buildCjDeepLink('https://www.hotels.com/');
    const vrboDeepLink = api.buildCjDeepLink('https://www.vrbo.com/');
    for (const [value, partner] of [[hotelsDeepLink, 'Hotels.com'], [vrboDeepLink, 'Vrbo']]) {
      if (!value.startsWith('https://www.anrdoezrs.net/links/101876465/type/dlg/')) {
        errors.push(`${partner} CJ deep link must stay bound to TexasDefined publisher 101876465.`);
      }
    }

    const activeProperties = (stayRegistry.properties || []).filter((property) => property.status === 'active');
    if (activeProperties.length !== 15) errors.push(`Exact Hotels.com wave expects 15 active curated properties; found ${activeProperties.length}.`);
    const seenPropertyDestinations = new Set();
    for (const property of activeProperties) {
      const destination = api.exactPropertyDestination(property.name);
      if (!destination) {
        errors.push(`${property.id} is missing an exact Hotels.com property destination.`);
        continue;
      }
      if (!/^https:\/\/www\.hotels\.com\/ho\d+\/[a-z0-9-]+\/$/i.test(destination)) {
        errors.push(`${property.id} does not use a stable exact-property Hotels.com URL: ${destination}`);
      }
      if (seenPropertyDestinations.has(destination)) errors.push(`${property.id} reuses another property's Hotels.com destination: ${destination}`);
      seenPropertyDestinations.add(destination);
      const affiliateUrl = api.buildCjDeepLink(destination);
      if (!affiliateUrl.startsWith('https://www.anrdoezrs.net/links/101876465/type/dlg/https://www.hotels.com/ho')) {
        errors.push(`${property.id} exact Hotels.com target does not generate a TexasDefined CJ deep link.`);
      }
    }
    if (api.exactPropertyDestination('Not A Curated Hotel') !== null) errors.push('Unknown hotel names must fail closed instead of receiving a guessed property URL.');

    let rejectedUnsupportedHost = false;
    try {
      api.buildCjDeepLink('https://example.com/');
    } catch {
      rejectedUnsupportedHost = true;
    }
    if (!rejectedUnsupportedHost) errors.push('CJ deep-link builder must reject destinations outside Hotels.com and Vrbo.');
  }
} catch (error) {
  errors.push(`stay affiliate route-policy runtime check failed: ${error.message}`);
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
  ['const VERIFIED_PROPERTY_DESTINATIONS = new Map([', 'exact Hotels.com property registry'],
  ['https://www.hotels.com/ho115100/hilton-anatole-dallas-united-states-of-america/', 'mature Hilton Anatole property record'],
  ['https://www.hotels.com/ho2949850752/loews-arlington-arlington-united-states-of-america/', 'Loews Arlington property record'],
  ['https://www.hotels.com/ho1830497920/tru-by-hilton-northlake-fort-worth-tx-roanoke-united-states-of-america/', 'Tru Northlake property record'],
  ['https://www.hotels.com/', 'Hotels.com destination'],
  ['https://www.vrbo.com/', 'Vrbo traveler destination'],
  ['https://www.vrbo.com/en-us/list/lead', 'Vrbo owner onboarding destination'],
  ['link.href = buildCjDeepLink(destination)', 'tracked-link enforcement'],
  ['sponsored nofollow noopener noreferrer', 'affiliate relationship attributes'],
  ['Find hotels on Hotels.com', 'Hotels.com CTA'],
  ['Find vacation rentals on Vrbo', 'Vrbo traveler CTA'],
  ['Find places to stay', 'prominent stay CTA'],
  ['View on Hotels.com', 'exact-property Hotels.com CTA'],
  ['List a property on Vrbo', 'Vrbo owner CTA'],
  ['upgradeExactPropertyCards', 'exact property card upgrader'],
  ['placement: "stay-nearby-card-exact"', 'exact-property attribution placement'],
  ['link.dataset.exactProperty = propertyName', 'exact-property identity marker'],
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
  ['link.dataset.commercialPartner = partnerName(destination)', 'first-party partner identity attribution'],
  ['link.dataset.commercialPlacement = placement', 'first-party placement attribution'],
  ['MutationObserver', 'SPA synchronization'],
]) requireText(source, needle, label);

for (const [needle, label] of [
  ['anchor.dataset.commercialPartner', 'first-party commercial click reader'],
  ["trackTexasDefinedOutcome('partner_referral_clicked'", 'first-party partner referral outcome'],
]) requireText(analytics, needle, label);

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
  ['VERIFIED_PROPERTY_DESTINATIONS', 'live exact-property registry verification'],
  ['upgradeExactPropertyCards', 'live property upgrader verification'],
  ['ho115100/hilton-anatole', 'live exact-property destination probe'],
  ['/event/chappell-hill-bluebonnet-festival', 'live event placement probe'],
  ['/sports-venue/globe-life-field', 'live venue placement probe'],
  ['/destination/fredericksburg', 'live destination placement probe'],
  ['/city/austin', 'live city eligibility probe'],
  ['/county/travis', 'live county eligibility probe'],
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

console.log('Hotels.com / Vrbo stay affiliate validation passed: all 15 active curated Stay Nearby hotels have unique verified exact-property Hotels.com destinations that generate TexasDefined CJ deep links, unknown properties fail closed, curated cards upgrade from broad Expedia search to exact-property Hotels.com CTAs, CJ tracking remains restricted to approved partner hosts, stay CTAs remain contextually promoted, event and destination guides expose deterministic in-content slots, owner referrals remain separately gated, outbound clicks are attributed through GTM and TexasDefined first-party partner-referral analytics, post-deploy verification covers the exact-property registry, disclosures and sponsored-link attributes are present, and Expedia remains the fallback lodging host.');
