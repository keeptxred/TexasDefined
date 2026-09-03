import type { EntityRelationship, TexasEntityRecord } from './types';

const checkedAt = '2026-09-02';
const sourceId = 'texasdefined-wildlife-destination-evidence';

const SPECIES_DESTINATIONS: Record<string, string[]> = {
  'wildlife-species:whooping-crane': [
    'wildlife-management-area:aransas-national-wildlife-refuge',
  ],
  'wildlife-species:ocelot': [
    'wildlife-management-area:laguna-atascosa-national-wildlife-refuge',
    'wildlife-management-area:lower-rio-grande-valley-national-wildlife-refuge',
  ],
  'wildlife-species:american-alligator': [
    'wildlife-management-area:anahuac-national-wildlife-refuge',
    'wildlife-management-area:brazoria-national-wildlife-refuge',
    'wildlife-management-area:jocelyn-nungaray-national-wildlife-refuge',
    'wildlife-management-area:mcfaddin-national-wildlife-refuge',
    'wildlife-management-area:san-bernard-national-wildlife-refuge',
  ],
  'wildlife-species:roseate-spoonbill': [
    'wildlife-management-area:anahuac-national-wildlife-refuge',
    'wildlife-management-area:brazoria-national-wildlife-refuge',
    'wildlife-management-area:jocelyn-nungaray-national-wildlife-refuge',
    'wildlife-management-area:mcfaddin-national-wildlife-refuge',
    'wildlife-management-area:san-bernard-national-wildlife-refuge',
    'wildlife-management-area:texas-point-national-wildlife-refuge',
  ],
  'wildlife-species:white-tailed-deer': [
    'wildlife-management-area:balcones-canyonlands-national-wildlife-refuge',
    'wildlife-management-area:hagerman-national-wildlife-refuge',
    'wildlife-management-area:lower-rio-grande-valley-national-wildlife-refuge',
  ],
  'wildlife-species:wild-turkey': [
    'wildlife-management-area:balcones-canyonlands-national-wildlife-refuge',
    'wildlife-management-area:hagerman-national-wildlife-refuge',
  ],
  'wildlife-species:bobcat': [
    'wildlife-management-area:hagerman-national-wildlife-refuge',
    'wildlife-management-area:sancti-spiritus-national-wildlife-refuge',
  ],
  'wildlife-species:nine-banded-armadillo': [
    'wildlife-management-area:balcones-canyonlands-national-wildlife-refuge',
    'wildlife-management-area:buffalo-lake-national-wildlife-refuge',
    'wildlife-management-area:lower-rio-grande-valley-national-wildlife-refuge',
    'wildlife-management-area:sancti-spiritus-national-wildlife-refuge',
  ],
  'wildlife-species:mule-deer': [
    'wildlife-management-area:buffalo-lake-national-wildlife-refuge',
  ],
};

function relationship(type: string, targetId: string): EntityRelationship {
  return { type, targetId, sourceId, verifiedAt: checkedAt };
}

export function wildlifeDestinationRelationshipsForSpecies(speciesId: string): EntityRelationship[] {
  return (SPECIES_DESTINATIONS[speciesId] ?? []).map((targetId) => relationship('documented-at', targetId));
}

export function wildlifeSpeciesRelationshipsForDestination(destinationId: string): EntityRelationship[] {
  return Object.entries(SPECIES_DESTINATIONS)
    .filter(([, destinationIds]) => destinationIds.includes(destinationId))
    .map(([targetId]) => relationship('documented-wildlife', targetId));
}

function mergeRelationships(existing: EntityRelationship[], added: EntityRelationship[]) {
  return [
    ...existing,
    ...added.filter((relationship) => !existing.some((item) => item.type === relationship.type && item.targetId === relationship.targetId)),
  ];
}

export function enrichWildlifeRelationships(entity: TexasEntityRecord): TexasEntityRecord {
  const added = entity.kind === 'wildlife-species'
    ? wildlifeDestinationRelationshipsForSpecies(entity.id)
    : entity.kind === 'wildlife-management-area'
      ? wildlifeSpeciesRelationshipsForDestination(entity.id)
      : [];
  if (!added.length) return entity;
  return { ...entity, relationships: mergeRelationships(entity.relationships, added) };
}
