import { applyTopAttractionAuthority } from "./destination-authority-top-attractions";
import { topAttractionSupplementalSources } from "./top-attraction-authority-sources";
import { applyMoodyGardensCurrentCuration } from "./destination-curation-moody-gardens";
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
      scope: "Current attraction schedules, Discovery Museum closure guidance and daily visitor information.",
    },
    {
      label: "Moody Gardens — visitor FAQ and parking",
      url: "https://www.moodygardens.com/visitor-info/faq",
      scope: "Current parking, accessibility, ticketing and visitor-policy guidance.",
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
  const base = applyMoodyGardensCurrentCuration(applyTopAttractionAuthority(destination));
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
