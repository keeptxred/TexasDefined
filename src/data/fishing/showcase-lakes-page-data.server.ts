import { expandedShowcaseLakePrototypes } from "./expanded-showcase-lakes-prototype";
import { SHOWCASE_LAKE_SECTION_SLUGS } from "./showcase-lake-routing";
import { showcaseLakePrototypes } from "./showcase-lakes-prototype";

const sectionLabel = {
  fish: "Fish",
  access: "Access",
  boating: "Boating",
  regulations: "Regulations",
  camping: "Camping",
  nearby: "Nearby",
  reports: "Reports",
  guides: "Guides",
} as const;

export function loadShowcaseLakesPageDataServer() {
  const prototypes = { ...showcaseLakePrototypes, ...expandedShowcaseLakePrototypes };
  return Object.fromEntries(Object.entries(prototypes).map(([slug, lake]) => {
    const sections = SHOWCASE_LAKE_SECTION_SLUGS.map((section) => ({
      slug: section,
      label: sectionLabel[section],
      title: `${lake.overview.name} ${sectionLabel[section] === "Fish" ? "Fish Species & Seasonal Fishing" : sectionLabel[section] === "Access" ? "Boat Ramps, Marinas & Public Access" : sectionLabel[section] === "Boating" ? "Boating, Water & Navigation" : sectionLabel[section] === "Regulations" ? "Fishing Regulations" : sectionLabel[section] === "Camping" ? "Camping & Places to Stay" : sectionLabel[section] === "Nearby" ? "Nearby Places & Trip Planning" : sectionLabel[section] === "Reports" ? "Fishing Reports" : "Fishing Guides"}`,
      description: section === "fish" ? `Target ${lake.overview.name} by species, season, habitat and technique using source-backed fisheries guidance.`
        : section === "access" ? `Compare verified ${lake.overview.name} ramps, marina access and launch-planning notes before towing to the lake.`
        : section === "boating" ? `Plan boating on ${lake.overview.name} with lake-level, navigation, invasive-species and safety context.`
        : section === "regulations" ? `Review ${lake.overview.name} regulation planning notes and jump to current official fishing rules before harvest.`
        : section === "camping" ? `Start a ${lake.overview.name} overnight trip with verified public camping and lake-access options.`
        : section === "nearby" ? `Connect a ${lake.overview.name} fishing trip to nearby counties, parks and TexasDefined destination pages.`
        : section === "reports" ? `Find dated ${lake.overview.name} fishing reports when available without confusing evergreen patterns with today's bite.`
        : `Browse verified ${lake.overview.name} guide listings when available, with paid placement kept separate from editorial fishing guidance.`,
    }));
    return [slug, { ...lake, sections }];
  }));
}
