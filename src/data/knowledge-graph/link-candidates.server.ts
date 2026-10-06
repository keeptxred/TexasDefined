import { cityMetroAuthoritySeedEntities } from "../city-metro-authority-seeds";
import { TEXAS_ENTITY_REGISTRY } from "../texas-entity-registry";
import { applyCurrentEntityCorrections } from "./current-entity-corrections";
import { PUBLIC_CAVERN_ENTITIES } from "./public-caverns";
import type { TexasEntityRecord } from "./types";
import { TEXAS_WILDLIFE_SPECIES } from "./wildlife-species";

function currentEntity(entity: TexasEntityRecord) {
  return entity.kind === "sports-venue" ? applyCurrentEntityCorrections(entity) : entity;
}

function mentioned(text: string, entity: TexasEntityRecord) {
  return [entity.name, ...entity.aliases].some((rawLabel) => {
    const label = rawLabel.trim();
    if (label.length < 4) return false;
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|\\W)${escaped}(?=$|\\W)`, "i").test(text);
  });
}

/**
 * Detail-page auto-linking only needs entities whose verified names or aliases
 * actually occur in the page text. Keep this path entirely local so ordinary
 * article/destination requests never hydrate the remote 500-row Explore graph.
 */
export function loadLocalTexasKnowledgeGraph(): TexasEntityRecord[] {
  const merged = new Map<string, TexasEntityRecord>();
  for (const entity of TEXAS_ENTITY_REGISTRY) merged.set(entity.id, currentEntity(entity));
  for (const entity of TEXAS_WILDLIFE_SPECIES) merged.set(entity.id, entity);
  for (const entity of PUBLIC_CAVERN_ENTITIES) merged.set(entity.id, entity);
  for (const entity of cityMetroAuthoritySeedEntities()) merged.set(entity.id, entity);
  return [...merged.values()];
}

export function loadTexasKnowledgeGraphLinkCandidates(text: string): TexasEntityRecord[] {
  if (!text.trim()) return [];
  return loadLocalTexasKnowledgeGraph().filter((entity) => mentioned(text, entity));
}
