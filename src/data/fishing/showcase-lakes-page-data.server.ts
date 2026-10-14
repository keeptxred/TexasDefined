import { expandedShowcaseLakePrototypes } from "./expanded-showcase-lakes-prototype";
import { SHOWCASE_LAKE_SECTION_SLUGS } from "./showcase-lake-routing";
import { showcaseLakePrototypes } from "./showcase-lakes-prototype";
import { statewideNetworkShowcaseLakePrototypes } from "./statewide-lake-network";
import { wave2ShowcaseLakePrototypes } from "./wave2-showcase-lakes-prototype";

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
  const prototypes = { ...showcaseLakePrototypes, ...expandedShowcaseLakePrototypes, ...wave2ShowcaseLakePrototypes, ...statewideNetworkShowcaseLakePrototypes };
  return Object.fromEntries(Object.entries(prototypes).map(([slug, lake]) => {
    const hasNamedAccess = lake.access.some((site) => !site.name.toLowerCase().includes("public access inventory") && !site.name.toLowerCase().includes("access overview"));
    const hasNamedCamping = lake.camping.some((site) => !/camping and lodging planning|trip-planning options/i.test(site.type + " " + site.name));
    const sections = SHOWCASE_LAKE_SECTION_SLUGS.map((section) => ({
      slug: section,
      label: sectionLabel[section],
      title: `${lake.overview.name} ${sectionLabel[section] === "Fish" ? "Fish Species & Seasonal Fishing" : sectionLabel[section] === "Access" ? "Boat Ramps, Marinas & Public Access" : sectionLabel[section] === "Boating" ? "Boating, Water & Navigation" : sectionLabel[section] === "Regulations" ? "Fishing Regulations" : sectionLabel[section] === "Camping" ? "Camping & Places to Stay" : sectionLabel[section] === "Nearby" ? "Nearby Places & Trip Planning" : sectionLabel[section] === "Reports" ? "Fishing Reports" : "Fishing Guides"}`,
      description: section === "fish" ? `Target ${lake.overview.name} by species, season, habitat and technique using source-backed fisheries guidance.`
        : section === "access" ? (hasNamedAccess ? `Review named ${lake.overview.name} access facilities and verify current ramps, fees and launch conditions before travel.` : `Use official ${lake.overview.name} public-access inventories to identify ramps and check current fees, closures and launch conditions before travel.`)
        : section === "boating" ? `Plan boating on ${lake.overview.name} with lake-level, navigation, invasive-species and safety context.`
        : section === "regulations" ? `Review ${lake.overview.name} regulation planning notes and jump to current official fishing rules before harvest.`
        : section === "camping" ? (lake.campingProhibited ? `TPWD reports no overnight camping at ${lake.overview.name}; learn what day-use recreation is permitted and plan lodging outside the park.` : hasNamedCamping ? `Plan ${lake.overview.name} camping near identified public recreation facilities; verify current rates, reservations and availability with the operator.` : `Find the official ${lake.overview.name} access and recreation sources before choosing a campground; individual sites and availability are not independently verified here.`)
        : section === "nearby" ? `Connect a ${lake.overview.name} fishing trip to nearby counties, parks and TexasDefined destination pages.`
        : section === "reports" ? `Find dated ${lake.overview.name} fishing reports when available without confusing evergreen patterns with today's bite.`
        : `Browse verified ${lake.overview.name} guide listings when available, with paid placement kept separate from editorial fishing guidance.`,
    }));
    return [slug, { ...lake, sections }];
  }));
}
