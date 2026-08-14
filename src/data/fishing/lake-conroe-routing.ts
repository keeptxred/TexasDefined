export const LAKE_CONROE_SLUG = "lake-conroe" as const;
export const LAKE_CONROE_VERIFIED_AT = "2026-08-13" as const;

export const LAKE_CONROE_SECTION_SLUGS = [
  "fish",
  "access",
  "boating",
  "regulations",
  "camping",
  "nearby",
  "reports",
  "guides",
] as const;

export type LakeConroeSection = (typeof LAKE_CONROE_SECTION_SLUGS)[number];

export function lakeConroeCanonicalPath(section?: LakeConroeSection) {
  return `/fishing/lakes/${LAKE_CONROE_SLUG}${section ? `/${section}` : ""}`;
}

export function isLakeConroeSection(value: string): value is LakeConroeSection {
  return (LAKE_CONROE_SECTION_SLUGS as readonly string[]).includes(value);
}
