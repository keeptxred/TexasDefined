export type LandscapeCatalogItem = {
  slug: string;
  name: string;
  eyebrow: string;
  dek: string;
};

export type LandscapeGuideCatalogItem = {
  slug: string;
  title: string;
  dek: string;
};

export const texasLandscapeCatalog: LandscapeCatalogItem[] = [
  { slug: 'hill-country', name: 'Texas Hill Country', eyebrow: 'Central Texas limestone country', dek: 'Spring-fed rivers, limestone ridges, oak-juniper hills and some of the most recognizable scenery in Texas.' },
  { slug: 'piney-woods', name: 'Piney Woods', eyebrow: 'East Texas forest country', dek: 'Pine forests, hardwood bottoms, bayous and wetlands give East Texas a landscape unlike the rest of the state.' },
  { slug: 'gulf-coast', name: 'Texas Gulf Coast', eyebrow: 'Barrier islands, bays and marshes', dek: 'A long coastal landscape of beaches, dunes, tidal flats, wetlands, estuaries and low coastal prairie.' },
  { slug: 'south-texas-brush-country', name: 'South Texas Brush Country', eyebrow: 'Thornscrub and ranch country', dek: 'Dense thornscrub, mesquite, cactus and broad ranchlands define one of the state’s most distinctive semi-arid landscapes.' },
  { slug: 'rio-grande-valley', name: 'Rio Grande Valley', eyebrow: 'Subtropical South Texas', dek: 'Resacas, thornforest, palms, irrigated farmland and subtropical biodiversity along the lower Rio Grande.' },
  { slug: 'edwards-plateau', name: 'Edwards Plateau', eyebrow: 'Limestone uplands of Central Texas', dek: 'A high limestone tableland dissected by canyons, springs and river systems across west-central Texas.' },
  { slug: 'blackland-prairie', name: 'Blackland Prairie', eyebrow: 'Dark-soil prairie belt', dek: 'Deep black clay soils once supported tallgrass prairie through the heart of some of Texas’s largest cities.' },
  { slug: 'post-oak-savannah', name: 'Post Oak Savannah', eyebrow: 'Prairie and woodland transition', dek: 'A mosaic of post oak woods, grasslands and sandy uplands between the Blackland Prairie and Piney Woods.' },
  { slug: 'cross-timbers', name: 'Cross Timbers', eyebrow: 'Wooded belt of North Texas', dek: 'Bands of oak woodland and prairie form a historic natural barrier across North and Central Texas.' },
  { slug: 'rolling-plains', name: 'Rolling Plains', eyebrow: 'Red-soil country below the Caprock', dek: 'Open grasslands, red soils, breaks and broad ranch country stretch east of the High Plains escarpment.' },
  { slug: 'high-plains-llano-estacado', name: 'High Plains & Llano Estacado', eyebrow: 'The great tabletop of West Texas', dek: 'Vast flat uplands, shortgrass plains, playa lakes and a dramatic escarpment define the Texas High Plains.' },
  { slug: 'permian-basin', name: 'Permian Basin', eyebrow: 'West Texas basin-and-plain country', dek: 'Dry plains, low mesas, caliche, scrub and industrial energy landscapes spread across western Texas.' },
  { slug: 'trans-pecos-far-west-texas', name: 'Trans-Pecos & Far West Texas', eyebrow: 'Mountains, desert and basin country', dek: 'Texas reaches its most dramatic extremes in the Trans-Pecos: desert basins, volcanic ranges, limestone mountains and the Big Bend.' },
  { slug: 'guadalupe-mountains', name: 'Guadalupe Mountains', eyebrow: 'Texas’s highest mountain country', dek: 'A fossil reef lifted into a mountain wall, home to the highest natural point in Texas and dramatic desert-to-forest elevation changes.' },
  { slug: 'texas-panhandle', name: 'Texas Panhandle', eyebrow: 'Prairie, caprock and canyon country', dek: 'The Panhandle combines immense prairie horizons with some of the most surprising canyon scenery in Texas.' },
  { slug: 'rivers-and-river-valleys', name: 'Texas Rivers & River Valleys', eyebrow: 'Water-shaped Texas', dek: 'From spring-fed Hill Country rivers to broad coastal floodplains, river valleys cut across every major Texas landscape.' },
  { slug: 'lakes-and-reservoirs', name: 'Texas Lakes & Reservoir Landscapes', eyebrow: 'A mostly human-made lake country', dek: 'Reservoirs have transformed river valleys into some of Texas’s most familiar recreational landscapes.' },
  { slug: 'canyons', name: 'Texas Canyons', eyebrow: 'Cut into plains, plateaus and desert', dek: 'Texas canyons range from Caprock chasms and limestone river gorges to the massive walls of the Rio Grande.' },
  { slug: 'caves-and-karst', name: 'Texas Caves & Karst', eyebrow: 'The landscape beneath the landscape', dek: 'Limestone dissolution has created caves, sinkholes, springs and aquifer systems across Central and West Texas.' },
  { slug: 'prairies-and-grasslands', name: 'Texas Prairies & Grasslands', eyebrow: 'The open-country Texas', dek: 'Tallgrass, mixed-grass and shortgrass systems once covered enormous parts of Texas and still shape its open-country identity.' },
  { slug: 'deserts', name: 'Texas Deserts', eyebrow: 'Chihuahuan Desert landscapes', dek: 'Texas desert country is concentrated in the far west, where basin floors, rocky fans, salt flats and mountain ranges create dramatic dry-country scenery.' },
  { slug: 'wetlands-and-marshes', name: 'Texas Wetlands & Marshes', eyebrow: 'The state’s waterlogged landscapes', dek: 'Coastal marshes, river bottoms, playa lakes, swamps and inland wetlands support some of the richest wildlife habitat in Texas.' },
  { slug: 'forests', name: 'Texas Forests', eyebrow: 'Pine, oak, cypress and mountain woodland', dek: 'Texas forests range from humid East Texas pine country to Hill Country oak woodland and isolated mountain forests in the far west.' },
  { slug: 'wildflower-landscapes', name: 'Texas Wildflower Landscapes', eyebrow: 'Seasonal color across the state', dek: 'Bluebonnets are only the beginning: Texas wildflower displays shift by soil, rainfall, latitude, elevation and season.' },
];

export const texasLandscapeGuideCatalog: LandscapeGuideCatalogItem[] = [
  { slug: 'most-beautiful-landscapes-in-texas', title: 'The Most Beautiful Landscapes in Texas', dek: 'A statewide guide to the places where Texas geography becomes unforgettable.' },
  { slug: 'where-does-texas-turn-into-desert', title: 'Where Does Texas Turn Into Desert?', dek: 'The transition is gradual, but true Chihuahuan Desert landscapes become dominant in far West Texas.' },
  { slug: 'why-is-the-texas-hill-country-so-hilly', title: 'Why Is the Texas Hill Country So Hilly?', dek: 'Limestone, faulting and river erosion turned the edge of the Edwards Plateau into the terrain Texans call the Hill Country.' },
  { slug: 'texas-geography-explained', title: 'Texas Geography Explained', dek: 'A plain-English tour of why Texas contains forests, prairies, deserts, mountains, marshes and nearly everything between.' },
  { slug: 'best-scenic-drives-for-every-texas-landscape', title: 'Best Scenic Drives for Every Texas Landscape', dek: 'Match the drive to the landscape: mountains, canyons, rivers, forest, prairie, coast and desert.' },
  { slug: 'texas-landscapes-by-region', title: 'Texas Landscapes by Region', dek: 'See how familiar travel regions overlap with ecological and geological landscapes.' },
  { slug: 'best-places-to-photograph-texas-landscapes', title: 'Best Places to Photograph Texas Landscapes', dek: 'A landscape-first photography guide to desert, canyon, forest, coast, prairie, rivers and wildflowers.' },
  { slug: 'what-part-of-texas-looks-like-arizona-colorado-or-the-south', title: 'What Part of Texas Looks Like Arizona, Colorado or the Deep South?', dek: 'Texas contains landscapes that can feel surprisingly similar to several neighboring regions of the country.' },
];

export const landscapeSlugs = texasLandscapeCatalog.map((item) => item.slug);
export const landscapeGuideSlugs = texasLandscapeGuideCatalog.map((item) => item.slug);
