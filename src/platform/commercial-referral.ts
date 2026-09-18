export type CommercialReferralAnchor = {
  href: string;
  dataset: {
    commercialPartner?: string;
    commercialPlacement?: string;
  };
};

export type CommercialReferralDetails = {
  resourceId: string;
  entityKind: string;
  destination: string;
};

const earlyCommercialReferralEvents = new WeakSet<object>();

export function commercialReferralForAnchor(
  anchor: CommercialReferralAnchor | null | undefined,
): CommercialReferralDetails | null {
  const resourceId = anchor?.dataset.commercialPartner;
  if (!anchor || !resourceId) return null;
  return {
    resourceId,
    entityKind: anchor.dataset.commercialPlacement || 'unspecified',
    destination: anchor.href,
  };
}

export function markEarlyCommercialReferralEvent(event: object) {
  earlyCommercialReferralEvents.add(event);
}

export function wasEarlyCommercialReferralEvent(event: object) {
  return earlyCommercialReferralEvents.has(event);
}
