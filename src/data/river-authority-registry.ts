/**
 * River authority source of truth: geography is an editorial association for
 * cross-linking, NOT a claim that every reach passes through each named county.
 * New river profiles must join this registry, the visitor authority implementation,
 * and the validator. Only verified existing destination URLs may be linked.
 */
export interface RiverAuthorityRecord {
  key: string; name: string; slug: string; basin: string; counties: string[];
  destinations: string[]; image: string; imageAlt: string; summary: string;
}
export const riverAuthorityRecords: RiverAuthorityRecord[] = [
  {
    "key": "guadalupe",
    "name": "Guadalupe River",
    "slug": "texas-guadalupe-river-guide",
    "basin": "guadalupe",
    "counties": [
      "kerr",
      "kendall",
      "comal",
      "guadalupe",
      "gonzales",
      "dewitt",
      "victoria"
    ],
    "destinations": [
      "guadalupe-river-state-park",
      "canyon-lake"
    ],
    "image": "/images/editorial/texas-guadalupe-river.jpg",
    "imageAlt": "Image of the Guadalupe River in the Texas Hill Country",
    "summary": "Hill Country springs, Canyon Lake, New Braunfels and the coastal plain"
  },
  {
    "key": "frio",
    "name": "Frio River",
    "slug": "texas-frio-river-guide",
    "basin": "nueces",
    "counties": [
      "real",
      "uvalde",
      "frio",
      "mcmullen"
    ],
    "destinations": [
      "garner-state-park"
    ],
    "image": "/images/state-parks/garner-state-park.jpg",
    "imageAlt": "Garner State Park along the upper Frio River corridor",
    "summary": "Concan, Leakey, Garner State Park and the South Texas basin"
  },
  {
    "key": "comal",
    "name": "Comal River",
    "slug": "texas-comal-river-guide",
    "basin": "guadalupe",
    "counties": [
      "comal"
    ],
    "destinations": [
      "gruene-historic-district"
    ],
    "image": "/images/editorial/texas-river-basins.jpg",
    "imageAlt": "Representative Texas waterway; not documented as the Comal River",
    "summary": "Comal Springs, Landa Lake and downtown New Braunfels tubing, with Guadalupe confluence"
  },
  {
    "key": "san-marcos",
    "name": "San Marcos River",
    "slug": "texas-san-marcos-river-guide",
    "basin": "guadalupe",
    "counties": [
      "hays",
      "caldwell",
      "guadalupe",
      "gonzales"
    ],
    "destinations": []
    "image": "/images/editorial/texas-river-basins.jpg",
    "imageAlt": "Representative Texas waterway; not documented as the San Marcos River",
    "summary": "Spring Lake, San Marcos, Martindale and the Guadalupe River confluence"
  },
  {
    "key": "llano",
    "name": "Llano River",
    "slug": "texas-llano-river-guide",
    "basin": "colorado",
    "counties": [
      "kimble",
      "mason",
      "llano",
      "burnet"
    ],
    "destinations": [
      "south-llano-river-state-park",
      "inks-lake-state-park"
    ],
    "image": "/images/state-parks/south-llano-river-state-park.jpg",
    "imageAlt": "South Llano River State Park along the Llano headwaters system",
    "summary": "Junction, Mason, Llano and the Highland Lakes country"
  },
  {
    "key": "colorado",
    "name": "Colorado River (Texas)",
    "slug": "texas-colorado-river-guide",
    "basin": "colorado",
    "counties": [
      "coke",
      "burnet",
      "travis",
      "bastrop",
      "fayette",
      "colorado",
      "wharton",
      "matagorda"
    ],
    "destinations": [
      "colorado-bend-state-park",
      "lake-travis",
      "bastrop-state-park"
    ],
    "image": "/images/explore/lakes-rivers/pedernales-falls-state-park.jpg",
    "imageAlt": "Pedernales Falls in the Colorado River watershed; not the mainstem Colorado",
    "summary": "West Texas headwaters, Highland Lakes, Austin, Bastrop and Matagorda"
  },
  {
    "key": "brazos",
    "name": "Brazos River",
    "slug": "texas-brazos-river-guide",
    "basin": "brazos",
    "counties": [
      "palo-pinto",
      "hood",
      "mclennan",
      "brazos",
      "fort-bend",
      "brazoria"
    ],
    "destinations": [
      "lake-whitney",
      "lake-somerville",
      "brazos-bend-state-park"
    ],
    "image": "/images/explore/lakes-rivers/lake-somerville-birch-creek-unit.jpg",
    "imageAlt": "Lake Somerville in the Brazos River drainage",
    "summary": "Upper forks, Waco, the Brazos Valley and the lower Gulf Coast"
  },
  {
    "key": "neches",
    "name": "Neches River",
    "slug": "texas-neches-river-guide",
    "basin": "neches",
    "counties": [
      "van-zandt",
      "anderson",
      "cherokee",
      "tyler",
      "hardin",
      "jefferson"
    ],
    "destinations": [
      "village-creek-state-park",
      "big-thicket-national-preserve"
    ],
    "image": "/images/explore/lakes-rivers/village-creek-state-park.jpg",
    "imageAlt": "Village Creek State Park in the Neches watershed",
    "summary": "Piney Woods, Angelina River, Big Thicket and Beaumont"
  },
  {
    "key": "sabine",
    "name": "Sabine River",
    "slug": "texas-sabine-river-guide",
    "basin": "sabine",
    "counties": [
      "hunt",
      "rains",
      "wood",
      "upshur",
      "panola",
      "sabine",
      "newton",
      "orange"
    ],
    "destinations": [
      "lake-tawakoni",
      "toledo-bend-reservoir"
    ],
    "image": "/images/editorial/texas-river-basins.jpg",
    "imageAlt": "Representative Texas waterway; not documented as the Sabine River",
    "summary": "East Texas lakes, Toledo Bend, the Louisiana border and Sabine Lake"
  },
  {
    "key": "pecos",
    "name": "Pecos River",
    "slug": "texas-pecos-river-guide",
    "basin": "riogrande",
    "counties": [
      "loving",
      "reeves",
      "ward",
      "crockett",
      "terrell",
      "val-verde"
    ],
    "destinations": [
      "seminole-canyon-state-park",
      "amistad-national-recreation-area"
    ],
    "image": "/images/explore/lakes-rivers/amistad-national-recreation-area.jpg",
    "imageAlt": "Amistad reservoir in the lower Pecos and Rio Grande region; not the Pecos channel",
    "summary": "Remote West Texas river country, high bridge and the Rio Grande confluence"
  }
];
export const riverAuthorityBySlug = Object.fromEntries(riverAuthorityRecords.map((r) => [r.slug, r])) as Record<string, RiverAuthorityRecord>;
export function riverLinksForCounty(countySlug: string) {
  return riverAuthorityRecords.filter((r) => r.counties.includes(countySlug)).map((r) => ({
    name: r.name, href: `/article/${r.slug}`, summary: r.summary,
  }));
}
export function riverLinksForDestination(destinationSlug: string) {
  return riverAuthorityRecords.filter((r) => r.destinations.includes(destinationSlug)).map((r) => ({
    name: r.name, href: `/article/${r.slug}`, summary: r.summary,
  }));
}
