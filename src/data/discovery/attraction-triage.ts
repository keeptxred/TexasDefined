import { TOP_TEXAS_ATTRACTIONS } from "../top-texas-attractions";
import type { ViatorAttractionCandidate } from "../../lib/viator-attraction-discovery";

function key(name: string) {
  return name.normalize("NFKD").toLowerCase().replace(/[\u0300-\u036f]/g,"")
    .replace(/&/g," and ").replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");
}

/** Suggestions only; never auto-assign Viator IDs to canonical pages by title. */
export function triageAttractionCandidate(candidate: ViatorAttractionCandidate) {
  const matches = TOP_TEXAS_ATTRACTIONS.filter((item)=>key(item.name)===key(candidate.name));
  return {
    providerId:candidate.providerId,
    market:candidate.market,
    name:candidate.name,
    disposition:matches.length===1 ? "review-existing-guide" as const : "research-new-or-alias" as const,
    possibleExistingSlug:matches.length===1 ? matches[0].slug : undefined,
    requiredEvidence:["official-operator-identity","verified-location","original-editorial-content","approved-internal-links"] as const,
    eligibleForAutoPublication:false as const,
  };
}
