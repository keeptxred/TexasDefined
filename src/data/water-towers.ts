export interface WaterTowerStop {
  name: string;
  town: string;
  county: string;
  region: string;
  stopType: string;
  whyStop: string;
  story: string;
  pairWith: string;
  sourceLabel: string;
  sourceUrl: string;
  internalHref?: string;
}

export const waterTowers: WaterTowerStop[] = [
  {
    name: "Leaning Tower of Texas (Britten)", town: "Groom", county: "Carson County", region: "Panhandle & Plains", stopType: "Route 66 roadside oddity",
    whyStop: "The tower was deliberately tilted beside old Route 66 to make drivers look twice, and it still works as a roadside photo stop decades later.",
    story: "Ralph Britten moved the former water tower to Groom and installed it at an intentional lean as advertising for his truck stop. Texas Highways describes the Britten tower as one of the Panhandle's best-known attractions and documents how the family keeps the red, white and blue lettering maintained.",
    pairWith: "Cadillac Ranch, Amarillo's Route 66 corridor and Palo Duro Canyon",
    sourceLabel: "Texas Highways — Leaning Tower of Texas", sourceUrl: "https://texashighways.com/travel/roadside-oddity-the-leaning-tower-of-texas-britten/", internalHref: "/destination/cadillac-ranch",
  },
  {
    name: "Shamrock Water Tower", town: "Shamrock", county: "Wheeler County", region: "Panhandle & Plains", stopType: "Historic engineering landmark",
    whyStop: "A 1915 steel tower that still dominates the Shamrock skyline and has been formally recognized as both a historic landmark and a tourism icon.",
    story: "The Texas Historical Commission records the tower as a Recorded Texas Historic Landmark. Its marker describes a 75,000-gallon tank rising 176 feet, visible for miles across the Panhandle, and notes that generations of travelers have used it as a landmark on the road.",
    pairWith: "The U-Drop Inn, historic Route 66 and a Panhandle road trip", sourceLabel: "Texas Historical Commission — Shamrock Water Tower", sourceUrl: "https://atlas.thc.texas.gov/Details/5507015350",
  },
  {
    name: "Luling Watermelon Water Tower", town: "Luling", county: "Caldwell County", region: "Prairies & Lakes", stopType: "Painted small-town icon",
    whyStop: "Luling turns an ordinary piece of water infrastructure into a giant watermelon, tying the skyline directly to the town's Watermelon Thump identity.",
    story: "Luling's visitor guide calls out the water tower painted like a giant melon alongside barbecue, the Watermelon Thump and the town's decorated pumpjacks. It is exactly the kind of landmark that makes a quick highway stop feel specific to one Texas town.",
    pairWith: "Luling barbecue, the Watermelon Thump, Zedler Mill and the painted pumpjacks", sourceLabel: "Luling Chamber of Commerce visitor guide", sourceUrl: "https://www.tourtexas.com/destinations/345",
  },
  {
    name: "Downtown Round Rock Water Tower", town: "Round Rock", county: "Williamson County", region: "Prairies & Lakes", stopType: "Downtown civic symbol",
    whyStop: "This is less a roadside novelty than a town emblem: a preserved tower that became one of the most photographed and recognizable pieces of downtown Round Rock.",
    story: "The City of Round Rock named the tower a Local Legend in 2018, describing how it became a symbol of downtown and a recurring subject of visitor and social-media photography. The city has also highlighted water towers as iconic Texas water symbols.",
    pairWith: "Historic Downtown Round Rock, local food and nearby Williamson County stops", sourceLabel: "City of Round Rock — Local Legend water tower", sourceUrl: "https://www.roundrocktexas.gov/news/city-council-recognizes-2018-local-legends/",
  },
  {
    name: "Roanoke Water Tower", town: "Roanoke", county: "Denton County", region: "Prairies & Lakes", stopType: "New Deal-era landmark",
    whyStop: "The 1936 tower rises over Roanoke's restored Oak Street and gives a compact historic-downtown visit an unmistakable skyline marker.",
    story: "The Texas Historical Commission records the approximately 150-foot, 100,000-gallon tower as a Recorded Texas Historic Landmark built with Public Works Administration funding. Roanoke's official downtown guide points visitors to the historical marker at the water tower on Oak Street.",
    pairWith: "Historic Oak Street, the Roanoke Visitor Center and a north DFW small-town outing", sourceLabel: "Texas Historical Commission — Roanoke Water Tower", sourceUrl: "https://atlas.thc.texas.gov/Details/5507016351",
  },
  {
    name: "Gruene Water Tower", town: "Gruene / New Braunfels", county: "Comal County", region: "Hill Country", stopType: "Historic-district skyline icon",
    whyStop: "The tower is part of the postcard view of Gruene: historic buildings, live music, the Guadalupe River and the water tower rising over the district.",
    story: "Historic Gruene's official visitor site calls the tower an iconic and beloved landmark visible for miles. Here the tower is best treated as part of a walkable historic district rather than a stand-alone attraction.",
    pairWith: "Gruene Hall, the Guadalupe River and historic New Braunfels", sourceLabel: "Historic Gruene Texas — official district site", sourceUrl: "https://www.gruene-tx.com/", internalHref: "/destination/gruene-historic-district",
  },
  {
    name: "Historic Katy Water Tower", town: "Katy", county: "Harris / Fort Bend / Waller counties", region: "Gulf Coast", stopType: "Mural and town-square landmark",
    whyStop: "Katy's downtown tower has become a civic art surface as well as a recognizable landmark, with murals created as part of the Historic Town Square project.",
    story: "The City of Katy documented installation of Historic Town Square water-tower murals after a community planning effort led with Keep Katy Beautiful. Nearby Harvest Plaza is explicitly designed around Katy's rice-farming beginnings and includes the water tower in the historic downtown setting.",
    pairWith: "Historic Katy, Harvest Plaza and the town's rice-farming history", sourceLabel: "City of Katy — Historic Town Square water tower murals", sourceUrl: "https://www.cityofkaty.com/Home/Components/News/News/1052/17?arch=1&npage=5",
  },
  {
    name: "Old Columbus Water Tower", town: "Columbus", county: "Colorado County", region: "Prairies & Lakes", stopType: "1883 masonry water tower",
    whyStop: "This one breaks the silhouette entirely: a thick-walled brick water tower on the courthouse grounds that later became a museum building.",
    story: "The Texas Historical Commission says Columbus built the brick tower in 1883 and that it served as a water tower and fire house until 1912. Columbus tourism materials continue to feature the old Water Tower as part of the town's compact historic walking circuit.",
    pairWith: "Colorado County Courthouse, Stafford Opera House and a Columbus historic-district walk", sourceLabel: "Texas Historical Commission — Old Columbus Water Tower", sourceUrl: "https://atlas.thc.texas.gov/Details/5089001028", internalHref: "/destination/columbus",
  },
];

export const waterTowerFaq = [
  { question: "Are Texas water towers tourist attractions?", answer: "Some are. Most municipal water towers are infrastructure, not destinations. The towers in this guide earn a stop because they have a documented historic, visual, roadside or community-tourism story." },
  { question: "What is the most unusual water tower in Texas?", answer: "For roadside spectacle, Groom's deliberately tilted Britten tower is the standout. Luling's watermelon-painted tower is another strong example of a town turning water infrastructure into a recognizable local symbol." },
  { question: "Can visitors climb these water towers?", answer: "No climb is implied by inclusion in this guide. Treat the towers primarily as exterior landmarks and photo stops, obey posted rules and private-property boundaries, and use official local guidance for any building or museum access." },
] as const;
