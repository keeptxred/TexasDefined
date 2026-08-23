export type LandscapeRecord = {
  slug: string;
  name: string;
  eyebrow: string;
  dek: string;
  intro: string;
  where: string;
  terrain: string;
  vegetation: string;
  geology: string;
  water: string;
  signature: string[];
  bestFor: string[];
  related: { label: string; href: string }[];
};

export type LandscapeGuide = {
  slug: string;
  title: string;
  dek: string;
  intro: string;
  sections: { heading: string; body: string }[];
  related: { label: string; href: string }[];
};

const explore = (label: string, href: string) => ({ label, href });

export const texasLandscapes: LandscapeRecord[] = [
  {
    slug: 'hill-country', name: 'Texas Hill Country', eyebrow: 'Central Texas limestone country',
    dek: 'Spring-fed rivers, limestone ridges, oak-juniper hills and some of the most recognizable scenery in Texas.',
    intro: 'The Hill Country is where the Edwards Plateau breaks into rounded hills, limestone canyons and clear river valleys. West and northwest of Austin and San Antonio, the Guadalupe, Pedernales, Blanco, Llano and Frio systems cut through pale limestone and support swimming holes, cypress-lined banks and fertile valleys.',
    where: 'Central Texas, broadly west of Austin and San Antonio and extending toward the Edwards Plateau.', terrain: 'Rolling to rugged limestone hills, canyons, escarpments and river valleys.', vegetation: 'Live oak, Ashe juniper, cedar elm, native grasses and bald-cypress river corridors.', geology: 'Cretaceous limestone, faulting and erosion create caves, springs and steep-sided drainages.', water: 'Spring-fed rivers and aquifer-fed creeks including the Guadalupe, Blanco, Pedernales, Llano and Frio.',
    signature: ['Limestone hills', 'Spring-fed rivers', 'Bluebonnet roadsides', 'Bald cypress riverbanks', 'Caves and karst'], bestFor: ['Scenic drives', 'Swimming holes', 'Wildflowers', 'State parks', 'Small-town weekends'], related: [explore('Scenic road trips', '/explore/road-trips'), explore('Lakes & rivers', '/explore/lakes-rivers'), explore('State parks', '/explore/state-parks'), explore('Caverns', '/explore/caverns')],
  },
  {
    slug: 'piney-woods', name: 'Piney Woods', eyebrow: 'East Texas forest country',
    dek: 'Pine forests, hardwood bottoms, bayous and wetlands give East Texas a landscape unlike the rest of the state.',
    intro: 'The Piney Woods feel closer to the Deep South than the popular image of Texas. Tall pines, hardwood forests, humid bottoms and slow-moving creeks dominate the eastern edge of the state, including the Big Thicket and the cypress wetlands around Caddo Lake.',
    where: 'East Texas from the Louisiana line west toward the Post Oak Savannah.', terrain: 'Low rolling uplands, sandy ridges, creek bottoms, bayous and broad forested floodplains.', vegetation: 'Loblolly, shortleaf and longleaf pine with oak, sweetgum, magnolia and cypress.', geology: 'Young sedimentary formations and sandy soils shape rolling uplands and low wet bottoms.', water: 'Sabine, Neches, Angelina and Cypress systems, plus bayous, sloughs and wetlands.',
    signature: ['Tall pine forests', 'Cypress swamps', 'Big Thicket biodiversity', 'Caddo Lake wetlands', 'Shaded backroads'], bestFor: ['Forest hiking', 'Birding', 'Paddling', 'Photography', 'Fall color'], related: [explore('National parks', '/explore/national-parks'), explore('Lakes & rivers', '/explore/lakes-rivers'), explore('Outdoors', '/explore/outdoors')],
  },
  {
    slug: 'gulf-coast', name: 'Texas Gulf Coast', eyebrow: 'Barrier islands, bays and marshes',
    dek: 'A long coastal landscape of beaches, dunes, tidal flats, wetlands, estuaries and low coastal prairie.',
    intro: 'Texas meets the Gulf of Mexico along barrier islands, bays, dunes and marshes. The coast changes from the upper coast near Sabine Pass and Galveston to broad barrier-island systems and the Laguna Madre farther south, while storms, tides, sediment and wind continually reshape the shoreline.',
    where: 'The Gulf edge of Texas from the Louisiana border to the mouth of the Rio Grande.', terrain: 'Low coastal plains, barrier islands, dunes, bay margins, tidal flats and marshes.', vegetation: 'Salt-tolerant grasses, coastal prairie, marsh vegetation, dune plants and subtropical species farther south.', geology: 'Young marine and deltaic sediments reworked by waves, currents, storms and rivers.', water: 'The Gulf of Mexico, Galveston Bay, Matagorda Bay, San Antonio Bay, Corpus Christi Bay and Laguna Madre.',
    signature: ['Barrier islands', 'Coastal dunes', 'Salt marshes', 'Bays and estuaries', 'Migratory bird habitat'], bestFor: ['Beaches', 'Birding', 'Fishing', 'Kayaking', 'Sunrise photography'], related: [explore('Beaches & coast', '/explore/beaches-coast'), explore('Texas fishing', '/fishing'), explore('Road trips', '/explore/road-trips')],
  },
  {
    slug: 'south-texas-brush-country', name: 'South Texas Brush Country', eyebrow: 'Thornscrub and ranch country',
    dek: 'Dense thornscrub, mesquite, cactus and broad ranchlands define one of the state’s most distinctive semi-arid landscapes.',
    intro: 'South Texas Brush Country is built around heat, drought and thorny vegetation. Mesquite, huisache, blackbrush, prickly pear and dense shrub communities dominate huge ranches and wildlife habitat between San Antonio and the Rio Grande Valley.',
    where: 'South Texas between the Balcones Escarpment, coastal plain and lower Rio Grande Valley.', terrain: 'Mostly rolling to nearly level plains cut by arroyos and seasonal drainages.', vegetation: 'Mesquite, huisache, blackbrush, guajillo, prickly pear, granjeno and dense thornscrub.', geology: 'Sedimentary plains with calcareous and clay-rich soils, plus sandy belts and river deposits.', water: 'The Nueces, Frio, Atascosa and lower Rio Grande systems, with many intermittent creeks and stock tanks.',
    signature: ['Mesquite thornscrub', 'Prickly pear', 'Ranch country', 'Dry creek beds', 'Wildlife-rich brush'], bestFor: ['Wildlife viewing', 'Birding', 'Ranch landscapes', 'Sunset photography', 'Native plants'], related: [explore('Outdoors', '/explore/outdoors'), explore('Small towns', '/explore/small-towns')],
  },
  {
    slug: 'rio-grande-valley', name: 'Rio Grande Valley', eyebrow: 'Subtropical South Texas',
    dek: 'Resacas, thornforest, palms, irrigated farmland and subtropical biodiversity along the lower Rio Grande.',
    intro: 'The Rio Grande Valley is a broad subtropical delta and floodplain rather than a mountain valley. Historic resacas, native thornforest, irrigated citrus country and warm-climate plants create a landscape found nowhere else in Texas.',
    where: 'The lower Rio Grande corridor through Starr, Hidalgo, Cameron and Willacy counties.', terrain: 'Flat to gently sloping floodplain, delta plain, resacas and low terraces.', vegetation: 'Tamaulipan thornscrub, sabal palms, ebony, anacua, mesquite and riparian woodland.', geology: 'Young river and delta sediments deposited by repeated shifts of the Rio Grande.', water: 'The Rio Grande, irrigation canals, resacas and nearby Laguna Madre.',
    signature: ['Resacas', 'Sabal palms', 'Thornforest', 'Citrus groves', 'Bird migration corridor'], bestFor: ['Birding', 'Butterflies', 'Winter travel', 'Wildlife habitat', 'Subtropical landscapes'], related: [explore('Wildlife & outdoors', '/explore/outdoors'), explore('Beaches & coast', '/explore/beaches-coast')],
  },
  {
    slug: 'edwards-plateau', name: 'Edwards Plateau', eyebrow: 'Limestone uplands of Central Texas',
    dek: 'A high limestone tableland dissected by canyons, springs and river systems across west-central Texas.',
    intro: 'The Edwards Plateau is the geological foundation behind much of the Hill Country and a broader ecological region in its own right. Resistant limestone produces elevated plains, rocky soils, caves and stream canyons; water moving through fractures and faults feeds some of Texas’s clearest springs and rivers.',
    where: 'West-central Texas, from the Hill Country toward the Concho and Pecos systems.', terrain: 'Plateaus, dissected uplands, limestone canyons and rocky river valleys.', vegetation: 'Oak-juniper woodlands, grasslands, shrublands and riparian hardwoods.', geology: 'Thick Cretaceous limestone and dolomite with extensive karst, fractures, caves and sinks.', water: 'Aquifer-fed springs and headwaters of the Nueces, Frio, Guadalupe, Llano and other rivers.',
    signature: ['Limestone shelves', 'Karst springs', 'Rocky canyons', 'Oak-juniper uplands', 'Clear headwater streams'], bestFor: ['Geology', 'Caving', 'River trips', 'Scenic overlooks', 'Native landscapes'], related: [explore('Caverns', '/explore/caverns'), explore('Major springs', '/explore/major-springs'), explore('Lakes & rivers', '/explore/lakes-rivers')],
  },
  {
    slug: 'blackland-prairie', name: 'Blackland Prairie', eyebrow: 'Dark-soil prairie belt',
    dek: 'Deep black clay soils once supported tallgrass prairie through the heart of some of Texas’s largest cities.',
    intro: 'The Blackland Prairie forms a narrow crescent through north and central Texas. Fertile dark clay made it valuable farmland, so little original prairie remains, but preserved tracts reveal tall grasses, seasonal wildflowers and gently rolling ground across the Dallas–Austin corridor.',
    where: 'From near the Red River through Dallas–Fort Worth and Waco toward San Antonio.', terrain: 'Nearly level to gently rolling prairie and broad drainage valleys.', vegetation: 'Tallgrass prairie historically dominated by big bluestem, little bluestem, Indiangrass and diverse forbs.', geology: 'Cretaceous chalks, marls and clays weather into dark shrink-swell soils.', water: 'Trinity, Brazos and Colorado tributaries cross the prairie belt.',
    signature: ['Black clay soils', 'Tallgrass remnants', 'Wildflower fields', 'Rolling farm country', 'Urban prairie preserves'], bestFor: ['Wildflowers', 'Prairie restoration', 'Birding', 'Urban nature', 'Texas ecology'], related: [explore('Texas wildflowers', '/article/texas-wildflowers-guide'), explore('Outdoors', '/explore/outdoors')],
  },
  {
    slug: 'post-oak-savannah', name: 'Post Oak Savannah', eyebrow: 'Prairie and woodland transition',
    dek: 'A mosaic of post oak woods, grasslands and sandy uplands between the Blackland Prairie and Piney Woods.',
    intro: 'The Post Oak Savannah is a transition zone rather than a single scene. Open grasslands alternate with post oak and blackjack oak woodland on sandy or loamy soils, creating a landscape more wooded than the Blackland Prairie but more open than the Piney Woods.',
    where: 'East-central Texas between the Blackland Prairie and Piney Woods.', terrain: 'Gently rolling uplands, sandy ridges, broad valleys and woodland-prairie mosaics.', vegetation: 'Post oak, blackjack oak, yaupon, native grasses and mixed savannah communities.', geology: 'Sandy and loamy sedimentary formations with contrasting upland and valley soils.', water: 'Tributaries of the Brazos, Trinity, Neches and Colorado systems.',
    signature: ['Post oak woodland', 'Open savannah', 'Sandy roadsides', 'Pasture mosaics', 'Transition-country scenery'], bestFor: ['Backroads', 'Birding', 'Wildflowers', 'Ranch drives', 'Ecology'], related: [explore('Road trips', '/explore/road-trips'), explore('Small towns', '/explore/small-towns')],
  },
  {
    slug: 'cross-timbers', name: 'Cross Timbers', eyebrow: 'Wooded belt of North Texas',
    dek: 'Bands of oak woodland and prairie form a historic natural barrier across North and Central Texas.',
    intro: 'The Cross Timbers were famous because dense oak thickets once slowed travel across the plains. Today alternating belts of post oak, blackjack oak, prairie, rocky ridges and lakes wrap around the western side of Dallas–Fort Worth and continue south.',
    where: 'North and north-central Texas, especially west of Dallas–Fort Worth.', terrain: 'Rolling ridges, rocky uplands, prairie openings and incised creek valleys.', vegetation: 'Post oak, blackjack oak, juniper, native grasses and brushy woodland.', geology: 'Alternating sandstone, shale and limestone create parallel bands of soils and vegetation.', water: 'Upper Trinity and Brazos tributaries with many modern reservoirs.',
    signature: ['Oak belts', 'Rocky ridges', 'Prairie openings', 'Lake country', 'Historic trail corridors'], bestFor: ['Hiking', 'Lake trips', 'Backroads', 'Historic geography', 'Fall color'], related: [explore('Lakes & rivers', '/explore/lakes-rivers'), explore('Historic sites', '/explore/historic-sites')],
  },
  {
    slug: 'rolling-plains', name: 'Rolling Plains', eyebrow: 'Red-soil country below the Caprock',
    dek: 'Open grasslands, red soils, breaks and broad ranch country stretch east of the High Plains escarpment.',
    intro: 'The Rolling Plains descend eastward from the Caprock Escarpment into warmer, more dissected country. Red soils, mesquite, grasslands and broad river valleys dominate, with rugged breaks where streams cut softer sedimentary rock.',
    where: 'Northwest Texas east of the High Plains.', terrain: 'Rolling plains, river breaks, low mesas and broad open valleys.', vegetation: 'Short and mixed grasses, mesquite, juniper, cottonwoods and riparian brush.', geology: 'Permian red beds and younger sediments create colorful soils and eroded breaks.', water: 'Upper Red, Brazos and Colorado tributaries, many intermittent.',
    signature: ['Red soils', 'Open ranchland', 'River breaks', 'Mesquite grassland', 'Long horizons'], bestFor: ['Road trips', 'Ranch scenery', 'Sunsets', 'Geology', 'Wildlife'], related: [explore('Road trips', '/explore/road-trips')],
  },
  {
    slug: 'high-plains-llano-estacado', name: 'High Plains & Llano Estacado', eyebrow: 'The great tabletop of West Texas',
    dek: 'Vast flat uplands, shortgrass plains, playa lakes and a dramatic escarpment define the Texas High Plains.',
    intro: 'The Llano Estacado is one of North America’s great tablelands. Its surface can appear nearly endless, but at the edges the ground drops abruptly along the Caprock Escarpment into canyons and breaks. Shallow playa lakes provide crucial seasonal wetlands.',
    where: 'The Texas Panhandle and South Plains south toward Midland.', terrain: 'Broad flat upland interrupted by shallow playas and deeply cut margins.', vegetation: 'Shortgrass prairie, mixed grass, yucca, mesquite and extensive agricultural fields.', geology: 'Ogallala sediments capped by caliche form the elevated plain and dramatic eroded edges.', water: 'Playa lakes, intermittent streams and the Ogallala Aquifer.',
    signature: ['Flat horizons', 'Caprock Escarpment', 'Playa lakes', 'Prairie skies', 'Canyon margins'], bestFor: ['Big-sky photography', 'Stargazing', 'Prairie ecology', 'Road trips', 'Storm watching'], related: [explore('State parks', '/explore/state-parks'), explore('Road trips', '/explore/road-trips')],
  },
  {
    slug: 'permian-basin', name: 'Permian Basin', eyebrow: 'West Texas basin-and-plain country',
    dek: 'Dry plains, low mesas, caliche, scrub and industrial energy landscapes spread across western Texas.',
    intro: 'The Permian Basin is both a geological basin and a modern cultural landscape. At the surface it is dry, open and understated: scrub vegetation, pale caliche, low relief and distant mesas, overlaid in many places by oil and gas infrastructure.',
    where: 'West Texas centered on Midland–Odessa and extending into the Delaware Basin.', terrain: 'Broad dry plains, low rises, shallow draws, mesas and basin margins.', vegetation: 'Mesquite, creosote, yucca, grasses and desert-transition shrubs.', geology: 'Thick Permian-age sedimentary rocks below ground make this a major petroleum province.', water: 'Sparse surface drainage with intermittent creeks, playas and groundwater-dependent communities.',
    signature: ['Open dry plains', 'Mesquite scrub', 'Caliche roadsides', 'Energy infrastructure', 'Distant mesas'], bestFor: ['Geology', 'Industrial landscapes', 'Sunsets', 'Road trips', 'West Texas context'], related: [explore('Road trips', '/explore/road-trips'), explore('Small towns', '/explore/small-towns')],
  },
  {
    slug: 'trans-pecos-far-west-texas', name: 'Trans-Pecos & Far West Texas', eyebrow: 'Mountains, desert and basin country',
    dek: 'Texas reaches its most dramatic extremes in the Trans-Pecos: desert basins, volcanic ranges, limestone mountains and the Big Bend.',
    intro: 'West of the Pecos River, Texas becomes true mountain-and-desert country. Isolated ranges rise above Chihuahuan Desert basins, the Rio Grande cuts deep canyons through Big Bend, and volcanic and limestone uplifts create some of the state’s greatest relief.',
    where: 'Texas west of the Pecos River, including El Paso, Big Bend and the Davis and Guadalupe mountains.', terrain: 'Desert basins, mountain ranges, volcanic highlands, limestone cliffs, badlands and river canyons.', vegetation: 'Creosote, lechuguilla, sotol, ocotillo, yucca, desert grasses and high-elevation woodland.', geology: 'Fault-block mountains, volcanic fields, marine limestone uplifts and sedimentary basins.', water: 'The Rio Grande, desert springs, tinajas and intermittent mountain streams.',
    signature: ['Chihuahuan Desert', 'Big Bend canyons', 'Sky islands', 'Volcanic ranges', 'Dark skies'], bestFor: ['National parks', 'Stargazing', 'Mountain hiking', 'Desert photography', 'Scenic drives'], related: [explore('National parks', '/explore/national-parks'), explore('Road trips', '/explore/road-trips')],
  },
  {
    slug: 'guadalupe-mountains', name: 'Guadalupe Mountains', eyebrow: 'Texas’s highest mountain country',
    dek: 'A fossil reef lifted into a mountain wall, home to the highest natural point in Texas and dramatic desert-to-forest elevation changes.',
    intro: 'The Guadalupe Mountains rise abruptly above the Chihuahuan Desert near New Mexico. Their limestone core is the remnant of an ancient marine reef, now exposed as cliffs, canyons and the state’s highest peaks.',
    where: 'Far West Texas near the New Mexico line, north of Van Horn and east of El Paso.', terrain: 'Steep limestone escarpments, high ridges, narrow canyons, alluvial fans and desert foothills.', vegetation: 'Desert scrub below, with juniper, oak, pine and isolated higher-elevation forest above.', geology: 'Permian reef limestone forms the backbone of the range.', water: 'Limited surface water; springs, seeps and brief storm runoff support localized habitats.',
    signature: ['Guadalupe Peak', 'El Capitan', 'Fossil reef cliffs', 'Desert-to-forest change', 'Deep canyons'], bestFor: ['Mountain hiking', 'Geology', 'National parks', 'Fall color', 'Backcountry'], related: [explore('National parks', '/explore/national-parks'), explore('Outdoors', '/explore/outdoors')],
  },
  {
    slug: 'texas-panhandle', name: 'Texas Panhandle', eyebrow: 'Prairie, caprock and canyon country',
    dek: 'The Panhandle combines immense prairie horizons with some of the most surprising canyon scenery in Texas.',
    intro: 'Much of the Panhandle is flat, but the edge of the High Plains is deeply cut by tributaries of the Canadian and Red rivers. Palo Duro and Caprock Canyons reveal vivid rock layers beneath the otherwise level prairie surface.',
    where: 'The northern rectangular extension of Texas from Oklahoma south to the South Plains.', terrain: 'Flat High Plains, caprock escarpments, river breaks, mesas and major canyons.', vegetation: 'Shortgrass prairie, mixed grass, yucca, cottonwood and juniper.', geology: 'Ogallala caprock overlies older red beds and sedimentary layers exposed in canyon walls.', water: 'Canadian River, Prairie Dog Town Fork of the Red River, playa lakes and reservoirs.',
    signature: ['Palo Duro Canyon', 'Caprock breaks', 'Prairie horizons', 'Red rock layers', 'Playa lakes'], bestFor: ['Canyon hiking', 'Road trips', 'Prairie photography', 'State parks', 'Stargazing'], related: [explore('State parks', '/explore/state-parks'), explore('Road trips', '/explore/road-trips')],
  },
  {
    slug: 'rivers-and-river-valleys', name: 'Texas Rivers & River Valleys', eyebrow: 'Water-shaped Texas',
    dek: 'From spring-fed Hill Country rivers to broad coastal floodplains, river valleys cut across every major Texas landscape.',
    intro: 'Texas rivers connect regions that otherwise look unrelated. Clear spring-fed streams begin on limestone uplands, prairie rivers widen across central Texas, and low-gradient waterways build floodplains and estuaries near the coast.',
    where: 'Statewide, from Panhandle headwaters and West Texas desert rivers to Gulf Coast estuaries.', terrain: 'Headwater canyons, gravel bars, floodplains, terraces, oxbows and deltaic lowlands.', vegetation: 'Bald cypress, pecan, cottonwood, willow and other riparian communities.', geology: 'Rivers expose bedrock, move sediment and build floodplains distinct from surrounding uplands.', water: 'Rio Grande, Brazos, Colorado, Trinity, Sabine, Neches, Guadalupe, Nueces, San Antonio, Canadian and Red systems.',
    signature: ['Cypress-lined rivers', 'Broad floodplains', 'Desert canyons', 'Oxbows and wetlands', 'River terraces'], bestFor: ['Paddling', 'Swimming', 'Fishing', 'Birding', 'Scenic drives'], related: [explore('Lakes & rivers', '/explore/lakes-rivers'), explore('Texas fishing', '/fishing')],
  },
  {
    slug: 'lakes-and-reservoirs', name: 'Texas Lakes & Reservoir Landscapes', eyebrow: 'A mostly human-made lake country',
    dek: 'Reservoirs have transformed river valleys into some of Texas’s most familiar recreational landscapes.',
    intro: 'Most large Texas lakes are reservoirs created for water supply, flood control, power or recreation. Because they flooded very different terrain, their shorelines range from pine-covered coves to limestone arms and broad open-water plains.',
    where: 'Statewide, especially around metropolitan areas and the Brazos, Colorado, Trinity and Sabine basins.', terrain: 'Flooded river valleys, coves, bluffs, flats, islands and engineered shorelines.', vegetation: 'Varies from pine forest and oak woodland to prairie, scrub and limestone cedar breaks.', geology: 'Reservoir shape reflects the valley form and bedrock that existed before impoundment.', water: 'Major systems include Toledo Bend, Sam Rayburn, Texoma, Travis and Livingston.',
    signature: ['Flooded valleys', 'Coves and inlets', 'Marina shorelines', 'Limestone cliffs', 'Open-water horizons'], bestFor: ['Boating', 'Fishing', 'Camping', 'Lake weekends', 'Sunset photography'], related: [explore('Lakes & rivers', '/explore/lakes-rivers'), explore('Texas fishing', '/fishing')],
  },
  {
    slug: 'canyons', name: 'Texas Canyons', eyebrow: 'Cut into plains, plateaus and desert',
    dek: 'Texas canyons range from Caprock chasms and limestone river gorges to the massive walls of the Rio Grande.',
    intro: 'Canyons show the vertical side of Texas. Palo Duro and Caprock Canyons expose colorful High Plains sediments, Hill Country rivers cut limestone, and the Rio Grande slices monumental walls through Big Bend.',
    where: 'Most dramatic in the Panhandle, Hill Country, Edwards Plateau and Trans-Pecos.', terrain: 'Escarpments, side canyons, mesas, river gorges, talus slopes and incised drainages.', vegetation: 'Desert scrub, juniper, cypress, oak woodland and prairie grasses depending on region.', geology: 'River and stream erosion exposes layered sedimentary and volcanic rocks.', water: 'Some canyons carry permanent rivers; others flow mainly after storms.',
    signature: ['Palo Duro', 'Santa Elena Canyon', 'Boquillas Canyon', 'Caprock Canyons', 'Limestone gorges'], bestFor: ['Hiking', 'Geology', 'Photography', 'Scenic overlooks', 'Backcountry'], related: [explore('National parks', '/explore/national-parks'), explore('State parks', '/explore/state-parks')],
  },
  {
    slug: 'caves-and-karst', name: 'Texas Caves & Karst', eyebrow: 'The landscape beneath the landscape',
    dek: 'Limestone dissolution has created caves, sinkholes, springs and aquifer systems across Central and West Texas.',
    intro: 'Karst forms when water dissolves soluble rock, especially limestone. In Texas that process has produced caverns, hidden cave systems, sinkholes and major aquifers. The same geology helps explain many Hill Country springs and clear rivers.',
    where: 'Especially across the Edwards Plateau, Hill Country, Balcones Fault Zone and limestone regions of West Texas.', terrain: 'Rocky limestone uplands with sinkholes, solution features, caves and spring outlets.', vegetation: 'Oak-juniper woodland and grassland above ground; specialized cave ecosystems below.', geology: 'Limestone dissolves along fractures and bedding planes.', water: 'Karst aquifers rapidly move groundwater through fractures, conduits and caves to springs.',
    signature: ['Caverns', 'Sinkholes', 'Spring systems', 'Aquifer recharge zones', 'Limestone ledges'], bestFor: ['Caving', 'Geology', 'Springs', 'Science trips', 'Family attractions'], related: [explore('Caverns', '/explore/caverns'), explore('Major springs', '/explore/major-springs')],
  },
  {
    slug: 'prairies-and-grasslands', name: 'Texas Prairies & Grasslands', eyebrow: 'The open-country Texas',
    dek: 'Tallgrass, mixed-grass and shortgrass systems once covered enormous parts of Texas and still shape its open-country identity.',
    intro: 'Texas grasslands range from tallgrass communities on deep Blackland soils to shortgrass prairie on the High Plains and coastal prairie near the Gulf. Fire, grazing, rainfall and soil determine which grasses and wildflowers dominate.',
    where: 'From coastal prairie and the Blackland belt to the Rolling Plains, High Plains and Panhandle.', terrain: 'Flat to rolling open country with broad sky exposure.', vegetation: 'Big bluestem, little bluestem, Indiangrass, grama grasses, buffalo grass and diverse forbs.', geology: 'Soils range from dark clays to sandy loams and calcareous plains.', water: 'Prairie streams, playas, seasonal wetlands and reservoir shorelines concentrate habitat.',
    signature: ['Open horizons', 'Native grasses', 'Wildflower flushes', 'Prairie birds', 'Fire-shaped ecology'], bestFor: ['Birding', 'Wildflowers', 'Photography', 'Prairie restoration', 'Stargazing'], related: [explore('Texas wildflowers', '/article/texas-wildflowers-guide'), explore('Outdoors', '/explore/outdoors')],
  },
  {
    slug: 'deserts', name: 'Texas Deserts', eyebrow: 'Chihuahuan Desert landscapes',
    dek: 'Texas desert country is concentrated in the far west, where basin floors, rocky fans, salt flats and mountain ranges create dramatic dry-country scenery.',
    intro: 'Texas contains the eastern edge of the Chihuahuan Desert. It is far more than sand: gravelly bajadas, creosote flats, gypsum and salt basins, cactus-covered slopes and mountain sky islands all occur within the region.',
    where: 'Primarily the Trans-Pecos west of the Pecos River.', terrain: 'Basins, bajadas, alluvial fans, rocky slopes, salt flats, badlands and foothills.', vegetation: 'Creosote, lechuguilla, ocotillo, sotol, yucca, agave, cactus and desert grasses.', geology: 'Faulted basins, volcanic fields, limestone uplifts and internally drained valleys.', water: 'Sparse surface water; springs, arroyos and the Rio Grande are especially important.',
    signature: ['Creosote flats', 'Ocotillo slopes', 'Salt basins', 'Mountain backdrops', 'Desert light'], bestFor: ['Photography', 'Stargazing', 'Hiking', 'Geology', 'Winter travel'], related: [explore('National parks', '/explore/national-parks'), explore('Road trips', '/explore/road-trips')],
  },
  {
    slug: 'wetlands-and-marshes', name: 'Texas Wetlands & Marshes', eyebrow: 'The state’s waterlogged landscapes',
    dek: 'Coastal marshes, river bottoms, playa lakes, swamps and inland wetlands support some of the richest wildlife habitat in Texas.',
    intro: 'Wetlands appear across Texas in very different forms: salt marshes line Gulf bays, cypress swamps occur in East Texas, playa lakes punctuate the High Plains and bottomland hardwood forests occupy river floodplains.',
    where: 'Statewide, concentrated along the Gulf Coast, East Texas river bottoms and High Plains playa systems.', terrain: 'Marsh plains, swales, sloughs, oxbows, playas, flood basins and cypress swamps.', vegetation: 'Cordgrass, bulrush, sedges, cypress, tupelo, buttonbush, willow and other water-tolerant communities.', geology: 'Often formed in low-gradient settings where water ponds or floods repeatedly.', water: 'Tides, floodwaters, groundwater, seasonal rainfall and river overflow maintain different wetland types.',
    signature: ['Salt marshes', 'Cypress swamps', 'Playa lakes', 'Bottomland forests', 'Migratory bird habitat'], bestFor: ['Birding', 'Paddling', 'Wildlife', 'Nature photography', 'Ecology'], related: [explore('Wildlife & outdoors', '/explore/outdoors'), explore('Beaches & coast', '/explore/beaches-coast')],
  },
  {
    slug: 'forests', name: 'Texas Forests', eyebrow: 'Pine, oak, cypress and mountain woodland',
    dek: 'Texas forests range from humid East Texas pine country to Hill Country oak woodland and isolated mountain forests in the far west.',
    intro: 'Texas contains commercial pine forests, bottomland hardwoods, post oak savannah, cedar-oak Hill Country woodland and small high-elevation conifer communities in western mountains. Together they show the state’s enormous climatic range.',
    where: 'Largest continuous forests in East Texas, with major woodlands in Central Texas and isolated mountain forests in the Trans-Pecos.', terrain: 'Rolling uplands, river bottoms, rocky hills and mountain slopes.', vegetation: 'Pines, oaks, hickories, sweetgum, cypress, juniper, pecan and western mountain conifers.', geology: 'Forest distribution follows rainfall, soils, elevation and fire history more than a single rock type.', water: 'East Texas supports dense stream networks; central and western woodlands cluster around favorable slopes and water.',
    signature: ['Piney Woods', 'Bottomland hardwoods', 'Oak-juniper hills', 'Cypress corridors', 'Mountain woodlands'], bestFor: ['Hiking', 'Camping', 'Fall color', 'Birding', 'Forest drives'], related: [explore('Outdoors', '/explore/outdoors'), explore('Road trips', '/explore/road-trips')],
  },
  {
    slug: 'wildflower-landscapes', name: 'Texas Wildflower Landscapes', eyebrow: 'Seasonal color across the state',
    dek: 'Bluebonnets are only the beginning: Texas wildflower displays shift by soil, rainfall, latitude, elevation and season.',
    intro: 'Wildflower landscapes are temporary but powerful expressions of Texas ecology. Bluebonnets dominate spring imagery, while Indian paintbrush, winecup, coreopsis, phlox, sunflowers and many regional species create different displays from coastal prairie to desert roadsides.',
    where: 'Statewide, with famous spring displays in Central Texas, the Blackland Prairie, Washington County and Hill Country.', terrain: 'Roadsides, prairies, ranchland, limestone slopes, sandy fields and desert flats.', vegetation: 'Bluebonnets, Indian paintbrush, winecup, coreopsis, blanketflower, prairie verbena and sunflowers.', geology: 'Soil type, drainage and disturbance help determine which species dominate.', water: 'Seasonal rainfall and winter moisture strongly influence bloom timing and intensity.',
    signature: ['Bluebonnet fields', 'Paintbrush mixes', 'Prairie blooms', 'Roadside color', 'Desert spring flowers'], bestFor: ['Photography', 'Scenic drives', 'Family day trips', 'Botany', 'Spring travel'], related: [explore('Texas wildflowers guide', '/article/texas-wildflowers-guide'), explore('Road trips', '/explore/road-trips')],
  },
];

export const texasLandscapeGuides: LandscapeGuide[] = [
  {
    slug: 'most-beautiful-landscapes-in-texas', title: 'The Most Beautiful Landscapes in Texas', dek: 'A statewide guide to the places where Texas geography becomes unforgettable.',
    intro: 'Texas beauty is not one thing. It can be Big Bend scale, blue water under Hill Country cypress trees, an East Texas pine wall, spring prairie color or a red-rock Panhandle canyon.',
    sections: [
      { heading: 'For mountain scale', body: 'Start with the Trans-Pecos, Guadalupe Mountains and Big Bend for the state’s greatest elevation relief, darkest skies and strongest desert-and-mountain contrast.' },
      { heading: 'For water and limestone', body: 'The Hill Country and Edwards Plateau combine clear rivers, springs, limestone bluffs and cypress-lined valleys.' },
      { heading: 'For forests and wetlands', body: 'The Piney Woods, Big Thicket and Caddo Lake show the humid side of Texas, with pines, hardwood bottoms, cypress and bayous.' },
      { heading: 'For big sky', body: 'The High Plains, Rolling Plains and Panhandle deliver horizon, cloud and sunset scale that can rival mountain scenery.' },
    ], related: [explore('Texas landscapes hub', '/explore/landscapes'), explore('Road trips', '/explore/road-trips')],
  },
  {
    slug: 'where-does-texas-turn-into-desert', title: 'Where Does Texas Turn Into Desert?', dek: 'The transition is gradual, but true Chihuahuan Desert landscapes become dominant in far West Texas.',
    intro: 'Texas does not cross one line and suddenly become desert. Rainfall generally decreases from east to west, with semi-arid plains appearing before Chihuahuan Desert communities become dominant west of the Pecos.',
    sections: [
      { heading: 'The simplest answer', body: 'Think Trans-Pecos: west of the Pecos River is where Texas enters its clearest desert-and-mountain landscape.' },
      { heading: 'Why Midland is not quite Big Bend', body: 'The Permian Basin is dry and sparsely vegetated, but much of it is better described as semi-arid plains and desert transition.' },
      { heading: 'Where the desert becomes obvious', body: 'Around the Davis Mountains, Van Horn, Big Bend, El Paso and Guadalupe Mountains, creosote, lechuguilla and basin-and-range topography become unmistakable.' },
    ], related: [explore('Texas deserts', '/explore/landscapes/deserts'), explore('Trans-Pecos', '/explore/landscapes/trans-pecos-far-west-texas')],
  },
  {
    slug: 'why-is-the-texas-hill-country-so-hilly', title: 'Why Is the Texas Hill Country So Hilly?', dek: 'Limestone, faulting and river erosion turned the edge of the Edwards Plateau into the terrain Texans call the Hill Country.',
    intro: 'The Hill Country is hilly because rivers and erosion dissected the limestone edge of the Edwards Plateau. The Balcones Fault Zone helped define the elevation break, while streams carved the ridges, valleys and canyon-like terrain visible today.',
    sections: [
      { heading: 'It starts with a plateau', body: 'Much of the region sits on or along the Edwards Plateau, a broad limestone upland rather than a chain of folded mountains.' },
      { heading: 'Rivers did the carving', body: 'The Guadalupe, Pedernales, Blanco, Llano and Frio systems cut into limestone, leaving harder ridges between valleys.' },
      { heading: 'Faulting shaped the eastern edge', body: 'The Balcones Fault Zone marks a major transition between elevated limestone country and lower plains to the east and southeast.' },
      { heading: 'Karst adds another layer', body: 'Because limestone dissolves in water, caves, sink features, springs and underground drainage are widespread.' },
    ], related: [explore('Texas Hill Country', '/explore/landscapes/hill-country'), explore('Edwards Plateau', '/explore/landscapes/edwards-plateau'), explore('Caves & karst', '/explore/landscapes/caves-and-karst')],
  },
  {
    slug: 'texas-geography-explained', title: 'Texas Geography Explained', dek: 'A plain-English tour of why Texas contains forests, prairies, deserts, mountains, marshes and nearly everything between.',
    intro: 'Texas geography is easiest to understand as broad transitions. Elevation generally rises westward, rainfall generally falls, major rivers move mostly toward the Gulf, and bedrock changes from young coastal sediments to older uplifts and volcanic terrain inland and west.',
    sections: [
      { heading: 'East Texas is wetter and more wooded', body: 'Higher rainfall supports Piney Woods, hardwood bottoms and extensive river systems near Louisiana.' },
      { heading: 'Central Texas is a transition zone', body: 'Prairies, savannahs and the limestone Balcones–Edwards system overlap, producing highly varied terrain.' },
      { heading: 'West Texas rises and dries out', body: 'The High Plains stand above surrounding country, while the Trans-Pecos contains basins, mountain ranges and true desert vegetation.' },
      { heading: 'The coast is young and dynamic', body: 'Barrier islands, bays, marshes and delta plains are built from young sediments that storms, rivers and waves continue to reshape.' },
    ], related: [explore('Texas landscapes hub', '/explore/landscapes'), explore('Explore Texas', '/explore')],
  },
  {
    slug: 'best-scenic-drives-for-every-texas-landscape', title: 'Best Scenic Drives for Every Texas Landscape', dek: 'Match the drive to the landscape: mountains, canyons, rivers, forest, prairie, coast and desert.',
    intro: 'Texas scenic drives are better when you choose the type of landscape first. A Hill Country river road is a completely different experience from a Panhandle canyon route or Big Bend desert highway.',
    sections: [
      { heading: 'Hill Country', body: 'Choose roads crossing limestone ridges and river valleys, especially routes connecting small towns, parks and spring-fed waterways.' },
      { heading: 'Far West Texas', body: 'The strongest drives pair broad desert basins with mountain backdrops and long lightly developed highways.' },
      { heading: 'Panhandle', body: 'Drive from the High Plains down through the Caprock to see the transition from flat prairie to canyon country.' },
      { heading: 'East Texas', body: 'Forest roads near Big Thicket, Caddo Lake and national forest country replace open horizons with pines and wetlands.' },
      { heading: 'Gulf Coast', body: 'Barrier-island and bay routes trade elevation for water, marsh, birds and huge sky.' },
    ], related: [explore('Road trips', '/explore/road-trips'), explore('Texas landscapes hub', '/explore/landscapes')],
  },
  {
    slug: 'texas-landscapes-by-region', title: 'Texas Landscapes by Region', dek: 'See how familiar travel regions overlap with ecological and geological landscapes.',
    intro: 'Texas travel regions and natural regions are not identical. A travel region can include several ecoregions, and one natural landscape can span multiple tourism areas. Treat them as overlapping layers.',
    sections: [
      { heading: 'Central Texas', body: 'Hill Country, Edwards Plateau, Blackland Prairie and Post Oak Savannah can all appear within a few hours of one another.' },
      { heading: 'East Texas', body: 'Piney Woods dominate the east, grading westward into Post Oak Savannah and prairie.' },
      { heading: 'North and Northwest Texas', body: 'Cross Timbers, Rolling Plains, High Plains and Panhandle canyon systems create a strong east-to-west transition.' },
      { heading: 'South Texas', body: 'Brush Country grades into the subtropical Rio Grande Valley and Gulf Coastal Plain.' },
      { heading: 'Far West Texas', body: 'The Trans-Pecos contains desert basins, volcanic mountain ranges, limestone mountains and Rio Grande canyons.' },
    ], related: [explore('Explore Texas', '/explore'), explore('Texas landscapes hub', '/explore/landscapes')],
  },
  {
    slug: 'best-places-to-photograph-texas-landscapes', title: 'Best Places to Photograph Texas Landscapes', dek: 'A landscape-first photography guide to desert, canyon, forest, coast, prairie, rivers and wildflowers.',
    intro: 'Texas rewards photographers who plan around landscape type and light. Desert basins favor low-angle light, coastal scenes often work at dawn, and prairie or High Plains photographs depend heavily on sky.',
    sections: [
      { heading: 'Desert and mountains', body: 'Big Bend, the Davis Mountains and Guadalupe Mountains offer dramatic relief, dark skies and long-distance views.' },
      { heading: 'Canyons', body: 'Palo Duro, Caprock Canyons and Rio Grande canyons provide layered rock, shadow and scale.' },
      { heading: 'Rivers and limestone', body: 'Hill Country rivers, cypress-lined banks and limestone bluffs work especially well in soft morning light.' },
      { heading: 'Forest and wetlands', body: 'Caddo Lake, East Texas cypress swamps and pine forests reward fog, overcast light and calm water.' },
      { heading: 'Wildflowers and prairie', body: 'Spring displays are strongest when flowers are composed with roads, fences, trees or broad sky rather than treated as a flat field.' },
    ], related: [explore('Wildflower landscapes', '/explore/landscapes/wildflower-landscapes'), explore('Road trips', '/explore/road-trips')],
  },
  {
    slug: 'what-part-of-texas-looks-like-arizona-colorado-or-the-south', title: 'What Part of Texas Looks Like Arizona, Colorado or the Deep South?', dek: 'Texas contains landscapes that can feel surprisingly similar to several neighboring regions of the country.',
    intro: 'Texas is large enough to contain visual echoes of the Southwest, Rocky Mountain foothills and Deep South. None are exact matches, but the comparisons help travelers picture an unfamiliar part of the state.',
    sections: [
      { heading: 'For an Arizona feel', body: 'Look to the Chihuahuan Desert of Big Bend, the Presidio corridor and other Trans-Pecos basins with ocotillo, creosote and desert mountains.' },
      { heading: 'For a Colorado feel', body: 'The Guadalupe, Davis and Chisos mountains offer the closest Texas analogue to high-country terrain, though elevations are lower and climate is drier.' },
      { heading: 'For a Deep South feel', body: 'The Piney Woods, Big Thicket and Caddo Lake have humid forests, bayous and cypress wetlands that visually connect East Texas to Louisiana.' },
      { heading: 'For Great Plains scale', body: 'The High Plains and Panhandle deliver huge horizons and prairie sky associated with the central Great Plains.' },
    ], related: [explore('Trans-Pecos', '/explore/landscapes/trans-pecos-far-west-texas'), explore('Piney Woods', '/explore/landscapes/piney-woods'), explore('High Plains', '/explore/landscapes/high-plains-llano-estacado')],
  },
];

export const landscapeSlugs = texasLandscapes.map((item) => item.slug);
export const landscapeGuideSlugs = texasLandscapeGuides.map((item) => item.slug);
