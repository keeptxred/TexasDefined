import { fishingPlatform, fishingScope } from '@/data/fishing';

export type LakeGameFishDiversityRow = {
  lakeId: string;
  slug: string;
  name: string;
  counties: string[];
  surfaceAcres: number | null;
  riverBasin: string | null;
  targetCount: number;
  targets: string[];
  targetsPerThousandAcres: number | null;
  verifiedAt: string | null;
  sourceUrls: string[];
};

export type LakeGameFishDiversityDataset = {
  rows: LakeGameFishDiversityRow[];
  lakeCount: number;
  relationshipCount: number;
  generatedAt: string;
};

let datasetPromise: Promise<LakeGameFishDiversityDataset> | undefined;

export function loadLakeGameFishDiversity() {
  datasetPromise ??= buildLakeGameFishDiversity();
  return datasetPromise;
}

async function buildLakeGameFishDiversity(): Promise<LakeGameFishDiversityDataset> {
  const [lakes, species, relationships] = await Promise.all([
    fishingPlatform.lakes.list({ ...fishingScope, status: 'published' }),
    fishingPlatform.species.list({ ...fishingScope, status: 'published' }),
    fishingPlatform.lakeSpecies.list(fishingScope),
  ]);

  const speciesById = new Map(species.map((fish) => [fish.id, fish]));
  const relationsByLake = new Map<string, typeof relationships>();
  for (const relation of relationships) {
    const existing = relationsByLake.get(relation.lakeId) ?? [];
    existing.push(relation);
    relationsByLake.set(relation.lakeId, existing);
  }

  const rows = lakes.map((lake) => {
    const relations = relationsByLake.get(lake.id) ?? [];
    const targetNames = [...new Set(relations
      .map((relation) => speciesById.get(relation.speciesId)?.commonName)
      .filter((name): name is string => Boolean(name)))]
      .sort((a, b) => a.localeCompare(b));
    const acres = lake.surfaceAcres && lake.surfaceAcres > 0 ? lake.surfaceAcres : null;
    const sourceUrls = [...new Set([
      ...lake.sources.map((source) => source.url),
      ...relations.flatMap((relation) => relation.sources.map((source) => source.url)),
    ].filter(Boolean))];
    return {
      lakeId: lake.id,
      slug: lake.slug,
      name: lake.name,
      counties: lake.counties,
      surfaceAcres: acres,
      riverBasin: lake.riverBasin ?? null,
      targetCount: targetNames.length,
      targets: targetNames,
      targetsPerThousandAcres: acres ? (targetNames.length / acres) * 1000 : null,
      verifiedAt: lake.verifiedAt ?? null,
      sourceUrls,
    } satisfies LakeGameFishDiversityRow;
  }).filter((row) => row.targetCount > 0)
    .sort((a, b) => b.targetCount - a.targetCount || (b.targetsPerThousandAcres ?? -1) - (a.targetsPerThousandAcres ?? -1) || a.name.localeCompare(b.name));

  return {
    rows,
    lakeCount: rows.length,
    relationshipCount: relationships.length,
    generatedAt: '2026-10-03',
  };
}
