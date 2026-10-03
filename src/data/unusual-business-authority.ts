export interface UnusualBusinessAuthoritySource {
  name: string;
  url: string;
  note: string;
}

export interface UnusualBusinessQuickFact {
  label: string;
  value: string;
}

export interface UnusualBusinessAuthorityProfile {
  title: string;
  canonicalPath: string;
  quickFacts: readonly UnusualBusinessQuickFact[];
  sources: readonly UnusualBusinessAuthoritySource[];
  methodology: string;
  lastVerified: string;
  freshness: string;
}

const VERIFIED = "October 3, 2026";

export const unusualBusinessAuthorityProfiles: Readonly<Record<string, UnusualBusinessAuthorityProfile>> = {
  "unusual-texas-businesses-services": {
    title: "Unusual Texas Businesses & Services",
    canonicalPath: "/article/unusual-texas-businesses-services",
    lastVerified: VERIFIED,
    freshness: "Directory membership is reviewed when a featured business materially changes and at least annually.",
    quickFacts: [
      { label: "Coverage", value: "Specialized Texas businesses, makers and experiences" },
      { label: "Current featured guides", value: "Bluebonnet Animal Preservation, Phenix Knives, Horses on the Beach, The Mum Queen and WhirlyBall Hurst" },
      { label: "Selection standard", value: "Distinctive service or craft, meaningful Texas connection, durable search intent and enough verified detail for a substantive guide" },
      { label: "Last verified", value: VERIFIED },
    ],
    sources: [
      { name: "Bluebonnet Animal Preservation", url: "https://bluebonnetpreservation.com/", note: "First-party services, Athens location and operating guidance." },
      { name: "Phenix Knives", url: "https://www.phenixknives.com/", note: "First-party Bellville shop, classes, demonstrations and hands-on experience." },
      { name: "Bellville Chamber of Commerce — Phenix Knives", url: "https://business.bellville.com/members/member/phenix-knives-llc-2135", note: "Independent local corroboration of the Bellville address, historic shop and visitor offerings." },
      { name: "Horses on the Beach Corpus Christi", url: "https://www.horsesonthebeachcorpus.com/horseback-riding-beach-tours/", note: "First-party ride formats, location and participation information." },
      { name: "Visit Corpus Christi — beach activities", url: "https://www.visitcorpuschristi.com/beaches/activities/", note: "Official destination-marketing corroboration of Horses on the Beach as a Corpus Christi beach activity." },
      { name: "Library of Congress — Horses on the Beach", url: "https://www.loc.gov/item/2014633478/", note: "2014 Carol M. Highsmith archival documentation of the Corpus Christi operation." },
      { name: "The Mum Queen — About", url: "https://www.themumqueen.com/about", note: "First-party background on Elizabeth Cleaver, experience and maker mentorship." },
      { name: "Houston Chronicle — The Mum Queen", url: "https://www.houstonchronicle.com/explained/article/meet-mum-queen-ruling-texas-homecoming-tradition-21041372.php", note: "Independent reporting on Cleaver, her Spring studio and the Texas mum-making industry." },
      { name: "WhirlyBall Texas — Hurst", url: "https://whirlyballtexas.com/locations/", note: "First-party Hurst location and operating identity." },
      { name: "HEB Chamber of Commerce — WhirlyBall/LaserWhirld", url: "https://business.heb.org/list/member/whirlyball-laserwhirld-of-heb-11652", note: "Independent local corroboration of the Hurst venue and its group-entertainment role." },
    ],
    methodology: "TexasDefined includes a business only when the service, craft or experience is unusually distinctive, the Texas location or cultural connection materially shapes the story, and current first-party information is strong enough to answer practical questions. We verify mutable details against the operator and use local, tourism, archival or independent reporting where available. Ordinary businesses are intentionally excluded so this remains an editorial reference rather than a directory scrape.",
  },
  "bluebonnet-animal-preservation-athens": {
    title: "Bluebonnet Animal Preservation in Athens",
    canonicalPath: "/article/bluebonnet-animal-preservation-athens",
    lastVerified: VERIFIED,
    freshness: "Operational details should be rechecked before use because pricing, hours, intake instructions and processing estimates can change.",
    quickFacts: [
      { label: "Location", value: "Athens, Henderson County, Texas" },
      { label: "Core services", value: "Private and communal pet cremation; freeze-dry preservation for pets and selected wildlife or trophies" },
      { label: "Published cremation turnaround", value: "About 7–10 days including preparation, according to the operator" },
      { label: "Published freeze-dry range", value: "Commonly 3–6 months, depending on size and condition, according to the operator" },
      { label: "Last verified", value: VERIFIED },
    ],
    sources: [
      { name: "Bluebonnet Animal Preservation — home", url: "https://bluebonnetpreservation.com/", note: "Athens location, weekday hours, service overview and published process timing." },
      { name: "Bluebonnet Animal Preservation — services", url: "https://bluebonnetpreservation.com/pages/services", note: "Private versus communal cremation, preparation guidance and freeze-dry process description." },
      { name: "Bluebonnet Animal Preservation — pricing", url: "https://bluebonnetpreservation.com/pages/pricing", note: "Weight/size-based quote policy, deposit terms and listed preservation categories." },
      { name: "Bluebonnet Animal Preservation — about", url: "https://bluebonnetpreservation.com/pages/about", note: "First-party business purpose and Athens community context." },
    ],
    methodology: "TexasDefined reviewed the operator's current home, services, pricing and about pages and separated durable service descriptions from mutable operational details. Claims about timing, deposits, species accepted and care instructions are attributed to the business rather than presented as independent veterinary or scientific advice. Local context is connected through TexasDefined's Henderson County and Athens authority pages.",
  },
  "phenix-knives-bellville": {
    title: "Phenix Knives in Bellville",
    canonicalPath: "/article/phenix-knives-bellville",
    lastVerified: VERIFIED,
    freshness: "Hours, prices, class schedules and walk-in activity availability are treated as operational and should be rechecked before travel.",
    quickFacts: [
      { label: "Location", value: "317 E. Main Street, Bellville, Austin County, Texas" },
      { label: "Primary experience", value: "Working bladesmith shop with hand-forged knives, demonstrations, classes and hands-on visitor activities" },
      { label: "Historic setting", value: "1891 blacksmith shop, as documented by the business and Bellville Chamber of Commerce" },
      { label: "Hands-on activity", value: "Souvenir horseshoe-knife experience currently advertised for ages 6+" },
      { label: "Last verified", value: VERIFIED },
    ],
    sources: [
      { name: "Phenix Knives — official site", url: "https://www.phenixknives.com/", note: "Current Bellville address, visitor offerings, hands-on knife activity and shop identity." },
      { name: "Phenix Knives — Blacksmith Demo Tour", url: "https://www.phenixknives.com/blacksmith-demo-tour/", note: "Current demonstration format, reservation information and group capacity." },
      { name: "Phenix Knives — contact", url: "https://www.phenixknives.com/contact/", note: "Current business contact and Bellville street address." },
      { name: "Bellville Chamber of Commerce — Phenix Knives", url: "https://business.bellville.com/members/member/phenix-knives-llc-2135", note: "Independent local corroboration of the business, 1891 shop and visitor activities." },
      { name: "Discover Bellville", url: "https://discoverbellville.com/", note: "Bellville visitor context identifying Phenix Knives as a local craftsmanship stop." },
    ],
    methodology: "TexasDefined verified current operating claims against Phenix Knives and cross-checked the Bellville address, historic-shop context and visitor role against local Bellville sources. The guide distinguishes a short visitor activity from formal instruction and avoids freezing changeable hours, prices or class availability into evergreen recommendations.",
  },
  "horses-on-the-beach-corpus-christi": {
    title: "Horses on the Beach in Corpus Christi",
    canonicalPath: "/article/horses-on-the-beach-corpus-christi",
    lastVerified: VERIFIED,
    freshness: "Ride schedules, prices, age rules and weather policies are operational and should be confirmed with the operator before booking.",
    quickFacts: [
      { label: "Location", value: "19136 Park Road 22, Corpus Christi, Texas" },
      { label: "Experience", value: "Guided horseback riding on the Padre Island shoreline" },
      { label: "Current ride formats", value: "One-hour beach rides plus a longer sunset ride" },
      { label: "Independent corroboration", value: "Visit Corpus Christi and the Library of Congress" },
      { label: "Last verified", value: VERIFIED },
    ],
    sources: [
      { name: "Horses on the Beach — beach rides", url: "https://www.horsesonthebeachcorpus.com/horseback-riding-beach-tours/", note: "Current ride formats, location, duration and participation information." },
      { name: "Horses on the Beach — sunset ride", url: "https://www.horsesonthebeachcorpus.com/sunset-horseback-ride/", note: "Current sunset-ride duration and age categories." },
      { name: "Visit Corpus Christi — beach activities", url: "https://www.visitcorpuschristi.com/beaches/activities/", note: "Official destination-marketing corroboration of the horseback-riding experience." },
      { name: "Visit Corpus Christi — Gulf beach activities", url: "https://www.visitcorpuschristi.com/blog/post/things-to-do-on-the-gulf-beaches-of-corpus-christi/", note: "2026 local tourism context for the operator as a Gulf-beach experience." },
      { name: "Library of Congress — Carol M. Highsmith archive", url: "https://www.loc.gov/item/2014633478/", note: "2014 archival photograph identifying Horses on the Beach and its Corpus Christi/Padre Island setting." },
    ],
    methodology: "TexasDefined checked current ride details against the operator, used Visit Corpus Christi to corroborate the business as a recognized local beach activity, and used the Library of Congress record to document the operation's longer presence on Padre Island. The guide deliberately sends readers back to the operator for weather, schedule, price and participation rules that can change quickly.",
  },
  "mum-queen-spring-texas-homecoming-mums": {
    title: "The Mum Queen in Spring",
    canonicalPath: "/article/mum-queen-spring-texas-homecoming-mums",
    lastVerified: VERIFIED,
    freshness: "Seasonal ordering details, products, pricing and rush availability are rechecked during homecoming season and should be confirmed directly before purchase.",
    quickFacts: [
      { label: "Maker", value: "Elizabeth Cleaver, The Mum Queen" },
      { label: "Base", value: "Spring, Harris County, Texas" },
      { label: "Experience", value: "More than 35 years making homecoming mums and garters, according to Cleaver" },
      { label: "Ordering", value: "Year-round orders; senior orders may begin as early as February, according to the current store page" },
      { label: "Independent reporting", value: "Houston Chronicle profile of Cleaver and the Texas mum-making industry" },
      { label: "Last verified", value: VERIFIED },
    ],
    sources: [
      { name: "The Mum Queen — About", url: "https://www.themumqueen.com/about", note: "Cleaver's background, years in the craft and maker-mentorship work." },
      { name: "The Mum Queen — Store", url: "https://www.themumqueen.com/store", note: "Current year-round ordering, consultation options, service area and senior-order timing." },
      { name: "The Mum Queen — Sales & Order Policy", url: "https://www.themumqueen.com/sales-order-policy", note: "Current ordering workflow, pickup timing and rush-order policy." },
      { name: "The Mum Queen — Contact", url: "https://www.themumqueen.com/contact", note: "Spring location and direct contact information." },
      { name: "Houston Chronicle — The Mum Queen", url: "https://www.houstonchronicle.com/explained/article/meet-mum-queen-ruling-texas-homecoming-tradition-21041372.php", note: "Independent 2025 profile of Cleaver, her Spring studio and the professional mum-making industry." },
      { name: "Houston Chronicle — Texas homecoming mums", url: "https://www.houstonchronicle.com/news/houston-texas/houston/article/history-texas-homecoming-mums-19730689.php", note: "Independent cultural context for the evolution and modern form of Texas homecoming mums." },
    ],
    methodology: "TexasDefined uses The Mum Queen's current first-party pages for ordering and business-specific details, then cross-checks the maker and cultural context against independent Houston Chronicle reporting. Older promotional copy is not treated as current availability. This guide covers the business and ordering process; TexasDefined's separate statewide homecoming-mum page owns the broader history and tradition intent.",
  },
  "whirlyball-hurst": {
    title: "WhirlyBall Hurst",
    canonicalPath: "/destination/whirlyball-hurst",
    lastVerified: VERIFIED,
    freshness: "Hours, open-play schedules, league dates, pricing and group availability can change and should be confirmed before travel.",
    quickFacts: [
      { label: "Location", value: "147 E Harwood Rd, Hurst, Tarrant County, Texas" },
      { label: "Core attraction", value: "WhirlyBall team game played in bumper-style WhirlyBugs with scoops and electronic scoring targets" },
      { label: "Additional activities", value: "Two-story LaserWhirld arena, arcade games and group-event space" },
      { label: "Published participation minimum", value: "Age 9+ and at least 4 feet tall for WhirlyBall, according to the operator" },
      { label: "Last verified", value: VERIFIED },
    ],
    sources: [
      { name: "WhirlyBall Texas — locations", url: "https://whirlyballtexas.com/locations/", note: "Current Hurst location, address and operating identity." },
      { name: "WhirlyBall Texas — how WhirlyBall works", url: "https://whirlyballtexas.com/whirlyball/", note: "Game format, WhirlyBug controls, scoring and participant requirements." },
      { name: "WhirlyBall Texas — LaserWhirld", url: "https://whirlyballtexas.com/lasertag/", note: "Laser-tag arena and related Hurst entertainment." },
      { name: "HEB Chamber of Commerce — WhirlyBall/LaserWhirld", url: "https://business.heb.org/list/member/whirlyball-laserwhirld-of-heb-11652", note: "Independent local corroboration of the Hurst venue and its Mid-Cities group-entertainment role." },
    ],
    methodology: "TexasDefined verifies the Hurst address, game format, participant requirements and related activities against WhirlyBall Texas, then uses the HEB Chamber of Commerce as independent local corroboration. Mutable schedules and prices are not frozen into evergreen copy; the operator remains the controlling source for current-day availability.",
  },
};

export function unusualBusinessAuthorityProfile(slug: string) {
  return unusualBusinessAuthorityProfiles[slug] ?? null;
}
