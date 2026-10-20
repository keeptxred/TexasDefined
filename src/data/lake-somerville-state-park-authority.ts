import type { Destination } from "./types";

export const lakeSomervilleStateParkAuthority: Destination = {
  id: "td-lake-somerville-park-authority",
  brandId: "texasdefined",
  slug: "lake-somerville-state-park",
  name: "Lake Somerville State Park & Trailway",
  category: "state-parks",
  region: "prairies-lakes",
  nearestTown: "Somerville",
  county: "Burleson",
  coordinates: { lat: 30.308582, lng: -96.634692 },
  address: "14222 Park Road 57, Somerville, TX 77879",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lake_View_from_Lake_Somerville_SP_Texas_2023.jpg?width=1600",
    alt: "Lake Somerville viewed from Bluestem Bend Trail in the Birch Creek Unit, November 2023",
    width: 1600, height: 900,
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons · November 7, 2023",
  },
  summary: "Compare Lake Somerville's Birch Creek and Nails Creek camping, swimming, boat launches, equestrian access and the 13-mile connecting Trailway, with unit-specific parking, maps and water services.",
  bestSeason: "Spring and fall for camping, trailway riding, and birding; TPWD lists the first weekend of March through July 4 as the busiest season.",
  entryNote: "Both units usually open 6 a.m.–10 p.m. TPWD lists a $5 adult day-entry fee, free for children 12 and younger; horses cost extra. The park can reach capacity. Download separate Birch Creek, Nails Creek and Trailway maps and confirm active alerts.",
  highlights: [
    "Birch Creek Unit on north shore — 14222 Park Road 57, Somerville",
    "Nails Creek Unit on southwest shore — 6280 FM 180, Ledbetter",
    "13.11-mile multiuse Trailway between the two units",
    "Birch Creek: 99 electric campsites and accessible paths at named sites",
    "Nails Creek: equestrian campsites and 20 standard electric campsites",
    "Remote Trailway camps without water at Flag Pond and Wolf Pond",
  ],
  body: [
    "Lake Somerville State Park is not a single campground or one parking entrance. The main Birch Creek Unit is on the north shore, while Nails Creek occupies the southwest shore. A long 13.11-mile state Trailway and associated side trails link the two areas, and TPWD separately describes Somerville Public Hunting Land nearby. Travelers must decide which unit suits their goal before following a navigation app to a generic state-park pin.",
    "For Birch Creek, use 14222 Park Road 57, Somerville, with park headquarters at 30.308582, -96.634692. TPWD lists 99 regular electrical campsites in Yaupon, Post Oak and Old Hickory loops. Sites 32, 38, 46, 57, 62, 73, 87 and 101 have paved paths from parking to the picnic table, electric outlet and water spigot. Twenty-one electric sites offer 50 amps; the others offer 30 amps. An additional ten equestrian water campsites, including wheelchair-friendly sites 107 and 108, are distinct from the general electric campground.",
    "Nails Creek uses a different approach: 6280 FM 180, Ledbetter, with headquarters at 30.290719, -96.667214. The unit lists 20 electric campsites in Cedar Creek loop, plus 20 electric equestrian sites in Bent Tree and ten water-only equestrian sites. Horses are not mandatory for equestrian-site booking, but horse pens and site configurations still affect suitability. Nails Creek also has access to lake activities, group facilities and the western portions of the shared trail system. Consult unit-specific maps before assuming the same bathrooms, RV hookups or shoreline access on both shores.",
    "The Trailway itself serves hiking, mountain biking and horseback riding, but primitive camping there demands a different level of preparation. Flag Pond is about a mile from Newman Bottom parking and 4.5 miles from Nails Creek; Wolf Pond is about four miles from Birch Creek. TPWD states potable water is not available at these remote sites and lists chemical toilets. Some sites are first-come rather than bookable in advance. Choose exit points, daylight and turnaround plans before entering the Trailway, especially in warm weather.",
    "Fishing, kayaking, boating and designated lake swimming occur at both primary park units, but conditions change with water level, rainfall and posted alerts. TPWD publishes water-safety tips and dedicated maps for Birch Creek, Nails Creek and Trailway. The approach to Birch Creek from Austin via FM 60 includes a bridge near Deanville with a maximum clearance of 13 feet 4 inches, an important fact for tall RVs. Large trailers should check the route, current road restrictions and an exact site assignment before setting out.",
    "The lake and adjacent trails offer opportunities for birds, woodland habitats, outdoor riding and weekend camping close enough to build a broader Brenham–Somerville region visit. The authority of this guide depends on distinguishing those practical experiences, not implying every campsite offers the same services. Verify current gate hours, trail closures, lake conditions and official camping inventory ahead of the trip, and treat the source dates here as editorial checks rather than assurances of open-now conditions."
  ],
  managingAuthority: "Texas Parks and Wildlife Department",
  officialUrl: "https://tpwd.texas.gov/state-parks/lake-somerville",
  sourceCheckedAt: "2026-10-12",
  directions: "Birch Creek: 14222 Park Road 57 via FM 60 (13 ft 4 in bridge clearance near Deanville). Nails Creek: 6280 FM 180, Ledbetter. These are separate entrances on opposite sides of the lake, connected by a 13.11-mile trail, not a short road inside one park.",
  accessibilityNotes: "Birch Creek lists paved access paths at specific electric sites and wheelchair-friendly equestrian sites 107–108. Other campsite and shoreline accessibility differs by unit and should be verified with TPWD. The long unpaved Trailway is not an accessible replacement.",
};

export function applyLakeSomervilleStateParkAuthority(destination: Destination): Destination {
  if (destination.slug !== lakeSomervilleStateParkAuthority.slug) return destination;
  return { ...destination, ...lakeSomervilleStateParkAuthority, id: destination.id, featured: destination.featured };
}
