import { canonicalPaintedChurchFeaturesBySlug } from "./painted-church-feature-index";
import { paintedChurchMapPointBySlug } from "./painted-church-map-points";
import { canonicalPaintedChurchProfileBySlug } from "./painted-church-profile-index";
import { paintedChurchPreservationEventsBySlug } from "./painted-church-preservation-chronology";
import { paintedChurchRegisterRecordBySlug } from "./painted-church-register-evidence";
import { nominationEvidenceForChurch, paintedChurchThematicNomination } from "./painted-church-thematic-nomination";
import { paintedChurchVisitorStatusBySlug } from "./painted-church-visitor-status";
import { expandedPaintedChurchBySlug } from "./painted-churches-expanded";

export type PaintedChurchClaimStatus = "accepted" | "qualified" | "unresolved";

export type PaintedChurchEvidenceSource = {
  label: string;
  url: string;
  use: string;
};

export type PaintedChurchEvidenceClaim = {
  id: string;
  category: "identity" | "classification" | "chronology" | "designation" | "location" | "visitor" | "interior-feature" | "preservation";
  label: string;
  claim: string;
  status: PaintedChurchClaimStatus;
  qualification?: string;
  sources: PaintedChurchEvidenceSource[];
};

const methodologyUrl = "https://texasdefined.com/explore/painted-churches/methodology";

function uniqueSources(sources: PaintedChurchEvidenceSource[]) {
  return [...new Map(sources.map((source) => [`${source.url}|${source.use}`, source])).values()];
}

export function paintedChurchEvidenceLedgerBySlug(slug: string): PaintedChurchEvidenceClaim[] {
  const church = expandedPaintedChurchBySlug(slug);
  if (!church) return [];

  const profile = canonicalPaintedChurchProfileBySlug(slug);
  const register = paintedChurchRegisterRecordBySlug(slug);
  const map = paintedChurchMapPointBySlug.get(slug);
  const visitor = paintedChurchVisitorStatusBySlug.get(slug);
  const features = canonicalPaintedChurchFeaturesBySlug(slug);
  const preservationEvents = paintedChurchPreservationEventsBySlug.get(slug) ?? [];
  const nomination = nominationEvidenceForChurch(slug);

  const claims: PaintedChurchEvidenceClaim[] = [];

  claims.push({
    id: `${slug}-identity`,
    category: "identity",
    label: "Property identity and inclusion",
    claim: `${church.name} in ${church.city}, ${church.county} County is included in the Texas Defined verified Painted Churches census.`,
    status: "accepted",
    sources: uniqueSources([
      { label: "Controlling church/property source", url: church.sourceUrl, use: "property identity and historic/decorative basis" },
      ...(church.secondarySourceUrl ? [{ label: "Supporting church/property source", url: church.secondarySourceUrl, use: "independent supporting evidence" }] : []),
      { label: "Texas Defined methodology", url: methodologyUrl, use: "published inclusion standard" },
    ]),
  });

  const classificationLabel = church.classification.replaceAll("-", " ");
  const classificationQualification = church.classification === "historical-thematic-nomination-member"
    ? "This property belonged to the original 1982 fifteen-church thematic study but is not one of the fourteen entries surfaced by THC's current Multiple Property Listing index because it had already been individually listed in 1976."
    : church.classification === "broader-historic-tradition"
      ? "This is a Texas Defined broader-tradition classification, not a claim of membership in the 1982 National Register thematic group."
      : church.classification === "modern-decorative-campaign"
        ? "The decorative program is historically documented but substantially later than the immigrant-era programs that define most of the formal thematic study."
        : undefined;
  claims.push({
    id: `${slug}-classification`,
    category: "classification",
    label: "Collection classification",
    claim: `Texas Defined classifies this church as ${classificationLabel}.`,
    status: classificationQualification ? "qualified" : "accepted",
    qualification: classificationQualification,
    sources: uniqueSources([
      { label: "Texas Defined methodology", url: methodologyUrl, use: "classification rules" },
      ...nomination.map((item) => ({ label: item.title, url: paintedChurchThematicNomination.sourceUrl, use: `1982 thematic-nomination evidence; source page${item.sourcePages.length === 1 ? "" : "s"} ${item.sourcePages.join(", ")}` })),
      { label: "Controlling church/property source", url: church.sourceUrl, use: "church-specific inclusion evidence" },
    ]),
  });

  if (profile) {
    const chronology = [
      profile.foundedYear ? `parish/congregation founded ${profile.foundedYear}` : null,
      profile.builtYear ? `present church built ${profile.builtYear}` : null,
      profile.paintedYear ? `documented painting campaign ${profile.paintedYear}` : null,
    ].filter(Boolean).join("; ");
    if (chronology) {
      claims.push({
        id: `${slug}-chronology`,
        category: "chronology",
        label: "Core chronology",
        claim: chronology,
        status: "accepted",
        sources: uniqueSources(profile.sources.map((source) => ({ label: source.label, url: source.url, use: "church chronology and profile facts" }))),
      });
    }
  }

  if (church.nationalRegister) {
    const designationSources: PaintedChurchEvidenceSource[] = register
      ? [
          { label: "National Park Service record", url: register.npsUrl, use: "National Register reference, listing date and designation metadata" },
          { label: "Texas Historical Commission record", url: register.thcUrl, use: "state historic-register record" },
        ]
      : [
          { label: "Historic property / National Register source", url: church.secondarySourceUrl ?? church.sourceUrl, use: "individual National Register listing" },
        ];
    claims.push({
      id: `${slug}-designation`,
      category: "designation",
      label: "National Register status",
      claim: `National Register reference ${church.nationalRegister.referenceNumber}, listed ${church.nationalRegister.listed}${church.nationalRegister.multipleProperty ? "; associated with Churches with Decorative Interior Painting" : "; individually listed property"}.`,
      status: "accepted",
      sources: designationSources,
    });
  }

  if (map) {
    claims.push({
      id: `${slug}-location`,
      category: "location",
      label: "Mapped location",
      claim: `Texas Defined maps this property at ${map.lat.toFixed(6)}, ${map.lon.toFixed(6)} with ${map.precision.replaceAll("-", " ")} precision.`,
      status: map.precision === "exact-property" ? "accepted" : "qualified",
      qualification: map.precision === "exact-property" ? undefined : "The point is intentionally labeled below exact-property precision until a stronger geospatial source is available.",
      sources: [{ label: map.sourceLabel, url: map.sourceUrl, use: "coordinate provenance and precision" }],
    });
  }

  if (visitor) {
    claims.push({
      id: `${slug}-visitor`,
      category: "visitor",
      label: "Current visitor status",
      claim: visitor.summary,
      status: visitor.evidenceScope === "current-visitor-guidance" ? "accepted" : "qualified",
      qualification: visitor.evidenceScope === "current-visitor-guidance" ? undefined : `The controlling source establishes ${visitor.evidenceScope.replaceAll("-", " ")} rather than guaranteed sightseeing hours.`,
      sources: [{ label: visitor.controllingSourceLabel, url: visitor.controllingSourceUrl, use: `visitor/access evidence checked ${visitor.checkedAt}` }],
    });
  }

  for (const feature of features) {
    claims.push({
      id: `${slug}-feature-${feature.id}`,
      category: "interior-feature",
      label: feature.name,
      claim: `${feature.location}: ${feature.description}`,
      status: feature.integrity === "uncertain" ? "qualified" : "accepted",
      qualification: feature.integrity === "uncertain" ? "The feature is documented, but its original/restored/repainted integrity remains unresolved." : undefined,
      sources: [{ label: feature.sourceLabel, url: feature.sourceUrl, use: feature.sourceDetail ?? `object-level evidence; integrity classified ${feature.integrity}` }],
    });
  }

  for (const event of preservationEvents) {
    claims.push({
      id: `${slug}-preservation-${event.id}`,
      category: "preservation",
      label: `${event.yearLabel ?? event.year} — ${event.type.replaceAll("-", " ")}`,
      claim: event.summary,
      status: event.qualification ? "qualified" : "accepted",
      qualification: event.qualification,
      sources: [{ label: event.sourceLabel, url: event.sourceUrl, use: `church-specific ${event.type.replaceAll("-", " ")} chronology evidence` }],
    });
  }

  return claims;
}
