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

/**
 * Canonical authority resolver for Top-25 rendering and machine-readable output.
 * Base authority supplies the attraction's controlling visitor/ticket sources;
 * the supplemental registry adds institutional history, science, conservation,
 * accessibility or designation evidence.
 */
export function resolveTopAttractionAuthority(destination: Destination): Destination {
  const base = applyTopAttractionAuthority(destination);
  if (!base.authorityGuide) return base;
  return {
    ...base,
    authorityGuide: {
      ...base.authorityGuide,
      sources: dedupeSources([
        ...base.authorityGuide.sources,
        ...topAttractionSupplementalSources(destination.slug),
      ]),
    },
  };
}
