import type { ShowcaseLakePrototype } from "./showcase-lakes-prototype";
import { classifySourceReviewedAccessKind } from "./access-kind";
import type { FishingAccessPoint, FishingSource } from "./types";

/**
 * Reuse the already published, manually TPWD-reviewed access dossiers within
 * TexasDefined's statewide lake authority network. Never publish a generic
 * fabricated "public access inventory" placeholder as a facility.
 *
 * These source-linked visitor records do not imply today's opening status.
 */
const normalizeName = (name: string) => name.normalize("NFKD").toLowerCase().replace(/[^a-z0-9]/g, "");
const slugify = (name: string) => name.normalize("NFKD").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function deriveReviewedStatewideAccessPoints(
  prototypes: ShowcaseLakePrototype[],
  existingAccessPoints: FishingAccessPoint[],
): FishingAccessPoint[] {
  const present = new Set(existingAccessPoints.flatMap((point) =>
    point.lakeIds.map((lakeId) => `${lakeId}:${normalizeName(point.name)}`),
  ));
  const seededLakes = new Set(existingAccessPoints.flatMap((point) => point.lakeIds));
  const output: FishingAccessPoint[] = [];
  for (const lake of prototypes) {
    // A newly source-checked, fully enumerated lake inventory takes precedence
    // over earlier authority notes; do not duplicate the same ramp under aliases.
    if (seededLakes.has(lake.slug)) continue;
    // Only the explicit source-reviewed access dossiers, never synthesized
    // generic lake-level access sentences or assumed facilities.
    if (!lake.accessReviewedAt || !lake.sources.tpwdAccess?.url.startsWith("https://tpwd.texas.gov/")) continue;
    const source: FishingSource = {
      id: `reviewed-statewide-access-${lake.slug}`,
      name: lake.sources.tpwdAccess.label,
      url: lake.sources.tpwdAccess.url,
      checkedAt: lake.accessReviewedAt,
      sourceType: "state",
    };
    for (const facility of lake.access) {
      const name = facility.name?.trim();
      if (!name || name.toLowerCase().includes("public access inventory")) continue;
      const key = `${lake.slug}:${normalizeName(name)}`;
      if (present.has(key)) continue;
      present.add(key);

      const kind = classifySourceReviewedAccessKind(facility);
      const slug = `${lake.slug}-${slugify(name)}`;
      const record = {
        id: `statewide-source-access-${slug}`,
        brandId: "texasdefined" as const,
        slug,
        status: "published" as const,
        verifiedAt: lake.accessReviewedAt,
        sources: [source],
        name,
        lakeIds: [lake.slug],
        description: `${facility.launch} Operator listed by TPWD: ${facility.operator}. Source-listed fee terms: ${facility.fee}.`,
      };
      if (kind === "marina") output.push({ ...record, kind: "marina", amenities: undefined });
      else if (kind === "boat-ramp") output.push({ ...record, kind: "boat-ramp", launchNotes: `Original reviewed access notice: ${facility.availability}. Check lake elevation, gates, current fees and ramp availability with the operator.` });
      else output.push({ ...record, kind, accessNotes: `Source notice: ${facility.availability}. Check official conditions before traveling.` });
    }
  }
  return output;
}
