/**
 * Illustrative planning figures only. Never treat a provider's advertised
 * starting rate as a confirmed group quote or all-inclusive event cost.
 */
export function groupEventPlanningAmounts(
  groupSize: number,
  perPersonBudget: number | null,
  publishedStartingRate: number | null,
) {
  const validGroup = Number.isInteger(groupSize) && groupSize >= 2 && groupSize <= 3000;
  const validBudget = perPersonBudget != null && Number.isFinite(perPersonBudget) && perPersonBudget > 0;
  const validRate = publishedStartingRate != null && Number.isFinite(publishedStartingRate) && publishedStartingRate > 0;
  return {
    budgetCeiling: validGroup && validBudget ? Math.round(groupSize * perPersonBudget * 100) / 100 : null,
    indicativeStartingTotal: validGroup && validRate ? Math.round(groupSize * publishedStartingRate * 100) / 100 : null,
  };
}
