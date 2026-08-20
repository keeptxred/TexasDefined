import { paintedChurchIndexLaunchReady, paintedChurchLaunchBlockers } from "./painted-church-preindex-readiness";
import { expandedPaintedChurches } from "./painted-churches-expanded";

export type PaintedChurchReleaseControl = {
  id: string;
  label: string;
  complete: boolean;
  machineCheckable: boolean;
  detail: string;
  required: boolean;
};

/**
 * Final search-publication contract.
 * The runtime can determine church-level content readiness, but branch freshness,
 * CI/live-deploy verification and the owner's explicit approval are intentionally
 * separate controls. None is inferred from another.
 */
export const paintedChurchReleaseControls: PaintedChurchReleaseControl[] = [
  {
    id: "church-launch-floor",
    label: "Every verified church clears the documentary launch floor",
    complete: paintedChurchIndexLaunchReady,
    machineCheckable: true,
    detail: paintedChurchIndexLaunchReady
      ? `${expandedPaintedChurches.length} verified churches clear required profile, research, provenance, visitor, map, feature and rights-cleared-image checks.`
      : `${paintedChurchLaunchBlockers.length} verified church${paintedChurchLaunchBlockers.length === 1 ? " remains" : "es remain"} below the required documentary launch floor.`,
    required: true,
  },
  {
    id: "current-main",
    label: "Authority work reconciled with current main",
    complete: false,
    machineCheckable: false,
    detail: "CI must prove origin/main is an ancestor of the release commit. This remains false in application data because branch freshness can only be established against Git history at release time.",
    required: true,
  },
  {
    id: "ci-build-live",
    label: "Authority validators, production build and live review pass",
    complete: false,
    machineCheckable: false,
    detail: "Required GitHub/Cloudflare checks must pass on the reconciled release commit. Repository content never self-certifies a CI or deployment result.",
    required: true,
  },
  {
    id: "owner-approval",
    label: "Explicit owner approval to release Painted Churches to search",
    complete: false,
    machineCheckable: false,
    detail: "Search publication remains disabled until the owner explicitly approves indexing after reviewing the final authority audit. Do not infer approval from requests to build, deploy or preview the section.",
    required: true,
  },
  {
    id: "public-indexing-switch",
    label: "Production search-publication switch enabled",
    complete: false,
    machineCheckable: false,
    detail: "PUBLIC_INDEXING_ENABLED remains false/unset during pre-index review. It is the final operational switch after all other controls and explicit approval are satisfied.",
    required: true,
  },
];

export const paintedChurchReleaseReady = paintedChurchReleaseControls.filter((item) => item.required).every((item) => item.complete);
export const paintedChurchReleaseBlockers = paintedChurchReleaseControls.filter((item) => item.required && !item.complete);

export const paintedChurchAuthorityCeiling = [
  "Original Texas Defined field visit and photography for every verified church",
  "Object-level inscription transcription and translation where inscriptions survive",
  "Window-by-window stained-glass inventory where historically significant glass survives",
  "Preservation chronology tied to treatment reports, parish records or conservator evidence",
  "Named-contributor biographies expanded from multiple independent sources where evidence exists",
  "Rights-controlled then-and-now photography for every church where historical comparison is possible",
  "Expert or parish-historian review only when a real documented reviewer agrees to be identified",
] as const;
