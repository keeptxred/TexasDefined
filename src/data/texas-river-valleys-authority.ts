export const texasRiverValleysFaq = [
  {
    q: "How many major river basins are in Texas?",
    a: "The Texas Water Development Board recognizes 15 major river basins and eight coastal basins. Basin boundaries follow drainage divides rather than county or city lines.",
  },
  {
    q: "Why are some Texas rivers clear and others muddy?",
    a: "Water clarity reflects geology, sediment, rainfall, groundwater input, vegetation, channel type and recent flow conditions. Spring-fed limestone rivers can be exceptionally clear, while long prairie rivers often carry more suspended sediment.",
  },
  {
    q: "Why do Texas rivers flood so quickly?",
    a: "Parts of Central and West Texas combine intense thunderstorms, thin soils, steep or rocky watersheds and narrow valleys. Water can reach channels rapidly, causing dangerous flash floods even when skies are clear at the river itself.",
  },
  {
    q: "What is the difference between a river and a river valley?",
    a: "The river is the flowing channel. The river valley is the larger landform built and cut by the river over time, including floodplains, terraces, bottomlands, abandoned channels and valley walls.",
  },
  {
    q: "Are Texas rivers natural if they contain reservoirs?",
    a: "Yes, but most major systems are now strongly modified. Dams alter flow timing, sediment movement, temperature and aquatic habitat, while the underlying river valley remains part of the original drainage system.",
  },
  {
    q: "Which Texas rivers are spring-fed?",
    a: "Many Central Texas rivers receive important groundwater and spring contributions, especially in limestone and karst country. The Comal, San Marcos, upper Guadalupe, Frio, Nueces and Devils systems are among the best-known examples.",
  },
] as const;

export const texasRiverValleysSources = [
  { label: "Texas Water Development Board — River Basins & Reservoirs", href: "https://www.twdb.texas.gov/surfacewater/rivers/" },
  { label: "Texas Water Development Board — All Texas river basins", href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/index.asp" },
  { label: "Texas Water Development Board — Water conditions & data", href: "https://www.twdb.texas.gov/surfacewater/conditions/index.asp" },
  { label: "Texas Water Development Board — Rio Grande Basin", href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/riogrande/" },
  { label: "Texas Water Development Board — Brazos Basin", href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/brazos/index.asp" },
  { label: "Texas Water Development Board — Colorado Basin", href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/colorado/" },
  { label: "Texas Water Development Board — Guadalupe Basin", href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/guadalupe/index.asp" },
  { label: "Texas Water Development Board — Trinity Basin", href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/trinity/index.asp" },
  { label: "Texas Water Development Board — Sabine Basin", href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/sabine/index.asp" },
  { label: "Texas Water Development Board — Neches Basin", href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/neches/index.asp" },
  { label: "Texas Water Development Board — Nueces Basin", href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/nueces/" },
  { label: "Texas Water Development Board — San Antonio Basin", href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/sanantonio/" },
  { label: "Texas Water Development Board — Red River Basin", href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/red/index.asp" },
  { label: "Texas Water Development Board — Canadian Basin", href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/canadian/index.asp" },
  { label: "Texas Water Development Board — Lakes & reservoirs", href: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/" },
  { label: "Texas Parks & Wildlife — Texas River Guide", href: "https://tpwd.texas.gov/landwater/water/habitats/rivers/" },
  { label: "Texas Parks & Wildlife — River fishing & public access", href: "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/" },
  { label: "USGS — Texas real-time water data", href: "https://waterdata.usgs.gov/tx/nwis/rt" },
  { label: "USGS Water Science School — Rivers, streams & creeks", href: "https://www.usgs.gov/special-topics/water-science-school/science/rivers-streams-and-creeks" },
  { label: "National Park Service — Rio Grande Wild & Scenic River", href: "https://www.nps.gov/rigr/index.htm" },
] as const;

export const texasMajorRiverBasins = [
  { name: "Canadian", region: "Panhandle", connection: "Arkansas–Mississippi system" },
  { name: "Red", region: "North Texas", connection: "Mississippi system" },
  { name: "Sulphur", region: "Northeast Texas", connection: "Red–Mississippi system" },
  { name: "Cypress", region: "Northeast Texas", connection: "Caddo Lake / Red system" },
  { name: "Sabine", region: "East Texas", connection: "Sabine Lake / Gulf" },
  { name: "Neches", region: "East Texas", connection: "Sabine Lake / Gulf" },
  { name: "Trinity", region: "North & East Texas", connection: "Trinity Bay / Gulf" },
  { name: "San Jacinto", region: "Houston region", connection: "Galveston Bay / Gulf" },
  { name: "Brazos", region: "West, Central & Southeast Texas", connection: "Gulf of Mexico" },
  { name: "Colorado", region: "West & Central Texas", connection: "Matagorda Bay / Gulf" },
  { name: "Lavaca", region: "South-Central coast", connection: "Lavaca Bay / Gulf" },
  { name: "Guadalupe", region: "Hill Country & coast", connection: "San Antonio Bay / Gulf" },
  { name: "San Antonio", region: "South-Central Texas", connection: "Guadalupe system" },
  { name: "Nueces", region: "Edwards Plateau & South Texas", connection: "Nueces Bay / Gulf" },
  { name: "Rio Grande", region: "West Texas & border", connection: "Gulf of Mexico" },
] as const;

export const texasRiverComparison = [
  { river: "Rio Grande", region: "Border & Trans-Pecos", character: "Desert canyon to irrigated lower valley", geology: "Mountain basins, canyon rock, alluvium", signature: "Big Bend · Amistad · Lower Valley", href: "/article/texas-rio-grande-river-guide" },
  { river: "Pecos", region: "Far West Texas", character: "Arid tributary with variable flow and salinity", geology: "Desert basin and canyon country", signature: "Lower Pecos · Amistad confluence", href: "/article/texas-pecos-river-guide" },
  { river: "Brazos", region: "Plains to Gulf", character: "Long sediment-rich cross-state river", geology: "Plains, prairie, broad coastal alluvium", signature: "Possum Kingdom · Washington-on-the-Brazos", href: "/article/texas-brazos-river-guide" },
  { river: "Colorado", region: "West & Central Texas", character: "Reservoir-linked river with Hill Country tributaries", geology: "Plains, limestone, coastal plain", signature: "Highland Lakes · Austin · Matagorda", href: "/article/texas-colorado-river-guide" },
  { river: "Guadalupe", region: "Hill Country to coast", character: "Clear spring-influenced upper river", geology: "Limestone to coastal alluvium", signature: "Kerrville · Canyon Lake · Guadalupe State Park", href: "/article/texas-guadalupe-river-guide" },
  { river: "Trinity", region: "North Texas to coast", character: "Urban, reservoir-managed and broad downstream", geology: "Prairie and coastal plain", signature: "DFW forks · Trinity Bay", href: "/article/texas-trinity-river-guide" },
  { river: "Sabine", region: "East Texas", character: "High-flow humid forest river", geology: "Piney Woods and coastal plain", signature: "Toledo Bend · Texas-Louisiana boundary", href: "/article/texas-sabine-river-guide" },
  { river: "Neches", region: "East Texas", character: "Forested bottomland river with sloughs and bayous", geology: "Piney Woods and alluvial bottomlands", signature: "Big Thicket · Angelina · Sabine Lake", href: "/article/texas-neches-river-guide" },
  { river: "Nueces", region: "Plateau to Coastal Bend", character: "Clear upper reaches, drier middle basin", geology: "Limestone to South Texas alluvium", signature: "Upper Nueces · Choke Canyon · Nueces Bay", href: "/article/texas-nueces-river-guide" },
  { river: "Frio", region: "Hill Country", character: "Cold, clear, spring-influenced tributary", geology: "Edwards limestone and gravel", signature: "Garner State Park · Concan", href: "/article/texas-frio-river-guide" },
  { river: "San Antonio", region: "Bexar County to coastal plain", character: "Spring-origin urban river becoming rural downstream", geology: "Balcones edge to coastal plain", signature: "River Walk · Missions · Goliad corridor", href: "/article/texas-san-antonio-river-guide" },
  { river: "Red", region: "North Texas", character: "Sediment-rich boundary river", geology: "Plains soils, broad valleys and tributaries", signature: "Texas-Oklahoma boundary · Lake Texoma", href: "/article/texas-red-river-guide" },
  { river: "Canadian", region: "Panhandle", character: "Low-yield plains river cutting breaks and canyon country", geology: "High Plains margin and sedimentary breaks", signature: "Lake Meredith · Canadian River breaks", href: "/article/texas-canadian-river-guide" },
] as const;
