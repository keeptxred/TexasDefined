import { paintedChurchPeople } from "./painted-church-people";
import type { PaintedChurchTechniqueSlug } from "./painted-churches-expanded";

export type PaintedChurchContributorKind = "person" | "organization";
export type PaintedChurchContributorRole =
  | "architect"
  | "builder"
  | "contractor"
  | "artist"
  | "decorator"
  | "interior-craftsman"
  | "clergy-artist"
  | "restorer"
  | "conservator"
  | "researcher";

export type PaintedChurchContributorSource = {
  label: string;
  url: string;
  use: string;
};

export type PaintedChurchContributor = {
  slug: string;
  name: string;
  kind: PaintedChurchContributorKind;
  roles: PaintedChurchContributorRole[];
  answer: string;
  significance: string[];
  churchSlugs: string[];
  techniqueSlugs?: PaintedChurchTechniqueSlug[];
  sourceLabel: string;
  sourceUrl: string;
  sources: PaintedChurchContributorSource[];
  attributionNote?: string;
};

const legacyContributors: PaintedChurchContributor[] = paintedChurchPeople.map((person) => ({
  ...person,
  kind: "person" as const,
  roles: person.roles as PaintedChurchContributorRole[],
  sources: [{ label: person.sourceLabel, url: person.sourceUrl, use: "documented church relationship and role" }],
}));

const authorityContributors: PaintedChurchContributor[] = [
  {
    slug: "o-kramer",
    name: "O. Kramer",
    kind: "person",
    roles: ["architect"],
    answer: "O. Kramer is the architect credited by Austin PBS and National Register research with St. Mary's Church of the Assumption at Praha, completed in 1895. Texas Defined keeps the abbreviated historical name because the currently verified church records do not establish a fuller identity with enough confidence.",
    significance: ["Praha is one of the original churches in the 1982 decorative-interior thematic study.", "Austin PBS identifies O. Kramer as architect of the 1895 church.", "The architecture provides the Gothic framework later enriched by Gottfried Flury, Rev. Louis Netardus and restoration work by Gene Mikulik."],
    churchSlugs: ["praha-st-marys-assumption"],
    sourceLabel: "Austin PBS — Praha",
    sourceUrl: "https://austinpbs.org/paintedchurches/praha",
    sources: [
      { label: "Austin PBS — Praha", url: "https://austinpbs.org/paintedchurches/praha", use: "architect attribution and church chronology" },
      { label: "NPS — St. Mary's Church of the Assumption NRIS 83003138", url: "https://npgallery.nps.gov/AssetDetail/NRIS/83003138", use: "National Register identity and architectural record" },
    ],
  },
  {
    slug: "frank-bohlmann",
    name: "Frank Bohlmann",
    kind: "person",
    roles: ["builder"],
    answer: "Frank Bohlmann of Schulenburg is credited as builder of the 1906 Nativity of Mary church at High Hill, working from Leo M. J. Dielmann's Gothic Revival design.",
    significance: ["Separating Bohlmann's construction role from Dielmann's architectural design and Stockert/Kern's later painting clarifies the sequence of authorship at High Hill.", "The church's brickwork and physical Gothic shell predate the famous 1912 decorative campaign."],
    churchSlugs: ["high-hill-nativity-of-mary"],
    sourceLabel: "National Register / High Hill historical record",
    sourceUrl: "https://npgallery.nps.gov/AssetDetail/NRIS/83003136",
    sources: [
      { label: "NPS — Nativity of Mary NRIS 83003136", url: "https://npgallery.nps.gov/AssetDetail/NRIS/83003136", use: "historic-property record" },
      { label: "Austin PBS — High Hill", url: "https://austinpbs.org/paintedchurches/highhill", use: "architectural and decorative context" },
    ],
  },
  {
    slug: "jacob-wagner",
    name: "Jacob Wagner",
    kind: "person",
    roles: ["builder", "contractor"],
    answer: "Jacob Wagner of Fredericksburg was the contractor and builder of New St. Mary's, the native-stone Gothic church designed principally by Leo M. J. Dielmann and consecrated in 1908.",
    significance: ["Austin PBS identifies Wagner as contractor/builder.", "The Texas Historical Commission's St. Mary's marker likewise credits contractor Jacob Wagner.", "One sanctuary stained-glass window depicts Wagner's daughter Erma, linking the construction story to the church's memorial glass."],
    churchSlugs: ["fredericksburg-st-marys-catholic-church"],
    sourceLabel: "Austin PBS — Fredericksburg",
    sourceUrl: "https://austinpbs.org/paintedchurches/fredericksburg",
    sources: [
      { label: "Austin PBS — Fredericksburg St. Mary's", url: "https://austinpbs.org/paintedchurches/fredericksburg", use: "builder role and stained-glass context" },
      { label: "Texas Historical Commission — St. Mary's marker", url: "https://atlas.thc.texas.gov/Details/5507014697", use: "independent contractor attribution" },
    ],
  },
  {
    slug: "wahrenberger-shiner-attribution",
    name: "Wahrenberger — Shiner architect attribution",
    kind: "person",
    roles: ["architect"],
    answer: "The architect of the 1920–1921 Sts. Cyril and Methodius church in Shiner is consistently identified as Wahrenberger, but authoritative sources disagree on the first initial: the Texas Historical Commission/National Register record gives F. Wahrenberger while the current parish history gives E. Wahrenberger. Texas Defined preserves the discrepancy instead of silently choosing one.",
    significance: ["The attribution is secure at the surname level but unresolved at the initial level.", "The conflict appears between two high-value sources: the historic register record and the church's own current history.", "The church should not be linked to a more fully identified architect until archival evidence resolves the name."],
    churchSlugs: ["shiner-saints-cyril-methodius"],
    sourceLabel: "THC/National Register and Shiner parish records",
    sourceUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003151",
    attributionNote: "THC/NPS: F. Wahrenberger. Current Shiner parish history: E. Wahrenberger. Full identity unresolved.",
    sources: [
      { label: "Texas Historical Commission — Sts. Cyril and Methodius", url: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003151", use: "historic-register architect attribution" },
      { label: "Sts. Cyril & Methodius Shiner — official history", url: "https://sscmshiner.org/our-history", use: "current parish architect attribution and construction history" },
    ],
  },
  {
    slug: "vincent-falbo",
    name: "Vincent Falbo",
    kind: "person",
    roles: ["contractor", "builder"],
    answer: "Vincent Falbo was a San Antonio contractor/builder connected to the construction of major Painted Churches including Sts. Cyril and Methodius at Shiner and Queen of Peace at Sweet Home.",
    significance: ["Shiner's official parish history names Vincent Falbo and M. Deodati as construction contractors.", "The 1982 thematic nomination connects the Shiner and Sweet Home churches through Falbo and Deodati.", "Construction authorship should remain distinct from later mural and decorative-painting authorship."],
    churchSlugs: ["shiner-saints-cyril-methodius", "sweet-home-queen-of-peace"],
    sourceLabel: "Shiner parish history + 1982 thematic nomination",
    sourceUrl: "https://sscmshiner.org/our-history",
    sources: [
      { label: "Sts. Cyril & Methodius Shiner — official history", url: "https://sscmshiner.org/our-history", use: "contractor attribution" },
      { label: "1982 National Register thematic nomination", url: "https://npgallery.nps.gov/GetAsset/0534eaa0-e073-4836-815e-d10985b22d13", use: "Shiner/Sweet Home comparative construction relationship" },
    ],
  },
  {
    slug: "m-deodati",
    name: "M. Deodati",
    kind: "person",
    roles: ["contractor", "builder"],
    answer: "M. Deodati was a San Antonio contractor/builder paired with Vincent Falbo in records for Sts. Cyril and Methodius at Shiner and the related Sweet Home church.",
    significance: ["The official Shiner parish history names Deodati with Falbo as construction contractor.", "The original thematic nomination treats Shiner and Sweet Home as related through their builders."],
    churchSlugs: ["shiner-saints-cyril-methodius", "sweet-home-queen-of-peace"],
    sourceLabel: "Shiner parish history + 1982 thematic nomination",
    sourceUrl: "https://sscmshiner.org/our-history",
    sources: [
      { label: "Sts. Cyril & Methodius Shiner — official history", url: "https://sscmshiner.org/our-history", use: "contractor attribution" },
      { label: "1982 National Register thematic nomination", url: "https://npgallery.nps.gov/GetAsset/0534eaa0-e073-4836-815e-d10985b22d13", use: "Shiner/Sweet Home comparative construction relationship" },
    ],
  },
  {
    slug: "frank-a-ludewig",
    name: "Frank A. Ludewig",
    kind: "person",
    roles: ["architect"],
    answer: "Frank A. Ludewig is the architect credited in National Register records for St. Peter's Roman Catholic Church at Lindsay, one of the North Texas members of the original decorative-interior study.",
    significance: ["NPS and THC both preserve Ludewig's architect attribution.", "Lindsay's Romanesque church provides a major stylistic contrast to the Gothic Revival churches in Central Texas."],
    churchSlugs: ["lindsay-st-peters-catholic-church"],
    sourceLabel: "National Park Service — St. Peter's NRIS 79002927",
    sourceUrl: "https://npgallery.nps.gov/AssetDetail/fe68fa14-1ceb-44c5-8d52-1db22da847a4/",
    sources: [
      { label: "NPS — St. Peter's Roman Catholic Church", url: "https://npgallery.nps.gov/AssetDetail/fe68fa14-1ceb-44c5-8d52-1db22da847a4/", use: "architect and National Register metadata" },
      { label: "Texas Historical Commission — St. Peter's", url: "https://atlas.thc.texas.gov/Details?atlasnumber=2079002927", use: "independent state register record" },
    ],
  },
  {
    slug: "j-carlander",
    name: "J. Carlander",
    kind: "person",
    roles: ["architect"],
    answer: "J. Carlander is the architect named in the National Register record for the historic First Baptist Church at 218 W. 13th Street in Amarillo.",
    significance: ["The nomination separates Carlander's architectural role from the Schnoor Company's interior-craftsman role.", "Amarillo demonstrates that the original Painted Churches study was statewide and not limited to Central European rural Catholic churches."],
    churchSlugs: ["amarillo-first-baptist-church"],
    sourceLabel: "National Register — First Baptist Church Amarillo",
    sourceUrl: "https://atlas.thc.texas.gov/NR/pdfs/83003158/83003158.pdf",
    sources: [
      { label: "National Register nomination — First Baptist Church Amarillo", url: "https://atlas.thc.texas.gov/NR/pdfs/83003158/83003158.pdf", use: "architect attribution" },
      { label: "Texas Historical Commission — First Baptist Church", url: "https://atlas.thc.texas.gov/Details?atlasnumber=2083003158", use: "current register metadata" },
    ],
  },
  {
    slug: "schnoor-company",
    name: "Schnoor Company",
    kind: "organization",
    roles: ["interior-craftsman", "decorator"],
    answer: "The Schnoor Company is named by the National Register nomination as the interior craftsman for the historic First Baptist Church in Amarillo, with the significant work dated 1929–1930.",
    significance: ["This is one of the clearest cases where the register distinguishes architect from interior craftsman.", "Texas Defined treats the company as an organization rather than incorrectly emitting Person structured data."],
    churchSlugs: ["amarillo-first-baptist-church"],
    sourceLabel: "National Register nomination — First Baptist Church Amarillo",
    sourceUrl: "https://atlas.thc.texas.gov/NR/pdfs/83003158/83003158.pdf",
    sources: [{ label: "National Register nomination — First Baptist Church Amarillo", url: "https://atlas.thc.texas.gov/NR/pdfs/83003158/83003158.pdf", use: "interior-craftsman attribution and dates" }],
  },
  {
    slug: "elmer-witter-van-slyke",
    name: "Elmer Witter Van Slyke",
    kind: "person",
    roles: ["architect"],
    answer: "Elmer Witter Van Slyke was a New York-trained architect who partnered with Clyde H. Woodruff and later practiced in Fort Worth; the firm designed First United Methodist Church in Paris, a formal Painted Churches property.",
    significance: ["The Handbook of Texas documents Van Slyke's training and partnership with Woodruff.", "National Register and SAH sources connect the firm to the Paris church."],
    churchSlugs: ["paris-first-united-methodist-church"],
    sourceLabel: "Handbook of Texas — Elmer Witter Van Slyke",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/van-slyke-elmer-witter",
    sources: [
      { label: "Handbook of Texas — Elmer Witter Van Slyke", url: "https://www.tshaonline.org/handbook/entries/van-slyke-elmer-witter", use: "biography and professional partnership" },
      { label: "SAH Archipedia — First United Methodist Church, Paris", url: "https://sah-archipedia.org/buildings/TX-02-MC40", use: "Paris church attribution" },
    ],
  },
  {
    slug: "clyde-h-woodruff",
    name: "Clyde H. Woodruff",
    kind: "person",
    roles: ["architect"],
    answer: "Clyde H. Woodruff was a Fort Worth architect and partner of Elmer Witter Van Slyke; their firm designed First United Methodist Church in Paris, one of the formal Texas decorative-interior churches.",
    significance: ["The Handbook of Texas documents Woodruff's career and partnership.", "SAH Archipedia identifies Van Slyke and Woodruff as architects of the Paris church."],
    churchSlugs: ["paris-first-united-methodist-church"],
    sourceLabel: "Handbook of Texas — Clyde H. Woodruff",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/woodruff-clyde-h",
    sources: [
      { label: "Handbook of Texas — Clyde H. Woodruff", url: "https://www.tshaonline.org/handbook/entries/woodruff-clyde-h", use: "biography and professional work" },
      { label: "SAH Archipedia — First United Methodist Church, Paris", url: "https://sah-archipedia.org/buildings/TX-02-MC40", use: "Paris church attribution" },
    ],
  },
  {
    slug: "rev-louis-netardus",
    name: "Rev. Louis Netardus",
    kind: "person",
    roles: ["clergy-artist", "artist"],
    answer: "Rev. Louis Netardus was the Praha pastor who later embellished St. Mary's Church of the Assumption and is documented by Austin PBS as a painter and musician as well as a priest.",
    significance: ["Austin PBS identifies Netardus with Gottfried Flury and Gene Mikulik in the Praha artist record.", "A historical photograph found during PBS research shows Netardus holding a brush beside his life-sized painting of Saints Cyril and Methodius.", "His role demonstrates that some Painted Church decoration came from artist-clergy inside the community rather than an outside commercial decorator."],
    churchSlugs: ["praha-st-marys-assumption"],
    techniqueSlugs: ["freehand", "decorative-murals"],
    sourceLabel: "Austin PBS — Praha",
    sourceUrl: "https://austinpbs.org/paintedchurches/praha",
    sources: [{ label: "Austin PBS — Praha", url: "https://austinpbs.org/paintedchurches/praha", use: "artist attribution, historical photograph and parish role" }],
  },
  {
    slug: "oidtmann-studios",
    name: "Oidtmann Studios",
    kind: "organization",
    roles: ["artist", "decorator"],
    answer: "Oidtmann Studios is the firm credited by Austin PBS with the major 1936 decorative campaign at New St. Mary's in Fredericksburg, substantially modifying earlier 1906 decorative work.",
    significance: ["Austin PBS identifies Donecker and Sons with 1906 work and Oidtmann Studios with the 1936 campaign.", "The studio's role is essential to the church's integrity story because the visible interior is layered rather than a single untouched campaign."],
    churchSlugs: ["fredericksburg-st-marys-catholic-church"],
    techniqueSlugs: ["stenciling", "freehand", "decorative-murals"],
    sourceLabel: "Austin PBS — Fredericksburg",
    sourceUrl: "https://austinpbs.org/paintedchurches/fredericksburg",
    sources: [
      { label: "Austin PBS — Fredericksburg", url: "https://austinpbs.org/paintedchurches/fredericksburg", use: "1936 studio attribution and iconographic program" },
      { label: "National Register documentation — St. Mary's Fredericksburg", url: "https://npgallery.nps.gov/AssetDetail/NRIS/83003143", use: "historic-property chronology" },
    ],
  },
  {
    slug: "ed-janecka",
    name: "Ed Janecka",
    kind: "person",
    roles: ["restorer"],
    answer: "Ed Janecka, a former Dubina altar boy and Fayette County judge, helped lead the community restoration that brought the Dubina church's painted interior back after its mid-century whitewashing.",
    significance: ["Austin PBS documents Janecka's memory of the original designs and his role with Butch Koenig in the restoration.", "Friends of the Texas Historical Commission identifies Janecka as a preservation presenter on restoring Dubina's original stenciling.", "Janecka openly acknowledged artistic license where surviving evidence was incomplete, making him important to the site's authenticity discussion."],
    churchSlugs: ["dubina-saints-cyril-methodius"],
    techniqueSlugs: ["stenciling", "freehand"],
    sourceLabel: "Austin PBS — Dubina",
    sourceUrl: "https://austinpbs.org/paintedchurches/dubina",
    sources: [
      { label: "Austin PBS — Dubina", url: "https://austinpbs.org/paintedchurches/dubina", use: "community restoration narrative" },
      { label: "Friends of the Texas Historical Commission — Community and Preservation", url: "https://www.thcfriends.org/event/painted-churches-of-texas-part-2-community-and-preservation/", use: "preservation role and original-stencil restoration context" },
    ],
  },
  {
    slug: "butch-koenig",
    name: "Butch Koenig",
    kind: "person",
    roles: ["restorer"],
    answer: "Butch Koenig is identified by Austin PBS as one of the community leaders who worked with Ed Janecka in the 1980s restoration of Saints Cyril and Methodius at Dubina.",
    significance: ["Koenig's role belongs to the reconstructed/restored history of Dubina rather than the unknown original painting campaign.", "Keeping the restorer separate from the original artist prevents a common attribution error."],
    churchSlugs: ["dubina-saints-cyril-methodius"],
    techniqueSlugs: ["stenciling"],
    sourceLabel: "Austin PBS — Dubina",
    sourceUrl: "https://austinpbs.org/paintedchurches/dubina",
    sources: [{ label: "Austin PBS — Dubina", url: "https://austinpbs.org/paintedchurches/dubina", use: "community restoration attribution" }],
  },
  {
    slug: "robert-alden-marshall",
    name: "Robert Alden Marshall",
    kind: "person",
    roles: ["conservator", "restorer"],
    answer: "Robert Alden Marshall is a conservator associated with restoration work at High Hill and Dubina and has publicly interpreted those preservation campaigns through Friends of the Texas Historical Commission programming.",
    significance: ["Friends of THC identifies Marshall as the conservator presenting on restoration at High Hill and Dubina.", "His role provides a professional-conservation counterpart to Dubina's community-led recovery story."],
    churchSlugs: ["high-hill-nativity-of-mary", "dubina-saints-cyril-methodius"],
    sourceLabel: "Friends of the Texas Historical Commission — Painted Churches preservation program",
    sourceUrl: "https://www.thcfriends.org/event/painted-churches-of-texas-part-2-community-and-preservation/",
    sources: [
      { label: "Friends of THC — Painted Churches Part 2", url: "https://www.thcfriends.org/event/painted-churches-of-texas-part-2-community-and-preservation/", use: "conservation role at High Hill and Dubina" },
      { label: "R. Alden Marshall & Associates — project history", url: "https://raldenmarshall.com/", use: "professional conservation context" },
    ],
  },
];

const contributorBySlug = new Map<string, PaintedChurchContributor>();
for (const contributor of [...legacyContributors, ...authorityContributors]) contributorBySlug.set(contributor.slug, contributor);

export const paintedChurchContributors = [...contributorBySlug.values()];
export const paintedChurchContributorBySlug = contributorBySlug;
