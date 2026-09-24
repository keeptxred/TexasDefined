export interface CampingDestinationMapPoint {
  slug: string;
  name: string;
  lat: number;
  lng: number;
  sourceDataset: "legacy-explore" | "legacy-lakes" | "coastal-destinations" | "destination-curation";
}

/**
 * Destination-level coordinates for the statewide camping guide.
 *
 * These are orientation points for canonical park/destination guides, not
 * individual campground loops, campsite pads, entrances or reservation sites.
 * Every coordinate is copied from an existing TexasDefined source dataset so
 * the map never geocodes or invents a location at runtime.
 */
export const CAMPING_DESTINATION_MAP_POINTS: CampingDestinationMapPoint[] = [
  { slug: "enchanted-rock-state-natural-area", name: "Enchanted Rock State Natural Area", lat: 30.506, lng: -98.819, sourceDataset: "legacy-explore" },
  { slug: "palo-duro-canyon-state-park", name: "Palo Duro Canyon State Park", lat: 34.984, lng: -101.702, sourceDataset: "legacy-explore" },
  { slug: "garner-state-park", name: "Garner State Park", lat: 29.586, lng: -99.743, sourceDataset: "legacy-explore" },
  { slug: "mckinney-falls-state-park", name: "McKinney Falls State Park", lat: 30.183, lng: -97.722, sourceDataset: "legacy-explore" },
  { slug: "caddo-lake", name: "Caddo Lake", lat: 32.68, lng: -94.176, sourceDataset: "legacy-lakes" },
  { slug: "mustang-island-state-park", name: "Mustang Island State Park", lat: 27.672, lng: -97.176, sourceDataset: "legacy-explore" },
  { slug: "sea-rim-state-park", name: "Sea Rim State Park", lat: 29.676, lng: -94.043, sourceDataset: "legacy-explore" },
  { slug: "brazos-bend-state-park", name: "Brazos Bend State Park", lat: 29.371, lng: -95.631, sourceDataset: "legacy-explore" },
  { slug: "big-bend-national-park", name: "Big Bend National Park", lat: 29.2498, lng: -103.2502, sourceDataset: "legacy-explore" },
  { slug: "guadalupe-mountains-national-park", name: "Guadalupe Mountains National Park", lat: 31.923, lng: -104.866, sourceDataset: "legacy-explore" },
  { slug: "inks-lake-state-park", name: "Inks Lake State Park", lat: 30.737, lng: -98.369, sourceDataset: "legacy-lakes" },
  { slug: "colorado-bend-state-park", name: "Colorado Bend State Park", lat: 31.022, lng: -98.442, sourceDataset: "legacy-explore" },
  { slug: "caprock-canyons-state-park", name: "Caprock Canyons State Park & Trailway", lat: 34.411, lng: -101.064, sourceDataset: "legacy-explore" },
  { slug: "dinosaur-valley-state-park", name: "Dinosaur Valley State Park", lat: 32.246, lng: -97.813, sourceDataset: "legacy-explore" },
  { slug: "pedernales-falls-state-park", name: "Pedernales Falls State Park", lat: 30.308, lng: -98.257, sourceDataset: "legacy-explore" },
  { slug: "lake-whitney-state-park", name: "Lake Whitney State Park", lat: 31.923, lng: -97.356, sourceDataset: "legacy-lakes" },
  { slug: "lake-tawakoni-state-park", name: "Lake Tawakoni State Park", lat: 32.836, lng: -95.994, sourceDataset: "legacy-lakes" },
  { slug: "matagorda-bay-nature-park", name: "Matagorda Bay Nature Park", lat: 28.61174, lng: -95.96289, sourceDataset: "coastal-destinations" },
  { slug: "balmorhea-state-park", name: "Balmorhea State Park", lat: 30.944, lng: -103.786, sourceDataset: "legacy-explore" },
  { slug: "davis-mountains-state-park", name: "Davis Mountains State Park", lat: 30.599, lng: -103.925, sourceDataset: "legacy-explore" },
  { slug: "monahans-sandhills-state-park", name: "Monahans Sandhills State Park", lat: 31.619, lng: -102.812, sourceDataset: "legacy-explore" },
  { slug: "guadalupe-river-state-park", name: "Guadalupe River State Park", lat: 29.854, lng: -98.504, sourceDataset: "legacy-explore" },
  { slug: "lost-maples-state-natural-area", name: "Lost Maples State Natural Area", lat: 29.807, lng: -99.611, sourceDataset: "legacy-explore" },
  { slug: "huntsville-state-park", name: "Huntsville State Park", lat: 30.628, lng: -95.526, sourceDataset: "legacy-lakes" },
  { slug: "tyler-state-park", name: "Tyler State Park", lat: 32.482, lng: -95.301, sourceDataset: "legacy-lakes" },
  { slug: "choke-canyon-state-park", name: "Choke Canyon State Park", lat: 28.465773, lng: -98.354195, sourceDataset: "destination-curation" },
  { slug: "galveston-island-state-park", name: "Galveston Island State Park", lat: 29.198, lng: -94.956, sourceDataset: "legacy-explore" },
  { slug: "lake-livingston-state-park", name: "Lake Livingston State Park", lat: 30.656, lng: -95.001, sourceDataset: "legacy-lakes" },
  { slug: "martin-dies-jr-state-park", name: "Martin Dies, Jr. State Park", lat: 30.853, lng: -94.172, sourceDataset: "legacy-lakes" },
  { slug: "bastrop-state-park", name: "Bastrop State Park", lat: 30.111, lng: -97.286, sourceDataset: "legacy-explore" },
  { slug: "eisenhower-state-park", name: "Eisenhower State Park", lat: 33.819, lng: -96.599, sourceDataset: "legacy-lakes" },
  { slug: "lake-mineral-wells-state-park", name: "Lake Mineral Wells State Park & Trailway", lat: 32.812655, lng: -98.043368, sourceDataset: "destination-curation" },
  { slug: "south-llano-river-state-park", name: "South Llano River State Park", lat: 30.446, lng: -99.805, sourceDataset: "legacy-explore" },
  { slug: "seminole-canyon-state-park-and-historic-site", name: "Seminole Canyon State Park & Historic Site", lat: 29.701, lng: -101.317, sourceDataset: "legacy-explore" },
];
