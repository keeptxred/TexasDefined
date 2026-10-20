import type { Destination } from "./types";

export const rayRobertsLakeStateParkAuthority: Destination = {
  id: "td-ray-roberts-lake-state-park",
  brandId: "texasdefined",
  slug: "ray-roberts-lake-state-park",
  name: "Ray Roberts Lake State Park",
  category: "state-parks",
  region: "prairies-lakes",
  nearestTown: "Pilot Point",
  county: "Denton",
  coordinates: { lat: 33.365671, lng: -97.012150 },
  address: "100 PW 4137, Pilot Point, TX 76258",
  hero: {
    src: "/images/explore/lakes-rivers/ray-roberts-lake-johnson-branch-unit.jpg",
    alt: "Lakeside scenery at the Johnson Branch Unit of Ray Roberts Lake State Park, North Texas",
    width: 1600, height: 1069,
    credit: "Morcup · CC BY-SA 4.0 · Wikimedia Commons",
  },
  summary: "A two-unit North Texas lake and trail park with distinct Isle du Bois and Johnson Branch campground loops, accessible campsites, beaches, paddling and evolving Greenbelt trail alerts.",
  bestSeason: "Spring and fall for hiking, birding and camping; TPWD lists March through November as the busiest part of the year.",
  entryNote: "Both principal units usually open 6 a.m.–10 p.m. TPWD lists $7 adult entry, free for children 12 and younger. Reservations are advised. The October 9, 2026 trail bulletin reports Greenbelt trails south of Overlook closed; recheck trail conditions and gate access before visiting.",
  highlights: [
    "Isle du Bois Unit — 100 PW 4137, Pilot Point, Denton County",
    "Johnson Branch Unit — 100 PW 4153, Valley View, Cooke County",
    "TPWD's separate 30/20-amp and 50/30/20-amp campsite loops",
    "Multiple beaches, lake access, paddling, fishing and mountain biking",
    "Hiking and horseback riding with distinct unit and Greenbelt maps",
    "Accessible campsite numbers and an all-terrain wheelchair loan at Isle du Bois",
  ],
  body: [
    "Ray Roberts Lake State Park is a network of destinations around a North Texas reservoir, not one entrance and one campground. The two primary developed units are Isle du Bois near Pilot Point in Denton County and Johnson Branch near Valley View in Cooke County. Satellite park units, including portions of the Greenbelt corridor, add more possibilities but require careful map reading. Select the exact unit and permitted activity before making a reservation or following an address.",
    "The Isle du Bois headquarters is at 100 PW 4137, Pilot Point, coordinates 33.365671, -97.012150. Its main electric camping inventory includes thirteen sites offering 20/30/50-amp connections and 102 sites offering 20/30-amp connections. The park identifies specific accessible sites: Deer Ridge 51 and Quail Run 148 in the higher-amperage group, and Deer Ridge 71, 75 and 100 plus Quail Run 132, 161 and 170 in the 20/30-amp group. Nearby shower restrooms are listed, but the distance from any one campsite depends on the loop. An additional 53 walk-in primitive sites require carrying equipment about one-eighth to one-quarter of a mile.",
    "Johnson Branch headquarters is at 100 PW 4153, Valley View, coordinates 33.429802, -97.056449. The park lists eleven higher-amperage electric sites, 93 regular electric sites and seventy primitive walk-in sites. Some primitive sites are as much as one-quarter mile from their parking. In Juniper Cove, regular-electric site 1 is described as accessible; in the Walnut area, site 40 is accessible. Multiple Johnson Branch locations have shower-restrooms, but never assume the same campground amenities, electrical service or parking arrangement at the opposite unit.",
    "For outdoor activities, choose among lake fishing, boating, paddling, beach swimming, horseback trails and hiking or mountain biking. TPWD's Johnson Branch trail guide identifies the primitive 2.6-mile one-way Dogwood Canyon Trail as moderate and notes that water is unavailable on the trail; a shorter Kid Fish Pond Trail provides a different outing. The Isle du Bois and Jordan trail maps cover separate routes. Isle du Bois offers an all-terrain wheelchair loan program that should be reserved by contacting the park directly.",
    "Travel plans must respond to closures. The official October 9, 2026 bulletin listed Johnson Branch DORBA trails open and Isle du Bois mountain-bike/equestrian trails open, but Greenbelt trails south of Overlook closed. Those conditions change after storms and repairs; download fresh official maps and verify current alerts, and do not promise that every trail or satellite recreation area is open. Both principal units typically operate 6 a.m. to 10 p.m., with entry capacity and reservation requirements varying by date.",
    "The lake is close enough to many Dallas–Fort Worth trips to make a weekend of swimming, camping or riding. The best itinerary pairs activities within the same chosen unit rather than incorrectly assuming the two separate entrances are adjacent. Use TPWD's complex map to orient yourself, then the campsite and trails map for that unit to choose a bathhouse, vehicle parking, accessible picnic area or boat launch. Related Ray Roberts fishing guides and nearby Denton and Cooke County guides should connect readers to those distinct trip needs."
  ],
  managingAuthority: "Texas Parks and Wildlife Department",
  officialUrl: "https://tpwd.texas.gov/state-parks/ray-roberts-lake",
  sourceCheckedAt: "2026-10-12",
  directions: "Isle du Bois: 100 PW 4137, Pilot Point (Denton County). Johnson Branch: 100 PW 4153, Valley View (Cooke County). Both use different entrances; the park has additional satellite and Greenbelt units with separate access.",
  accessibilityNotes: "TPWD names multiple accessible numbered campsites across the two developed units and lists an all-terrain wheelchair loan at Isle du Bois. Verify specific campsite access and the wheelchair availability before traveling.",
};
export function applyRayRobertsLakeStateParkAuthority(destination: Destination): Destination {
  if (destination.slug !== rayRobertsLakeStateParkAuthority.slug) return destination;
  return { ...destination, ...rayRobertsLakeStateParkAuthority, id: destination.id, featured: destination.featured };
}
