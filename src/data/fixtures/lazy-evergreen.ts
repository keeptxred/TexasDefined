import hillCountryHero from "@/assets/generated/hill-country-identity.jpg";
import culturalRootsHero from "@/assets/generated/texas-town-cultural-roots.jpg";
import courthouseHero from "@/assets/generated/texas-courthouse-square.jpg";
import foundationHero from "@/assets/generated/texas-foundation-clay-drought.jpg";
import freezeHero from "@/assets/generated/texas-freeze-prep.jpg";
import specialDistrictsHero from "@/assets/generated/texas-special-districts.jpg";

import type { Article } from "../types";
import { buyingLandInTexasGuideStub } from "./buying-land-in-texas-guide-stub";
import { texasHomeArchitectureRegionsStub } from "./texas-home-architecture-regions-stub";
import {
  chooseElectricityPlanTexasStub,
  texasHurricanePreparationStub,
  texasRoofsHailWindHeatStub,
  texasSchoolDistrictsExplainedStub,
} from "./lazy-practical-evergreen-stubs";
import { texasLakesReservoirsExplainedStub } from "./texas-lakes-reservoirs-explained-stub";
import { texasTreesGuideStub } from "./texas-trees-guide-stub";
import { texasWildflowersGuideStub } from "./texas-wildflowers-guide-stub";

const texasFarmToMarketRoadsExplainedStub: Article = {
  id: "evergreen-texas-farm-to-market-roads-explained",
  brandId: "texasdefined",
  slug: "texas-farm-to-market-roads-explained",
  title: "Farm-to-Market Roads: The Texas Highway System Most People Don't Understand",
  dek: "Those black-and-white FM shields are more than country-road decoration. They belong to a statewide highway system built to connect rural Texas to schools, towns and markets—and they still shape how the state feels from behind the wheel.",
  category: "road-trips",
  hero: {
    src: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&w=1600&q=82",
    alt: "A two-lane rural highway crossing open Texas countryside",
    width: 1600,
    height: 1067,
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-13",
  readingMinutes: 11,
  tags: ["farm to market roads", "FM roads", "ranch to market roads", "texas highways", "texas road trips", "TxDOT", "rural texas", "texas transportation"],
  featured: true,
  sourceName: "Texas Department of Transportation",
  sourceUrl: "https://www.txdot.gov/projects/planning/highway-designations.html",
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
};

const texasRiversExplainedStub: Article = {
  id: "evergreen-texas-rivers-explained",
  brandId: "texasdefined",
  slug: "texas-rivers-explained",
  title: "The Rivers That Built Texas",
  dek: "From the Rio Grande and Brazos to the spring-fed Guadalupe and the slow, forested rivers of East Texas, the state's waterways explain where Texans settled, how cities grew and why one part of Texas can feel so different from another.",
  category: "lakes-rivers",
  hero: {
    src: "/images/explore/lakes-rivers/guadalupe-river-state-park.jpg",
    alt: "The Guadalupe River flowing beneath bald cypress trees in the Texas Hill Country",
    width: 1600,
    height: 1115,
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-13",
  readingMinutes: 12,
  tags: [
    "texas rivers",
    "river basins",
    "brazos river",
    "colorado river",
    "guadalupe river",
    "rio grande",
    "texas geography",
    "texas water",
  ],
  featured: true,
  sourceName: "Texas Water Development Board",
  sourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/index.asp",
  body: [],
  relatedCollections: [],
  relatedDestinations: ["guadalupe-river-state-park", "devils-river-state-natural-area", "south-llano-river-state-park"],
};

const texasHillCountryStub: Article = {
  id: "evergreen-texas-hill-country-what-makes-it",
  brandId: "texasdefined",
  slug: "texas-hill-country-what-makes-it",
  title: "What Makes the Texas Hill Country the Hill Country?",
  dek: "It is more than rolling scenery. Limestone, spring-fed rivers, live oaks, ranch roads, small towns and a distinctive mix of cultures all help define the part of Texas people simply call the Hill Country.",
  category: "guides",
  region: "hill-country",
  hero: {
    src: hillCountryHero,
    alt: "Texas Hill Country limestone hills, river, live oaks and wildflowers at sunset",
    width: 1600,
    height: 900,
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-07",
  readingMinutes: 10,
  tags: ["texas hill country", "hill country", "central texas", "texas geography", "fredericksburg", "texas travel"],
  featured: true,
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
};

const texasTownCulturalRootsStub: Article = {
  id: "evergreen-texas-town-cultural-roots",
  brandId: "texasdefined",
  slug: "texas-towns-german-czech-mexican-roots",
  title: "Why So Many Texas Towns Have German, Czech and Mexican Roots",
  dek: "Texas towns carry layers of migration in their churches, dance halls, bakeries, plazas, festivals and family names. German, Czech, Mexican and Tejano traditions did not sit outside Texas culture—they helped build it.",
  category: "texas-history",
  hero: { src: culturalRootsHero, alt: "Texas streetscape blending Central European storefronts, a dance hall and Mexican-inspired plaza architecture", width: 1600, height: 1067 },
  authorId: "a-marisol",
  publishedAt: "2026-08-07",
  readingMinutes: 11,
  tags: ["texas history", "german texas", "czech texas", "mexican texas", "tejano culture", "texas towns", "immigration"],
  featured: true,
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
};

const texasCourthousesTownSquareStub: Article = {
  id: "evergreen-texas-courthouses-town-square",
  brandId: "texasdefined",
  slug: "texas-courthouses-town-square",
  title: "The Texas Courthouse Square: Why So Many Towns Were Built This Way",
  dek: "Across Texas, county courthouses still anchor town squares built for a different age. Their architecture, politics and geography explain how local communities grew around public life—and why the old center of town still matters.",
  category: "texas-history",
  hero: { src: courthouseHero, alt: "Historic Texas courthouse centered on a traditional town square at golden hour", width: 1600, height: 1067 },
  authorId: "a-marisol",
  publishedAt: "2026-08-13",
  readingMinutes: 12,
  tags: ["texas courthouses", "county seats", "town squares", "texas history", "small towns", "architecture", "historic downtowns"],
  featured: true,
  sourceName: "Texas Historical Commission",
  sourceUrl: "https://thc.texas.gov/preserve/preservation-programs/courthouse-preservation",
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
};

const texasFoundationCareStub: Article = {
  id: "evergreen-texas-foundation-care-clay-drought",
  brandId: "texasdefined",
  slug: "texas-foundation-care-clay-soil-drought",
  title: "Texas Foundation Care: What Heat, Clay Soil and Drought Do to a House",
  dek: "Expansive clay, long dry spells and sudden rain can move the soil under a Texas house. Learn what is normal, what deserves attention and how drainage and moisture affect a slab foundation.",
  category: "home-garden",
  hero: { src: foundationHero, alt: "Texas house shown above a slab foundation and cracked clay soil", width: 1600, height: 1067 },
  authorId: "a-marisol",
  publishedAt: "2026-08-07",
  readingMinutes: 11,
  tags: ["texas foundation", "clay soil", "foundation care", "drought", "drainage", "slab foundation"],
  featured: true,
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
};

const prepareTexasHouseFreezeStub: Article = {
  id: "evergreen-prepare-texas-house-freeze",
  brandId: "texasdefined",
  slug: "prepare-texas-house-freeze",
  title: "How to Prepare a Texas House for a Freeze",
  dek: "Texas freezes are short, uneven and sometimes destructive. A little preparation can protect pipes, plants, pools, pets and the parts of a house that are easiest to forget until the temperature drops.",
  category: "home-garden",
  hero: { src: freezeHero, alt: "Texas home prepared for freezing weather with insulated outdoor faucet, covered plants and frosty yard", width: 1600, height: 900 },
  authorId: "a-marisol",
  publishedAt: "2026-08-07",
  readingMinutes: 11,
  tags: ["texas freeze", "winterize texas home", "freeze preparation", "frozen pipes", "texas home maintenance", "home and garden"],
  featured: true,
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
};

const mudsPidsHoasSpecialDistrictsStub: Article = {
  id: "evergreen-muds-pids-hoas-special-districts",
  brandId: "texasdefined",
  slug: "muds-pids-hoas-special-districts-texas",
  title: "MUDs, PIDs, HOAs and Special Districts: What Texas Homebuyers Need to Understand",
  dek: "A new Texas neighborhood can come with more than a mortgage and city taxes. Learn how MUDs, PIDs, HOAs and other local charges fit together before you decide what a home really costs.",
  category: "real-estate",
  hero: { src: specialDistrictsHero, alt: "Texas suburban neighborhood with roads, homes, water infrastructure and district boundary lines", width: 1600, height: 900 },
  authorId: "a-marisol",
  publishedAt: "2026-08-07",
  readingMinutes: 12,
  tags: ["muds", "pids", "hoa", "texas homebuyers", "special districts", "property taxes", "texas real estate"],
  featured: true,
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
};

export const lazyEvergreenArticleStubs: Article[] = [
  buyingLandInTexasGuideStub,
  texasFarmToMarketRoadsExplainedStub,
  texasWildflowersGuideStub,
  texasTreesGuideStub,
  texasHomeArchitectureRegionsStub,
  texasHurricanePreparationStub,
  texasRoofsHailWindHeatStub,
  texasSchoolDistrictsExplainedStub,
  chooseElectricityPlanTexasStub,
  texasRiversExplainedStub,
  texasLakesReservoirsExplainedStub,
  texasHillCountryStub,
  texasTownCulturalRootsStub,
  texasCourthousesTownSquareStub,
  texasFoundationCareStub,
  prepareTexasHouseFreezeStub,
  mudsPidsHoasSpecialDistrictsStub,
];

const addSourceLinks = (article: Article, links: NonNullable<Article["internalLinks"]>): Article => {
  const existing = article.internalLinks ?? [];
  return {
    ...article,
    internalLinks: [
      ...existing,
      ...links.filter((link) => !existing.some((item) => item.href === link.href)),
    ],
  };
};

const texasRiversSourceLinks: NonNullable<Article["internalLinks"]> = [
  {
    href: "https://www.twdb.texas.gov/surfacewater/rivers/",
    label: "Texas Water Development Board river basins",
    description: "Official Texas river-basin and reservoir reference information.",
  },
  {
    href: "https://www.twdb.texas.gov/surfacewater/conditions/index.asp",
    label: "Texas water conditions and data",
    description: "Current and historical surface-water data from the Texas Water Development Board.",
  },
];

const buyingLandOfficialLinks: NonNullable<Article["internalLinks"]> = [
  {
    href: "https://www.tceq.texas.gov/permitting/ossf/ossfhomeowners.html",
    label: "Texas septic-system guidance",
    description: "TCEQ homeowner guidance for OSSF site evaluation, permitting and local authorities.",
  },
  {
    href: "https://www3.twdb.texas.gov/apps/waterdatainteractive/groundwaterdataviewer",
    label: "Texas groundwater and well records",
    description: "TWDB's official viewer for groundwater data, well reports, aquifers, depths and water levels.",
  },
  {
    href: "https://comptroller.texas.gov/taxes/property-tax/ag-timber/",
    label: "Texas agricultural special appraisal",
    description: "Official Comptroller guidance on agricultural, timber and wildlife-management productivity appraisal.",
  },
  {
    href: "https://www.rrc.texas.gov/resource-center/research/gis-viewer/",
    label: "Railroad Commission public GIS viewer",
    description: "Screen Texas land for mapped wells, pipelines, surveys and other energy-related features.",
  },
  {
    href: "https://www.txdot.gov/manuals/mnt/use/uses_of_right_of_way_long_term/access_driveways-i1001099.html",
    label: "TxDOT state-highway driveway access",
    description: "Official guidance for new or modified access driveways on the Texas state highway system.",
  },
];

export async function loadLazyEvergreenArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined") return null;

  if (slug === buyingLandInTexasGuideStub.slug) {
    const { buyingLandInTexasGuideArticle } = await import("./buying-land-in-texas-guide");
    return addSourceLinks(buyingLandInTexasGuideArticle, buyingLandOfficialLinks);
  }

  if (slug === texasFarmToMarketRoadsExplainedStub.slug) {
    const { texasFarmToMarketRoadsExplainedArticle } = await import("./texas-farm-to-market-roads-explained");
    return texasFarmToMarketRoadsExplainedArticle;
  }

  if (slug === texasWildflowersGuideStub.slug) {
    const { texasWildflowersGuideArticle } = await import("./texas-wildflowers-guide");
    return texasWildflowersGuideArticle;
  }

  if (slug === texasTreesGuideStub.slug) {
    const { texasTreesGuideArticle } = await import("./texas-trees-guide");
    return texasTreesGuideArticle;
  }

  if (slug === texasHomeArchitectureRegionsStub.slug) {
    const { texasHomeArchitectureRegionsArticle } = await import("./texas-home-architecture-regions");
    return texasHomeArchitectureRegionsArticle;
  }

  if (slug === texasHurricanePreparationStub.slug) {
    const { texasHurricanePreparationArticle } = await import("./texas-hurricane-preparation-guide");
    return addSourceLinks(texasHurricanePreparationArticle, [
      { href: "https://tdem.texas.gov/prepare", label: "Texas emergency preparedness", description: "Official preparedness guidance, evacuation resources and emergency planning information." },
      { href: "https://www.texasready.gov/", label: "TexasReady", description: "State preparedness guidance for plans, kits, alerts and evacuation routes." },
    ]);
  }

  if (slug === texasRoofsHailWindHeatStub.slug) {
    const { texasRoofsHailWindHeatArticle } = await import("./texas-roofs-hail-wind-heat");
    return addSourceLinks(texasRoofsHailWindHeatArticle, [
      { href: "https://www.tdi.texas.gov/tips/replacing-your-roof.html", label: "Texas Department of Insurance roof guidance", description: "Official guidance on roof coverage, wind and hail deductibles, claims and replacement." },
      { href: "https://www.tdi.texas.gov/tips/after-hail-or-windstorms.html", label: "Texas hail and windstorm claim guidance", description: "Official Texas consumer guidance for documenting damage and handling storm claims." },
    ]);
  }

  if (slug === texasSchoolDistrictsExplainedStub.slug) {
    const { texasSchoolDistrictsExplainedArticle } = await import("./texas-school-districts-explained");
    return addSourceLinks(texasSchoolDistrictsExplainedArticle, [
      { href: "https://tea.texas.gov/families-and-students/school-district-locator/school-district-locator", label: "Texas Education Agency school district locator", description: "Official state map and district-boundary information for Texas addresses." },
      { href: "https://tea.texas.gov/glossary/askted", label: "AskTED Texas Education Directory", description: "Official school, district, county and regional education directory information." },
    ]);
  }

  if (slug === chooseElectricityPlanTexasStub.slug) {
    const { chooseElectricityPlanTexasArticle } = await import("./choose-electricity-plan-texas");
    return addSourceLinks(chooseElectricityPlanTexasArticle, [
      { href: "https://www.powertochoose.org/", label: "Power to Choose", description: "Official Texas resource for comparing retail electricity offers in eligible areas." },
      { href: "https://www.puc.texas.gov/consumer/electricity/", label: "Public Utility Commission electricity information", description: "Official consumer guidance on electric service, utilities and retail providers." },
    ]);
  }

  if (slug === texasRiversExplainedStub.slug) {
    const { texasRiversExplainedArticle } = await import("./texas-rivers-explained");
    return addSourceLinks(texasRiversExplainedArticle, texasRiversSourceLinks);
  }

  if (slug === texasLakesReservoirsExplainedStub.slug) {
    const { texasLakesReservoirsExplainedArticle } = await import("./texas-lakes-reservoirs-explained");
    return texasLakesReservoirsExplainedArticle;
  }

  if (slug === texasHillCountryStub.slug) {
    const { texasHillCountryWhatMakesItArticle } = await import("./texas-hill-country-what-makes-it");
    return texasHillCountryWhatMakesItArticle;
  }

  if (slug === texasTownCulturalRootsStub.slug) {
    const { texasTownCulturalRootsArticle } = await import("./texas-town-cultural-roots");
    return texasTownCulturalRootsArticle;
  }

  if (slug === texasCourthousesTownSquareStub.slug) {
    const { texasCourthousesTownSquareArticle } = await import("./texas-courthouses-town-square");
    return texasCourthousesTownSquareArticle;
  }

  if (slug === texasFoundationCareStub.slug) {
    const { texasFoundationCareArticle } = await import("./texas-foundation-care-clay-soil-drought");
    return texasFoundationCareArticle;
  }

  if (slug === prepareTexasHouseFreezeStub.slug) {
    const { prepareTexasHouseFreezeArticle } = await import("./prepare-texas-house-freeze");
    return prepareTexasHouseFreezeArticle;
  }

  if (slug === mudsPidsHoasSpecialDistrictsStub.slug) {
    const { mudsPidsHoasSpecialDistrictsArticle } = await import("./muds-pids-hoas-special-districts");
    return mudsPidsHoasSpecialDistrictsArticle;
  }

  return null;
}
