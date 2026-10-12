import type { Destination, DestinationVisitorFacilities } from "./types";

/**
 * Sitewide visitor-facility facts are deliberately *not* inferred from category,
 * imagery or generic state-park guidance. Every assertion has an operator link.
 * Absence of a record is reported as unverified, never interpreted as "none".
 */
export const VERIFIED_VISITOR_FACILITIES: Record<string, DestinationVisitorFacilities> = {
  "enchanted-rock-state-natural-area": {
    editorialFocus: ["parking", "restrooms", "map"],
    editorialHeading: "Trailhead access and backcountry facilities",
    editorialIntro: "The exposed summit hike, campsite access and primitive trails demand more preparation than the drive from Fredericksburg suggests.",
    parking: {
      status: "verified",
      details: "TPWD identifies an accessible day-use parking space but warns that the surrounding ground is rough and uneven. Some walk-in campsites are near parking; others require stairs or a footbridge. Ask the park about the specific site before reserving.",
      sourceUrl: "https://tpwd.texas.gov/state-parks/enchanted-rock/fees-facilities/accessibility-information",
      checkedAt: "2026-10-12"
    },
    restrooms: {
      status: "verified",
      details: "TPWD reports accessible parking and a sidewalk at the walk-in-camping restrooms, although the stall has a handrail rather than a fully accessible layout. Day-use restrooms are not wheelchair accessible. Confirm individual facilities before relying on them.",
      sourceUrl: "https://tpwd.texas.gov/state-parks/enchanted-rock/fees-facilities/accessibility-information",
      checkedAt: "2026-10-12"
    },
    officialMapUrl: "https://tpwd.texas.gov/state-parks/enchanted-rock/map",
    mapCheckedAt: "2026-10-12",
    visitorTips: ["For routes, use the downloadable trail and backcountry maps, not only the location pin.", "Check current Summit Trail closures and park alerts before departure."]
  },
  "space-center-houston": {
    editorialFocus: ["parking"],
    editorialHeading: "Arriving at Space Center Houston",
    editorialIntro: "The center has separate entry, paid onsite parking and NASA tour check-in procedures; review these before choosing your arrival time.",
    parking: {
      status: "verified",
      details: "Space Center Houston lists paid onsite parking, including accessible parking near the entrance and an additional accessible side lot. Verify current rates before arrival.",
      sourceUrl: "https://spacecenter.org/accessibility-options/",
      checkedAt: "2026-10-12"
    },
    officialMapUrl: "https://spacecenter.org/accessibility-options/",
    mapCheckedAt: "2026-10-12",
    visitorTips: ["Guest Services provides a free visitor map; the operator's app has an interactive map.", "NASA Tram Tour access is separately capacity-controlled and can change with operations."]
  },
  "moody-gardens": {
    editorialFocus: ["parking", "map"],
    editorialHeading: "Getting around the Moody Gardens campus",
    editorialIntro: "The pyramids and other attractions occupy separate buildings. Campus access, parking and the operator's map help when choosing a ticketed itinerary.",
    parking: {
      status: "verified",
      details: "Moody Gardens offers free self-parking in surface lots across the property. Premium covered parking and valet options cost extra; accessible parking is listed in the Central and West lots and parking garage. Rates and availability may change.",
      sourceUrl: "https://www.moodygardens.com/visitor-info/map-directions",
      checkedAt: "2026-10-12"
    },
    officialMapUrl: "https://www.moodygardens.com/visitor-info/map-directions",
    mapCheckedAt: "2026-10-12"
  },
  "padre-island-national-seashore": {
    editorialFocus: ["parking", "restrooms", "map"],
    editorialHeading: "Malaquite facilities versus the remote beach",
    editorialIntro: "A visit near Malaquite Visitor Center is very different from remote beach driving and primitive camping. Know where developed facilities end before traveling south.",
    parking: {
      status: "verified",
      details: "NPS lists vehicle, RV/bus and boat-trailer parking at Malaquite Visitor Center. This does not establish that remote down-island beach parking or driving is suitable today.",
      sourceUrl: "https://www.nps.gov/pais/planyourvisit/basicinfo.htm",
      checkedAt: "2026-10-12"
    },
    restrooms: {
      status: "verified",
      details: "Malaquite Visitor Center lists accessible restrooms, showers and drinking water. Do not assume any of these facilities exist along remote stretches of beach.",
      sourceUrl: "https://www.nps.gov/pais/planyourvisit/basicinfo.htm",
      checkedAt: "2026-10-12"
    },
    officialMapUrl: "https://www.nps.gov/pais/planyourvisit/maps.htm",
    mapCheckedAt: "2026-10-12"
  },
  "texas-state-aquarium": {
    editorialFocus: ["map"],
    editorialHeading: "Finding your way through the exhibits",
    editorialIntro: "The official visitor map helps coordinate animal presentations and galleries, rather than assuming every experience is available at once.",
    officialMapUrl: "https://www.texasstateaquarium.org/plan-your-visit/visitor-information/map-directions/",
    mapCheckedAt: "2026-10-12"
  },

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
