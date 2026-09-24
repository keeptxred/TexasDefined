export type AbracadabraDestination =
  | "costumes"
  | "wigs"
  | "fx-makeup"
  | "props"
  | "masks"
  | "collectibles"
  | "general";

export interface AbracadabraAffiliateLink {
  destination: AbracadabraDestination;
  creativeId: string;
  label: string;
  href: string;
}

/**
 * Approved CJ links exported for TexasDefined on 2026-09-24.
 *
 * Keep these exact network tracking URLs. Do not reconstruct deep links from the
 * publisher ID or retailer paths. Promotional "sale/discount" creatives are
 * intentionally excluded because TexasDefined does not publish coupon or urgency
 * claims without an active, independently verified offer.
 */
export const ABRACADABRA_AFFILIATE_LINKS: Readonly<Record<AbracadabraDestination, AbracadabraAffiliateLink>> = {
  costumes: {
    destination: "costumes",
    creativeId: "17267156",
    label: "Browse costumes at Abracadabra NYC",
    href: "https://www.kqzyfj.com/click-101876465-17267156",
  },
  wigs: {
    destination: "wigs",
    creativeId: "17267171",
    label: "Browse wigs at Abracadabra NYC",
    href: "https://www.jdoqocy.com/click-101876465-17267171",
  },
  "fx-makeup": {
    destination: "fx-makeup",
    creativeId: "17267170",
    label: "Browse special-effects makeup at Abracadabra NYC",
    href: "https://www.kqzyfj.com/click-101876465-17267170",
  },
  props: {
    destination: "props",
    creativeId: "17267169",
    label: "Browse costume props at Abracadabra NYC",
    href: "https://www.kqzyfj.com/click-101876465-17267169",
  },
  masks: {
    destination: "masks",
    creativeId: "17267167",
    label: "Browse Halloween masks at Abracadabra NYC",
    href: "https://www.dpbolvw.net/click-101876465-17267167",
  },
  collectibles: {
    destination: "collectibles",
    creativeId: "17267159",
    label: "Browse collectibles at Abracadabra NYC",
    href: "https://www.jdoqocy.com/click-101876465-17267159",
  },
  general: {
    destination: "general",
    creativeId: "17267207",
    label: "Visit Abracadabra NYC",
    href: "https://www.anrdoezrs.net/click-101876465-17267207",
  },
};

export function abracadabraAffiliateLink(destination: AbracadabraDestination) {
  return ABRACADABRA_AFFILIATE_LINKS[destination];
}
