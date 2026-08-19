import { paintedChurchTechniques } from "./painted-church-techniques";
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
    ...church.culturalHeritage,
    ...church.techniques,
    church.schulenburgCluster ? "Schulenburg painted churches" : undefined,
    church.classification === "formal-national-register-group" ? "National Register decorative interior" : undefined,
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

const techniqueDocuments: SearchDocument[] = paintedChurchTechniques.map((technique) => ({
  id: `painted-church-technique:${technique.slug}`,
  brandId: "texasdefined",
  kind: "guide",
  title: `${technique.name} in Texas Painted Churches`,
  summary: technique.answer,
  keywords: [technique.name, technique.shortDefinition, "painted church techniques", "decorative painting Texas churches"],
  href: `/explore/painted-churches/techniques/${technique.slug}`,
}));

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
  {
    id: "painted-churches:census",
    brandId: "texasdefined",
    kind: "guide",
    title: "Texas Painted Churches Master Census",
    summary: "Verified churches, candidates under review and scope exclusions with explicit reasons and source trails.",
    keywords: ["Texas painted churches census", "painted church candidates", "complete painted church list", "painted church exclusions"],
    href: "/explore/painted-churches/census",
  },
  {
    id: "painted-churches:techniques",
    brandId: "texasdefined",
    kind: "guide",
    title: "Texas Painted Church Painting Techniques",
    summary: "Authoritative guides to stenciling, infill, pouncing, freehand painting, marbling, graining, gilding, trompe-l’oeil, canvas-applied decoration and murals.",
    keywords: ["painted church techniques", "decorative painting", "stenciling", "marbling", "pouncing", "trompe l'oeil churches"],
    href: "/explore/painted-churches/techniques",
  },
];

export const paintedChurchSearchDocuments: SearchDocument[] = [...collectionDocuments, ...techniqueDocuments, ...churchDocuments];
