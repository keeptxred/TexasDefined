export type ReviewOrder = {
  merchant_id: number;
  order_id: string;
  email: string;
  delivery_country: string;
  estimated_delivery_date: string;
};

export function reviewOrderFromResponse(value: unknown, merchantId: number): ReviewOrder | null {
  if (!value || typeof value !== "object") return null;
  const order = value as Partial<ReviewOrder>;
  if (order.merchant_id !== merchantId || typeof order.order_id !== "string" || !/^cs_live_[a-zA-Z0-9]+$/.test(order.order_id) || typeof order.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order.email) || order.delivery_country !== "US" || typeof order.estimated_delivery_date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(order.estimated_delivery_date)) return null;
  return { merchant_id: merchantId, order_id: order.order_id, email: order.email, delivery_country: order.delivery_country, estimated_delivery_date: order.estimated_delivery_date };
}
