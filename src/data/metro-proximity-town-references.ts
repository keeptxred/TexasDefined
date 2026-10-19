import {
  isMetroProximityCollectionIndexReady,
  selectMetroProximityDestinations,
  type MetroProximityCollection,
  type MetroProximityMetro,
  type MetroProximityResult,
} from "./metro-proximity.ts";
import type { Destination, GeoPoint } from "./types";
import { getDallasSmallTownDrive, inDallasSmallTownDriveBand } from "./dallas-small-town-drives.ts";

export interface MetroProximityTownReference {
  metroSlug: string;
  slug: string;
  name: string;
  county: string;
  coordinates: GeoPoint;
  summary: string;
  bestFor: readonly string[];
  officialUrl: string;
  sourceCheckedAt: string;
}

export interface MetroProximityTownResult {
  town: MetroProximityTownReference;
  distanceMiles: number;
  distanceBand: MetroProximityResult["distanceBand"];
}

const sourceCheckedAt = "2026-10-04";

/**
 * Geographic town references fill discovery gaps where TexasDefined does not
 * yet have a full destination authority guide. They are intentionally kept
 * separate from the Destination catalog so proximity pages can answer the
 * geography-first question without manufacturing thin destination pages.
 */
export const METRO_PROXIMITY_TOWN_REFERENCES: readonly MetroProximityTownReference[] = [
  { metroSlug: "dallas", slug: "mount-vernon", name: "Mount Vernon", county: "Franklin", coordinates: { lat: 33.1759063, lng: -95.22467 }, summary: "Mount Vernon centers on a traditional Franklin County courthouse square, local galleries and heritage sites. Its location on the I-30 corridor makes it a relaxed East Texas day-trip stop.", bestFor: ["courthouse square","local history","East Texas drive"], officialUrl: "https://www.franklincountytx.com/", sourceCheckedAt: "2026-10-19" },
  { metroSlug: "dallas", slug: "winnsboro", name: "Winnsboro", county: "Wood", coordinates: { lat: 32.9557674, lng: -95.291088 }, summary: "Winnsboro combines a walkable Main Street, a designated cultural arts district, local restaurants and seasonal events. Choose it for East Texas arts and a slower, independent-shop day.", bestFor: ["arts district","Main Street","local food"], officialUrl: "https://visitwinnsboro.com/", sourceCheckedAt: "2026-10-19" },
  { metroSlug: "dallas", slug: "palestine", name: "Palestine", county: "Anderson", coordinates: { lat: 31.762, lng: -95.631 }, summary: "Palestine offers a preserved historic core, independent restaurants, scenic dogwood-season walks and the Texas State Railroad experience. Reserve train excursions ahead and check the visitor center calendar.", bestFor: ["historic downtown","Texas State Railroad","dogwood season"], officialUrl: "https://www.visitpalestine.com/", sourceCheckedAt: "2026-10-19" },
  { metroSlug: "dallas", slug: "graham", name: "Graham", county: "Young", coordinates: { lat: 33.1019095, lng: -98.577717 }, summary: "Graham is known for its exceptionally large downtown square, independent shops and West Texas-edge history. Nearby lakes and the Old Post Office Museum make it a versatile extended day or overnight trip.", bestFor: ["large historic square","Old Post Office Museum","lake country"], officialUrl: "https://visitgrahamtexas.com/", sourceCheckedAt: "2026-10-19" },
  { metroSlug: "dallas", slug: "clarksville", name: "Clarksville", county: "Red River", coordinates: { lat: 33.6109772, lng: -95.05612 }, summary: "Clarksville is a historic Red River County seat with a traditional Main Street and regional heritage sites. Make this a deliberately slower Northeast Texas history outing rather than a quick shopping stop.", bestFor: ["Main Street history","Red River heritage","nature trails"], officialUrl: "https://clarksvilletx.com/", sourceCheckedAt: "2026-10-19" },
  { metroSlug: "dallas", slug: "breckenridge", name: "Breckenridge", county: "Stephens", coordinates: { lat: 32.7565875, lng: -98.912136 }, summary: "Breckenridge has early Texas oil-boom history, a Stephens County courthouse, old brick downtown streets and a regional aviation legacy. Allow most of a day and confirm individual museum hours.", bestFor: ["oil-boom history","courthouse square","aviation heritage"], officialUrl: "https://www.breckenridgetx.gov/", sourceCheckedAt: "2026-10-19" },
  { metroSlug: "dallas", slug: "comanche", name: "Comanche", county: "Comanche", coordinates: { lat: 31.9004145, lng: -98.60464 }, summary: "Comanche is a Central Texas courthouse town with a county history museum, historic commercial blocks and local parks. Its heritage and surrounding countryside make it a slower-paced southwest trip.", bestFor: ["history museum","courthouse town","local parks"], officialUrl: "https://www.comanchechamber.org/explorecomanche", sourceCheckedAt: "2026-10-19" },
  { metroSlug: "dallas", slug: "crockett", name: "Crockett", county: "Houston", coordinates: { lat: 31.31824, lng: -95.45661 }, summary: "Crockett is the seat of historic Houston County and a starting point for Davy Crockett National Forest country. Pair its downtown history and local shopping with a separately planned forest stop.", bestFor: ["oldest-county history","Piney Woods","historic downtown"], officialUrl: "https://www.crocketttexas.org/community/page/tourism-attractions", sourceCheckedAt: "2026-10-19" },
  { metroSlug: "dallas", slug: "ennis", name: "Ennis", county: "Ellis", coordinates: { lat: 32.3293, lng: -96.6253 }, summary: "Ennis has a brick-street downtown, official bluebonnet trails in spring, the historic railroad center and nearby Lake Bardwell. It makes a manageable southbound day out of Dallas without a long highway commitment.", bestFor: ["bluebonnet trails","historic Main Street","Lake Bardwell"], officialUrl: "https://www.ennistx.gov/departments/Tourism", sourceCheckedAt: "2026-10-19" },
  { metroSlug: "dallas", slug: "waxahachie", name: "Waxahachie", county: "Ellis", coordinates: { lat: 32.3865, lng: -96.8483 }, summary: "Waxahachie offers the Ellis County Courthouse, preserved Victorian homes, a historic downtown square, restaurants and seasonal festivals. It is a substantial short drive south of Dallas for architecture and shopping.", bestFor: ["courthouse architecture","historic downtown","seasonal festivals"], officialUrl: "https://www.waxahachiecvb.com/", sourceCheckedAt: "2026-10-19" },
  { metroSlug: "dallas", slug: "kaufman", name: "Kaufman", county: "Kaufman", coordinates: { lat: 32.589, lng: -96.309 }, summary: "Kaufman is the Kaufman County seat southeast of Dallas, where a traditional courthouse square, historic center and small-town shops suit a relaxed morning or lunch excursion away from the Metroplex.", bestFor: ["courthouse town","relaxed lunch","local history"], officialUrl: "https://www.kaufmantx.org/", sourceCheckedAt: "2026-10-19" },
  { metroSlug: "dallas", slug: "terrell", name: "Terrell", county: "Kaufman", coordinates: { lat: 32.7359, lng: -96.2753 }, summary: "Terrell offers walkable historic downtown shops, the No. 1 British Flying Training School Museum and local architectural history. It is an easy eastbound stop on routes toward Canton and East Texas.", bestFor: ["aviation history","historic shops","heritage museum"], officialUrl: "https://cityofterrell.org/", sourceCheckedAt: "2026-10-19" },
  { metroSlug: "dallas", slug: "greenville", name: "Greenville", county: "Hunt", coordinates: { lat: 33.1384, lng: -96.1108 }, summary: "Greenville has a traditional downtown, historic walking-tour route, public murals and arts venues. It is a useful northeast day-trip anchor with restaurants and Hunt County heritage.", bestFor: ["public murals","historic walking","arts and food"], officialUrl: "https://www.greenvilletx.gov/1459/Visit", sourceCheckedAt: "2026-10-19" },
  { metroSlug: "dallas", slug: "canton", name: "Canton", county: "Van Zandt", coordinates: { lat: 32.5565, lng: -95.8633 }, summary: "Canton is known for First Monday Trade Days but also offers a downtown, local dining and heritage attractions. The market follows its own monthly calendar; plan around actual dates rather than assuming daily stalls.", bestFor: ["First Monday Trade Days","antique shopping","small-town dining"], officialUrl: "https://www.visitcantontx.com/", sourceCheckedAt: "2026-10-19" },
  { metroSlug: "dallas", slug: "granbury", name: "Granbury", county: "Hood", coordinates: { lat: 32.441, lng: -97.7942 }, summary: "Granbury combines a preserved courthouse square, performance venues and Lake Granbury waterfront with restaurants and independent shops. It suits a substantial westbound day trip or an unhurried overnight.", bestFor: ["historic town square","lakefront","theater and dining"], officialUrl: "https://www.visitgranbury.com/", sourceCheckedAt: "2026-10-19" },
  { metroSlug: "dallas", slug: "glen-rose", name: "Glen Rose", county: "Somervell", coordinates: { lat: 32.2346, lng: -97.7553 }, summary: "Glen Rose combines a historic downtown, Paluxy River scenery and nearby Dinosaur Valley State Park with family attractions such as Fossil Rim. Outdoor stops need their own access and reservation checks.", bestFor: ["dinosaur tracks","historic downtown","family outdoors"], officialUrl: "https://visitglenrosetx.com/", sourceCheckedAt: "2026-10-19" },
  { metroSlug: "dallas", slug: "denison", name: "Denison", county: "Grayson", coordinates: { lat: 33.7557, lng: -96.5367 }, summary: "Denison is a North Texas rail and presidential-history town with a Main Street district, art galleries and access to Lake Texoma. It works well for a history-and-water outing north of Dallas.", bestFor: ["Main Street","Eisenhower history","Lake Texoma"], officialUrl: "https://discoverdenison.com/", sourceCheckedAt: "2026-10-19" },
  { metroSlug: "dallas", slug: "mineola", name: "Mineola", county: "Wood", coordinates: { lat: 32.6632, lng: -95.4883 }, summary: "Mineola offers a compact historic downtown, railroad heritage and nearby nature attractions, including the Mineola Nature Preserve. It is a good East Texas starting point for walkers and railroad fans.", bestFor: ["railroad history","downtown shops","nature preserve"], officialUrl: "https://www.mineola.com/", sourceCheckedAt: "2026-10-19" },
  { metroSlug: "dallas", slug: "jefferson", name: "Jefferson", county: "Marion", coordinates: { lat: 32.7574, lng: -94.3452 }, summary: "Jefferson rewards an East Texas history trip with preserved nineteenth-century streetscapes, riverport stories, museums and independent shops. The drive is substantial enough to justify a full day or a night away.", bestFor: ["historic riverport","museums","overnight escape"], officialUrl: "https://visitjeffersontexas.com/", sourceCheckedAt: "2026-10-19" },
  { metroSlug: "san-angelo", slug: "miles", name: "Miles", county: "Runnels", coordinates: { lat: 31.5993, lng: -100.1823 }, summary: "Miles is a small Runnels County community east of San Angelo with a historic brick-street core and an easy location for a short Concho Valley drive without committing to a full-day trip.", bestFor: ["short drives", "historic downtown", "Concho Valley scenery"], officialUrl: "https://www.milestexas.com/", sourceCheckedAt },
  { metroSlug: "san-angelo", slug: "christoval", name: "Christoval", county: "Tom Green", coordinates: { lat: 31.1932, lng: -100.4998 }, summary: "Christoval is a small South Concho River community south of San Angelo where river recreation, local history and a compact village setting make it one of the most natural close-in escapes from the city.", bestFor: ["river time", "easy half-day trip", "local history"], officialUrl: "https://www.christovaltx.com/", sourceCheckedAt },
  { metroSlug: "san-angelo", slug: "mertzon", name: "Mertzon", county: "Irion", coordinates: { lat: 31.2618, lng: -100.8173 }, summary: "Mertzon is the Irion County seat west of San Angelo, set along Spring Creek in ranch country with a small courthouse-town center and a practical role as a quick westbound Concho Valley outing.", bestFor: ["courthouse towns", "ranch country", "short westbound drive"], officialUrl: "https://www.mertzontexas.com/", sourceCheckedAt },
  { metroSlug: "san-angelo", slug: "robert-lee", name: "Robert Lee", county: "Coke", coordinates: { lat: 31.8951, lng: -100.4840 }, summary: "Robert Lee is the Coke County seat north of San Angelo, pairing a small courthouse-town setting with nearby Lake E. V. Spence and the open Colorado River country of west-central Texas.", bestFor: ["lake access", "courthouse towns", "west-central Texas drives"], officialUrl: "https://www.robertleetexas.org/", sourceCheckedAt },
  { metroSlug: "san-angelo", slug: "bronte", name: "Bronte", county: "Coke", coordinates: { lat: 31.8874, lng: -100.2920 }, summary: "Bronte is a small Coke County town northeast of San Angelo with railroad-era landmarks, nearby Fort Chadbourne history and access to the Oak Creek Lake landscape for a varied short day trip.", bestFor: ["Texas history", "railroad heritage", "lake country"], officialUrl: "https://www.brontetexas.org/", sourceCheckedAt },
  { metroSlug: "san-angelo", slug: "paint-rock", name: "Paint Rock", county: "Concho", coordinates: { lat: 31.5085, lng: -99.9204 }, summary: "Paint Rock is the Concho County seat east of San Angelo, known regionally for the nearby Indigenous pictograph site and a quiet courthouse-town setting along the Concho River corridor.", bestFor: ["regional history", "courthouse towns", "Concho River country"], officialUrl: "https://paintrock.texas.gov/visit-paint-rock", sourceCheckedAt },
  { metroSlug: "san-angelo", slug: "ballinger", name: "Ballinger", county: "Runnels", coordinates: { lat: 31.7382, lng: -99.9473 }, summary: "Ballinger is the Runnels County seat northeast of San Angelo, with a courthouse-centered historic district and enough local services to work as an easy small-town day trip or a stop on a longer regional loop.", bestFor: ["historic downtown", "courthouse architecture", "easy day trips"], officialUrl: "https://www.baltx.org/", sourceCheckedAt },
  { metroSlug: "san-angelo", slug: "eden", name: "Eden", county: "Concho", coordinates: { lat: 31.2163, lng: -99.8457 }, summary: "Eden sits southeast of San Angelo in Concho County and works as a quiet ranch-country stop with city parks, local history and a central position for exploring the broad agricultural landscape around the county.", bestFor: ["ranch-country drives", "parks", "regional loops"], officialUrl: "https://www.edentexas.com/", sourceCheckedAt },
  { metroSlug: "san-angelo", slug: "sterling-city", name: "Sterling City", county: "Sterling", coordinates: { lat: 31.8360, lng: -100.9848 }, summary: "Sterling City is the Sterling County seat northwest of San Angelo, a compact ranching community whose windmill identity and courthouse-town setting fit naturally into a longer West Texas day drive.", bestFor: ["courthouse towns", "ranching history", "West Texas scenery"], officialUrl: "https://www.sterlingcitytexas.com/", sourceCheckedAt },
  { metroSlug: "san-angelo", slug: "eldorado", name: "Eldorado", county: "Schleicher", coordinates: { lat: 30.8602, lng: -100.6009 }, summary: "Eldorado is the Schleicher County seat south of San Angelo, a small ranch-country town on US 277 that provides a practical courthouse, local-history and open-range stop on routes toward Sonora.", bestFor: ["ranch country", "courthouse towns", "US 277 road trips"], officialUrl: "https://www.eldorado-texas.com/", sourceCheckedAt },
  { metroSlug: "san-angelo", slug: "winters", name: "Winters", county: "Runnels", coordinates: { lat: 31.9565, lng: -99.9623 }, summary: "Winters is a Runnels County town northeast of San Angelo with a traditional small-town center and nearby Elm Creek Reservoir, making it useful for a relaxed regional drive with a water-and-outdoors component.", bestFor: ["small-town drives", "reservoir access", "regional history"], officialUrl: "https://www.cityofwinters.net/", sourceCheckedAt },
  { metroSlug: "san-angelo", slug: "big-lake", name: "Big Lake", county: "Reagan", coordinates: { lat: 31.1915, lng: -101.4604 }, summary: "Big Lake is the Reagan County seat west of San Angelo and an important Permian Basin history stop, with the Santa Rita No. 1 story giving the town a clear reason to include it on a longer regional drive.", bestFor: ["oil history", "courthouse towns", "longer West Texas drives"], officialUrl: "https://sites.google.com/cityofbiglaketx.org/cityofbiglaketx/home", sourceCheckedAt },
];

function pointDistanceMiles(origin: GeoPoint, target: GeoPoint) {
  const radians = (value: number) => value * Math.PI / 180;
  const earthRadiusMiles = 3958.8;
  const dLat = radians(target.lat - origin.lat);
  const dLng = radians(target.lng - origin.lng);
  const leftLat = radians(origin.lat);
  const rightLat = radians(target.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(leftLat) * Math.cos(rightLat) * Math.sin(dLng / 2) ** 2;
  return earthRadiusMiles * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function distanceBand(miles: number): MetroProximityTownResult["distanceBand"] {
  if (miles <= 35) return "close-in";
  if (miles <= 80) return "easy-day-trip";
  return "longer-day-trip";
}

export function isSmallTownProximityCollection(collection: MetroProximityCollection) {
  return collection.slug === "small-towns" || collection.slug.startsWith("small-towns-");
}

export function getMetroProximityTownReferences(metroSlug: string) {
  return METRO_PROXIMITY_TOWN_REFERENCES.filter((town) => town.metroSlug === metroSlug);
}

export function selectMetroProximityTownReferences(metro: MetroProximityMetro, collection: MetroProximityCollection, destinationRows: MetroProximityResult[] = []): MetroProximityTownResult[] {
  if (!isSmallTownProximityCollection(collection)) return [];
  const destinationSlugs = new Set(destinationRows.map((row) => row.destination.slug));
  const destinationNames = new Set(destinationRows.flatMap((row) => [row.destination.name, row.destination.nearestTown]).map((value) => value.trim().toLowerCase()));
  const allowance = Math.max(0, collection.maxResults - destinationRows.length);
  const dallasRoadRing = metro.slug === "dallas" && /^small-towns-[123]-hours?$/.test(collection.slug);
  return getMetroProximityTownReferences(metro.slug)
    .filter((town) => !destinationSlugs.has(town.slug) && !destinationNames.has(town.name.toLowerCase()))
    .map((town) => ({ town, distanceMiles: pointDistanceMiles(metro.center, town.coordinates) }))
    .filter((row) => dallasRoadRing
      ? Boolean(getDallasSmallTownDrive(row.town.slug, row.town.name) && inDallasSmallTownDriveBand(collection.slug, getDallasSmallTownDrive(row.town.slug, row.town.name)!.minutes))
      : (collection.minimumMiles === 0 ? row.distanceMiles >= 0 : row.distanceMiles > collection.minimumMiles) && row.distanceMiles <= collection.radiusMiles)
    .sort((left, right) => dallasRoadRing
      ? getDallasSmallTownDrive(left.town.slug)!.minutes - getDallasSmallTownDrive(right.town.slug)!.minutes || left.town.name.localeCompare(right.town.name)
      : left.distanceMiles - right.distanceMiles || left.town.name.localeCompare(right.town.name))
    .slice(0, allowance)
    .map((row) => ({ ...row, distanceBand: distanceBand(row.distanceMiles) }));
}

export function isMetroProximityCollectionIndexReadyWithTownReferences(destinations: Destination[], metro: MetroProximityMetro, collection: MetroProximityCollection) {
  if (!isSmallTownProximityCollection(collection)) return isMetroProximityCollectionIndexReady(destinations, metro, collection);
  const destinationRows = selectMetroProximityDestinations(destinations, metro, collection);
  const townRows = selectMetroProximityTownReferences(metro, collection, destinationRows);
  const combinedCount = destinationRows.length + townRows.length;
  if (combinedCount < collection.minResults) return false;
  const slugs = [...destinationRows.map((row) => row.destination.slug), ...townRows.map((row) => row.town.slug)];
  if (new Set(slugs).size !== slugs.length) return false;
  const towns = [...destinationRows.map((row) => row.destination.nearestTown.trim().toLowerCase()).filter(Boolean), ...townRows.map((row) => row.town.name.trim().toLowerCase())];
  if (new Set(towns).size < collection.minTowns) return false;
  const counties = [
    ...destinationRows.map((row) => row.destination.county?.replace(/\s+County$/i, "").trim().toLowerCase()).filter((value): value is string => Boolean(value)),
    ...townRows.map((row) => row.town.county.replace(/\s+County$/i, "").trim().toLowerCase()),
  ];
  if (new Set(counties).size < collection.minCounties) return false;
  const destinationQuality = destinationRows.every((row) => row.destination.summary.trim().length >= 80 && Boolean(row.destination.hero?.src));
  const townQuality = townRows.every((row) => row.town.summary.trim().length >= 80 && Boolean(row.town.officialUrl));
  return destinationQuality && townQuality;
}
