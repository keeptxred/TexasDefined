export type FeaturedFootballSourceRow = readonly [rank: number, suppliedName: string];

export type FeaturedFootballProgram = {
  slug: string;
  displayName: string;
  searchName: string;
  aliases: readonly string[];
  sourceRanks: readonly number[];
  primaryRank: number;
  governingBodyHint?: 'SPC' | 'TAPPS' | 'TCAL';
  associationClassification?: string;
  associationSourceUrl?: string;
};

export const FEATURED_SOURCE_ROW_COUNT = 250;
export const FEATURED_UNIQUE_PROGRAM_COUNT = 242;

export const FEATURED_FOOTBALL_SOURCE_ROWS: readonly FeaturedFootballSourceRow[] = [
  [1, "Allen"],
  [2, "North Crowley"],
  [3, "Duncanville"],
  [4, "Waxahachie"],
  [5, "North Shore (Houston)"],
  [6, "Cypress Ranch"],
  [7, "C.E. King (Houston)"],
  [8, "Coppell"],
  [9, "Denton Guyer"],
  [10, "Prosper"],
  [11, "Southlake Carroll"],
  [12, "Lewisville"],
  [13, "DeSoto"],
  [14, "Randle (Richmond)"],
  [15, "South Oak Cliff (Dallas)"],
  [16, "Argyle"],
  [17, "Lake Travis (Austin)"],
  [18, "Anna"],
  [19, "Frisco Lone Star"],
  [20, "Longview"],
  [21, "Celina"],
  [22, "Westlake (Austin)"],
  [23, "Aledo"],
  [24, "Carthage"],
  [25, "Katy"],
  [26, "Smithson Valley (Spring Branch)"],
  [27, "Summer Creek (Houston)"],
  [28, "Atascocita (Humble)"],
  [29, "Stephenville"],
  [30, "Pleasant Grove"],
  [31, "Willis"],
  [32, "Johnson (San Antonio)"],
  [33, "Rockwall"],
  [34, "Midway (Waco)"],
  [35, "Dripping Springs"],
  [36, "Klein Collins"],
  [37, "Lancaster"],
  [38, "North Forney"],
  [39, "Cibolo Steele"],
  [40, "Rockwall-Heath"],
  [41, "Round Rock"],
  [42, "Harker Heights"],
  [43, "Liberty Christian (Argyle)"],
  [44, "Sunnyvale"],
  [45, "Mt. Pleasant"],
  [46, "Walnut Grove (Prosper)"],
  [47, "Amarillo"],
  [48, "Richland"],
  [49, "West Plains (Canyon)"],
  [50, "Stephenville"],
  [51, "Lindale"],
  [52, "Decatur"],
  [53, "Davenport (Comal)"],
  [54, "La Vernia"],
  [55, "Bay City"],
  [56, "Springtown"],
  [57, "El Campo"],
  [58, "Kerrville Tivy"],
  [59, "Highland Park (Dallas)"],
  [60, "Cy-Fair"],
  [61, "Manvel"],
  [62, "Pflugerville Weiss"],
  [63, "Palestine Westwood"],
  [64, "San Antonio Roosevelt"],
  [65, "Gilmer"],
  [66, "Humble Kingwood"],
  [67, "Cedar Hill"],
  [68, "Lancaster"],
  [69, "Shadow Creek (Pearland)"],
  [70, "Fort Bend Christian"],
  [71, "Austin LBJ"],
  [72, "Houston Furr"],
  [73, "Yoakum"],
  [74, "Wall"],
  [75, "Muenster"],
  [76, "Hamilton"],
  [77, "Oakridge (Arlington)"],
  [78, "Kinkaid (Houston)"],
  [79, "Texas Wind (Waco)"],
  [80, "Harvest Christian (Bartonville)"],
  [81, "Grace Academy (Georgetown)"],
  [82, "Parish Episcopal (Dallas)"],
  [83, "All Saints (Fort Worth)"],
  [84, "Lubbock Christian"],
  [85, "First Baptist (Dallas)"],
  [86, "Tyler High"],
  [87, "Lufkin"],
  [88, "Abilene"],
  [89, "Abilene Wylie"],
  [90, "Frisco Emerson"],
  [91, "McKinney"],
  [92, "McKinney Boyd"],
  [93, "Plano East"],
  [94, "Plano Senior"],
  [95, "Plano West"],
  [96, "Hebron"],
  [97, "Marcus (Flower Mound)"],
  [98, "Denton Ryan"],
  [99, "Denton Braswell"],
  [100, "The Woodlands"],
  [101, "College Park"],
  [102, "Oak Ridge"],
  [103, "Conroe"],
  [104, "Willis"],
  [105, "New Caney"],
  [106, "Grand Oaks"],
  [107, "Ridge Point"],
  [108, "Hightower"],
  [109, "Fort Bend Travis"],
  [110, "Fort Bend Austin"],
  [111, "Elkins"],
  [112, "George Ranch"],
  [113, "Foster"],
  [114, "Fulshear"],
  [115, "Terry"],
  [116, "Lamar Consolidated"],
  [117, "Pearland"],
  [118, "Dawson"],
  [119, "Alief Taylor"],
  [120, "Alief Elsik"],
  [121, "Alief Hastings"],
  [122, "Clear Springs"],
  [123, "Clear Creek"],
  [124, "Clear Falls"],
  [125, "Clear Lake"],
  [126, "Clear Brook"],
  [127, "Dickinson"],
  [128, "Galveston Ball"],
  [129, "Texas City"],
  [130, "La Marque"],
  [131, "Hitchcock"],
  [132, "Santa Fe"],
  [133, "Friendswood"],
  [134, "Angleton"],
  [135, "Brazosport"],
  [136, "Columbia"],
  [137, "Sweeny"],
  [138, "Van Vleck"],
  [139, "East Bernard"],
  [140, "Tidehaven"],
  [141, "Boling"],
  [142, "Palacios"],
  [143, "Industrial"],
  [144, "Ganado"],
  [145, "Edna"],
  [146, "Hallettsville"],
  [147, "Shiner"],
  [148, "Refugio"],
  [149, "Woodsboro"],
  [150, "Bloomington"],
  [151, "Goliad"],
  [152, "Cuero"],
  [153, "Yoakum"],
  [154, "Victoria East"],
  [155, "Victoria West"],
  [156, "St. Joseph (Victoria)"],
  [157, "Calallen"],
  [158, "Flour Bluff"],
  [159, "Tuloso-Midway"],
  [160, "Alice"],
  [161, "Kingsville King"],
  [162, "Robstown"],
  [163, "Sinton"],
  [164, "Orange Grove"],
  [165, "San Diego"],
  [166, "Hebbronville"],
  [167, "Falfurrias"],
  [168, "George West"],
  [169, "Three Rivers"],
  [170, "Mathis"],
  [171, "Odem"],
  [172, "Taft"],
  [173, "Aransas Pass"],
  [174, "Rockport-Fulton"],
  [175, "Gregory-Portland"],
  [176, "Beeville Jones"],
  [177, "Pleasanton"],
  [178, "Somerset"],
  [179, "Pearsall"],
  [180, "Devine"],
  [181, "Hondo"],
  [182, "Carrizo Springs"],
  [183, "Crystal City"],
  [184, "Uvalde"],
  [185, "Medina Valley"],
  [186, "Southside"],
  [187, "Southwest"],
  [188, "Southwest Legacy"],
  [189, "Floresville"],
  [190, "La Vernia"],
  [191, "Poth"],
  [192, "Falls City"],
  [193, "Stockdale"],
  [194, "Nixon-Smiley"],
  [195, "Kenedy"],
  [196, "Karnes City"],
  [197, "Boerne"],
  [198, "Boerne Champion"],
  [199, "Fredericksburg"],
  [200, "Bandera"],
  [201, "Comfort"],
  [202, "Center Point"],
  [203, "Ingram Moore"],
  [204, "Mason"],
  [205, "Harper"],
  [206, "Junction"],
  [207, "Menard"],
  [208, "Eden"],
  [209, "Brackettville"],
  [210, "La Pryor"],
  [211, "Sabinal"],
  [212, "D'Hanis"],
  [213, "Nueces Canyon"],
  [214, "Leakey"],
  [215, "Medina"],
  [216, "Utopia"],
  [217, "San Antonio Central Catholic"],
  [218, "San Antonio Antonian"],
  [219, "San Antonio Holy Cross"],
  [220, "TMI Episcopal"],
  [221, "San Antonio Christian"],
  [222, "Cornerstone Christian"],
  [223, "Geneva (Boerne)"],
  [224, "Schertz John Paul II"],
  [225, "New Braunfels Christian"],
  [226, "Castle Hills"],
  [227, "San Antonio Legacy"],
  [228, "Converse Judson"],
  [229, "Schertz Clemens"],
  [230, "Smithson Valley"],
  [231, "New Braunfels"],
  [232, "Canyon (New Braunfels)"],
  [233, "Seguin"],
  [234, "San Marcos"],
  [235, "Buda Johnson"],
  [236, "Kyle Lehman"],
  [237, "Del Valle"],
  [238, "Austin High"],
  [239, "Austin Bowie"],
  [240, "Austin Lake Travis"],
  [241, "Austin Westlake"],
  [242, "Austin Vandegrift"],
  [243, "Round Rock Westwood"],
  [244, "Round Rock Cedar Ridge"],
  [245, "Round Rock Stony Point"],
  [246, "Round Rock McNeil"],
  [247, "Leander"],
  [248, "Leander Rouse"],
  [249, "Leander Glenn"],
  [250, "Cedar Park"]
] as const;

const SLUG_OVERRIDES: Readonly<Record<string, string>> = {
  "C.E. King (Houston)": "ce-king",
  "All Saints (Fort Worth)": "all-saints-fort-worth",
  "Austin Lake Travis": "lake-travis",
  "Austin Westlake": "westlake",
  "Canyon (New Braunfels)": "new-braunfels-canyon",
  "First Baptist (Dallas)": "first-baptist-dallas",
  "Geneva (Boerne)": "geneva-boerne",
  "Grace Academy (Georgetown)": "grace-academy-georgetown",
  "Harvest Christian (Bartonville)": "harvest-christian-bartonville",
  "Highland Park (Dallas)": "highland-park-dallas",
  "Johnson (San Antonio)": "san-antonio-johnson",
  "Lake Travis (Austin)": "lake-travis",
  "Liberty Christian (Argyle)": "liberty-christian-argyle",
  "Marcus (Flower Mound)": "flower-mound-marcus",
  "Midway (Waco)": "waco-midway",
  "Oakridge (Arlington)": "oakridge-arlington",
  "Smithson Valley": "smithson-valley",
  "Smithson Valley (Spring Branch)": "smithson-valley",
  "St. Joseph (Victoria)": "st-joseph-victoria",
  "Texas Wind (Waco)": "texas-wind-waco",
  "Westlake (Austin)": "westlake"
};

const SEARCH_NAME_OVERRIDES: Readonly<Record<string, string>> = {
  "Atascocita (Humble)": "Humble Atascocita",
  "Austin High": "Austin",\n  "Austin LBJ": "Austin Johnson",\n  "Austin Lake Travis": "Austin Lake Travis",
  "Austin Westlake": "Austin Westlake",
  "Brackettville": "Brackettville Brackett",
  "Brazosport": "Freeport Brazosport",\n  "Calallen": "Corpus Christi Calallen",
  "C.E. King (Houston)": "Sheldon King",
  "Canyon (New Braunfels)": "Comal Canyon",
  "Clear Brook": "Friendswood Clear Brook",
  "Clear Creek": "League City Clear Creek",
  "Clear Falls": "League City Clear Falls",
  "Clear Lake": "Houston Clear Lake",
  "Clear Springs": "League City Clear Springs",
  "College Park": "Conroe Woodlands College Park",\n  "Columbia": "West Columbia Columbia",
  "Davenport (Comal)": "Comal Davenport",\n  "Dawson": "Pearland Dawson",
  "DeSoto": "De Soto",
  "Elkins": "Fort Bend Elkins",
  "Foster": "Richmond Foster",
  "Fulshear": "Lamar Fulshear",
  "George Ranch": "Richmond George Ranch",
  "Grand Oaks": "Conroe Grand Oaks",
  "Harker Heights": "Killeen Harker Heights",
  "Hebron": "Lewisville Hebron",\n  "Highland Park (Dallas)": "Dallas Highland Park",
  "Hightower": "Fort Bend Hightower",
  "Industrial": "Vanderbilt Industrial",
  "Johnson (San Antonio)": "San Antonio Johnson",
  "Lake Travis (Austin)": "Austin Lake Travis",
  "Lamar Consolidated": "Rosenberg Lamar Consolidated",
  "Marcus (Flower Mound)": "Lewisville Marcus",
  "Medina Valley": "Castroville Medina Valley",
  "Midway (Waco)": "Waco Midway",
  "Mt. Pleasant": "Mount Pleasant",
  "North Shore (Houston)": "Galena Park North Shore",
  "Nueces Canyon": "Barksdale Nueces Canyon",
  "Oak Ridge": "Conroe Oak Ridge",
  "Pleasant Grove": "Texarkana Pleasant Grove",
  "Plano Senior": "Plano",\n  "Randle (Richmond)": "Richmond Randle",
  "Richland": "North Richland Hills Richland",\n  "Ridge Point": "Fort Bend Ridge Point",
  "Rockwall-Heath": "Rockwall Heath",\n  "Round Rock Stony Point": "Round Rock Stony Pt.",
  "Shadow Creek (Pearland)": "Alvin Shadow Creek",\n  "Flour Bluff": "Corpus Christi Flour Bluff",
  "Smithson Valley": "Comal Smithson Valley",
  "Smithson Valley (Spring Branch)": "Comal Smithson Valley",
  "South Oak Cliff (Dallas)": "Dallas South Oak Cliff",
  "Southside": "San Antonio Southside",
  "Southwest": "San Antonio Southwest",
  "Summer Creek (Houston)": "Humble Summer Creek",
  "Terry": "Rosenberg Terry",\n  "Tuloso-Midway": "Corpus Christi Tuloso-Midway",
  "The Woodlands": "Conroe The Woodlands",
  "Tidehaven": "El Maton Tidehaven",\n  "Nixon-Smiley": "Nixon Smiley",
  "Tyler High": "Tyler",
  "Walnut Grove (Prosper)": "Prosper Walnut Grove",
  "West Plains (Canyon)": "Canyon West Plains",
  "Westlake (Austin)": "Austin Westlake"
};

const ASSOCIATION_OVERRIDES: Readonly<Record<string, {
  governingBody: 'SPC' | 'TAPPS' | 'TCAL';
  associationClassification: string;
  sourceUrl: string;
}>> = {
  "Kinkaid (Houston)": { governingBody: "SPC", associationClassification: "4A", sourceUrl: "https://spcsports.org/standings.aspx?path=football" },
  "Oakridge (Arlington)": { governingBody: "SPC", associationClassification: "3A", sourceUrl: "https://spcsports.org/standings.aspx?path=football" },
  "TMI Episcopal": { governingBody: "SPC", associationClassification: "3A", sourceUrl: "https://spcsports.org/standings.aspx?path=football" }
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[’']/g, '')
    .replace(/\([^)]*\)/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function normalizeFeaturedFootballName(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\bhigh\s+school\b/g, ' ')
    .replace(/\bh\s*s\b/g, ' ')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function preferredDisplayName(sourceName: string, slug: string) {
  if (slug === 'lake-travis') return 'Lake Travis';
  if (slug === 'westlake') return 'Westlake';
  if (slug === 'smithson-valley') return 'Smithson Valley';
  return sourceName.replace(/\s*\([^)]*\)\s*$/, '').trim();
}

type MutableFeatured = {
  slug: string;
  displayName: string;
  searchName: string;
  aliases: string[];
  sourceRanks: number[];
  governingBodyHint?: 'SPC' | 'TAPPS' | 'TCAL';
  associationClassification?: string;
  associationSourceUrl?: string;
};

const featuredBySlug = new Map<string, MutableFeatured>();

for (const [rank, suppliedName] of FEATURED_FOOTBALL_SOURCE_ROWS) {
  const slug = SLUG_OVERRIDES[suppliedName] ?? slugify(suppliedName);
  const searchName = SEARCH_NAME_OVERRIDES[suppliedName] ?? suppliedName.replace(/\s*\([^)]*\)\s*$/, '').trim();
  const association = ASSOCIATION_OVERRIDES[suppliedName];
  const current = featuredBySlug.get(slug);
  if (current) {
    current.sourceRanks.push(rank);
    for (const alias of [suppliedName, searchName]) {
      if (!current.aliases.includes(alias)) current.aliases.push(alias);
    }
    if (!current.governingBodyHint && association) {
      current.governingBodyHint = association.governingBody;
      current.associationClassification = association.associationClassification;
      current.associationSourceUrl = association.sourceUrl;
    }
    continue;
  }

  featuredBySlug.set(slug, {
    slug,
    displayName: preferredDisplayName(suppliedName, slug),
    searchName,
    aliases: [...new Set([suppliedName, searchName])],
    sourceRanks: [rank],
    ...(association ? {
      governingBodyHint: association.governingBody,
      associationClassification: association.associationClassification,
      associationSourceUrl: association.sourceUrl,
    } : {}),
  });
}

export const FEATURED_HIGH_SCHOOL_FOOTBALL_PROGRAMS: readonly FeaturedFootballProgram[] = [...featuredBySlug.values()]
  .map((program) => ({
    ...program,
    sourceRanks: [...program.sourceRanks].sort((a, b) => a - b),
    primaryRank: Math.min(...program.sourceRanks),
  }))
  .sort((a, b) => a.primaryRank - b.primaryRank);

if (FEATURED_FOOTBALL_SOURCE_ROWS.length !== FEATURED_SOURCE_ROW_COUNT) {
  throw new Error(`Expected ${FEATURED_SOURCE_ROW_COUNT} supplied football rows; found ${FEATURED_FOOTBALL_SOURCE_ROWS.length}.`);
}

if (FEATURED_HIGH_SCHOOL_FOOTBALL_PROGRAMS.length !== FEATURED_UNIQUE_PROGRAM_COUNT) {
  throw new Error(`Expected ${FEATURED_UNIQUE_PROGRAM_COUNT} unique football profiles after de-duplication; found ${FEATURED_HIGH_SCHOOL_FOOTBALL_PROGRAMS.length}.`);
}

export function getFeaturedFootballProgram(slug: string) {
  return FEATURED_HIGH_SCHOOL_FOOTBALL_PROGRAMS.find((program) => program.slug === slug);
}

export function matchFeaturedFootballProgram(...names: Array<string | undefined>) {
  const keys = new Set(names.filter(Boolean).map((name) => normalizeFeaturedFootballName(name!)));
  if (!keys.size) return undefined;
  return FEATURED_HIGH_SCHOOL_FOOTBALL_PROGRAMS.find((program) =>
    [program.displayName, program.searchName, ...program.aliases]
      .map(normalizeFeaturedFootballName)
      .some((key) => keys.has(key)),
  );
}

export function featuredFootballProfilePath(program: Pick<FeaturedFootballProgram, 'slug'>) {
  return `/texas-high-school-football-teams/${program.slug}`;
}
