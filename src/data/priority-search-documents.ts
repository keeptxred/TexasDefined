import { TEXAS_VS_STATES, texasVsStateSlug } from "./texas-vs-states-index";
import type { SearchDocument } from "./types";

const priorityGuides = [
  ["texas-fishing-license", "Texas Fishing License: Requirements, Options and Official Links", "Texas fishing-license requirements, freshwater and saltwater options, exceptions and official TPWD purchase links.", ["Texas fishing license", "fishing permit", "TPWD fishing license"]],
  ["texas-drivers-license", "Texas Driver License: Renewals, Appointments and REAL ID", "Texas DPS driver-license services, renewals, replacements, appointments, REAL ID and address changes.", ["Texas driver license", "drivers license", "DPS license", "REAL ID"]],
  ["texas-dmv", "Texas DMV: Vehicle Registration, Titles and TxDMV Services", "What TxDMV handles, including vehicle registration, titles, dealer services and the difference between TxDMV and DPS.", ["Texas DMV", "TxDMV", "vehicle title"]],
  ["texas-vehicle-registration", "Texas Vehicle Registration: Renewals, County Offices and TxDMV", "Texas vehicle-registration renewals, county offices, TxDMV requirements and official services.", ["Texas vehicle registration", "registration renewal", "TxDMV registration"]],
  ["texas-flag", "Texas Flag: History, Meaning, Rules and the Lone Star", "History, meaning, design and display guidance for the Texas Lone Star flag.", ["Texas flag", "Lone Star flag", "Texas flag history", "Texas flag rules"]],
  ["texas-state-fair", "State Fair of Texas 2026: Dates, Fair Park and Planning", "Plan a 2026 State Fair of Texas visit with dates, Fair Park basics, food, rides, exhibits and official resources.", ["State Fair of Texas", "Texas state fair", "Fair Park", "Big Tex"]],
  ["texas-two-step", "Texas Two Step: How the Texas Lottery Game Works", "A plain-English guide to Texas Two Step numbers, drawings, prizes and current official lottery administration.", ["Texas Two Step", "Texas lottery", "Two Step lottery"]],
] as const;

export function buildPrioritySearchDocuments(): SearchDocument[] {
  const guides: SearchDocument[] = priorityGuides.map(([slug, title, summary, keywords]) => ({
    id: `guide:${slug}`,
    brandId: "texasdefined",
    kind: "guide",
    title,
    summary,
    keywords: [...keywords],
    href: `/${slug}`,
  }));

  const comparisons: SearchDocument[] = TEXAS_VS_STATES.map((state) => ({
    id: `guide:texas-vs-${texasVsStateSlug(state)}`,
    brandId: "texasdefined",
    kind: "guide",
    title: `Texas vs ${state}`,
    summary: `Compare Texas with ${state} across housing, taxes, jobs, climate, geography, transportation and everyday life.`,
    keywords: [`Texas vs ${state}`, `${state} vs Texas`, `moving from ${state} to Texas`, "moving to Texas", "cost of living", "state comparison"],
    href: `/texas-vs/${texasVsStateSlug(state)}`,
  }));

  return [
    { id: "collection:texas-icons", brandId: "texasdefined", kind: "collection", title: "Texas Icons: 250 People, Places and Symbols", summary: "A cross-linked directory of 250 people, places, brands, foods and symbols tied to Texas identity.", keywords: ["Texas Icons", "famous Texans", "Texas people", "Texas musicians", "Texas athletes", "Texas brands", "Texas foods", "Texas symbols"], href: "/texas-icons" },
    { id: "guide:best-camping-texas", brandId: "texasdefined", kind: "guide", title: "Texas Camping & RV Campground Guide", summary: "Find verified public camping and outdoor lodging in Texas by RV, tent, primitive, beach, full-hookup, cabins, glamping, Airstreams, water access and region.", keywords: ["best places to go camping in Texas", "best camping in Texas", "Texas camping", "Texas campgrounds", "Texas state park camping", "Texas national park camping", "National Forest camping Texas", "USACE camping Texas", "LCRA camping", "LCRA parks camping", "Texas river authority camping", "RV camping Texas", "RV camping near Austin", "RV camping near Dallas", "campgrounds near DFW", "campgrounds near Houston", "RV camping near Waco", "tent camping Texas", "primitive camping Texas", "Texas beach camping", "Texas glamping", "Texas cabin camping", "Texas Airstream camping", "Texas outdoor lodging", "full hookup public campgrounds", "full hookup campgrounds near Dallas", "full hookup campgrounds near Waco", "lake camping Texas", "river camping Texas", "Inks Lake camping", "Colorado Bend camping", "Caprock Canyons camping", "Dinosaur Valley camping", "Pedernales Falls camping", "Lake Whitney camping", "Lake Tawakoni camping", "Chisos Basin Campground", "Rio Grande Village Campground", "Cottonwood Campground Big Bend", "Pine Springs Campground", "Dog Canyon Campground", "Cedar Breaks Park camping", "Lake Georgetown camping", "Russell Park camping", "Ratcliff Lake camping", "Davy Crockett National Forest camping", "Black Rock Park camping", "Lake Buchanan camping", "Lake Bastrop camping", "Lake Bastrop North Shore Park", "Lake Bastrop South Shore Park", "Matagorda Bay Nature Park camping", "Matagorda RV camping", "Matagorda beach bungalow"], href: "/best-places-to-go-camping-in-texas" },
    { id: "collection:texas-vs-every-state", brandId: "texasdefined", kind: "collection", title: "Texas vs Every Other State", summary: "Compare Texas with all 49 other states using a consistent framework for housing, taxes, jobs, climate, geography and everyday life.", keywords: ["Texas vs every state", "Texas vs other states", "Texas state comparison", "moving to Texas", "Texas cost of living"], href: "/texas-vs-every-state" },
    { id: "collection:texas-resources", brandId: "texasdefined", kind: "collection", title: "Texas Resources & Everyday Tools", summary: "Texas driver licenses, DMV, vehicle registration, fishing licenses, moving tools, state-agency references and practical Texas guides.", keywords: ["Texas resources", "Texas state agencies", "Texas services", "Texas DMV", "Texas driver license", "Texas fishing license", "moving to Texas"], href: "/texas-resources" },
    ...guides,
    ...comparisons,
  ];
}
