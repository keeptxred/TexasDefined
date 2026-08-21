import { PRIORITY_SEARCH_PAGES } from "./priority-search-pages";
import { TEXAS_VS_STATES, texasVsStateProfile, texasVsStateSlug } from "./texas-vs-states";
import type { SearchDocument } from "./types";

const prioritySearchRoutes = [
  ["texas-attorney-general", "/texas-attorney-general", ["Texas Attorney General", "OAG", "child support", "consumer protection"]],
  ["texas-fishing-license", "/texas-fishing-license", ["Texas fishing license", "fishing permit", "TPWD fishing license"]],
  ["texas-secretary-of-state", "/texas-secretary-of-state", ["Texas Secretary of State", "Texas SOS", "business filings", "elections"]],
  ["texas-drivers-license", "/texas-drivers-license", ["Texas driver license", "drivers license", "DPS license", "REAL ID"]],
  ["texas-dmv", "/texas-dmv", ["Texas DMV", "TxDMV", "vehicle title"]],
  ["texas-dps", "/texas-dps", ["Texas DPS", "Department of Public Safety", "driver license"]],
  ["texas-unemployment", "/texas-unemployment", ["Texas unemployment", "TWC unemployment", "unemployment benefits"]],
  ["texas-comptroller", "/texas-comptroller", ["Texas Comptroller", "Texas taxes", "franchise tax", "sales tax"]],
  ["texas-vehicle-registration", "/texas-vehicle-registration", ["Texas vehicle registration", "registration renewal", "TxDMV registration"]],
  ["texas-flag", "/texas-flag", ["Texas flag", "Lone Star flag", "Texas flag history", "Texas flag rules"]],
  ["texas-state-fair", "/texas-state-fair", ["State Fair of Texas", "Texas state fair", "Fair Park", "Big Tex"]],
  ["texas-two-step", "/texas-two-step", ["Texas Two Step", "Texas lottery", "Two Step lottery"]],
] as const;

export function buildPrioritySearchDocuments(): SearchDocument[] {
  const priorityDocuments: SearchDocument[] = prioritySearchRoutes.map(([key, href, keywords]) => {
    const page = PRIORITY_SEARCH_PAGES[key];
    return {
      id: `guide:${key}`,
      brandId: "texasdefined",
      kind: "guide",
      title: page.title,
      summary: page.quickAnswer ?? page.intro,
      keywords: [...keywords, page.eyebrow],
      href,
    };
  });

  const stateComparisonDocuments: SearchDocument[] = TEXAS_VS_STATES.map((state) => ({
    id: `guide:texas-vs-${texasVsStateSlug(state)}`,
    brandId: "texasdefined",
    kind: "guide",
    title: `Texas vs ${state}`,
    summary: texasVsStateProfile(state)?.comparisonFocus ?? `Compare Texas with ${state} across housing, taxes, jobs, climate and everyday life.`,
    keywords: [`Texas vs ${state}`, `${state} vs Texas`, `moving from ${state} to Texas`, "moving to Texas", "cost of living", "state comparison"],
    href: `/texas-vs/${texasVsStateSlug(state)}`,
  }));

  return [
    {
      id: "guide:best-camping-texas",
      brandId: "texasdefined",
      kind: "guide",
      title: "Best Places to Go Camping in Texas",
      summary: "Choose standout Texas camping destinations by region, season and camping style, with state-park planning and official reservation links.",
      keywords: ["best places to go camping in Texas", "best camping in Texas", "Texas camping", "Texas campgrounds", "Texas state park camping", "RV camping Texas", "tent camping Texas"],
      href: "/best-places-to-go-camping-in-texas",
    },
    {
      id: "collection:texas-vs-every-state",
      brandId: "texasdefined",
      kind: "collection",
      title: "Texas vs Every Other State",
      summary: "Compare Texas with all 49 other states using a consistent framework for housing, taxes, jobs, climate, geography and everyday life.",
      keywords: ["Texas vs every state", "Texas vs other states", "Texas state comparison", "moving to Texas", "Texas cost of living"],
      href: "/texas-vs-every-state",
    },
    {
      id: "collection:texas-resources",
      brandId: "texasdefined",
      kind: "collection",
      title: "Texas Resources & State Agencies",
      summary: "Texas driver licenses, DMV, DPS, vehicle registration, unemployment, fishing licenses, state agencies and practical official-service guides.",
      keywords: ["Texas resources", "Texas state agencies", "Texas government services", "Texas DMV", "Texas DPS", "Texas unemployment", "Texas Comptroller", "Texas Secretary of State"],
      href: "/texas-resources",
    },
    ...priorityDocuments,
    ...stateComparisonDocuments,
  ];
}
