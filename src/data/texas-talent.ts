export type TexasTalentCategory =
  | "music"
  | "film-tv"
  | "literature"
  | "visual-arts"
  | "comedy-performance";

export type TexasTalentConnectionKind =
  | "born"
  | "raised"
  | "career"
  | "cultural";

export type TexasTalentRosterEntry = {
  slug: string;
  name: string;
  category: TexasTalentCategory;
  connection: TexasTalentConnectionKind;
  texasConnection: string;
  primaryPlaces: readonly string[];
  plannedCrossLinks: readonly string[];
  profileStatus: "planned" | "researching" | "ready";
};

export type TexasTalentProfile = TexasTalentRosterEntry & {
  dek: string;
  overview: readonly string[];
  definingWorks: readonly string[];
  timeline: readonly { year: string; event: string }[];
  legacy: readonly string[];
  texasPlaces: readonly { name: string; context: string; href?: string }[];
  sources: readonly { label: string; url: string }[];
  lastReviewedAt: string;
};

export const TEXAS_TALENT_TAGLINE = "The Stars of Texas Shine Bright";

export const TEXAS_TALENT_CATEGORIES: ReadonlyArray<{
  id: TexasTalentCategory;
  label: string;
  description: string;
}> = [
  { id: "music", label: "Music", description: "Country, blues, rock, Tejano, R&B, pop and the Texas scenes that shaped them." },
  { id: "film-tv", label: "Film & Television", description: "Actors, filmmakers and screen storytellers with a meaningful Texas connection." },
  { id: "literature", label: "Literature", description: "Novelists, poets, playwrights, journalists and other writers whose work carries Texas outward." },
  { id: "visual-arts", label: "Visual Arts", description: "Painters, photographers, sculptors, designers and artists whose work helps explain the state." },
  { id: "comedy-performance", label: "Comedy & Performance", description: "Comedians and stage performers whose careers or artistic identities are tied to Texas." },
];

export const TEXAS_TALENT_ELIGIBILITY_RULES = [
  "A subject must have a clear, sourceable Texas connection: born here, raised here, built a meaningful part of a career here, or developed a lasting cultural association with Texas.",
  "Every profile must explain the Texas connection directly rather than relying on a generic celebrity biography.",
  "Profiles must be substantive enough to stand on their own: life story, defining work, Texas places, timeline, influence, sources and relevant internal links.",
  "No profile should be published simply to fill a roster. Planned entries remain off the public profile route until research and editorial review are complete.",
  "Living and deceased subjects are both eligible. Deceased figures may receive a Texas Legends treatment where appropriate.",
  "The section is cultural and historical, not celebrity-news driven. Coverage should favor enduring significance over short-term publicity.",
] as const;

export const TEXAS_TALENT_PROFILE_REQUIREMENTS = [
  "Texas connection",
  "Narrative biography",
  "Career and defining work",
  "Texas places connected to the story",
  "Legacy and influence",
  "Milestone timeline",
  "Where to experience the story in Texas, when appropriate",
  "Source list, photo credits and last-reviewed date",
  "Internal links to relevant county, city, history, destination, event or culture pages",
] as const;

export const TEXAS_TALENT_LAUNCH_ROSTER: readonly TexasTalentRosterEntry[] = [
  { slug: "willie-nelson", name: "Willie Nelson", category: "music", connection: "born", texasConnection: "Born in Abbott and inseparable from the Austin outlaw-country story.", primaryPlaces: ["Abbott", "Austin", "Luck"], plannedCrossLinks: ["Hill County", "Austin", "Texas dance halls & honky-tonks", "Texas music history"], profileStatus: "planned" },
  { slug: "beyonce", name: "Beyoncé", category: "music", connection: "born", texasConnection: "Born and raised in Houston, where church, school and performance culture shaped her early career.", primaryPlaces: ["Houston"], plannedCrossLinks: ["Harris County", "Houston", "Texas music history"], profileStatus: "planned" },
  { slug: "george-strait", name: "George Strait", category: "music", connection: "born", texasConnection: "Born in Poteet and raised in Pearsall, with a career deeply tied to Texas country music and rodeo culture.", primaryPlaces: ["Poteet", "Pearsall", "San Antonio"], plannedCrossLinks: ["Atascosa County", "Frio County", "San Antonio", "Texas dance halls & honky-tonks"], profileStatus: "planned" },
  { slug: "buddy-holly", name: "Buddy Holly", category: "music", connection: "born", texasConnection: "Born and raised in Lubbock, where West Texas helped shape one of rock and roll's foundational voices.", primaryPlaces: ["Lubbock"], plannedCrossLinks: ["Lubbock County", "Lubbock", "Texas music history"], profileStatus: "planned" },
  { slug: "stevie-ray-vaughan", name: "Stevie Ray Vaughan", category: "music", connection: "born", texasConnection: "Born in Dallas and forged his defining sound in Austin's blues clubs.", primaryPlaces: ["Dallas", "Austin"], plannedCrossLinks: ["Dallas County", "Travis County", "Austin", "Texas music history"], profileStatus: "planned" },
  { slug: "janis-joplin", name: "Janis Joplin", category: "music", connection: "born", texasConnection: "Born in Port Arthur before becoming one of the most distinctive voices of the 1960s.", primaryPlaces: ["Port Arthur", "Austin"], plannedCrossLinks: ["Jefferson County", "Port Arthur", "Austin", "Texas music history"], profileStatus: "planned" },
  { slug: "selena", name: "Selena", category: "music", connection: "raised", texasConnection: "Raised in Corpus Christi and central to the modern history of Tejano music.", primaryPlaces: ["Corpus Christi"], plannedCrossLinks: ["Nueces County", "Corpus Christi", "Texas music history"], profileStatus: "planned" },
  { slug: "roy-orbison", name: "Roy Orbison", category: "music", connection: "raised", texasConnection: "Raised in West Texas and launched his early musical career in Wink and Odessa.", primaryPlaces: ["Wink", "Odessa"], plannedCrossLinks: ["Winkler County", "Ector County", "West Texas", "Texas music history"], profileStatus: "planned" },
  { slug: "waylon-jennings", name: "Waylon Jennings", category: "music", connection: "born", texasConnection: "Born in Littlefield and shaped by the West Texas radio and country-music circuit.", primaryPlaces: ["Littlefield", "Lubbock"], plannedCrossLinks: ["Lamb County", "Lubbock County", "Texas dance halls & honky-tonks"], profileStatus: "planned" },
  { slug: "ornette-coleman", name: "Ornette Coleman", category: "music", connection: "born", texasConnection: "Born in Fort Worth, where he began the musical journey that transformed modern jazz.", primaryPlaces: ["Fort Worth"], plannedCrossLinks: ["Tarrant County", "Fort Worth", "Texas music history"], profileStatus: "planned" },
  { slug: "matthew-mcconaughey", name: "Matthew McConaughey", category: "film-tv", connection: "born", texasConnection: "Born in Uvalde, raised partly in Longview and educated at the University of Texas at Austin.", primaryPlaces: ["Uvalde", "Longview", "Austin"], plannedCrossLinks: ["Uvalde County", "Gregg County", "Travis County", "Austin"], profileStatus: "planned" },
  { slug: "jamie-foxx", name: "Jamie Foxx", category: "film-tv", connection: "born", texasConnection: "Born in Terrell and raised there before building a career across comedy, music and film.", primaryPlaces: ["Terrell"], plannedCrossLinks: ["Kaufman County", "Terrell"], profileStatus: "planned" },
  { slug: "woody-harrelson", name: "Woody Harrelson", category: "film-tv", connection: "born", texasConnection: "Born in Midland and raised in Texas before his stage and screen career.", primaryPlaces: ["Midland"], plannedCrossLinks: ["Midland County", "Midland"], profileStatus: "planned" },
  { slug: "tommy-lee-jones", name: "Tommy Lee Jones", category: "film-tv", connection: "born", texasConnection: "Born in San Saba and raised across Texas, with a public identity strongly tied to the state.", primaryPlaces: ["San Saba", "Midland", "Dallas"], plannedCrossLinks: ["San Saba County", "Midland County", "Dallas County"], profileStatus: "planned" },
  { slug: "wes-anderson", name: "Wes Anderson", category: "film-tv", connection: "born", texasConnection: "Born and raised in Houston, where his early filmmaking collaborations began.", primaryPlaces: ["Houston"], plannedCrossLinks: ["Harris County", "Houston"], profileStatus: "planned" },
  { slug: "robert-rodriguez", name: "Robert Rodriguez", category: "film-tv", connection: "born", texasConnection: "Born in San Antonio and built a major independent filmmaking career in Austin.", primaryPlaces: ["San Antonio", "Austin"], plannedCrossLinks: ["Bexar County", "Travis County", "San Antonio", "Austin"], profileStatus: "planned" },
  { slug: "larry-mcmurtry", name: "Larry McMurtry", category: "literature", connection: "born", texasConnection: "Born near Archer City, whose landscape and small-town life became central to his writing.", primaryPlaces: ["Archer City"], plannedCrossLinks: ["Archer County", "Texas literature", "Texas history"], profileStatus: "planned" },
  { slug: "katherine-anne-porter", name: "Katherine Anne Porter", category: "literature", connection: "born", texasConnection: "Born in Indian Creek and raised in Central Texas before becoming a major American writer.", primaryPlaces: ["Indian Creek", "Kyle"], plannedCrossLinks: ["Brown County", "Hays County", "Texas literature"], profileStatus: "planned" },
  { slug: "sandra-cisneros", name: "Sandra Cisneros", category: "literature", connection: "career", texasConnection: "Though born in Chicago, she has long lived and worked in San Antonio, becoming deeply associated with the city's literary culture.", primaryPlaces: ["San Antonio"], plannedCrossLinks: ["Bexar County", "San Antonio", "Texas literature"], profileStatus: "planned" },
  { slug: "cormac-mccarthy", name: "Cormac McCarthy", category: "literature", connection: "cultural", texasConnection: "Not Texas-born, but much of his major western fiction is inseparable from the Texas-Mexico borderlands.", primaryPlaces: ["El Paso", "West Texas"], plannedCrossLinks: ["El Paso County", "El Paso", "Texas borderlands", "Texas literature"], profileStatus: "planned" },
  { slug: "tom-lea", name: "Tom Lea", category: "visual-arts", connection: "born", texasConnection: "Born in El Paso and made the borderlands central to his painting, illustration and writing.", primaryPlaces: ["El Paso"], plannedCrossLinks: ["El Paso County", "El Paso", "Texas history"], profileStatus: "planned" },
  { slug: "dorothy-hood", name: "Dorothy Hood", category: "visual-arts", connection: "born", texasConnection: "Born in Bryan and later became one of Texas's most important modernist painters.", primaryPlaces: ["Bryan", "Houston"], plannedCrossLinks: ["Brazos County", "Harris County", "Houston"], profileStatus: "planned" },
  { slug: "julian-onderdonk", name: "Julian Onderdonk", category: "visual-arts", connection: "born", texasConnection: "Born in San Antonio and remembered for landscapes that helped define the visual mythology of Texas bluebonnets.", primaryPlaces: ["San Antonio", "Hill Country"], plannedCrossLinks: ["Bexar County", "San Antonio", "Texas wildflowers", "Texas landscapes"], profileStatus: "planned" },
  { slug: "steve-martin", name: "Steve Martin", category: "comedy-performance", connection: "born", texasConnection: "Born in Waco before a career spanning comedy, film, writing and music.", primaryPlaces: ["Waco"], plannedCrossLinks: ["McLennan County", "Waco"], profileStatus: "planned" },
  { slug: "carol-burnett", name: "Carol Burnett", category: "comedy-performance", connection: "born", texasConnection: "Born in San Antonio before becoming one of American television comedy's defining performers.", primaryPlaces: ["San Antonio"], plannedCrossLinks: ["Bexar County", "San Antonio"], profileStatus: "planned" },
] as const;

export const getTexasTalentByCategory = (category: TexasTalentCategory) =>
  TEXAS_TALENT_LAUNCH_ROSTER.filter((entry) => entry.category === category);
