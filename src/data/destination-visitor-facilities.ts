import type { Destination, DestinationVisitorFacilities } from "./types";

/**
 * Sitewide visitor-facility facts are deliberately *not* inferred from category,
 * imagery or generic state-park guidance. Every assertion has an operator link.
 * Absence of a record is reported as unverified, never interpreted as "none".
 */
export const VERIFIED_VISITOR_FACILITIES: Record<string, DestinationVisitorFacilities> = {
  "enchanted-rock-state-natural-area": {
    parking: {
      status: "verified",
      details: "Day-use parking includes a designated ADA space, though paths and terrain are uneven. Walk-in campsites are 25–100 yards from parking; reserve entry before arriving.",
      sourceUrl: "https://tpwd.texas.gov/state-parks/enchanted-rock/fees-facilities/accessibility-information",
      checkedAt: "2026-10-12"
    },
    restrooms: {
      status: "verified",
      details: "Walk-in camping has nearby shower restrooms; TPWD notes those facilities have an accessible parking space and sidewalk. Day-use restrooms are NOT wheelchair accessible. Primitive camping has composting toilets.",
      sourceUrl: "https://tpwd.texas.gov/state-parks/enchanted-rock/fees-facilities/accessibility-information",
      checkedAt: "2026-10-12"
    },
    officialMapUrl: "https://tpwd.texas.gov/state-parks/enchanted-rock/map",
    mapCheckedAt: "2026-10-12",
    visitorTips: ["For routes, use the downloadable trail and backcountry maps, not only the location pin.", "Check current Summit Trail closures and park alerts before departure."]
  },
  "space-center-houston": {
    parking: {
      status: "verified",
      details: "Space Center Houston lists paid onsite parking, including accessible parking near the entrance and an additional accessible side lot. Verify current rates before arrival.",
      sourceUrl: "https://spacecenter.org/accessibility-options/",
      checkedAt: "2026-10-12"
    },
    restrooms: {
      status: "verified",
      details: "Accessible restrooms are available throughout the visitor center. Family restrooms are in The Food Lab; the operator also describes adult changing support on request.",
      sourceUrl: "https://spacecenter.org/accessibility-options/",
      checkedAt: "2026-10-12"
    },
    officialMapUrl: "https://spacecenter.org/accessibility-options/",
    mapCheckedAt: "2026-10-12",
    visitorTips: ["Guest Services provides a free visitor map; the operator's app has an interactive map.", "NASA Tram Tour access is separately capacity-controlled and can change with operations."]
  },
  "moody-gardens": {
    parking: {
      status: "verified",
      details: "The official property map identifies several parking and drop-off areas. Review the property map and event-day instructions before arriving.",
      sourceUrl: "https://www.moodygardens.com/visitor-info/map-directions",
      checkedAt: "2026-10-12"
    },
    restrooms: {
      status: "verified",
      details: "Restroom locations are identified on Moody Gardens' current public property map; use the map to find the facilities nearest your ticketed attraction.",
      sourceUrl: "https://www.moodygardens.com/visitor-info/map-directions",
      checkedAt: "2026-10-12"
    },
    officialMapUrl: "https://www.moodygardens.com/visitor-info/map-directions",
    mapCheckedAt: "2026-10-12"
  },
  "padre-island-national-seashore": {
    parking: {
      status: "verified",
      details: "NPS lists vehicle, RV/bus and boat-trailer parking at Malaquite Visitor Center. This does not establish that remote down-island beach parking or driving is suitable today.",
      sourceUrl: "https://www.nps.gov/pais/planyourvisit/visitor-center.htm",
      checkedAt: "2026-10-12"
    },
    restrooms: {
      status: "verified",
      details: "Malaquite Visitor Center lists accessible restrooms, showers and drinking water. Do not assume any of these facilities exist along remote stretches of beach.",
      sourceUrl: "https://www.nps.gov/pais/planyourvisit/visitor-center.htm",
      checkedAt: "2026-10-12"
    },
    officialMapUrl: "https://www.nps.gov/pais/planyourvisit/maps.htm",
    mapCheckedAt: "2026-10-12"
  },
  "texas-state-aquarium": {
    parking: {
      status: "unverified",
      details: "The operator publishes directions to the North Beach entrance; specific parking availability and charges were not independently confirmed for this review.",
      sourceUrl: "https://www.texasstateaquarium.org/plan-your-visit/visitor-information/map-directions/"
    },
    restrooms: {
      status: "verified",
      details: "The aquarium's downloadable 2026 visitor map identifies restroom locations alongside exhibits, dining and presentations.",
      sourceUrl: "https://www.texasstateaquarium.org/plan-your-visit/visitor-information/map-directions/",
      checkedAt: "2026-10-12"
    },
    officialMapUrl: "https://www.texasstateaquarium.org/plan-your-visit/visitor-information/map-directions/",
    mapCheckedAt: "2026-10-12"
  },
  "hamilton-pool-preserve": {
    restrooms: {
      status: "verified",
      details: "Travis County's countywide parks amenities brochure identifies restrooms at Hamilton Pool. Contact the county to confirm current facility access; swimming remains separately restricted.",
      sourceUrl: "https://parks.traviscountytx.gov/parks/hamilton-pool-preserve",
      checkedAt: "2026-10-12"
    }
  }
};

/** Preserve more detailed destination-specific notes when already present. */
export function addVerifiedVisitorFacilities(destination: Destination): Destination {
  const facts = VERIFIED_VISITOR_FACILITIES[destination.slug];
  if (!facts) return destination;
  return {
    ...destination,
    visitorFacilities: {
      ...facts,
      ...destination.visitorFacilities,
      parking: destination.visitorFacilities?.parking ?? facts.parking,
      restrooms: destination.visitorFacilities?.restrooms ?? facts.restrooms,
    }
  };
}
