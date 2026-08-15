import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

import { fishingPlatform, fishingScope } from "./index";
import { fishingGuideCanonicalPath } from "./guide-routing";

const SPONSORED_GUIDE_KINDS = ["featured-guide", "lake-guide", "regional-guide", "species-guide"] as const;

function buildFishingGuideProfileHead(pageData: {
  guide: { businessName: string; bio?: string; phone?: string; website?: string; verifiedAt?: string; serviceRegions?: string[] };
  canonicalPath: string;
  lakes: Array<{ lake?: { name: string } }>;
  species: Array<{ species?: { commonName: string } }>;
}) {
  const { guide, canonicalPath, lakes, species } = pageData;
  const origin = `https://${texasDefinedBrand.identity.domain}`;
  const description = guide.bio ?? `Verified Texas fishing-guide profile for ${guide.businessName}, including only sourced lake, target-species and business details.`;
  const serviceAreas = [...new Set([...lakes.map(({ lake }) => lake?.name).filter(Boolean), ...(guide.serviceRegions ?? []).map((region) => region.replaceAll("-", " "))])];
  return {
    meta: buildMeta(texasDefinedBrand, { title: `${guide.businessName} — Verified Texas Fishing Guide`, description, canonicalPath }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [{ type: "application/ld+json", children: JSON.stringify([
      { "@context": "https://schema.org", "@type": "WebPage", name: `${guide.businessName} — Verified Texas Fishing Guide`, description, url: `${origin}${canonicalPath}`, dateModified: guide.verifiedAt },
      { "@context": "https://schema.org", "@type": "ProfessionalService", name: guide.businessName, ...(guide.phone ? { telephone: guide.phone } : {}), ...(guide.website ? { sameAs: guide.website } : {}), ...(serviceAreas.length ? { areaServed: serviceAreas } : {}), ...(species.length ? { knowsAbout: species.map(({ species: fish }) => fish?.commonName).filter(Boolean) } : {}) },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: origin },
        { "@type": "ListItem", position: 2, name: "Fishing", item: `${origin}/fishing` },
        { "@type": "ListItem", position: 3, name: "Fishing guides", item: `${origin}/fishing/guides` },
        { "@type": "ListItem", position: 4, name: guide.businessName, item: `${origin}${canonicalPath}` },
      ] },
    ]) }],
  };
}

export async function loadFishingGuideProfileDataServer(slug: string) {
  const guide = await fishingPlatform.guides.getBySlug(fishingScope, slug);
  if (!guide || guide.status !== "published" || !guide.verifiedListing) return null;

  const [guideLakes, guideSpecies, lakes, species, techniques, advertisers, placements] = await Promise.all([
    fishingPlatform.guideLakes.list({ ...fishingScope, guideId: guide.id }),
    fishingPlatform.guideSpecies.list({ ...fishingScope, guideId: guide.id }),
    fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.techniques.list({ ...fishingScope, status: "published", limit: 5000 }),
    fishingPlatform.advertisers.list({ ...fishingScope, status: "published" }),
    fishingPlatform.placements.list({ ...fishingScope, status: "published", limit: 5000 }),
  ]);

  const lakeById = new Map(lakes.map((row) => [row.id, row]));
  const speciesById = new Map(species.map((row) => [row.id, row]));
  const techniqueById = new Map(techniques.map((row) => [row.id, row]));
  const advertiserById = new Map(advertisers.map((row) => [row.id, row]));
  const guideAdvertiserIds = new Set(advertisers.filter((row) => row.guideId === guide.id).map((row) => row.id));

  const sponsoredPlacements = placements
    .filter((placement) => guideAdvertiserIds.has(placement.advertiserId) && SPONSORED_GUIDE_KINDS.includes(placement.kind as (typeof SPONSORED_GUIDE_KINDS)[number]))
    .map((placement) => ({ placement, advertiser: advertiserById.get(placement.advertiserId) }))
    .filter((entry) => Boolean(entry.advertiser));

  const pageData = {
    guide,
    canonicalPath: fishingGuideCanonicalPath(guide.slug),
    lakes: guideLakes.map((relation) => ({ relation, lake: lakeById.get(relation.lakeId) })).filter((row) => Boolean(row.lake)),
    species: guideSpecies.map((relation) => ({ relation, species: speciesById.get(relation.speciesId) })).filter((row) => Boolean(row.species)),
    techniques: (guide.techniqueIds ?? []).map((id) => techniqueById.get(id)).filter((row) => Boolean(row)),
    sponsoredPlacements,
  };

  return { ...pageData, head: buildFishingGuideProfileHead(pageData) };
}

export type FishingGuideProfileData = NonNullable<Awaited<ReturnType<typeof loadFishingGuideProfileDataServer>>>;
