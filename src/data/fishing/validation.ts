import { isCanonicalFishingSlug } from "./slugs";
import type {
  FishSpecies,
  FishingCatalog,
  FishingRecordBase,
  FishingSource,
  FishingTechnique,
} from "./types";

export interface FishingValidationIssue {
  code: string;
  message: string;
  entityId?: string;
}

type FishingCatalogInput = Omit<FishingCatalog, "guideLakes" | "guideSpecies"> & Partial<Pick<FishingCatalog, "guideLakes" | "guideSpecies">>;

function validIsoDate(value?: string) {
  if (!value) return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}

function validateSource(source: FishingSource, ownerId: string): FishingValidationIssue[] {
  const issues: FishingValidationIssue[] = [];
  if (!source.id.trim()) issues.push({ code: "source-id", entityId: ownerId, message: "Source id is required." });
  if (!source.name.trim()) issues.push({ code: "source-name", entityId: ownerId, message: "Source name is required." });
  if (!/^https:\/\//i.test(source.url)) issues.push({ code: "source-url", entityId: ownerId, message: `Source must use https: ${source.url}` });
  if (!validIsoDate(source.checkedAt)) issues.push({ code: "source-checked-at", entityId: ownerId, message: `Source checkedAt is invalid: ${source.checkedAt}` });
  return issues;
}

function validateRecord(record: FishingRecordBase): FishingValidationIssue[] {
  const issues: FishingValidationIssue[] = [];
  if (!record.id.trim()) issues.push({ code: "id", message: "Fishing record id is required." });
  if (!isCanonicalFishingSlug(record.slug)) issues.push({ code: "slug", entityId: record.id, message: `Noncanonical fishing slug: ${record.slug}` });
  if (record.verifiedAt && !validIsoDate(record.verifiedAt)) issues.push({ code: "verified-at", entityId: record.id, message: `verifiedAt is invalid: ${record.verifiedAt}` });
  if (record.status === "published" && !record.sources.length) issues.push({ code: "published-source", entityId: record.id, message: "Published fishing records require at least one source." });
  for (const source of record.sources) issues.push(...validateSource(source, record.id));
  return issues;
}

function duplicateIssues<T>(rows: T[], value: (row: T) => string, label: string): FishingValidationIssue[] {
  const issues: FishingValidationIssue[] = [];
  const seen = new Set<string>();
  for (const row of rows) {
    const key = value(row);
    if (seen.has(key)) issues.push({ code: `duplicate-${label}`, message: `Duplicate ${label}: ${key}` });
    seen.add(key);
  }
  return issues;
}

export function validateFishingCatalog(catalog: FishingCatalog) {
  const issues: FishingValidationIssue[] = [];
  const records: FishingRecordBase[] = [
    ...catalog.lakes,
    ...catalog.species,
    ...catalog.techniques,
    ...catalog.accessPoints,
    ...catalog.tackleShops,
    ...catalog.guides,
    ...catalog.reports,
    ...catalog.businesses,
    ...catalog.advertisers,
    ...catalog.placements,
  ];

  for (const record of records) issues.push(...validateRecord(record));
  issues.push(...duplicateIssues(records, (row) => row.id, "id"));
  issues.push(...duplicateIssues(catalog.lakes, (row) => row.slug, "lake-slug"));
  issues.push(...duplicateIssues(catalog.species, (row) => row.slug, "species-slug"));
  issues.push(...duplicateIssues(catalog.techniques, (row) => row.slug, "technique-slug"));
  issues.push(...duplicateIssues(catalog.guides, (row) => row.slug, "guide-slug"));
  issues.push(...duplicateIssues(catalog.guideLakes, (row) => row.id, "guide-lake-id"));
  issues.push(...duplicateIssues(catalog.guideSpecies, (row) => row.id, "guide-species-id"));

  const lakeIds = new Set(catalog.lakes.map((row) => row.id));
  const speciesIds = new Set(catalog.species.map((row) => row.id));
  const techniqueIds = new Set(catalog.techniques.map((row) => row.id));
  const guideIds = new Set(catalog.guides.map((row) => row.id));
  const advertiserIds = new Set(catalog.advertisers.map((row) => row.id));

  for (const relation of catalog.lakeSpecies) {
    if (!lakeIds.has(relation.lakeId)) issues.push({ code: "lake-species-lake", entityId: relation.id, message: `Unknown lake id: ${relation.lakeId}` });
    if (!speciesIds.has(relation.speciesId)) issues.push({ code: "lake-species-species", entityId: relation.id, message: `Unknown species id: ${relation.speciesId}` });
    for (const source of relation.sources) issues.push(...validateSource(source, relation.id));
  }

  for (const relation of catalog.lakeTechniques) {
    if (!lakeIds.has(relation.lakeId)) issues.push({ code: "lake-technique-lake", entityId: relation.id, message: `Unknown lake id: ${relation.lakeId}` });
    if (!techniqueIds.has(relation.techniqueId)) issues.push({ code: "lake-technique-technique", entityId: relation.id, message: `Unknown technique id: ${relation.techniqueId}` });
    for (const speciesId of relation.speciesIds) if (!speciesIds.has(speciesId)) issues.push({ code: "lake-technique-species", entityId: relation.id, message: `Unknown species id: ${speciesId}` });
    for (const source of relation.sources) issues.push(...validateSource(source, relation.id));
  }

  for (const guide of catalog.guides) {
    if (!guide.businessName.trim()) issues.push({ code: "guide-business-name", entityId: guide.id, message: "Fishing guide businessName is required." });
    if (guide.verifiedListing && !isFishingRecordVerified(guide)) issues.push({ code: "guide-verification-evidence", entityId: guide.id, message: "Verified guide listings require verifiedAt and checked sources." });
    for (const lakeId of guide.lakeIds) if (!lakeIds.has(lakeId)) issues.push({ code: "guide-lake", entityId: guide.id, message: `Unknown lake id: ${lakeId}` });
    for (const speciesId of guide.speciesIds) if (!speciesIds.has(speciesId)) issues.push({ code: "guide-species", entityId: guide.id, message: `Unknown species id: ${speciesId}` });
    for (const techniqueId of guide.techniqueIds ?? []) if (!techniqueIds.has(techniqueId)) issues.push({ code: "guide-technique", entityId: guide.id, message: `Unknown technique id: ${techniqueId}` });
    if (guide.verifiedListing) {
      const relatedLakeIds = new Set(catalog.guideLakes.filter((relation) => relation.guideId === guide.id).map((relation) => relation.lakeId));
      const relatedSpeciesIds = new Set(catalog.guideSpecies.filter((relation) => relation.guideId === guide.id).map((relation) => relation.speciesId));
      for (const lakeId of guide.lakeIds) if (!relatedLakeIds.has(lakeId)) issues.push({ code: "verified-guide-lake-relationship", entityId: guide.id, message: `Verified guide lake must have a guide-to-lake relationship: ${lakeId}` });
      for (const speciesId of guide.speciesIds) if (!relatedSpeciesIds.has(speciesId)) issues.push({ code: "verified-guide-species-relationship", entityId: guide.id, message: `Verified guide species must have a guide-to-species relationship: ${speciesId}` });
      for (const lakeId of relatedLakeIds) if (!guide.lakeIds.includes(lakeId)) issues.push({ code: "verified-guide-lake-mismatch", entityId: guide.id, message: `Guide-to-lake relationship is missing from guide lakeIds: ${lakeId}` });
      for (const speciesId of relatedSpeciesIds) if (!guide.speciesIds.includes(speciesId)) issues.push({ code: "verified-guide-species-mismatch", entityId: guide.id, message: `Guide-to-species relationship is missing from guide speciesIds: ${speciesId}` });
    }
  }

  for (const relation of catalog.guideLakes) {
    if (!guideIds.has(relation.guideId)) issues.push({ code: "guide-lake-guide", entityId: relation.id, message: `Unknown guide id: ${relation.guideId}` });
    if (!lakeIds.has(relation.lakeId)) issues.push({ code: "guide-lake-lake", entityId: relation.id, message: `Unknown lake id: ${relation.lakeId}` });
    for (const source of relation.sources) issues.push(...validateSource(source, relation.id));
  }

  for (const relation of catalog.guideSpecies) {
    if (!guideIds.has(relation.guideId)) issues.push({ code: "guide-species-guide", entityId: relation.id, message: `Unknown guide id: ${relation.guideId}` });
    if (!speciesIds.has(relation.speciesId)) issues.push({ code: "guide-species-species", entityId: relation.id, message: `Unknown species id: ${relation.speciesId}` });
    for (const source of relation.sources) issues.push(...validateSource(source, relation.id));
  }

  for (const report of catalog.reports) {
    if (!lakeIds.has(report.lakeId)) issues.push({ code: "report-lake", entityId: report.id, message: `Unknown lake id: ${report.lakeId}` });
    if (report.contributorGuideId && !guideIds.has(report.contributorGuideId)) issues.push({ code: "report-guide", entityId: report.id, message: `Unknown guide id: ${report.contributorGuideId}` });
    for (const update of report.speciesUpdates) {
      if (!speciesIds.has(update.speciesId)) issues.push({ code: "report-species", entityId: report.id, message: `Unknown species id: ${update.speciesId}` });
      for (const techniqueId of update.recommendedTechniqueIds ?? []) if (!techniqueIds.has(techniqueId)) issues.push({ code: "report-technique", entityId: report.id, message: `Unknown technique id: ${techniqueId}` });
    }
  }

  for (const placement of catalog.placements) {
    if (!advertiserIds.has(placement.advertiserId)) issues.push({ code: "placement-advertiser", entityId: placement.id, message: `Unknown advertiser id: ${placement.advertiserId}` });
    if (placement.disclosure !== "sponsored") issues.push({ code: "placement-disclosure", entityId: placement.id, message: "Fishing placements must be disclosed as sponsored." });
    for (const lakeId of placement.lakeIds ?? []) if (!lakeIds.has(lakeId)) issues.push({ code: "placement-lake", entityId: placement.id, message: `Unknown lake id: ${lakeId}` });
    for (const speciesId of placement.speciesIds ?? []) if (!speciesIds.has(speciesId)) issues.push({ code: "placement-species", entityId: placement.id, message: `Unknown species id: ${speciesId}` });
  }

  return issues;
}

export function assertValidFishingCatalog(input: FishingCatalogInput): FishingCatalog {
  const catalog: FishingCatalog = {
    ...input,
    guideLakes: input.guideLakes ?? [],
    guideSpecies: input.guideSpecies ?? [],
  };
  const issues = validateFishingCatalog(catalog);
  if (issues.length) throw new Error(`Fishing catalog validation failed:\n${issues.map((issue) => `- ${issue.code}: ${issue.message}`).join("\n")}`);
  return catalog;
}

export function isFishingRecordVerified(record: FishingRecordBase) {
  return Boolean(record.verifiedAt && record.sources.length && record.sources.every((source) => validIsoDate(source.checkedAt)));
}

export function isPublishedFishSpecies(row: FishSpecies) {
  return row.status === "published";
}

export function isPublishedFishingTechnique(row: FishingTechnique) {
  return row.status === "published";
}
