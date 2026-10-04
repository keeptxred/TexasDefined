import {
  lakeConroeAccess,
  lakeConroeBoatingNotes,
  lakeConroeCamping,
  lakeConroeFish,
  lakeConroeHabitat,
  lakeConroeNearby,
  lakeConroeOverview,
  lakeConroeRegulations,
  lakeConroeReportSnapshot,
  lakeConroeSectionMeta,
  lakeConroeSources,
} from "./lake-conroe-prototype";
import { LAKE_CONROE_SECTION_SLUGS, LAKE_CONROE_VERIFIED_AT } from "./lake-conroe-routing";

const lakeConroePageCopy = {
  heroEyebrow: "Texas Defined Fishing · Piney Woods",
  overview: {
    eyebrow: "At a glance",
    heading: "A fishing lake with two very different personalities.",
    intro: "The developed lower lake is built around open water, bulkheads, docks and marinas. Farther north, the reservoir reaches into Sam Houston National Forest and the old river channel becomes more timber-oriented. That difference matters for both fishing strategy and boat navigation.",
    mapEyebrow: "Map & water",
    openMapLabel: "Open Lake Conroe map →",
    liveLevelLabel: "Live lake level →",
    habitatEyebrow: "Cover & structure",
    habitatHeading: "What the water looks like to a fish.",
    fishEyebrow: "Fish Lake Conroe",
    fishHeading: "The core targets.",
    fishLinkLabel: "Full fish guide →",
    planning: [
      { title: "Launch the boat", text: "Compare verified ramps, fees and operators before you tow to the lake.", label: "Open guide →" },
      { title: "Check the rules", text: "Lake Conroe has reservoir-specific fishing limits, including a special largemouth rule.", label: "Open guide →" },
      { title: "Stay near the water", text: "Start with verified national-forest camping and day-use options.", label: "Open guide →" },
    ],
  },
  fishSection: {
    eyebrow: "Species & seasons",
    heading: "Fish the pattern, not just the species name.",
    intro: "These are durable seasonal patterns from official fisheries guidance, not a claim about today's bite. For genuinely current conditions, use a dated report when one is available.",
  },
  accessSection: {
    eyebrow: "Verified launch points",
    heading: "Choose the ramp before you leave home.",
    intro: "TPWD's access inventory mixes federal, state and private facilities. Fees and operating status can change, so each listing keeps the managing source visible rather than presenting the directory as real-time.",
    verifyLabel: "Verify with source →",
  },
  boatingSection: {
    eyebrow: "Before you launch",
    heading: "Lake level, timber and clean-drain-dry all matter here.",
    liveLevelLabel: "Check live lake level →",
    accessLabel: "Compare boat ramps →",
  },
  regulationsSection: {
    eyebrow: "Verified rules snapshot",
    heading: "Use this as a planning summary—not a substitute for the Outdoor Annual.",
    introBeforeDate: "The limits below were checked against TPWD on",
    introAfterDate: "Regulations can change. Confirm the official Lake Conroe page before fishing.",
    grassCarp: "TPWD lists a Triploid Grass Carp Permit for Lake Conroe. Any grass carp caught must be returned to the water immediately and unharmed.",
    officialLabel: "Open official Lake Conroe regulations →",
  },
  campingSection: {
    eyebrow: "Stay near the lake",
    heading: "Start with the public-land options we can verify.",
    intro: "Rather than presenting a generic hotel list, this prototype begins with official national-forest recreation areas tied directly to Lake Conroe.",
    officialLabel: "Check official details →",
  },
  nearbySection: {
    eyebrow: "Build a bigger trip",
    heading: "Lake Conroe can anchor more than a day on the water.",
    officialLabel: "Official site →",
    internalLabel: "TexasDefined guide →",
  },
  reportsSection: {
    eyebrow: "Fishing reports",
    heading: "Latest available fishing report",
    emptyHeading: "No recent report is available.",
    tpwdLabel: "View TPWD fishing reports →",
    requirementsHeading: "What each report includes",
    requirements: [
      "Original publication date.",
      "Named source or contributor.",
      "Species activity when supplied.",
      "Water conditions when supplied.",
    ],
  },
  guidesSection: {
    eyebrow: "Local expertise",
    heading: "Only verified guide profiles belong in the directory.",
    verifiedLabel: "Verified listing",
    websiteLabel: "Guide website →",
    emptyHeading: "No Lake Conroe guide has cleared the verified-listing gate yet.",
    emptyBody: "We will not fill this page with scraped names or implied endorsements. Local guides can submit a profile for verification, species/lake matching and future contributor access.",
    partnerLabel: "Partner with TexasDefined →",
    sponsorshipEyebrow: "Sponsorship policy",
    sponsorshipBody: "Paid placement never changes the verified-listing requirement. Future sponsored guide positions must be labeled as sponsored and remain separate from editorial fishing guidance.",
  },
  sourcesSection: {
    eyebrow: "Source transparency",
    body: "Official facts are kept separate from live conditions. Water levels, ramp availability, closures, regulations and fishing activity can change after this verification date.",
  },
} as const;

export function loadLakeConroePageDataServer() {
  return {
    verifiedAt: LAKE_CONROE_VERIFIED_AT,
    sections: LAKE_CONROE_SECTION_SLUGS.map((slug) => ({ slug, ...lakeConroeSectionMeta[slug] })),
    overview: lakeConroeOverview,
    habitat: lakeConroeHabitat,
    boatingNotes: lakeConroeBoatingNotes,
    reportSnapshot: {
      ...lakeConroeReportSnapshot,
      summary: "No recent dated report was available at the last verification. Check TPWD for the latest official Lake Conroe fishing information; conditions can change quickly.",
    },
    sources: lakeConroeSources,
    fish: lakeConroeFish,
    access: lakeConroeAccess,
    regulations: lakeConroeRegulations,
    camping: lakeConroeCamping,
    nearby: lakeConroeNearby,
    copy: lakeConroePageCopy,
  };
}
