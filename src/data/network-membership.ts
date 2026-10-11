/** Texas Defined Network billing catalog. Never treat a client-side price ID as proof of payment. */
export const NETWORK_PLUS_MONTHLY_USD_CENTS = 1999;
export const NETWORK_PLUS_STRIPE_PRODUCT_ID = 'prod_VPrsZ3mYEKz2da';
export const NETWORK_PLUS_STRIPE_PRICE_ID = 'price_1UP28XLtRurj6GMNwFlYDW6N';
export const NETWORK_BILLING_STATUS = 'prelaunch' as const;
/** Stripe product is intentionally inactive until private access, verified checkout, webhook and provisioning pass. */
export const NETWORK_CHECKOUT_ENABLED = false;
