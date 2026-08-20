export const TEXAS_VS_STATE_GROUPS = [
  { region: "Northeast", states: ["Connecticut", "Maine", "Massachusetts", "New Hampshire", "Rhode Island", "Vermont", "New Jersey", "New York", "Pennsylvania"] },
  { region: "Midwest", states: ["Illinois", "Indiana", "Michigan", "Ohio", "Wisconsin", "Iowa", "Kansas", "Minnesota", "Missouri", "Nebraska", "North Dakota", "South Dakota"] },
  { region: "South", states: ["Delaware", "Florida", "Georgia", "Maryland", "North Carolina", "South Carolina", "Virginia", "West Virginia", "Alabama", "Kentucky", "Mississippi", "Tennessee", "Arkansas", "Louisiana", "Oklahoma"] },
  { region: "West", states: ["Arizona", "Colorado", "Idaho", "Montana", "Nevada", "New Mexico", "Utah", "Wyoming", "Alaska", "California", "Hawaii", "Oregon", "Washington"] },
] as const;

export const TEXAS_VS_STATES = TEXAS_VS_STATE_GROUPS.flatMap((group) => group.states);
export const texasVsStateSlug = (value: string) => value.toLowerCase().replaceAll(" ", "-");
export const texasVsStateName = (slug: string) => TEXAS_VS_STATES.find((state) => texasVsStateSlug(state) === slug) ?? null;

export type TexasVsStateProfile = {
  comparisonFocus: string;
  placeLens: string;
  climateLens: string;
};

export const TEXAS_VS_STATE_PROFILES: Record<string, TexasVsStateProfile> = {
  Connecticut: {
    comparisonFocus: "Start with the contrast between a compact Northeast state tied closely to the New York–Boston corridor and a much larger Texas economy spread across several major metros.",
    placeLens: "A useful household comparison might pair southwest Connecticut with Dallas–Fort Worth or Houston, then separately compare smaller Connecticut communities with Texas suburbs or county seats.",
    climateLens: "Winter heating, snow and an older Northeast housing stock deserve more weight in Connecticut; Texas comparisons should put heat, cooling, hail, flooding and long driving distances on the other side of the ledger.",
  },
  Maine: {
    comparisonFocus: "Maine versus Texas is as much a rural-access and climate comparison as a tax or housing comparison, with very different distances, seasons and population patterns.",
    placeLens: "Compare Portland or southern Maine with the Texas metro or smaller city that fits your work, then treat northern and rural Maine as a separate lifestyle comparison rather than using one statewide average.",
    climateLens: "Cold, snow and heating dominate more of the Maine planning conversation; Texas puts much more emphasis on heat, cooling, drought, severe storms and regional water conditions.",
  },
  Massachusetts: {
    comparisonFocus: "The strongest Massachusetts comparison usually centers on Boston-area housing, education and knowledge-economy access versus the larger, more dispersed Texas metro system.",
    placeLens: "Boston should not be compared with all of Texas. Match it with Austin, Dallas–Fort Worth or Houston based on career and neighborhood type, then compare suburbs with suburbs.",
    climateLens: "Massachusetts households plan around winter and older housing systems; Texas households should weigh summer heat, cooling, hail, flooding and very different regional climates.",
  },
  "New Hampshire": {
    comparisonFocus: "New Hampshire and Texas both resist simple tax slogans, so compare the full household tax and housing picture rather than focusing on one missing tax category.",
    placeLens: "Southern New Hampshire's connection to Greater Boston makes it different from the state's rural north; choose the Texas metro, suburb or smaller community that actually matches your likely move.",
    climateLens: "Winter weather and heating are central New Hampshire costs, while Texas shifts the weather budget toward cooling, heat resilience and severe-weather exposure.",
  },
  "Rhode Island": {
    comparisonFocus: "Rhode Island versus Texas is an extreme scale comparison: a compact coastal state with short intercity distances versus a state where metro-to-metro travel can consume much of a day.",
    placeLens: "Providence and its suburbs are better compared with one Texas metro area than with Texas as a whole; coastal access and commuting patterns should be part of the decision.",
    climateLens: "Both states have coastal-weather considerations, but Rhode Island adds winter cold while Texas adds much greater heat and major inland climate variation.",
  },
  Vermont: {
    comparisonFocus: "Vermont versus Texas is primarily a small-state, rural-access, climate and community-scale comparison rather than a contest between two statewide averages.",
    placeLens: "Burlington has no perfect Texas equivalent. Compare it with the smaller Texas city or urban district that best matches your work and cultural needs, then separately assess rural living.",
    climateLens: "Snow, cold and heating shape Vermont life; Texas planning centers much more on heat, air conditioning, drought, hail, flooding and long warm seasons.",
  },
  "New Jersey": {
    comparisonFocus: "New Jersey comparisons should account for its dense New York–Philadelphia corridor connections, commuting patterns and high-value suburban markets rather than treating it as a generic Northeast state.",
    placeLens: "Match North Jersey, the shore, South Jersey and Philadelphia-oriented suburbs to the specific Texas metro and suburb type you would actually consider.",
    climateLens: "New Jersey combines four-season weather and coastal storms; Texas substitutes hotter summers, more cooling demand and sharply different hazards by region.",
  },
  "New York": {
    comparisonFocus: "New York State contains two very different comparisons: New York City and its suburbs versus a Texas metro, and Upstate New York versus Texas cities, suburbs or rural regions.",
    placeLens: "Do not use a New York statewide housing average to decide between Manhattan and Austin, or Buffalo and San Antonio. Build the comparison around the actual metro and neighborhood type.",
    climateLens: "New York adds winter heating and snow; Texas adds longer heat seasons, cooling costs and a broad range of drought, flood, hail and hurricane exposure depending on location.",
  },
  Pennsylvania: {
    comparisonFocus: "Pennsylvania works best as separate Philadelphia, Pittsburgh and smaller-city comparisons because those markets differ sharply from one another and from Texas metros.",
    placeLens: "Pair Philadelphia with a large Texas metro, Pittsburgh with the Texas market that matches your industry and urban preferences, and rural Pennsylvania with a comparable Texas community.",
    climateLens: "Pennsylvania adds winter and older-building considerations; Texas shifts the household risk conversation toward heat, cooling and location-specific severe weather.",
  },
  Illinois: {
    comparisonFocus: "Illinois versus Texas often becomes Chicago versus a major Texas metro, but downstate Illinois requires a different comparison built around smaller cities, agriculture and local job markets.",
    placeLens: "Compare Chicago with Dallas–Fort Worth, Houston or Austin based on career and neighborhood needs, then treat central and southern Illinois separately.",
    climateLens: "Illinois households plan for winter cold and heating; Texas households put more weight on summer cooling, heat and hail, flood or hurricane exposure by region.",
  },
  Indiana: {
    comparisonFocus: "Indiana versus Texas should compare a lower-density Midwestern city-and-suburb system with Texas metros that are larger, more spread out and often more car dependent.",
    placeLens: "Indianapolis can be compared with San Antonio, Fort Worth or parts of Dallas–Fort Worth depending on the job and housing question; smaller Indiana cities need their own peer set.",
    climateLens: "Indiana adds winter weather and freeze cycles while Texas places more emphasis on prolonged heat, cooling and region-specific severe storms.",
  },
  Michigan: {
    comparisonFocus: "Michigan versus Texas is shaped by Great Lakes geography, manufacturing history and winter costs on one side and Texas's larger sunbelt metros and warmer climate on the other.",
    placeLens: "Detroit-area households should compare with the Texas metro that matches their industry and suburban preferences; western and northern Michigan create very different lifestyle comparisons.",
    climateLens: "Michigan requires serious winter and heating planning. Texas requires serious heat and cooling planning, with coastal, drought and hail risks changing by region.",
  },
  Ohio: {
    comparisonFocus: "Ohio has several distinct metros of similar order—Columbus, Cleveland and Cincinnati—while Texas has larger geographic separation and different industry mixes across its major cities.",
    placeLens: "Compare Columbus, Cleveland or Cincinnati to a Texas metro one at a time rather than using state averages, especially for housing, commute and occupation-specific pay.",
    climateLens: "Ohio adds colder winters and freeze exposure; Texas shifts costs toward air conditioning, heat and geographically variable storm risks.",
  },
  Wisconsin: {
    comparisonFocus: "Wisconsin versus Texas combines a manufacturing-and-agriculture comparison with a major difference in winter climate, city scale and outdoor recreation patterns.",
    placeLens: "Milwaukee and Madison should be matched to different Texas metros because their industries, universities and housing markets are not interchangeable.",
    climateLens: "Wisconsin's cold season, snow and heating are central; Texas places greater emphasis on long hot seasons, cooling and water or storm conditions.",
  },
  Iowa: {
    comparisonFocus: "Iowa versus Texas is useful for households comparing smaller Midwestern metros and agricultural regions with faster-growing Texas suburbs, cities and rural counties.",
    placeLens: "Des Moines or Cedar Rapids should be compared with the Texas city or suburban market that matches the household's employment and desired scale, not with Houston or Texas statewide by default.",
    climateLens: "Iowa adds cold winters, snow and freeze-thaw cycles; Texas adds prolonged heat and a different mix of drought, hail, flood and hurricane exposure.",
  },
  Kansas: {
    comparisonFocus: "Kansas and Texas share plains geography in places, but household comparisons change quickly once Kansas City or Wichita is matched against the much larger Texas metro system.",
    placeLens: "Wichita and the Kansas side of Kansas City are different comparisons; match each to the Texas labor market, commute pattern and housing type you would realistically choose.",
    climateLens: "Both states can face severe storms, but Kansas adds colder winters while Texas adds longer heat seasons and coastal hazards in the southeast.",
  },
  Minnesota: {
    comparisonFocus: "Minnesota versus Texas puts Minneapolis–Saint Paul and a cold-climate household budget against Texas's multiple warm-climate metros and broader regional differences.",
    placeLens: "Twin Cities households should choose a Texas metro based on occupation, housing form, transit expectations and neighborhood preference rather than simply comparing state averages.",
    climateLens: "Heating, snow and deep winter cold matter much more in Minnesota; Texas shifts energy and resilience planning toward heat, cooling and severe-weather variation.",
  },
  Missouri: {
    comparisonFocus: "Missouri needs at least two metro comparisons—St. Louis and Kansas City—before smaller cities and rural areas are considered, while Texas has several larger and more distant metro choices.",
    placeLens: "Match each Missouri metro to the Texas labor market and urban form that fits your household; do not assume one statewide cost number represents either state.",
    climateLens: "Both states see severe storms, but Missouri has colder winters while Texas has longer extreme-heat periods and coastal exposure in part of the state.",
  },
  Nebraska: {
    comparisonFocus: "Nebraska versus Texas often means comparing Omaha or Lincoln with a Texas city while also deciding whether the much larger scale and travel distances of Texas fit your household.",
    placeLens: "Omaha and Lincoln have different university, employer and housing profiles; choose separate Texas peers rather than one statewide benchmark.",
    climateLens: "Nebraska adds colder winters and snow; Texas adds longer heat seasons, higher cooling needs and major regional differences in water and storm exposure.",
  },
  "North Dakota": {
    comparisonFocus: "North Dakota versus Texas can be an energy-and-agriculture comparison, but city size, winter severity and access to services make the household experience very different.",
    placeLens: "Fargo and Bismarck should be compared with smaller Texas metros or regional centers before looking at Dallas or Houston-scale markets.",
    climateLens: "North Dakota's winter cold and heating needs are defining household factors; Texas reverses that emphasis toward heat, cooling and drought or storm resilience.",
  },
  "South Dakota": {
    comparisonFocus: "South Dakota versus Texas is a scale, climate and labor-market comparison, with smaller metros and rural access on one side and several very large Texas metros on the other.",
    placeLens: "Sioux Falls and Rapid City create different comparisons; select a Texas peer based on job market, outdoor access and community size rather than a statewide average.",
    climateLens: "South Dakota adds snow, cold and winter travel; Texas adds prolonged summer heat and more varied drought, flood, hail and coastal risks.",
  },
  Delaware: {
    comparisonFocus: "Delaware versus Texas contrasts a very compact Mid-Atlantic state tied to nearby Philadelphia, Baltimore and Washington markets with Texas's much larger independent metro regions.",
    placeLens: "Wilmington and coastal Delaware should be compared separately, then matched with the Texas metro or coastal community that reflects the actual move.",
    climateLens: "Both can face coastal storms, but Delaware adds colder winters while Texas adds greater heat and much broader inland climate variation.",
  },
  Florida: {
    comparisonFocus: "Florida and Texas are both large Sun Belt states, so the useful comparison is usually metro-to-metro and hazard-to-hazard rather than a simple statewide tax comparison.",
    placeLens: "Miami, Tampa, Orlando and Jacksonville should each be matched with a Texas metro based on work, housing and transportation; coastal and inland locations need separate treatment.",
    climateLens: "Both states require heat and storm planning. Florida places more of the state in a humid subtropical or tropical coastal context, while Texas ranges from humid Gulf Coast to plains, desert and mountains.",
  },
  Georgia: {
    comparisonFocus: "Georgia versus Texas often starts with Atlanta versus Dallas–Fort Worth, Houston or Austin, but the rest of Georgia creates a different small-city and rural comparison.",
    placeLens: "Atlanta's airport, job market and suburban form make it a logical metro comparison; Savannah, Augusta and other Georgia markets should be matched separately.",
    climateLens: "Both states have hot summers and severe-weather concerns, but Texas is larger and spans more arid and continental climates while Georgia remains more consistently humid.",
  },
  Maryland: {
    comparisonFocus: "Maryland comparisons are strongly influenced by the Washington–Baltimore corridor, federal employment and dense commuting networks that do not map neatly onto Texas statewide averages.",
    placeLens: "Match the Washington suburbs and Baltimore area separately with the Texas metro or employment center that best reflects the household's career and commute needs.",
    climateLens: "Maryland adds a colder winter and Mid-Atlantic seasonality; Texas adds longer heat, greater cooling demand and broader drought, hail and coastal-storm variation.",
  },
  "North Carolina": {
    comparisonFocus: "North Carolina versus Texas is best handled through Research Triangle, Charlotte, Triad and coastal or mountain comparisons rather than one statewide score.",
    placeLens: "Raleigh–Durham and Charlotte should be compared with different Texas metros based on industry, university ties, housing and airport needs.",
    climateLens: "Both states have hot regions and storm exposure, but North Carolina adds Appalachian and Atlantic patterns while Texas stretches from Gulf humidity to desert mountains.",
  },
  "South Carolina": {
    comparisonFocus: "South Carolina versus Texas combines coastal, manufacturing and fast-growing metro questions, but the scale of Texas means commute and regional differences need extra weight.",
    placeLens: "Charleston, Greenville and Columbia should each be matched to a different Texas peer depending on job sector, historic urban form and coastal preference.",
    climateLens: "Both states are hot and storm-aware, but Texas includes much drier western regions and longer travel distances between climate zones.",
  },
  Virginia: {
    comparisonFocus: "Virginia contains several distinct economies—Northern Virginia, Richmond, Hampton Roads and western Virginia—so a Texas comparison needs multiple place-specific lenses.",
    placeLens: "Northern Virginia is a Washington-region comparison, Richmond is a different urban market, and Hampton Roads adds military and coastal factors; choose Texas peers accordingly.",
    climateLens: "Virginia has four-season weather and Appalachian-to-coastal variation; Texas is generally hotter and spans an even wider humidity and aridity range.",
  },
  "West Virginia": {
    comparisonFocus: "West Virginia versus Texas is a strong example of why statewide averages are insufficient: terrain, rural access, energy employment and city scale differ dramatically.",
    placeLens: "Charleston, Morgantown and rural Appalachian communities need different Texas peers, particularly when health care access, universities or energy work matter.",
    climateLens: "Mountain terrain, winter weather and flooding shape West Virginia; Texas shifts toward heat, drought and a different mix of flood, hail and coastal exposure.",
  },
  Alabama: {
    comparisonFocus: "Alabama versus Texas can compare lower-cost Southern metros, manufacturing, energy and military markets, while accounting for the much larger size of Texas cities and distances.",
    placeLens: "Birmingham, Huntsville and Mobile each need different Texas peers because technology, manufacturing and coastal factors vary substantially.",
    climateLens: "Both states have hot summers and severe storms; Texas adds much drier western regions and more extreme statewide climate variation.",
  },
  Kentucky: {
    comparisonFocus: "Kentucky versus Texas combines manufacturing, logistics, health care and rural-region comparisons with very different state scale and climate patterns.",
    placeLens: "Louisville and Lexington should be matched separately to Texas metros based on industry, university presence and housing form; eastern Kentucky requires a rural comparison.",
    climateLens: "Kentucky has colder winters and more four-season balance; Texas adds longer heat seasons and much greater west-to-east climate variation.",
  },
  Mississippi: {
    comparisonFocus: "Mississippi versus Texas should compare specific labor markets and household services rather than relying on statewide affordability headlines, especially outside the largest cities.",
    placeLens: "Jackson, Gulf Coast communities and northern Mississippi each need different Texas peers based on employment, coastal access and community scale.",
    climateLens: "Both states have hot summers and Gulf-influenced storm risks in places, while Texas extends far into drier plains, desert and mountain climates.",
  },
  Tennessee: {
    comparisonFocus: "Tennessee versus Texas is often a Nashville, Memphis, Knoxville or Chattanooga comparison, each of which points to a different Texas metro and industry mix.",
    placeLens: "Nashville's growth and entertainment economy, Memphis logistics, Knoxville university ties and Chattanooga scale should not be collapsed into one Tennessee average.",
    climateLens: "Both states can be hot and storm-prone, but Tennessee has more Appalachian influence and cooler winters while Texas spans humid coast to desert.",
  },
  Arkansas: {
    comparisonFocus: "Arkansas versus Texas is useful for households weighing smaller metros, outdoor access and lower-density living against Texas's larger employment centers and longer travel distances.",
    placeLens: "Northwest Arkansas, Little Rock and the Delta are different comparisons; match each with a Texas region that reflects the job market and community size you actually want.",
    climateLens: "Both can be hot and stormy, but Arkansas is generally greener and more compact while Texas spans much drier and hotter western landscapes.",
  },
  Louisiana: {
    comparisonFocus: "Louisiana and Texas share Gulf Coast, energy and cultural connections, but the useful comparison separates Houston from New Orleans, industrial corridors from rural areas, and inland Texas from the coast.",
    placeLens: "New Orleans, Baton Rouge and Shreveport should each be matched with different Texas peers based on industry, culture, flood exposure and urban scale.",
    climateLens: "Both states face heat, humidity and hurricanes along the Gulf, while Texas also extends into semi-arid plains, desert and mountains with entirely different risks.",
  },
  Oklahoma: {
    comparisonFocus: "Oklahoma is one of Texas's closest practical comparisons because of geography, energy, plains culture and interstate migration, but Texas offers several much larger labor markets.",
    placeLens: "Oklahoma City and Tulsa can be compared with Fort Worth, San Antonio or other Texas metros depending on occupation and preferred scale; border communities create another distinct comparison.",
    climateLens: "Both states face heat, drought, hail and severe storms, while Texas additionally includes Gulf Coast hurricane exposure and far-west desert conditions.",
  },
  Arizona: {
    comparisonFocus: "Arizona versus Texas is a Sun Belt growth comparison in which water, summer heat, metro form and state geography matter as much as taxes or housing.",
    placeLens: "Phoenix can be compared with Dallas–Fort Worth, Houston or Austin depending on industry and housing preference; Tucson and northern Arizona need different peers.",
    climateLens: "Arizona's desert heat is generally much drier, while Texas combines humid heat in the east with drier heat in the west and greater severe-storm and Gulf exposure.",
  },
  Colorado: {
    comparisonFocus: "Colorado versus Texas often centers on Denver versus a major Texas metro, but mountain access, housing form, altitude and outdoor priorities can dominate the decision.",
    placeLens: "Denver, Colorado Springs and Fort Collins should be compared separately with Texas metros based on employment, university or military ties and desired city scale.",
    climateLens: "Colorado adds altitude, snow and mountain weather; Texas adds longer heat seasons, lower elevations in most populated areas and broader hail, flood, drought and hurricane variation.",
  },
  Idaho: {
    comparisonFocus: "Idaho versus Texas is a growth, housing and outdoor-access comparison where Boise should be separated from northern Idaho and more rural agricultural regions.",
    placeLens: "Boise is better matched with a smaller or mid-sized Texas metro than with Houston; Coeur d'Alene and eastern Idaho create different work and lifestyle comparisons.",
    climateLens: "Idaho adds colder winters and mountain conditions; Texas adds much longer heat seasons and more varied drought, hail, flood and coastal risks.",
  },
  Montana: {
    comparisonFocus: "Montana versus Texas is strongly shaped by rural distance, mountain access, housing supply in popular towns and the scale of local job markets.",
    placeLens: "Bozeman, Missoula, Billings and rural Montana each need different Texas peers; a major Texas metro comparison can obscure the lifestyle tradeoff entirely.",
    climateLens: "Montana emphasizes winter, snow, wildfire and mountain weather while Texas emphasizes heat, cooling, drought and severe storms, with coastal risks in the southeast.",
  },
  Nevada: {
    comparisonFocus: "Nevada versus Texas is not just Las Vegas versus Texas. Reno, northern Nevada and rural mining regions produce different job, housing and climate comparisons.",
    placeLens: "Las Vegas can be matched with a Texas metro based on tourism, services and housing; Reno may align better with a smaller high-growth market depending on occupation.",
    climateLens: "Nevada is much drier overall, while Texas ranges from humid Gulf Coast to desert; both require serious heat planning in their hottest regions.",
  },
  "New Mexico": {
    comparisonFocus: "New Mexico and Texas share a long border and western landscapes, but their metro scale, state economies and population distribution are very different.",
    placeLens: "Albuquerque, Santa Fe and Las Cruces each point to different Texas peers; El Paso is especially relevant for border-region comparisons but is not representative of all Texas.",
    climateLens: "Both have arid western regions, while Texas extends far east into humid subtropical climate and carries greater Gulf and plains storm exposure.",
  },
  Utah: {
    comparisonFocus: "Utah versus Texas is a growth and family-household comparison in which Salt Lake City, Wasatch Front geography and access to public lands are major differentiators.",
    placeLens: "Salt Lake City and Provo should be matched with Texas metros based on technology, universities, commuting and desired urban scale rather than state averages.",
    climateLens: "Utah adds altitude, snow and dry air; Texas generally brings hotter, longer summers and a much broader humidity and severe-weather range.",
  },
  Wyoming: {
    comparisonFocus: "Wyoming versus Texas is an energy, ranching and rural-distance comparison, but Wyoming's much smaller cities and mountain-plains geography create a very different service and labor-market scale.",
    placeLens: "Cheyenne, Casper and Jackson are three different comparisons; choose Texas peers based on government, energy, tourism or rural lifestyle rather than population alone.",
    climateLens: "Wyoming adds altitude, wind, snow and cold; Texas adds longer heat, cooling demand and broader drought, hail, flood and coastal-storm exposure.",
  },
  Alaska: {
    comparisonFocus: "Alaska versus Texas is an unusually large-state comparison where energy, military presence and long distances overlap, but transportation, remoteness and climate are fundamentally different.",
    placeLens: "Anchorage, Fairbanks and remote Alaska should be treated separately; no single Texas metro reproduces the logistics or isolation of off-road-system communities.",
    climateLens: "Alaska planning centers on cold, heating, darkness and remote logistics; Texas centers on heat, cooling and a wide range of storm, drought and coastal hazards.",
  },
  California: {
    comparisonFocus: "California versus Texas should be broken into metro and regional comparisons because Los Angeles, the Bay Area, San Diego, Sacramento and inland California have very different costs and industries.",
    placeLens: "Match Bay Area technology roles with Austin or Dallas where appropriate, Los Angeles with a large Texas metro by industry, and inland California with the Texas city or county that actually fits the move.",
    climateLens: "California's climate varies from Mediterranean coast to desert and mountains; Texas is hotter and more humid in many populated regions and has a different mix of hail, tornado, flood and hurricane exposure.",
  },
  Hawaii: {
    comparisonFocus: "Hawaii versus Texas is dominated by island logistics, housing supply, transportation, food and energy costs, and the tradeoff between geographic isolation and access to the continental U.S.",
    placeLens: "Honolulu should be compared with the specific Texas metro that meets your employment needs, while neighbor-island living has no direct large-city Texas equivalent.",
    climateLens: "Hawaii's tropical maritime climate differs sharply from Texas's continental scale and extremes, where heat, drought, freezes and severe storms vary greatly by region.",
  },
  Oregon: {
    comparisonFocus: "Oregon versus Texas usually separates Portland from the Willamette Valley, central Oregon and southern Oregon, then matches those places with specific Texas metros or regions.",
    placeLens: "Portland's urban form and transit expectations differ from most Texas metros; Bend and Eugene need separate comparisons based on outdoor access, universities and job market.",
    climateLens: "Western Oregon is milder and wetter in winter with dry summers, while Texas is generally hotter and spans humid Gulf Coast, plains and desert climates with different hazards.",
  },
  Washington: {
    comparisonFocus: "Washington versus Texas often starts with Seattle versus Austin or Dallas, but eastern Washington and smaller cities create very different housing, industry and climate comparisons.",
    placeLens: "Seattle's technology market, transit and geography should be matched separately from Spokane or the Tri-Cities; pick Texas peers based on the actual job and community type.",
    climateLens: "Western Washington is cool and marine-influenced while eastern Washington is drier; Texas is generally hotter and carries a broader mix of hail, tornado, flood, drought and hurricane exposure.",
  },
};

export const texasVsStateProfile = (name: string) => TEXAS_VS_STATE_PROFILES[name] ?? null;
