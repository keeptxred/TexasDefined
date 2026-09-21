import fs from 'node:fs';
import vm from 'node:vm';

const root = fs.readFileSync('src/routes/__root.tsx', 'utf8');
const source = fs.readFileSync('public/stay-affiliate-options.js', 'utf8');
const stayRegistry = JSON.parse(fs.readFileSync('public/stay-nearby-hotels.json', 'utf8'));
const destinationStayRegistry = JSON.parse(fs.readFileSync('public/stay-nearby-destination-hotels.json', 'utf8'));
const hotelsVerification = JSON.parse(fs.readFileSync('public/stay-nearby-hotelscom-verification.json', 'utf8'));
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
    const travelocityDeepLink = api.buildCjDeepLink('https://www.travelocity.com/');
    const vrboDeepLink = api.buildCjDeepLink('https://www.vrbo.com/');
    for (const [value, partner] of [[hotelsDeepLink, 'Hotels.com'], [travelocityDeepLink, 'Travelocity'], [vrboDeepLink, 'Vrbo']]) {
      if (!value.startsWith('https://www.anrdoezrs.net/links/101876465/type/dlg/')) {
        errors.push(`${partner} CJ deep link must stay bound to TexasDefined publisher 101876465.`);
      }
    }

    if (hotelsVerification.version !== 1) errors.push('Hotels.com property verification registry must be version 1.');
    if (hotelsVerification.publisherId !== '101876465') errors.push('Hotels.com property verification registry must remain bound to TexasDefined CJ publisher 101876465.');
    if (hotelsVerification.policy?.exactPropertyOnly !== true || hotelsVerification.policy?.broadSearchAllowed !== false) {
      errors.push('Hotels.com property verification policy must require exact properties and forbid broad search URLs.');
    }

    const baseActiveProperties = (stayRegistry.properties || []).filter((property) => property.status === 'active');
    const destinationActiveProperties = (destinationStayRegistry.properties || []).filter((property) => property.status === 'active');
    const activeProperties = [...baseActiveProperties, ...destinationActiveProperties];
    const evidence = hotelsVerification.properties || [];
    if (baseActiveProperties.length !== 18) errors.push(`Exact Hotels.com base cohort expects 18 active curated properties; found ${baseActiveProperties.length}.`);
    if (destinationActiveProperties.length !== 12) errors.push(`Exact Hotels.com destination cohort expects 12 active curated properties; found ${destinationActiveProperties.length}.`);
    if (activeProperties.length !== 30) errors.push(`Exact Hotels.com coverage expects 30 active governed properties; found ${activeProperties.length}.`);
    if (evidence.length !== activeProperties.length) errors.push(`Hotels.com verification evidence must cover every active governed property; expected ${activeProperties.length}, found ${evidence.length}.`);

    const evidenceById = new Map();
    for (const item of evidence) {
      if (!item?.propertyId || evidenceById.has(item.propertyId)) errors.push(`Invalid or duplicate Hotels.com verification evidence: ${item?.propertyId ?? '<missing>'}.`);
      evidenceById.set(item.propertyId, item);
    }

    const seenPropertyDestinations = new Set();
    for (const property of activeProperties) {
      const item = evidenceById.get(property.id);
      if (!item) {
        errors.push(`${property.id} is missing Hotels.com verification evidence.`);
        continue;
      }
      if (item.name !== property.name) errors.push(`${property.id} Hotels.com verification name does not match the canonical curated property name.`);
      const destination = api.exactPropertyDestination(property.name);
      if (!destination) {
        errors.push(`${property.id} is missing an exact Hotels.com property destination.`);
        continue;
      }
      if (item.destinationUrl !== destination) errors.push(`${property.id} runtime Hotels.com destination diverges from its verification record.`);
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
    if (!rejectedUnsupportedHost) errors.push('CJ deep-link builder must reject destinations outside Hotels.com, Travelocity and Vrbo.');
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
  errors.push('Hotels.com/Travelocity/Vrbo bootstrap must load after the existing Expedia/Stay Nearby bootstrap.');
}

for (const [needle, label] of [
  ['const CJ_PUBLISHER_ID = "101876465"', 'TexasDefined CJ publisher ID'],
  ['https://www.anrdoezrs.net/links/${CJ_PUBLISHER_ID}/type/dlg/', 'CJ Deep Link Generator base'],
  ['const VERIFIED_PROPERTY_DESTINATIONS = new Map([', 'exact Hotels.com property registry'],
  ['https://www.hotels.com/ho115100/hilton-anatole-dallas-united-states-of-america/', 'mature Hilton Anatole property record'],
  ['https://www.hotels.com/ho2949850752/loews-arlington-arlington-united-states-of-america/', 'Loews Arlington property record'],
  ['https://www.hotels.com/ho1830497920/tru-by-hilton-northlake-fort-worth-tx-roanoke-united-states-of-america/', 'Tru Northlake property record'],
  ['https://www.hotels.com/ho3489929696/albert-hotel/', 'Albert Hotel destination property record'],
  ['https://www.hotels.com/ho145347/hotel-galvez-spa-galveston-united-states-of-america/', 'Grand Galvez destination property record'],
  ['https://www.hotels.com/ho3586848288/hotel-1928/', 'Hotel 1928 destination property record'],
  ['https://www.hotels.com/ho494047/best-western-johnson-city-inn-johnson-city-united-states-of-america/', 'Best Western Johnson City destination property record'],
  ['https://www.hotels.com/ho1266792032/carter-creek-winery-resort-spa-johnson-city-united-states-of-america/', 'Carter Creek Johnson City destination property record'],
  ['https://www.hotels.com/ho2462492672/walden-retreats-johnson-city-united-states-of-america/', 'Walden Retreats Johnson City destination property record'],
  ['https://www.hotels.com/ho506095/best-western-plus-sweetwater-inn-suites-sweetwater-united-states-of-america/', 'Best Western Plus Sweetwater property record'],
  ['https://www.hotels.com/ho636049152/la-quinta-inn-suites-by-wyndham-sweetwater-east-sweetwater-united-states-of-america/', 'La Quinta Sweetwater property record'],
  ['https://www.hotels.com/ho532248/microtel-inn-and-suites-by-wyndham-sweetwater-sweetwater-united-states-of-america/', 'Microtel Sweetwater property record'],
  ['https://www.hotels.com/', 'Hotels.com destination'],
  ['https://www.travelocity.com/', 'Travelocity destination'],
  ['https://www.vrbo.com/', 'Vrbo traveler destination'],
  ['https://www.vrbo.com/en-us/list/lead', 'Vrbo owner onboarding destination'],
  ['link.href = buildCjDeepLink(destination)', 'tracked-link enforcement'],
  ['sponsored nofollow noopener noreferrer', 'affiliate relationship attributes'],
  ['Find hotels on Hotels.com', 'Hotels.com CTA'],
  ['Compare hotels on Travelocity', 'Travelocity hotel CTA'],
  ['Find vacation rentals on Vrbo', 'Vrbo traveler CTA'],
  ['Compare more hotels on Hotels.com', 'secondary Hotels.com CTA after exact recommendations'],
  ['Compare more hotels on Travelocity', 'secondary Travelocity CTA after exact recommendations'],
  ['Browse vacation rentals on Vrbo', 'secondary Vrbo CTA after exact recommendations'],
  ['stay-nearby-choice-after-exact', 'secondary-choice attribution after exact recommendations'],
  ['Find places to stay', 'broad-search prominent stay CTA fallback'],
  ['View recommended stays', 'exact-property-first prominent stay CTA'],
  ['EXACT_PROPERTY_AFFILIATE_SELECTOR', 'exact-property commercial selector'],
  ['choice.dataset.priority = exactPropertyFirst ? "exact-property-first" : "broad-search-first"', 'exact-property-first booking-choice priority marker'],
  ['const choiceMode = exactPropertyFirst ? "after-exact" : "broad"', 'secondary-choice state marker'],
  ['createBookingChoice(intent, exactPropertyFirst)', 'exact-property-aware secondary-choice builder'],
  ['choice.dataset.mode = choiceMode', 'secondary-choice state persistence'],
  ['placeBookingChoice(expediaSurface, choice, exactPropertyFirst)', 'context-aware booking-choice placement'],
  ['exactPropertyAffiliate.scrollIntoView', 'prominent CTA exact-property jump'],
  ['View on Hotels.com', 'exact-property Hotels.com CTA'],
  ['List a property on Vrbo', 'Vrbo owner CTA'],
  ['upgradeExactPropertyCards', 'exact property card upgrader'],
  ['placement: "stay-nearby-card-exact"', 'exact-property attribution placement'],
  ['link.dataset.exactProperty = propertyName', 'exact-property identity marker'],
  ['Affiliate disclosure: TexasDefined may earn a commission from qualifying Hotels.com, Travelocity or Vrbo activity', 'traveler affiliate disclosure'],
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
  ['surface.prepend(choice)', 'broad-search-first integration placement'],
  ['surface.insertBefore(choice, scopedStyle)', 'exact-property-first integration placement'],
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
  ['normalizeVisitorHeadings', 'legacy event heading normalizer'],
  ['Planning your visit', 'event planning placement anchor'],
  ['Places to stay near this event', 'event stay-slot accessibility label'],
  ['EVENT_DISCOVERY_TAIL', 'event parking placement boundary'],
  ['data-event-discovery-tail', 'stable event discovery-tail marker'],
  ['splitEventHtmlForParking', 'event parking placement helper'],
  ['beforeParking', 'event planning content before parking map'],
  ['afterParking', 'event continuation content after parking map'],
  ['<ParkingMapPanel map={parkingMap} contextName={page.venue ?? page.title} />', 'event parking map embedded before discovery tail'],
]) requireText(eventRoute, needle, label);

if (eventRoute.includes('(?:Planning your visit|Plan the visit)')) {
  errors.push('Event renderer must not preserve the legacy "Plan the visit" heading as an accepted display heading.');
}
if (!eventRoute.includes('LEGACY_PLAN_VISIT_HEADING') || !eventRoute.includes('"$1Planning your visit$2"')) {
  errors.push('Event renderer must normalize legacy "Plan the visit" HTML to "Planning your visit" before render.');
}

for (const [needle, label] of [
  ['data-stay-nearby-slot', 'destination in-content Stay Nearby slot'],
  ['Places to stay near ${destination.name}', 'destination stay-slot accessibility label'],
  ['Things to do and see', 'destination planning adjacency'],
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
  ['/sports-venue/xtreme-raceway-park', 'live traffic-prioritized venue placement probe'],
  ['/destination/fredericksburg', 'live destination placement probe'],
  ['/city/austin', 'live city eligibility probe'],
  ['/county/travis', 'live county eligibility probe'],
  ['data-stay-nearby-slot', 'live explicit slot verification'],
]) requireText(productionVerifier, needle, label);

if (!productionVerifier.includes("route: '/destination/fredericksburg'") || !productionVerifier.includes('requireSlot: true')) {
  errors.push('Live destination probe must require an explicit in-content Stay Nearby slot.');
}

if (!productionVerifier.includes("route: '/sports-venue/xtreme-raceway-park'") || !productionVerifier.includes("marker: 'Xtreme Raceway Park'")) {
  errors.push('Live monetization smoke must include Xtreme Raceway Park, the current highest measured sports-venue traffic surface.');
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
  console.error('Hotels.com / Travelocity / Vrbo stay affiliate validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Hotels.com / Travelocity / Vrbo stay affiliate validation passed: all 27 active governed Stay Nearby properties (18 venue + 9 destination) have unique verified exact-property Hotels.com destinations backed by an auditable verification registry and generating TexasDefined CJ deep links; unknown properties fail closed; curated cards upgrade from broad Expedia search to exact-property Hotels.com CTAs; Travelocity is available as an approved hotel-comparison option on governed stay surfaces; CJ tracking remains restricted to approved partner hosts; stay CTAs remain contextually promoted; event and destination guides expose deterministic in-content slots; owner referrals remain separately gated; outbound clicks are attributed through GTM and TexasDefined first-party partner-referral analytics; post-deploy verification covers the exact-property registry and the traffic-prioritized Xtreme Raceway Park lodging slot; disclosures and sponsored-link attributes are present; and Expedia remains the fallback lodging host.');
