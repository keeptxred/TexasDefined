import { TEXAS_VS_STATES, texasVsStateSlug } from "./texas-vs-states-index";
import type { SearchDocument } from "./types";

const priorityGuides = [
  ["texas-attorney-general", "Texas Attorney General: Office, Services and Official Links", "Find Texas Attorney General services, including consumer protection, child support, open government and official OAG resources.", ["Texas Attorney General", "OAG", "child support", "consumer protection"]],
  ["texas-fishing-license", "Texas Fishing License: Requirements, Options and Official Links", "Texas fishing-license requirements, freshwater and saltwater options, exceptions and official TPWD purchase links.", ["Texas fishing license", "fishing permit", "TPWD fishing license"]],
  ["texas-secretary-of-state", "Texas Secretary of State: Elections, Business Filings and Records", "Texas Secretary of State services for elections, business filings, state records and official public information.", ["Texas Secretary of State", "Texas SOS", "business filings", "elections"]],
  ["texas-drivers-license", "Texas Driver License: Renewals, Appointments and REAL ID", "Texas DPS driver-license services, renewals, replacements, appointments, REAL ID and address changes.", ["Texas driver license", "drivers license", "DPS license", "REAL ID"]],
  ["texas-dmv", "Texas DMV: Vehicle Registration, Titles and TxDMV Services", "What TxDMV handles, including vehicle registration, titles, dealer services and the difference between TxDMV and DPS.", ["Texas DMV", "TxDMV", "vehicle title"]],
  ["texas-dps", "Texas DPS: Driver Licenses, Public Safety and Official Services", "Texas Department of Public Safety services, including driver licensing, records and public-safety resources.", ["Texas DPS", "Department of Public Safety", "driver license"]],
  ["texas-unemployment", "Texas Unemployment: Benefits, Claims and TWC Resources", "Texas unemployment-benefit information, claims and official Texas Workforce Commission resources.", ["Texas unemployment", "TWC unemployment", "unemployment benefits"]],
  ["texas-comptroller", "Texas Comptroller: Taxes, Revenue and Official Services", "Texas Comptroller resources for state taxes, sales tax, franchise tax, public finance and related services.", ["Texas Comptroller", "Texas taxes", "franchise tax", "sales tax"]],
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
    { id: "guide:best-camping-texas", brandId: "texasdefined", kind: "guide", title: "Best Places to Go Camping in Texas", summary: "Choose standout Texas camping destinations by region, season and camping style, with state-park planning and official reservation links.", keywords: ["best places to go camping in Texas", "best camping in Texas", "Texas camping", "Texas campgrounds", "Texas state park camping", "RV camping Texas", "tent camping Texas"], href: "/best-places-to-go-camping-in-texas" },
    { id: "collection:texas-vs-every-state", brandId: "texasdefined", kind: "collection", title: "Texas vs Every Other State", summary: "Compare Texas with all 49 other states using a consistent framework for housing, taxes, jobs, climate, geography and everyday life.", keywords: ["Texas vs every state", "Texas vs other states", "Texas state comparison", "moving to Texas", "Texas cost of living"], href: "/texas-vs-every-state" },
    { id: "collection:texas-resources", brandId: "texasdefined", kind: "collection", title: "Texas Resources & State Agencies", summary: "Texas driver licenses, DMV, DPS, vehicle registration, unemployment, fishing licenses, state agencies and practical official-service guides.", keywords: ["Texas resources", "Texas state agencies", "Texas government services", "Texas DMV", "Texas DPS", "Texas unemployment", "Texas Comptroller", "Texas Secretary of State"], href: "/texas-resources" },
    ...guides,
    ...comparisons,
  ];
}
