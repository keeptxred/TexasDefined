import accessGroups from "./curated-access-sites.json";
import guideBusinesses from "./curated-fishing-guide-businesses.json";
import type { FishingAccessPoint, FishingGuide, FishingSource, GuideLakeRelationship, GuideSpeciesRelationship } from "./types";

const REVIEWED_AT = "2026-11-05";
const slugify = (value: string) => value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const expandedSourcedAccessPoints: FishingAccessPoint[] = accessGroups.flatMap((group) => {
  const source: FishingSource = {
    id: `tpwd-access-${group.lakeId}`,
    name: `Texas Parks & Wildlife Department — ${group.lakeName} Access`,
    url: `https://tpwd.texas.gov/fishboat/fish/recreational/lakes/${group.tpwd}/${group.sourcePage ?? "access.phtml"}`,
    checkedAt: REVIEWED_AT,
    sourceType: "state",
  };
  return group.facilities.map((facility) => {
    const [name, listedKind, facilityDetail, facilityReviewedAt] = facility;
    // New source-backed additions carry their own observation date. Do not
    // silently restamp earlier reviewed facilities or the guide catalog.
    const checkedAt = facilityReviewedAt ?? REVIEWED_AT;
    const kind = listedKind as FishingAccessPoint["kind"];
    const canonicalSlug = `${group.lakeId}-${slugify(name)}`;
    const accessLabel = kind === "boat-ramp" ? "boat-launch location" : kind === "kayak-launch" ? "non-motorized paddling launch" : kind === "marina" ? "marina" : kind === "pier" ? "fishing pier" : "shore-access location";
    const summary = facilityDetail ?? `TPWD lists ${name} as a ${accessLabel} at ${group.lakeName}. Consult the official facility listing for documented directions and restrictions.`;
    const common = {
      id: `tpwd-site-${canonicalSlug}`,
      brandId: "texasdefined" as const,
      slug: canonicalSlug,
      name,
      status: "published" as const,
      verifiedAt: checkedAt,
      sources: [{ ...source, checkedAt }],
      lakeIds: [group.lakeId],
      description: summary,
    };
    if (kind === "boat-ramp") return { ...common, kind, launchNotes: "The source inventory identifies this location; fees and ramp accessibility are not live data." };
    if (kind === "marina") return { ...common, kind };
    if (kind === "shore" || kind === "pier" || kind === "kayak-launch") return { ...common, kind };
    throw new Error(`Unsupported curated access kind for ${group.lakeId}/${name}: ${String(kind)}`);
  });
});

export const curatedVerifiedGuides: FishingGuide[] = guideBusinesses.map((row) => ({
  id: `verified-guide-${row.slug}`,
  slug: row.slug,
  brandId: "texasdefined",
  status: "published",
  verifiedAt: REVIEWED_AT,
  sources: [{
    id: `guide-first-party-${row.slug}`,
    name: `${row.businessName} — first-party business website`,
    url: row.url,
    checkedAt: REVIEWED_AT,
    sourceType: "business",
  }],
  businessName: row.businessName,
  guideName: "guideName" in row ? row.guideName : undefined,
  bio: row.summary,
  lakeIds: [row.lakeId],
  speciesIds: row.species,
  phone: "phone" in row ? row.phone : undefined,
  website: row.url,
  verifiedListing: true,
  claimedListing: false,
  contributorApproved: false,
}));

export const curatedGuideLakes: GuideLakeRelationship[] = curatedVerifiedGuides.flatMap((guide) =>
  guide.lakeIds.map((lakeId) => ({
    id: `verified-guide-lake-${guide.slug}-${lakeId}`,
    guideId: guide.id,
    lakeId,
    primary: true,
    verifiedAt: REVIEWED_AT,
    sources: guide.sources,
  }))
);
export const curatedGuideSpecies: GuideSpeciesRelationship[] = curatedVerifiedGuides.flatMap((guide) =>
  guide.speciesIds.map((speciesId) => ({
    id: `verified-guide-fish-${guide.slug}-${speciesId}`,
    guideId: guide.id,
    speciesId,
    primary: true,
    verifiedAt: REVIEWED_AT,
    sources: guide.sources,
  }))
);
