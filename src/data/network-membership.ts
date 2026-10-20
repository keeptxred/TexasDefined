/** Texas Defined Network billing catalog. Never treat a client-side price ID as proof of payment. */
export const NETWORK_PLUS_MONTHLY_USD_CENTS = 1999;
export const NETWORK_PLUS_STRIPE_PRODUCT_ID = 'prod_VPrsZ3mYEKz2da';
export const NETWORK_PLUS_STRIPE_PRICE_ID = 'price_1UP28XLtRurj6GMNwFlYDW6N';
// Live Stripe product/price are active, but Checkout activation remains a
// server-only decision gated by verified owner, Stripe credentials and webhook.
// No browser/client constant can assert whether a protected charge is enabled.
export const NETWORK_BILLING_STATUS = 'provider_configured' as const;
