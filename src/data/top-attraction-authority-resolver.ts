import { applyTopAttractionAuthority } from "./destination-authority-top-attractions";
import { topAttractionSupplementalSources } from "./top-attraction-authority-sources";
import type { Destination, DestinationAuthoritySource } from "./types";

function dedupeSources(sources: DestinationAuthoritySource[]): DestinationAuthoritySource[] {
  const seen = new Set<string>();
  return sources.filter((source) => {
    const normalized = source.url.trim().replace(/\/$/, "");
    if (!normalized || seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

function moodyGardensSources(): DestinationAuthoritySource[] {
  return [
    {
      label: "Moody Gardens — current hours and pricing",
      url: "https://www.moodygardens.com/visitor-info/hours",
      scope: "Published attraction hours, current special-event schedule changes and day-specific visitor information.",
    },
    {
      label: "Moody Gardens — visitor FAQ and parking",
      url: "https://www.moodygardens.com/visitor-info/faq",
      scope: "Current parking, accessibility, ticketing and visitor-policy guidance.",
    },
    {
      label: "Moody Gardens — Discovery Pyramid and Galveston Children's Museum",
      url: "https://www.moodygardens.com/attractions/discovery-pyramid",
      scope: "Operator-confirmed open children's museum, upstairs location, included ticket admission and Audience Recognition Theater.",
    },
    {
      label: "Moody Gardens — accessibility",
      url: "https://www.moodygardens.com/visitor-info/accessibility",
      scope: "Wheelchairs, accessible seating, captioning and Rainforest Pyramid service-animal policy.",
    },
    {
      label: "Moody Gardens — maps, directions and parking",
      url: "https://www.moodygardens.com/visitor-info/map-directions",
      scope: "Official driving directions, complimentary self-parking and paid parking upgrade options.",
    },
    {
      label: "Moody Gardens — official ticket checkout",
      url: "https://tickets.moodygardens.com/webstore/shop/viewitems.aspx?c=admission&cg=ti",
      scope: "Current ticket prices, age categories and Value Pass options; variable amounts must not be hardcoded.",
    },
    {
      label: "Moody Gardens — events calendar",
      url: "https://www.moodygardens.com/events",
      scope: "Current seasonal-event dates and Holiday in the Gardens programming.",
    },
  ];
}

/**
 * Canonical authority resolver for Top-25 rendering and machine-readable output.
 * Base authority supplies the attraction's controlling visitor/ticket sources;
 * the supplemental registry adds institutional history, science, conservation,
 * accessibility or designation evidence.
 */
export function resolveTopAttractionAuthority(destination: Destination): Destination {
  const authority = applyTopAttractionAuthority(destination);
  // Preserve the destination's genuine last verified date. Never backdate a
  // fresh operator check to an older editorial snapshot.
  const base = authority;
  if (!base.authorityGuide) return base;
  const currentSources = base.slug === "moody-gardens" ? moodyGardensSources() : [];
  return {
    ...base,
    authorityGuide: {
      ...base.authorityGuide,
      sources: dedupeSources([
        ...base.authorityGuide.sources,
        ...topAttractionSupplementalSources(destination.slug),
        ...currentSources,
      ]),
    },
  };
}
