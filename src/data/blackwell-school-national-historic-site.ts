import type { Destination } from "./types";

/**
 * Blackwell School is a distinct NPS unit, not simply an attraction on Marfa's town page.
 * Source-checked 2026-10-17. The photograph is of the actual school and is credited
 * to its federal creator; no unlicensed photo or representative AI hero is used.
 */
export const blackwellSchoolNationalHistoricSite: Destination = {
  id: "nps-blackwell-school-marfa",
  brandId: "texasdefined",
  slug: "blackwell-school-national-historic-site",
  name: "Blackwell School National Historic Site",
  category: "historic-sites",
  region: "big-bend",
  nearestTown: "Marfa",
  county: "Presidio",
  coordinates: { lat: 30.3059, lng: -104.0221 },
  address: "501 South Abbott Street, Marfa, TX 79843",
  hero: {
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d0/NPS_photo_of_Blackwell_School.jpg",
    alt: "The original Blackwell School building in Marfa, preserved as a National Historic Site",
    width: 1600, height: 900,
    credit: "David Larson / U.S. National Park Service · U.S. government public domain · Wikimedia Commons",
  },
  summary: "Visit Marfa's surviving segregated school and hear Mexican American students' accounts of education, language suppression and community preservation at a National Park Service historic site.",
  bestSeason: "Year-round, with opening days and the availability of tours more important than season; check the National Park Service schedule before traveling.",
  entryNote: "The NPS lists Saturday and Sunday opening from noon to 4 p.m. and weekday visits by advance arrangement, subject to staffing and closures. Weekday tour requests should be made at least one month ahead; confirm current hours directly.",
  highlights: [
    "Original 1909 adobe schoolhouse and 1927 Band Hall",
    "Student and teacher photographs, recollections and interpretive exhibits",
    "A Mexican American civil-rights history stop in residential Marfa",
    "A visit pairing naturally with Fort Davis National Historic Site"
  ],
  body: [
    "Blackwell School preserves a difficult but indispensable part of Marfa's history. Mexican and Mexican American children were educated in a separate school here during an era when local practices, rather than a statewide law mandating segregated Mexican schools, shaped their access to education. Students remembered community and valued teachers as well as unequal treatment and rules suppressing Spanish. A thoughtful visit makes room for those different experiences without romanticizing the system that separated children.",
    "The surviving 1909 schoolhouse and 1927 classroom building known as the Band Hall are themselves part of the evidence. Inside, National Park Service interpretation uses photographs, historical material and student and teacher accounts to explain who studied here, how the community changed and why former pupils worked to preserve the site. Blackwell School's national designation recognizes this history as part of a broader American story, not merely as a local school museum.",
    "The school's location matters for planning. NPS lists the site at 501 South Abbott Street at the intersection of Abbott and Waco in South Marfa, not at the post-office address in Fort Davis used by its administering office. Visitors driving from central Marfa can follow NPS directions to the neighborhood and use street parking where lawful. Avoid parking on school grounds or blocking nearby residents' access.",
    "This is a historic building visit, not a conventional all-day national-park outing. NPS lists ordinary public hours on Saturday and Sunday from noon to 4 p.m.; weekday tours are conditional on staff availability and advance request. Check the official Basic Information page and closure notices before building a Marfa road trip around a specific hour. There is no public camping at the site.",
    "Access needs careful description: the NPS says an entrance ramp and functional restroom exist, but neither currently meets full accessibility requirements, and the historic buildings present barriers. Visitors who need step-free or other accommodations should consult the park before travel rather than relying on a generic 'accessible' label. Preservation work can also affect which rooms are open.",
    "For context, connect the Blackwell visit to Marfa's courthouse, neighborhoods and wider Presidio County history. A second history stop can be Fort Davis National Historic Site, about 20 miles northeast according to NPS directions. Pairing the two adds a different frontier and regional history perspective without suggesting that Blackwell itself has expansive trails, picnic grounds or a fee-based park experience."
  ],
  managingAuthority: "National Park Service",
  officialUrl: "https://www.nps.gov/blsc/",
  sourceCheckedAt: "2026-10-17",
  directions: "The public entrance is at 501 S. Abbott Street, near Waco Street in South Marfa. Street parking is listed by the NPS; do not use the Fort Davis mailing address as a GPS destination.",
  accessibilityNotes: "NPS states that both historic buildings have accessibility limitations and that the ramp and restroom do not yet fully meet accessibility requirements. Contact the park before visiting if accommodations are needed.",
  authorityGuide: {
    whyItMatters: "A nationally preserved account of Mexican American school segregation, language, community persistence and historic preservation told where students attended class.",
    assessment: {
      recommendedVisit: "Allow time for the exhibits and student accounts during confirmed open hours; combine with Marfa history rather than treating it as an all-day outdoor park.",
      physicalEffort: "Low",
      weatherExposure: "Mixed indoor/outdoor",
      planningLevel: "High",
      familyFit: "A strong discussion-oriented visit for families prepared to explore discrimination, education and local history.",
      firstTimeValue: "Most useful when the buildings are open and interpretive exhibits are available; do not substitute a drive-by for the visit."
    },
    itineraries: [
      { label: "Focused school visit", duration: "About 45-75 minutes", steps: ["Confirm today's operating hours with NPS", "Park legally on the nearby street", "Explore exhibits and accounts inside the surviving school buildings", "Reflect on the students' and preservation advocates' perspectives"] },
      { label: "Marfa history half-day", duration: "About 3-4 hours", steps: ["Visit Blackwell during confirmed hours", "Walk Marfa's historic civic core", "Add a local museum or cultural-history stop after checking its hours", "Finish with a meal in Marfa"] },
      { label: "Two-site NPS history day", duration: "Full day", steps: ["Reserve a suitable morning or afternoon for Blackwell's published hours", "Drive toward Fort Davis using NPS directions", "Explore Fort Davis National Historic Site during its own confirmed hours", "Return before dark with adequate fuel and water for West Texas roads"] }
    ],
    sources: [
      { label: "NPS — site and significance", url: "https://www.nps.gov/blsc/", scope: "Designation and historical interpretation" },
      { label: "NPS — basic information", url: "https://www.nps.gov/blsc/planyourvisit/basicinfo.htm", scope: "Public days, hours and advance weekday tours" },
      { label: "NPS — directions", url: "https://www.nps.gov/blsc/planyourvisit/directions.htm", scope: "501 S. Abbott Street and street parking" },
      { label: "NPS — accessibility", url: "https://www.nps.gov/blsc/planyourvisit/accessibility.htm", scope: "Historic-building barriers and visitor accommodations" },
      { label: "Wikimedia Commons — federal photograph", url: "https://commons.wikimedia.org/wiki/File:NPS_photo_of_Blackwell_School.jpg", scope: "Exact-site photograph, author and U.S. government public-domain license" }
    ]
  },
  visitorFaqs: [
    { question: "Where is Blackwell School National Historic Site?", answer: "At 501 South Abbott Street in South Marfa, near Waco Street. Its managing office has a different mailing address in Fort Davis.", sourceUrl: "https://www.nps.gov/blsc/planyourvisit/directions.htm" },
    { question: "When can I visit Blackwell School?", answer: "NPS lists Saturday and Sunday from noon to 4 p.m. Weekday visits require advance arrangement and depend on staff availability. Check the current NPS schedule before traveling.", sourceUrl: "https://www.nps.gov/blsc/planyourvisit/basicinfo.htm" },
    { question: "Is Blackwell School wheelchair-accessible?", answer: "NPS reports a ramp and restroom but warns that they do not fully meet accessibility requirements and that historic-building barriers remain. Contact staff about specific needs.", sourceUrl: "https://www.nps.gov/blsc/planyourvisit/accessibility.htm" },
    { question: "Can I camp at Blackwell School?", answer: "No. NPS prohibits camping at this small historic site; look for permitted lodging or camping elsewhere in the Marfa and Fort Davis region.", sourceUrl: "https://www.nps.gov/blsc/learn/management/blsc-superintendent-s-compendium.htm" }
  ]
};
