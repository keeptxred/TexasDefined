import { canonicalPaintedChurchContributors } from "./painted-church-contributor-index";
import { canonicalPaintedChurchFeatures } from "./painted-church-feature-index";
import { paintedChurchHeritage } from "./painted-church-heritage";
import { paintedChurchPreservationTopics } from "./painted-church-preservation";
import { paintedChurchSymbols } from "./painted-church-symbols";
import { paintedChurchTechniques } from "./painted-church-techniques";
import { expandedPaintedChurches } from "./painted-churches-expanded";

export type PaintedChurchKnowledgeNodeType = "church" | "feature" | "technique" | "symbol" | "contributor" | "heritage" | "preservation";

export type PaintedChurchKnowledgeNode = {
  id: string;
  type: PaintedChurchKnowledgeNodeType;
  name: string;
  url: string;
};

export type PaintedChurchKnowledgeRelationship =
  | "contains-feature"
  | "uses-technique"
  | "depicts-symbol"
  | "designed-by"
  | "built-by"
  | "decorated-by"
  | "restored-by"
  | "researched-by"
  | "heritage-context"
  | "preservation-example"
  | "contributor-uses-technique"
  | "feature-created-by"
  | "feature-uses-technique"
  | "feature-depicts-symbol";

export type PaintedChurchKnowledgeEdge = {
  from: string;
  to: string;
  relationship: PaintedChurchKnowledgeRelationship;
};

const base = "/explore/painted-churches";

export const paintedChurchKnowledgeNodes: PaintedChurchKnowledgeNode[] = [
  ...expandedPaintedChurches.map((church) => ({ id: `church:${church.slug}`, type: "church" as const, name: church.name, url: `${base}/${church.slug}` })),
  ...canonicalPaintedChurchFeatures.map((feature) => ({ id: `feature:${feature.id}`, type: "feature" as const, name: feature.name, url: `${base}/${feature.churchSlug}#interior-feature-inventory` })),
  ...paintedChurchTechniques.map((item) => ({ id: `technique:${item.slug}`, type: "technique" as const, name: item.name, url: `${base}/techniques/${item.slug}` })),
  ...paintedChurchSymbols.map((item) => ({ id: `symbol:${item.slug}`, type: "symbol" as const, name: item.name, url: `${base}/symbols/${item.slug}` })),
  ...canonicalPaintedChurchContributors.map((item) => ({ id: `contributor:${item.slug}`, type: "contributor" as const, name: item.name, url: `${base}/people/${item.slug}` })),
  ...paintedChurchHeritage.map((item) => ({ id: `heritage:${item.slug}`, type: "heritage" as const, name: item.name, url: `${base}/heritage/${item.slug}` })),
  ...paintedChurchPreservationTopics.map((item) => ({ id: `preservation:${item.slug}`, type: "preservation" as const, name: item.name, url: `${base}/preservation/${item.slug}` })),
];

function contributorRelationships(slug: string): PaintedChurchKnowledgeEdge[] {
  const churchId = `church:${slug}`;
  const edges: PaintedChurchKnowledgeEdge[] = [];
  for (const contributor of canonicalPaintedChurchContributors.filter((item) => item.churchSlugs.includes(slug))) {
    const to = `contributor:${contributor.slug}`;
    const relationships = new Set<PaintedChurchKnowledgeRelationship>();
    if (contributor.roles.includes("architect")) relationships.add("designed-by");
    if (contributor.roles.some((role) => role === "builder" || role === "contractor")) relationships.add("built-by");
    if (contributor.roles.some((role) => role === "artist" || role === "decorator" || role === "clergy-artist" || role === "interior-craftsman")) relationships.add("decorated-by");
    if (contributor.roles.some((role) => role === "restorer" || role === "conservator")) relationships.add("restored-by");
    if (contributor.roles.includes("researcher")) relationships.add("researched-by");
    for (const relationship of relationships) edges.push({ from: churchId, to, relationship });
  }
  return edges;
}

const churchEdges: PaintedChurchKnowledgeEdge[] = expandedPaintedChurches.flatMap((church) => [
  ...church.techniques.map((slug) => ({ from: `church:${church.slug}`, to: `technique:${slug}`, relationship: "uses-technique" as const })),
  ...paintedChurchSymbols.filter((item) => item.churchSlugs.includes(church.slug)).map((item) => ({ from: `church:${church.slug}`, to: `symbol:${item.slug}`, relationship: "depicts-symbol" as const })),
  ...contributorRelationships(church.slug),
  ...paintedChurchHeritage.filter((item) => item.churchSlugs.includes(church.slug)).map((item) => ({ from: `church:${church.slug}`, to: `heritage:${item.slug}`, relationship: "heritage-context" as const })),
  ...paintedChurchPreservationTopics.filter((item) => item.churchSlugs.includes(church.slug)).map((item) => ({ from: `church:${church.slug}`, to: `preservation:${item.slug}`, relationship: "preservation-example" as const })),
]);

const featureEdges: PaintedChurchKnowledgeEdge[] = canonicalPaintedChurchFeatures.flatMap((feature) => [
  { from: `church:${feature.churchSlug}`, to: `feature:${feature.id}`, relationship: "contains-feature" as const },
  ...(feature.contributorSlugs ?? []).map((slug) => ({ from: `feature:${feature.id}`, to: `contributor:${slug}`, relationship: "feature-created-by" as const })),
  ...(feature.techniqueSlugs ?? []).map((slug) => ({ from: `feature:${feature.id}`, to: `technique:${slug}`, relationship: "feature-uses-technique" as const })),
  ...(feature.symbolSlugs ?? []).map((slug) => ({ from: `feature:${feature.id}`, to: `symbol:${slug}`, relationship: "feature-depicts-symbol" as const })),
]);

const contributorTechniqueEdges: PaintedChurchKnowledgeEdge[] = canonicalPaintedChurchContributors.flatMap((person) =>
  (person.techniqueSlugs ?? []).map((slug) => ({ from: `contributor:${person.slug}`, to: `technique:${slug}`, relationship: "contributor-uses-technique" as const })),
);

export const paintedChurchKnowledgeEdges: PaintedChurchKnowledgeEdge[] = [...churchEdges, ...featureEdges, ...contributorTechniqueEdges];

const nodeMap = new Map(paintedChurchKnowledgeNodes.map((node) => [node.id, node]));

export function paintedChurchKnowledgeForChurch(slug: string) {
  const churchId = `church:${slug}`;
  return paintedChurchKnowledgeEdges
    .filter((edge) => edge.from === churchId || edge.to === churchId)
    .map((edge) => {
      const otherId = edge.from === churchId ? edge.to : edge.from;
      return { edge, node: nodeMap.get(otherId) };
    })
    .filter((item): item is { edge: PaintedChurchKnowledgeEdge; node: PaintedChurchKnowledgeNode } => Boolean(item.node));
}

export function paintedChurchKnowledgeNode(id: string) {
  return nodeMap.get(id);
}
