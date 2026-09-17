import { coastalPlaces, COASTAL_ZONE_LABELS, type CoastalAccess, type CoastalPlaceKind } from "./coastal-places";
import type { Destination, GeoPoint, ImageRef } from "./types";

/**
 * Coordinate evidence was reconciled on 2026-09-06 against official agency
 * maps where available and USGS/GNIS/OpenStreetMap-backed map records for
 * named beaches and local shoreline access points. Broad shoreline entities
 * intentionally use a representative public access point rather than a fake
 * centroid in the water.
 */
export const COASTAL_COORDINATES: Record<string, GeoPoint> = {
  "sea-rim-state-park": { lat: 29.675539, lng: -94.043525 },
  "mcfaddin-beach": { lat: 29.66195, lng: -94.09027 },
  "high-island-beach": { lat: 29.551317, lng: -94.372267 },
  "crystal-beach": { lat: 29.438283, lng: -94.6611 },
  "retillion-road-beach-access": { lat: 29.367333, lng: -94.760117 },
  "fort-travis-seashore-park": { lat: 29.358569, lng: -94.757973 },
  "east-beach-galveston": { lat: 29.32895, lng: -94.73482 },
  "stewart-beach": { lat: 29.30609, lng: -94.76799 },
  "galveston-seawall-beaches": { lat: 29.2858, lng: -94.7978 },
  "porretto-beach": { lat: 29.3015, lng: -94.77324 },
  "babes-beach": { lat: 29.2739, lng: -94.8305 },
  "galveston-pocket-park-1": { lat: 29.237739, lng: -94.878809 },
  "galveston-pocket-park-2": { lat: 29.22774, lng: -94.89492 },
  "galveston-pocket-park-3": { lat: 29.201906, lng: -94.926311 },
  "galveston-island-state-park-coast": { lat: 29.198755, lng: -94.956212 },
  "jamaica-beach": { lat: 29.18155, lng: -94.97204 },
  "san-luis-pass-beach": { lat: 29.08275, lng: -95.12231 },
  "sylvan-beach-park": { lat: 29.65326, lng: -95.00996 },
  "el-jardin-beach": { lat: 29.597721, lng: -94.986969 },
  "mooner-beach": { lat: 29.492869, lng: -94.911174 },
  "surfside-beach": { lat: 28.9507, lng: -95.2874 },
  "quintana-beach-county-park": { lat: 28.934576, lng: -95.302438 },
  "bryan-beach": { lat: 28.898583, lng: -95.350773 },
  "sargent-beach": { lat: 28.765278, lng: -95.623333 },
  "matagorda-beach": { lat: 28.61162, lng: -95.93969 },
  "matagorda-bay-nature-park": { lat: 28.61174, lng: -95.96289 },
  "palacios-bay-beach": { lat: 28.698523, lng: -96.217986 },
  "magnolia-beach": { lat: 28.560277, lng: -96.542754 },
  "lighthouse-beach-port-lavaca": { lat: 28.63896, lng: -96.61129 },
  "king-fisher-beach": { lat: 28.45263, lng: -96.40455 },
  "sunday-beach": { lat: 28.389628, lng: -96.401464 },
  "rockport-beach": { lat: 28.02974, lng: -97.03943 },
  "fulton-beach-park": { lat: 28.060278, lng: -97.033333 },
  "goose-island-state-park-coast": { lat: 28.133503, lng: -96.98428 },
  "san-jose-island": { lat: 28.000296, lng: -96.933599 },
  "ib-magee-beach-park": { lat: 27.832318, lng: -97.049978 },
  "port-aransas-beach": { lat: 27.82247, lng: -97.0592 },
  "tony-amos-city-beach": { lat: 27.79324, lng: -97.08542 },
  "mustang-island-state-park": { lat: 27.672162, lng: -97.175309 },
  "north-beach-corpus-christi": { lat: 27.82167, lng: -97.38636 },
  "mcgee-beach": { lat: 27.78589, lng: -97.39332 },
  "cole-park-beach": { lat: 27.77199, lng: -97.38829 },
  "oso-bay-coast": { lat: 27.6688, lng: -97.3315 },
  "whitecap-beach": { lat: 27.588053, lng: -97.217242 },
  "malaquite-beach": { lat: 27.44614, lng: -97.28757 },
  "padre-island-national-seashore-backcountry": { lat: 27.41533, lng: -97.30151 },
  "yarborough-pass": { lat: 27.20434, lng: -97.38929 },
  "south-padre-island-beaches": { lat: 26.113528, lng: -97.164556 },
  "isla-blanca-park": { lat: 26.07242, lng: -97.15883 },
  "andy-bowie-county-park": { lat: 26.14242, lng: -97.17008 },
  "ek-atwood-park": { lat: 26.16504, lng: -97.17305 },
  "boca-chica-beach": { lat: 25.99082, lng: -97.149917 },
};

export const COASTAL_COORDINATE_SOURCES: Record<string, string> = {
  "sea-rim-state-park": "https://tpwd.texas.gov/state-parks/sea-rim/map",
  "mcfaddin-beach": "https://www.topozone.com/texas/jefferson-tx/beach/mcfaddin-beach/",
  "high-island-beach": "https://pubs.usgs.gov/of/2011/1151/pdf/OFR-2011-1151.pdf",
  "crystal-beach": "https://oaktrust.library.tamu.edu/bitstreams/1f97c2c0-15ae-42ae-af7a-5b4424be863d/download",
  "retillion-road-beach-access": "https://oaktrust.library.tamu.edu/bitstreams/1f97c2c0-15ae-42ae-af7a-5b4424be863d/download",
  "fort-travis-seashore-park": "https://www.topozone.com/texas/galveston-tx/park/fort-travis-seashore-park/",
  "east-beach-galveston": "https://mapcarta.com/W520769261",
  "stewart-beach": "https://mapcarta.com/21814512",
  "galveston-seawall-beaches": "https://www.galvestontx.gov/1372/Beach-Access",
  "porretto-beach": "https://mapcarta.com/W9873760",
  "babes-beach": "https://www.visitgalveston.com/directory/babes-beach/",
  "galveston-pocket-park-1": "https://www.anyplaceamerica.com/directory/tx/galveston-county-48167/parks/sea-gull-shores-beach-pocket-park-1-1384963/",
  "galveston-pocket-park-2": "https://mapcarta.com/21691200",
  "galveston-pocket-park-3": "https://www.anyplaceamerica.com/directory/tx/galveston-county-48167/parks/sea-shell-beach-pocket-park-3-1384965/",
  "galveston-island-state-park-coast": "https://tpwd.texas.gov/state-parks/galveston-island/map",
  "jamaica-beach": "https://mapcarta.com/N356751650",
  "san-luis-pass-beach": "https://mapcarta.com/21798648",
  "sylvan-beach-park": "https://www.topozone.com/texas/harris-tx/park/sylvan-beach-park/",
  "el-jardin-beach": "https://pasadenatx.gov/Facilities/Facility/Details/El-Jardin-Beach-Park-55",
  "mooner-beach": "https://bestbeachesnearme.com/texas/",
  "surfside-beach": "https://www.tshaonline.org/handbook/entries/surfside-beach-tx",
  "quintana-beach-county-park": "https://www.brazoriacountytx.gov/departments/parks-department/quintana-beach",
  "bryan-beach": "https://www.topozone.com/texas/brazoria-tx/beach/bryan-beach/",
  "sargent-beach": "https://www.waterqualitydata.us/provider/STORET/21TXBCH/21TXBCH-MAT007/",
  "matagorda-beach": "https://mapcarta.com/W71239043",
  "matagorda-bay-nature-park": "https://mapcarta.com/W560591136",
  "palacios-bay-beach": "https://bestbeachesnearme.com/texas/",
  "magnolia-beach": "https://www.tshaonline.org/handbook/entries/magnolia-beach-tx",
  "lighthouse-beach-port-lavaca": "https://mapcarta.com/W519439018",
  "king-fisher-beach": "https://mapcarta.com/N8187114014",
  "sunday-beach": "https://www.cbbep.org/publications/publication1224.pdf",
  "rockport-beach": "https://www.glo.texas.gov/sites/default/files/coastal-grants/_documents/grant-project/12-139-QAP.pdf",
  "fulton-beach-park": "https://www.glo.texas.gov/sites/default/files/documents/ost/acp/corpus/annexdocuments/annexe_marine_fire_fighting_plan.pdf",
  "goose-island-state-park-coast": "https://tpwd.texas.gov/state-parks/goose-island/map",
  "san-jose-island": "https://www.topozone.com/texas/aransas-tx/island/san-jose-island/",
  "ib-magee-beach-park": "https://www.nuecesbeachparks.com/Home/Components/FacilityDirectory/FacilityDirectory/284/1752",
  "port-aransas-beach": "https://porta.recdesk.com/Community/Facility/Detail?facilityId=20",
  "tony-amos-city-beach": "https://mapcarta.com/N8630219755",
  "mustang-island-state-park": "https://tpwd.texas.gov/state-parks/mustang-island/map",
  "north-beach-corpus-christi": "https://www.glo.texas.gov/sites/default/files/coastal-grants/_documents/grant-project/12-139-QAP.pdf",
  "mcgee-beach": "https://www.glo.texas.gov/sites/default/files/coastal-grants/_documents/grant-project/12-139-QAP.pdf",
  "cole-park-beach": "https://www.glo.texas.gov/sites/default/files/coastal-grants/_documents/grant-project/12-139-QAP.pdf",
  "oso-bay-coast": "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/ctc/corpus-christi-bay-loop",
  "whitecap-beach": "https://commons.wikimedia.org/wiki/File:Whitecap_Beach_in_Corpus_Christi,_Texas.jpg",
  "malaquite-beach": "https://mapcarta.com/21763442",
  "padre-island-national-seashore-backcountry": "https://home.nps.gov/places/south-beach-0-5.htm",
  "yarborough-pass": "https://www.nps.gov/places/yarborough-pass.htm",
  "south-padre-island-beaches": "https://www.visitcoastaltexas.com/things-to-do",
  "isla-blanca-park": "https://www.topozone.com/texas/cameron-tx/park/isla-blanca-park/",
  "andy-bowie-county-park": "https://www.topozone.com/texas/cameron-tx/park/andy-bowie-county-park/",
  "ek-atwood-park": "https://mapcarta.com/W1419644340",
  "boca-chica-beach": "https://www.topozone.com/texas/cameron-tx/beach/boca-chica-beach/",
};

const CANONICAL_SLUG_OVERRIDES: Record<string, string> = {
  "galveston-island-state-park-coast": "galveston-island-state-park",
  "goose-island-state-park-coast": "goose-island-state-park",
};

const CANONICAL_NAME_OVERRIDES: Record<string, string> = {
  "galveston-island-state-park-coast": "Galveston Island State Park",
  "goose-island-state-park-coast": "Goose Island State Park",
  "oso-bay-coast": "Oso Bay Coast & Wetlands Preserve",
};

const RIGHTS_CLEARED_HEROES: Record<string, ImageRef> = {
  "sea-rim-state-park": {
    src: "/images/explore/beaches-coast/sea-rim-state-park.jpg",
    alt: "Sea Rim State Park Gulf shoreline and coastal marsh in Jefferson County, Texas",
    width: 1600,
    height: 800,
    credit: "William L. Farr · CC BY 4.0 · Wikimedia Commons",
  },
  "galveston-island-state-park-coast": {
    src: "/images/explore/beaches-coast/galveston-island-state-park.jpg",
    alt: "Galveston Island State Park beach and barrier-island landscape on the Texas Gulf Coast",
    width: 1600,
    height: 1057,
    credit: "Yinan Chen · Public Domain · Wikimedia Commons",
  },
  "goose-island-state-park-coast": {
    src: "/images/explore/beaches-coast/goose-island-state-park.jpg",
    alt: "Goose Island State Park bayfront landscape near Rockport on the Texas coast",
    width: 1600,
    height: 1200,
    credit: "dwh1974@hotmail.com · CC BY 3.0 · Wikimedia Commons",
  },
  "mustang-island-state-park": {
    src: "/images/explore/beaches-coast/mustang-island-state-park.jpg",
    alt: "Mustang Island State Park Gulf beach and barrier-island dunes near Corpus Christi, Texas",
    width: 1600,
    height: 1067,
    credit: "William L. Farr · CC BY 4.0 · Wikimedia Commons",
  },
  "whitecap-beach": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Whitecap%20Beach%20in%20Corpus%20Christi%2C%20Texas.jpg?width=1600",
    alt: "Whitecap Beach on North Padre Island in Corpus Christi, Texas",
    width: 1600,
    height: 898,
    credit: "Matthew T Rader · CC BY-SA 4.0 · Wikimedia Commons",
  },
};

const accessCopy: Record<CoastalAccess, string> = {
  "public-free": "Public shoreline access is generally free, but local parking, vehicle, camping and event rules can still apply.",
  "public-managed": "The shoreline is public but managed under local beach, parking or vehicle rules that should be checked before arrival.",
  "public-fee": "This is a managed public destination where day-use, parking or entrance fees can apply.",
  "public-conditional": "Public access depends on current road, tide, construction, launch, weather or operational conditions, so a same-day check matters.",
  "boat-only": "There is no ordinary road approach; visitors must plan boat transportation and arrive self-sufficient.",
  "limited-public-shore": "Only the legally public shoreline portion is open to visitors; adjacent upland property is private and must be respected.",
  "private-check-status": "The property is not a municipal public beach, so current operator access must be confirmed before making the trip.",
};

const kindCopy: Record<CoastalPlaceKind, string> = {
  "gulf-beach": "open-Gulf beach",
  "bay-beach": "protected-bay beach",
  "coastal-park": "managed coastal park",
  "barrier-island": "barrier-island shoreline",
  "national-seashore": "national-seashore coastline",
  "shoreline": "coastal shoreline and habitat area",
  "beach-access": "named public beach-access point",
};

function nationalMapHero(name: string, coordinates: GeoPoint): ImageRef {
  const latSpan = 0.012;
  const lngSpan = 0.02;
  const bbox = [
    coordinates.lng - lngSpan,
    coordinates.lat - latSpan,
    coordinates.lng + lngSpan,
    coordinates.lat + latSpan,
  ].map((value) => value.toFixed(6)).join(",");
  return {
    src: `https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/export?bbox=${bbox}&bboxSR=4326&imageSR=4326&size=1600,900&format=jpg&transparent=false&f=image`,
    alt: `USGS National Map aerial orthoimagery centered on ${name}, Texas`,
    width: 1600,
    height: 900,
    credit: "USDA / USGS The National Map orthoimagery · Public domain",
  };
}

function bestSeasonFor(zone: string, kind: CoastalPlaceKind) {
  if (zone === "padre-island-south-texas") return "October through May for milder weather; summer works for beach days with heat, storms and surf conditions checked closely";
  if (kind === "barrier-island" || kind === "shoreline") return "Fall through spring for comfortable exploring and birding; summer requires more heat, storm and insect planning";
  return "March through May and September through November for milder beach weather; summer is busiest and hottest";
}

function bodyFor(place: (typeof coastalPlaces)[number], name: string) {
  const zone = COASTAL_ZONE_LABELS[place.zone];
  const countyText = place.counties.length === 1 ? `${place.counties[0]} County` : `${place.counties.join(" and ")} counties`;
  return [
    `${place.summary} TexasDefined treats ${name} specifically as a ${kindCopy[place.kind]} in the ${zone}, rather than collapsing it into a generic list of Texas beaches. That distinction affects what visitors should expect from the water, facilities, access and the amount of preparation a trip requires.`,
    `${place.planningNote} ${accessCopy[place.access]} Coastal conditions are unusually changeable: wind, tides, rip currents, sargassum, erosion, construction and storm recovery can alter a beach day even when the destination itself remains open. The managing source linked on this guide is therefore part of the trip plan, not just background reading.`,
    `${name} is associated with ${countyText} and the nearest practical base is ${place.nearestTown}. That location places it within a larger network of Gulf beaches, bay shorelines, barrier islands, wetlands and fishing communities, so it works best when readers understand whether they are choosing open surf, protected bay water, habitat exploration, beach driving or a managed park experience.`,
    `For a first visit, use the mapped point on this page as the representative public arrival or observation area, then follow posted signs and current agency guidance once on site. TexasDefined reviewed the destination source and coordinate evidence on ${place.sourceCheckedAt}; the source date is shown so readers can distinguish researched planning guidance from timeless descriptive copy.`,
  ];
}

function highlightsFor(place: (typeof coastalPlaces)[number], name: string) {
  const values = [
    kindCopy[place.kind].replace(/^./, (letter) => letter.toUpperCase()),
    `${COASTAL_ZONE_LABELS[place.zone]} setting`,
    `${place.nearestTown} access`,
    place.access === "boat-only" ? "Boat-only coastal access" : place.access.includes("conditional") ? "Conditions-dependent access" : "Texas coast trip planning",
  ];
  if (name.includes("State Park")) values[3] = "State-park coastal recreation";
  return values;
}

export const coastalDestinations: Destination[] = coastalPlaces.map((place) => {
  const coordinates = COASTAL_COORDINATES[place.slug];
  if (!coordinates) throw new Error(`Missing coastal coordinates for ${place.slug}`);
  const slug = CANONICAL_SLUG_OVERRIDES[place.slug] ?? place.slug;
  const name = CANONICAL_NAME_OVERRIDES[place.slug] ?? place.name;
  return {
    id: `coast-${slug}`,
    brandId: "texasdefined",
    slug,
    name,
    summary: place.summary,
    category: "beaches-coast",
    region: place.zone === "padre-island-south-texas" ? "south-texas" : "gulf-coast",
    nearestTown: place.nearestTown,
    county: place.counties[0],
    coordinates,
    hero: RIGHTS_CLEARED_HEROES[place.slug] ?? nationalMapHero(name, coordinates),
    bestSeason: bestSeasonFor(place.zone, place.kind),
    entryNote: place.planningNote,
    highlights: highlightsFor(place, name),
    body: bodyFor(place, name),
    managingAuthority: place.sourceLabel,
    officialUrl: place.sourceUrl,
    sourceCheckedAt: place.sourceCheckedAt,
  };
});

export const coastalDestinationBySlug = (slug: string) => coastalDestinations.find((destination) => destination.slug === slug);
