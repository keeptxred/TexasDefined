import { paintedChurchHeritage } from "./painted-church-heritage";
import { paintedChurchPeople } from "./painted-church-people";
import { paintedChurchPreservationTopics } from "./painted-church-preservation";
import { paintedChurchSymbols } from "./painted-church-symbols";
import { paintedChurchTechniques } from "./painted-church-techniques";
import { expandedPaintedChurches } from "./painted-churches-expanded";

export type PaintedChurchKnowledgeNodeType = "church" | "technique" | "symbol" | "person" | "heritage" | "preservation";

export type PaintedChurchKnowledgeNode = {
  id: string;
  type: PaintedChurchKnowledgeNodeType;
  name: string;
  url: string;
};

export type PaintedChurchKnowledgeEdge = {
  from: string;
  to: string;
  relationship: "uses-technique" | "depicts-symbol" | "connected-person" | "heritage-context" | "preservation-example" | "person-uses-technique";
};

const base = "/explore/painted-churches";

export const paintedChurchKnowledgeNodes: PaintedChurchKnowledgeNode[] = [
  ...expandedPaintedChurches.map((church) => ({ id: `church:${church.slug}`, type: "church" as const, name: church.name, url: `${base}/${church.slug}` })),
  ...paintedChurchTechniques.map((item) => ({ id: `technique:${item.slug}`, type: "technique" as const, name: item.name, url: `${base}/techniques/${item.slug}` })),
  ...paintedChurchSymbols.map((item) => ({ id: `symbol:${item.slug}`, type: "symbol" as const, name: item.name, url: `${base}/symbols/${item.slug}` })),
  ...paintedChurchPeople.map((item) => ({ id: `person:${item.slug}`, type: "person" as const, name: item.name, url: `${base}/people/${item.slug}` })),
  ...paintedChurchHeritage.map((item) => ({ id: `heritage:${item.slug}`, type: "heritage" as const, name: item.name, url: `${base}/heritage/${item.slug}` })),
  ...paintedChurchPreservationTopics.map((item) => ({ id: `preservation:${item.slug}`, type: "preservation" as const, name: item.name, url: `${base}/preservation/${item.slug}` })),
];

const churchEdges: PaintedChurchKnowledgeEdge[] = expandedPaintedChurches.flatMap((church) => [
  ...church.techniques.map((slug) => ({ from: `church:${church.slug}`, to: `technique:${slug}`, relationship: "uses-technique" as const })),
  ...paintedChurchSymbols.filter((item) => item.churchSlugs.includes(church.slug)).map((item) => ({ from: `church:${church.slug}`, to: `symbol:${item.slug}`, relationship: "depicts-symbol" as const })),
  ...paintedChurchPeople.filter((item) => item.churchSlugs.includes(church.slug)).map((item) => ({ from: `church:${church.slug}`, to: `person:${item.slug}`, relationship: "connected-person" as const })),
  ...paintedChurchHeritage.filter((item) => item.churchSlugs.includes(church.slug)).map((item) => ({ from: `church:${church.slug}`, to: `heritage:${item.slug}`, relationship: "heritage-context" as const })),
  ...paintedChurchPreservationTopics.filter((item) => item.churchSlugs.includes(church.slug)).map((item) => ({ from: `church:${church.slug}`, to: `preservation:${item.slug}`, relationship: "preservation-example" as const })),
]);

const personTechniqueEdges: PaintedChurchKnowledgeEdge[] = paintedChurchPeople.flatMap((person) =>
  (person.techniqueSlugs ?? []).map((slug) => ({ from: `person:${person.slug}`, to: `technique:${slug}`, relationship: "person-uses-technique" as const })),
);

export const paintedChurchKnowledgeEdges: PaintedChurchKnowledgeEdge[] = [...churchEdges, ...personTechniqueEdges];

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
