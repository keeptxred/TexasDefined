/** Customer-facing rates also published in the Google Merchant feed. */
export const STANDARD_SHIPPING_PRICE_USD = 6.99;
export const FREE_SHIPPING_THRESHOLD_USD = 35.01;

export function shopShippingUsd(subtotalUsd: number): number {
  if (!Number.isFinite(subtotalUsd) || subtotalUsd < 0) throw new Error("Invalid cart subtotal.");
  return Math.round(subtotalUsd * 100) >= Math.round(FREE_SHIPPING_THRESHOLD_USD * 100)
    ? 0
    : STANDARD_SHIPPING_PRICE_USD;
}
