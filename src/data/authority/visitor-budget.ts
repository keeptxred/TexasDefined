/**
 * Group trip estimates use already source-verified offer rows supplied by the
 * calling page. This helper never fetches prices or assumes a missing fee is $0.
 */
export type BudgetOffer = {
  id: string;
  priceUsd: number;
  maxParty: number | null;
};
export type BudgetAllowances = {
  lodging: number;
  food: number;
  transport: number;
};
export function estimateVisitorBudget<T extends BudgetOffer>(
  offers: readonly T[],
  ids: readonly string[],
  guests: number,
  allowances: BudgetAllowances,
) {
  const selected = new Set(ids);
  const validGuests = Math.max(1, Math.min(100, Math.trunc(guests) || 1));
  const chosen = offers.filter((offer) => selected.has(offer.id));
  const eligibleOffers = chosen.filter((offer) =>
    offer.maxParty === null || validGuests <= offer.maxParty);
  const ineligibleOffers = chosen.filter((offer) =>
    offer.maxParty !== null && validGuests > offer.maxParty);
  const tastingEstimate = eligibleOffers.reduce((sum, offer) =>
    sum + Math.max(0, offer.priceUsd) * validGuests, 0);
  const allowance = Object.values(allowances).reduce((sum, value) =>
    sum + (Number.isFinite(value) ? Math.max(0, value) : 0), 0);
  const total = tastingEstimate + allowance;
  return {
    eligibleOffers,
    ineligibleOffers,
    tastingEstimate,
    total,
    perGuest: total / validGuests,
  };
}
