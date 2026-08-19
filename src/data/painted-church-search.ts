import { expandedPaintedChurches } from "./painted-churches-expanded";
import type { SearchDocument } from "./types";

const churchDocuments: SearchDocument[] = expandedPaintedChurches.map((church) => {
  const keywords = [
    "painted church",
    "painted churches",
    "Texas painted churches",
    church.shortName,
    church.city,
    `${church.county} County`,
    church.denomination,
    church.schulenburgCluster ? "Schulenburg painted churches" : undefined,
    church.nationalRegister?.multipleProperty ? "National Register decorative interior" : undefined,
    church.recordedTexasHistoricLandmark ? "Recorded Texas Historic Landmark" : undefined,
  ].filter((value): value is string => Boolean(value));

  return {
    id: `painted-church:${church.slug}`,
    brandId: "texasdefined",
    kind: "destination",
    title: church.name,
    summary: church.summary,
    keywords: [...new Set(keywords)],
    href: `/explore/painted-churches/${church.slug}`,
  };
});

const collectionDocuments: SearchDocument[] = [
  {
    id: "painted-churches:hub",
    brandId: "texasdefined",
    kind: "guide",
    title: "Painted Churches of Texas",
    summary: `The complete Texas Defined Painted Churches collection with ${expandedPaintedChurches.length} verified church profiles, route planning, map links, comparison tools and source methodology.`,
    keywords: ["painted churches Texas", "Painted Churches of Texas", "Texas painted churches", "Schulenburg painted churches", "painted church tour"],
    href: "/explore/painted-churches",
  },
  {
    id: "painted-churches:map",
    brandId: "texasdefined",
    kind: "guide",
    title: "Texas Painted Churches Map & Statewide Directory",
    summary: "All verified Texas Painted Churches grouped by region with church-specific map links, counties, locations and full guides.",
    keywords: ["painted churches Texas map", "Texas painted church locations", "painted churches directory"],
    href: "/explore/painted-churches/map",
  },
  {
    id: "painted-churches:compare",
    brandId: "texasdefined",
    kind: "guide",
    title: "Compare Texas Painted Churches",
    summary: "Compare all verified churches by county, denomination, National Register status, Recorded Texas Historic Landmark status and Schulenburg-cluster membership.",
    keywords: ["compare painted churches", "National Register painted churches", "Texas painted church list"],
    href: "/explore/painted-churches/compare",
  },
  {
    id: "painted-churches:how-many",
    brandId: "texasdefined",
    kind: "guide",
    title: "How Many Painted Churches Are in Texas?",
    summary: "Why Painted Church counts differ between the Schulenburg touring cluster, formal National Register decorative-interior group and broader statewide tradition.",
    keywords: ["how many painted churches in Texas", "number of painted churches Texas", "painted church count"],
    href: "/explore/painted-churches/how-many",
  },
  {
    id: "painted-churches:methodology",
    brandId: "texasdefined",
    kind: "guide",
    title: "Painted Churches Research Methodology & Corrections",
    summary: "Texas Defined inclusion rules, source hierarchy, image licensing standards, update policy and treatment of conflicting historical records.",
    keywords: ["painted churches sources", "painted churches research", "painted church methodology", "Texas church history sources"],
    href: "/explore/painted-churches/methodology",
  },
];

export const paintedChurchSearchDocuments: SearchDocument[] = [...collectionDocuments, ...churchDocuments];
